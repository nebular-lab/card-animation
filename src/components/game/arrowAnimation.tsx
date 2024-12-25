import { motion } from "motion/react";

type ArrowAnimationProps = {
  isRotate: boolean;
};

export const ArrowAnimation = ({ isRotate }: ArrowAnimationProps) => {
  const rotate = isRotate ? "rotate-180" : "";
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={rotate}
    >
      <motion.path
        d="M 50 80 A 30 30 0 0 1 50 20 L 45 25"
        className="stroke-border"
        fill="transparent"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          delay: 0.5,
        }}
      />
    </motion.svg>
  );
};
