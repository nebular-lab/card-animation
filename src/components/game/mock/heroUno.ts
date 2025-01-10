import { cardRelation } from "@/common/const";
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

export const heroUnoGameState1: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 1) {
      return {
        ...player,
        cardCount: 2,
      };
    } else if (player.seatId === 2) {
      return {
        ...player,
        cardCount: 2,
      };
    } else {
      return player;
    }
  }),
  deckSize: 68,
  topCard: cardRelation[1],
  isClockwise: true,
  currentSeatId: 1,
  drawStack: 0,
  mySeatId: 1,
  myCards: [
    {
      ...cardRelation[3],
      canDiscard: true,
    },
    {
      ...cardRelation[109],
      canDiscard: false,
    },
  ],
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};

export const heroUnoGameState2: InGameState = {
  kind: "in-game",
  players: players.map((player) => {
    if (player.seatId === 1) {
      return {
        ...player,
        cardCount: 1,
      };
    } else if (player.seatId === 2) {
      return {
        ...player,
        cardCount: 2,
      };
    } else {
      return player;
    }
  }),
  deckSize: 68,
  topCard: cardRelation[3],
  isClockwise: true,
  currentSeatId: 2,
  drawStack: 0,
  mySeatId: 1,
  myCards: [
    {
      ...cardRelation[109],
      canDiscard: false,
    },
  ],
  canDraw: false,
  canPass: false,
  canDrawStack: false,
};
