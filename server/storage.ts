import { randomUUID } from "crypto";
import type { 
  InventoryItem, 
  InsertInventoryItem, 
  MenuTag, 
  InsertMenuTag,
  SubCategory,
  InsertSubCategory,
  Supplier,
  InsertSupplier,
  Team,
  Season,
  MainCategory
} from "@shared/schema";

export interface IStorage {
  getItems(team: Team): Promise<InventoryItem[]>;
  getItem(id: string): Promise<InventoryItem | undefined>;
  createItem(item: InsertInventoryItem): Promise<InventoryItem>;
  updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | undefined>;
  deleteItem(id: string): Promise<boolean>;
  bulkUpdateItems(updates: { id: string; [key: string]: any }[]): Promise<void>;
  
  getTags(team?: Team): Promise<MenuTag[]>;
  createTag(tag: InsertMenuTag): Promise<MenuTag>;
  deleteTag(id: string): Promise<boolean>;
  
  getSubCategories(team: Team, mainCategory?: MainCategory): Promise<SubCategory[]>;
  createSubCategory(subCategory: InsertSubCategory): Promise<SubCategory>;
  
  getSuppliers(team: Team): Promise<Supplier[]>;
  createSupplier(supplier: InsertSupplier): Promise<Supplier>;
}

export class MemStorage implements IStorage {
  private items: Map<string, InventoryItem>;
  private tags: Map<string, MenuTag>;
  private subCategories: Map<string, SubCategory>;
  private suppliers: Map<string, Supplier>;

  constructor() {
    this.items = new Map();
    this.tags = new Map();
    this.subCategories = new Map();
    this.suppliers = new Map();
    this.seedData();
  }

