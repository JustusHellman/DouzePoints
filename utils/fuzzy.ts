
/**
 * Normalizes a string by removing accents/diacritics and converting to lowercase.
 */
export const normalizeString = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

/**
 * Calculates a match score between a query and a target string.
 * Higher is better (0 to 100).
 */
export const getFuzzyScore = (query: string, target: string): number => {
  const q = normalizeString(query);
  const t = normalizeString(target);

  if (!q) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;

  // Sequence match: check if chars of query appear in target in order
  let i = 0;
  let j = 0;
  while (i < q.length && j < t.length) {
    if (q[i] === t[j]) i++;
    j++;
  }
  
  if (i === q.length) return 30;
  
  return 0;
};
