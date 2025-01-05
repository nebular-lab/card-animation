import { match } from "ts-pattern";

import { Card, CardId } from "./type/card";
import { SeatId } from "./type/seat";

export const MOCK_SERVER_URL = "ws://mock.server.com";

export const seatIds: SeatId[] = [1, 2, 3, 4, 5, 6];

export const cards: Card[] = [
  // NumberCards Red
  { id: 1, kind: "NumberCard", color: "red", number: 0 },
  { id: 2, kind: "NumberCard", color: "red", number: 1 },
  { id: 3, kind: "NumberCard", color: "red", number: 1 },
  { id: 4, kind: "NumberCard", color: "red", number: 2 },
  { id: 5, kind: "NumberCard", color: "red", number: 2 },
  { id: 6, kind: "NumberCard", color: "red", number: 3 },
  { id: 7, kind: "NumberCard", color: "red", number: 3 },
  { id: 8, kind: "NumberCard", color: "red", number: 4 },
  { id: 9, kind: "NumberCard", color: "red", number: 4 },
  { id: 10, kind: "NumberCard", color: "red", number: 5 },
  { id: 11, kind: "NumberCard", color: "red", number: 5 },
  { id: 12, kind: "NumberCard", color: "red", number: 6 },
  { id: 13, kind: "NumberCard", color: "red", number: 6 },
  { id: 14, kind: "NumberCard", color: "red", number: 7 },
  { id: 15, kind: "NumberCard", color: "red", number: 7 },
  { id: 16, kind: "NumberCard", color: "red", number: 8 },
  { id: 17, kind: "NumberCard", color: "red", number: 8 },
  { id: 18, kind: "NumberCard", color: "red", number: 9 },
  { id: 19, kind: "NumberCard", color: "red", number: 9 },

  // Action Cards Red
  { id: 20, kind: "ReverseCard", color: "red" },
  { id: 21, kind: "ReverseCard", color: "red" },
  { id: 22, kind: "DrawTwoCard", color: "red" },
  { id: 23, kind: "DrawTwoCard", color: "red" },
  { id: 24, kind: "SkipCard", color: "red" },
  { id: 25, kind: "SkipCard", color: "red" },

  // NumberCards Blue
  { id: 26, kind: "NumberCard", color: "blue", number: 0 },
  { id: 27, kind: "NumberCard", color: "blue", number: 1 },
  { id: 28, kind: "NumberCard", color: "blue", number: 1 },
  { id: 29, kind: "NumberCard", color: "blue", number: 2 },
  { id: 30, kind: "NumberCard", color: "blue", number: 2 },
  { id: 31, kind: "NumberCard", color: "blue", number: 3 },
  { id: 32, kind: "NumberCard", color: "blue", number: 3 },
  { id: 33, kind: "NumberCard", color: "blue", number: 4 },
  { id: 34, kind: "NumberCard", color: "blue", number: 4 },
  { id: 35, kind: "NumberCard", color: "blue", number: 5 },
  { id: 36, kind: "NumberCard", color: "blue", number: 5 },
  { id: 37, kind: "NumberCard", color: "blue", number: 6 },
  { id: 38, kind: "NumberCard", color: "blue", number: 6 },
  { id: 39, kind: "NumberCard", color: "blue", number: 7 },
  { id: 40, kind: "NumberCard", color: "blue", number: 7 },
  { id: 41, kind: "NumberCard", color: "blue", number: 8 },
  { id: 42, kind: "NumberCard", color: "blue", number: 8 },
  { id: 43, kind: "NumberCard", color: "blue", number: 9 },
  { id: 44, kind: "NumberCard", color: "blue", number: 9 },

  // Action Cards Blue
  { id: 45, kind: "ReverseCard", color: "blue" },
  { id: 46, kind: "ReverseCard", color: "blue" },
  { id: 47, kind: "DrawTwoCard", color: "blue" },
  { id: 48, kind: "DrawTwoCard", color: "blue" },
  { id: 49, kind: "SkipCard", color: "blue" },
  { id: 50, kind: "SkipCard", color: "blue" },

  // NumberCards Green
  { id: 51, kind: "NumberCard", color: "green", number: 0 },
  { id: 52, kind: "NumberCard", color: "green", number: 1 },
  { id: 53, kind: "NumberCard", color: "green", number: 1 },
  { id: 54, kind: "NumberCard", color: "green", number: 2 },
  { id: 55, kind: "NumberCard", color: "green", number: 2 },
  { id: 56, kind: "NumberCard", color: "green", number: 3 },
  { id: 57, kind: "NumberCard", color: "green", number: 3 },
  { id: 58, kind: "NumberCard", color: "green", number: 4 },
  { id: 59, kind: "NumberCard", color: "green", number: 4 },
  { id: 60, kind: "NumberCard", color: "green", number: 5 },
  { id: 61, kind: "NumberCard", color: "green", number: 5 },
  { id: 62, kind: "NumberCard", color: "green", number: 6 },
  { id: 63, kind: "NumberCard", color: "green", number: 6 },
  { id: 64, kind: "NumberCard", color: "green", number: 7 },
  { id: 65, kind: "NumberCard", color: "green", number: 7 },
  { id: 66, kind: "NumberCard", color: "green", number: 8 },
  { id: 67, kind: "NumberCard", color: "green", number: 8 },
  { id: 68, kind: "NumberCard", color: "green", number: 9 },
  { id: 69, kind: "NumberCard", color: "green", number: 9 },

  // Action Cards Green
  { id: 70, kind: "ReverseCard", color: "green" },
  { id: 71, kind: "ReverseCard", color: "green" },
  { id: 72, kind: "DrawTwoCard", color: "green" },
  { id: 73, kind: "DrawTwoCard", color: "green" },
  { id: 74, kind: "SkipCard", color: "green" },
  { id: 75, kind: "SkipCard", color: "green" },

  // NumberCards Yellow
  { id: 76, kind: "NumberCard", color: "yellow", number: 0 },
  { id: 77, kind: "NumberCard", color: "yellow", number: 1 },
  { id: 78, kind: "NumberCard", color: "yellow", number: 1 },
  { id: 79, kind: "NumberCard", color: "yellow", number: 2 },
  { id: 80, kind: "NumberCard", color: "yellow", number: 2 },
  { id: 81, kind: "NumberCard", color: "yellow", number: 3 },
  { id: 82, kind: "NumberCard", color: "yellow", number: 3 },
  { id: 83, kind: "NumberCard", color: "yellow", number: 4 },
  { id: 84, kind: "NumberCard", color: "yellow", number: 4 },
  { id: 85, kind: "NumberCard", color: "yellow", number: 5 },
  { id: 86, kind: "NumberCard", color: "yellow", number: 5 },
  { id: 87, kind: "NumberCard", color: "yellow", number: 6 },
  { id: 88, kind: "NumberCard", color: "yellow", number: 6 },
  { id: 89, kind: "NumberCard", color: "yellow", number: 7 },
  { id: 90, kind: "NumberCard", color: "yellow", number: 7 },
  { id: 91, kind: "NumberCard", color: "yellow", number: 8 },
  { id: 92, kind: "NumberCard", color: "yellow", number: 8 },
  { id: 93, kind: "NumberCard", color: "yellow", number: 9 },
  { id: 94, kind: "NumberCard", color: "yellow", number: 9 },

  // Action Cards Yellow
  { id: 95, kind: "ReverseCard", color: "yellow" },
  { id: 96, kind: "ReverseCard", color: "yellow" },
  { id: 97, kind: "DrawTwoCard", color: "yellow" },
  { id: 98, kind: "DrawTwoCard", color: "yellow" },
  { id: 99, kind: "SkipCard", color: "yellow" },
  { id: 100, kind: "SkipCard", color: "yellow" },

  // ForceWildCards
  { id: 101, kind: "ForceWildCard", selectColor: "red" },
  { id: 102, kind: "ForceWildCard", selectColor: "blue" },
  { id: 103, kind: "ForceWildCard", selectColor: "green" },
  { id: 104, kind: "ForceWildCard", selectColor: "yellow" },

  // Wild Cards
  { id: 105, kind: "WildCard" },
  { id: 106, kind: "WildCard" },
  { id: 107, kind: "WildCard" },
  { id: 108, kind: "WildCard" },

  // Wild Draw Four Cards
  { id: 109, kind: "WildDrawFourCard" },
  { id: 110, kind: "WildDrawFourCard" },
  { id: 111, kind: "WildDrawFourCard" },
  { id: 112, kind: "WildDrawFourCard" },
];

export const cardRelation: Record<CardId, Card> = cards.reduce(
  (acc, card) => {
    acc[card.id] = card;
    return acc;
  },
  {} as Record<CardId, Card>,
);

export const pointCalculator = (card: Card) => {
  return match(card)
    .with({ kind: "NumberCard" }, (v) => v.number)
    .with({ kind: "ReverseCard" }, () => 20)
    .with({ kind: "SkipCard" }, () => 20)
    .with({ kind: "DrawTwoCard" }, () => 20)
    .with({ kind: "ForceWildCard" }, () => 10)
    .with({ kind: "WildCard" }, () => 30)
    .with({ kind: "WildDrawFourCard" }, () => 50)
    .exhaustive();
};
