import { motion } from "motion/react";
import { RefObject } from "react";

type Props = {
  tableBorderRef: RefObject<SVGRectElement | null>;
  anotherTableBorderRef: RefObject<SVGRectElement | null>;
};

export const TableBorder = ({
  tableBorderRef,
  anotherTableBorderRef,
}: Props) => {
  return (
    <motion.svg
      viewBox="0 0 700 320"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-2 my-auto overflow-hidden"
    >
      <rect
        x="6"
        y="6"
        fill="none"
        width="688"
        height="308"
        rx="160"
        className="stroke-border"
        strokeWidth="3"
      />
      <motion.rect
        ref={tableBorderRef}
        x="7"
        y="7"
        fill="none"
        width="686"
        height="306"
        rx="160"
        className="stroke-yellow-500"
        strokeWidth="14"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: 0.1 }}
      />
      <motion.rect
        ref={anotherTableBorderRef}
        x="7"
        y="7"
        fill="none"
        width="686"
        height="306"
        transform="rotate(180)"
        rx="160"
        className="origin-center stroke-yellow-500"
        strokeWidth="14"
        strokeLinecap="round"
        initial={{ pathLength: 0, pathOffset: 0.1 }}
      />
    </motion.svg>
  );
};
