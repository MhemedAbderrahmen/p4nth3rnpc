"use client";

import Image from "next/image";
import { Card, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";

export default function InventoryStats() {
  const { data, isPending } = api.inventory.get.useQuery({
    username: "p4nth3rquestbot",
  });
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <Card className="w-full text-center md:w-1/3">
        <CardHeader className="flex flex-row items-center justify-start gap-4">
          <Image
            src="/images/icons/location.png"
            alt="location"
            width={42}
            height={42}
          />
          <div className="text-start">
            <h4>Location</h4>
            <h4 className="text-primary">{data?.location} Zone</h4>
          </div>
        </CardHeader>
      </Card>
      <Card className="w-full text-start md:w-1/3">
        <CardHeader className="flex flex-row items-center justify-start gap-4">
          <Image
            src="/images/icons/scroll.png"
            alt="location"
            width={42}
            height={42}
          />
          <div className="text-start">
            <h4>Quests Number</h4>
            <h4 className="text-primary">{data?.totalQuests}</h4>
          </div>
        </CardHeader>
      </Card>
      <Card className="w-full text-center md:w-1/3">
        <CardHeader className="flex flex-row items-center justify-start gap-4">
          <Image
            src="/images/icons/backpack.png"
            alt="location"
            width={42}
            height={42}
          />
          <div className="text-start">
            <h4>Items</h4>
            <h4 className="text-primary">{data?.inventoryItems.length}</h4>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
