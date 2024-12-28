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
import { GameState } from "@/common/type/game";
import { SeatId } from "@/common/type/seat";
import { socketEventSchema } from "@/common/type/socketEvent";
import { discardAnimation } from "@/lib/animation";

export type PlayerRef = {
  id: SeatId;
  ref: RefObject<HTMLDivElement | null>;
};

export type MyCardRef = {
  id: number;
  ref: RefObject<HTMLDivElement | null>;
};

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState | undefined>(undefined);
  const playerRefs = seatIds.map((seatId) => {
    return {
      id: seatId,
      ref: createRef<HTMLDivElement>(),
    };
  });
  const deckRef = useRef<HTMLDivElement>(null);
  const topCardRef = useRef<HTMLDivElement>(null);
  const tableBorderRef = useRef<SVGRectElement>(null);
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
            await discardAnimation({
              action,
              myCardRefs,
              mySeatId: gameState.mySeatId,
              tableBorderRef,
              topCardRef,
            });
            setGameState(gameState);
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
    myCardRefs,
    playerRefs,
    deckRef,
    topCardRef,
    tableBorderRef,
  };
};
