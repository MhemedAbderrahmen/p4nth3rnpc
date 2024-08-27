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

  verify: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        picture: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.upsert({
        where: { username: input.username },
        update: {
          username: input.username,
          picture: input.picture,
        },
        create: {
          username: input.username,
          picture: input.picture,
        },
      });
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
