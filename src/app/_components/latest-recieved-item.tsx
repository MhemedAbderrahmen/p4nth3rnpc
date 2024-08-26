"use client";

import Image from "next/image";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

const TransactionCard = ({
  itemName,
  itemRarity,
  giver,
  createdAt,
}: {
  itemName: string;
  itemRarity: number;
  giver: string;
  createdAt: Date;
}) => {
  return (
    <Card className="flex w-full flex-row items-center justify-center gap-4 p-2">
      <div className="rounded-full border-2 border-primary bg-secondary p-2">
        <Image
          src="/images/icons/package.png"
          alt="potato"
          width={42}
          height={42}
        />
      </div>
      <div>
        <div className="text-lg font-bold capitalize text-primary">
          {itemName}
        </div>
        <div className="font-semibold capitalize text-emerald-500">
          Rarity: {itemRarity}
        </div>
        <div>@{giver}</div>
      </div>
    </Card>
  );
};
export default function LatestRecievedItem() {
  const { data, isPending } = api.npcTransaction.latest.useQuery();
  if (isPending) return <Skeleton className="h-8 w-full rounded-md" />;
  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div className="w-full rounded-lg border bg-emerald-600 p-2 text-center font-semibold text-muted dark:bg-emerald-300">
        Latest Item
      </div>
      {data?.map(({ itemName, itemRarity, giver, createdAt }, index) => (
        <TransactionCard
          itemName={itemName}
          itemRarity={itemRarity}
          giver={giver}
          createdAt={createdAt}
          key={index}
        />
      ))}
    </div>
  );
}
