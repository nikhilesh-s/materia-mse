export type BlogTagSource = {
  tags?: string[] | null;
  category?: string | null;
};

const TAG_PALETTES = [
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  'bg-violet-100 text-violet-700 dark:bg-violet-900/60 dark:text-violet-300 border-violet-200 dark:border-violet-800',
];

export const parseTagsInput = (input: string): string[] => {
  const normalized = input
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
    .map((value) => value.replace(/\s+/g, ' '));

  return Array.from(new Set(normalized)).slice(0, 8);
};

export const normalizeBlogTags = ({ tags, category }: BlogTagSource): string[] => {
  const cleanedTags = (tags || []).map((tag) => tag.trim()).filter(Boolean);
  if (cleanedTags.length > 0) {
    return Array.from(new Set(cleanedTags));
  }

  if (category && category.trim()) {
    return [category.trim()];
  }

  return ['General'];
};

export const getTagChipTone = (tag: string): string => {
  const hash = tag
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return TAG_PALETTES[hash % TAG_PALETTES.length];
};
