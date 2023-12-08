import { userRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { progressRouter } from "./routers/progress";

export const appRouter = createTRPCRouter({
  user: userRouter,
  progress: progressRouter,
});

export type AppRouter = typeof appRouter;
