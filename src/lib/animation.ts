import { animate } from "motion/react";
import { RefObject } from "react";

import { DiscardAction } from "@/common/type/action";
import { SeatId } from "@/common/type/seat";

import { domDistance } from "./utils";

type DiscardAnimationInput = {
  action: DiscardAction;
  myCardRefs: { id: number; ref: RefObject<HTMLDivElement | null> }[];
  mySeatId: SeatId;
  tableBorderRef: RefObject<SVGRectElement | null>;
  topCardRef: RefObject<HTMLDivElement | null>;
};

export const discardAnimation = async (input: DiscardAnimationInput) => {
  const { action, myCardRefs, mySeatId, tableBorderRef, topCardRef } = input;
  if (action.seatId === mySeatId) {
    const cardRef = myCardRefs.find((card) => card.id === action.cardId)?.ref;

    if (!cardRef || !cardRef.current) {
      console.error("card not found");
      return;
    }
    if (!tableBorderRef.current) {
      console.error("tableBorder not found");
      return;
    }

    if (!topCardRef.current) {
      console.error("topCard not found");
      return;
    }

    const { x, y } = domDistance({
      from: cardRef.current,
      to: topCardRef.current,
    });

    await animate(
      cardRef.current,
      { x, y },
      { duration: 0.3, ease: "easeInOut" },
    );

    await animate(
      tableBorderRef.current,
      { pathOffset: [0.65, 0.8] },
      { duration: 1 },
    );
  } else {
    // 他のプレイヤーがカードを捨てたときのアニメーション
  }
};
