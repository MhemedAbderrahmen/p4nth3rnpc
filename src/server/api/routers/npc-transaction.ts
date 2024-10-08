import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const npcTransactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        giver: z.string().min(1),
        item: z.string().min(1),
        rarity: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const transaction = await ctx.db.npcTransaction.create({
        data: {
          itemName: input.item,
          itemRarity: input.rarity,
          giver: input.giver,
        },
      });
      return transaction;
    }),

  latest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.npcTransaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 1,
    });
  }),
});
