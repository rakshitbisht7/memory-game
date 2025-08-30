import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Difficulty } from '@/types/game';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface GameControlsProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onRestart: () => void;
  onPauseResume: () => void;
  isPaused: boolean;
  isGameStarted: boolean;
}

export const GameControls = ({
  difficulty,
  onDifficultyChange,
  onRestart,
  onPauseResume,
  isPaused,
  isGameStarted
}: GameControlsProps) => {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <Settings className="w-5 h-5 text-muted-foreground" />
        <Select 
          value={difficulty} 
          onValueChange={onDifficultyChange}
          disabled={isGameStarted && !isPaused}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy (4×4)</SelectItem>
            <SelectItem value="medium">Medium (6×6)</SelectItem>
            <SelectItem value="hard">Hard (6×6)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onPauseResume}
        variant="secondary"
        size="sm"
        disabled={!isGameStarted}
        className="gap-2"
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        {isPaused ? 'Resume' : 'Pause'}
      </Button>

      <Button
        onClick={onRestart}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Restart
      </Button>
    </motion.div>
  );
};