"use client";
import { useSession } from "next-auth/react";

export default function SignedOut({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();
  if (status === "loading") return <div />;
  if (status === "authenticated") return <div />;
  return <>{children}</>;
}
