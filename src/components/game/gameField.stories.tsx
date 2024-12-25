import { Meta, StoryObj } from "@storybook/react";
import { ws } from "msw";
import { match } from "ts-pattern";
import { z } from "zod";

import { MOCK_SERVER_URL } from "@/common/const";
import { actionSchema } from "@/common/type/action";
import { GameState } from "@/common/type/game";
import { initialState } from "@/hooks/useGame";

import { GameField } from "./gameField";

const receivedActionSchema = z.object({
  action: actionSchema,
});

const updatedGameState: GameState = {
  ...initialState,
  currentSeatId: 2,
  players: [
    {
      id: "1",
      name: "Alice",
      seatId: 1,
      cardCount: 3,
    },
    {
      id: "2",
      name: "Bob",
      seatId: 2,
      cardCount: 7,
    },
    {
      id: "3",
      name: "Charlie",
      seatId: 3,
      cardCount: 7,
    },
    {
      id: "4",
      name: "David",
      seatId: 4,
      cardCount: 7,
    },
    {
      id: "5",
      name: "Eve",
      seatId: 5,
      cardCount: 7,
    },
    {
      id: "6",
      name: "Fiona",
      seatId: 6,
      cardCount: 7,
    },
  ],
  topCard: {
    kind: "NumberCard",
    color: "red",
    number: 5,
    id: 1,
  },
  myCards: [
    {
      kind: "ReverseCard",
      color: "green",
      id: 2,
      canDiscard: false,
    },
    {
      kind: "SkipCard",
      color: "blue",
      id: 3,
      canDiscard: false,
    },
    {
      kind: "DrawTwoCard",
      color: "yellow",
      id: 4,
      canDiscard: false,
    },
  ],
};

const server = ws.link(MOCK_SERVER_URL);

const meta = {
  component: GameField,
} satisfies Meta<typeof GameField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DiscardCard: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", (connection) => {
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "discard" } }, ({ action }) => {
                connection.client.send(
                  JSON.stringify({
                    action: action,
                    gameState: updatedGameState,
                  }),
                );
              })
              .otherwise(() => {
                console.error("unexpected action");
                return;
              });
          });
        }),
      ],
    },
  },
};
