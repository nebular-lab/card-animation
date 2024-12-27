import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { match } from "ts-pattern";
import { z } from "zod";

import { MOCK_SERVER_URL, seatIds } from "@/common/const";
import { actionSchema } from "@/common/type/action";
import { GameState, gameStateSchema, PlayerCard } from "@/common/type/game";
import { SeatId } from "@/common/type/seat";
import { discardAnimation } from "@/lib/animation";

const cards: PlayerCard[] = [
  {
    kind: "NumberCard",
    color: "red",
    number: 5,
    id: 1,
    canDiscard: true,
  },
  {
    kind: "ReverseCard",
    color: "green",
    id: 2,
    canDiscard: false,
  },
  {
    kind: "SkipCard",
    color: "blue",
    id: 3,
    canDiscard: false,
  },
  {
    kind: "DrawTwoCard",
    color: "yellow",
    id: 4,
    canDiscard: false,
  },
];

export const initialState: GameState = {
  kind: "in-game" as const,
  players: [
    {
      id: "1",
      name: "Alice",
      seatId: 1,
      cardCount: 4,
    },
    {
      id: "2",
      name: "Bob",
      seatId: 2,
      cardCount: 7,
    },
    {
      id: "3",
      name: "Charlie",
      seatId: 3,
      cardCount: 7,
    },
    {
      id: "4",
      name: "David",
      seatId: 4,
      cardCount: 7,
    },
    {
      id: "5",
      name: "Eve",
      seatId: 5,
      cardCount: 7,
    },
    {
      id: "6",
      name: "Fiona",
      seatId: 6,
      cardCount: 7,
    },
  ],
  deckCount: 32,
  topCard: {
    kind: "NumberCard",
    color: "red",
    number: 0,
    id: 0,
  },
  isClockwise: true,
  currentSeatId: 1,
  mySeatId: 1,
  myCards: cards,
};

export type PlayerRef = {
  id: SeatId;
  ref: RefObject<HTMLDivElement | null>;
};

export type MyCardRef = {
  id: number;
  ref: RefObject<HTMLDivElement | null>;
};

export const socketEventSchema = z.object({
  action: actionSchema,
  gameState: gameStateSchema,
});

type UseGame = {
  mySeatId: SeatId;
};

export const useGame = ({ mySeatId }: UseGame) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

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
      gameState.myCards?.map((card) => {
        return {
          id: card.id,
          ref: createRef<HTMLDivElement>(),
        };
      }) ?? [],
    [gameState.myCards],
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
        .with(
          { action: { kind: "discard" } },
          async ({ action, gameState }) => {
            await discardAnimation({
              action,
              myCardRefs,
              mySeatId,
              tableBorderRef,
              topCardRef,
            });
            setGameState(gameState);
          },
        )
        .with({ action: { kind: "pass" } }, (action) => {
          console.log(action);
        })
        .with({ action: { kind: "draw" } }, (action) => {
          console.log(action);
        })
        .exhaustive();
    };
  }, [myCardRefs, mySeatId]);

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
