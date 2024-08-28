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
            const updatedUserQuest = await ctx.db.userQuest.findFirst({
              where: {
                id: userQuest.id,
              },
              include: {
                userQuestItems: true,
              },
            });
            if (!updatedUserQuest) return;
            // TODO: Do this process only if amount of items === filledInAmount
            // * Check if all items are filled in, if yes then update userQuest to inactive and give user gold
            const filledInAmount = updatedUserQuest.userQuestItems.filter(
              (item) => item.filledIn,
            ).length;

            if (filledInAmount !== userQuest.quest.requiredItems.length) return;

            await ctx.db.userQuest.update({
              where: {
                id: userQuest.id,
              },
              data: {
                active: false,
              },
            });
            await ctx.db.user.update({
              where: {
                id: user.id,
              },
              data: {
                gold: {
                  increment: userQuest.quest.reward,
                },
              },
            });
          }
        });
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        userQuestId: z.string(),
        items: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userQuestItems = input.items.map((item: string) => ({
        filledIn: false,
        userQuestId: input.userQuestId,
        amount: 1,
        name: item,
      }));

      return await ctx.db.userQuestItem.createMany({
        data: userQuestItems,
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
