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
  const { passSE, drawSE } = useSE();
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [opponentCard, setOpponentCard] = useState<OpponentCard | undefined>(
    undefined,
  );
  const [dummyCard, setDummyCard] = useState<PlayerCard | undefined>(undefined);
  const [visibleOpponentDrawCard, setVisibleOpponentDrawCard] =
    useState<boolean>(false);
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
  const opponentDrawCardRef = useRef<HTMLDivElement>(null);
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
    socketRef.current.onmessage = (event) => {
      const parsedEvent = socketEventSchema.safeParse(JSON.parse(event.data));

      if (!parsedEvent.success) {
        console.error(parsedEvent.error);
        return;
      }

      match(parsedEvent.data)
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
              drawSE();
              await drawMyCardAnimation({ dummyCardRef });
              setDummyCard(undefined);
              setGameState({
                ...newGameState,
                myCards: gameState?.myCards?.concat(drawnCard) ?? [],
              });
            } else {
              setVisibleOpponentDrawCard(true);
              drawSE();
              await sleep(500);
              await drawOpponentCardAnimation({
                opponentDrawCardRef,
                drawnPlayerAreaRef: playerCardRefs[action.seatId],
              });
              setVisibleOpponentDrawCard(false);
            }
          },
        )
        .exhaustive();
    };
  }, [
    drawSE,
    gameState?.myCards,
    myCardRefs,
    opponentCard,
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
    visibleOpponentDrawCard,
    opponentDrawCardRef,
  };
};
