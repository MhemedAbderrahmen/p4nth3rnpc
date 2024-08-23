import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <Card className="w-full text-center">
          <CardHeader className="flex flex-col gap-4">
            <h1 className="text-center text-5xl font-bold">
              🎒 📦 🌍 📍 🌳 🗺️
            </h1>
            <h2 className="text-2xl font-bold">p4nth3r.npc</h2>
          </CardHeader>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardDescription className="text-center">
              This is a companion app for p4nth3r.world, a place where you can
              find quests, and trade with me
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <h2 className="text-2xl font-bold">Daily quests</h2>
            <CardDescription>
              These are the daily quests that will update every day at midnight
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">The Great Recipe Hunt</h3>
              <p>
                <b>Details:</b> Players need to collect 3 rare ingredients
                (e.g., Golden Mushroom, Mystic Herb, and Enchanted Berry) and
                cook a &quot;Mystic Stew&quot;. The quest rewards the player
                with a unique title and a special cooking utensil that boosts
                cooking speed.
              </p>
              <p>
                <b>Quest reward:</b>{" "}
                <span className="text-emerald-400">1000 coins</span>
              </p>
              <div>
                <b>Items to collect</b>
                <ul>
                  <li>🍄 x10</li>
                  <li>🍖 x5</li>
                  <li>🥕 x3</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </HydrateClient>
  );
}
