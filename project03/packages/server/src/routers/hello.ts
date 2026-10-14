import { publicProcedure } from "../trpc.js";

export const hello = publicProcedure.query(() => {
  return "Hello World, Nur Hasan!";
});