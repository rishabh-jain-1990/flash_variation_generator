function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getDailyVariantIndex(totalVariations: number): number {
  const now = new Date();
  const utcDate = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
  const seed = hashString(`flash-daily-${utcDate}`);
  return seed % totalVariations;
}

export function getRandomIndex(totalVariations: number, excludeIds?: Set<string>): number {
  if (!excludeIds || excludeIds.size >= totalVariations) {
    return Math.floor(Math.random() * totalVariations);
  }
  return Math.floor(Math.random() * totalVariations);
}
