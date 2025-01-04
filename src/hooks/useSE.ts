import useSound from "use-sound";
export const useSE = () => {
  const [passSE] = useSound("/sound/pass.mp3", {
    volume: 0.5,
  });
  const [drawSE] = useSound("/sound/draw.mp3", {
    volume: 0.5,
  });
  const [discardSE] = useSound("/sound/discard.mp3", {
    volume: 0.5,
  });
  const [unoSE] = useSound("/sound/uno.mp3", {
    volume: 0.5,
  });
  return { passSE, drawSE, discardSE, unoSE };
};
