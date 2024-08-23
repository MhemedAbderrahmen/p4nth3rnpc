"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

export function DailyQuests() {
  const { data, isPending } = api.quests.daily.useQuery();
  if (isPending) return <div>Loading...</div>;
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Daily quests</h2>
          <CardDescription>
            These are the daily quests that will update every day at midnight
          </CardDescription>
        </CardHeader>
      </Card>
      {data?.map((quest, index) => (
        <Card className="w-full" key={index}>
          <CardHeader>
            <h3 className="text-xl font-bold">❗{quest.title}</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p>
                <b>Details:</b> {quest.description}
              </p>
              <p className="flex w-full items-center gap-2">
                <b>Quest reward:</b>{" "}
                <span className="text-xl text-emerald-400">
                  {quest.reward} 💰
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
