import { motion, MotionValue, useTransform } from 'framer-motion';

interface Section5Props {
  scrollYProgress: MotionValue<number>;
  pageIndex: number;
  totalPages: number;
}

const wishesBoxes = [
  'To my dearest Koala, on your special day, I want to wish you a very happy birthday filled with love, joy, and all the things that make you smile.',
  'Thank you for being such an incredible person in my life, your teddy, the memories and lessons are still an aid to me in my hustles.',
  'Even though i only get to convey my words only once a year, i want you to know that i cherish all my wins and loses with you.',
  'Got to know that you have been doing good, am really happy to hear that. Keep working hard and achieving great things, but also remember to take care of yourself and have fun along the way.',
  'I wish you health, happiness and prosperity in the coming year. May all your dreams come true and may you continue to be the amazing person that you are.',
];

const WishCard = ({
  text, index, scrollYProgress, pageStart, pageEnd,
}: {
  text: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  pageStart: number;
  pageEnd: number;
}) => {
  const fromLeft = index % 2 === 0;
  const span    = pageEnd - pageStart;
  // Stagger cards evenly across 55% of the page span
  const stagger  = (index / (wishesBoxes.length + 1)) * span * 0.55;
  const inStart  = pageStart + stagger;
  // Each card takes 50% of the page span to fully fly in (slow & immersive)
  const inEnd    = inStart + span * 0.50;

  const xVal  = useTransform(scrollYProgress, [inStart, inEnd], [fromLeft ? -80 : 80, 0]);
  const opVal = useTransform(scrollYProgress, [inStart, inEnd], [0, 1]);

  return (
    <motion.div
      style={{ x: xVal, opacity: opVal, boxShadow: '0 4px 24px rgba(140,80,255,0.18)', willChange: 'transform, opacity' }}
      className="bg-purple-950/70 border border-purple-400/25 rounded-xl px-3 py-2.5 sm:px-5 sm:py-3 flex-1 min-h-0 flex items-center"
    >
      <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-light">
        {text}
      </p>
    </motion.div>
  );
};

const Section5 = ({ scrollYProgress, pageIndex, totalPages }: Section5Props) => {
  // Page N is fully centered at scrollYProgress = N / (totalPages-1).
  // Animations must finish AT that point, so use (totalPages-1) as divisor.
  const pageStart = (pageIndex - 0.5) / (totalPages - 1);
  const pageEnd   = pageIndex        / (totalPages - 1);
  const span      = pageEnd - pageStart;

  const titleX  = useTransform(scrollYProgress, [pageStart, pageStart + span * 0.3], [50, 0]);
  const titleOp = useTransform(scrollYProgress, [pageStart, pageStart + span * 0.3], [0, 1]);

  return (
    <div className="w-full h-full flex flex-col items-center px-4 sm:px-6 py-4 sm:py-6 overflow-hidden">
      <motion.h2
        style={{ x: titleX, opacity: titleOp }}
        className="text-xl sm:text-2xl md:text-3xl font-light text-purple-100 mb-3 text-center flex-shrink-0"
      >
        The Wishes
      </motion.h2>

      <div className="max-w-xl w-full flex flex-col gap-1.5 sm:gap-2 flex-1 min-h-0">
        {wishesBoxes.map((text, i) => (
          <WishCard
            key={i}
            text={text}
            index={i}
            scrollYProgress={scrollYProgress}
            pageStart={pageStart}
            pageEnd={pageEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default Section5;

