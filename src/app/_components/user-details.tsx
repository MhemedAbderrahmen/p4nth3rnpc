/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
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
        🪙 : {data?.gold}
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardHeader className="text-center">
            {params.username}&apos;s Journal 📰
          </CardHeader>
        </CardHeader>
      </Card>
      <div>Active Quests</div>
      {data?.userQuests.map((userQuest, index: number) =>
        userQuest.active ? (
          <Card className="w-full" key={index}>
            <CardHeader>
              <h3 className="text-xl font-bold">❗{userQuest.quest.title}</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p>
                  <b>Details:</b> {userQuest.quest.description}
                </p>
                <p>
                  <b>Quest reward:</b>{" "}
                  <span className="text-emerald-400">
                    {userQuest.quest.reward} 🪙
                  </span>
                </p>
                <div>
                  <b>Items to collect</b>
                  <ul>
                    {userQuest.userQuestItems.map((item) => (
                      <li key={index}>
                        {item.name} x{item.amount}
                        {item.filledIn ? " FILLED IN 💎" : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null,
      )}
      <div>Inactive Quests Active Quests</div>

      {data?.userQuests.map((userQuest, index: number) =>
        !userQuest.active ? (
          <Card className="w-full" key={index}>
            <CardHeader>
              <h3 className="text-xl font-bold">❗{userQuest.quest.title}</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <p>
                  <b>Details:</b> {userQuest.quest.description}
                </p>
                <p>
                  <b>Quest reward:</b>{" "}
                  <span className="text-emerald-400">
                    {userQuest.quest.reward} 🪙
                  </span>
                </p>
                <div>
                  <b>Items to collect</b>
                  <ul>
                    {userQuest.userQuestItems.map((item) => (
                      <li key={index}>
                        {item.name} x{item.amount}
                        {item.filledIn ? " FILLED IN 💎" : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null,
      )}
    </>
  );
}
