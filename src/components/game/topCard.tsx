import { RefObject } from "react";
import { match } from "ts-pattern";

import { Card as CardType } from "@/common/type/card";

import { Card } from "./card";

type Props = {
  topCardRef: RefObject<HTMLDivElement | null>;
  topCard: CardType | undefined;
};

const TopCard: React.FC<Props> = ({ topCardRef, topCard }) => {
  return match(topCard)
    .with(undefined, () => null)
    .otherwise((v) => (
      <div ref={topCardRef} className="absolute inset-0 m-auto size-fit">
        <Card cardVariant={v} />
      </div>
    ));
};

export default TopCard;
