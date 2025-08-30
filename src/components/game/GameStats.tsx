import { motion } from 'framer-motion';
import { GameStats as GameStatsType, BestScore } from '@/types/game';
import { formatTime } from '@/utils/gameLogic';
import { Trophy, Clock, Target, Star } from 'lucide-react';

interface GameStatsProps {
  stats: GameStatsType;
  bestScore?: BestScore | null;
  isPaused: boolean;
}

export const GameStats = ({ stats, bestScore, isPaused }: GameStatsProps) => {
  return (
    <div className="game-stats grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Target className="w-5 h-5 text-primary" />
        <div>
          <div className="text-sm text-muted-foreground">Moves</div>
          <div className="text-xl font-bold">{stats.moves}</div>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Clock className="w-5 h-5 text-accent" />
        <div>
          <div className="text-sm text-muted-foreground">Time</div>
          <div className={`text-xl font-bold ${isPaused ? 'text-yellow-500' : ''}`}>
            {isPaused ? 'PAUSED' : formatTime(stats.timeElapsed)}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Star className="w-5 h-5 text-game-gold" />
        <div>
          <div className="text-sm text-muted-foreground">Score</div>
          <div className="text-xl font-bold text-game-gold">{stats.score}</div>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Trophy className="w-5 h-5 text-game-silver" />
        <div>
          <div className="text-sm text-muted-foreground">Best</div>
          <div className="text-xl font-bold text-game-silver">
            {bestScore ? bestScore.score : '---'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};