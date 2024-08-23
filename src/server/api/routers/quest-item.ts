/* eslint-disable @typescript-eslint/no-floating-promises */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questItemRouter = createTRPCRouter({
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
        userQuest.quest.requiredItems.map(async (requiredItem) => {
          if (requiredItem.name === input.item) {
            await ctx.db.questItem.update({
              where: {
                id: requiredItem.id,
              },
              data: {
                filledIn: true,
              },
            });
          }
        });
      });
    }),
});
