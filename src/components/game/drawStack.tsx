type Props = {
  drawStack: number | undefined;
};
export const DrawStack = ({ drawStack }: Props) => {
  return (
    <div className="absolute inset-0 left-[30%] m-auto size-fit">
      <div className="text-white">{drawStack ? drawStack : ""}</div>
    </div>
  );
};
