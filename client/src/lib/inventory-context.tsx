import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import type { 
  Team, 
  Season, 
  InventoryItem, 
  MenuTag, 
  MainCategory 
} from "@shared/schema";
import { getCurrentSeason } from "@shared/schema";

interface InventoryContextType {
  selectedTeam: Team;
  setSelectedTeam: (team: Team) => void;
  selectedSeason: Season;
  setSelectedSeason: (season: Season) => void;
  selectedMainCategory: MainCategory;
  setSelectedMainCategory: (category: MainCategory) => void;
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  items: InventoryItem[];
  setItems: (items: InventoryItem[]) => void;
  editedItems: Map<string, Partial<InventoryItem>>;
  updateEditedItem: (id: string, updates: Partial<InventoryItem>) => void;
  clearEditedItems: () => void;
  tags: MenuTag[];
  setTags: (tags: MenuTag[]) => void;
  addTag: (tag: MenuTag) => void;
  updateTag: (tag: MenuTag) => void;
  removeTag: (tagId: string) => void;
  isLoading: boolean;
  collapsedGroups: Set<string>;
  toggleGroupCollapse: (subCategory: string) => void;
  getSubCategoryOrder: (storageType: string) => string[];
  setSubCategoryOrder: (storageType: string, order: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [selectedTeam, setSelectedTeamState] = useState<Team>(() => {
    const saved = localStorage.getItem("inventory-team");
    return (saved as Team) || "kitchen";
  });
  
  const [selectedSeason, setSelectedSeasonState] = useState<Season>(() => {
    const saved = localStorage.getItem("inventory-season");
    return (saved as Season) || getCurrentSeason();
  });
  
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory>("food");
  const [isEditMode, setIsEditMode] = useState(false);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [editedItems, setEditedItems] = useState<Map<string, Partial<InventoryItem>>>(new Map());
  const [tags, setTags] = useState<MenuTag[]>([]);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("inventory-collapsed-groups");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [subCategoryOrders, setSubCategoryOrders] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem("inventory-subcategory-orders");
    return saved ? JSON.parse(saved) : {};
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery<{ items: InventoryItem[]; tags: MenuTag[] }>({
    queryKey: ["/api/inventory", selectedTeam],
    queryFn: async () => {
      const res = await fetch(`/api/inventory?team=${selectedTeam}`);
      if (!res.ok) throw new Error("Failed to fetch inventory");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setItems(data.items);
      setTags(data.tags);
    }
  }, [data]);

  const setSelectedTeam = useCallback((team: Team) => {
    setSelectedTeamState(team);
    localStorage.setItem("inventory-team", team);
    setIsEditMode(false);
    clearEditedItems();
  }, []);

  const setSelectedSeason = useCallback((season: Season) => {
    setSelectedSeasonState(season);
    localStorage.setItem("inventory-season", season);
  }, []);

  const updateEditedItem = useCallback((id: string, updates: Partial<InventoryItem>) => {
    setEditedItems(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(id) || {};
      newMap.set(id, { ...existing, ...updates });
      return newMap;
    });
  }, []);

  const clearEditedItems = useCallback(() => {
    setEditedItems(new Map());
  }, []);

  const addTag = useCallback((tag: MenuTag) => {
    setTags(prev => [...prev, tag]);
  }, []);

  const updateTag = useCallback((updatedTag: MenuTag) => {
    setTags(prev => prev.map(t => t.id === updatedTag.id ? updatedTag : t));
  }, []);

  const removeTag = useCallback((tagId: string) => {
    setTags(prev => prev.filter(t => t.id !== tagId));
    setItems(prevItems => prevItems.map(item => ({
      ...item,
      menuTags: item.menuTags.filter(id => id !== tagId)
    })));
  }, []);

  const toggleGroupCollapse = useCallback((subCategory: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subCategory)) {
        newSet.delete(subCategory);
      } else {
        newSet.add(subCategory);
      }
      localStorage.setItem("inventory-collapsed-groups", JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  }, []);

  const getSubCategoryOrder = useCallback((storageType: string): string[] => {
    const key = `${selectedTeam}-${selectedMainCategory}-${storageType}`;
    return subCategoryOrders[key] || [];
  }, [selectedTeam, selectedMainCategory, subCategoryOrders]);

  const setSubCategoryOrder = useCallback((storageType: string, order: string[]) => {
    const key = `${selectedTeam}-${selectedMainCategory}-${storageType}`;
    setSubCategoryOrders(prev => {
      const updated = { ...prev, [key]: order };
      localStorage.setItem("inventory-subcategory-orders", JSON.stringify(updated));
      return updated;
    });
  }, [selectedTeam, selectedMainCategory]);

  return (
    <InventoryContext.Provider value={{
      selectedTeam,
      setSelectedTeam,
      selectedSeason,
      setSelectedSeason,
      selectedMainCategory,
      setSelectedMainCategory,
      isEditMode,
      setIsEditMode,
      items,
      setItems,
      editedItems,
      updateEditedItem,
      clearEditedItems,
      tags,
      setTags,
      addTag,
      updateTag,
      removeTag,
      isLoading,
      collapsedGroups,
      toggleGroupCollapse,
      getSubCategoryOrder,
      setSubCategoryOrder,
      searchQuery,
      setSearchQuery,
    }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
}
