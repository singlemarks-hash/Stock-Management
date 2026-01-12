import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInventory } from "@/lib/inventory-context";
import { mainCategoryLabels, storageTypeLabels } from "@shared/schema";
import type { MainCategory, StorageType } from "@shared/schema";
import { Package, ShoppingBag, Snowflake, ThermometerSnowflake, Warehouse, Star } from "lucide-react";

const mainCategoryIcons: Record<MainCategory, typeof Package> = {
  food: Package,
  "non-food": ShoppingBag,
};

const storageTypeIcons: Record<StorageType, typeof Snowflake> = {
  refrigerated: ThermometerSnowflake,
  frozen: Snowflake,
  "room-temp": Warehouse,
};

interface CategoryTabsProps {
  selectedStorageType: StorageType | "all" | "favorites";
  onStorageTypeChange: (type: StorageType | "all" | "favorites") => void;
  actionButtons?: React.ReactNode;
}

export function CategoryTabs({ selectedStorageType, onStorageTypeChange, actionButtons }: CategoryTabsProps) {
  const { selectedMainCategory, setSelectedMainCategory } = useInventory();
  
  const storageTypes: (StorageType | "all" | "favorites")[] = ["all", "refrigerated", "frozen", "room-temp", "favorites"];

  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Tabs 
          value={selectedMainCategory} 
          onValueChange={(v) => setSelectedMainCategory(v as MainCategory)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full sm:w-auto sm:max-w-md grid-cols-2">
            {(["food", "non-food"] as MainCategory[]).map((category) => {
              const Icon = mainCategoryIcons[category];
              return (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="gap-2"
                  data-testid={`tab-category-${category}`}
                >
                  <Icon className="h-4 w-4" />
                  {mainCategoryLabels[category]}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
        
        {actionButtons && (
          <div className="flex items-center gap-2">
            {actionButtons}
          </div>
        )}
      </div>

      <Tabs 
          value={selectedStorageType} 
          onValueChange={(v) => onStorageTypeChange(v as StorageType | "all" | "favorites")}
        >
          <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
            <TabsTrigger 
              value="all"
              className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-storage-all"
            >
              전체
            </TabsTrigger>
            {selectedMainCategory === "food" && (["refrigerated", "frozen", "room-temp"] as StorageType[]).map((type) => {
              const Icon = storageTypeIcons[type];
              return (
                <TabsTrigger 
                  key={type} 
                  value={type}
                  className="text-xs px-3 py-1.5 gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`tab-storage-${type}`}
                >
                  <Icon className="h-3 w-3" />
                  {storageTypeLabels[type]}
                </TabsTrigger>
              );
            })}
            <TabsTrigger 
              value="favorites"
              className="text-xs px-3 py-1.5 gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid="tab-storage-favorites"
            >
              <Star className="h-3 w-3" />
              즐겨찾기
            </TabsTrigger>
          </TabsList>
        </Tabs>
    </div>
  );
}
