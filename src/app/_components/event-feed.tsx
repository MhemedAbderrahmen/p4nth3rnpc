/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { toast } from "sonner";
import { api } from "~/trpc/react";

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
  const createNpcTransaction = api.npcTransaction.create.useMutation({
    async onSuccess({ giver, item }) {
      await fillInQuest.mutateAsync({
        username: giver,
        item,
      });

      toast.success(giver + " just filled in a quest with a " + item, {
        important: true,
      });
    },
  });

  const fillInQuest = api.userQuestItems.fillInItem.useMutation();

  const { lastMessage, readyState } = useWebSocket(
    "wss://p4nth3rb0t-mainframe.herokuapp.com/",
    {
      shouldReconnect: () => true,
      reconnectInterval: 0,
    },
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const messageObj: Event = JSON.parse(lastMessage.data as string);
      if (validEvents.includes(messageObj.type)) {
        if (
          messageObj.type === "gift" &&
          messageObj.data.receiver === "p4nth3rquestbot"
        ) {
          createNpcTransaction.mutate({
            giver: messageObj.data.giver ?? "",
            item: messageObj.data.item ?? "",
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
