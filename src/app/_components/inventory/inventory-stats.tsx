"use client";

import { Backpack, MapPinned, NotebookIcon, Trophy } from "lucide-react";
import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export default function InventoryStats() {
  const { data, isPending } = api.inventory.get.useQuery({
    username: "p4nth3rquestbot",
  });
  if (isPending) return <div>Loading...</div>;
  return (
    <>
      <Card className="w-full text-center">
        <CardHeader className="flex flex-col items-center justify-center gap-4">
          <Trophy size={60} />
          <h4 className="text-xl">Wealth Index</h4>
          <h4 className="text-3xl">{data?.wealthIndex}</h4>
        </CardHeader>
      </Card>
      <div className="flex w-full flex-row gap-4">
        <Card className="w-1/3 text-center">
          <CardHeader className="flex flex-row items-center justify-start gap-4">
            <MapPinned size={40} />
            <div className="text-start">
              <h4>Location</h4>
              <h4 className="text-primary">{data?.location} Zone</h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-1/3 text-start">
          <CardHeader className="flex flex-row items-center justify-start gap-4">
            <NotebookIcon size={40} />
            <div className="text-start">
              <h4>Quests Number</h4>
              <h4 className="text-primary">{data?.totalQuests}</h4>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-1/3 text-center">
          <CardHeader className="flex flex-row items-center justify-start gap-4">
            <Backpack size={40} />
            <div className="text-start">
              <h4>Items</h4>
              <h4 className="text-primary">{data?.inventoryItems.length}</h4>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
