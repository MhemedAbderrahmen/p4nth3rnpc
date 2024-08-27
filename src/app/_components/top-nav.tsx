"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import UserMenuButton from "./auth/user-menu-button";

export default function TopNav() {
  const { status, data } = useSession();

  return (
    <div className="flex justify-between">
      <h1 className="w-full scroll-m-20 items-center text-3xl font-semibold tracking-tight">
        <Link href={"/"}>⭐ p4nth3r.npc</Link>
      </h1>
      {status === "loading" ? (
        <Skeleton className="h-10 w-12 rounded-full" />
      ) : (
        <UserMenuButton session={data} />
      )}
    </div>
  );
}
