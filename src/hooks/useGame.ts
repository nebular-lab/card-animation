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
import { GameState, NotInitializedGameState } from "@/common/type/game";
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

export const notInitializedGameState: NotInitializedGameState = {
  kind: "not-initialized",
  myCards: [],
};

type Input = {
  socketRef: RefObject<WebSocket | null>;
};

export const useGame = ({ socketRef }: Input) => {
  const { passSE, discardSE, unoSE } = useSE();
  const [canPointerEvent, setCanPointerEvent] = useState<boolean>(true);
  const [gameState, setGameState] = useState<GameState>(
    notInitializedGameState,
  );
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
        .with(
          { kind: "action", action: { kind: "discard" } },
          async ({ action, gameState }) => {
            if (gameState.mySeatId === action.seatId) {
              discardSE();
              if (action.isUNO) {
                floatingTextAnimation({
                  text: "UNO",
                  ref: playerFloatingTextRefs[action.seatId],
                  seatId: action.seatId,
                  setFloatingText: setPlayerFloatingTexts,
                  SE: unoSE,
                });
              }
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
              if (action.isUNO) {
                floatingTextAnimation({
                  text: "UNO",
                  ref: playerFloatingTextRefs[action.seatId],
                  seatId: action.seatId,
                  setFloatingText: setPlayerFloatingTexts,
                  SE: unoSE,
                });
              }
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
              SE: passSE,
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
          async ({ action, gameState: newGameState }) => {
            if (newGameState.mySeatId === action.seatId) {
              const cardRefs = Array.from({ length: action.count }, () =>
                createRef<HTMLDivElement>(),
              );
              const drawCards = newGameState.myCards.filter((myCard) =>
                gameState?.myCards?.every((card) => card.id !== myCard.id),
              );
              setOpponentDrawCards(cardRefs);
              await sleep(200);
              let index = 0;
              for (const cardRef of cardRefs) {
                drawOpponentCardAnimation({
                  opponentDrawCardRef: cardRef,
                  drawnPlayerAreaRef: playerCardRefs[action.seatId],
                }).then(() => {
                  const drawnCard = drawCards[index];
                  setDummyCard(drawnCard);
                  drawMyCardAnimation({
                    dummyCardRef,
                  });
                  setDummyCard(undefined);
                  setGameState((prev) => {
                    return {
                      ...prev,
                      myCards: prev.myCards?.concat(drawnCard) ?? [],
                    } as GameState; //TODO 対処
                  });

                  setGameState((prev) => {
                    return {
                      ...prev,
                      players: prev?.players?.map((player) => {
                        if (player.seatId === action.seatId) {
                          return {
                            ...player,
                            cardCount: player.cardCount + 1,
                          };
                        } else {
                          return player;
                        }
                      }),
                    } as GameState; //TODO 対処
                  });
                });
                await sleep(1000);
                index++;
              }
              await sleep(500);
              setOpponentDrawCards([]);
              setGameState(newGameState);
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
                toSeatId: newGameState.currentSeatId,
              });
              setGameState(newGameState);
            }
          },
        )
        .with(
          { kind: "action", action: { kind: "start" } },
          async ({ gameState: newGameState }) => {
            setGameState({
              kind: "not-started",
              players: newGameState.players.map((player) => ({
                ...player,
                cardCount: 0,
              })),
              myCards: [],
              deckSize: 112,
              mySeatId: newGameState.mySeatId,
              canGameStart: !!gameState?.canGameStart,
            });
            await sleep(200);

            type CardRef =
              | {
                  kind: "hero";
                  ref: RefObject<HTMLDivElement | null>;
                  index: number;
                  seatId: SeatId;
                }
              | {
                  kind: "opponent";
                  ref: RefObject<HTMLDivElement | null>;
                  seatId: SeatId;
                  index: undefined;
                };
            const cardRefs: CardRef[] = Array.from(
              { length: newGameState.players.length * 7 },
              (_, index) => {
                const seatId =
                  newGameState.players[index % newGameState.players.length]
                    .seatId;

                if (seatId === newGameState.mySeatId) {
                  return {
                    kind: "hero",
                    ref: createRef<HTMLDivElement>(),
                    index: index / newGameState.players.length,
                    seatId,
                  };
                }
                return {
                  kind: "opponent",
                  ref: createRef<HTMLDivElement>(),
                  seatId,
                };
              },
            );

            setOpponentDrawCards(cardRefs.map(({ ref }) => ref));

            await sleep(200);

            for (const { kind, seatId, ref, index } of cardRefs) {
              discardSE();

              const setCardCount = () => {
                setGameState((prev) => {
                  return {
                    ...prev,
                    players: prev?.players?.map((player) => {
                      if (player.seatId === seatId) {
                        return {
                          ...player,
                          cardCount: player.cardCount + 1,
                        };
                      } else {
                        return player;
                      }
                    }),
                  } as GameState; //TODO 対処
                });
              };

              drawOpponentCardAnimation({
                opponentDrawCardRef: ref,
                drawnPlayerAreaRef: playerCardRefs[seatId],
              }).then(() => {
                if (kind === "hero") {
                  const drawnCard = newGameState.myCards[index];
                  setDummyCard(drawnCard);
                  drawMyCardAnimation({
                    dummyCardRef,
                  });
                  setDummyCard(undefined);
                  setGameState((prev) => {
                    return {
                      ...prev,
                      myCards: prev.myCards?.concat(drawnCard) ?? [],
                    } as GameState; //TODO 対処
                  });
                }
                setCardCount();
              });

              await sleep(100);
            }

            setGameState((prev) => {
              return {
                ...prev,
                deckSize: newGameState.deckSize + 1,
              } as GameState; //TODO 対処
            });

            await sleep(1500);

            discardSE();
            setGameState(newGameState);
            setOpponentDrawCards([]);
          },
        )
        .exhaustive();

      setCanPointerEvent(true);
    };
  }, [
    discardSE,
    gameState?.canGameStart,
    gameState?.myCards,
    myCardRefs,
    opponentCard,
    opponentDrawCards,
    passSE,
    playerCardRefs,
    playerFloatingTextRefs,
    socketRef,
    unoSE,
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
