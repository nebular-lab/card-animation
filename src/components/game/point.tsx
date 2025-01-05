type Props = {
  point: number | undefined;
};
export const Point = ({ point }: Props) => {
  return (
    <div className="absolute bottom-20 left-20 m-auto text-white">{point}</div>
  );
};
