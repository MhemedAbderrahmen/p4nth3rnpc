"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function TotalItems() {
  const router = useRouter();
  const { data, isPending } = api.inventory.get.useQuery({
    username: "p4nth3rquestbot",
  });
  if (isPending) return <Skeleton className="h-8 w-full rounded-md" />;
  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div className="w-full rounded-lg border bg-emerald-600 p-2 text-center font-semibold text-muted dark:bg-emerald-300">
        p4nth3rquestbot&apos;s Inventory{" "}
      </div>
      <Card
        className="flex w-full cursor-pointer flex-row items-center justify-center gap-4 p-2 transition-all hover:shadow-lg"
        onClick={() => router.push("/inventory")}
      >
        <div className="rounded-full border-2 border-primary bg-secondary p-2">
          <Image
            src="/images/icons/backpack.png"
            alt="potato"
            width={42}
            height={42}
          />
        </div>
        <div>
          <div className="text-lg font-bold capitalize text-primary">
            Inventory Items ({data?.inventoryItems.length})
          </div>
          <div className="font-semibold capitalize text-emerald-400">
            {data?.location}
          </div>
          <div>@p4nth3rquestbot</div>
        </div>
      </Card>
    </div>
  );
}
