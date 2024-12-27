import { match } from "ts-pattern";

import { ArrowAnimation } from "./arrowAnimation";

type Props = {
  isClockwise: boolean | undefined;
};

export const Direction = (props: Props) => {
  const { isClockwise } = props;

  return match(isClockwise)
    .with(undefined, () => null)
    .otherwise((v) => (
      <>
        <div className="absolute inset-0 -left-1/2 m-auto size-fit">
          <ArrowAnimation isRotate={!v} />
        </div>
        <div className="absolute inset-0 -right-1/2 m-auto size-fit">
          <ArrowAnimation isRotate={v} />
        </div>
      </>
    ));
};
