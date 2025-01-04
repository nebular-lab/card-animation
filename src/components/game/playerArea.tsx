import { motion } from "motion/react";
import { RefObject } from "react";

import { Player } from "@/common/type/player";
import { OpponentCard } from "@/hooks/useGame";

import { Card } from "./card";
import { FloatingText } from "./floatingText";

type Props = {
  player: Player | undefined;
  isTurn: boolean;
  playerCardRef: RefObject<HTMLDivElement | null>;
  opponentCard: OpponentCard | undefined;
  floatingText: string;
  playerFloatingTextRef: RefObject<HTMLDivElement | null>;
};

export const PlayerArea = ({
  player,
  isTurn,
  playerCardRef,
  opponentCard,
  floatingText,
  playerFloatingTextRef,
}: Props) => {
  return (
    <div className="relative h-[52px] w-[168px]">
      {isTurn && (
        <motion.div
          className="absolute inset-0 m-auto rounded-full bg-yellow-500 opacity-50"
          initial={{ scaleX: 1, scaleY: 1 }}
          animate={{ scaleX: 1.1, scaleY: 1.2, opacity: 0.3 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      )}
      <div
        className={`relative size-full rounded-full border-2 bg-gray-800 ${isTurn ? "border-yellow-500" : "border-border"}`}
      >
        <div
          className={`absolute inset-y-[-2px] left-[-2px] flex aspect-square items-center justify-center rounded-full border-2 ${isTurn ? "border-yellow-500" : "border-border"} text-white`}
        >
          {player?.cardCount ?? "-"}
          <div ref={playerCardRef} className="absolute inset-0">
            {opponentCard?.card && (
              <Card cardVariant={opponentCard.card} size="md" />
            )}
          </div>
        </div>

        <div
          className={`flex h-full items-center justify-center pl-[40px] text-white`}
        >
          {player?.name ?? "-"}
        </div>
      </div>
      {floatingText && (
        <FloatingText ref={playerFloatingTextRef} text={floatingText} />
      )}
    </div>
  );
};
