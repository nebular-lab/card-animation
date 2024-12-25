import { z } from "zod";

import { seatIdSchema } from "./seat";

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  seatId: seatIdSchema,
  cardCount: z.number(),
});

export type Player = z.infer<typeof playerSchema>;
