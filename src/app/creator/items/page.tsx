import { ItemCreatorForm } from "~/components/item-creator-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function ItemsCreator() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                Add a new Item to the DB
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ItemCreatorForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </HydrateClient>
  );
}
