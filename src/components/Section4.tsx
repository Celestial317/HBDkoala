import { motion, MotionValue, useTransform } from 'framer-motion';

interface Section4Props {
  scrollYProgress: MotionValue<number>;
  pageIndex: number;
  totalPages: number;
}

const chikkiBoxes = [
  "You can skip this section btw if you want to... i just created it so you know how im doing",
  "The last year i wished, i shared the good and bad...this year too i have many many many good things like winning many Hackathon, getting Internships, mentoring needy children and so many feats...with you being a motivation in all of them",
  "I have been doing really well in academics, my soft skills and also personal life be it friends and family, doing it all well.",
  "For the bad part, i just wish i could meet you once, have some time with you, a little chit chat some food outing or something idk...i just do miss you a lot",
  "well well well, even though i miss you i dont want to trouble you either, so i will only stick to my Annual Bday wishes for you Koala, Dhyan rakhna...and Thank you!!",
];

const UpdateCard = ({
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
  const stagger  = (index / (chikkiBoxes.length + 1)) * span * 0.55;
  const inStart  = pageStart + stagger;
  const inEnd    = inStart + span * 0.50;

  const xVal  = useTransform(scrollYProgress, [inStart, inEnd], [fromLeft ? -80 : 80, 0]);
  const opVal = useTransform(scrollYProgress, [inStart, inEnd], [0, 1]);

  return (
    <motion.div
      style={{ x: xVal, opacity: opVal, boxShadow: '0 4px 24px rgba(80,150,255,0.14)' }}
      className="backdrop-blur-lg bg-blue-400/15 border border-blue-300/35 rounded-xl px-3 py-2.5 sm:px-5 sm:py-3 flex-1 min-h-0 flex items-center"
    >
      <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-light">
        {text}
      </p>
    </motion.div>
  );
};

const Section4 = ({ scrollYProgress, pageIndex, totalPages }: Section4Props) => {
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
        style={{ x: titleX, opacity: titleOp, filter: 'drop-shadow(0 0 18px rgba(200,220,255,0.45))' }}
        className="text-xl sm:text-2xl md:text-3xl font-light text-blue-50 mb-3 text-center flex-shrink-0"
      >
        Chikki's Update
      </motion.h2>

      <div className="max-w-xl w-full flex flex-col gap-1.5 sm:gap-2 flex-1 min-h-0">
        {chikkiBoxes.map((text, i) => (
          <UpdateCard
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

export default Section4;

