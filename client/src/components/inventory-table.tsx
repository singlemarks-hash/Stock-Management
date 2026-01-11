import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { 
  AlertTriangle, 
  Clock, 
  Check, 
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Trash2,
  ExternalLink,
  GripVertical
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MenuTagInput } from "@/components/menu-tag-input";
import { useInventory } from "@/lib/inventory-context";
import { 
  getRequiredStock, 
  getOrderQuantity,
  getDailyUsage,
  getLeadTime,
  getSafetyStock,
  storageTypeLabels 
} from "@shared/schema";
import type { InventoryItem, StorageType, Supplier, SeasonalRequirement } from "@shared/schema";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

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

const orderStatusLabels = {
  "normal": "정상재고",
  "need-order": "발주필요",
  "ordered": "발주완료",
} as const;

const orderStatusColors = {
  "normal": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "need-order": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  "ordered": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
} as const;

interface SortableHeaderRowProps {
  id: string;
  subCategory: string;
  itemCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  isEditMode: boolean;
  colSpan: number;
}

function SortableHeaderRow({ 
  id, 
  subCategory, 
  itemCount, 
  isExpanded, 
  onToggle,
  isEditMode,
  colSpan 
}: SortableHeaderRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow 
      ref={setNodeRef}
      style={style}
      className="bg-muted/30 hover:bg-muted/50 cursor-pointer"
      onClick={onToggle}
      data-testid={`row-subcategory-${subCategory}`}
    >
      <TableCell className="w-8 p-0">
        {isEditMode && (
          <button
            {...attributes}
            {...listeners}
            className="p-2 cursor-grab active:cursor-grabbing hover:bg-muted rounded"
            onClick={(e) => e.stopPropagation()}
            data-testid={`drag-handle-${subCategory}`}
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </TableCell>
      <TableCell colSpan={colSpan - 1} className="py-2">
        <div className="flex items-center gap-2">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">{subCategory}</span>
          <Badge variant="secondary" className="text-xs">
            {itemCount}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
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
    toggleGroupCollapse,
    getSubCategoryOrder,
    setSubCategoryOrder
  } = useInventory();
  
  const [selectAllDate, setSelectAllDate] = useState<Date | undefined>();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState<string>("");

  const { data: suppliers = [] } = useQuery<Supplier[]>({
    queryKey: ['/api/suppliers', selectedTeam],
    queryFn: async () => {
      const res = await fetch(`/api/suppliers?team=${selectedTeam}`);
      return res.json();
    },
  });

  const filteredItems = items.filter(item => {
    if (item.team !== selectedTeam) return false;
    if (item.mainCategory !== selectedMainCategory) return false;
    if (selectedMainCategory === "food" && storageTypeFilter !== "all") {
      if (item.storageType !== storageTypeFilter) return false;
    }
    return true;
  });

  const groupedItems = groupBySubCategory(filteredItems);
  
  const sortedSubCategories = useMemo(() => {
    const allSubCategories = Object.keys(groupedItems);
    const savedOrder = getSubCategoryOrder(storageTypeFilter);
    
    if (savedOrder.length === 0) {
      return allSubCategories.sort();
    }
    
    const orderedCategories: string[] = [];
    savedOrder.forEach(cat => {
      if (allSubCategories.includes(cat)) {
        orderedCategories.push(cat);
      }
    });
    allSubCategories.forEach(cat => {
      if (!orderedCategories.includes(cat)) {
        orderedCategories.push(cat);
      }
    });
    
    return orderedCategories;
  }, [groupedItems, getSubCategoryOrder, storageTypeFilter]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sortedSubCategories.indexOf(active.id as string);
      const newIndex = sortedSubCategories.indexOf(over.id as string);
      const newOrder = arrayMove(sortedSubCategories, oldIndex, newIndex);
      setSubCategoryOrder(storageTypeFilter, newOrder);
    }
  };

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

  const getSupplierById = (supplierId: string | null): Supplier | undefined => {
    if (!supplierId) return undefined;
    return suppliers.find(s => s.id === supplierId);
  };

  const getStatusIcon = (status: "normal" | "need-order" | "ordered") => {
    switch (status) {
      case "need-order":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "ordered":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "normal":
        return <Check className="h-4 w-4 text-primary" />;
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
    <>
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedSubCategories}
          strategy={verticalListSortingStrategy}
        >
          <div 
            className="rounded-md border overflow-x-auto" 
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pan-y' }}
          >
            <Table className="min-w-[1100px]">
              <TableHeader>
                <TableRow className="bg-muted/50 text-xs">
                  <TableHead className="w-6 px-1"></TableHead>
                  {isEditMode && <TableHead className="w-6 px-1"></TableHead>}
                  <TableHead className="whitespace-nowrap px-2 w-32">항목</TableHead>
                  {selectedMainCategory === "food" && storageTypeFilter === "all" && (
                    <TableHead className="whitespace-nowrap px-1 w-14">보관</TableHead>
                  )}
                  <TableHead className="whitespace-nowrap px-1 w-40 max-w-40">메뉴</TableHead>
                  <TableHead className="whitespace-nowrap text-center px-1 w-12">단위</TableHead>
                  <TableHead className="whitespace-nowrap text-right px-2 w-16">현재고</TableHead>
                  <TableHead className="whitespace-nowrap text-right px-1 w-14">하루사용량</TableHead>
                  <TableHead className="whitespace-nowrap text-right px-1 w-14">리드타임</TableHead>
                  <TableHead className="whitespace-nowrap text-right px-2 w-16">안전재고</TableHead>
                  <TableHead className="whitespace-nowrap text-right px-1 w-14">필요재고</TableHead>
                  <TableHead className="whitespace-nowrap text-center px-2 w-20">체크날짜</TableHead>
                  <TableHead className="whitespace-nowrap px-1 w-16">상태</TableHead>
                  <TableHead className="whitespace-nowrap px-1 w-20">발주처</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSubCategories.map(subCategory => {
                  const categoryItems = groupedItems[subCategory];
                  const isExpanded = isGroupExpanded(subCategory);
                  const colSpan = isEditMode ? 14 : 13;
                  
                  return (
                    <React.Fragment key={subCategory}>
                      <SortableHeaderRow
                        id={subCategory}
                        subCategory={subCategory}
                        itemCount={categoryItems.length}
                        isExpanded={isExpanded}
                        onToggle={() => toggleGroup(subCategory)}
                        isEditMode={isEditMode}
                        colSpan={colSpan}
                      />
                      {isExpanded && categoryItems.map(item => {
                          const required = getRequiredStock(item, selectedSeason);
                          const orderQty = getOrderQuantity(item, selectedSeason);
                          const currentStock = isEditMode 
                            ? getEditedValue(item, "currentStock") 
                            : item.currentStock;
                          const checkDate = isEditMode 
                            ? getEditedValue(item, "checkDate") 
                            : item.checkDate;
                          const menuTags = isEditMode 
                            ? getEditedValue(item, "menuTags") 
                            : item.menuTags;
                          
                          const getSeasonalValue = <K extends keyof SeasonalRequirement>(field: K): SeasonalRequirement[K] => {
                            const editedReqs = getEditedValue(item, "seasonalRequirements") as SeasonalRequirement[];
                            const req = editedReqs?.find(r => r.season === selectedSeason);
                            if (req && req[field] !== undefined) return req[field];
                            if (field === "dailyUsage") return getDailyUsage(item, selectedSeason) as SeasonalRequirement[K];
                            if (field === "leadTime") return getLeadTime(item, selectedSeason) as SeasonalRequirement[K];
                            if (field === "safetyStock") return getSafetyStock(item, selectedSeason) as SeasonalRequirement[K];
                            return getRequiredStock(item, selectedSeason) as SeasonalRequirement[K];
                          };
                          
                          const dailyUsage = isEditMode
                            ? getSeasonalValue("dailyUsage")
                            : getDailyUsage(item, selectedSeason);
                          const leadTime = isEditMode
                            ? getSeasonalValue("leadTime")
                            : getLeadTime(item, selectedSeason);
                          const safetyStock = isEditMode
                            ? getSeasonalValue("safetyStock")
                            : getSafetyStock(item, selectedSeason);
                          const requiredStockValue = isEditMode
                            ? getSeasonalValue("requiredStock")
                            : required;
                          
                          const handleSeasonalFieldChange = (field: keyof SeasonalRequirement, newValue: number) => {
                            const currentReqs = getEditedValue(item, "seasonalRequirements") as SeasonalRequirement[];
                            const updatedReqs = currentReqs.map(r => {
                              if (r.season !== selectedSeason) return r;
                              return {
                                season: r.season,
                                dailyUsage: r.dailyUsage ?? getDailyUsage(item, r.season),
                                leadTime: r.leadTime ?? getLeadTime(item, r.season),
                                safetyStock: r.safetyStock ?? getSafetyStock(item, r.season),
                                requiredStock: r.requiredStock ?? getRequiredStock(item, r.season),
                                [field]: newValue,
                              };
                            });
                            handleFieldChange(item, "seasonalRequirements", updatedReqs);
                          };
                          
                          const editedOrderQty = isEditMode 
                            ? Math.max(0, requiredStockValue - (currentStock as number))
                            : orderQty;
                          
                          const computedStatus = (() => {
                            const stock = isEditMode ? (currentStock as number) : item.currentStock;
                            const req = isEditMode ? requiredStockValue : required;
                            if (item.orderStatus === "ordered") return "ordered";
                            if (stock < req) return "need-order";
                            return "normal";
                          })();
                          
                          const supplier = getSupplierById(item.supplierId);
                          
                          return (
                            <TableRow 
                              key={item.id}
                              className={cn(
                                computedStatus === "need-order" && "bg-destructive/5",
                                computedStatus === "ordered" && "bg-amber-50 dark:bg-amber-900/10"
                              )}
                              data-testid={`row-item-${item.id}`}
                            >
                              <TableCell className="w-6 px-1">
                                {getStatusIcon(computedStatus)}
                              </TableCell>
                              
                              {isEditMode && (
                                <TableCell className="w-6 px-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-destructive hover:text-destructive"
                                    onClick={() => {
                                      setDeleteConfirmId(item.id);
                                      setDeleteConfirmName(item.name);
                                    }}
                                    data-testid={`button-delete-${item.id}`}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              )}
                              
                              <TableCell className="font-medium px-2 w-32">
                                {isEditMode ? (
                                  <Input
                                    value={getEditedValue(item, "name")}
                                    onChange={(e) => handleFieldChange(item, "name", e.target.value)}
                                    className="h-7 text-sm w-full"
                                    data-testid={`input-name-${item.id}`}
                                  />
                                ) : (
                                  <span className="text-sm">{item.name}</span>
                                )}
                              </TableCell>
                              
                              {selectedMainCategory === "food" && storageTypeFilter === "all" && (
                                <TableCell className="px-1 w-14">
                                  {isEditMode ? (
                                    <Select
                                      value={getEditedValue(item, "storageType") || "refrigerated"}
                                      onValueChange={(value) => handleFieldChange(item, "storageType", value)}
                                    >
                                      <SelectTrigger className="h-7 w-full text-[10px]" data-testid={`select-storage-${item.id}`}>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="refrigerated">냉장</SelectItem>
                                        <SelectItem value="frozen">냉동</SelectItem>
                                        <SelectItem value="room-temp">상온</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  ) : (
                                    <Badge variant="secondary" className="text-[10px] px-1">
                                      {item.storageType ? storageTypeLabels[item.storageType as StorageType] : "-"}
                                    </Badge>
                                  )}
                                </TableCell>
                              )}
                              
                              <TableCell className="px-1 w-40 max-w-40">
                                <div className="max-w-40 overflow-hidden">
                                  <MenuTagInput
                                    selectedTagIds={menuTags}
                                    onChange={(tags) => handleFieldChange(item, "menuTags", tags)}
                                    disabled={!isEditMode}
                                  />
                                </div>
                              </TableCell>
                              
                              <TableCell className="text-center text-muted-foreground text-xs px-1 w-12">
                                {isEditMode ? (
                                  <Input
                                    value={getEditedValue(item, "unit")}
                                    onChange={(e) => handleFieldChange(item, "unit", e.target.value)}
                                    className="h-7 text-xs text-center w-full"
                                    data-testid={`input-unit-${item.id}`}
                                  />
                                ) : (
                                  item.unit
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right text-xs px-2 w-16">
                                {isEditMode ? (
                                  <Input
                                    type="number"
                                    value={currentStock}
                                    onChange={(e) => handleFieldChange(item, "currentStock", Number(e.target.value))}
                                    className="h-7 text-sm text-right w-full border-2 border-blue-500 focus:border-blue-600 focus:ring-blue-500"
                                    min={0}
                                    data-testid={`input-stock-${item.id}`}
                                  />
                                ) : (
                                  <span className="tabular-nums font-medium text-sm">{item.currentStock}</span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right text-xs px-1 w-14">
                                {isEditMode ? (
                                  <Input
                                    type="number"
                                    value={dailyUsage ?? 0}
                                    onChange={(e) => handleSeasonalFieldChange("dailyUsage", Number(e.target.value))}
                                    className="h-7 text-sm text-right w-full"
                                    min={0}
                                    step={0.1}
                                    data-testid={`input-daily-${item.id}`}
                                  />
                                ) : (
                                  <span className="tabular-nums text-muted-foreground">{dailyUsage}</span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right text-xs px-1 w-14">
                                {isEditMode ? (
                                  <Input
                                    type="number"
                                    value={leadTime ?? 0}
                                    onChange={(e) => handleSeasonalFieldChange("leadTime", Number(e.target.value))}
                                    className="h-7 text-sm text-right w-full"
                                    min={0}
                                    data-testid={`input-lead-${item.id}`}
                                  />
                                ) : (
                                  <span className="tabular-nums text-muted-foreground">{leadTime}일</span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right text-xs px-2 w-16">
                                {isEditMode ? (
                                  <Input
                                    type="number"
                                    value={safetyStock ?? 0}
                                    onChange={(e) => handleSeasonalFieldChange("safetyStock", Number(e.target.value))}
                                    className="h-7 text-sm text-right w-full"
                                    min={0}
                                    data-testid={`input-safety-${item.id}`}
                                  />
                                ) : (
                                  <span className="tabular-nums text-muted-foreground">{safetyStock}</span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-right text-xs px-1 w-14">
                                {isEditMode ? (
                                  <Input
                                    type="number"
                                    value={requiredStockValue ?? 0}
                                    onChange={(e) => handleSeasonalFieldChange("requiredStock", Number(e.target.value))}
                                    className="h-7 text-sm text-right w-full"
                                    min={0}
                                    data-testid={`input-required-${item.id}`}
                                  />
                                ) : (
                                  <div className="flex items-center justify-end gap-1">
                                    <span className="tabular-nums text-muted-foreground">{required}</span>
                                    {editedOrderQty > 0 && (
                                      <Badge variant="destructive" className="tabular-nums text-[10px] px-1" data-testid={`badge-shortage-${item.id}`}>
                                        +{editedOrderQty}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-center text-xs px-2 w-20">
                                {isEditMode ? (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="h-7 w-full text-xs gap-1"
                                      >
                                        <CalendarIcon className="h-3 w-3" />
                                        {checkDate ? format(new Date(checkDate), "MM/dd") : "-"}
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
                                  <span className="text-muted-foreground">
                                    {item.checkDate ? format(new Date(item.checkDate), "MM/dd") : "-"}
                                  </span>
                                )}
                              </TableCell>
                              
                              <TableCell className="text-xs px-1 w-16">
                                <Badge 
                                  variant="secondary" 
                                  className={cn("text-xs px-1.5", orderStatusColors[computedStatus])}
                                >
                                  {orderStatusLabels[computedStatus]}
                                </Badge>
                              </TableCell>
                              
                              <TableCell className="text-xs px-1 w-20">
                                {isEditMode ? (
                                  <Select
                                    value={getEditedValue(item, "supplierId") || "none"}
                                    onValueChange={(value) => 
                                      handleFieldChange(item, "supplierId", value === "none" ? null : value)
                                    }
                                  >
                                    <SelectTrigger className="h-7 w-full text-xs" data-testid={`select-supplier-${item.id}`}>
                                      <SelectValue placeholder="-" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="none">-</SelectItem>
                                      {suppliers.map((s) => (
                                        <SelectItem key={s.id} value={s.id}>
                                          {s.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  supplier ? (
                                    supplier.url ? (
                                      <a 
                                        href={supplier.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-primary hover:underline"
                                      >
                                        {supplier.name}
                                        <ExternalLink className="h-2.5 w-2.5" />
                                      </a>
                                    ) : (
                                      <span className="text-muted-foreground">{supplier.name}</span>
                                    )
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </SortableContext>
      </DndContext>
    </div>
    
    <AlertDialog open={deleteConfirmId !== null} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>항목 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            "{deleteConfirmName}" 항목을 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="button-cancel-delete">취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (deleteConfirmId) {
                onDeleteItem(deleteConfirmId);
                setDeleteConfirmId(null);
              }
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-testid="button-confirm-delete"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  );
}
