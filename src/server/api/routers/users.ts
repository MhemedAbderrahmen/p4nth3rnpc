import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
