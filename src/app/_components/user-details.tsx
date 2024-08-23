"use client";
import { api } from "~/trpc/react";

export function UserDetails({ params }: { params: { username: string } }) {
  const { data, isPending } = api.user.get.useQuery(params.username);

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      User quests{" "}
      {data?.userQuests.map((userQuest, index) => (
        <div key={index}>
          <div>{userQuest.quest.title}</div>
          <div>{userQuest.quest.description}</div>
          <div>{userQuest.quest.reward}</div>
          <div>{userQuest.progression}</div>
        </div>
      ))}
    </div>
  );
}
