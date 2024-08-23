"use client";
import Link from "next/link";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export function UserInitializer({ params }: { params: { username: string } }) {
  const utils = api.useUtils();

  const generateQuest = api.userQuests.generate.useMutation({
    async onSuccess() {
      await utils.user.get.invalidate();
    },
  });

  const createUser = api.user.create.useMutation({
    async onSuccess({ id }) {
      await generateQuest.mutateAsync({ userId: id });
      await utils.user.get.invalidate();
    },
  });

  useEffect(() => {
    createUser.mutate({ username: params.username });
  }, []);

  if (createUser.isPending) return <div>Loading...</div>;
  if (createUser.isSuccess)
    return (
      <div>
        User successfully initialized{" "}
        <Link href={"/profile/" + createUser.data.username}>
          {createUser.data.username}
        </Link>
      </div>
    );
  if (createUser.isError)
    return (
      <div>
        Error Initialising user{" "}
        {createUser.error.data?.code === "CONFLICT" && (
          <div>
            User already initialized{" "}
            <Link href={"/profile/" + params.username}>{params.username}</Link>
          </div>
        )}
      </div>
    );
  return <div />;
}
