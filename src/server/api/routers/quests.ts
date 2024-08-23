/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questsRouter = createTRPCRouter({
  generate: publicProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .mutation(async ({ ctx }) => {
      return await ctx.db.quest.create({
        data: {
          title: "The Great Recipe Hunt",
          description:
            "Players need to collect 3 rare ingredients (e.g., Golden Mushroom, Mystic Herb, and Enchanted Berry) and cook a 'Mystic Stew'. The quest rewards the player with a unique title and a special cooking utensil that boosts cooking speed.",
          reward: 1000,
          requiredItems: {
            createMany: {
              data: [
                {
                  name: "Golden Mushroom",
                  amount: 2,
                },
                {
                  name: "Mystic Herb",
                  amount: 1,
                },
                {
                  name: "Enchanted Berry",
                  amount: 3,
                },
              ],
            },
          },
        },
      });
    }),

  daily: publicProcedure.query(async ({ ctx }) => {
    const now = new Date();

    const todayStart: Date = dayjs(now).startOf("day").toDate();
    const todayEnd = dayjs(now).endOf("day").toDate();

    return await ctx.db.quest.findMany({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        requiredItems: true,
      },
    });
  }),
});
