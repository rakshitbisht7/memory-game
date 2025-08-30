export interface Card {
  id: string;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  moves: number;
  matches: number;
  timeElapsed: number;
  isGameWon: boolean;
  isPaused: boolean;
  isGameStarted: boolean;
  difficulty: Difficulty;
}

export interface GameStats {
  moves: number;
  timeElapsed: number;
  score: number;
}

export interface BestScore {
  score: number;
  moves: number;
  time: number;
  difficulty: Difficulty;
  date: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export const DIFFICULTY_CONFIG = {
  easy: { gridSize: 4, pairs: 8 },
  medium: { gridSize: 6, pairs: 18 },
  hard: { gridSize: 6, pairs: 18 }
} as const;

export const GAME_SYMBOLS = [
  '🎮', '🎯', '🚀', '⭐', '🎨', '🎪', '🎭', '🎲', 
  '🎸', '🎺', '🥁', '🎹', '🎤', '🎧', '🎵', '🎶',
  '🌟', '💫', '✨', '🔥', '💎', '🌈', '🎊', '🎉'
];