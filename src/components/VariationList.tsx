import { useState } from 'react';
import VariationCard from './VariationCard';
import TagFilter from './TagFilter';
import { useApp } from '../context/useApp';
import type { Variation } from '../types';

interface VariationListProps {
  items: Variation[];
  emptyIcon: string;
  emptyTitle: string;
  emptySubtitle: string;
  badge?: (variation: Variation) => React.ReactNode;
  keyFn?: (variation: Variation, index: number) => string;
}

export default function VariationList({
  items,
  emptyIcon,
  emptyTitle,
  emptySubtitle,
  badge,
  keyFn = (v) => v.id,
}: VariationListProps) {
  const { setListFocusVariation } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (key: string, variation: Variation, isExpanded: boolean) => {
    if (isExpanded) {
      setExpanded(null);
      setListFocusVariation(null);
    } else {
      setExpanded(key);
      setListFocusVariation(variation);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-3xl mb-3">{emptyIcon}</p>
        <p className="ambient-text-muted">{emptyTitle}</p>
        <p className="ambient-text-faint text-sm mt-1">{emptySubtitle}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 lg:gap-5">
      <TagFilter />
      <div className="flex flex-col gap-3 lg:gap-4">
        {items.map((variation, index) => {
          const key = keyFn(variation, index);
          const isExpanded = expanded === key;
          return (
            <div key={key}>
              <button
                onClick={() => handleToggle(key, variation, isExpanded)}
                className="ambient-surface w-full text-left px-4 py-3 lg:px-5 lg:py-4 rounded-xl transition-colors duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{variation.visual_cues.overlay_icon}</span>
                    <span className="font-medium">{variation.title}</span>
                    {badge?.(variation)}
                  </div>
                  <span className="ambient-text-faint text-sm">
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
