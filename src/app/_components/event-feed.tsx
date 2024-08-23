/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { toast } from "sonner";

type Event = {
  data: {
    username?: string;
    count?: number;
    rarity?: number;
    zone?: string;
    toZone?: string;
    ingredientList?: string[];
    lost?: string[];
    recipe?: string;
    item?: string;
    giver?: string;
    receiver?: string;
  };
  id: string;
  type: string;
};

const validEvents = [
  "itemspawn",
  "playerscanned",
  "playercook",
  "playercookfail",
  "move",
  "claim",
  "drop",
  "gift",
  "releaseunclaimed",
];

const EventFeed = () => {
  const { lastMessage, readyState } = useWebSocket(
    "wss://p4nth3rb0t-mainframe.herokuapp.com/",
    {
      shouldReconnect: () => true,
      reconnectInterval: 0,
    },
  );

  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  function getNotifTitle(event: Event): string {
    switch (event.type) {
      case "scanned":
        return `${event.data.username} scanned ${event.data.zone} zone and found ${event.data.count} items`;
      case "cookfail":
        return `${event.data.username} spoiled a recipe! They lost ${event.data.ingredientList?.join(", ")}!`;
      case "cook":
        return `${event.data.username} cooked ${event.data.recipe}${event.data.lost && event.data.lost?.length > 0 ? `, but lost ${event.data.lost.join(", ")}}!` : ``} (rarity: ${event.data.rarity})`;
      case "release":
        return `${event.data.count} items released in the ${event.data.zone} zone`;
      case "move":
        return `${event.data.username} moved to the ${event.data.toZone} zone`;
      case "claim":
        return `${event.data.username} claimed ${event.data.item} in the ${event.data.zone} zone (rarity:
          ${event.data.rarity})`;
      case "drop":
        return `${event.data.username} dropped ${event.data.item} in the ${event.data.zone} zone (rarity:
          ${event.data.rarity})`;
      case "gift":
        return `${event.data.giver} gifted ${event.data.item} to ${event.data.receiver} in the
          ${event.data.zone} zone (rarity: ${event.data.rarity})`;
      default:
        return "";
    }
  }

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      const messageObj: Event = JSON.parse(lastMessage.data as string);
      if (validEvents.includes(messageObj.type)) {
        if (messageObj.type === "gift") {
          // A gift recieved and check if the giver has any quests
          // If quest rquired item === item => UserQuest progression + 1
          // If progression === requiredItems length then quest = complete
          if (messageObj.data.receiver === "p4nth3rquestbot")
            toast.message(getNotifTitle(messageObj), {
              duration: 10000,
              style: {
                backgroundColor: "orange",
              },
            });
        }
      }
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
    <div className="flex flex-row items-center gap-2">
      Connection status{" "}
      {connectionStatus === "Connecting" && (
        <div className="h-2 w-2 rounded-full bg-orange-500" />
      )}
      {connectionStatus === "Open" && (
        <div className="h-2 w-2 rounded-full bg-green-500" />
      )}
      {connectionStatus === "Closed" && (
        <div className="h-2 w-2 rounded-full bg-red-500" />
      )}
      {connectionStatus === "Uninstantiated" && (
        <div className="h-2 w-2 rounded-full bg-purple-500" />
      )}
    </div>
  );
};

export default EventFeed;
