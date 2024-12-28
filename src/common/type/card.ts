import { z } from "zod";

export const cardColorSchema = z.enum(["red", "yellow", "green", "blue"]);

export type CardColor = z.infer<typeof cardColorSchema>;

export const cardNumberSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
]);

export type CardNumber = z.infer<typeof cardNumberSchema>;

export const  CardIdSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),

])

export const numberCardSchema = z.object({
  id: z.number(),
  kind: z.literal("NumberCard"),
  color: cardColorSchema,
  number: cardNumberSchema,
});

export type NumberCard = z.infer<typeof numberCardSchema>;

export const forceWildCardSchema = z.object({
  id: z.number(),
  kind: z.literal("ForceWildCard"),
  selectColor: cardColorSchema,
});

export type ForceWildCard = z.infer<typeof forceWildCardSchema>;

export const reverseCardSchema = z.object({
  id: z.number(),
  kind: z.literal("ReverseCard"),
  color: cardColorSchema,
});

export type ReverseCard = z.infer<typeof reverseCardSchema>;

export const skipCardSchema = z.object({
  id: z.number(),
  kind: z.literal("SkipCard"),
  color: cardColorSchema,
});

export type SkipCard = z.infer<typeof skipCardSchema>;

export const drawTwoCardSchema = z.object({
  id: z.number(),
  kind: z.literal("DrawTwoCard"),
  color: cardColorSchema,
});

export type DrawTwoCard = z.infer<typeof drawTwoCardSchema>;

export const wildCardSchema = z.object({
  id: z.number(),
  kind: z.literal("WildCard"),
});

export type WildCard = z.infer<typeof wildCardSchema>;

export const drawFourCardSchema = z.object({
  id: z.number(),
  kind: z.literal("WildDrawFourCard"),
});

export type DrawFourCard = z.infer<typeof drawFourCardSchema>;

// UIでしか使わないので、Cardには含めない
export type HiddenCard = {
  kind: "HiddenCard";
};

export const cardSchema = z.union([
  numberCardSchema,
  forceWildCardSchema,
  reverseCardSchema,
  skipCardSchema,
  drawTwoCardSchema,
  wildCardSchema,
  drawFourCardSchema,
]);

export type Card = z.infer<typeof cardSchema>;

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

