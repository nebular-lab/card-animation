import { cardRelation } from "@/common/const";
import { PlayerCard } from "@/common/type/card";
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

export const heroDrawStackState1: InGameState = {
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

export const heroDrawStackState2: InGameState = {
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
