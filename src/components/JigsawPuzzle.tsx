import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';

const ROWS = 3;
const COLS = 3;
const TOTAL = ROWS * COLS;
const IMAGE = '/jigsaw_2.png';

function shuffle(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.every((v, i) => v === i)) [a[0], a[1]] = [a[1], a[0]];
  return a;
}

export default function JigsawPuzzle({ onClose }: { onClose: () => void }) {
  const [pieces, setPieces] = useState<number[]>(() => shuffle(TOTAL));
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<null | 'correct' | 'wrong'>(null);
  const [pieceSize, setPieceSize] = useState(60);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const calc = () => {
      const maxW = window.innerWidth * 0.88 - 32;
      const maxH = window.innerHeight * 0.75 - 100;
      const available = Math.min(maxW, maxH);
      setPieceSize(Math.max(40, Math.floor(available / COLS)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  function handlePieceClick(gridIdx: number) {
    if (result === 'correct') return;
    if (selected === null) { setSelected(gridIdx); return; }
    if (selected === gridIdx) { setSelected(null); return; }
    const next = [...pieces];
    [next[selected], next[gridIdx]] = [next[gridIdx], next[selected]];
    setPieces(next);
    setSelected(null);
    if (result === 'wrong') setResult(null);
  }

  function handleSubmit() {
    const isSolved = pieces.every((v, i) => v === i);
    setResult(isSolved ? 'correct' : 'wrong');
  }

  function handleReset() {
    setPieces(shuffle(TOTAL));
    setSelected(null);
    setResult(null);
  }

  const gridPx = pieceSize * COLS + (COLS - 1) * 2;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative flex flex-col items-center gap-3 bg-[#07071a] border border-purple-500/30 rounded-2xl p-4 sm:p-6 shadow-[0_0_80px_rgba(120,60,255,0.4)]"
        initial={{ scale: 0.82, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      >
        <div className="flex w-full items-center justify-between gap-6">
          <span className="text-purple-300 text-xs tracking-[0.25em] uppercase font-light">
            Jigsaw Puzzle
          </span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={handleReset} title="Shuffle again"
              className="text-purple-400 hover:text-purple-200 transition-colors p-1 cursor-pointer">
              <RotateCcw size={14} />
            </button>
            <button type="button" onClick={onClose}
              className="text-purple-400 hover:text-white transition-colors p-1 cursor-pointer">
              <X size={16} />
            </button>
          </div>
        </div>

        <p className="text-purple-500/70 text-[11px] font-light -mt-1 self-start">
          Tap a piece then tap its destination to swap
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, ${pieceSize}px)`,
          gap: 2,
          width: gridPx,
          userSelect: 'none',
        }}>
          {pieces.map((pieceId, gridIdx) => {
            const origRow = Math.floor(pieceId / COLS);
            const origCol = pieceId % COLS;
            const isSel = selected === gridIdx;
            const isOk = pieceId === gridIdx;
            return (
              <div
                key={gridIdx}
                onClick={() => handlePieceClick(gridIdx)}
                style={{
                  width: pieceSize, height: pieceSize,
                  backgroundImage: `url('${IMAGE}')`,
                  backgroundSize: `${pieceSize * COLS}px ${pieceSize * ROWS}px`,
                  backgroundPosition: `-${origCol * pieceSize}px -${origRow * pieceSize}px`,
                  backgroundRepeat: 'no-repeat',
                  cursor: result === 'correct' ? 'default' : 'pointer',
                  borderRadius: 3,
                  transform: isSel ? 'scale(1.08)' : 'scale(1)',
                  transition: 'transform 0.08s, outline 0.1s, box-shadow 0.1s',
                  outline: isSel ? '2.5px solid rgba(250,204,21,1)' : isOk ? '1.5px solid rgba(74,222,128,0.7)' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isSel ? '0 0 14px rgba(250,204,21,0.55)' : isOk ? '0 0 7px rgba(74,222,128,0.35)' : 'none',
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-2 w-full pt-1">
          {result === 'wrong' && (
            <p className="text-red-400 text-sm font-light">
              Not quite right � keep trying! ??
            </p>
          )}
          {result !== 'correct' && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-8 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/40 text-white text-sm font-light cursor-pointer hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_18px_rgba(140,80,255,0.4)]"
            >
              Submit
            </button>
          )}
        </div>

        <AnimatePresence>
          {result === 'correct' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="flex flex-col items-center gap-3 text-center px-8"
                initial={{ scale: 0.6, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 14, delay: 0.2 }}
              >
                <motion.span className="text-5xl"
                  animate={{ rotate: [0, -12, 12, -12, 12, 0], scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.7, delay: 0.35 }}>
                    🎉
                </motion.span>
                <p className="text-2xl sm:text-3xl font-light text-white tracking-wide">
                  Yayyyy you solved it!!
                </p>
                <p className="text-purple-300 text-sm font-light">
                  😭😭☝️AI gen image btw lol
                </p>
                <button type="button" onClick={onClose}
                  className="mt-2 px-6 py-2 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-100 text-sm cursor-pointer hover:bg-purple-500/50 transition-colors">
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
