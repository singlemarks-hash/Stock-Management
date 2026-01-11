import { AlertTriangle, Package, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInventory } from "@/lib/inventory-context";
import { needsOrder, mainCategoryLabels, storageTypeLabels } from "@shared/schema";
import type { InventoryItem, StorageType } from "@shared/schema";
import { cn } from "@/lib/utils";

interface AlertStats {
  total: number;
  byCategory: {
    food: { total: number; byStorage: Record<StorageType, number> };
    "non-food": number;
  };
  ordered: number;
}

function calculateAlertStats(items: InventoryItem[], season: string): AlertStats {
  const stats: AlertStats = {
    total: 0,
    byCategory: {
      food: { total: 0, byStorage: { refrigerated: 0, frozen: 0, "room-temp": 0 } },
      "non-food": 0,
    },
    ordered: 0,
  };

  items.forEach(item => {
    if (needsOrder(item, season as any)) {
      stats.total++;
      if (item.mainCategory === "food") {
        stats.byCategory.food.total++;
        if (item.storageType) {
          stats.byCategory.food.byStorage[item.storageType]++;
        }
      } else {
        stats.byCategory["non-food"]++;
      }
    }
    if (item.orderPlaced) {
      stats.ordered++;
    }
  });

  return stats;
}

export function OrderAlertBanner() {
  const { items, selectedSeason } = useInventory();
  const stats = calculateAlertStats(items, selectedSeason);

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
        <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm font-medium">
                발주 필요 항목: <span className="text-destructive font-bold">{stats.total}개</span>
              </p>
              <p className="text-xs text-muted-foreground">안전재고 미달 품목을 확인해주세요</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.byCategory.food.total > 0 && (
              <Card className="p-3 bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{mainCategoryLabels.food}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {stats.byCategory.food.total}
                  </Badge>
                </div>
                {Object.entries(stats.byCategory.food.byStorage).some(([, count]) => count > 0) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {Object.entries(stats.byCategory.food.byStorage).map(([storage, count]) => 
                      count > 0 && (
                        <Badge 
                          key={storage} 
                          variant="secondary" 
                          className="text-[10px] px-1.5 py-0"
                        >
                          {storageTypeLabels[storage as StorageType]} {count}
                        </Badge>
                      )
                    )}
                  </div>
                )}
              </Card>
            )}

            {stats.byCategory["non-food"] > 0 && (
              <Card className="p-3 bg-background">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{mainCategoryLabels["non-food"]}</span>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {stats.byCategory["non-food"]}
                  </Badge>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {stats.ordered > 0 && (
        <div className="rounded-md border border-chart-4/30 bg-chart-4/5 p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-chart-4" />
            <div>
              <p className="text-sm font-medium">
                발주 완료 대기: <span className="text-chart-4 font-bold">{stats.ordered}개</span>
              </p>
              <p className="text-xs text-muted-foreground">입고 대기 중인 항목입니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
