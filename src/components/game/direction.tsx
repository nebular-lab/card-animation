import { cva } from "class-variance-authority";
import { match } from "ts-pattern";

import { cn } from "@/lib/utils";

import { ArrowAnimation } from "./arrowAnimation";

const directionVariants = cva("absolute inset-0 m-auto size-fit", {
  variants: {
    area: {
      left: "-left-1/2",
      right: "-right-1/2",
    },
  },
});

type Props = {
  isClockwise: boolean | undefined;
};

export const Direction = (props: Props) => {
  const { isClockwise } = props;

  return match(isClockwise)
    .with(undefined, () => null)
    .otherwise((v) => (
      <>
        <div className={cn(directionVariants({ area: "left" }))}>
          <ArrowAnimation isRotate={false} isClockwise={v} />
        </div>
        <div className={cn(directionVariants({ area: "right" }))}>
          <ArrowAnimation isRotate isClockwise={v} />
        </div>
      </>
    ));
};
