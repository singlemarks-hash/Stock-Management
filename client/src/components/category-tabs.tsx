import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useInventory } from "@/lib/inventory-context";
import { mainCategoryLabels, storageTypeLabels } from "@shared/schema";
import type { MainCategory, StorageType } from "@shared/schema";
import { Package, ShoppingBag, Snowflake, ThermometerSnowflake, Warehouse, Star, Search, X } from "lucide-react";

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
  const { selectedMainCategory, setSelectedMainCategory, searchQuery, setSearchQuery } = useInventory();
  
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

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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
        
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="재료 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-8 h-8 text-sm"
            data-testid="input-search-inventory"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-muted transition-colors"
              data-testid="button-clear-search"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
