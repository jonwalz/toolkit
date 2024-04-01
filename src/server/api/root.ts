import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";
import { accomplishmentsRouter } from "./routers/accomplishments";

export const appRouter = createTRPCRouter({
  user: userRouter,
  accomplishments: accomplishmentsRouter,
});

export type AppRouter = typeof appRouter;
