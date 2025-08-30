import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GameStats, Difficulty } from '@/types/game';
import { formatTime } from '@/utils/gameLogic';
import { Trophy, Star, Target, Clock, PartyPopper } from 'lucide-react';

interface WinModalProps {
  isOpen: boolean;
  stats: GameStats;
  difficulty: Difficulty;
  isNewBest: boolean;
  onRestart: () => void;
  onClose: () => void;
}

export const WinModal = ({ 
  isOpen, 
  stats, 
  difficulty, 
  isNewBest, 
  onRestart, 
  onClose 
}: WinModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-card border border-border rounded-xl p-8 max-w-md w-full ${
              isNewBest ? 'winner-glow' : ''
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                className="mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
              >
                {isNewBest ? (
                  <PartyPopper className="w-16 h-16 mx-auto text-game-gold" />
                ) : (
                  <Trophy className="w-16 h-16 mx-auto text-primary" />
                )}
              </motion.div>

              <motion.h2
                className={`text-3xl font-bold mb-2 ${
                  isNewBest ? 'text-game-gold' : 'text-foreground'
                }`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isNewBest ? 'New Best Score!' : 'Congratulations!'}
              </motion.h2>

              <motion.p
                className="text-muted-foreground mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You completed the {difficulty} level!
              </motion.p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  className="bg-secondary/50 rounded-lg p-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Moves</span>
                  </div>
                  <div className="text-2xl font-bold">{stats.moves}</div>
                </motion.div>

                <motion.div
                  className="bg-secondary/50 rounded-lg p-4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Time</span>
                  </div>
                  <div className="text-2xl font-bold">{formatTime(stats.timeElapsed)}</div>
                </motion.div>
              </div>

              <motion.div
                className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg p-4 mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-6 h-6 text-game-gold" />
                  <span className="text-sm text-muted-foreground">Final Score</span>
                </div>
                <div className="text-3xl font-bold text-game-gold">{stats.score}</div>
              </motion.div>

              <div className="flex gap-3">
                <Button
                  onClick={onRestart}
                  className="flex-1"
                  variant="default"
                >
                  Play Again
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};