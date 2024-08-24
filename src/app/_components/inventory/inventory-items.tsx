"use client";

import { BugIcon } from "lucide-react";
import { api } from "~/trpc/react";

export default function InventoryItems() {
  const { data, isPending } = api.inventory.get.useQuery({
    username: "p4nth3rquestbot",
  });
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="grid w-full grid-cols-3 gap-2 capitalize">
      {data?.inventoryItems.map((inventoryItem, index) => (
        <div
          key={index}
          className="col-span-1 flex h-40 flex-col items-center justify-center rounded-md bg-card p-4 text-center"
        >
          <div>
            <BugIcon />
          </div>
          <div>{inventoryItem.name}</div>
          <div>Rarity {inventoryItem.rarity}</div>
        </div>
      ))}
    </div>
  );
}
