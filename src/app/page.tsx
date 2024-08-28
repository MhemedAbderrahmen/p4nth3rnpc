import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";
import { DailyQuests } from "./_components/daily-quests";
import LatestRecievedItem from "./_components/latest-recieved-item";
import TotalItems from "./_components/total-items";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <Card className="w-full text-center">
          <CardHeader className="flex flex-col gap-4">
            <h1 className="text-center text-5xl font-bold">🔍 📜 ⭐ 🏆</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <h2 className="text-2xl">
              To get started on your adventure click the button below
            </h2>
            <CardDescription className="text-center">
              This is a companion app for p4nth3r.world, a place where you can
              find quests, and get rewards!
            </CardDescription>
            <Link href={"/how-to-play"}>
              <Button variant={"secondary"} size={"sm"}>
                <InfoIcon size={16} className="mr-2" /> How to play
              </Button>
            </Link>
          </CardContent>
        </Card>
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <TotalItems />
          <LatestRecievedItem />
        </div>
        <DailyQuests />
      </main>
    </HydrateClient>
  );
}
