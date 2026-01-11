import { AlertTriangle, Package, Clock, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useInventory } from "@/lib/inventory-context";
import { needsOrder, mainCategoryLabels, storageTypeLabels, getOrderQuantity } from "@shared/schema";
import type { InventoryItem, StorageType } from "@shared/schema";
import { cn } from "@/lib/utils";

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
}

interface AlertStats {
  total: number;
  items: OrderItem[];
  byCategory: {
    food: { total: number; items: OrderItem[]; byStorage: Record<StorageType, OrderItem[]> };
    "non-food": { total: number; items: OrderItem[] };
  };
  ordered: number;
  orderedItems: InventoryItem[];
}

function calculateAlertStats(items: InventoryItem[], season: string): AlertStats {
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

  items.forEach(item => {
    if (needsOrder(item, season as any)) {
      const orderQty = getOrderQuantity(item, season as any);
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
    if (item.orderPlaced) {
      stats.ordered++;
      stats.orderedItems.push(item);
    }
  });

  return stats;
}

export function OrderAlertBanner() {
  const { items, selectedSeason } = useInventory();
  const stats = calculateAlertStats(items, selectedSeason);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isOrderedExpanded, setIsOrderedExpanded] = useState(false);

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
          <div className="rounded-md border border-destructive/30 bg-destructive/5 overflow-hidden">
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
            
            <CollapsibleContent>
              <div className="px-4 pb-4 space-y-3">
                <div className="rounded-md border bg-background overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left p-2 font-medium">재료명</th>
                        <th className="text-left p-2 font-medium w-20">분류</th>
                        <th className="text-right p-2 font-medium w-16">현재고</th>
                        <th className="text-right p-2 font-medium w-16">필요</th>
                        <th className="text-right p-2 font-medium w-20">발주수량</th>
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
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.subCategory}</div>
                          </td>
                          <td className="p-2">
                            <div className="flex flex-col gap-0.5">
                              <Badge variant="secondary" className="text-[10px] w-fit">
                                {mainCategoryLabels[item.mainCategory]}
                              </Badge>
                              {item.storageType && (
                                <Badge variant="outline" className="text-[10px] w-fit">
                                  {storageTypeLabels[item.storageType]}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-2 text-right tabular-nums">
                            {item.currentStock} {item.unit}
                          </td>
                          <td className="p-2 text-right tabular-nums text-muted-foreground">
                            {item.requiredStock} {item.unit}
                          </td>
                          <td className="p-2 text-right">
                            <Badge variant="destructive" className="tabular-nums">
                              +{item.orderQuantity} {item.unit}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-2">
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
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}

      {stats.ordered > 0 && (
        <Collapsible open={isOrderedExpanded} onOpenChange={setIsOrderedExpanded}>
          <div className="rounded-md border border-chart-4/30 bg-chart-4/5 overflow-hidden">
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
            
            <CollapsibleContent>
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {stats.orderedItems.map(item => (
                    <Badge 
                      key={item.id} 
                      variant="secondary" 
                      className="text-xs bg-chart-4/20"
                      data-testid={`badge-ordered-${item.id}`}
                    >
                      {item.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      )}
    </div>
  );
}
