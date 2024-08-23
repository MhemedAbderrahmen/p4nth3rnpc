import Link from "next/link";
import { InitialisationModal } from "~/components/initialisation-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function HowToPlay() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center gap-4">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                How to Play P4nth3rNPC
              </CardTitle>
              <CardDescription className="text-center">
                Master the game with these simple steps and embark on your epic
                quest!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold">
                    Step 1: Join the Quest App
                  </h4>
                  <p>
                    To start your adventure, you have to join the companion app
                    by filling in your P4nth3r.World username
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">
                    Step 2: Collect Items
                  </h4>
                  <p>
                    Explore different zones to collect the necessary items. Each
                    item is crucial for completing your quest, so keep an eye
                    out! Checkout{" "}
                    <Link
                      href={"https://p4nth3r.world"}
                      className="text-emerald-500 underline"
                    >
                      P4nth3r.World
                    </Link>
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">
                    Step 3: Complete the Quest
                  </h4>
                  <p>
                    Once you&apos;ve gathered all the items, gift them to{" "}
                    <span className="text-emerald-500 underline">
                      p4nth3rquestbot
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">
                    Step 4: Collect your reward{" "}
                  </h4>
                  <p>
                    Completing quests will earn you gems 💎. You will use these
                    gold points to purchase things from the{" "}
                    <span className="text-emerald-500 underline">
                      p4nth3rquestbot
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <InitialisationModal />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </HydrateClient>
  );
}
