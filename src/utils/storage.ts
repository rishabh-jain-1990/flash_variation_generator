import type { Variation } from '../types';

const FAVORITES_KEY = 'flash-variant-favorites';

export function loadFavorites(): Variation[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: Variation[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {
    // storage full or unavailable
  }
}

export function isFavorite(favorites: Variation[], id: string): boolean {
  return favorites.some((v) => v.id === id);
}

export function toggleFavorite(favorites: Variation[], variation: Variation): Variation[] {
  if (isFavorite(favorites, variation.id)) {
    return favorites.filter((v) => v.id !== variation.id);
  }
  return [variation, ...favorites];
}
