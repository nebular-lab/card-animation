type Props = {
  deckSize: number;
};

export const Deck = ({ deckSize }: Props) => {
  return (
    <div
      className={`absolute flex aspect-square items-center justify-center rounded-full border-2 border-border/60 text-white`}
    >
      {deckSize}
    </div>
  );
};
