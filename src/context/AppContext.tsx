import { useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Variation, ViewMode, ThemeMode } from '../types';
import { getDailyVariantIndex } from '../utils/prng';
import { loadFavorites, saveFavorites, toggleFavorite as toggleFav } from '../utils/storage';
import { AppContext } from './context';
import variationsData from '../../public/data/variations.json';

const variations = variationsData as Variation[];

export function AppProvider({ children }: { children: ReactNode }) {
  const dailyIndex = getDailyVariantIndex(variations.length);
  const dailyVariation = variations[dailyIndex];

  const [currentVariation, setCurrentVariation] = useState<Variation | null>(null);
  const [history, setHistory] = useState<Variation[]>([]);
  const [favorites, setFavorites] = useState<Variation[]>(loadFavorites);
  const [viewMode, setViewMode] = useState<ViewMode>('generator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTagFilters, setActiveTagFilters] = useState<string[]>([]);
  const [listFocusVariation, setListFocusVariation] = useState<Variation | null>(null);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('flash-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const allTags = Array.from(new Set(variations.flatMap((v) => v.tags))).sort();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('flash-theme', theme);
  }, [theme]);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const handleSetViewMode = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    if (mode !== 'history' && mode !== 'favorites') {
      setListFocusVariation(null);
    }
  }, []);

  const generate = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * variations.length);
      const variation = variations[idx];
      setCurrentVariation(variation);
      setHistory((prev) => [variation, ...prev]);
      setIsGenerating(false);
    }, 800);
  }, []);

  const handleToggleFavorite = useCallback((variation: Variation) => {
    setFavorites((prev) => toggleFav(prev, variation));
  }, []);

  const checkIsFavorite = useCallback(
    (id: string) => favorites.some((v) => v.id === id),
    [favorites]
  );

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleTagFilter = useCallback((tag: string) => {
    setActiveTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearTagFilters = useCallback(() => {
    setActiveTagFilters([]);
  }, []);

  const filterByTags = useCallback(
    (items: Variation[]) => {
      if (activeTagFilters.length === 0) return items;
      return items.filter((v) =>
        activeTagFilters.every((tag) => v.tags.includes(tag))
      );
    },
    [activeTagFilters]
  );

  const getFilteredHistory = useCallback(() => filterByTags(history), [filterByTags, history]);
  const getFilteredFavorites = useCallback(() => filterByTags(favorites), [filterByTags, favorites]);

  return (
    <AppContext.Provider
      value={{
        currentVariation,
        dailyVariation,
        history,
        favorites,
        viewMode,
        theme,
        isGenerating,
        activeTagFilters,
        allTags,
        listFocusVariation,
        generate,
        toggleFavorite: handleToggleFavorite,
        isFavorite: checkIsFavorite,
        setViewMode: handleSetViewMode,
        toggleTheme,
        toggleTagFilter,
        clearTagFilters,
        getFilteredHistory,
        getFilteredFavorites,
        setListFocusVariation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