  private seedData() {
    const kitchenTags: MenuTag[] = [
      { id: "tag-k1", team: "kitchen", name: "코티지파이", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
      { id: "tag-k2", team: "kitchen", name: "까망베르치즈구이", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-k3", team: "kitchen", name: "올리브파스타", color: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300" },
      { id: "tag-k4", team: "kitchen", name: "잠봉파스타", color: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300" },
      { id: "tag-k5", team: "kitchen", name: "프렌치토스트", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-k6", team: "kitchen", name: "토마토스프", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
      { id: "tag-k7", team: "kitchen", name: "꿀대구", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-k8", team: "kitchen", name: "뇨끼", color: "bg-stone-100 text-stone-700 dark:bg-stone-900/30 dark:text-stone-300" },
      { id: "tag-k9", team: "kitchen", name: "치즈팔레트", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-k10", team: "kitchen", name: "티라미슈", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-k11", team: "kitchen", name: "샐러드", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
      { id: "tag-k12", team: "kitchen", name: "브루기뇽", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
      { id: "tag-k13", team: "kitchen", name: "감바스", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
      { id: "tag-k14", team: "kitchen", name: "어니언스프", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-k15", team: "kitchen", name: "트러플추가", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
      { id: "tag-k16", team: "kitchen", name: "오이스터", color: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300" },
      { id: "tag-k17", team: "kitchen", name: "수제바게트", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
    ];
    
    const cafeTags: MenuTag[] = [
      { id: "tag-c1", team: "cafe", name: "아메리카노", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
      { id: "tag-c2", team: "cafe", name: "카페라떼", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
      { id: "tag-c3", team: "cafe", name: "바닐라라떼", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" },
      { id: "tag-c4", team: "cafe", name: "카푸치노", color: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300" },
      { id: "tag-c5", team: "cafe", name: "에스프레소", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
      { id: "tag-c6", team: "cafe", name: "모카", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300" },
    ];

    [...kitchenTags, ...cafeTags].forEach(tag => this.tags.set(tag.id, tag));

    const kitchenSubCategories: SubCategory[] = [
      // 냉장 subcategories
      { id: "subcat-k1", team: "kitchen", mainCategory: "food", name: "유제품&치즈" },
      { id: "subcat-k2", team: "kitchen", mainCategory: "food", name: "가공육류&알" },
      { id: "subcat-k3", team: "kitchen", mainCategory: "food", name: "잎채소&허브류" },
      { id: "subcat-k4", team: "kitchen", mainCategory: "food", name: "채소&버섯&과일" },
      { id: "subcat-k5", team: "kitchen", mainCategory: "food", name: "소스&절임류" },
      { id: "subcat-k6", team: "kitchen", mainCategory: "food", name: "특수발주" },
      // 냉동 subcategories
      { id: "subcat-k7", team: "kitchen", mainCategory: "food", name: "냉동유제품" },
      { id: "subcat-k8", team: "kitchen", mainCategory: "food", name: "냉동육류" },
      { id: "subcat-k9", team: "kitchen", mainCategory: "food", name: "냉동해산물" },
      { id: "subcat-k10", team: "kitchen", mainCategory: "food", name: "냉동빵류" },
      { id: "subcat-k11", team: "kitchen", mainCategory: "food", name: "냉동기타" },
      // 상온 subcategories
      { id: "subcat-k12", team: "kitchen", mainCategory: "food", name: "상온채소" },
      { id: "subcat-k13", team: "kitchen", mainCategory: "food", name: "가공식품" },
      { id: "subcat-k14", team: "kitchen", mainCategory: "food", name: "오일" },
      { id: "subcat-k15", team: "kitchen", mainCategory: "food", name: "캔" },
      { id: "subcat-k16", team: "kitchen", mainCategory: "food", name: "상온소스" },
      { id: "subcat-k17", team: "kitchen", mainCategory: "food", name: "건허브&향신료" },
      { id: "subcat-k18", team: "kitchen", mainCategory: "food", name: "견과류&곡물류" },
      { id: "subcat-k19", team: "kitchen", mainCategory: "food", name: "가루류" },
      // 비식품
      { id: "subcat-k20", team: "kitchen", mainCategory: "non-food", name: "소모품" },
    ];

    const cafeSubCategories: SubCategory[] = [
      { id: "subcat-c1", team: "cafe", mainCategory: "food", name: "원두·커피" },
      { id: "subcat-c2", team: "cafe", mainCategory: "food", name: "시럽·소스" },
      { id: "subcat-c3", team: "cafe", mainCategory: "non-food", name: "소모품" },
    ];

    [...kitchenSubCategories, ...cafeSubCategories].forEach(sc => this.subCategories.set(sc.id, sc));

    const kitchenSuppliers: Supplier[] = [
      { id: "sup-k1", team: "kitchen", name: "도레미", url: null },
      { id: "sup-k2", team: "kitchen", name: "쿠팡", url: "https://www.coupang.com" },
      { id: "sup-k3", team: "kitchen", name: "그린팜", url: null },
      { id: "sup-k4", team: "kitchen", name: "네이버", url: "https://shopping.naver.com" },
      { id: "sup-k5", team: "kitchen", name: "기타", url: null },
    ];

    const cafeSuppliers: Supplier[] = [
      { id: "sup-c1", team: "cafe", name: "도레미", url: null },
      { id: "sup-c2", team: "cafe", name: "쿠팡", url: "https://www.coupang.com" },
      { id: "sup-c3", team: "cafe", name: "그린팜", url: null },
      { id: "sup-c4", team: "cafe", name: "네이버", url: "https://shopping.naver.com" },
      { id: "sup-c5", team: "cafe", name: "기타", url: null },
    ];

    [...kitchenSuppliers, ...cafeSuppliers].forEach(s => this.suppliers.set(s.id, s));

    // Helper to create default item structure
    const createKitchenItem = (
      id: string, name: string, storageType: "refrigerated" | "frozen" | "room-temp" | null, 
      subCategory: string, unit: string = "개"
    ): InventoryItem => ({
      id, team: "kitchen", name, mainCategory: "food", storageType, subCategory, unit,
      currentStock: 0, dailyUsage: 0, leadTime: 1, safetyStock: 0,
      seasonalRequirements: [
        { season: "winter", requiredStock: 0 },
        { season: "spring", requiredStock: 0 },
        { season: "summer", requiredStock: 0 },
        { season: "fall", requiredStock: 0 },
      ],
      menuTags: [], checkDate: null, orderStatus: "normal", orderedQuantity: null, orderedAt: null, supplierId: null,
    });

    const kitchenItems: InventoryItem[] = [
      // 냉장 - 유제품&치즈 (15 items)
      createKitchenItem("item-1", "슬라이스 치즈", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-2", "까망베르 치즈", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-3", "그라나파다노", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-4", "페코리노", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-5", "난황", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-6", "우유", "refrigerated", "유제품&치즈", "L"),
      createKitchenItem("item-7", "생크림", "refrigerated", "유제품&치즈", "L"),
      createKitchenItem("item-8", "비건생크림", "refrigerated", "유제품&치즈", "L"),
      createKitchenItem("item-9", "마가린", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-10", "마스카포네치즈", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-11", "과일치즈", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-12", "스모크치즈", "refrigerated", "유제품&치즈", "개"),
      createKitchenItem("item-13", "크림치즈", "refrigerated", "유제품&치즈", "개"),
      // 냉장 - 가공육류&알 (3 items)
      createKitchenItem("item-14", "살라미", "refrigerated", "가공육류&알", "개"),
      createKitchenItem("item-15", "하몽", "refrigerated", "가공육류&알", "개"),
      createKitchenItem("item-16", "달걀", "refrigerated", "가공육류&알", "판"),
      // 냉장 - 잎채소&허브류 (5 items)
      createKitchenItem("item-17", "딜", "refrigerated", "잎채소&허브류", "묶음"),
      createKitchenItem("item-18", "어린잎 250g", "refrigerated", "잎채소&허브류", "팩"),
      createKitchenItem("item-19", "치커리", "refrigerated", "잎채소&허브류", "개"),
      createKitchenItem("item-20", "파세리", "refrigerated", "잎채소&허브류", "묶음"),
      createKitchenItem("item-21", "타임", "refrigerated", "잎채소&허브류", "묶음"),
      // 냉장 - 채소&버섯&과일 (15 items)
      createKitchenItem("item-22", "전처리양파_채", "refrigerated", "채소&버섯&과일", "팩"),
      createKitchenItem("item-23", "전처리양파_초핑", "refrigerated", "채소&버섯&과일", "팩"),
      createKitchenItem("item-24", "깐양파", "refrigerated", "채소&버섯&과일", "kg"),
      createKitchenItem("item-25", "파프리카", "refrigerated", "채소&버섯&과일", "개"),
      createKitchenItem("item-26", "토마토", "refrigerated", "채소&버섯&과일", "개"),
      createKitchenItem("item-27", "방울토마토", "refrigerated", "채소&버섯&과일", "팩"),
      createKitchenItem("item-28", "깐마늘", "refrigerated", "채소&버섯&과일", "kg"),
      createKitchenItem("item-29", "편마늘", "refrigerated", "채소&버섯&과일", "kg"),
      createKitchenItem("item-30", "꽈리고추", "refrigerated", "채소&버섯&과일", "팩"),
      createKitchenItem("item-31", "양송이", "refrigerated", "채소&버섯&과일", "팩"),
      createKitchenItem("item-32", "당근", "refrigerated", "채소&버섯&과일", "개"),
      createKitchenItem("item-33", "샐러리", "refrigerated", "채소&버섯&과일", "개"),
      createKitchenItem("item-34", "레몬", "refrigerated", "채소&버섯&과일", "개"),
      createKitchenItem("item-35", "청포도or샤인머스캣", "refrigerated", "채소&버섯&과일", "팩"),
      createKitchenItem("item-36", "바나나", "refrigerated", "채소&버섯&과일", "송이"),
      // 냉장 - 소스&절임류 (7 items)
      createKitchenItem("item-37", "마요네즈", "refrigerated", "소스&절임류", "개"),
      createKitchenItem("item-38", "라임주스", "refrigerated", "소스&절임류", "병"),
      createKitchenItem("item-39", "카스텔베트라노", "refrigerated", "소스&절임류", "병"),
      createKitchenItem("item-40", "아르티지아니트러플소스", "refrigerated", "소스&절임류", "병"),
      createKitchenItem("item-41", "굴소스", "refrigerated", "소스&절임류", "병"),
      createKitchenItem("item-42", "케이퍼", "refrigerated", "소스&절임류", "병"),
      createKitchenItem("item-43", "앤초비", "refrigerated", "소스&절임류", "캔"),
      // 냉장 - 특수발주 (2 items)
      createKitchenItem("item-44", "삼배체굴", "refrigerated", "특수발주", "개"),
      createKitchenItem("item-45", "생트러플", "refrigerated", "특수발주", "g"),
      // 냉동 - 유제품 (2 items)
      createKitchenItem("item-46", "모짜렐라", "frozen", "냉동유제품", "개"),
      createKitchenItem("item-47", "버터", "frozen", "냉동유제품", "개"),
      // 냉동 - 육류 (4 items)
      createKitchenItem("item-48", "베이컨", "frozen", "냉동육류", "팩"),
      createKitchenItem("item-49", "잠봉", "frozen", "냉동육류", "개"),
      createKitchenItem("item-50", "우민찌", "frozen", "냉동육류", "kg"),
      createKitchenItem("item-51", "돈민찌", "frozen", "냉동육류", "kg"),
      // 냉동 - 해산물 (2 items)
      createKitchenItem("item-52", "새우", "frozen", "냉동해산물", "kg"),
      createKitchenItem("item-53", "연어", "frozen", "냉동해산물", "kg"),
      // 냉동 - 빵류 (2 items)
      createKitchenItem("item-54", "바게트", "frozen", "냉동빵류", "개"),
      createKitchenItem("item-55", "브리오슈", "frozen", "냉동빵류", "개"),
      // 냉동 - 기타 (3 items)
      createKitchenItem("item-56", "냉동브로콜리", "frozen", "냉동기타", "팩"),
      createKitchenItem("item-57", "매쉬드", "frozen", "냉동기타", "팩"),
      createKitchenItem("item-58", "라즈베리", "frozen", "냉동기타", "팩"),
      // 상온 - 채소 (1 item)
      createKitchenItem("item-59", "샬롯", "room-temp", "상온채소", "개"),
      // 상온 - 가공식품 (4 items)
      createKitchenItem("item-60", "크래커", "room-temp", "가공식품", "개"),
      createKitchenItem("item-61", "링귀니", "room-temp", "가공식품", "봉"),
      createKitchenItem("item-62", "리가토니", "room-temp", "가공식품", "봉"),
      createKitchenItem("item-63", "사보이아르디", "room-temp", "가공식품", "팩"),
      // 상온 - 오일 (2 items)
      createKitchenItem("item-64", "포마스", "room-temp", "오일", "L"),
      createKitchenItem("item-65", "엑스트라버진", "room-temp", "오일", "L"),
      // 상온 - 캔 (4 items)
      createKitchenItem("item-66", "블랙올리브", "room-temp", "캔", "캔"),
      createKitchenItem("item-67", "할라피뇨", "room-temp", "캔", "캔"),
      createKitchenItem("item-68", "롱고바디", "room-temp", "캔", "캔"),
      createKitchenItem("item-69", "토마토페이스트", "room-temp", "캔", "캔"),
      // 상온 - 소스 (10 items)
      createKitchenItem("item-70", "팩와인_레드", "room-temp", "상온소스", "팩"),
      createKitchenItem("item-71", "팩와인_화이트", "room-temp", "상온소스", "팩"),
      createKitchenItem("item-72", "발사믹", "room-temp", "상온소스", "병"),
      createKitchenItem("item-73", "화이트와인비네거", "room-temp", "상온소스", "병"),
      createKitchenItem("item-74", "샴페인비네거", "room-temp", "상온소스", "병"),
      createKitchenItem("item-75", "타바스코150ml", "room-temp", "상온소스", "병"),
      createKitchenItem("item-76", "메이플시럽", "room-temp", "상온소스", "병"),
      createKitchenItem("item-77", "꿀", "room-temp", "상온소스", "병"),
      createKitchenItem("item-78", "이금기치킨스톡농축액", "room-temp", "상온소스", "병"),
      createKitchenItem("item-79", "피스타치오스프레드", "room-temp", "상온소스", "병"),
      // 상온 - 건허브&향신료 (9 items)
      createKitchenItem("item-80", "이탈리안허브시즈닝", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-81", "파프리카시즈닝", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-82", "오레가노", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-83", "바질립드", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-84", "통흑후추", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-85", "백후추", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-86", "핑크페퍼", "room-temp", "건허브&향신료", "병"),
      createKitchenItem("item-87", "베트남고추", "room-temp", "건허브&향신료", "팩"),
      createKitchenItem("item-88", "시나몬파우더", "room-temp", "건허브&향신료", "병"),
      // 상온 - 견과류&곡물류 (8 items)
      createKitchenItem("item-89", "피칸", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-90", "아몬드", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-91", "캐슈넛", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-92", "오트밀", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-93", "해바라기씨", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-94", "호박씨", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-95", "헤이즐넛", "room-temp", "견과류&곡물류", "팩"),
      createKitchenItem("item-96", "코코넛롱", "room-temp", "견과류&곡물류", "팩"),
      // 상온 - 가루류 (9 items)
      createKitchenItem("item-97", "구운소금", "room-temp", "가루류", "팩"),
      createKitchenItem("item-98", "천일염", "room-temp", "가루류", "팩"),
      createKitchenItem("item-99", "백설탕", "room-temp", "가루류", "팩"),
      createKitchenItem("item-100", "황설탕", "room-temp", "가루류", "팩"),
      createKitchenItem("item-101", "흑설탕", "room-temp", "가루류", "팩"),
      createKitchenItem("item-102", "박력분", "room-temp", "가루류", "봉"),
      createKitchenItem("item-103", "중력분", "room-temp", "가루류", "봉"),
      createKitchenItem("item-104", "강력분", "room-temp", "가루류", "봉"),
      createKitchenItem("item-105", "호밀가루", "room-temp", "가루류", "봉"),
    ];

    const cafeItems: InventoryItem[] = [
      {
        id: "item-cafe-1",
        team: "cafe",
        name: "원두 (에티오피아)",
        mainCategory: "food",
        storageType: "room-temp",
        subCategory: "원두·커피",
        unit: "kg",
        currentStock: 5,
        dailyUsage: 1,
        leadTime: 3,
        safetyStock: 5,
        seasonalRequirements: [
          { season: "winter", requiredStock: 10 },
          { season: "spring", requiredStock: 8 },
          { season: "summer", requiredStock: 6 },
          { season: "fall", requiredStock: 8 },
        ],
        menuTags: ["tag-c1", "tag-c5"],
        checkDate: "2026-01-10",
        orderStatus: "need-order",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-c1",
      },
      {
        id: "item-cafe-2",
        team: "cafe",
        name: "바닐라 시럽",
        mainCategory: "food",
        storageType: "room-temp",
        subCategory: "시럽·소스",
        unit: "병",
        currentStock: 3,
        dailyUsage: 0.5,
        leadTime: 2,
        safetyStock: 2,
        seasonalRequirements: [
          { season: "winter", requiredStock: 4 },
          { season: "spring", requiredStock: 5 },
          { season: "summer", requiredStock: 6 },
          { season: "fall", requiredStock: 5 },
        ],
        menuTags: ["tag-c3"],
        checkDate: "2026-01-10",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-c2",
      },
      {
        id: "item-cafe-3",
        team: "cafe",
        name: "컵 (16oz)",
        mainCategory: "non-food",
        storageType: null,
        subCategory: "소모품",
        unit: "박스",
        currentStock: 5,
        dailyUsage: 0.3,
        leadTime: 5,
        safetyStock: 3,
        seasonalRequirements: [
          { season: "winter", requiredStock: 4 },
          { season: "spring", requiredStock: 6 },
          { season: "summer", requiredStock: 8 },
          { season: "fall", requiredStock: 5 },
        ],
        menuTags: [],
        checkDate: "2026-01-09",
        orderStatus: "normal",
        orderedQuantity: null,
        orderedAt: null,
        supplierId: "sup-c2",
      },
    ];

    [...kitchenItems, ...cafeItems].forEach(item => this.items.set(item.id, item));
  }

  async getItems(team: Team): Promise<InventoryItem[]> {
    return Array.from(this.items.values()).filter(item => item.team === team);
  }

  async getItem(id: string): Promise<InventoryItem | undefined> {
    return this.items.get(id);
  }

  async createItem(insertItem: InsertInventoryItem): Promise<InventoryItem> {
    const id = randomUUID();
    const item: InventoryItem = { 
      ...insertItem, 
      id,
      storageType: insertItem.storageType ?? null,
      checkDate: insertItem.checkDate ?? null,
      orderedQuantity: insertItem.orderedQuantity ?? null,
      orderedAt: insertItem.orderedAt ?? null,
      supplierId: insertItem.supplierId ?? null,
    };
    this.items.set(id, item);
    return item;
  }

  async updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | undefined> {
    const item = this.items.get(id);
    if (!item) return undefined;
    
    const { id: _, ...safeUpdates } = updates as any;
    const updated = { ...item, ...safeUpdates };
    this.items.set(id, updated);
    return updated;
  }

  async deleteItem(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  async bulkUpdateItems(updates: { id: string; [key: string]: any }[]): Promise<void> {
    for (const update of updates) {
      const { id, ...changes } = update;
      const item = this.items.get(id);
      if (item) {
        this.items.set(id, { ...item, ...changes });
      }
    }
  }

  async getTags(team?: Team): Promise<MenuTag[]> {
    const allTags = Array.from(this.tags.values());
    if (team) {
      return allTags.filter(tag => tag.team === team);
    }
    return allTags;
  }

  async createTag(insertTag: InsertMenuTag): Promise<MenuTag> {
    const id = randomUUID();
    const tag: MenuTag = { ...insertTag, id };
    this.tags.set(id, tag);
    return tag;
  }

  async deleteTag(id: string): Promise<boolean> {
    return this.tags.delete(id);
  }

  async getSubCategories(team: Team, mainCategory?: MainCategory): Promise<SubCategory[]> {
    const allSubCategories = Array.from(this.subCategories.values());
    return allSubCategories.filter(sc => {
      if (sc.team !== team) return false;
      if (mainCategory && sc.mainCategory !== mainCategory) return false;
      return true;
    });
  }

  async createSubCategory(insertSubCategory: InsertSubCategory): Promise<SubCategory> {
    const id = randomUUID();
    const subCategory: SubCategory = { ...insertSubCategory, id };
    this.subCategories.set(id, subCategory);
    return subCategory;
  }

  async getSuppliers(team: Team): Promise<Supplier[]> {
    const allSuppliers = Array.from(this.suppliers.values());
    return allSuppliers.filter(s => s.team === team);
  }

  async createSupplier(insertSupplier: InsertSupplier): Promise<Supplier> {
    const id = randomUUID();
    const supplier: Supplier = { 
      ...insertSupplier, 
      id,
      url: insertSupplier.url ?? null,
    };
    this.suppliers.set(id, supplier);
    return supplier;
  }
}

export const storage = new MemStorage();
