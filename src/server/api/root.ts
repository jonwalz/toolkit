import { userRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";

// Use this to call TRPC methods from client components
export const appRouter = createTRPCRouter({
  user: userRouter,
});

// TODO: Implementing this confuses the callers. Figure out how to create a caller that works on server
// Use this to call TRPC methods from server components
// export const serverTrpc = appRouter.createCaller({
//   headers: new Headers(),
//   req: new NextRequest(getBaseUrl()),
//   res: new NextResponse()
// });

export type AppRouter = typeof appRouter;
