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

export const cardIdSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
  z.literal(10),
  z.literal(11),
  z.literal(12),
  z.literal(13),
  z.literal(14),
  z.literal(15),
  z.literal(16),
  z.literal(17),
  z.literal(18),
  z.literal(19),
  z.literal(20),
  z.literal(21),
  z.literal(22),
  z.literal(23),
  z.literal(24),
  z.literal(25),
  z.literal(26),
  z.literal(27),
  z.literal(28),
  z.literal(29),
  z.literal(30),
  z.literal(31),
  z.literal(32),
  z.literal(33),
  z.literal(34),
  z.literal(35),
  z.literal(36),
  z.literal(37),
  z.literal(38),
  z.literal(39),
  z.literal(40),
  z.literal(41),
  z.literal(42),
  z.literal(43),
  z.literal(44),
  z.literal(45),
  z.literal(46),
  z.literal(47),
  z.literal(48),
  z.literal(49),
  z.literal(50),
  z.literal(51),
  z.literal(52),
  z.literal(53),
  z.literal(54),
  z.literal(55),
  z.literal(56),
  z.literal(57),
  z.literal(58),
  z.literal(59),
  z.literal(60),
  z.literal(61),
  z.literal(62),
  z.literal(63),
  z.literal(64),
  z.literal(65),
  z.literal(66),
  z.literal(67),
  z.literal(68),
  z.literal(69),
  z.literal(70),
  z.literal(71),
  z.literal(72),
  z.literal(73),
  z.literal(74),
  z.literal(75),
  z.literal(76),
  z.literal(77),
  z.literal(78),
  z.literal(79),
  z.literal(80),
  z.literal(81),
  z.literal(82),
  z.literal(83),
  z.literal(84),
  z.literal(85),
  z.literal(86),
  z.literal(87),
  z.literal(88),
  z.literal(89),
  z.literal(90),
  z.literal(91),
  z.literal(92),
  z.literal(93),
  z.literal(94),
  z.literal(95),
  z.literal(96),
  z.literal(97),
  z.literal(98),
  z.literal(99),
  z.literal(100),
  z.literal(101),
  z.literal(102),
  z.literal(103),
  z.literal(104),
  z.literal(105),
  z.literal(106),
  z.literal(107),
  z.literal(108),
  z.literal(109),
  z.literal(110),
  z.literal(111),
  z.literal(112),
]);

export type CardId = z.infer<typeof cardIdSchema>;

export const numberCardSchema = z.object({
  id: cardIdSchema,
  kind: z.literal("NumberCard"),
  color: cardColorSchema,
  number: cardNumberSchema,
});

export type NumberCard = z.infer<typeof numberCardSchema>;

export const forceWildCardSchema = z.object({
  id: cardIdSchema,
  kind: z.literal("ForceWildCard"),
  selectColor: cardColorSchema,
});

export type ForceWildCard = z.infer<typeof forceWildCardSchema>;

export const reverseCardSchema = z.object({
  id: cardIdSchema,
  kind: z.literal("ReverseCard"),
  color: cardColorSchema,
});

export type ReverseCard = z.infer<typeof reverseCardSchema>;

export const skipCardSchema = z.object({
  id: cardIdSchema,
  kind: z.literal("SkipCard"),
  color: cardColorSchema,
});

export type SkipCard = z.infer<typeof skipCardSchema>;

export const drawTwoCardSchema = z.object({
  id: cardIdSchema,
  kind: z.literal("DrawTwoCard"),
  color: cardColorSchema,
});

export type DrawTwoCard = z.infer<typeof drawTwoCardSchema>;

export const wildCardSchema = z.object({
  id: cardIdSchema,
  kind: z.literal("WildCard"),
});

export type WildCard = z.infer<typeof wildCardSchema>;

export const drawFourCardSchema = z.object({
  id: cardIdSchema,
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
