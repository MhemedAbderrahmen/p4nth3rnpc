/* eslint-disable @typescript-eslint/no-floating-promises */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userQuestsRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const availableQuests = await ctx.db.quest.findMany();
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
});
