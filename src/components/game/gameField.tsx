import { seatIds } from "@/common/const";
import { useGame } from "@/hooks/useGame";

import { CardField } from "./cardField";
import { Direction } from "./direction";
import { PlayerAreaField } from "./playerField";
import { TableBorder } from "./table";
import TopCard from "./topCard";

export const GameField = () => {
  const { socketRef, gameState, myCardRefs, tableBorderRef, topCardRef } =
    useGame();

  return (
    <div className="relative h-[600px] w-[1024px] select-none bg-gray-800">
      <div className="absolute inset-x-0 top-20 m-auto h-[320px] w-[700px]">
        <TableBorder tableBorderRef={tableBorderRef} />
        <Direction isClockwise={gameState.isClockwise} />
        <PlayerAreaField
          seatIds={seatIds}
          mySeatId={gameState.mySeatId}
          gameState={gameState}
        />
        <TopCard topCardRef={topCardRef} topCard={gameState.topCard} />
      </div>
      <CardField
        cards={gameState.myCards}
        cardRefs={myCardRefs}
        socketRef={socketRef}
        mySeatId={gameState.mySeatId}
      />
    </div>
  );
};
