import { NextRequest } from "next/server";
import { postRouter } from "@/server/api/routers/post";
import { createTRPCContext, createTRPCRouter } from "@/server/api/trpc";

// Use this to call TRPC methods from client components
export const appRouter = createTRPCRouter({
  post: postRouter,
});

// Use this to call TRPC methods from server components
// export const serverTrpc = appRouter.createCaller(await createTRPCContext()); 

export type AppRouter = typeof appRouter;
