"use client";

import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

type UserMenuButtonProps = {
  session: Session | null;
};

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

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
        <Button onClick={() => signIn("twitch")}>Sign In</Button>
      )}
    </div>
  );
}
