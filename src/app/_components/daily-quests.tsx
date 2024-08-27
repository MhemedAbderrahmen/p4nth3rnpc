"use client";

import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function DailyQuests() {
  const { status, data: sessionData } = useSession();
  const { data, isPending } = api.quests.daily.useQuery();
  if (isPending) return <Skeleton className="h-8 w-full rounded-md" />;
  return (
    <>
      <div className="w-full rounded-lg border bg-emerald-600 p-2 text-center font-semibold text-muted dark:bg-emerald-300">
        🔍 Daily quest board
      </div>
      {data?.map((quest, index) => (
        <Card className="w-full" key={index}>
          <CardHeader>
            <h3 className="flex items-center gap-4 text-xl font-bold">
              <div className="animate-bounce">⭐</div> {quest.title}
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <div className="dark:text-white">
              <b>Details:</b> {quest.description}
            </div>
            <div className="dark:text-white">
              <b>Required Items:</b>
              {quest.requiredItems.map((item, index) => (
                <div key={index} className="capitalize text-primary">
                  {item.name}
                </div>
              ))}
            </div>
            <div className="font-bold">
              Quest reward:{" "}
              <span className="text-emerald-500">{quest.reward} 🏆</span>
            </div>
            {status === "authenticated" && (
              <div className="flex w-full justify-end">
                <Button className="font-display font-bold">Accept</Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
