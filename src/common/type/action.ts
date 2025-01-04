import { z } from "zod";

import { cardSchema } from "./card";
import { seatIdSchema } from "./seat";

const discardActionSchema = z.object({
  kind: z.literal("discard"),
  seatId: seatIdSchema,
  card: cardSchema,
  isUNO: z.boolean(),
});

export type DiscardAction = z.infer<typeof discardActionSchema>;

const passActionSchema = z.object({
  kind: z.literal("pass"),
  seatId: seatIdSchema,
});

export type PassAction = z.infer<typeof passActionSchema>;

export const drawActionSchema = z.object({
  kind: z.literal("draw"),
  seatId: seatIdSchema,
});

export type DrawAction = z.infer<typeof drawActionSchema>;

export const drawStackActionSchema = z.object({
  kind: z.literal("draw-stack"),
  seatId: seatIdSchema,
  count: z.number(),
});

export const startActionSchema = z.object({
  kind: z.literal("start"),
});

export const actionSchema = z.union([
  discardActionSchema,
  passActionSchema,
  drawActionSchema,
  drawStackActionSchema,
  startActionSchema,
]);

export type Action = z.infer<typeof actionSchema>;
