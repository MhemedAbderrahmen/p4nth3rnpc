"use client";

import { TwitchIcon } from "lucide-react";
import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type UserMenuButtonProps = {
  session: Session | null;
};

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;
  const verifyUser = api.user.verify.useMutation({
    onSuccess({ picture }) {
      console.log(picture);
    },
  });
  useEffect(() => {
    if (user) {
      verifyUser.mutate({
        username: user.name ?? "",
        picture: user.image ?? "",
      });
    }
  }, [user]);

  return (
    <div className="flex items-center justify-end">
      {user ? (
        <div className="flex flex-row items-center gap-2">
          <Image
            src={user?.image ?? ""}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
          <button onClick={() => signOut({ callbackUrl: "/" })}>
            Sign Out
          </button>
        </div>
      ) : (
        <Button
          onClick={() => signIn("twitch")}
          className="flex font-display text-lg"
        >
          <TwitchIcon className="mr-2" size={20} /> Log In
        </Button>
      )}
    </div>
  );
}
