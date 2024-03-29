import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { supabaseServerClient } from "@/server/vendor/supabase";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(async () => {
    try {
      const { data: user } = await supabaseServerClient()
        .auth
        .getUser();

      return user.user;
    } catch (e) {
      console.log("Get user error: ---------------:\n", e);
    }
  }),
});
