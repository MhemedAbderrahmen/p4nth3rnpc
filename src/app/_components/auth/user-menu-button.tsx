"use client";

import { TwitchIcon } from "lucide-react";
import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type UserMenuButtonProps = {
  session: Session | null;
};

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const router = useRouter();
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
        <div className="flex flex-row items-center gap-4">
          <Image
            onClick={() => router.push("/journal/" + user.name)}
            src={user?.image ?? ""}
            alt="Profile picture"
            width={40}
            height={40}
            className="w-10 cursor-pointer rounded-full transition-all hover:border-2 hover:border-primary"
          />
          <button onClick={() => signOut({ callbackUrl: "/" })}>Log Out</button>
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
