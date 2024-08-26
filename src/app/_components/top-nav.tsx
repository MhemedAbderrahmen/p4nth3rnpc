"use client";
import { TwitchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export const TopNav = () => {
  const hash = document.location.hash;
  const hashParams = new URLSearchParams(hash.substring(1));
  const accessToken = hashParams.get("access_token");

  const { data } = api.user.auth.useQuery({ access_token: accessToken ?? "" });

  return (
    <div className="flex justify-between">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">⭐</h1>
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
        <Link href={"/"}>p4nth3r.npc</Link>
      </h1>
      <Button>
        <Link
          className="flex items-center font-semibold"
          href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=c3ab8aa609ea11e793ae92361f002671`}
        >
          <TwitchIcon className="mr-2" size={18} /> Sign In
        </Link>
      </Button>
    </div>
  );
};
