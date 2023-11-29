import { postRouter } from "~/server/api/routers/post";
import { authCallbackRouter } from "~/server/api/routers/authCallback";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  authCallback: authCallbackRouter,
});

export type AppRouter = typeof appRouter;
