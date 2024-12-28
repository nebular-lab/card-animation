import { WebSocketHandlerConnection } from "msw";

import { SocketEvent } from "@/common/type/socketEvent";

export const wsSend = async (
  connection: WebSocketHandlerConnection,
  event: SocketEvent,
) => {
  connection.client.send(JSON.stringify(event));
};
