import { seatIds } from "@/common/const";
import { SeatId } from "@/common/type/seat";
import { useGame } from "@/hooks/useGame";

import { ArrowAnimation } from "./arrowAnimation";
import { Card } from "./card";
import { CardField } from "./cardField";
import { PlayerArea } from "./playerArea";
import { Table } from "./table";

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

export const GameField = () => {
  const mySeatId = 1;
  const { socketRef, gameState, myCardRefs, tableBorderRef, topCardRef } =
    useGame({ mySeatId });

  return (
    <div className="relative h-[600px] w-[1024px] select-none bg-gray-800">
      <div className="absolute inset-x-0 top-20 m-auto h-[320px] w-[700px]">
        <Table tableBorderRef={tableBorderRef} />
        <div className="absolute inset-0 -left-1/2 m-auto size-fit">
          <ArrowAnimation isRotate={false} />
        </div>
        <div className="absolute inset-0 -right-1/2 m-auto size-fit">
          <ArrowAnimation isRotate />
        </div>
        {seatIds.map((seatId) => (
          <div key={seatId} className={getSeatClassName(mySeatId, seatId)}>
            <PlayerArea
              player={gameState.players.find(
                (player) => player.seatId === seatId,
              )}
              isTurn={seatId === gameState.currentSeatId}
            />
          </div>
        ))}
      </div>
      <div
        ref={topCardRef}
        className="absolute inset-x-0 top-[200px] m-auto size-fit"
      >
        <Card cardVariant={gameState.topCard} />
      </div>
      <div className="absolute inset-x-0 bottom-10 m-auto">
        <CardField
          cards={gameState.myCards}
          cardRefs={myCardRefs}
          socketRef={socketRef}
          mySeatId={mySeatId}
        />
      </div>
    </div>
  );
};
