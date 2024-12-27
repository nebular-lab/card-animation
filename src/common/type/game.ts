import { z } from "zod";

import {
  cardSchema,
  drawFourCardSchema,
  drawTwoCardSchema,
  forceWildCardSchema,
  numberCardSchema,
  reverseCardSchema,
  skipCardSchema,
  wildCardSchema,
} from "./card";
import { playerSchema } from "./player";
import { seatIdSchema } from "./seat";

export const playerCardSchema = z.union([
  numberCardSchema.extend({
    canDiscard: z.boolean(),
  }),
  forceWildCardSchema.extend({
    canDiscard: z.boolean(),
  }),
  reverseCardSchema.extend({
    canDiscard: z.boolean(),
  }),
  skipCardSchema.extend({
    canDiscard: z.boolean(),
  }),
  drawTwoCardSchema.extend({
    canDiscard: z.boolean(),
  }),
  wildCardSchema.extend({
    canDiscard: z.boolean(),
  }),
  drawFourCardSchema.extend({
    canDiscard: z.boolean(),
  }),
]);

export type PlayerCard = z.infer<typeof playerCardSchema>;

export const inGameStateSchema = z.object({
  kind: z.literal("in-game"),
  players: z.array(playerSchema),
  deckCount: z.number(),
  topCard: cardSchema,
  isClockwise: z.boolean(),
  currentSeatId: seatIdSchema,

  mySeatId: seatIdSchema,
  myCards: z.array(playerCardSchema),
});

export type inGameState = z.infer<typeof inGameStateSchema>;

export const notStartedGameStateSchema = z.object({
  kind: z.literal("not-started"),
  players: z.array(playerSchema),
  deckCount: z.undefined(),
  topCard: z.undefined(),
  isClockwise: z.undefined(),
  currentSeatId: z.undefined(),

  mySeatId: seatIdSchema,
  myCards: z.undefined(),
});

export type notStartedGameState = z.infer<typeof notStartedGameStateSchema>;

export const gameStateSchema = z.union([
  inGameStateSchema,
  notStartedGameStateSchema,
]);

export type GameState = z.infer<typeof gameStateSchema>;
