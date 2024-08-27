/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { api } from "~/trpc/react";

export function UserDetails({ params }: { params: { username: string } }) {
  const { data, isPending, isError } = api.user.get.useQuery(params.username);

  if (isPending) return <div>Loading...</div>;
  if (isError)
    return (
      <Card className="w-full">
        <CardHeader>
          <CardHeader className="text-center text-2xl">
            <h1>Uh no an error occured 😭 maybe this player does not exist?</h1>
          </CardHeader>
        </CardHeader>
      </Card>
    );
  return (
    <>
      <div className="flex w-full flex-row justify-end text-xl">
        {data?.gold}🏆
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardHeader className="text-center">
            <CardTitle>📜 {params.username}&apos;s Journal</CardTitle>
          </CardHeader>
        </CardHeader>
      </Card>
      <div>Quests In Progress</div>
      {data?.userQuests.map((userQuest, index: number) =>
        userQuest.active ? (
          <Card className="w-full" key={index}>
            <CardHeader>
              <h3 className="text-xl font-bold">⭐ {userQuest.quest.title}</h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <small className="dark:text-white">
                <b>Details:</b> {userQuest.quest.description}
              </small>
              <br />
              <small className="text-emerald-500">
                <b>Quest reward: {userQuest.quest.reward} 🏆</b>
              </small>
              <br />
              <small className="flex flex-col gap-2 capitalize text-white">
                Required Items:
                {userQuest.userQuestItems.map((item) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="rounded-full border-2 border-primary bg-secondary p-2">
                      <Image
                        src={`/images/icons/${item.name}.png`}
                        alt="potato"
                        width={18}
                        height={18}
                      />
                    </div>
                    <div>{item.name} x1</div>
                  </div>
                ))}
              </small>
            </CardContent>
          </Card>
        ) : null,
      )}
      <div>Completed Quests</div>
      {data?.userQuests.map((userQuest, index: number) =>
        !userQuest.active ? (
          <Card className="w-full" key={index}>
            <CardHeader>
              <h3 className="flex items-center gap-4 text-xl font-bold">
                ⭐ {userQuest.quest.title}
              </h3>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <small className="dark:text-white">
                <b>Details:</b> {userQuest.quest.description}
              </small>
              <br />
              <small className="text-emerald-500">
                <b>Quest reward: {userQuest.quest.reward} 🏆</b>
              </small>
              <br />
              <small className="flex flex-col gap-2 capitalize text-white">
                Delivered Items:
                {userQuest.userQuestItems.map((item) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="rounded-full border-2 border-primary bg-secondary p-2">
                      <Image
                        src={`/images/icons/${item.name}.png`}
                        alt="potato"
                        width={18}
                        height={18}
                      />
                    </div>
                    <div>{item.name} x1</div>
                  </div>
                ))}
              </small>
            </CardContent>
          </Card>
        ) : null,
      )}
    </>
  );
}
