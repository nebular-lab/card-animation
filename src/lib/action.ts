import { Dispatch, SetStateAction } from "react";

import { Action } from "@/common/type/action";

type Input = {
  action: Action;
  webSocket: WebSocket | null;
  setCanPointerEvent: Dispatch<SetStateAction<boolean>>;
};

export const action = ({ action, webSocket, setCanPointerEvent }: Input) => {
  if (!webSocket) {
    console.error("socket is not connected");
    return;
  }
  setCanPointerEvent(false);
  webSocket.send(
    JSON.stringify({
      action,
    }),
  );
};
