"use server";
import { supabaseServerClient } from "@/server/vendor/supabase";
import { redirect } from "next/navigation";

export const handleOnSelect = async () => {
  await supabaseServerClient().auth.signOut();

  redirect("/login");
};
