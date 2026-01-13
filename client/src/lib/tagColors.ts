export const TAG_COLOR_CLASSES = [
  // Red/Pink spectrum - distinct shades
  'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'bg-rose-200 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'bg-fuchsia-200 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  
  // Purple/Violet spectrum
  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'bg-violet-200 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  
  // Blue spectrum - distinct shades
  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
  'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'bg-cyan-200 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300',
  
  // Teal/Green spectrum
  'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'bg-emerald-200 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  
  // Lime/Yellow spectrum
  'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-300',
  'bg-lime-200 text-lime-800 dark:bg-lime-900/50 dark:text-lime-200',
  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  
  // Orange/Amber spectrum
  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'bg-amber-200 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200',
  
  // Additional distinct colors with higher saturation
  'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-200',
  'bg-pink-200 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200',
  'bg-purple-200 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
  'bg-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
  'bg-teal-200 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200',
  'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
] as const;

export type TagColorClass = typeof TAG_COLOR_CLASSES[number];

export function getTagColor(tagName: string): string {
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % TAG_COLOR_CLASSES.length;
  return TAG_COLOR_CLASSES[index];
}
