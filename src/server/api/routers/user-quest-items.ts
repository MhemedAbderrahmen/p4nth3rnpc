/* eslint-disable @typescript-eslint/no-floating-promises */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userQuestItemsRouter = createTRPCRouter({
  fillInItem: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        item: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          username: input.username,
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

      user.userQuests.map((userQuest) => {
        userQuest.userQuestItems.map(async (userQuestItem) => {
          if (userQuestItem.name === input.item) {
            await ctx.db.userQuestItem.update({
              where: {
                id: userQuestItem.id,
              },
              data: {
                filledIn: true,
              },
            });
          }
        });
      });
    }),

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

      const userQuestItems: {
        filledIn: boolean;
        userQuestId: string;
        amount: number;
        name: string;
      }[] = [];

      availableUserQuests.map((userQuest) => {
        userQuest.quest.requiredItems.map((requiredItem) => {
          userQuestItems.push({
            filledIn: false,
            userQuestId: userQuest.id,
            amount: 1,
            name: requiredItem.name,
          });
        });
      });

      return await ctx.db.userQuestItem.createMany({
        data: userQuestItems,
      });
    }),
});
