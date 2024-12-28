import { z } from "zod";

import { cardSchema, playerCardSchema } from "./card";
import { playerSchema } from "./player";
import { seatIdSchema } from "./seat";

export const inGameStateSchema = z.object({
  kind: z.literal("in-game"),
  players: z.array(playerSchema),
  deckSize: z.number(),
  topCard: cardSchema,
  isClockwise: z.boolean(),
  currentSeatId: seatIdSchema,

  mySeatId: seatIdSchema,
  myCards: z.array(playerCardSchema),
});

export type InGameState = z.infer<typeof inGameStateSchema>;

export const notStartedGameStateSchema = z.object({
  kind: z.literal("not-started"),
  players: z.array(playerSchema),
  deckSize: z.undefined(),
  topCard: z.undefined(),
  isClockwise: z.undefined(),
  currentSeatId: z.undefined(),

  mySeatId: seatIdSchema,
  myCards: z.undefined(),
});

export type NotStartedGameState = z.infer<typeof notStartedGameStateSchema>;

export const gameStateSchema = z.union([
  inGameStateSchema,
  notStartedGameStateSchema,
]);

export type GameState = z.infer<typeof gameStateSchema>;
