import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

export async function redirectToLogin() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error ?? !data?.user) {
    console.log("NO USER FOUND, REDIRECTING TO LOGIN", data.user);
    redirect("/login");
  }
}
