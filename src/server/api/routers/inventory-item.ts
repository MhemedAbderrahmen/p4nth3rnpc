/* eslint-disable @typescript-eslint/no-floating-promises */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const inventoryItemRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        username: z.string().min(1),
        name: z.string().min(1),
        type: z.string().min(1),
        rarity: z.coerce.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const inventory = await ctx.db.inventory.findFirst({
        where: {
          botName: input.username,
        },
      });
      if (!inventory)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Inventory not found",
        });

      const inventoryItem = await ctx.db.inventoryItem.create({
        data: {
          name: input.name,
          rarity: input.rarity,
          inventoryId: inventory.id,
          type: input.type,
        },
      });

      await ctx.db.inventory.update({
        where: {
          botName: input.username,
        },
        data: {
          wealthIndex: {
            increment: input.rarity,
          },
        },
      });

      return inventoryItem;
    }),
});
