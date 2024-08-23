/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Footer = () => {
  const { lastMessage, readyState } = useWebSocket(
    "wss://p4nth3rb0t-mainframe.herokuapp.com/",
    {
      shouldReconnect: () => true,
      reconnectInterval: 0,
    },
  );

  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      Status: {connectionStatus}
      {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul> */}
    </div>
  );
};

export default Footer;
