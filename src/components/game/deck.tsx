type Props = {
  deckSize: number | undefined;
};

export const Deck = ({ deckSize }: Props) => {
  return (
    <div className="absolute inset-0 right-[30%] m-auto flex aspect-square size-fit h-[52px] items-center justify-center rounded-full border-2 text-white">
      {deckSize}
    </div>
  );
};
