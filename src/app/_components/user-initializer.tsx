"use client";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardHeader } from "~/components/ui/card";
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
      <Card className="flex h-full w-full flex-col items-center justify-center text-center">
        <CardHeader className="flex w-full gap-4">
          <h1>User successfully initialized </h1>
          <Link href={"/profile/" + createUser.data.username}>
            <Button className="font-semibold">
              View journal {createUser.data.username}
            </Button>
          </Link>
        </CardHeader>
      </Card>
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
