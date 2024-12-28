import { z } from "zod";

import { actionSchema } from "./action";
import { inGameStateSchema, notStartedGameStateSchema } from "./game";

export const actionEventSchema = z.object({
  kind: z.literal("action"),
  action: actionSchema,
  gameState: inGameStateSchema,
});

export type ActionEvent = z.infer<typeof actionEventSchema>;

export const initGameEventSchema = z.object({
  kind: z.literal("init-game"),
  gameState: notStartedGameStateSchema,
});

export const startGameSchema = z.object({
  kind: z.literal("start-game"),
  gameState: inGameStateSchema,
});

export type StartGameEvent = z.infer<typeof startGameSchema>;

export type InitGameEvent = z.infer<typeof initGameEventSchema>;

export const socketEventSchema = z.union([
  actionEventSchema,
  initGameEventSchema,
  startGameSchema,
]);

export type SocketEvent = z.infer<typeof socketEventSchema>;
