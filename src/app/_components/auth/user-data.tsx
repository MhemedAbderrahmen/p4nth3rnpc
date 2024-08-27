"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserData() {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end gap-2">
      <Image
        className="rounded-full"
        src={data?.user?.image ?? ""}
        height={50}
        width={50}
        alt="profile"
      />
    </div>
  );
}
