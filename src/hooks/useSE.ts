import useSound from "use-sound";
export const useSE = () => {
  const [passSE] = useSound("/sound/tsumugi-pass.mp3", {
    volume: 0.5,
  });
  const [drawSE] = useSound("/sound/tsumugi-draw.mp3", {
    volume: 0.5,
  });
  return { passSE, drawSE };
};
