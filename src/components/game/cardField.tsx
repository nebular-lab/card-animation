import { AnimatePresence, motion } from "motion/react";
import { Dispatch, FC, RefObject, SetStateAction } from "react";

import { PlayerCard } from "@/common/type/card";
import { SeatId } from "@/common/type/seat";
import { MyCardRef } from "@/hooks/useGame";
import { action } from "@/lib/action";

import { Card } from "./card";

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
    <div className="absolute inset-x-0 bottom-10 m-auto flex justify-center gap-1">
      <AnimatePresence>
        {cards?.map((card) => {
          const discard = () => {
            action({
              action: {
                kind: "discard",
                card,
                seatId: mySeatId,
              },
              setCanPointerEvent,
              webSocket: socketRef.current,
            });
          };
          return (
            <motion.div
              key={card.id}
              ref={cardRefs.find((cardRef) => cardRef.id === card.id)?.ref}
              whileHover={{ scale: 1.1 }}
              onClick={card.canDiscard ? discard : undefined}
              className={card.canDiscard ? "" : "cursor-not-allowed"}
              layout
            >
              <Card cardVariant={card} size="md" hover />
            </motion.div>
          );
        })}

        <motion.div
          ref={dummyCardRef}
          whileHover={{ scale: 1.1 }}
          className={dummyCard ? "" : "opacity-0"}
          layout
        >
          {dummyCard && <Card cardVariant={dummyCard} size="md" hover />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
