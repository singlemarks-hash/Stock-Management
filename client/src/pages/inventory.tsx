import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Save, X, Loader2, Snowflake, Flower2, Sun, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { OrderAlertBanner } from "@/components/order-alert-banner";
import { CategoryTabs } from "@/components/category-tabs";
import { InventoryTable } from "@/components/inventory-table";
import { AddItemDialog } from "@/components/add-item-dialog";
import { useInventory } from "@/lib/inventory-context";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { InventoryItem, StorageType, Season } from "@shared/schema";
import { teamLabels, seasonLabels } from "@shared/schema";

const seasonIcons: Record<Season, typeof Snowflake> = {
  winter: Snowflake,
  spring: Flower2,
  summer: Sun,
  fall: Leaf,
};

const seasonColors: Record<Season, string> = {
  winter: "text-blue-500",
  spring: "text-pink-500",
  summer: "text-amber-500",
  fall: "text-orange-500",
};

export default function InventoryPage() {
  const { toast } = useToast();
  const { 
    selectedTeam, 
    selectedSeason,
    isEditMode, 
    setIsEditMode,
    editedItems,
    clearEditedItems,
    isLoading
  } = useInventory();
  
  const [storageTypeFilter, setStorageTypeFilter] = useState<StorageType | "all">("all");

  const updateMutation = useMutation({
    mutationFn: async (updates: { items: Partial<InventoryItem>[] }) => {
      return apiRequest("PUT", "/api/inventory/bulk", updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      clearEditedItems();
      setIsEditMode(false);
      toast({
        title: "저장 완료",
        description: "변경사항이 저장되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "저장 실패",
        description: "변경사항을 저장하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: InventoryItem) => {
      return apiRequest("POST", "/api/inventory", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      toast({
        title: "추가 완료",
        description: "새 항목이 추가되었습니다.",
      });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/inventory/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
      toast({
        title: "삭제 완료",
        description: "항목이 삭제되었습니다.",
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<InventoryItem> }) => {
      return apiRequest("PATCH", `/api/inventory/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory"] });
    },
  });

  const handleSaveChanges = () => {
    const updates = Array.from(editedItems.entries()).map(([id, changes]) => ({
      id,
      ...changes,
    }));
    updateMutation.mutate({ items: updates });
  };

  const handleCancelEdit = () => {
    clearEditedItems();
    setIsEditMode(false);
  };

  const handleAddItem = (item: InventoryItem) => {
    addItemMutation.mutate(item);
  };

  const handleDeleteItem = (id: string) => {
    deleteItemMutation.mutate(id);
  };

  const handleUpdateItem = (id: string, updates: Partial<InventoryItem>) => {
    updateItemMutation.mutate({ id, updates });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">
            {teamLabels[selectedTeam]} 재고 관리
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-1">
            현재 시즌: 
            {(() => {
              const SeasonIcon = seasonIcons[selectedSeason];
              return <SeasonIcon className={`h-4 w-4 ${seasonColors[selectedSeason]}`} />;
            })()}
            <span className={seasonColors[selectedSeason]}>{seasonLabels[selectedSeason]}</span>
          </p>
        </div>

        <OrderAlertBanner />

        <CategoryTabs 
          selectedStorageType={storageTypeFilter}
          onStorageTypeChange={setStorageTypeFilter}
          actionButtons={
            isEditMode ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleCancelEdit}
                  disabled={updateMutation.isPending}
                  data-testid="button-cancel-edit"
                >
                  <X className="h-4 w-4 mr-2" />
                  취소
                </Button>
                <Button 
                  onClick={handleSaveChanges}
                  disabled={updateMutation.isPending || editedItems.size === 0}
                  data-testid="button-save-changes"
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  저장
                </Button>
              </>
            ) : (
              <>
                <AddItemDialog onAdd={handleAddItem} />
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditMode(true)}
                  data-testid="button-edit-mode"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  편집 모드
                </Button>
              </>
            )
          }
        />

        <InventoryTable 
          storageTypeFilter={storageTypeFilter}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem}
        />
      </div>
    </ScrollArea>
  );
}
