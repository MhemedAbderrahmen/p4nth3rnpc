"use server";

import { signOut } from "~/auth";

export default async function TwitchSignout() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/", redirect: true });
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
