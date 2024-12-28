import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { match } from "ts-pattern";

import { MOCK_SERVER_URL, seatIds } from "@/common/const";
import { Card } from "@/common/type/card";
import { GameState } from "@/common/type/game";
import { SeatId } from "@/common/type/seat";
import { socketEventSchema } from "@/common/type/socketEvent";
import { discardMyCardAnimation } from "@/lib/animation";

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

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const [opponentCards, setOpponentCards] = useState<OpponentCard[]>([]);

  const playerRefs = seatIds.map((seatId) => {
    return {
      id: seatId,
      ref: createRef<HTMLDivElement>(),
    };
  });
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
  const playerCardRefs = seatIds.map((seatId) => {
    return {
      id: seatId,
      ref: createRef<HTMLDivElement>(),
    };
  });

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket(MOCK_SERVER_URL);
    socketRef.current = webSocket;
    return () => {
      webSocket.close();
    };
  }, []);

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
              setGameState(gameState);
            }
          },
        )
        .with({ kind: "action", action: { kind: "pass" } }, (action) => {
          console.log(action);
        })
        .with({ kind: "action", action: { kind: "draw" } }, (action) => {
          console.log(action);
        })
        .exhaustive();
    };
  }, [myCardRefs]);

  return {
    socketRef,
    gameState,
    opponentCards,
    myCardRefs,
    playerRefs,
    deckRef,
    topCardRef,
    tableBorderRef,
    anotherTableBorderRef,
    playerCardRefs,
  };
};
