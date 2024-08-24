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
                How to Start Questing?
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
                    Once you are done collecting the items you have to go to the{" "}
                    <span className="text-emerald-500 underline">
                      p4nth3rquestbot
                    </span>{" "}
                    and gift him the items he needs for the quest, you can
                    always find him on the side of the{" "}
                    <span className="bold text-emerald-500">mountains</span>
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">
                    Step 4: Collect your reward{" "}
                  </h4>
                  <p>
                    Completing quests will earn you trophies 🏆. You will use
                    these points to purchase things from the{" "}
                    <span className="text-emerald-500 underline">
                      p4nth3rquestbot
                    </span>{" "}
                    market later on.
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
