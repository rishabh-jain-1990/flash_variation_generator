import type { Variation } from '../types';

export type AmbientMood = 'default' | 'intense' | 'playful' | 'neutral';

const RISKY_TAGS = new Set([
  'High-Volatility',
  'Blind',
  'Duel',
  'Exposed',
  'Auction',
  'Swap',
  'Penalty',
]);

const FUN_TAGS = new Set([
  'Beginner-Friendly',
  'Lucky',
  'Bonus',
  'Classic',
  'Color-Based',
]);

export function isRiskyVariation(variation: Variation): boolean {
  if (variation.complexity === 'hard') return true;
  return variation.tags.some((tag) => RISKY_TAGS.has(tag));
}

export function isPlayfulVariation(variation: Variation): boolean {
  if (isRiskyVariation(variation)) return false;
  if (variation.complexity !== 'easy') return false;
  return variation.tags.some((tag) => FUN_TAGS.has(tag));
}

export function getVariationMood(variation: Variation): AmbientMood {
  if (isRiskyVariation(variation)) return 'intense';
  if (isPlayfulVariation(variation)) return 'playful';
  return 'neutral';
}
