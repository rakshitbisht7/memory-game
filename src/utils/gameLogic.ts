import { Card, Difficulty, DIFFICULTY_CONFIG, GAME_SYMBOLS, BestScore } from '@/types/game';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateCards = (difficulty: Difficulty): Card[] => {
  const config = DIFFICULTY_CONFIG[difficulty];
  const symbols = shuffleArray(GAME_SYMBOLS).slice(0, config.pairs);
  const cardPairs = symbols.flatMap(symbol => [
    { symbol, isFlipped: false, isMatched: false },
    { symbol, isFlipped: false, isMatched: false }
  ]);
  
  return shuffleArray(cardPairs).map((card, index) => ({
    ...card,
    id: `card-${index}`
  }));
};

export const calculateScore = (moves: number, timeElapsed: number, difficulty: Difficulty): number => {
  const baseScore = DIFFICULTY_CONFIG[difficulty].pairs * 100;
  const timeBonus = Math.max(0, 300 - timeElapsed);
  const movesPenalty = Math.max(0, moves - DIFFICULTY_CONFIG[difficulty].pairs) * 5;
  
  return Math.max(0, baseScore + timeBonus - movesPenalty);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const saveBestScore = (score: BestScore): void => {
  const existing = getBestScores();
  const updated = [...existing, score]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  
  localStorage.setItem('memoryGameBestScores', JSON.stringify(updated));
};

export const getBestScores = (): BestScore[] => {
  try {
    const stored = localStorage.getItem('memoryGameBestScores');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getBestScoreForDifficulty = (difficulty: Difficulty): BestScore | null => {
  const scores = getBestScores();
  return scores.find(score => score.difficulty === difficulty) || null;
};