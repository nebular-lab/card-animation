import { cardRelation } from "@/common/const";
import { Card, PlayerCard } from "@/common/type/card";
import {
  InGameState,
  NotInitializedGameState,
  NotStartedGameState,
} from "@/common/type/game";
import { Player } from "@/common/type/player";

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
    canDiscard: true,
  },
  {
    ...cardRelation[30],
    canDiscard: false,
  },
  {
    ...cardRelation[83],
    canDiscard: true,
  },
  {
    ...cardRelation[100],
    canDiscard: true,
  },
  {
    ...cardRelation[102],
    canDiscard: true,
  },
  {
    ...cardRelation[110],
    canDiscard: true,
  },
];

export const initialGameState: InGameState = {
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

export const updatedGameState: InGameState = {
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

export const updatedGameState2: InGameState = {
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

export const updatedGameState3: InGameState = {
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
      canDiscard: true,
    }),
  canDraw: false,
  canPass: true,
  canDrawStack: false,
};

export const updatedGameState4: InGameState = {
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
      canDiscard: true,
    })
    .sort((a, b) => a.id - b.id),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const updatedGameState5: InGameState = {
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
      canDiscard: true,
    })
    .sort((a, b) => a.id - b.id),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const updatedGameState6: InGameState = {
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
  deckSize: 69,
  topCard: {
    id: 1,
    kind: "SkipCard",
    color: "red",
  },
  isClockwise: false,
  currentSeatId: 5,
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

export const updatedGameState7: InGameState = {
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
  topCard: cardRelation[23],
  isClockwise: true,
  currentSeatId: 2,
  drawStack: 2,
  mySeatId: 1,
  myCards: myCards.filter((card) => card.id !== 23),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const updatedGameState8: InGameState = {
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
        cardCount: 9,
      };
    }
    return player;
  }),
  deckSize: 68,
  topCard: cardRelation[83],
  isClockwise: true,
  currentSeatId: 3,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards.filter((card) => card.id !== 83),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

const notStartedPlayers: Player[] = [
  { seatId: 1, name: "player1", cardCount: 0, id: "1" },
  { seatId: 2, name: "player2", cardCount: 0, id: "2" },
  { seatId: 3, name: "player3", cardCount: 0, id: "3" },
  { seatId: 4, name: "player4", cardCount: 0, id: "4" },
  { seatId: 5, name: "player5", cardCount: 0, id: "5" },
  { seatId: 6, name: "player6", cardCount: 0, id: "6" },
];

export const notStartedGameState: NotStartedGameState = {
  kind: "not-started",
  players: notStartedPlayers,
  deckSize: 112,
  myCards: [],
  mySeatId: 1,
  canGameStart: true,
};

export const notInitializedGameState: NotInitializedGameState = {
  kind: "not-initialized",
  myCards: [],
};

export const gameState9: InGameState = {
  kind: "in-game",
  players: players,
  deckSize: 70,
  topCard: cardRelation[73],
  isClockwise: true,
  currentSeatId: 1,
  drawStack: 2,
  mySeatId: 1,
  myCards: myCards,
  canDraw: false,
  canPass: false,
  canDrawStack: true,
};

export const gameState10: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 1) {
      return {
        ...player,
        cardCount: 9,
      };
    } else {
      return player;
    }
  }),
  deckSize: 68,
  topCard: cardRelation[73],
  isClockwise: true,
  currentSeatId: 2,
  drawStack: 0,
  mySeatId: 1,
  myCards: myCards
    .concat({
      ...cardRelation[109],
      canDiscard: true,
    })
    .concat({
      ...cardRelation[3],
      canDiscard: true,
    })
    .sort((a, b) => a.id - b.id),
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};
