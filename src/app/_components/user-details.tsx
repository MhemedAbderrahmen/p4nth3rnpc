"use client";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export function UserDetails({ params }: { params: { username: string } }) {
  const utils = api.useUtils();
  const createUser = api.user.create.useMutation({
    async onSuccess() {
      await utils.user.get.invalidate();
    },
  });
  const generateQuest = api.quests.generate.useMutation({
    async onSuccess({ id }) {
      await utils.user.get.invalidate();
      await generateQuest.mutateAsync({ userId: id });
    },
  });

  useEffect(() => {
    createUser.mutate({ username: params.username });
  }, []);

  return (
    <div>{createUser.isPending ? "Loading..." : createUser.data?.username}</div>
  );
}
