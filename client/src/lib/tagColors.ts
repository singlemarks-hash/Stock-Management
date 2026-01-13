export interface TagColorStyle {
  backgroundColor: string;
  color: string;
}

export const TAG_COLORS: TagColorStyle[] = [
  { backgroundColor: '#fee2e2', color: '#b91c1c' },
  { backgroundColor: '#fce7f3', color: '#be185d' },
  { backgroundColor: '#f5d0fe', color: '#a21caf' },
  { backgroundColor: '#e9d5ff', color: '#7c3aed' },
  { backgroundColor: '#ddd6fe', color: '#6d28d9' },
  { backgroundColor: '#c7d2fe', color: '#4338ca' },
  { backgroundColor: '#bfdbfe', color: '#1d4ed8' },
  { backgroundColor: '#a5f3fc', color: '#0891b2' },
  { backgroundColor: '#99f6e4', color: '#0d9488' },
  { backgroundColor: '#a7f3d0', color: '#059669' },
  { backgroundColor: '#bbf7d0', color: '#16a34a' },
  { backgroundColor: '#d9f99d', color: '#65a30d' },
  { backgroundColor: '#fef08a', color: '#ca8a04' },
  { backgroundColor: '#fed7aa', color: '#ea580c' },
  { backgroundColor: '#fecaca', color: '#dc2626' },
  { backgroundColor: '#fbcfe8', color: '#db2777' },
  { backgroundColor: '#f0abfc', color: '#c026d3' },
  { backgroundColor: '#d8b4fe', color: '#9333ea' },
  { backgroundColor: '#a5b4fc', color: '#4f46e5' },
  { backgroundColor: '#93c5fd', color: '#2563eb' },
  { backgroundColor: '#67e8f9', color: '#0891b2' },
  { backgroundColor: '#5eead4', color: '#0d9488' },
  { backgroundColor: '#6ee7b7', color: '#059669' },
  { backgroundColor: '#86efac', color: '#16a34a' },
  { backgroundColor: '#bef264', color: '#65a30d' },
  { backgroundColor: '#fde047', color: '#ca8a04' },
  { backgroundColor: '#fdba74', color: '#ea580c' },
  { backgroundColor: '#fca5a5', color: '#dc2626' },
  { backgroundColor: '#f9a8d4', color: '#db2777' },
  { backgroundColor: '#e879f9', color: '#c026d3' },
];

export function getTagColorStyle(tagName: string): TagColorStyle {
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % TAG_COLORS.length;
  return TAG_COLORS[index];
}

export function getTagColor(tagName: string): string {
  return '';
}
