import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  AlertTriangle, 
  Clock, 
  Check, 
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Trash2
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MenuTagInput } from "@/components/menu-tag-input";
import { useInventory } from "@/lib/inventory-context";
import { 
  needsOrder, 
  getRequiredStock, 
  getOrderQuantity,
  storageTypeLabels 
} from "@shared/schema";
import type { InventoryItem, StorageType } from "@shared/schema";
import { cn } from "@/lib/utils";

interface InventoryTableProps {
  storageTypeFilter: StorageType | "all";
  onDeleteItem: (id: string) => void;
  onUpdateItem: (id: string, updates: Partial<InventoryItem>) => void;
}

interface GroupedItems {
  [subCategory: string]: InventoryItem[];
}

function groupBySubCategory(items: InventoryItem[]): GroupedItems {
  return items.reduce((acc, item) => {
    const key = item.subCategory || "기타";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as GroupedItems);
}

export function InventoryTable({ 
  storageTypeFilter, 
  onDeleteItem, 
  onUpdateItem 
}: InventoryTableProps) {
  const { 
    items, 
    selectedSeason, 
    selectedMainCategory,
    isEditMode,
    editedItems,
    updateEditedItem,
    selectedTeam,
    collapsedGroups,
    toggleGroupCollapse
  } = useInventory();
  
  const [selectAllDate, setSelectAllDate] = useState<Date | undefined>();

  const filteredItems = items.filter(item => {
    if (item.team !== selectedTeam) return false;
    if (item.mainCategory !== selectedMainCategory) return false;
    if (selectedMainCategory === "food" && storageTypeFilter !== "all") {
      if (item.storageType !== storageTypeFilter) return false;
    }
    return true;
  });

  const groupedItems = groupBySubCategory(filteredItems);
  const subCategories = Object.keys(groupedItems).sort();

  const isGroupExpanded = (category: string) => !collapsedGroups.has(category);

  const toggleGroup = (category: string) => {
    toggleGroupCollapse(category);
  };

  const handleSelectAllDate = (date: Date | undefined) => {
    setSelectAllDate(date);
    if (date) {
      filteredItems.forEach(item => {
        updateEditedItem(item.id, { checkDate: format(date, "yyyy-MM-dd") });
      });
    }
  };

  const getEditedValue = <K extends keyof InventoryItem>(
    item: InventoryItem, 
    field: K
  ): InventoryItem[K] => {
    const edited = editedItems.get(item.id);
    if (edited && field in edited) {
      return edited[field] as InventoryItem[K];
    }
    return item[field];
  };

  const handleFieldChange = (
    item: InventoryItem, 
    field: keyof InventoryItem, 
    value: any
  ) => {
    updateEditedItem(item.id, { [field]: value });
  };

  const handleOrderCheck = (item: InventoryItem, checked: boolean) => {
    const orderQty = getOrderQuantity(item, selectedSeason);
    if (checked) {
      onUpdateItem(item.id, {
        orderStatus: "ordered",
        orderedQuantity: orderQty,
        orderedAt: new Date().toISOString(),
      });
    } else {
      onUpdateItem(item.id, {
        orderStatus: "none",
        orderedQuantity: null,
        orderedAt: null,
      });
    }
  };

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <AlertTriangle className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">등록된 항목이 없습니다</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          새로운 식재료를 추가하여 재고 관리를 시작하세요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {isEditMode && (
        <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-md">
          <span className="text-sm font-medium">전체 체크날짜 설정:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {selectAllDate ? format(selectAllDate, "yyyy-MM-dd") : "날짜 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectAllDate}
                onSelect={handleSelectAllDate}
                locale={ko}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div 
        className="rounded-md border overflow-x-auto" 
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
      >
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-10"></TableHead>
              <TableHead className="min-w-[140px]">재료명</TableHead>
              {selectedMainCategory === "food" && storageTypeFilter === "all" && (
                <TableHead className="w-20">보관</TableHead>
              )}
              <TableHead className="w-16 text-center">단위</TableHead>
              <TableHead className="w-20 text-right">현재고</TableHead>
              <TableHead className="w-20 text-right">필요재고</TableHead>
              <TableHead className="w-20 text-right">발주수량</TableHead>
              <TableHead className="min-w-[120px]">사용메뉴</TableHead>
              <TableHead className="w-28">체크날짜</TableHead>
              <TableHead className="w-32">발주상태</TableHead>
              {isEditMode && <TableHead className="w-12"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {subCategories.map(subCategory => {
              const categoryItems = groupedItems[subCategory];
              const isExpanded = isGroupExpanded(subCategory);
              
              return (
                <Collapsible key={subCategory} open={isExpanded} onOpenChange={() => toggleGroup(subCategory)} asChild>
                  <>
                    <CollapsibleTrigger asChild>
                      <TableRow 
                        className="bg-muted/30 hover:bg-muted/50 cursor-pointer"
                      >
                        <TableCell colSpan={isEditMode ? 11 : 10} className="py-2">
                          <div className="flex items-center gap-2">
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="text-sm font-medium">{subCategory}</span>
                            <Badge variant="secondary" className="text-xs">
                              {categoryItems.length}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    </CollapsibleTrigger>
                    <CollapsibleContent asChild>
                      <>
                        {categoryItems.map(item => {
                          const required = getRequiredStock(item, selectedSeason);
                          const orderQty = getOrderQuantity(item, selectedSeason);
                          const needsOrderFlag = needsOrder(item, selectedSeason);
                          const currentStock = isEditMode 
                            ? getEditedValue(item, "currentStock") 
                            : item.currentStock;
                          const checkDate = isEditMode 
                            ? getEditedValue(item, "checkDate") 
                            : item.checkDate;
                          const menuTags = isEditMode 
                            ? getEditedValue(item, "menuTags") 
                            : item.menuTags;
                          
                          return (
                            <TableRow 
                              key={item.id}
                              className={cn(
                                needsOrderFlag && item.orderStatus === "none" && "bg-destructive/5",
                                item.orderStatus === "ordered" && "bg-chart-4/5"
                              )}
                              data-testid={`row-item-${item.id}`}
                            >
                              <TableCell className="w-10">
                                {needsOrderFlag && item.orderStatus === "none" && (
                                  <AlertTriangle className="h-4 w-4 text-destructive" />
                                )}
                                {item.orderStatus === "ordered" && (
                                  <Clock className="h-4 w-4 text-chart-4" />
                                )}
                                {!needsOrderFlag && item.orderStatus === "none" && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </TableCell>
                              
                              <TableCell className="font-medium">
                                {isEditMode ? (
                                  <Input
                                    value={getEditedValue(item, "name")}
                                    onChange={(e) => handleFieldChange(item, "name", e.target.value)}
                                    className="h-8 text-sm"
                                    data-testid={`input-name-${item.id}`}
                                  />
                                ) : (
                                  item.name
                                )}
                              </TableCell>
                              
                              {selectedMainCategory === "food" && storageTypeFilter === "all" && (
                                <TableCell>
                                  <Badge variant="secondary" className="text-[10px]">
                                    {item.storageType ? storageTypeLabels[item.storageType] : "-"}
                                  </Badge>
                                </TableCell>
                              )}
                              
                              <TableCell className="text-center text-sm text-muted-foreground">
                                {isEditMode ? (
                                  <Input
                                    value={getEditedValue(item, "unit")}
                                    onChange={(e) => handleFieldChange(item, "unit", e.target.value)}
                                    className="h-8 text-sm text-center w-16"
                                    data-testid={`input-unit-${item.id}`}
                                  />
                                ) : (
                                  item.unit
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right">
                                {isEditMode ? (
                                  <Input
                                    type="number"
                                    value={currentStock}
                                    onChange={(e) => handleFieldChange(item, "currentStock", Number(e.target.value))}
                                    className="h-8 text-sm text-right w-20"
                                    min={0}
                                    data-testid={`input-stock-${item.id}`}
                                  />
                                ) : (
                                  <span className="tabular-nums font-medium">{item.currentStock}</span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right">
                                <span className="tabular-nums text-muted-foreground">{required}</span>
                              </TableCell>
                              
                              <TableCell className="text-right">
                                {orderQty > 0 ? (
                                  <Badge variant="destructive" className="tabular-nums text-xs">
                                    {orderQty}
                                  </Badge>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
                              </TableCell>
                              
                              <TableCell>
                                <MenuTagInput
                                  selectedTagIds={menuTags}
                                  onChange={(tags) => handleFieldChange(item, "menuTags", tags)}
                                  disabled={!isEditMode}
                                />
                              </TableCell>
                              
                              <TableCell>
                                {isEditMode ? (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-8 w-full text-xs gap-1"
                                      >
                                        <CalendarIcon className="h-3 w-3" />
                                        {checkDate || "선택"}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={checkDate ? new Date(checkDate) : undefined}
                                        onSelect={(date) => 
                                          handleFieldChange(
                                            item, 
                                            "checkDate", 
                                            date ? format(date, "yyyy-MM-dd") : null
                                          )
                                        }
                                        locale={ko}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    {item.checkDate || "-"}
                                  </span>
                                )}
                              </TableCell>
                              
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Checkbox
                                    checked={item.orderStatus === "ordered"}
                                    onCheckedChange={(checked) => 
                                      handleOrderCheck(item, checked as boolean)
                                    }
                                    disabled={isEditMode || (!needsOrderFlag && item.orderStatus === "none")}
                                    data-testid={`checkbox-order-${item.id}`}
                                  />
                                  {item.orderStatus === "ordered" && item.orderedAt && (
                                    <div className="text-[10px] text-muted-foreground leading-tight">
                                      <div>{format(new Date(item.orderedAt), "MM/dd HH:mm")}</div>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              
                              {isEditMode && (
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => onDeleteItem(item.id)}
                                    data-testid={`button-delete-${item.id}`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })}
                      </>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
