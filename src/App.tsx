import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import Background from './components/Background';
import Section1 from './components/Section1';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Finale from './components/Finale';
import JigsawPuzzle from './components/JigsawPuzzle';

// Prevent browser from restoring scroll position on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// 4 pages: Hero | Wishes | Updates | Finale
const PAGES = 4;

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [puzzleOpen, setPuzzleOpen] = useState(false);
  const handleSplashDone = useCallback(() => {
    setSplashDone(true);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Translate the strip horizontally as user scrolls
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(PAGES - 1) * 100}vw`]);

  return (
    <div className="relative">
      <Background />

      {/* Splash overlay — fixed on top, removed when done */}
      <AnimatePresence>
        {!splashDone && <Section1 onDone={handleSplashDone} />}
      </AnimatePresence>

      {/* Scroll container always rendered so useScroll ref is always valid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        // Block pointer events and scrolling while splash is showing
        style={{ pointerEvents: splashDone ? 'auto' : 'none' }}
      >
          {/* Scroll driver: PAGES screens tall */}
          <div
            ref={containerRef}
            style={{ height: `${PAGES * 100}vh` }}
          >
            <div className="sticky top-0 h-screen overflow-hidden">
              <motion.div
                style={{ x }}
                className="flex h-screen"
              >
                {/* Page 0 — Hero */}
                <div className="w-screen h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 text-center">
                  <motion.h1
                    className="text-4xl md:text-6xl font-light text-blue-50 mb-6 tracking-wide"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(160,200,255,0.5))' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                  >
                    It's 8th March, wakey wakey Koala
                  </motion.h1>
                  <motion.div
                    className="text-8xl md:text-9xl"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🐨
                  </motion.div>
                  <motion.p
                    className="mt-10 text-blue-300 text-xs tracking-[0.3em] uppercase font-light opacity-60"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    scroll →
                  </motion.p>
                </div>

                {/* Page 1 — Wishes */}
                <div className="w-screen h-screen flex-shrink-0 overflow-hidden">
                  <Section5 scrollYProgress={scrollYProgress} pageIndex={1} totalPages={PAGES} />
                </div>

                {/* Page 2 — Updates */}
                <div className="w-screen h-screen flex-shrink-0 overflow-hidden">
                  <Section4 scrollYProgress={scrollYProgress} pageIndex={2} totalPages={PAGES} />
                </div>

                {/* Page 3 — Finale */}
                <div className="w-screen h-screen flex-shrink-0 overflow-hidden">
                  <Finale scrollYProgress={scrollYProgress} pageIndex={3} totalPages={PAGES} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      {/* Floating game panel button — only after splash */}
      <AnimatePresence>
        {splashDone && (
          <motion.div
            className="fixed bottom-6 right-5 z-40"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.4 }}
          >
            <motion.button
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setPuzzleOpen(true)}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 border border-purple-400/50 flex items-center justify-center text-white shadow-[0_0_28px_rgba(140,80,255,0.65)]"
            >
              <Gamepad2 size={26} />
              {/* Pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-purple-400/70"
                animate={{ scale: [1, 1.6, 1.6], opacity: [0.7, 0, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jigsaw puzzle modal */}
      <AnimatePresence>
        {puzzleOpen && <JigsawPuzzle onClose={() => setPuzzleOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

