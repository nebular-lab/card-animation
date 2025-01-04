import { match } from "ts-pattern";

import { seatIds } from "@/common/const";
import { useGame } from "@/hooks/useGame";
import { useSocket } from "@/hooks/useSocket";

import { ButtonField } from "../buttonField";
import { CardField } from "../cardField";
import { Deck } from "../deck";
import { Direction } from "../direction";
import { DrawStack } from "../drawStack";
import { OpponentDrawCard } from "../opponentDrawCard";
import { PlayerAreaField } from "../playerField";
import { TableBorder } from "../tableBorder";
import TopCard from "../topCard";

export const GameField = () => {
  const { socketRef } = useSocket();
  const {
    gameState,
    opponentCard,
    dummyCard,
    dummyCardRef,
    myCardRefs,
    tableBorderRef,
    anotherTableBorderRef,
    topCardRef,
    playerCardRefs,
    opponentDrawCards,
    playerFloatingTexts,
    playerFloatingTextRefs,
    canPointerEvent,
    setCanPointerEvent,
  } = useGame({ socketRef });

  return (
    <div
      className={`${canPointerEvent || "pointer-events-none"} relative h-[600px] w-[1024px] select-none bg-gray-800`}
    >
      {match(gameState)
        .with({ kind: "not-initialized" }, () => null)
        .otherwise((g) => (
          <>
            <div className="absolute inset-x-0 top-20 m-auto h-[320px] w-[700px]">
              <TableBorder
                tableBorderRef={tableBorderRef}
                anotherTableBorderRef={anotherTableBorderRef}
              />
              <TopCard topCardRef={topCardRef} topCard={g.topCard} />
              <PlayerAreaField
                seatIds={seatIds}
                mySeatId={g.mySeatId}
                gameState={g}
                playerCardRefs={playerCardRefs}
                opponentCard={opponentCard}
                plyerFloatingTexts={playerFloatingTexts}
                playerFloatingTextRefs={playerFloatingTextRefs}
              />
              <Direction isClockwise={g.isClockwise} />

              <Deck deckSize={g.deckSize} />
              <DrawStack drawStack={g.drawStack} />
              <OpponentDrawCard opponentDrawCards={opponentDrawCards} />
            </div>
            <CardField
              cards={g.myCards}
              cardRefs={myCardRefs}
              socketRef={socketRef}
              mySeatId={g.mySeatId}
              dummyCard={dummyCard}
              dummyCardRef={dummyCardRef}
              setCanPointerEvent={setCanPointerEvent}
            />
            <ButtonField
              canDraw={g.canDraw}
              canPass={g.canPass}
              canDrawStack={g.canDrawStack}
              drawStack={g.drawStack}
              canGameStart={g.canGameStart}
              socketRef={socketRef}
              mySeatId={g.mySeatId}
              setCanPointerEvent={setCanPointerEvent}
            />
          </>
        ))}
    </div>
  );
};
