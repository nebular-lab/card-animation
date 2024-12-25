import { DiscardAction, DrawAction, PassAction } from "@/common/type/action";

export const discardCard = (
  discardAction: DiscardAction,
  webSocket: WebSocket | null,
) => {
  if (!webSocket) {
    console.error("socket is not connected");
    return;
  }
  webSocket.send(
    JSON.stringify({
      action: discardAction,
    }),
  );
};

export const drawCard = (drawAction: DrawAction) => {
  // socketClient.emit("drawCard", drawAction);
};
export const pass = (passAction: PassAction) => {
  // socketClient.emit("pass", passAction);
};
