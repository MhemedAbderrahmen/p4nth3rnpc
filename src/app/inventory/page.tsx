import { HydrateClient } from "~/trpc/server";
import InventoryItems from "../_components/inventory/inventory-items";
import InventoryStats from "../_components/inventory/inventory-stats";

export default function Inventory() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <div className="w-full">
          <h1 className="text-3xl">Inventory</h1>
          <div className="text-muted-foreground">
            You can request trades for certain items from this list!
          </div>
        </div>

        <InventoryStats />
        <InventoryItems />
      </main>
    </HydrateClient>
  );
}
