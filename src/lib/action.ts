import { Action } from "@/common/type/action";

export const action = (action: Action, webSocket: WebSocket | null) => {
  if (!webSocket) {
    console.error("socket is not connected");
    return;
  }
  webSocket.send(
    JSON.stringify({
      action,
    }),
  );
};
