import { cardRelation } from "@/common/const";
import { Card, PlayerCard } from "@/common/type/card";
import { InGameState, NotStartedGameState } from "@/common/type/game";
import { Player } from "@/common/type/player";
import { shuffle } from "@/lib/utils";

const notStartedPlayers: Player[] = [
  { seatId: 1, name: "player1", cardCount: 0, id: "1" },
  { seatId: 2, name: "player2", cardCount: 0, id: "2" },
  { seatId: 3, name: "player3", cardCount: 0, id: "3" },
  { seatId: 4, name: "player4", cardCount: 0, id: "4" },
  { seatId: 5, name: "player5", cardCount: 0, id: "5" },
  { seatId: 6, name: "player6", cardCount: 0, id: "6" },
];

export const flowState1: NotStartedGameState = {
  kind: "not-started",
  players: notStartedPlayers,
  deckSize: 112,
  myCards: [],
  mySeatId: 1,
  canGameStart: true,
};

const players: Player[] = [
  { seatId: 1, name: "player1", cardCount: 7, id: "1" },
  { seatId: 2, name: "player2", cardCount: 7, id: "2" },
  { seatId: 3, name: "player3", cardCount: 7, id: "3" },
  { seatId: 4, name: "player4", cardCount: 7, id: "4" },
  { seatId: 5, name: "player5", cardCount: 7, id: "5" },
  { seatId: 6, name: "player6", cardCount: 7, id: "6" },
];

const topCard: Card = cardRelation[3];

const myCards: PlayerCard[] = [
  {
    ...cardRelation[1],
    canDiscard: true,
  },
  {
    ...cardRelation[23],
    canDiscard: false,
  },
  {
    ...cardRelation[30],
    canDiscard: false,
  },
  {
    ...cardRelation[83],
    canDiscard: false,
  },
  {
    ...cardRelation[100],
    canDiscard: false,
  },
  {
    ...cardRelation[102],
    canDiscard: false,
  },
  {
    ...cardRelation[110],
    canDiscard: false,
  },
];

export const flowState2: InGameState = {
  kind: "in-game",
  players: players,
  deckSize: 70,
  topCard,
  isClockwise: true,
  currentSeatId: 1,
  drawStack: 0,
  mySeatId: 1,
  myCards,
  canDraw: true,
  canPass: false,
  canDrawStack: false,
};

export const flowState3: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 1) {
      return {
        ...player,
        cardCount: 6,
      };
    }
    return player;
  }),
  deckSize: 70,
  topCard: cardRelation[1],
  isClockwise: true,
  currentSeatId: 2,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards.filter((card) => card.id !== 1),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const flowState4: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 1) {
      return {
        ...player,
        cardCount: 6,
      };
    }
    if (player.seatId === 2) {
      return {
        ...player,
        cardCount: 6,
      };
    }
    return player;
  }),
  deckSize: 70,
  topCard: cardRelation[81],
  isClockwise: false,
  currentSeatId: 1,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards.filter((card) => card.id !== 1),
  canDraw: true,
  canPass: false,
  canDrawStack: false,
};

export const flowState5: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 2) {
      return {
        ...player,
        cardCount: 6,
      };
    }
    return player;
  }),
  deckSize: 69,
  topCard: cardRelation[81],
  isClockwise: false,
  currentSeatId: 1,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards
    .filter((card) => card.id !== 1)
    .concat({
      ...cardRelation[10],
      canDiscard: false,
    }),
  canDraw: false,
  canPass: true,
  canDrawStack: false,
};

export const flowState6: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 2) {
      return {
        ...player,
        cardCount: 6,
      };
    }
    return player;
  }),
  deckSize: 69,
  topCard: {
    id: 1,
    kind: "SkipCard",
    color: "red",
  },
  isClockwise: false,
  currentSeatId: 6,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards
    .filter((card) => card.id !== 1)
    .concat({
      ...cardRelation[10],
      canDiscard: false,
    })
    .sort((a, b) => a.id - b.id),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const flowState7: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 2) {
      return {
        ...player,
        cardCount: 6,
      };
    }
    if (player.seatId === 6) {
      return {
        ...player,
        cardCount: 8,
      };
    }
    return player;
  }),
  deckSize: 68,
  topCard: {
    id: 1,
    kind: "SkipCard",
    color: "red",
  },
  isClockwise: false,
  currentSeatId: 6,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards
    .filter((card) => card.id !== 1)
    .concat({
      ...cardRelation[10],
      canDiscard: true,
    })
    .sort((a, b) => a.id - b.id),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};
