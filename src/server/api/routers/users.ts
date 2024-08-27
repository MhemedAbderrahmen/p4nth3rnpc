import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export type requestAccessToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
};

export const userRouter = createTRPCRouter({
  auth: publicProcedure
    .input(
      z.object({
        access_token: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { access_token } = input;
      const url = "https://id.twitch.tv/oauth2/token";
      const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ?? "";
      const clientSecret = process.env.TWITCH_SECRET ?? "";

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("client_secret", clientSecret);
      params.append("grant_type", "client_credentials");

      const getAccessToken = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const responseRequestAT: requestAccessToken =
        (await getAccessToken.json()) as requestAccessToken;

      if (!access_token) return null;
      // ==============================
      const getUserId = await fetch("https://id.twitch.tv/oauth2/userinfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!getUserId.ok) {
        throw new Error("Failed to fetch data from external API");
      }

      const userId: { preferred_username: string } =
        (await getUserId.json()) as {
          preferred_username: string;
        };

      // ==============================
      const getTwitchUser = await fetch(
        "https://api.twitch.tv/helix/users?login=" + userId.preferred_username,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${responseRequestAT.access_token}`,
            "Client-ID": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID ?? "",
          },
        },
      );

      if (!getTwitchUser.ok) {
        throw new Error("Failed to fetch data from external API");
      }

      const twitchUserData: TwitchUser[] =
        (await getTwitchUser.json()) as TwitchUser[];

      return twitchUserData[0];
    }),

  create: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { username: input.username },
      });
      if (existingUser) throw new TRPCError({ code: "CONFLICT" });
      return await ctx.db.user.create({
        data: {
          username: input.username,
        },
        include: {
          userQuests: {
            include: {
              quest: true,
            },
          },
        },
      });
    }),

  all: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        username: input,
      },
      include: {
        userQuests: {
          include: {
            userQuestItems: true,
            quest: {
              include: {
                requiredItems: true,
              },
            },
          },
        },
      },
    });
    if (!user) throw new TRPCError({ code: "NOT_FOUND" });
    return user;
  }),
});
