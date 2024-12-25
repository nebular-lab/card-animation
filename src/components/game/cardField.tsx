import { AnimatePresence, motion } from "motion/react";
import { FC, RefObject } from "react";

import { PlayerCard } from "@/common/type/game";
import { SeatId } from "@/common/type/seat";
import { MyCardRef } from "@/hooks/useGame";
import { discardCard } from "@/lib/action";

import { Card } from "./card";

type Props = {
  cards: PlayerCard[];
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
  return (
    <div className="flex justify-center gap-1">
      <AnimatePresence>
        {cards.map((card) => {
          const discard = () => {
            discardCard(
              {
                kind: "discard",
                cardId: card.id,
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
