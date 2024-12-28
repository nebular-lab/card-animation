import { AnimatePresence, motion } from "motion/react";
import { FC, RefObject } from "react";

import { PlayerCard } from "@/common/type/card";
import { SeatId } from "@/common/type/seat";
import { MyCardRef } from "@/hooks/useGame";
import { discardCard } from "@/lib/action";

import { Card } from "./card";

type Props = {
  cards: PlayerCard[] | undefined;
  cardRefs: MyCardRef[];
  socketRef: RefObject<WebSocket | null>;
  mySeatId: SeatId;
};

export const CardField: FC<Props> = ({
  cards,
  cardRefs,
  socketRef,
  mySeatId,
}) => {
  if (!cards) {
    return null;
  }
  return (
    <div className="absolute inset-x-0 bottom-10 m-auto flex justify-center gap-1">
      <AnimatePresence>
        {cards.map((card) => {
          const discard = () => {
            discardCard(
              {
                kind: "discard",
                card,
                seatId: mySeatId,
              },
              socketRef.current,
            );
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
      </AnimatePresence>
    </div>
  );
};
