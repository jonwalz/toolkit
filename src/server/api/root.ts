import { createTRPCRouter } from "@/server/api/trpc";
import { accomplishmentsRouter } from "./routers/accomplishments";

export const appRouter = createTRPCRouter({
  accomplishments: accomplishmentsRouter,
});

export type AppRouter = typeof appRouter;
