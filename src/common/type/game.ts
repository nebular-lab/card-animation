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

export const gameStateSchema = z.object({
  kind: z.literal("in-game"),
  players: z.array(playerSchema),
  deckCount: z.number(),
  topCard: cardSchema,
  isClockwise: z.boolean(),
  currentSeatId: seatIdSchema,

  mySeatId: seatIdSchema,
  myCards: z.array(playerCardSchema),
});

export type GameState = z.infer<typeof gameStateSchema>;
