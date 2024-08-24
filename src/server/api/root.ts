import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { inventoryRouter } from "./routers/inventory";
import { inventoryItemRouter } from "./routers/inventory-item";
import { itemsRouter } from "./routers/items";
import { npcTransactionRouter } from "./routers/npc-transaction";
import { questsRouter } from "./routers/quests";
import { userQuestItemsRouter } from "./routers/user-quest-items";
import { userQuestsRouter } from "./routers/user-quests";
import { userRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  quests: questsRouter,
  userQuests: userQuestsRouter,
  userQuestItems: userQuestItemsRouter,
  npcTransaction: npcTransactionRouter,
  items: itemsRouter,
  inventory: inventoryRouter,
  inventoryItem: inventoryItemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
