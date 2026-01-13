import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { X, Plus, Trash2, Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInventory } from "@/lib/inventory-context";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { MenuTag } from "@shared/schema";
import { cn } from "@/lib/utils";
import { parseStoredColor, PRESET_COLORS, getContrastColor } from "@/lib/tagColors";

interface MenuTagInputProps {
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  disabled?: boolean;
}

function ColorPicker({ 
  selectedColor, 
  onColorSelect,
  onClose 
}: { 
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="p-2 space-y-2">
      <p className="text-xs text-muted-foreground mb-2">색상 선택</p>
      <div className="grid grid-cols-8 gap-1">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => {
              onColorSelect(color);
              onClose();
            }}
            className={cn(
              "w-5 h-5 rounded-sm border-2 transition-transform hover:scale-110",
              selectedColor === color ? "border-foreground ring-1 ring-foreground" : "border-transparent"
            )}
            style={{ backgroundColor: color }}
            data-testid={`color-${color}`}
          />
        ))}
      </div>
    </div>
  );
}

export function MenuTagInput({ selectedTagIds, onChange, disabled }: MenuTagInputProps) {
  const { tags, addTag, removeTag, updateTag, selectedTeam } = useInventory();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedNewColor, setSelectedNewColor] = useState<string | null>(null);
  const [colorPickerTagId, setColorPickerTagId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const createTagMutation = useMutation({
    mutationFn: async (newTag: { team: string; name: string; color: string | null }) => {
      const res = await apiRequest("POST", "/api/tags", newTag);
      return res.json();
    },
    onSuccess: (createdTag: MenuTag) => {
      addTag(createdTag);
      onChange([...selectedTagIds, createdTag.id]);
      setSearch("");
      setSelectedNewColor(null);
      queryClient.invalidateQueries({ queryKey: ["/api/inventory", selectedTeam] });
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: async ({ id, color }: { id: string; color: string }) => {
      const res = await apiRequest("PATCH", `/api/tags/${id}`, { color });
      return res.json();
    },
    onSuccess: (updatedTag: MenuTag) => {
      updateTag(updatedTag);
      setColorPickerTagId(null);
      queryClient.invalidateQueries({ queryKey: ["/api/inventory", selectedTeam] });
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: async (tagId: string) => {
      await apiRequest("DELETE", `/api/tags/${tagId}`);
      return tagId;
    },
    onSuccess: (deletedTagId: string) => {
      removeTag(deletedTagId);
      onChange(selectedTagIds.filter(id => id !== deletedTagId));
      queryClient.invalidateQueries({ queryKey: ["/api/inventory", selectedTeam] });
    },
  });

  const selectedTags = tags.filter(t => selectedTagIds.includes(t.id));
  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    !selectedTagIds.includes(t.id)
  );

  const handleSelectTag = (tagId: string) => {
    onChange([...selectedTagIds, tagId]);
    setSearch("");
  };

  const handleRemoveTag = (tagId: string) => {
    onChange(selectedTagIds.filter(id => id !== tagId));
  };

  const handleCreateTag = () => {
    if (!search.trim()) return;
    
    const newTag = {
      team: selectedTeam,
      name: search.trim(),
      color: selectedNewColor,
    };
    
    createTagMutation.mutate(newTag);
  };

  const showCreateOption = search.trim() && 
    !tags.some(t => t.name.toLowerCase() === search.toLowerCase());

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const getTagStyle = (tag: MenuTag) => parseStoredColor(tag.color, tag.name);

  if (disabled) {
    return (
      <div className="flex flex-wrap gap-1 min-h-[28px] items-center">
        {selectedTags.length === 0 ? (
          <span className="text-xs text-muted-foreground">-</span>
        ) : (
          selectedTags.map(tag => {
            const colorStyle = getTagStyle(tag);
            return (
              <Badge
                key={tag.id}
                className="text-[10px] px-1.5 py-0 border-0"
                style={{ backgroundColor: colorStyle.backgroundColor, color: colorStyle.color }}
              >
                {tag.name}
              </Badge>
            );
          })
        )}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex flex-wrap gap-1 min-h-[32px] items-center w-full p-1.5 rounded-md border border-input bg-background text-left",
            "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-colors"
          )}
          data-testid="button-menu-tag-input"
        >
          {selectedTags.length === 0 ? (
            <span className="text-xs text-muted-foreground px-1">메뉴 태그 선택...</span>
          ) : (
            <>
              {selectedTags.map(tag => {
                const colorStyle = getTagStyle(tag);
                return (
                  <Badge
                    key={tag.id}
                    className="text-[10px] px-1.5 py-0 gap-0.5 border-0"
                    style={{ backgroundColor: colorStyle.backgroundColor, color: colorStyle.color }}
                  >
                    {tag.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(tag.id);
                      }}
                      className="ml-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </Badge>
                );
              })}
              <Plus className="h-3 w-3 text-muted-foreground ml-1" />
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="start">
        <div className="space-y-2">
          <Input
            ref={inputRef}
            placeholder="태그 검색 또는 생성..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && showCreateOption) {
                e.preventDefault();
                handleCreateTag();
              }
            }}
            className="h-8 text-sm"
            data-testid="input-tag-search"
          />
          
          <div className="max-h-48 overflow-y-auto space-y-1">
            {filteredTags.map(tag => {
              const colorStyle = getTagStyle(tag);
              return (
                <div
                  key={tag.id}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1.5 rounded-md text-left text-sm",
                    "hover:bg-accent transition-colors group"
                  )}
                >
                  <button
                    onClick={() => handleSelectTag(tag.id)}
                    className="flex-1"
                    data-testid={`button-select-tag-${tag.id}`}
                  >
                    <Badge
                      className="text-xs border-0"
                      style={{ backgroundColor: colorStyle.backgroundColor, color: colorStyle.color }}
                    >
                      {tag.name}
                    </Badge>
                  </button>
                  <div className="flex items-center gap-1">
                    <Popover open={colorPickerTagId === tag.id} onOpenChange={(open) => setColorPickerTagId(open ? tag.id : null)}>
                      <PopoverTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-accent-foreground/10 rounded transition-opacity"
                          data-testid={`button-color-tag-${tag.id}`}
                        >
                          <Palette className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end" side="right">
                        <ColorPicker 
                          selectedColor={tag.color}
                          onColorSelect={(color) => updateTagMutation.mutate({ id: tag.id, color })}
                          onClose={() => setColorPickerTagId(null)}
                        />
                      </PopoverContent>
                    </Popover>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`"${tag.name}" 태그를 삭제하시겠습니까? 모든 항목에서 제거됩니다.`)) {
                          deleteTagMutation.mutate(tag.id);
                        }
                      }}
                      disabled={deleteTagMutation.isPending}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 rounded transition-opacity"
                      data-testid={`button-delete-tag-${tag.id}`}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </div>
                </div>
              );
            })}
            
            {showCreateOption && (
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <button
                    onClick={handleCreateTag}
                    disabled={createTagMutation.isPending}
                    className={cn(
                      "flex items-center gap-2 flex-1 rounded-md text-left text-sm",
                      "text-primary",
                      createTagMutation.isPending && "opacity-50"
                    )}
                    data-testid="button-create-tag"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>"{search}" 태그 생성</span>
                  </button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center gap-1 px-2 py-1 rounded border text-xs",
                          selectedNewColor ? "border-foreground/30" : "border-input"
                        )}
                        style={selectedNewColor ? { 
                          backgroundColor: selectedNewColor, 
                          color: getContrastColor(selectedNewColor) 
                        } : undefined}
                        data-testid="button-select-new-color"
                      >
                        <Palette className="h-3 w-3" />
                        {selectedNewColor ? "색상" : "색상 선택"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <ColorPicker 
                        selectedColor={selectedNewColor}
                        onColorSelect={setSelectedNewColor}
                        onClose={() => {}}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}
            
            {filteredTags.length === 0 && !showCreateOption && (
              <p className="text-xs text-muted-foreground text-center py-2">
                검색 결과가 없습니다
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
