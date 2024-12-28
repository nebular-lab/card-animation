import { Card, PlayerCard } from "@/common/type/card";
import { InGameState } from "@/common/type/game";
import { Player } from "@/common/type/player";

const players: Player[] = [
  { seatId: 1, name: "player1", cardCount: 7, id: "1" },
  { seatId: 2, name: "player2", cardCount: 7, id: "2" },
  { seatId: 3, name: "player3", cardCount: 7, id: "3" },
  { seatId: 4, name: "player4", cardCount: 7, id: "4" },
  { seatId: 5, name: "player5", cardCount: 7, id: "5" },
  { seatId: 6, name: "player6", cardCount: 7, id: "6" },
];

const topCard: Card = {
  id: 8,
  kind: "NumberCard",
  color: "red",
  number: 8,
};

const myCards: PlayerCard[] = [
  {
    id: 1,
    kind: "NumberCard",
    color: "red",
    number: 1,
    canDiscard: true,
  },
  {
    id: 5,
    kind: "NumberCard",
    color: "blue",
    number: 2,
    canDiscard: true,
  },
  {
    id: 10,
    kind: "NumberCard",
    color: "blue",
    number: 7,
    canDiscard: true,
  },
  {
    id: 20,
    kind: "SkipCard",
    color: "green",
    canDiscard: true,
  },
  {
    id: 30,
    kind: "DrawTwoCard",
    color: "blue",
    canDiscard: true,
  },
  {
    id: 40,
    kind: "DrawTwoCard",
    color: "yellow",
    canDiscard: true,
  },
  {
    id: 50,
    kind: "WildDrawFourCard",
    canDiscard: true,
  },
];

export const initialGameState: InGameState = {
  kind: "in-game",
  players: players,
  deckSize: 112,
  topCard,
  isClockwise: true,
  currentSeatId: 1,
  mySeatId: 1,
  myCards,
  canDraw: true,
  canPass: false,
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
  deckSize: 112,
  topCard: {
    id: 1,
    kind: "NumberCard",
    color: "red",
    number: 1,
  },
  isClockwise: true,
  currentSeatId: 2,
  mySeatId: 1,
  myCards: myCards.filter((card) => card.id !== 1),
  canDraw: false,
  canPass: false,
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
  deckSize: 112,
  topCard: {
    id: 1,
    kind: "ReverseCard",
    color: "red",
  },
  isClockwise: false,
  currentSeatId: 1,
  mySeatId: 1,
  myCards: myCards.filter((card) => card.id !== 1),
  canDraw: true,
  canPass: false,
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
  deckSize: 111,
  topCard: {
    id: 1,
    kind: "SkipCard",
    color: "red",
  },
  isClockwise: false,
  currentSeatId: 1,
  mySeatId: 1,
  myCards: myCards
    .filter((card) => card.id !== 1)
    .concat({
      id: 8,
      kind: "NumberCard",
      color: "red",
      number: 8,
      canDiscard: true,
    }),
  canDraw: false,
  canPass: true,
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
  deckSize: 111,
  topCard: {
    id: 1,
    kind: "SkipCard",
    color: "red",
  },
  isClockwise: false,
  currentSeatId: 6,
  mySeatId: 1,
  myCards: myCards
    .filter((card) => card.id !== 1)
    .concat({
      id: 2,
      kind: "NumberCard",
      color: "red",
      number: 8,
      canDiscard: true,
    })
    .sort((a, b) => a.id - b.id),
  canDraw: false,
  canPass: false,
};
