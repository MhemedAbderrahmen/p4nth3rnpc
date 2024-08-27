"use server";
import { TwitchIcon } from "lucide-react";
import { signIn } from "~/auth";
import { Button } from "~/components/ui/button";

export default async function TwitchSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("twitch");
      }}
    >
      <Button className="flex items-center font-semibold" type="submit">
        <TwitchIcon className="mr-2" size={18} /> Sign In
      </Button>
    </form>
  );
}
