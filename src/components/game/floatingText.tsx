import { RefObject } from "react";

type Props = {
  ref: RefObject<HTMLDivElement | null>;
  text: string | undefined;
};
export const FloatingText = ({ ref, text }: Props) => {
  return (
    <div className="absolute inset-x-0 -top-10 flex justify-center">
      <div
        ref={ref}
        className="w-max rounded-sm bg-gray-800 p-1 text-center text-white"
      >
        {text}
      </div>
    </div>
  );
};
