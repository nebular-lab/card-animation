import { Meta, StoryObj } from "@storybook/react";
import { ws } from "msw";
import { match } from "ts-pattern";
import { z } from "zod";

import { MOCK_SERVER_URL } from "@/common/const";
import { actionSchema } from "@/common/type/action";
import { sleep } from "@/lib/utils";
import { wsSend } from "@/lib/websocket";

import {
  gameState10,
  gameState9,
  initialGameState,
  notStartedGameState,
  updatedGameState,
  updatedGameState2,
  updatedGameState3,
  updatedGameState4,
  updatedGameState5,
  updatedGameState6,
  updatedGameState7,
  updatedGameState8,
} from "./const";

import { GameField } from ".";

const receivedActionSchema = z.object({
  action: actionSchema,
});

const server = ws.link(MOCK_SERVER_URL);

const meta = {
  component: GameField,
} satisfies Meta<typeof GameField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeroDiscardCard: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: initialGameState,
          });
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "discard" } }, async ({ action }) => {
                await wsSend(connection, {
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

export const EnemyDiscardCard: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: updatedGameState,
          });
          await sleep(2000);
          await wsSend(connection, {
            kind: "action",
            action: {
              kind: "discard",
              seatId: 2,
              card: {
                id: 5,
                kind: "ReverseCard",
                color: "red",
              },
            },
            gameState: updatedGameState2,
          });
        }),
      ],
    },
  },
};

export const HeroDraw: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: updatedGameState2,
          });
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "draw" } }, async ({ action }) => {
                await wsSend(connection, {
                  kind: "action",
                  action: action,
                  gameState: updatedGameState3,
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

export const EnemyDraw: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: updatedGameState4,
          });

          await sleep(2000);
          await wsSend(connection, {
            kind: "action",
            action: {
              kind: "draw",
              seatId: 6,
            },
            gameState: updatedGameState5,
          });
        }),
      ],
    },
  },
};

export const HeroPass: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: updatedGameState3,
          });
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "pass" } }, async ({ action }) => {
                await wsSend(connection, {
                  kind: "action",
                  action: action,
                  gameState: updatedGameState4,
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

export const EnemyPass: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: updatedGameState5,
          });

          await sleep(2000);
          await wsSend(connection, {
            kind: "action",
            action: {
              kind: "pass",
              seatId: 6,
            },
            gameState: updatedGameState6,
          });
        }),
      ],
    },
  },
};

export const HeroDrawStack: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: gameState9,
          });
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "draw-stack" } }, async ({ action }) => {
                await wsSend(connection, {
                  kind: "action",
                  action: action,
                  gameState: gameState10,
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

export const EnemyDrawStack: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: initialGameState,
          });
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "discard" } }, async ({ action }) => {
                await wsSend(connection, {
                  kind: "action",
                  action: action,
                  gameState: updatedGameState7,
                });

                await sleep(4000);

                await wsSend(connection, {
                  kind: "action",
                  action: {
                    kind: "draw-stack",
                    seatId: 2,
                    count: 2,
                  },
                  gameState: updatedGameState8,
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

export const StartGame: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            gameState: notStartedGameState,
          });
          connection.client.addEventListener("message", (event) => {
            const parsedData = receivedActionSchema.safeParse(
              JSON.parse(event.data.toString()),
            );
            if (!parsedData.success) {
              console.error(parsedData.error);
              return;
            }
            match(parsedData.data)
              .with({ action: { kind: "start" } }, async ({ action }) => {
                await wsSend(connection, {
                  kind: "action",
                  action: action,
                  gameState: initialGameState,
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
