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

  const cardRef = myCardRefs.find((card) => card.id === action.card.id)?.ref;

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

  await tableBorderAnimation({
    tableBorderRef,
    anotherTableBorderRef,
    fromSeatId: action.seatId,
    toSeatId: nextActonSeatId,
  });
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

type TableBorderAnimationInput = {
  tableBorderRef: RefObject<SVGRectElement | null>;
  anotherTableBorderRef: RefObject<SVGRectElement | null>;
  fromSeatId: SeatId;
  toSeatId: SeatId;
};

export const tableBorderAnimation = async (
  input: TableBorderAnimationInput,
) => {
  const { tableBorderRef, anotherTableBorderRef, fromSeatId, toSeatId } = input;
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

type DiscardOpponentCardAnimationInput = {
  action: DiscardAction;
  opponentCardRefs: Record<SeatId, RefObject<HTMLDivElement | null>>;
  tableBorderRef: RefObject<SVGRectElement | null>;
  anotherTableBorderRef: RefObject<SVGRectElement | null>;
  topCardRef: RefObject<HTMLDivElement | null>;
  nextActionSeatId: SeatId;
};

export const discardOpponentCardAnimation = async (
  input: DiscardOpponentCardAnimationInput,
) => {
  const {
    action,
    opponentCardRefs,
    tableBorderRef,
    anotherTableBorderRef,
    topCardRef,
    nextActionSeatId,
  } = input;
  const cardRef = opponentCardRefs[action.seatId];

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

  await tableBorderAnimation({
    tableBorderRef,
    anotherTableBorderRef,
    fromSeatId: action.seatId,
    toSeatId: nextActionSeatId,
  });
};

type DrawMyCardAnimationInput = {
  dummyCardRef: RefObject<HTMLDivElement | null>;
};

export const drawMyCardAnimation = async (input: DrawMyCardAnimationInput) => {
  const { dummyCardRef } = input;

  if (!dummyCardRef.current) {
    console.error("dummyCard not found");
    return;
  }

  await animate(
    dummyCardRef.current,
    { x: 0, y: [30, 0], opacity: [0, 1] },
    { duration: 0.3, ease: "easeInOut" },
  );
};

type DrawOpponentCardAnimationInput = {
  opponentDrawCardRef: RefObject<HTMLDivElement | null>;
  drawnPlayerAreaRef: RefObject<HTMLDivElement | null>;
};

export const drawOpponentCardAnimation = async (
  input: DrawOpponentCardAnimationInput,
) => {
  const { opponentDrawCardRef, drawnPlayerAreaRef } = input;

  if (!opponentDrawCardRef.current || !drawnPlayerAreaRef.current) {
    console.error("opponentDrawCard or drawnPlayerArea not found");
    return;
  }

  const { x, y } = domDistance({
    from: opponentDrawCardRef.current,
    to: drawnPlayerAreaRef.current,
  });

  await animate(
    opponentDrawCardRef.current,
    { x, y },
    { duration: 0.4, ease: "easeInOut" },
  );
};
