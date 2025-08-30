import { motion } from 'framer-motion';
import { GameCard } from './GameCard';
import { GameStats } from './GameStats';
import { GameControls } from './GameControls';
import { WinModal } from './WinModal';
import { useMemoryGame } from '@/hooks/useMemoryGame';
import { DIFFICULTY_CONFIG } from '@/types/game';

export const MemoryGame = () => {
  const {
    gameState,
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
  } = useMemoryGame();

  const gridConfig = DIFFICULTY_CONFIG[gameState.difficulty];
  const gridCols = gameState.difficulty === 'easy' ? 'grid-cols-4' : 'grid-cols-6';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-game-board p-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Memory Match
          </h1>
          <p className="text-muted-foreground text-lg">
            Flip cards to find matching pairs!
          </p>
        </motion.div>

        <GameControls
          difficulty={gameState.difficulty}
          onDifficultyChange={changeDifficulty}
          onRestart={restartGame}
          onPauseResume={togglePause}
          isPaused={gameState.isPaused}
          isGameStarted={gameState.isGameStarted}
        />

        <GameStats
          stats={{
            moves: gameState.moves,
            timeElapsed: gameState.timeElapsed,
            score: currentScore
          }}
          bestScore={bestScore}
          isPaused={gameState.isPaused}
        />

        <motion.div
          className={`grid ${gridCols} gap-3 md:gap-4 max-w-2xl mx-auto`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {gameState.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
            >
              <GameCard
                card={card}
                onClick={() => flipCard(card.id)}
                isAnimating={isAnimating}
              />
            </motion.div>
          ))}
        </motion.div>

        {gameState.isPaused && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-card border border-border rounded-xl p-8 text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
              <p className="text-muted-foreground mb-6">
                Click Resume to continue playing
              </p>
              <button
                onClick={togglePause}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Resume Game
              </button>
            </motion.div>
          </motion.div>
        )}

        <WinModal
          isOpen={showWinModal}
          stats={{
            moves: gameState.moves,
            timeElapsed: gameState.timeElapsed,
            score: currentScore
          }}
          difficulty={gameState.difficulty}
          isNewBest={isNewBest}
          onRestart={restartGame}
          onClose={closeWinModal}
        />
      </div>
    </div>
  );
};