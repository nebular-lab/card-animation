import { GameState } from "@/common/type/game";
import { SeatId } from "@/common/type/seat";

import { PlayerArea } from "./playerArea";

const bottom = "absolute inset-x-0 bottom-[-6%] m-auto size-fit";
const leftBottom = "absolute inset-y-0 left-[-8%] top-1/2 m-auto size-fit";
const leftTop = "absolute inset-y-0 -top-1/2 left-[-8%] m-auto size-fit";
const top = "absolute inset-x-0 top-[-6%] m-auto size-fit";
const rightTop = "absolute inset-y-0 -top-1/2 right-[-8%] m-auto size-fit";
const rightBottom = "absolute inset-y-0 right-[-8%] top-1/2 m-auto size-fit";

const classNames = [bottom, leftBottom, leftTop, top, rightTop, rightBottom];

const getSeatClassName = (heroSeatId: SeatId, seatId: SeatId) => {
  const offset = (seatId - heroSeatId + 6) % 6; // 時計回りのオフセットを計算
  return classNames[offset];
};

type Props = {
  seatIds: SeatId[];
  mySeatId: SeatId;
  gameState: GameState;
};

export const PlayerAreaField: React.FC<Props> = ({ seatIds, mySeatId, gameState }) => {
  return (
    <>
      {seatIds.map((seatId) => {
        const player = gameState.players.find(
          (player) => player.seatId === seatId,
        );
        const isTurn = seatId === gameState.currentSeatId;

        return (
          <div key={seatId} className={getSeatClassName(mySeatId, seatId)}>
            <PlayerArea player={player} isTurn={isTurn} />
          </div>
        );
      })}
    </>
  );
};

