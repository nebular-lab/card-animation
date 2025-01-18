import { Meta, StoryObj } from "@storybook/react";
import { ws } from "msw";
import { match } from "ts-pattern";
import { z } from "zod";

import { cardRelation, MOCK_SERVER_URL } from "@/common/const";
import { actionSchema } from "@/common/type/action";
import { sleep } from "@/lib/utils";
import { wsSend } from "@/lib/websocket";

import { GameField } from "./gameField";
import { enemyDiscardState1, enemyDiscardState2 } from "./mock/enemyDiscard";
import { enemyDrawState1, enemyDrawState2 } from "./mock/enemyDraw";
import {
  enemyDrawStackState1,
  enemyDrawStackState2,
  enemyDrawStackState3,
} from "./mock/enemyDrawStack";
import { enemyPassState1, enemyPassState2 } from "./mock/enemyPass";
import { enemyUnoState1, enemyUnoState2 } from "./mock/enemyUno";
import { heroDiscardState1, heroDiscardState2 } from "./mock/heroDiscard";
import { heroDrawState1, heroDrawState2 } from "./mock/heroDraw";
import { heroDrawStackState1, heroDrawStackState2 } from "./mock/heroDrawStack";
import { heroPassState1, heroPassState2 } from "./mock/heroPass";
import { heroUnoGameState1, heroUnoGameState2 } from "./mock/heroUno";
import { startGameState1, startGameState2 } from "./mock/startGame";

const receivedActionSchema = z.object({
  action: actionSchema,
});

const server = ws.link(MOCK_SERVER_URL);

const meta = {
  component: GameField,
} satisfies Meta<typeof GameField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StartGame: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            updatedGameState: startGameState1,
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
                  updatedGameState: startGameState2,
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

export const HeroDiscardCard: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            updatedGameState: heroDiscardState1,
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
                  updatedGameState: heroDiscardState2,
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
            updatedGameState: enemyDiscardState1,
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
              isUNO: false,
            },
            updatedGameState: enemyDiscardState2,
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
            updatedGameState: heroDrawState1,
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
                  updatedGameState: heroDrawState2,
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
            updatedGameState: enemyDrawState1,
          });

          await sleep(2000);
          await wsSend(connection, {
            kind: "action",
            action: {
              kind: "draw",
              seatId: 6,
            },
            updatedGameState: enemyDrawState2,
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
            updatedGameState: heroPassState1,
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
                  updatedGameState: heroPassState2,
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
            updatedGameState: enemyPassState1,
          });

          await sleep(2000);
          await wsSend(connection, {
            kind: "action",
            action: {
              kind: "pass",
              seatId: 6,
            },
            updatedGameState: enemyPassState2,
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
            updatedGameState: heroDrawStackState1,
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
                  updatedGameState: heroDrawStackState2,
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
            updatedGameState: enemyDrawStackState1,
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
                  updatedGameState: enemyDrawStackState2,
                });

                await sleep(4000);

                await wsSend(connection, {
                  kind: "action",
                  action: {
                    kind: "draw-stack",
                    seatId: 2,
                    count: 2,
                  },
                  updatedGameState: enemyDrawStackState3,
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

export const HeroUno: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            updatedGameState: heroUnoGameState1,
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
                  updatedGameState: heroUnoGameState2,
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

export const EnemyUno: Story = {
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        server.addEventListener("connection", async (connection) => {
          await wsSend(connection, {
            kind: "init-game",
            updatedGameState: enemyUnoState1,
          });

          await sleep(2000);
          await wsSend(connection, {
            kind: "action",
            action: {
              kind: "discard",
              seatId: 2,
              card: {
                ...cardRelation[5],
              },
              isUNO: true,
            },
            updatedGameState: enemyUnoState2,
          });
        }),
      ],
    },
  },
};
