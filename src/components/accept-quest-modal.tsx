"use client";
import { Loader2 } from "lucide-react";
import { type Session } from "next-auth";
import { useState } from "react";
import { type Quest } from "~/lib/types";
import { api } from "~/trpc/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function AcceptQuestConfirm({
  quest,
  connectedUser,
}: {
  quest: Quest;
  connectedUser: Session;
}) {
  const [isPending, setIsPending] = useState<boolean>(false);
  const user = api.user.get.useQuery(connectedUser.user?.name ?? "");
  const createUserQuest = api.userQuests.create.useMutation({
    async onSuccess({ id }) {
      await createUserQuestItems.mutateAsync({
        userId: user.data?.id ?? "",
        items: quest.requiredItems.map((item) => item.id),
        userQuestId: id,
      });
      setIsPending(false);
    },
  });
  const createUserQuestItems = api.userQuestItems.create.useMutation();

  const acceptQuest = async () => {
    setIsPending(true);
    await createUserQuest.mutateAsync({
      userId: user.data?.id ?? "",
      questId: quest.id,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Accept Quest</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirming this quest will start your adventure! 🚀
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => acceptQuest()} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 animate-spin" size={16} />
            ) : (
              "Accept Quest"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
