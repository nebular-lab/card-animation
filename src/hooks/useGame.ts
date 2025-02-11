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
import { LettersPullUp } from "@/components/game/LettersPullUp";
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
  const { passSE, discardSE, unoSE, gameSE, startSE } = useSE();
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

  const cardRefsMapRef = useRef<Map<number, RefObject<HTMLDivElement | null>>>(
    new Map(),
  );

  // myCardRefsの実装を変更
  const myCardRefs = useMemo(() => {
    return (
      gameState?.myCards?.map((card) => {
        // 既存のrefがあればそれを使用し、なければ新しく作成
        if (!cardRefsMapRef.current.has(card.id)) {
          cardRefsMapRef.current.set(
            card.id,
            createRef<HTMLDivElement | null>(),
          );
        }
        return {
          id: card.id,
          ref: cardRefsMapRef.current.get(card.id)!,
        };
      }) ?? []
    );
  }, [gameState?.myCards]);

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
        .with({ kind: "init-game" }, ({ updatedGameState }) => {
          setGameState(updatedGameState);
        })
        .with(
          { kind: "action", action: { kind: "discard" } },
          async ({ action, updatedGameState }) => {
            if (updatedGameState.mySeatId === action.seatId) {
              discardSE();
              setGameState(
                (prev) =>
                  ({
                    ...prev,
                    players: prev?.players?.map((player) =>
                      player.seatId === action.seatId
                        ? { ...player, cardCount: player.cardCount - 1 }
                        : player,
                    ),
                  }) as GameState,
              );
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
                nextActonSeatId: updatedGameState.currentSeatId,
                myCardRefs,
                tableBorderRef,
                anotherTableBorderRef,
                topCardRef,
              });
              setGameState(updatedGameState);
            } else {
              setOpponentCard({ seatId: action.seatId, card: action.card });
              await sleep(500);
              discardSE();

              setGameState(
                (prev) =>
                  ({
                    ...prev,
                    players: prev?.players?.map((player) =>
                      player.seatId === action.seatId
                        ? { ...player, cardCount: player.cardCount - 1 }
                        : player,
                    ),
                  }) as GameState,
              );

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
                nextActionSeatId: updatedGameState.currentSeatId,
                opponentCardRefs: playerCardRefs,
                tableBorderRef,
                anotherTableBorderRef,
                topCardRef,
              });
              setGameState(updatedGameState);
            }
          },
        )
        .with(
          { kind: "action", action: { kind: "pass" } },
          async ({ action, updatedGameState }) => {
            floatingTextAnimation({
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
              toSeatId: updatedGameState.currentSeatId,
            });
            setGameState(updatedGameState);
          },
        )
        .with(
          { kind: "action", action: { kind: "draw" } },
          async ({ action, updatedGameState }) => {
            if (updatedGameState.mySeatId === action.seatId) {
              const drawnCard = updatedGameState.myCards.find((myCard) =>
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
                ...updatedGameState,
                myCards: gameState?.myCards?.concat(drawnCard) ?? [],
              } as GameState);
            } else {
              const cardRef = createRef<HTMLDivElement>();
              setOpponentDrawCards([cardRef]);
              await sleep(500);
              discardSE();
              await drawOpponentCardAnimation({
                opponentDrawCardRef: cardRef,
                drawnPlayerAreaRef: playerCardRefs[action.seatId],
              });
              setOpponentDrawCards([]);
              setGameState(updatedGameState);
            }
          },
        )
        .with(
          { kind: "action", action: { kind: "draw-stack" } },
          async ({ action, updatedGameState }) => {
            if (updatedGameState.mySeatId === action.seatId) {
              const cardRefs = Array.from({ length: action.count }, () =>
                createRef<HTMLDivElement>(),
              );
              const drawCards = updatedGameState.myCards.filter((myCard) =>
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
                  discardSE();
                  drawMyCardAnimation({
                    dummyCardRef,
                  });
                  setDummyCard(undefined);
                  setGameState(
                    (prev) =>
                      ({
                        ...prev,
                        myCards: prev.myCards?.concat(drawnCard) ?? [],
                      }) as GameState,
                  );

                  setGameState(
                    (prev) =>
                      ({
                        ...prev,
                        players: prev?.players?.map((player) =>
                          player.seatId === action.seatId
                            ? { ...player, cardCount: player.cardCount + 1 }
                            : player,
                        ),
                      }) as GameState,
                  );
                });
                await sleep(1000);
                index++;
              }
              await sleep(500);
              setOpponentDrawCards([]);
              setGameState(updatedGameState);
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
                toSeatId: updatedGameState.currentSeatId,
              });
              setGameState(updatedGameState);
            }
          },
        )
        .with(
          { kind: "action", action: { kind: "start" } },
          async ({ updatedGameState }) => {
            setGameState({
              kind: "not-started",
              players: updatedGameState.players.map((player) => ({
                ...player,
                cardCount: 0,
              })),
              myCards: [],
              deckSize: 112,
              mySeatId: updatedGameState.mySeatId,
              canGameStart: false,
            } as GameState);
            await sleep(200);

            gameSE();
            await LettersPullUp.call({ text: "GAME" });

            await sleep(500);

            startSE();
            await LettersPullUp.call({ text: "START" });

            await sleep(500);

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
              { length: updatedGameState.players.length * 7 },
              (_, index) => {
                const seatId =
                  updatedGameState.players[
                    index % updatedGameState.players.length
                  ].seatId;

                if (seatId === updatedGameState.mySeatId) {
                  return {
                    kind: "hero",
                    ref: createRef<HTMLDivElement>(),
                    index: index / updatedGameState.players.length,
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

            // Deckを表示するため
            setGameState(
              (prev) =>
                ({
                  ...prev,
                  kind: updatedGameState.kind,
                }) as GameState,
            );

            for (const { kind, seatId, ref, index } of cardRefs) {
              discardSE();

              drawOpponentCardAnimation({
                opponentDrawCardRef: ref,
                drawnPlayerAreaRef: playerCardRefs[seatId],
              }).then(async () => {
                if (kind === "hero" && index !== undefined) {
                  const drawnCard = updatedGameState.myCards[index];
                  setDummyCard(drawnCard);
                  await drawMyCardAnimation({
                    dummyCardRef,
                  });
                  setDummyCard(undefined);
                }
                setGameState(
                  (prev) =>
                    ({
                      ...prev,
                      players: prev?.players?.map((player) =>
                        player.seatId === seatId
                          ? { ...player, cardCount: player.cardCount + 1 }
                          : player,
                      ),
                      // heroの場合のみ、そのイテレーションのカードをmyCardsに追加
                      ...(kind === "hero" && index !== undefined
                        ? {
                            myCards: [
                              ...(prev.myCards ?? []),
                              updatedGameState.myCards[index],
                            ],
                          }
                        : {}),
                    }) as GameState,
                );
              });

              await sleep(100);
            }

            setGameState(
              (prev) =>
                ({
                  ...prev,
                  deckSize: updatedGameState.deckSize + 1,
                }) as GameState,
            );

            await sleep(1500);

            discardSE();
            setGameState(updatedGameState);
            setOpponentDrawCards([]);
          },
        )
        .exhaustive();

      setCanPointerEvent(true);
    };
  }, [
    discardSE,
    gameSE,
    gameState,
    myCardRefs,
    opponentCard,
    opponentDrawCards,
    passSE,
    playerCardRefs,
    playerFloatingTextRefs,
    socketRef,
    startSE,
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
