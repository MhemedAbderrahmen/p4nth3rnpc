import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { username: input.username },
      });
      if (existingUser) return existingUser;
      return await ctx.db.user.create({
        data: {
          username: input.username,
        },
      });
    }),

  get: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        username: input,
      },
    });
    if (!user) throw new Error("User not found");
    return user;
  }),
});
