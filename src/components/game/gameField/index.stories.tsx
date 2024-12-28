import { Meta, StoryObj } from "@storybook/react";
import { ws } from "msw";
import { match } from "ts-pattern";
import { z } from "zod";

import { MOCK_SERVER_URL } from "@/common/const";
import { actionSchema } from "@/common/type/action";
import { StartGameEvent } from "@/common/type/socketEvent";
import { wsSend } from "@/lib/websocket";

import { initialGameState, updatedGameState } from "./const";

import { GameField } from ".";

const receivedActionSchema = z.object({
  action: actionSchema,
});

const startGameEvent: StartGameEvent = {
  kind: "start-game",
  gameState: initialGameState,
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
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, startGameEvent);
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
                wsSend(connection, {
                  kind: "action",
                  action: action,
                  gameState: updatedGameState,
                });
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

