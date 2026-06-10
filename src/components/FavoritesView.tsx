import { useState } from 'react';
import { useApp } from '../context/useApp';
import VariationCard from './VariationCard';
import TagFilter from './TagFilter';
import type { Variation } from '../types';

export default function FavoritesView() {
  const { getFilteredFavorites } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);
  const items = getFilteredFavorites();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-3xl mb-3">⭐</p>
        <p className="text-slate-500 dark:text-slate-400">No favorites yet</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Save variants you love to find them here
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <TagFilter />
      <div className="flex flex-col gap-3">
        {items.map((variation: Variation) => {
          const isExpanded = expanded === variation.id;
          return (
            <div key={variation.id}>
              <button
                onClick={() => setExpanded(isExpanded ? null : variation.id)}
                className="w-full text-left px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{variation.visual_cues.overlay_icon}</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {variation.title}
                    </span>
                    <span className="text-amber-500 text-sm">★</span>
                  </div>
                  <span className="text-slate-400 text-sm">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </button>
              {isExpanded && (
                <div className="mt-2">
                  <VariationCard variation={variation} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
