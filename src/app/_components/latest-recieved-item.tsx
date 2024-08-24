"use client";

import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const TransactionCard = ({
  item,
  giver,
  createdAt,
}: {
  item: string;
  giver: string;
  createdAt: Date;
}) => {
  return (
    <div className="flex w-full flex-row items-center justify-between gap-2">
      <div>
        <div>
          Recieved <span className="text-primary">{item}x1</span>
        </div>
        <div>
          from <span className="text-primary">{giver}</span>
        </div>
      </div>
      <div>{dayjs(createdAt).format("MMMM D, YYYY h:mm A")}</div>
    </div>
  );
};
export default function LatestRecievedItem() {
  const { data, isPending } = api.npcTransaction.latest.useQuery();
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border bg-card p-2">
      <div className="flex w-full items-center justify-between">
        <div>Recent transactions:</div>
        <Button variant={"link"}>npc&apos;s Inventory 📦</Button>
      </div>
      {data?.map(({ item, giver, createdAt }, index) => (
        <TransactionCard
          item={item}
          giver={giver}
          createdAt={createdAt}
          key={index}
        />
      ))}
    </div>
  );
}
