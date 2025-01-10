import { cardRelation } from "@/common/const";
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

export const enemyDrawStackState1: InGameState = {
  kind: "in-game",
  players: players,
  deckSize: 70,
  topCard,
  isClockwise: true,
  currentSeatId: 1,
  drawStack: 0,
  mySeatId: 1,
  myCards,
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const enemyDrawStackState2: InGameState = {
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

export const enemyDrawStackState3: InGameState = {
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
