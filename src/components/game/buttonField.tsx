import { motion } from "motion/react";
import { RefObject } from "react";

import { SeatId } from "@/common/type/seat";
import { action } from "@/lib/action";

import { Button } from "../shadcn/button";

type Props = {
  canDraw: boolean | undefined;
  canPass: boolean | undefined;
  socketRef: RefObject<WebSocket | null>;
  mySeatId: SeatId;
};

export const ButtonField = ({
  canDraw,
  canPass,
  socketRef,
  mySeatId,
}: Props) => {
  const passAction = () => {
    action({ kind: "pass", seatId: mySeatId }, socketRef.current);
  };
  const drawAction = () => {
    action({ kind: "draw", seatId: mySeatId }, socketRef.current);
  };
  return (
    <div className="absolute bottom-10 right-20 m-auto flex flex-col justify-center gap-1">
      {canPass && (
        <motion.div whileHover={{ scale: 1.1 }} layout>
          <Button onClick={passAction} variant="game" size="lg">
            パス
          </Button>
        </motion.div>
      )}
      {canDraw && (
        <motion.div whileHover={{ scale: 1.1 }} layout>
          <Button onClick={drawAction} variant="game" size="lg">
            カードを引く
          </Button>
        </motion.div>
      )}
    </div>
  );
};
