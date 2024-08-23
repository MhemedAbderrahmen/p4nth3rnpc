/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questsRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        reward: z.coerce.number(),
        requiredItems: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.quest.create({
        data: {
          title: input.title,
          description: input.description,
          reward: input.reward,
          requiredItems: {
            connect: input.requiredItems.map((id) => ({ id })),
          },
        },
      });
    }),

  get: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.quest.findMany({
      orderBy: {
        createdAt: "asc",
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
