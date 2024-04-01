import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";
import { progressRouter } from "./routers/progress";
import { accomplishmentsRouter } from "./routers/accomplishments";

export const appRouter = createTRPCRouter({
  user: userRouter,
  progress: progressRouter,
  accomplishments: accomplishmentsRouter,
});

export type AppRouter = typeof appRouter;
