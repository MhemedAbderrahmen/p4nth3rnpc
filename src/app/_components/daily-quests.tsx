"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import AcceptQuestConfirm from "~/components/accept-quest-modal";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export function DailyQuests() {
  const { status, data: sessionData } = useSession();
  const me = api.user.get.useQuery(sessionData?.user?.name ?? "");
  const { data, isPending } = api.quests.daily.useQuery();

  function canAcceptQuest(questId: string) {
    if (status === "unauthenticated") return false;
    return !me.data?.userQuests
      ?.map((quest) => quest.questId)
      .includes(questId);
  }
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
          <CardContent className="flex flex-col gap-2">
            <div className="dark:text-white">
              <b>Details:</b> {quest.description}
            </div>
            <div className="flex flex-col gap-2 dark:text-white">
              <b>Required Items:</b>
              {quest.requiredItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="rounded-full border-2 border-primary bg-secondary p-1">
                    <Image
                      src={`/images/icons/${item.name}.png`}
                      alt="potato"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="capitalize text-primary">{item.name}</div>
                </div>
              ))}
            </div>
            <div className="font-bold">
              Quest reward:{" "}
              <span className="text-emerald-500">{quest.reward} 🏆</span>
            </div>
            {canAcceptQuest(quest.id) ? (
              <div className="flex w-full justify-end">
                <AcceptQuestConfirm quest={quest} connectedUser={sessionData} />
              </div>
            ) : null}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
