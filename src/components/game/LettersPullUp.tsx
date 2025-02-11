"use client";
import { useInView } from "motion/react";
import { motion } from "motion/react";
import { useRef } from "react";
import { createCallable } from "react-call";

import { cn, sleep } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
};

export const LettersPullUp = createCallable<Props>((props) => {
  const { text, className, call } = props;

  const splittedText = text.split("");

  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.07,
      },
    }),
  };
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="size-fit absolute inset-0 m-auto flex items-center justify-center">
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          ref={ref}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={cn(
            "text-center text-5xl font-bold tracking-tighter text-white",
            className,
          )}
          onAnimationComplete={async () => {
            if (i === splittedText.length - 1) {
              await sleep(100);
              call.end();
            }
          }}
        >
          {current == " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
});
