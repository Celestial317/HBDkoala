import { motion, MotionValue, useTransform } from 'framer-motion';

interface FinaleProps {
  scrollYProgress: MotionValue<number>;
  pageIndex: number;
  totalPages: number;
}

const polaroids = [
  {
    img: '/img_1.jpeg',
    caption: 'Your smile is the brightest thing I know, and it lights up even the gloomiest days.',
    pin: '#f87171',
    rotateFinal: -3,
  },
  {
    img: '/img_2.jpeg',
    caption: 'Well, this Chikki will always annoy you a lot hehe',
    pin: '#60a5fa',
    rotateFinal: 2,
  },
];

const Finale = ({ scrollYProgress, pageIndex, totalPages }: FinaleProps) => {
  const pageStart = (pageIndex - 0.05) / totalPages;
  const pageEnd   = (pageIndex + 0.7)  / totalPages;
  const span      = pageEnd - pageStart;

  const titleOp   = useTransform(scrollYProgress, [pageStart, pageStart + span * 0.2], [0, 1]);
  const titleY    = useTransform(scrollYProgress, [pageStart, pageStart + span * 0.2], [30, 0]);

  const p0op      = useTransform(scrollYProgress, [pageStart + span * 0.15, pageStart + span * 0.35], [0, 1]);
  const p0y       = useTransform(scrollYProgress, [pageStart + span * 0.15, pageStart + span * 0.35], [60, 0]);
  const p0rot     = useTransform(scrollYProgress, [pageStart + span * 0.15, pageStart + span * 0.35], [-14, -3]);

  const p1op      = useTransform(scrollYProgress, [pageStart + span * 0.25, pageStart + span * 0.45], [0, 1]);
  const p1y       = useTransform(scrollYProgress, [pageStart + span * 0.25, pageStart + span * 0.45], [60, 0]);
  const p1rot     = useTransform(scrollYProgress, [pageStart + span * 0.25, pageStart + span * 0.45], [14, 2]);

  const msgOp     = useTransform(scrollYProgress, [pageStart + span * 0.4, pageStart + span * 0.6], [0, 1]);
  const msgY      = useTransform(scrollYProgress, [pageStart + span * 0.4, pageStart + span * 0.6], [20, 0]);

  const polaroidMotions = [
    { op: p0op, y: p0y, rot: p0rot },
    { op: p1op, y: p1y, rot: p1rot },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-start px-6 py-10 overflow-y-auto">
      {/* Soft glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(60,100,220,0.18) 0%, transparent 65%)' }}
      />

      {/* Title */}
      <motion.div
        style={{ opacity: titleOp, y: titleY }}
        className="text-center mb-10 relative z-10"
      >
        <h1
          className="text-4xl md:text-6xl font-light text-white"
          style={{ filter: 'drop-shadow(0 0 28px rgba(255,255,255,0.55))' }}
        >
          Happy Birthday Gaurvi! 💙
        </h1>
        <motion.div
          className="flex items-center justify-center gap-8 mt-6"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-5xl">🐨</span>
          <span className="text-4xl">🐧</span>
        </motion.div>
      </motion.div>

      {/* Polaroids */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center justify-center mb-10 relative z-10">
        {polaroids.map((p, i) => (
          <motion.div
            key={i}
            style={{
              opacity: polaroidMotions[i].op,
              y: polaroidMotions[i].y,
              rotate: polaroidMotions[i].rot,
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
            }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="relative bg-white p-3 pb-10 w-52 md:w-60 flex-shrink-0"
          >
            {/* Push-pin */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white/90 z-10"
              style={{
                backgroundColor: p.pin,
                boxShadow: `0 3px 10px ${p.pin}99`,
              }}
            />

            {/* Photo */}
            <div className="w-full aspect-square overflow-hidden mb-3">
              <img
                src={p.img}
                alt={p.caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            <p className="text-center text-gray-700 text-xs font-light leading-snug px-1">
              {p.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Final message */}
      <motion.p
        style={{ opacity: msgOp, y: msgY, filter: 'drop-shadow(0 0 10px rgba(160,200,255,0.3))' }}
        className="max-w-md text-center text-lg text-blue-100 font-light leading-relaxed relative z-10"
>
  Here’s to another year of you being absolutely, wonderfully, irreplaceably you. 🌙 <br /><br />
  Never forget to ping up whenever you need me ;) <br />
  ~ Well wishes from Chikki🐧
      </motion.p>
    </div>
  );
};

export default Finale;

