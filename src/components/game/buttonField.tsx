import { motion } from "motion/react";
import { Dispatch, RefObject, SetStateAction } from "react";

import { SeatId } from "@/common/type/seat";
import { action } from "@/lib/action";

import { Button } from "../shadcn/button";

type Props = {
  canDraw: boolean | undefined;
  canPass: boolean | undefined;
  canGameStart: boolean | undefined;
  canDrawStack: boolean | undefined;
  drawStack: number | undefined;
  socketRef: RefObject<WebSocket | null>;
  mySeatId: SeatId;
  setCanPointerEvent: Dispatch<SetStateAction<boolean>>;
};

export const ButtonField = ({
  canDraw,
  canPass,
  canGameStart,
  canDrawStack,
  drawStack,
  socketRef,
  mySeatId,
  setCanPointerEvent,
}: Props) => {
  const passAction = () => {
    action({
      action: { kind: "pass", seatId: mySeatId },
      webSocket: socketRef.current,
      setCanPointerEvent,
    });
  };
  const drawAction = () => {
    action({
      action: { kind: "draw", seatId: mySeatId },
      webSocket: socketRef.current,
      setCanPointerEvent,
    });
  };
  const drawStackAction = () => {
    action({
      action: { kind: "draw-stack", seatId: mySeatId, count: drawStack ?? 0 },
      webSocket: socketRef.current,
      setCanPointerEvent,
    });
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
      {canDrawStack && (
        <motion.div whileHover={{ scale: 1.1 }} layout>
          <Button onClick={drawStackAction} variant="game" size="lg">
            カードを引く
          </Button>
        </motion.div>
      )}
      {canGameStart && (
        <motion.div whileHover={{ scale: 1.1 }} layout>
          <Button
            onClick={() => {
              action({
                action: { kind: "start" },
                webSocket: socketRef.current,
                setCanPointerEvent,
              });
            }}
            variant="game"
            size="lg"
          >
            ゲームスタート
          </Button>
        </motion.div>
      )}
    </div>
  );
};
