import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useInventory } from "@/lib/inventory-context";
import { 
  mainCategoryLabels, 
  storageTypeLabels,
  type MainCategory,
  type StorageType,
  type Season,
  type SubCategory,
  type Supplier
} from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "재료명을 입력해주세요"),
  mainCategory: z.enum(["food", "non-food"]),
  storageType: z.enum(["refrigerated", "frozen", "room-temp"]).nullable(),
  subCategory: z.string().min(1, "소분류를 선택해주세요"),
  unit: z.string().min(1, "단위를 입력해주세요"),
  currentStock: z.number().min(0, "0 이상의 숫자를 입력해주세요"),
  dailyUsage: z.number().min(0, "0 이상의 숫자를 입력해주세요"),
  leadTime: z.number().min(0, "0 이상의 숫자를 입력해주세요"),
  safetyStock: z.number().min(0, "0 이상의 숫자를 입력해주세요"),
  winterRequired: z.number().min(0),
  springRequired: z.number().min(0),
  summerRequired: z.number().min(0),
  fallRequired: z.number().min(0),
  supplierId: z.string().nullable(),
});

type FormData = z.infer<typeof formSchema>;

interface AddItemDialogProps {
  onAdd: (item: any) => void;
}

export function AddItemDialog({ onAdd }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [supplierOpen, setSupplierOpen] = useState(false);
  const [newSubCategoryInput, setNewSubCategoryInput] = useState("");
  const [newSupplierInput, setNewSupplierInput] = useState("");
  const { selectedTeam, selectedMainCategory } = useInventory();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mainCategory: selectedMainCategory,
      storageType: selectedMainCategory === "food" ? "refrigerated" : null,
      subCategory: "",
      unit: "개",
      currentStock: 0,
      dailyUsage: 0,
      leadTime: 1,
      safetyStock: 0,
      winterRequired: 0,
      springRequired: 0,
      summerRequired: 0,
      fallRequired: 0,
      supplierId: null,
    },
  });

  const watchMainCategory = form.watch("mainCategory");

  const { data: subCategoriesData, isLoading: isLoadingSubCategories } = useQuery<SubCategory[]>({
    queryKey: ['/api/subcategories', selectedTeam, watchMainCategory],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/subcategories?team=${selectedTeam}&mainCategory=${watchMainCategory}`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch {
        return [];
      }
    },
    enabled: open,
  });
  const subCategories = subCategoriesData ?? [];

  const { data: suppliersData, isLoading: isLoadingSuppliers } = useQuery<Supplier[]>({
    queryKey: ['/api/suppliers', selectedTeam],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/suppliers?team=${selectedTeam}`);
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch {
        return [];
      }
    },
    enabled: open,
  });
  const suppliers = suppliersData ?? [];

  const createSubCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest('POST', '/api/subcategories', {
        team: selectedTeam,
        mainCategory: watchMainCategory,
        name,
      });
      return res.json() as Promise<SubCategory>;
    },
    onSuccess: async (newSubCategory: SubCategory) => {
      await queryClient.invalidateQueries({ queryKey: ['/api/subcategories'] });
      form.setValue("subCategory", newSubCategory.name);
      setSubCategoryOpen(false);
      setNewSubCategoryInput("");
    },
  });

  const createSupplierMutation = useMutation({
    mutationFn: async (name: string) => {
      const res = await apiRequest('POST', '/api/suppliers', {
        team: selectedTeam,
        name,
        url: null,
      });
      return res.json() as Promise<Supplier>;
    },
    onSuccess: async (newSupplier: Supplier) => {
      await queryClient.invalidateQueries({ queryKey: ['/api/suppliers'] });
      form.setValue("supplierId", newSupplier.id);
      setSupplierOpen(false);
      setNewSupplierInput("");
    },
  });

  const deleteSubCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/subcategories/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/subcategories'] });
    },
  });

  const deleteSupplierMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/suppliers/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/suppliers'] });
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        mainCategory: selectedMainCategory,
        storageType: selectedMainCategory === "food" ? "refrigerated" : null,
        subCategory: "",
        unit: "개",
        currentStock: 0,
        dailyUsage: 0,
        leadTime: 1,
        safetyStock: 0,
        winterRequired: 0,
        springRequired: 0,
        summerRequired: 0,
        fallRequired: 0,
        supplierId: null,
      });
    }
  }, [open, selectedMainCategory, form]);

  useEffect(() => {
    form.setValue("subCategory", "");
  }, [watchMainCategory, form]);

  const onSubmit = (data: FormData) => {
    const item = {
      id: crypto.randomUUID(),
      team: selectedTeam,
      name: data.name,
      mainCategory: data.mainCategory,
      storageType: data.mainCategory === "food" ? data.storageType : null,
      subCategory: data.subCategory,
      unit: data.unit,
      currentStock: data.currentStock,
      dailyUsage: data.dailyUsage,
      leadTime: data.leadTime,
      safetyStock: data.safetyStock,
      seasonalRequirements: [
        { season: "winter" as Season, dailyUsage: data.dailyUsage, leadTime: data.leadTime, safetyStock: data.safetyStock, requiredStock: data.winterRequired },
        { season: "spring" as Season, dailyUsage: data.dailyUsage, leadTime: data.leadTime, safetyStock: data.safetyStock, requiredStock: data.springRequired },
        { season: "summer" as Season, dailyUsage: data.dailyUsage, leadTime: data.leadTime, safetyStock: data.safetyStock, requiredStock: data.summerRequired },
        { season: "fall" as Season, dailyUsage: data.dailyUsage, leadTime: data.leadTime, safetyStock: data.safetyStock, requiredStock: data.fallRequired },
      ],
      menuTags: [],
      checkDate: null,
      orderStatus: "normal",
      orderedQuantity: null,
      orderedAt: null,
      supplierId: data.supplierId,
    };

    onAdd(item);
    form.reset();
    setOpen(false);
  };

  const handleAddNewSubCategory = () => {
    const trimmedInput = newSubCategoryInput.trim();
    if (!trimmedInput) return;
    
    const exists = subCategories.some(sc => sc.name === trimmedInput);
    if (exists) {
      form.setValue("subCategory", trimmedInput);
      setSubCategoryOpen(false);
      setNewSubCategoryInput("");
      return;
    }
    
    createSubCategoryMutation.mutate(trimmedInput);
  };

  const handleAddNewSupplier = () => {
    const trimmedInput = newSupplierInput.trim();
    if (!trimmedInput) return;
    
    const exists = suppliers.some(s => s.name === trimmedInput);
    if (exists) {
      const existing = suppliers.find(s => s.name === trimmedInput);
      if (existing) {
        form.setValue("supplierId", existing.id);
      }
      setSupplierOpen(false);
      setNewSupplierInput("");
      return;
    }
    
    createSupplierMutation.mutate(trimmedInput);
  };

  const getSupplierName = (supplierId: string | null): string => {
    if (!supplierId) return "";
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier?.name || "";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-add-item">
          <Plus className="h-4 w-4" />
          새 항목 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {watchMainCategory === "food" ? "새 식재료 추가" : "새 비품 추가"}
          </DialogTitle>
          <DialogDescription>
            {watchMainCategory === "food" 
              ? "새로운 재고 항목을 등록합니다." 
              : "새로운 비품을 등록합니다."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>재료명</FormLabel>
                    <FormControl>
                      <Input placeholder="예: 우유" {...field} data-testid="input-add-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대분류</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-add-category">
                          <SelectValue placeholder="선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(Object.keys(mainCategoryLabels) as MainCategory[]).map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {mainCategoryLabels[cat]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchMainCategory === "food" && (
                <FormField
                  control={form.control}
                  name="storageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>보관방법</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-add-storage">
                            <SelectValue placeholder="선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(Object.keys(storageTypeLabels) as StorageType[]).map(type => (
                            <SelectItem key={type} value={type}>
                              {storageTypeLabels[type]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>소분류</FormLabel>
                    <Popover open={subCategoryOpen} onOpenChange={setSubCategoryOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={subCategoryOpen}
                            className="w-full justify-between font-normal"
                            data-testid="select-add-subcategory"
                          >
                            {field.value || "소분류 선택..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="소분류 검색 또는 새로 입력..." 
                            value={newSubCategoryInput}
                            onValueChange={setNewSubCategoryInput}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {!newSubCategoryInput.trim() && (
                                <span className="text-muted-foreground text-sm p-2">
                                  소분류가 없습니다.
                                </span>
                              )}
                            </CommandEmpty>
                            <CommandGroup>
                              {subCategories.map((sc) => (
                                <CommandItem
                                  key={sc.id}
                                  value={sc.name}
                                  onSelect={(value) => {
                                    form.setValue("subCategory", value);
                                    setSubCategoryOpen(false);
                                    setNewSubCategoryInput("");
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === sc.name ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {sc.name}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (field.value === sc.name) {
                                        form.setValue("subCategory", "");
                                      }
                                      deleteSubCategoryMutation.mutate(sc.id);
                                    }}
                                    className="ml-1 rounded opacity-20 hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                                    data-testid={`button-delete-subcategory-${sc.id}`}
                                  >
                                    <X className="h-1.5 w-1.5" />
                                  </button>
                                </CommandItem>
                              ))}
                              {newSubCategoryInput.trim() && !subCategories.some(sc => sc.name.toLowerCase() === newSubCategoryInput.toLowerCase()) && (
                                <CommandItem
                                  value={`__create__${newSubCategoryInput}`}
                                  onSelect={() => handleAddNewSubCategory()}
                                  className="text-primary"
                                  forceMount
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  "{newSubCategoryInput}" 새로 추가
                                </CommandItem>
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>단위</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="예: 개, kg, L" 
                        {...field} 
                        data-testid="input-add-unit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>현재고</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-add-stock"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dailyUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>하루사용량</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0}
                        step={0.1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-add-daily"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="leadTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>리드타임 (일)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-add-lead"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="safetyStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>안전재고</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={0}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        data-testid="input-add-safety"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>발주처</FormLabel>
                    <Popover open={supplierOpen} onOpenChange={setSupplierOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={supplierOpen}
                            className="w-full justify-between font-normal"
                            data-testid="select-add-supplier"
                          >
                            {getSupplierName(field.value) || "발주처 선택..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput 
                            placeholder="발주처 검색 또는 새로 입력..." 
                            value={newSupplierInput}
                            onValueChange={setNewSupplierInput}
                          />
                          <CommandList>
                            <CommandEmpty>
                              {!newSupplierInput.trim() && (
                                <span className="text-muted-foreground text-sm p-2">
                                  발주처가 없습니다.
                                </span>
                              )}
                            </CommandEmpty>
                            <CommandGroup>
                              {suppliers.map((s) => (
                                <CommandItem
                                  key={s.id}
                                  value={s.name}
                                  onSelect={() => {
                                    form.setValue("supplierId", s.id);
                                    setSupplierOpen(false);
                                    setNewSupplierInput("");
                                  }}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === s.id ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {s.name}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (field.value === s.id) {
                                        form.setValue("supplierId", null);
                                      }
                                      deleteSupplierMutation.mutate(s.id);
                                    }}
                                    className="ml-1 rounded opacity-20 hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                                    data-testid={`button-delete-supplier-${s.id}`}
                                  >
                                    <X className="h-1.5 w-1.5" />
                                  </button>
                                </CommandItem>
                              ))}
                              {newSupplierInput.trim() && !suppliers.some(s => s.name.toLowerCase() === newSupplierInput.toLowerCase()) && (
                                <CommandItem
                                  value={`__create__${newSupplierInput}`}
                                  onSelect={() => handleAddNewSupplier()}
                                  className="text-primary"
                                  forceMount
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  "{newSupplierInput}" 새로 추가
                                </CommandItem>
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>시즌별 필요재고</FormLabel>
              <div className="grid grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name="winterRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">겨울</label>
                          <Input 
                            type="number" 
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-8"
                            data-testid="input-add-winter"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="springRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">봄</label>
                          <Input 
                            type="number" 
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-8"
                            data-testid="input-add-spring"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="summerRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">여름</label>
                          <Input 
                            type="number" 
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-8"
                            data-testid="input-add-summer"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fallRequired"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">가을</label>
                          <Input 
                            type="number" 
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-8"
                            data-testid="input-add-fall"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                취소
              </Button>
              <Button type="submit" data-testid="button-submit-add">
                추가
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
