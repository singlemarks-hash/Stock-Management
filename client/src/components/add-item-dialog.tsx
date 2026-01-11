import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
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
import { useInventory } from "@/lib/inventory-context";
import { 
  mainCategoryLabels, 
  storageTypeLabels,
  type MainCategory,
  type StorageType,
  type Season
} from "@shared/schema";

const formSchema = z.object({
  name: z.string().min(1, "재료명을 입력해주세요"),
  mainCategory: z.enum(["food", "non-food"]),
  storageType: z.enum(["refrigerated", "frozen", "room-temp"]).nullable(),
  subCategory: z.string().min(1, "소분류를 입력해주세요"),
  unit: z.string().min(1, "단위를 입력해주세요"),
  currentStock: z.number().min(0, "0 이상의 숫자를 입력해주세요"),
  winterRequired: z.number().min(0),
  springRequired: z.number().min(0),
  summerRequired: z.number().min(0),
  fallRequired: z.number().min(0),
});

type FormData = z.infer<typeof formSchema>;

interface AddItemDialogProps {
  onAdd: (item: any) => void;
}

export function AddItemDialog({ onAdd }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
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
      winterRequired: 0,
      springRequired: 0,
      summerRequired: 0,
      fallRequired: 0,
    },
  });

  const watchMainCategory = form.watch("mainCategory");

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
      seasonalRequirements: [
        { season: "winter" as Season, requiredStock: data.winterRequired },
        { season: "spring" as Season, requiredStock: data.springRequired },
        { season: "summer" as Season, requiredStock: data.summerRequired },
        { season: "fall" as Season, requiredStock: data.fallRequired },
      ],
      menuTags: [],
      checkDate: null,
      orderPlaced: false,
      orderPlacedAt: null,
      orderPlacedBy: null,
    };

    onAdd(item);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" data-testid="button-add-item">
          <Plus className="h-4 w-4" />
          새 항목 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>새 식재료 추가</DialogTitle>
          <DialogDescription>
            새로운 재고 항목을 등록합니다. 시즌별 필요재고를 설정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <FormLabel>중분류 (보관)</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || undefined}
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
                  <FormItem className={watchMainCategory === "food" ? "" : "col-span-2"}>
                    <FormLabel>소분류</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="예: 유제품·치즈" 
                        {...field} 
                        data-testid="input-add-subcategory"
                      />
                    </FormControl>
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
                          <label className="text-xs text-muted-foreground flex items-center gap-1">
                            <span>❄️</span> 겨울
                          </label>
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
                          <label className="text-xs text-muted-foreground flex items-center gap-1">
                            <span>🌸</span> 봄
                          </label>
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
                          <label className="text-xs text-muted-foreground flex items-center gap-1">
                            <span>☀️</span> 여름
                          </label>
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
                          <label className="text-xs text-muted-foreground flex items-center gap-1">
                            <span>🍂</span> 가을
                          </label>
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
