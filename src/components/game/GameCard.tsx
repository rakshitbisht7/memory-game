import { motion } from 'framer-motion';
import { Card } from '@/types/game';

interface GameCardProps {
  card: Card;
  onClick: () => void;
  isAnimating?: boolean;
}

export const GameCard = ({ card, onClick, isAnimating = false }: GameCardProps) => {
  return (
    <motion.div
      className={`game-card aspect-square relative ${isAnimating ? 'pointer-events-none' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="card-face card-back flex items-center justify-center"
        animate={{
          rotateY: card.isFlipped || card.isMatched ? 180 : 0
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-2xl opacity-50">🎯</div>
      </motion.div>
      
      <motion.div
        className={`card-face card-front ${card.isMatched ? 'bg-game-matchGlow/20 border-game-matchGlow' : ''}`}
        animate={{
          rotateY: card.isFlipped || card.isMatched ? 0 : -180
        }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-3xl md:text-4xl">{card.symbol}</span>
      </motion.div>
    </motion.div>
  );
};