"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
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
          Recieved <span className="capitalize text-primary">{item}</span>
        </div>
        <div>
          From <span className="text-primary">{giver}</span>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {dayjs(createdAt).format("MMM D, h:mm A")}
      </div>
    </div>
  );
};
export default function LatestRecievedItem() {
  const router = useRouter();
  const { data, isPending } = api.npcTransaction.latest.useQuery();
  if (isPending) return <Skeleton className="h-8 w-full rounded-md" />;
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border bg-card p-2">
      <div className="flex w-full items-center justify-between">
        <div>Recent transactions:</div>
        <Button variant={"link"} onClick={() => router.push("/inventory")}>
          npc&apos;s Inventory 📦
        </Button>
      </div>
      {data?.map(({ itemName, giver, createdAt }, index) => (
        <div key={index}>
          <TransactionCard
            item={itemName}
            giver={giver}
            createdAt={createdAt}
          />
          {index < data.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
}
