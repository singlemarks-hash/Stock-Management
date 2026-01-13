export interface TagColorStyle {
  backgroundColor: string;
  color: string;
}

export const PRESET_COLORS = [
  '#fee2e2', '#fecaca', '#fca5a5', '#f87171',
  '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6',
  '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef',
  '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7',
  '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6',
  '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1',
  '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6',
  '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4',
  '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6',
  '#a7f3d0', '#6ee7b7', '#34d399', '#10b981',
  '#bbf7d0', '#86efac', '#4ade80', '#22c55e',
  '#d9f99d', '#bef264', '#a3e635', '#84cc16',
  '#fef08a', '#fde047', '#facc15', '#eab308',
  '#fed7aa', '#fdba74', '#fb923c', '#f97316',
  '#fecdd3', '#fda4af', '#fb7185', '#f43f5e',
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getContrastColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  
  if (luminance > 0.6) {
    const darkerR = Math.floor(rgb.r * 0.3);
    const darkerG = Math.floor(rgb.g * 0.3);
    const darkerB = Math.floor(rgb.b * 0.3);
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  } else {
    return '#ffffff';
  }
}

export function getTagColorStyle(tagName: string): TagColorStyle {
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % PRESET_COLORS.length;
  const bgColor = PRESET_COLORS[index];
  return {
    backgroundColor: bgColor,
    color: getContrastColor(bgColor)
  };
}

export function parseStoredColor(colorString: string | null, tagName: string): TagColorStyle {
  if (colorString && colorString.startsWith('#')) {
    return {
      backgroundColor: colorString,
      color: getContrastColor(colorString)
    };
  }
  return getTagColorStyle(tagName);
}
