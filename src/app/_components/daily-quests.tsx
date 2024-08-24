"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function DailyQuests() {
  const { data, isPending } = api.quests.daily.useQuery();
  if (isPending) return <Skeleton className="h-8 w-full rounded-md" />;
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <h2 className="flex items-center gap-2 text-2xl">🔍 Daily quests</h2>
          <CardDescription>
            These are the daily quests that will update every day at midnight
          </CardDescription>
        </CardHeader>
      </Card>
      {data?.map((quest, index) => (
        <Card className="w-full" key={index}>
          <CardHeader>
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <div className="animate-bounce">⭐</div> {quest.title}
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p>
                <b>Details:</b> {quest.description}
              </p>
              <p className="flex w-full items-center gap-2">
                <b>Quest reward:</b> <span>{quest.reward} 🏆</span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
