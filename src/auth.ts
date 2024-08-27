import NextAuth from "next-auth";
import Twitch from "next-auth/providers/twitch";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Twitch],
});
