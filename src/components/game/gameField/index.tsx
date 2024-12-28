import { match } from "ts-pattern";

import { seatIds } from "@/common/const";
import { useGame } from "@/hooks/useGame";

import { CardField } from "../cardField";
import { Deck } from "../deck";
import { Direction } from "../direction";
import { PlayerAreaField } from "../playerField";
import { TableBorder } from "../tableBorder";
import TopCard from "../topCard";

export const GameField = () => {
  const {
    socketRef,
    gameState,
    opponentCards,
    myCardRefs,
    tableBorderRef,
    anotherTableBorderRef,
    topCardRef,
    playerCardRefs,
  } = useGame();

  return (
    <div className="relative h-[600px] w-[1024px] select-none bg-gray-800">
      {match(gameState)
        .with(undefined, () => null)
        .otherwise((g) => (
          <>
            <div className="absolute inset-x-0 top-20 m-auto h-[320px] w-[700px]">
              <TableBorder tableBorderRef={tableBorderRef} anotherTableBorderRef={anotherTableBorderRef} />
              <Direction isClockwise={g.isClockwise} />
              <PlayerAreaField
                seatIds={seatIds}
                mySeatId={g.mySeatId}
                gameState={g}
                playerCardRefs={playerCardRefs}
                opponentCards={opponentCards}
              />
              <TopCard topCardRef={topCardRef} topCard={g.topCard} />
              <Deck deckSize={g.deckSize} />
            </div>
            <CardField
              cards={g.myCards}
              cardRefs={myCardRefs}
              socketRef={socketRef}
              mySeatId={g.mySeatId}
            />
          </>
        ))}
    </div>
  );
};
