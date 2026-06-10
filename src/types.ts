export interface VisualCues {
  highlight_cards: string[];
  layout_type: 'standard_grid' | 'split_hand' | 'community_mat' | 'wildcard_banner';
  overlay_icon: string;
  bg_theme: string;
}

export interface Variation {
  id: string;
  title: string;
  complexity: 'easy' | 'intermediate' | 'hard';
  tags: string[];
  description: string;
  visual_cues: VisualCues;
}

export type ViewMode = 'generator' | 'daily' | 'history' | 'favorites';
export type ThemeMode = 'light' | 'dark';
