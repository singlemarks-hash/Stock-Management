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
  isLoading: boolean;
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
      isLoading,
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
