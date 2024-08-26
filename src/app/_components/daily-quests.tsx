"use client";

import { Card, CardDescription, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function DailyQuests() {
  const { data, isPending } = api.quests.daily.useQuery();
  if (isPending) return <Skeleton className="h-8 w-full rounded-md" />;
  return (
    <>
      <div className="w-full rounded-lg border bg-emerald-600 p-2 text-center font-semibold text-muted dark:bg-emerald-300">
        🔍 Daily quests
      </div>

      {data?.map((quest, index) => (
        <Card className="w-full" key={index}>
          <CardHeader>
            <h3 className="flex items-center gap-4 text-xl font-bold">
              <div className="animate-bounce">⭐</div> {quest.title}
            </h3>
            <CardDescription>
              <div className="dark:text-white">
                <b>Details:</b> {quest.description}
              </div>
              <div className="text-emerald-500">
                <b>Quest reward: {quest.reward} 🏆</b>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </>
  );
}
