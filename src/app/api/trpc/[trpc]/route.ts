import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { NextRequest } from "next/server";

import { env } from "@/env.mjs";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { supabaseServerClient } from "@/server/vendor/supabase";

export const runtime = "edge";

const handler = async (req: NextRequest) => {
  const client = supabaseServerClient();
  const {
    data: { session },
  } = await client.auth.getSession();

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({ req, session: session ?? undefined }),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });
};

export { handler as GET, handler as POST };
