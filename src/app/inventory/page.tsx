import { Card, CardDescription, CardHeader } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";
import InventoryItems from "../_components/inventory/inventory-items";
import InventoryStats from "../_components/inventory/inventory-stats";

export default function Inventory() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <Card className="w-full text-center">
          <CardHeader>
            <h1 className="text-3xl">🎒Inventory</h1>
            <CardDescription>@p4nth3rquestbot</CardDescription>
          </CardHeader>
        </Card>
        <InventoryStats />
        <InventoryItems />
      </main>
    </HydrateClient>
  );
}
