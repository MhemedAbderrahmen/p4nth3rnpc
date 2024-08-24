"use client";

import { api } from "~/trpc/react";

const TransactionCard = ({ item, giver }: { item: string; giver: string }) => {
  return (
    <div className="flex w-full flex-row gap-2 rounded-md border bg-card p-2">
      Recieved 🎆 {item} from {giver}
    </div>
  );
};
export default function LatestRecievedItem() {
  const { data, isPending } = api.npcTransaction.latest.useQuery();
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col gap-2">
      {data?.map(({ item, giver }, index) => (
        <TransactionCard item={item} giver={giver} key={index} />
      ))}
    </div>
  );
}
