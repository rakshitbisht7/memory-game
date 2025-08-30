import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, GameState, Difficulty, BestScore } from '@/types/game';
import { 
  generateCards, 
  calculateScore, 
  saveBestScore, 
  getBestScoreForDifficulty 
} from '@/utils/gameLogic';

export const useMemoryGame = (initialDifficulty: Difficulty = 'easy') => {
  const [gameState, setGameState] = useState<GameState>({
    cards: generateCards(initialDifficulty),
    moves: 0,
    matches: 0,
    timeElapsed: 0,
    isGameWon: false,
    isPaused: false,
    isGameStarted: false,
    difficulty: initialDifficulty
  });

  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [bestScore, setBestScore] = useState<BestScore | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout>();
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  // Load best score for current difficulty
  useEffect(() => {
    const best = getBestScoreForDifficulty(gameState.difficulty);
    setBestScore(best);
  }, [gameState.difficulty]);

  // Timer effect
  useEffect(() => {
    if (gameState.isGameStarted && !gameState.isPaused && !gameState.isGameWon) {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.isGameStarted, gameState.isPaused, gameState.isGameWon]);

  // Check for win condition
  useEffect(() => {
    const totalPairs = gameState.cards.length / 2;
    if (gameState.matches === totalPairs && gameState.matches > 0) {
      setGameState(prev => ({ ...prev, isGameWon: true }));
      
      const finalScore = calculateScore(gameState.moves, gameState.timeElapsed, gameState.difficulty);
      const newBestScore: BestScore = {
        score: finalScore,
        moves: gameState.moves,
        time: gameState.timeElapsed,
        difficulty: gameState.difficulty,
        date: new Date().toISOString()
      };

      // Check if this is a new best score
      const currentBest = bestScore;
      const isNewBestScore = !currentBest || finalScore > currentBest.score;
      
      if (isNewBestScore) {
        saveBestScore(newBestScore);
        setBestScore(newBestScore);
        setIsNewBest(true);
      } else {
        setIsNewBest(false);
      }

      setShowWinModal(true);
    }
  }, [gameState.matches, gameState.moves, gameState.timeElapsed, gameState.difficulty, bestScore]);

  const flipCard = useCallback((cardId: string) => {
    if (isAnimating || gameState.isPaused || gameState.isGameWon) return;

    const card = gameState.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Start game on first move
    if (!gameState.isGameStarted) {
      setGameState(prev => ({ ...prev, isGameStarted: true }));
    }

    // Flip the card
    setGameState(prev => ({
      ...prev,
      cards: prev.cards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    }));

    const newFlippedCards = [...flippedCards, card];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsAnimating(true);
      setGameState(prev => ({ ...prev, moves: prev.moves + 1 }));

      const [first, second] = newFlippedCards;
      const isMatch = first.symbol === second.symbol;

      animationTimeoutRef.current = setTimeout(() => {
        if (isMatch) {
          // Match found
          setGameState(prev => ({
            ...prev,
            cards: prev.cards.map(c => 
              c.id === first.id || c.id === second.id 
                ? { ...c, isMatched: true }
                : c
            ),
            matches: prev.matches + 1
          }));
        } else {
          // No match - flip cards back
          setGameState(prev => ({
            ...prev,
            cards: prev.cards.map(c => 
              c.id === first.id || c.id === second.id 
                ? { ...c, isFlipped: false }
                : c
            )
          }));
        }
        
        setFlippedCards([]);
        setIsAnimating(false);
      }, 1200);
    }
  }, [gameState, flippedCards, isAnimating]);

  const restartGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    
    setGameState(prev => ({
      cards: generateCards(prev.difficulty),
      moves: 0,
      matches: 0,
      timeElapsed: 0,
      isGameWon: false,
      isPaused: false,
      isGameStarted: false,
      difficulty: prev.difficulty
    }));
    
    setFlippedCards([]);
    setIsAnimating(false);
    setShowWinModal(false);
    setIsNewBest(false);
  }, []);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    
    setGameState({
      cards: generateCards(difficulty),
      moves: 0,
      matches: 0,
      timeElapsed: 0,
      isGameWon: false,
      isPaused: false,
      isGameStarted: false,
      difficulty
    });
    
    setFlippedCards([]);
    setIsAnimating(false);
    setShowWinModal(false);
    setIsNewBest(false);
  }, []);

  const togglePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const closeWinModal = useCallback(() => {
    setShowWinModal(false);
  }, []);

  const currentScore = calculateScore(gameState.moves, gameState.timeElapsed, gameState.difficulty);

  return {
    gameState,
    flippedCards,
    isAnimating,
    showWinModal,
    isNewBest,
    bestScore,
    currentScore,
    flipCard,
    restartGame,
    changeDifficulty,
    togglePause,
    closeWinModal
  };
};