"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const TransactionCard = ({ item, giver }: { item: string; giver: string }) => {
  return (
    <div className="flex w-full flex-row items-center gap-2">
      🎒 <span className="text-primary">p4nth3rquestbot</span> has recieved{" "}
      <span className="text-primary">{item}</span>
      x1 from <span className="text-primary">{giver}</span>
    </div>
  );
};
export default function LatestRecievedItem() {
  const { data, isPending } = api.npcTransaction.latest.useQuery();
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border bg-card p-2">
      <div className="flex w-full items-center justify-between">
        <div>Recent NPC Transactions:</div>
        <Button variant={"link"}>p4nth3r.npc&apos;s Inventory 📦</Button>
      </div>
      {data?.map(({ item, giver }, index) => (
        <TransactionCard item={item} giver={giver} key={index} />
      ))}
    </div>
  );
}
