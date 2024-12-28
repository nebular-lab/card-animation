import { motion } from "motion/react";

type ArrowAnimationProps = {
  isRotate: boolean;
  isClockwise: boolean | undefined;
};

export const ArrowAnimation = ({
  isRotate,
  isClockwise,
}: ArrowAnimationProps) => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isClockwise ? "" : "scale-y-[-1]"} ${isRotate ? "rotate-180" : ""}`}
    >
      <motion.path
        d="M 50 80 A 30 30 0 0 1 50 20 L 45 25"
        className="origin-center stroke-border"
        transform="scaleX(-1)"
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
    </svg>
  );
};
