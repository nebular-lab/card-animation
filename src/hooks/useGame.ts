import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { match } from "ts-pattern";

import { Card, PlayerCard } from "@/common/type/card";
import { GameState } from "@/common/type/game";
import { SeatId } from "@/common/type/seat";
import { socketEventSchema } from "@/common/type/socketEvent";
import {
  discardMyCardAnimation,
  discardOpponentCardAnimation,
  drawMyCardAnimation,
  drawOpponentCardAnimation,
  floatingTextAnimation,
  tableBorderAnimation,
} from "@/lib/animation";
import { sleep } from "@/lib/utils";

import { useSE } from "./useSE";

export type PlayerRef = {
  id: SeatId;
  ref: RefObject<HTMLDivElement | null>;
};

export type MyCardRef = {
  id: number;
  ref: RefObject<HTMLDivElement | null>;
};

export type OpponentCard = {
  seatId: SeatId;
  card: Card;
};

type Input = {
  socketRef: RefObject<WebSocket | null>;
};

export const useGame = ({ socketRef }: Input) => {
  const { passSE, discardSE } = useSE();
  const [canPointerEvent, setCanPointerEvent] = useState<boolean>(true);
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [opponentCard, setOpponentCard] = useState<OpponentCard | undefined>(
    undefined,
  );
  const [dummyCard, setDummyCard] = useState<PlayerCard | undefined>(undefined);
  const [opponentDrawCards, setOpponentDrawCards] = useState<
    RefObject<HTMLDivElement | null>[]
  >([]);
  const [playerFloatingTexts, setPlayerFloatingTexts] = useState<
    Record<SeatId, string>
  >({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const playerFloatingTextRefs: Record<
    SeatId,
    RefObject<HTMLDivElement | null>
  > = useMemo(
    () => ({
      1: createRef<HTMLDivElement>(),
      2: createRef<HTMLDivElement>(),
      3: createRef<HTMLDivElement>(),
      4: createRef<HTMLDivElement>(),
      5: createRef<HTMLDivElement>(),
      6: createRef<HTMLDivElement>(),
    }),
    [],
  );
  const deckRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const tableBorderRef = useRef<SVGRectElement>(null);
  const anotherTableBorderRef = useRef<SVGRectElement>(null);
  const myCardRefs = useMemo(
    () =>
      gameState?.myCards?.map((card) => {
        return {
          id: card.id,
          ref: createRef<HTMLDivElement>(),
        };
      }) ?? [],
    [gameState?.myCards],
  );
  const dummyCardRef = useRef<HTMLDivElement>(null);
  const playerCardRefs: Record<
    SeatId,
    RefObject<HTMLDivElement | null>
  > = useMemo(
    () => ({
      1: createRef<HTMLDivElement>(),
      2: createRef<HTMLDivElement>(),
      3: createRef<HTMLDivElement>(),
      4: createRef<HTMLDivElement>(),
      5: createRef<HTMLDivElement>(),
      6: createRef<HTMLDivElement>(),
    }),
    [],
  );

  useEffect(() => {
    if (!socketRef.current) {
      return;
    }
    socketRef.current.onmessage = async (event) => {
      const parsedEvent = socketEventSchema.safeParse(JSON.parse(event.data));

      if (!parsedEvent.success) {
        console.error(parsedEvent.error);
        return;
      }

      await match(parsedEvent.data)
        .with({ kind: "init-game" }, ({ gameState }) => {
          setGameState(gameState);
        })
        .with({ kind: "start-game" }, ({ gameState }) => {
          setGameState(gameState);
        })
        .with(
          { kind: "action", action: { kind: "discard" } },
          async ({ action, gameState }) => {
            if (gameState.mySeatId === action.seatId) {
              discardSE();
              await discardMyCardAnimation({
                action,
                nextActonSeatId: gameState.currentSeatId,
                myCardRefs,
                tableBorderRef,
                anotherTableBorderRef,
                topCardRef,
              });
              setGameState(gameState);
            } else {
              setOpponentCard({ seatId: action.seatId, card: action.card });
              await sleep(500);
              discardSE();
              await discardOpponentCardAnimation({
                action,
                nextActionSeatId: gameState.currentSeatId,
                opponentCardRefs: playerCardRefs,
                tableBorderRef,
                anotherTableBorderRef,
                topCardRef,
              });
              setGameState(gameState);
            }
          },
        )
        .with(
          { kind: "action", action: { kind: "pass" } },
          async ({ action, gameState }) => {
            await floatingTextAnimation({
              text: "PASS",
              ref: playerFloatingTextRefs[action.seatId],
              seatId: action.seatId,
              setFloatingText: setPlayerFloatingTexts,
              passSE,
            });
            await tableBorderAnimation({
              tableBorderRef,
              anotherTableBorderRef,
              fromSeatId: action.seatId,
              toSeatId: gameState.currentSeatId,
            });
            setGameState(gameState);
          },
        )
        .with(
          { kind: "action", action: { kind: "draw" } },
          async ({ action, gameState: newGameState }) => {
            if (newGameState.mySeatId === action.seatId) {
              const drawnCard = newGameState.myCards.find((myCard) =>
                gameState?.myCards?.every((card) => card.id !== myCard.id),
              );
              if (!drawnCard) {
                console.error("drawn card not found");
                return;
              }
              setDummyCard(drawnCard);
              discardSE();
              await drawMyCardAnimation({ dummyCardRef });
              setDummyCard(undefined);
              setGameState({
                ...newGameState,
                myCards: gameState?.myCards?.concat(drawnCard) ?? [],
              });
            } else {
              const cardRef = createRef<HTMLDivElement>();
              setOpponentDrawCards([cardRef]);
              discardSE();
              await sleep(500);
              await drawOpponentCardAnimation({
                opponentDrawCardRef: cardRef,
                drawnPlayerAreaRef: playerCardRefs[action.seatId],
              });
              setOpponentDrawCards([]);
              setGameState(newGameState);
            }
          },
        )
        .with(
          { kind: "action", action: { kind: "draw-stack" } },
          async ({ action, gameState }) => {
            if (gameState.mySeatId === action.seatId) {
              setGameState(gameState);
            } else {
              const cardRefs = Array.from({ length: action.count }, () =>
                createRef<HTMLDivElement>(),
              );
              setOpponentDrawCards(cardRefs);
              await sleep(200);
              for (const cardRef of cardRefs) {
                discardSE();
                await drawOpponentCardAnimation({
                  opponentDrawCardRef: cardRef,
                  drawnPlayerAreaRef: playerCardRefs[action.seatId],
                });
                await sleep(100);
              }
              setOpponentDrawCards([]);
              await tableBorderAnimation({
                tableBorderRef,
                anotherTableBorderRef,
                fromSeatId: action.seatId,
                toSeatId: gameState.currentSeatId,
              });
              setGameState(gameState);
            }
          },
        )
        .exhaustive();

      setCanPointerEvent(true);
    };
  }, [
    discardSE,
    gameState?.myCards,
    myCardRefs,
    opponentCard,
    opponentDrawCards,
    passSE,
    playerCardRefs,
    playerFloatingTextRefs,
    socketRef,
  ]);

  return {
    socketRef,
    gameState,
    opponentCard,
    dummyCard,
    playerFloatingTexts,
    playerFloatingTextRefs,
    dummyCardRef,
    myCardRefs,
    deckRef,
    topCardRef,
    tableBorderRef,
    anotherTableBorderRef,
    playerCardRefs,
    opponentDrawCards,
    canPointerEvent,
    setCanPointerEvent,
  };
};
