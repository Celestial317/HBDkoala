import { useMemo } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  const stars = useMemo(() =>
    Array.from({ length: 180 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: 0.7 + Math.random() * 2,
      delay: Math.random() * 6,
      duration: 2 + Math.random() * 4,
      peakOpacity: 0.35 + Math.random() * 0.65,
      color: ['#ffffff', '#d0e8ff', '#a8caff', '#e8f2ff', '#bcd8ff'][Math.floor(Math.random() * 5)],
    }))
  , []);

  const glowStars = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 95}%`,
      size: 2.5 + Math.random() * 3.5,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  , []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep space background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, #0c1a3e 0%, #030c20 45%, #010610 100%)',
        }}
      />

      {/* Nebula diffuse glows */}
      <div
        className="absolute"
        style={{
          top: '10%', left: '55%',
          width: '520px', height: '380px',
          background: 'radial-gradient(ellipse, rgba(30,70,200,0.13) 0%, transparent 70%)',
          transform: 'rotate(-15deg)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute"
        style={{
          top: '58%', left: '5%',
          width: '420px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(70,30,180,0.09) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: '8%', right: '10%',
          width: '300px', height: '240px',
          background: 'radial-gradient(ellipse, rgba(20,55,160,0.11) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Small twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
          animate={{ opacity: [0.04, star.peakOpacity, 0.04], scale: [1, 1.5, 1] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Bright glow stars */}
      {glowStars.map((star) => (
        <motion.div
          key={`g-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            opacity: [0.25, 1, 0.25],
            boxShadow: [
              `0 0 ${star.size}px rgba(160,210,255,0.3)`,
              `0 0 ${star.size * 5}px rgba(160,210,255,0.95), 0 0 ${star.size * 10}px rgba(80,160,255,0.4)`,
              `0 0 ${star.size}px rgba(160,210,255,0.3)`,
            ],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* SVG crescent moon */}
      <motion.div
        className="absolute top-12 right-14"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
          <defs>
            <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M37 9C28 11 21 19 21 29C21 39 28 47 37 49C26 51 13 43 11 30C9 17 18 5 29 4C31.8 3.4 34.6 4.5 37 9Z"
            fill="rgba(215,238,255,0.92)"
            filter="url(#moonGlow)"
          />
          <circle cx="25" cy="19" r="2.2" fill="rgba(170,210,255,0.35)" />
          <circle cx="33" cy="37" r="1.6" fill="rgba(170,210,255,0.28)" />
          <circle cx="19" cy="31" r="1.1" fill="rgba(170,210,255,0.22)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default Background;
