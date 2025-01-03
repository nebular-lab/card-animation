import { useEffect, useRef } from "react";

import { MOCK_SERVER_URL } from "@/common/const";

export const useSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket(MOCK_SERVER_URL);
    socketRef.current = webSocket;
    return () => {
      webSocket.close();
    };
  }, []);

  return {
    socketRef,
  };
};
