"use client";

import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function InventoryItems() {
  const { data, isPending } = api.inventory.get.useQuery({
    username: "p4nth3rquestbot",
  });
  if (isPending)
    return (
      <div className="flex w-full flex-col gap-4">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    );
  return (
    <div className="flex w-full flex-col gap-1 capitalize">
      {data?.inventoryItems.map(
        (
          inventoryItem: {
            id: string;
            name: string;
            type: string;
            rarity: number;
            inventoryId: string | null;
            createdAt: Date;
            updatedAt: Date;
          },
          index,
        ) => (
          <div
            key={index}
            className="col-span-1 flex flex-row items-center gap-4 rounded-md bg-card p-2"
          >
            <div className="rounded-full border-2 border-primary bg-secondary p-1">
              <Image
                src={`/images/icons/${inventoryItem.name}.png`}
                alt="potato"
                width={24}
                height={24}
              />
            </div>
            <div className="flex flex-col font-bold">
              <small className="text-primary">{inventoryItem.name}</small>
              <small className="text-emerald-500">
                Rarity {inventoryItem.rarity}
              </small>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
