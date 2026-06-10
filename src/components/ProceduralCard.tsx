interface ProceduralCardProps {
  rank: string;
  suit: string;
  highlighted: boolean;
  index: number;
  variationId: string;
}

const SUIT_SYMBOLS: Record<string, string> = {
  '♠': '♠', '♥': '♥', '♦': '♦', '♣': '♣',
  spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣',
};

const SUIT_COLORS: Record<string, string> = {
  '♠': 'text-slate-800 dark:text-slate-200',
  '♣': 'text-slate-800 dark:text-slate-200',
  '♥': 'text-red-500',
  '♦': 'text-red-500',
};

function getSuitSymbol(suit: string): string {
  return SUIT_SYMBOLS[suit] || suit;
}

function getSuitColor(suit: string): string {
  const symbol = getSuitSymbol(suit);
  return SUIT_COLORS[symbol] || 'text-slate-800 dark:text-slate-200';
}

export default function ProceduralCard({
  rank,
  suit,
  highlighted,
  index,
  variationId,
}: ProceduralCardProps) {
  const suitSymbol = getSuitSymbol(suit);
  const suitColor = getSuitColor(suit);

  return (
    <div
      key={`${variationId}-${index}`}
      className={`
        animate-card-enter relative flex flex-col items-center justify-between
        w-20 h-28 sm:w-24 sm:h-32 lg:w-28 lg:h-40 rounded-xl p-2 lg:p-2.5
        bg-white dark:bg-slate-800 border-2 select-none
        transition-all duration-300
        ${
          highlighted
            ? 'border-amber-400 ring-4 ring-amber-400/30 scale-105 shadow-lg shadow-amber-500/20'
            : 'border-slate-200 dark:border-slate-600 shadow-md'
        }
      `}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className={`self-start text-sm font-bold ${suitColor}`}>
        {rank}
        <span className="ml-0.5 text-xs">{suitSymbol}</span>
      </div>

      <div className={`text-3xl sm:text-4xl lg:text-5xl ${suitColor}`}>{suitSymbol}</div>

      <div className={`self-end text-sm font-bold rotate-180 ${suitColor}`}>
        {rank}
        <span className="ml-0.5 text-xs">{suitSymbol}</span>
      </div>

      {highlighted && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-900 shadow-sm">
          ★
        </div>
      )}
    </div>
  );
}
