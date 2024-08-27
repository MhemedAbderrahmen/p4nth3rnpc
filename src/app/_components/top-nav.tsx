"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenuButton from "./auth/user-menu-button";

export default function TopNav() {
  const { data } = useSession();
  return (
    <div className="flex justify-between">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">⭐</h1>
      <h1 className="w-full scroll-m-20 items-center text-center text-3xl font-semibold tracking-tight">
        <Link href={"/"}>p4nth3r.npc</Link>
      </h1>
      <UserMenuButton session={data} />
    </div>
  );
}
