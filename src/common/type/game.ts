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
  drawStack: z.number(),

  mySeatId: seatIdSchema,
  myCards: z.array(playerCardSchema),
  canDraw: z.boolean(),
  canPass: z.boolean(),
  canGameStart: z.undefined(),
});

export type InGameState = z.infer<typeof inGameStateSchema>;

export const notStartedGameStateSchema = z.object({
  kind: z.literal("not-started"),
  players: z.array(playerSchema),
  deckSize: z.number(),
  topCard: z.undefined(),
  isClockwise: z.undefined(),
  currentSeatId: z.undefined(),
  drawStack: z.undefined(),

  mySeatId: seatIdSchema,
  myCards: z.array(playerCardSchema),
  canDraw: z.undefined(),
  canPass: z.undefined(),
  canGameStart: z.boolean(),
});

export type NotStartedGameState = z.infer<typeof notStartedGameStateSchema>;

export const NotInitializedGameState = z.object({
  kind: z.literal("not-initialized"),
  players: z.undefined(),
  deckSize: z.undefined(),
  topCard: z.undefined(),
  isClockwise: z.undefined(),
  currentSeatId: z.undefined(),
  drawStack: z.undefined(),

  mySeatId: z.undefined(),
  myCards: z.array(playerCardSchema),
  canDraw: z.undefined(),
  canPass: z.undefined(),
  canGameStart: z.undefined(),
});

export type NotInitializedGameState = z.infer<typeof NotInitializedGameState>;

export const gameStateSchema = z.union([
  inGameStateSchema,
  notStartedGameStateSchema,
  NotInitializedGameState,
]);

export type GameState = z.infer<typeof gameStateSchema>;
