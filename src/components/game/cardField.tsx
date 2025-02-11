import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, RefObject, SetStateAction } from "react";

import { PlayerCard } from "@/common/type/card";
import { SeatId } from "@/common/type/seat";
import { MyCardRef } from "@/hooks/useGame";
import { action } from "@/lib/action";

import { Card } from "./card";

const variants = cva("", {
  variants: {
    canDiscard: {
      true: "",
      false: "cursor-not-allowed",
    },
  },
});

type Props = {
  cards: PlayerCard[] | undefined;
  cardRefs: MyCardRef[];
  socketRef: RefObject<WebSocket | null>;
  mySeatId: SeatId;
  dummyCard: PlayerCard | undefined;
  dummyCardRef: RefObject<HTMLDivElement | null>;
  setCanPointerEvent: Dispatch<SetStateAction<boolean>>;
};

export const CardField: FC<Props> = ({
  cards,
  cardRefs,
  socketRef,
  mySeatId,
  dummyCard,
  dummyCardRef,
  setCanPointerEvent,
}) => {
  return (
    <div className="absolute inset-0 top-[420px] m-auto flex size-fit max-w-[630px] flex-wrap justify-center">
      {cards?.map((card) => {
        const discard = () => {
          action({
            action: {
              kind: "discard",
              card,
              seatId: mySeatId,
              isUNO: cards.length === 2,
            },
            setCanPointerEvent,
            webSocket: socketRef.current,
          });
        };
        const ref = cardRefs.find((cardRef) => cardRef.id === card.id)?.ref;
        return (
          <motion.div
            key={card.id}
            ref={ref}
            whileHover={{ scale: 1.1 }}
            onClick={card.canDiscard ? discard : undefined}
            className={variants({ canDiscard: card.canDiscard })}
            layout
          >
            <Card cardVariant={card} size="md" />
          </motion.div>
        );
      })}

      <motion.div
        ref={dummyCardRef}
        whileHover={{ scale: 1.1 }}
        className={dummyCard ? "" : "opacity-0"}
        layout
      >
        {dummyCard && <Card cardVariant={dummyCard} size="md" />}
      </motion.div>
    </div>
  );
};
