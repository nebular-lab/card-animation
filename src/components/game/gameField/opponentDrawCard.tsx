import { RefObject } from "react";

import { Card } from "../card";

type Props = {
  opponentDrawCards: RefObject<HTMLDivElement | null>[];
};

export const OpponentDrawCard = (props: Props) => {
  const { opponentDrawCards } = props;

  return (
    <>
      {opponentDrawCards.map((opponentDrawCardRef, index) => {
        return (
          <div
            key={index}
            ref={opponentDrawCardRef}
            className="absolute inset-0 right-[30%] m-auto size-fit"
          >
            <Card cardVariant={{ kind: "HiddenCard" }} />
          </div>
        );
      })}
    </>
  );
};
