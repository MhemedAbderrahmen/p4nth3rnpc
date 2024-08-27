import Link from "next/link";
import SignOut from "./auth/sign-out";
import SignedIn from "./auth/signed-in";
import SignedOut from "./auth/signed-out";
import TwitchSignIn from "./auth/twitch-signin";
import TwitchSignout from "./auth/twitch-signout";
import UserData from "./auth/user-data";

export default function TopNav() {
  return (
    <div className="flex justify-between">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">⭐</h1>
      <h1 className="w-full scroll-m-20 items-center text-center text-3xl font-semibold tracking-tight">
        <Link href={"/"}>p4nth3r.npc</Link>
      </h1>
      <SignedIn>
        <UserData />
      </SignedIn>
      <SignedOut>
        <TwitchSignIn />
      </SignedOut>
      <SignOut>
        <TwitchSignout />
      </SignOut>
    </div>
  );
}
