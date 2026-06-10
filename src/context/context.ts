import { createContext } from 'react';
import type { Variation, ViewMode, ThemeMode } from '../types';

export interface AppState {
  currentVariation: Variation | null;
  dailyVariation: Variation;
  history: Variation[];
  favorites: Variation[];
  viewMode: ViewMode;
  theme: ThemeMode;
  isGenerating: boolean;
  activeTagFilters: string[];
  allTags: string[];
}

export interface AppContextValue extends AppState {
  generate: () => void;
  toggleFavorite: (variation: Variation) => void;
  isFavorite: (id: string) => boolean;
  setViewMode: (mode: ViewMode) => void;
  toggleTheme: () => void;
  toggleTagFilter: (tag: string) => void;
  clearTagFilters: () => void;
  getFilteredHistory: () => Variation[];
  getFilteredFavorites: () => Variation[];
}

export const AppContext = createContext<AppContextValue | null>(null);
