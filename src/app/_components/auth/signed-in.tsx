"use client";
import { useSession } from "next-auth/react";

export default function SignedIn({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();
  if (status === "loading") return <div />;
  if (status === "unauthenticated") return <div />;
  return <>{children}</>;
}
