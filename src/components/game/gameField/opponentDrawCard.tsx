import { RefObject } from "react";

import { Card } from "../card";

type Props = {
  opponentDrawCardRef: RefObject<HTMLDivElement | null>;
  visibleOpponentDrawCard: boolean;
};

export const OpponentDrawCard = (props: Props) => {
  const { opponentDrawCardRef, visibleOpponentDrawCard } = props;
  return (
    <div ref={opponentDrawCardRef} className="absolute inset-0 right-[30%] m-auto size-fit">
      {visibleOpponentDrawCard && <Card cardVariant={{ kind: "HiddenCard" }} />}
    </div>
  );
};
