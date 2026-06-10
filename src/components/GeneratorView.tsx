import { useState } from 'react';
import { useApp } from '../context/useApp';
import VariationCard from './VariationCard';

export default function GeneratorView() {
  const { currentVariation, isGenerating, generate } = useApp();
  const [renderKey, setRenderKey] = useState(0);

  const handleGenerate = () => {
    setRenderKey((k) => k + 1);
    generate();
  };

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8 w-full max-w-4xl mx-auto">
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className={`
          relative px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-wider
          transition-all duration-300 cursor-pointer
          ${
            isGenerating
              ? 'ambient-btn-secondary cursor-wait opacity-70'
              : 'ambient-btn-primary hover:scale-105 active:scale-95'
          }
        `}
      >
        {isGenerating ? (
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-5 h-5 border-2 border-t-transparent rounded-full animate-spin-slow"
              style={{ borderColor: 'var(--ambient-text-muted)', borderTopColor: 'transparent' }}
            />
            Shuffling...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="text-xl">🎰</span>
            Generate Variant
          </span>
        )}
      </button>

      {isGenerating && (
        <div className="w-full">
          <div className="ambient-shimmer rounded-2xl p-8 lg:p-12 animate-shimmer h-80 lg:h-96 flex items-center justify-center">
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="ambient-shimmer-pulse w-20 h-28 lg:w-28 lg:h-40 rounded-xl animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!isGenerating && currentVariation && (
        <VariationCard
          key={`${currentVariation.id}-${renderKey}`}
          variation={currentVariation}
        />
      )}

      {!isGenerating && !currentVariation && (
        <div className="text-center mt-8 lg:mt-12 px-4 max-w-2xl">
          <p className="text-5xl lg:text-6xl mb-4">🃏</p>
          <p className="ambient-text-muted text-lg lg:text-xl">
            Hit the button to discover a new Flash variant
          </p>
          <p className="ambient-text-faint text-sm lg:text-base mt-2">
            Each generation reveals a unique way to play
          </p>
        </div>
      )}
    </div>
  );
}
