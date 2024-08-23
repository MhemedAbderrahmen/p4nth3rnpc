/* eslint-disable @typescript-eslint/no-floating-promises */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userQuestItemsRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const availableUserQuests = await ctx.db.userQuest.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          quest: {
            include: {
              requiredItems: true,
            },
          },
        },
      });
      if (!availableUserQuests) return;

      const userQuestItems = availableUserQuests.map((userQuest) => ({
        filledIn: false,
        userQuestId: userQuest.id,
        amount: 3,
      }));

      return await ctx.db.userQuestItem.createMany({
        data: userQuestItems,
      });
    }),
});
