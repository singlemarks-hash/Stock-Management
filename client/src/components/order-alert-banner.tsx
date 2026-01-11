import { AlertTriangle, Package, Clock, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";
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
import { needsOrder, mainCategoryLabels, storageTypeLabels, getOrderQuantity, getRequiredStock } from "@shared/schema";
import type { InventoryItem, StorageType, Season, Supplier, MenuTag } from "@shared/schema";
import { cn } from "@/lib/utils";
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

interface AlertStats {
  total: number;
  items: OrderItem[];
  byCategory: {
    food: { total: number; items: OrderItem[]; byStorage: Record<StorageType, OrderItem[]> };
    "non-food": { total: number; items: OrderItem[] };
  };
  ordered: number;
  orderedItems: (InventoryItem & { calculatedOrderQty: number })[];
}

function calculateAlertStats(items: InventoryItem[], season: Season, team: string): AlertStats {
  const stats: AlertStats = {
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
    ordered: 0,
    orderedItems: [],
  };

  items.filter(item => item.team === team).forEach(item => {
    if (needsOrder(item, season)) {
      const orderQty = getOrderQuantity(item, season);
      const req = item.seasonalRequirements.find(r => r.season === season);
      const orderItem: OrderItem = {
        id: item.id,
        name: item.name,
        mainCategory: item.mainCategory,
        storageType: item.storageType,
        subCategory: item.subCategory,
        unit: item.unit,
        currentStock: item.currentStock,
        requiredStock: req?.requiredStock ?? 0,
        orderQuantity: orderQty,
        menuTags: item.menuTags,
        supplierId: item.supplierId,
      };
      
      stats.total++;
      stats.items.push(orderItem);
      
      if (item.mainCategory === "food") {
        stats.byCategory.food.total++;
        stats.byCategory.food.items.push(orderItem);
        if (item.storageType) {
          stats.byCategory.food.byStorage[item.storageType].push(orderItem);
        }
      } else {
        stats.byCategory["non-food"].total++;
        stats.byCategory["non-food"].items.push(orderItem);
      }
    }
    if (item.orderStatus === "ordered") {
      const calculatedOrderQty = getOrderQuantity(item, season);
      stats.ordered++;
      stats.orderedItems.push({ ...item, calculatedOrderQty });
    }
  });

  return stats;
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
  const stats = calculateAlertStats(items, selectedSeason, selectedTeam);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOrderedExpanded, setIsOrderedExpanded] = useState(true);
  const [editingQuantities, setEditingQuantities] = useState<Record<string, number>>({});

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

  const getTagById = (tagId: string): MenuTag | undefined => {
    return tags.find(t => t.id === tagId);
  };

  const getSupplierById = (supplierId: string | null): Supplier | undefined => {
    if (!supplierId) return undefined;
    return suppliers.find(s => s.id === supplierId);
  };

  const markOrderedMutation = useMutation({
    mutationFn: async ({ id, orderQuantity }: { id: string; orderQuantity: number }) => {
      return apiRequest("PATCH", `/api/inventory/${id}`, {
        orderStatus: "ordered",
        orderedQuantity: orderQuantity,
        orderedAt: new Date().toISOString(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const markDeliveredMutation = useMutation({
    mutationFn: async ({ id, currentStock, orderedQuantity }: { id: string; currentStock: number; orderedQuantity: number }) => {
      return apiRequest("PATCH", `/api/inventory/${id}`, {
        orderStatus: "normal",
        currentStock: currentStock + orderedQuantity,
        orderedQuantity: null,
        orderedAt: null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const updateOrderQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/inventory/${id}`, {
        orderedQuantity: quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const clearAllNeedsOrderMutation = useMutation({
    mutationFn: async (itemsToOrder: OrderItem[]) => {
      await Promise.all(itemsToOrder.map(item => apiRequest("PATCH", `/api/inventory/${item.id}`, {
        orderStatus: "ordered",
        orderedQuantity: item.orderQuantity,
        orderedAt: new Date().toISOString(),
      })));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const clearAllOrderedMutation = useMutation({
    mutationFn: async (items: InventoryItem[]) => {
      await Promise.all(items.map(item => {
        const finalQuantity = editingQuantities[item.id] ?? item.orderedQuantity ?? 0;
        return apiRequest("PATCH", `/api/inventory/${item.id}`, {
          orderStatus: "normal",
          currentStock: item.currentStock + finalQuantity,
          orderedQuantity: null,
          orderedAt: null,
        });
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const handleMarkOrdered = (id: string, orderQuantity: number) => {
    markOrderedMutation.mutate({ id, orderQuantity });
  };

  const handleMarkDelivered = (item: InventoryItem) => {
    const finalQuantity = editingQuantities[item.id] ?? item.orderedQuantity ?? 0;
    markDeliveredMutation.mutate({ 
      id: item.id, 
      currentStock: item.currentStock, 
      orderedQuantity: finalQuantity 
    });
  };

  const handleQuantityChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      setEditingQuantities(prev => ({ ...prev, [id]: numValue }));
    }
  };

  const handleQuantityBlur = (id: string, originalQuantity: number | null) => {
    const newQuantity = editingQuantities[id];
    if (newQuantity !== undefined && newQuantity !== originalQuantity) {
      updateOrderQuantityMutation.mutate({ id, quantity: newQuantity });
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
          return (
            <Badge 
              key={tagId} 
              variant="secondary" 
              className={cn("text-[9px] px-1 py-0", tag.color)}
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

  if (stats.total === 0 && stats.ordered === 0) {
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
                    <p className="text-xs text-muted-foreground">안전재고 미달 품목을 확인해주세요</p>
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
                        <th className="text-right p-2 font-medium w-20">발주수량</th>
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
                              disabled={markOrderedMutation.isPending}
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

      {stats.ordered > 0 && (
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
                      발주 완료 대기: <span className="text-chart-4 font-bold">{stats.ordered}개</span>
                    </p>
                    <p className="text-xs text-muted-foreground">입고 대기 중인 항목입니다</p>
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
                        <th className="text-right p-2 font-medium w-24">발주수량</th>
                        <th className="text-center p-2 font-medium w-24">발주시간</th>
                        <th className="text-center p-2 font-medium w-16">입고완료</th>
                        <th className="text-left p-2 font-medium w-20">발주처</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.orderedItems.map((item, index) => {
                        const requiredStock = getRequiredStock(item, selectedSeason);
                        const displayQuantity = editingQuantities[item.id] ?? item.orderedQuantity ?? item.calculatedOrderQty;
                        return (
                          <tr 
                            key={item.id} 
                            className={cn(
                              "border-b last:border-0",
                              index % 2 === 0 ? "bg-background" : "bg-muted/20"
                            )}
                            data-testid={`row-ordered-item-${item.id}`}
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
                              {requiredStock} {item.unit}
                            </td>
                            <td className="p-2 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <span className="text-muted-foreground text-xs">+</span>
                                <Input
                                  type="number"
                                  min={0}
                                  value={displayQuantity}
                                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                  onBlur={() => handleQuantityBlur(item.id, item.orderedQuantity)}
                                  className="w-12 h-6 text-right tabular-nums text-xs"
                                  data-testid={`input-order-quantity-${item.id}`}
                                />
                                <span className="text-[10px] text-muted-foreground">{item.unit}</span>
                              </div>
                            </td>
                            <td className="p-2 text-center">
                              <span className="text-[10px] text-muted-foreground">
                                {formatDateTime(item.orderedAt)}
                              </span>
                            </td>
                            <td className="p-2 text-center">
                              <Checkbox
                                checked={false}
                                onCheckedChange={() => handleMarkDelivered(item)}
                                disabled={markDeliveredMutation.isPending}
                                data-testid={`checkbox-mark-delivered-${item.id}`}
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
                    onClick={() => clearAllOrderedMutation.mutate(stats.orderedItems)}
                    disabled={clearAllOrderedMutation.isPending}
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
