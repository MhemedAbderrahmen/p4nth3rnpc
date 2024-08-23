/* eslint-disable @typescript-eslint/no-floating-promises */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userQuestsRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const availableQuests = await ctx.db.quest.findMany({
        where: {},
      });
      if (!availableQuests) return;

      const userQuests = availableQuests.map((availableQuest) => ({
        userId: input.userId,
        progression: 0,
        questId: availableQuest.id,
        active: true,
      }));

      return await ctx.db.userQuest.createMany({
        data: userQuests,
      });
    }),

  create: publicProcedure
    .input(z.object({ userId: z.string().min(1), questId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.userQuest.create({
        data: {
          userId: input.userId,
          questId: input.questId,
          progression: 0,
          active: true,
        },
        include: {
          quest: {
            include: {
              requiredItems: true,
            },
          },
        },
      });
    }),
});
