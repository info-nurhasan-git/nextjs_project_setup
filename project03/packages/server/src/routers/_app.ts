import { createTRPCRouter } from "../trpc.js";
import { hello } from "./hello.js";

export const appRouter = createTRPCRouter({
  hello,
});

export type AppRouter = typeof appRouter;