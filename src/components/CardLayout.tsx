import ProceduralCard from './ProceduralCard';
import type { Variation } from '../types';

interface CardLayoutProps {
  variation: Variation;
}

const DEMO_HANDS: Record<string, { rank: string; suit: string }[]> = {
  standard_grid: [
    { rank: 'A', suit: '♠' },
    { rank: 'K', suit: '♥' },
    { rank: 'Q', suit: '♦' },
  ],
  wildcard_banner: [
    { rank: 'A', suit: '♠' },
    { rank: 'K', suit: '♥' },
    { rank: '7', suit: '♣' },
  ],
  community_mat: [
    { rank: 'J', suit: '♠' },
    { rank: '9', suit: '♥' },
    { rank: '5', suit: '♦' },
  ],
  split_hand: [
    { rank: '10', suit: '♠' },
    { rank: '8', suit: '♥' },
    { rank: '3', suit: '♦' },
    { rank: '6', suit: '♣' },
  ],
};

function isCardHighlighted(
  card: { rank: string; suit: string },
  highlightCards: string[]
): boolean {
  if (highlightCards.length === 0) return false;
  return highlightCards.some((h) => {
    if (h.length > 1 && (h.includes('♠') || h.includes('♥') || h.includes('♦') || h.includes('♣'))) {
      return h === `${card.rank}${card.suit}`;
    }
    if (['♠', '♥', '♦', '♣'].includes(h)) {
      return card.suit === h;
    }
    return card.rank === h;
  });
}

function StandardGrid({ variation }: CardLayoutProps) {
  const cards = DEMO_HANDS.standard_grid;
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-5">
      {cards.map((card, i) => (
        <ProceduralCard
          key={`${variation.id}-${i}`}
          rank={card.rank}
          suit={card.suit}
          highlighted={isCardHighlighted(card, variation.visual_cues.highlight_cards)}
          index={i}
          variationId={variation.id}
        />
      ))}
    </div>
  );
}

function WildcardBanner({ variation }: CardLayoutProps) {
  const cards = DEMO_HANDS.wildcard_banner;
  const wildcardCards = cards.filter((c) =>
    isCardHighlighted(c, variation.visual_cues.highlight_cards)
  );
  const normalCards = cards.filter(
    (c) => !isCardHighlighted(c, variation.visual_cues.highlight_cards)
  );

  return (
    <div className="flex flex-col items-center gap-4 lg:gap-5">
      {wildcardCards.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider mr-1">
            Wild
          </span>
          <div className="flex gap-2">
            {wildcardCards.map((card, i) => (
              <ProceduralCard
                key={`${variation.id}-wild-${i}`}
                rank={card.rank}
                suit={card.suit}
                highlighted={true}
                index={i}
                variationId={`${variation.id}-wild`}
              />
            ))}
          </div>
        </div>
      )}
      <div className="w-24 border-t border-dashed border-slate-400 dark:border-slate-600" />
      <div className="flex gap-3 lg:gap-4">
        {normalCards.map((card, i) => (
          <ProceduralCard
            key={`${variation.id}-norm-${i}`}
            rank={card.rank}
            suit={card.suit}
            highlighted={false}
            index={i + wildcardCards.length}
            variationId={`${variation.id}-norm`}
          />
        ))}
      </div>
    </div>
  );
}

function CommunityMat({ variation }: CardLayoutProps) {
  const cards = DEMO_HANDS.community_mat;
  const privateCards = cards.slice(0, 2);
  const communityCard = cards[2];

  return (
    <div className="flex flex-col items-center gap-4 lg:gap-5">
      <div className="flex items-center gap-2">
        <span className="text-sky-400 text-xs font-semibold uppercase tracking-wider">
          Community
        </span>
      </div>
      <ProceduralCard
        rank={communityCard.rank}
        suit={communityCard.suit}
        highlighted={isCardHighlighted(communityCard, variation.visual_cues.highlight_cards)}
        index={0}
        variationId={`${variation.id}-comm`}
      />
      <div className="w-24 border-t border-dashed border-slate-400 dark:border-slate-600" />
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mr-1">
          Your Hand
        </span>
        <div className="flex gap-3 lg:gap-4">
          {privateCards.map((card, i) => (
            <ProceduralCard
              key={`${variation.id}-priv-${i}`}
              rank={card.rank}
              suit={card.suit}
              highlighted={isCardHighlighted(card, variation.visual_cues.highlight_cards)}
              index={i + 1}
              variationId={`${variation.id}-priv`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SplitHand({ variation }: CardLayoutProps) {
  const cards = DEMO_HANDS.split_hand;
  const highTier = cards.slice(0, 2);
  const lowTier = cards.slice(2);

  return (
    <div className="flex flex-col items-center gap-3 lg:gap-4">
      <div className="flex items-center gap-2">
        <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider mr-1">
          Keep
        </span>
        <div className="flex gap-3 lg:gap-4">
          {highTier.map((card, i) => (
            <ProceduralCard
              key={`${variation.id}-high-${i}`}
              rank={card.rank}
              suit={card.suit}
              highlighted={isCardHighlighted(card, variation.visual_cues.highlight_cards)}
              index={i}
              variationId={`${variation.id}-high`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full justify-center">
        <div className="flex-1 max-w-12 border-t border-dashed border-slate-400 dark:border-slate-600" />
        <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest">
          vs
        </span>
        <div className="flex-1 max-w-12 border-t border-dashed border-slate-400 dark:border-slate-600" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-red-400 text-xs font-semibold uppercase tracking-wider mr-1">
          Discard
        </span>
        <div className="flex gap-3 lg:gap-4 opacity-70">
          {lowTier.map((card, i) => (
            <ProceduralCard
              key={`${variation.id}-low-${i}`}
              rank={card.rank}
              suit={card.suit}
              highlighted={isCardHighlighted(card, variation.visual_cues.highlight_cards)}
              index={i + highTier.length}
              variationId={`${variation.id}-low`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CardLayout({ variation }: CardLayoutProps) {
  const { layout_type } = variation.visual_cues;

  switch (layout_type) {
    case 'wildcard_banner':
      return <WildcardBanner variation={variation} />;
    case 'community_mat':
      return <CommunityMat variation={variation} />;
    case 'split_hand':
      return <SplitHand variation={variation} />;
    default:
      return <StandardGrid variation={variation} />;
  }
}
