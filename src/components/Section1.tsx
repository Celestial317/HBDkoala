import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section1Props {
  onDone: () => void;
}

const Section1 = ({ onDone }: Section1Props) => {
  const [fading, setFading] = useState(false);

  const handleEnded = () => {
    setFading(true);
    setTimeout(() => onDone(), 900);
  };

  return (
    <AnimatePresence>
      {!fading ? (
        <motion.div
          key="video-splash"
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          <video
            className="w-full h-full object-cover"
            src="/animation_space_jump.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
          />

          {/* Skip hint */}
          <motion.button
            className="absolute bottom-8 right-8 text-white/40 text-xs tracking-widest uppercase font-light hover:text-white/70 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={handleEnded}
          >
            skip &rarr;
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          key="fade-out"
          className="fixed inset-0 z-50 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />
      )}
    </AnimatePresence>
  );
};

export default Section1;

