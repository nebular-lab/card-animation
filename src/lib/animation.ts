import { animate } from "motion/react";
import { equals, any } from "ramda";
import { RefObject } from "react";

import { DiscardAction } from "@/common/type/action";
import { SeatId } from "@/common/type/seat";

import { domDistance } from "./utils";

type DiscardAnimationInput = {
  action: DiscardAction;
  nextActonSeatId: SeatId;
  myCardRefs: { id: number; ref: RefObject<HTMLDivElement | null> }[];
  tableBorderRef: RefObject<SVGRectElement | null>;
  anotherTableBorderRef: RefObject<SVGRectElement | null>;
  topCardRef: RefObject<HTMLDivElement | null>;
};

export const discardMyCardAnimation = async (input: DiscardAnimationInput) => {
  const {
    action,
    nextActonSeatId,
    myCardRefs,
    tableBorderRef,
    anotherTableBorderRef,
    topCardRef,
  } = input;

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

  await tableBorderAnimation(
    tableBorderRef,
    anotherTableBorderRef,
    action.seatId,
    nextActonSeatId,
  );
};

const pathOffsetRelation: Record<SeatId, number> = {
  1: 0.6,
  2: 0.8,
  3: 0.9,
  4: 0.1,
  5: 0.3,
  6: 0.4,
};

const borderJumpSeatIdRelation: [SeatId, SeatId][] = [
  [3, 4],
  [3, 5],
  [2, 4],
  [4, 3],
  [5, 3],
  [4, 2],
];

const seatRotateRelation: Record<SeatId, SeatId> = {
  1: 4,
  2: 5,
  3: 6,
  4: 1,
  5: 2,
  6: 3,
};

const tableBorderAnimation = async (
  tableBorderRef: RefObject<SVGRectElement | null>,
  anotherTableBorderRef: RefObject<SVGRectElement | null>,
  fromSeatId: SeatId,
  toSeatId: SeatId,
) => {
  if (!tableBorderRef.current || !anotherTableBorderRef.current) {
    console.error("tableBorder not found");
    return;
  }

  if (any(equals([fromSeatId, toSeatId]), borderJumpSeatIdRelation)) {
    console.log("border jump");
    await animate(
      anotherTableBorderRef.current,
      {
        pathOffset: [
          pathOffsetRelation[seatRotateRelation[fromSeatId]],
          pathOffsetRelation[seatRotateRelation[toSeatId]],
        ],
      },
      { duration: 1 },
    );
  } else {
    await animate(
      tableBorderRef.current,
      {
        pathOffset: [
          pathOffsetRelation[fromSeatId],
          pathOffsetRelation[toSeatId],
        ],
      },
      { duration: 1 },
    );
  }
};
