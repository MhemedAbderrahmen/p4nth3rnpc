"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export const TopNav = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-between">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">⭐</h1>
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
        <Link href={"/"}>p4nth3r.npc</Link>
      </h1>
      <Button onClick={() => signIn()}>Sign in</Button>
      <ModeToggle />
    </div>
  );
};
