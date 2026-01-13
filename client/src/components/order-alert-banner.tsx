import { AlertTriangle, Package, Clock, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useInventory } from "@/lib/inventory-context";
import { mainCategoryLabels, storageTypeLabels, getRequiredStock } from "@shared/schema";
import type { InventoryItem, ItemOrder, StorageType, Season, Supplier, MenuTag } from "@shared/schema";
import { cn } from "@/lib/utils";
import { parseStoredColor } from "@/lib/tagColors";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

interface OrderItem {
  id: string;
  name: string;
  mainCategory: "food" | "non-food";
  storageType: StorageType | null;
  subCategory: string;
  unit: string;
  currentStock: number;
  requiredStock: number;
  orderQuantity: number;
  menuTags: string[];
  supplierId: string | null;
}

interface PendingOrderWithItem {
  order: ItemOrder;
  item: InventoryItem;
}

interface AlertStats {
  total: number;
  items: OrderItem[];
  byCategory: {
    food: { total: number; items: OrderItem[]; byStorage: Record<StorageType, OrderItem[]> };
    "non-food": { total: number; items: OrderItem[] };
  };
  pendingOrders: PendingOrderWithItem[];
}

function formatDateTime(isoString: string | null): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderAlertBanner() {
  const { items, selectedSeason, selectedTeam } = useInventory();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOrderedExpanded, setIsOrderedExpanded] = useState(true);
  const [editingQuantities, setEditingQuantities] = useState<Record<string, number>>({});

  const { data: pendingOrders = [] } = useQuery<ItemOrder[]>({
    queryKey: ['/api/orders'],
    queryFn: async () => {
      const res = await fetch('/api/orders');
      return res.json();
    },
  });

  const { data: tags = [] } = useQuery<MenuTag[]>({
    queryKey: ['/api/tags', selectedTeam],
    queryFn: async () => {
      const res = await fetch(`/api/tags?team=${selectedTeam}`);
      return res.json();
    },
  });

  const { data: suppliers = [] } = useQuery<Supplier[]>({
    queryKey: ['/api/suppliers', selectedTeam],
    queryFn: async () => {
      const res = await fetch(`/api/suppliers?team=${selectedTeam}`);
      return res.json();
    },
  });

  const pendingOrdersByItemId = useMemo(() => {
    const map: Record<string, ItemOrder[]> = {};
    pendingOrders.forEach(order => {
      if (!map[order.itemId]) {
        map[order.itemId] = [];
      }
      map[order.itemId].push(order);
    });
    return map;
  }, [pendingOrders]);

  const getPendingTotal = (itemId: string): number => {
    const orders = pendingOrdersByItemId[itemId] || [];
    return orders.reduce((sum, order) => sum + order.quantity, 0);
  };

  const stats = useMemo((): AlertStats => {
    const result: AlertStats = {
      total: 0,
      items: [],
      byCategory: {
        food: { 
          total: 0, 
          items: [],
          byStorage: { refrigerated: [], frozen: [], "room-temp": [] } 
        },
        "non-food": { total: 0, items: [] },
      },
      pendingOrders: [],
    };

    const teamItems = items.filter(item => item.team === selectedTeam);

    teamItems.forEach(item => {
      const req = item.seasonalRequirements.find(r => r.season === selectedSeason);
      const requiredStock = req?.requiredStock ?? 0;
      const pendingTotal = getPendingTotal(item.id);
      const deficit = requiredStock - item.currentStock - pendingTotal;

      if (deficit > 0) {
        const orderItem: OrderItem = {
          id: item.id,
          name: item.name,
          mainCategory: item.mainCategory as "food" | "non-food",
          storageType: item.storageType as StorageType | null,
          subCategory: item.subCategory,
          unit: item.unit,
          currentStock: item.currentStock,
          requiredStock,
          orderQuantity: deficit,
          menuTags: item.menuTags,
          supplierId: item.supplierId,
        };
        
        result.total++;
        result.items.push(orderItem);
        
        if (item.mainCategory === "food") {
          result.byCategory.food.total++;
          result.byCategory.food.items.push(orderItem);
          if (item.storageType) {
            result.byCategory.food.byStorage[item.storageType as StorageType].push(orderItem);
          }
        } else {
          result.byCategory["non-food"].total++;
          result.byCategory["non-food"].items.push(orderItem);
        }
      }
    });

    pendingOrders.forEach(order => {
      const item = teamItems.find(i => i.id === order.itemId);
      if (item) {
        result.pendingOrders.push({ order, item });
      }
    });

    return result;
  }, [items, selectedTeam, selectedSeason, pendingOrders, pendingOrdersByItemId]);

  const getTagById = (tagId: string): MenuTag | undefined => {
    return tags.find(t => t.id === tagId);
  };

  const getSupplierById = (supplierId: string | null): Supplier | undefined => {
    if (!supplierId) return undefined;
    return suppliers.find(s => s.id === supplierId);
  };

  const createOrderMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      return apiRequest("POST", `/api/orders`, {
        itemId,
        quantity,
        status: "pending",
        orderedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const markDeliveredMutation = useMutation({
    mutationFn: async ({ orderId, quantity }: { orderId: string; quantity: number }) => {
      return apiRequest("POST", `/api/orders/${orderId}/deliver`, {
        deliveredQuantity: quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const updateOrderQuantityMutation = useMutation({
    mutationFn: async ({ orderId, quantity }: { orderId: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/orders/${orderId}`, {
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
  });

  const clearAllNeedsOrderMutation = useMutation({
    mutationFn: async (itemsToOrder: OrderItem[]) => {
      await Promise.all(itemsToOrder.map(item => 
        apiRequest("POST", `/api/orders`, {
          itemId: item.id,
          quantity: item.orderQuantity,
          status: "pending",
          orderedAt: new Date().toISOString(),
        })
      ));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const clearAllPendingMutation = useMutation({
    mutationFn: async (pendingItems: PendingOrderWithItem[]) => {
      for (const { order } of pendingItems) {
        const finalQuantity = editingQuantities[order.id] ?? order.quantity;
        await apiRequest("POST", `/api/orders/${order.id}/deliver`, {
          deliveredQuantity: finalQuantity,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const handleMarkOrdered = (itemId: string, orderQuantity: number) => {
    createOrderMutation.mutate({ itemId, quantity: orderQuantity });
  };

  const handleMarkDelivered = (orderId: string, quantity: number) => {
    const finalQuantity = editingQuantities[orderId] ?? quantity;
    markDeliveredMutation.mutate({ orderId, quantity: finalQuantity });
  };

  const handleQuantityChange = (orderId: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setEditingQuantities(prev => ({ ...prev, [orderId]: numValue }));
    }
  };

  const handleQuantityBlur = (orderId: string, originalQuantity: number) => {
    const newQuantity = editingQuantities[orderId];
    if (newQuantity !== undefined && newQuantity !== originalQuantity) {
      updateOrderQuantityMutation.mutate({ orderId, quantity: newQuantity });
    }
  };

  const renderMenuTags = (menuTags: string[], mainCategory: "food" | "non-food") => {
    if (mainCategory === "non-food") {
      return <span className="text-muted-foreground text-xs">-</span>;
    }
    if (menuTags.length === 0) {
      return <span className="text-muted-foreground text-xs">-</span>;
    }
    return (
      <div className="flex flex-wrap gap-0.5">
        {menuTags.map(tagId => {
          const tag = getTagById(tagId);
          if (!tag) return null;
          const colorStyle = parseStoredColor(tag.color, tag.name);
          return (
            <Badge 
              key={tagId} 
              className="text-[9px] px-1 py-0 border-0"
              style={{ backgroundColor: colorStyle.backgroundColor, color: colorStyle.color }}
            >
              {tag.name}
            </Badge>
          );
        })}
      </div>
    );
  };

  const renderSupplierLink = (supplierId: string | null) => {
    const supplier = getSupplierById(supplierId);
    if (!supplier) {
      return <span className="text-muted-foreground text-xs">-</span>;
    }
    if (supplier.url) {
      return (
        <a 
          href={supplier.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          {supplier.name}
          <ExternalLink className="h-3 w-3" />
        </a>
      );
    }
    return <span className="text-xs text-muted-foreground">{supplier.name}</span>;
  };

  if (stats.total === 0 && stats.pendingOrders.length === 0) {
    return (
      <div className="mb-6 rounded-md border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">모든 재고가 충분합니다</p>
            <p className="text-xs text-muted-foreground">현재 발주가 필요한 항목이 없습니다</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-4">
      {stats.total > 0 && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <div className="rounded-md border border-destructive/30 bg-destructive/5">
            <CollapsibleTrigger asChild>
              <button 
                className="w-full p-4 flex items-center justify-between hover:bg-destructive/10 transition-colors"
                data-testid="button-toggle-order-alert"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div className="text-left">
                    <p className="text-sm font-medium">
                      발주 필요 항목: <span className="text-destructive font-bold">{stats.total}개</span>
                    </p>
                    <p className="text-xs text-muted-foreground">필요재고 미달 품목을 확인해주세요</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent forceMount className="data-[state=open]:block data-[state=closed]:hidden">
              <div className="px-4 sm:px-6 pb-4 space-y-3">
                <div 
                  className="rounded-md border bg-background overflow-x-auto" 
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
                >
                  <table className="w-full text-sm min-w-[700px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2 font-medium w-28">재료명</th>
                        <th className="text-left p-2 font-medium w-16">분류</th>
                        <th className="text-left p-2 font-medium w-20">사용메뉴</th>
                        <th className="text-right p-2 font-medium w-16">현재고</th>
                        <th className="text-right p-2 font-medium w-16">필요</th>
                        <th className="text-right p-2 font-medium w-24">발주필요 수량</th>
                        <th className="text-center p-2 font-medium w-16">발주완료</th>
                        <th className="text-left p-2 font-medium w-20">발주처</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.items.map((item, index) => (
                        <tr 
                          key={item.id} 
                          className={cn(
                            "border-b last:border-0",
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          )}
                          data-testid={`row-order-item-${item.id}`}
                        >
                          <td className="p-2">
                            <div className="font-medium text-sm truncate max-w-[100px]">{item.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate max-w-[100px]">{item.subCategory}</div>
                          </td>
                          <td className="p-2">
                            <div className="flex flex-col gap-0.5">
                              <Badge variant="secondary" className="text-[9px] px-1 w-fit">
                                {mainCategoryLabels[item.mainCategory]}
                              </Badge>
                              {item.storageType && (
                                <Badge variant="outline" className="text-[9px] px-1 w-fit">
                                  {storageTypeLabels[item.storageType]}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-2">
                            {renderMenuTags(item.menuTags, item.mainCategory)}
                          </td>
                          <td className="p-2 text-right tabular-nums text-xs">
                            {item.currentStock} {item.unit}
                          </td>
                          <td className="p-2 text-right tabular-nums text-muted-foreground text-xs">
                            {item.requiredStock} {item.unit}
                          </td>
                          <td className="p-2 text-right">
                            <Badge variant="destructive" className="tabular-nums text-xs">
                              +{item.orderQuantity} {item.unit}
                            </Badge>
                          </td>
                          <td className="p-2 text-center">
                            <Checkbox
                              checked={false}
                              onCheckedChange={() => handleMarkOrdered(item.id, item.orderQuantity)}
                              disabled={createOrderMutation.isPending}
                              data-testid={`checkbox-mark-ordered-${item.id}`}
                            />
                          </td>
                          <td className="p-2">
                            {renderSupplierLink(item.supplierId)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-2">
                    {stats.byCategory.food.total > 0 && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <Package className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{mainCategoryLabels.food}:</span>
                        {Object.entries(stats.byCategory.food.byStorage).map(([storage, storageItems]) => 
                          storageItems.length > 0 && (
                            <Badge key={storage} variant="secondary" className="text-[10px]">
                              {storageTypeLabels[storage as StorageType]} {storageItems.length}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                    {stats.byCategory["non-food"].total > 0 && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <Package className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{mainCategoryLabels["non-food"]}:</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {stats.byCategory["non-food"].total}개
                        </Badge>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearAllNeedsOrderMutation.mutate(stats.items)}
                    disabled={clearAllNeedsOrderMutation.isPending}
                    data-testid="button-mark-all-ordered"
                  >
                    전체 발주완료
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}

      {stats.pendingOrders.length > 0 && (
        <Collapsible open={isOrderedExpanded} onOpenChange={setIsOrderedExpanded}>
          <div className="rounded-md border border-chart-4/30 bg-chart-4/5">
            <CollapsibleTrigger asChild>
              <button 
                className="w-full p-4 flex items-center justify-between hover:bg-chart-4/10 transition-colors"
                data-testid="button-toggle-ordered-alert"
              >
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-chart-4" />
                  <div className="text-left">
                    <p className="text-sm font-medium">
                      발주완료 후 입고대기: <span className="text-chart-4 font-bold">{stats.pendingOrders.length}건</span>
                    </p>
                    <p className="text-xs text-muted-foreground">입고 대기 중인 발주 건입니다</p>
                  </div>
                </div>
                {isOrderedExpanded ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent forceMount className="data-[state=open]:block data-[state=closed]:hidden">
              <div className="px-4 sm:px-6 pb-4 space-y-3">
                <div 
                  className="rounded-md border bg-background overflow-x-auto" 
                  style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
                >
                  <table className="w-full text-sm min-w-[800px]">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2 font-medium w-28">재료명</th>
                        <th className="text-left p-2 font-medium w-16">분류</th>
                        <th className="text-left p-2 font-medium w-20">사용메뉴</th>
                        <th className="text-right p-2 font-medium w-16">현재고</th>
                        <th className="text-right p-2 font-medium w-16">필요</th>
                        <th className="text-right p-2 font-medium w-24">입고예정 수량</th>
                        <th className="text-center p-2 font-medium w-24">발주시간</th>
                        <th className="text-center p-2 font-medium w-16">입고완료</th>
                        <th className="text-left p-2 font-medium w-20">발주처</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.pendingOrders.map(({ order, item }, index) => {
                        const requiredStock = getRequiredStock(item, selectedSeason);
                        const displayQuantity = editingQuantities[order.id] ?? order.quantity;
                        return (
                          <tr 
                            key={order.id} 
                            className={cn(
                              "border-b last:border-0",
                              index % 2 === 0 ? "bg-background" : "bg-muted/20"
                            )}
                            data-testid={`row-pending-order-${order.id}`}
                          >
                            <td className="p-2">
                              <div className="font-medium text-sm truncate max-w-[100px]">{item.name}</div>
                              <div className="text-[10px] text-muted-foreground truncate max-w-[100px]">{item.subCategory}</div>
                            </td>
                            <td className="p-2">
                              <div className="flex flex-col gap-0.5">
                                <Badge variant="secondary" className="text-[9px] px-1 w-fit">
                                  {mainCategoryLabels[item.mainCategory as "food" | "non-food"]}
                                </Badge>
                                {item.storageType && (
                                  <Badge variant="outline" className="text-[9px] px-1 w-fit">
                                    {storageTypeLabels[item.storageType as StorageType]}
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              {renderMenuTags(item.menuTags, item.mainCategory as "food" | "non-food")}
                            </td>
                            <td className="p-2 text-right tabular-nums text-xs">
                              {item.currentStock} {item.unit}
                            </td>
                            <td className="p-2 text-right tabular-nums text-muted-foreground text-xs">
                              {requiredStock} {item.unit}
                            </td>
                            <td className="p-2 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-muted-foreground text-xs">+</span>
                                <Input
                                  type="number"
                                  min={0}
                                  step="0.1"
                                  value={displayQuantity}
                                  onChange={(e) => handleQuantityChange(order.id, e.target.value)}
                                  onBlur={() => handleQuantityBlur(order.id, order.quantity)}
                                  className="w-14 h-6 text-right tabular-nums text-xs"
                                  data-testid={`input-order-quantity-${order.id}`}
                                />
                                <span className="text-[10px] text-muted-foreground">{item.unit}</span>
                              </div>
                            </td>
                            <td className="p-2 text-center">
                              <span className="text-[10px] text-muted-foreground">
                                {formatDateTime(order.orderedAt)}
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <Checkbox
                                checked={false}
                                onCheckedChange={() => handleMarkDelivered(order.id, order.quantity)}
                                disabled={markDeliveredMutation.isPending}
                                data-testid={`checkbox-mark-delivered-${order.id}`}
                              />
                            </td>
                            <td className="p-2">
                              {renderSupplierLink(item.supplierId)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => clearAllPendingMutation.mutate(stats.pendingOrders)}
                    disabled={clearAllPendingMutation.isPending}
                    data-testid="button-mark-all-delivered"
                  >
                    전체 입고완료
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}
    </div>
  );
}
