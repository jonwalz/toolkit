"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await supabase.auth.signInWithPassword(data);

  if (response.error) {
    return { error: "Invalid email or password" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await supabase.auth.signUp(data);

  if (response.error) {
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendMagicLink(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  const supabase = createClient();

  // TODO: Create exit case to check if email is valid within kartra

  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: 'https://toolkit-e19.pages.dev/',
    },
  });

  console.log("RESP: ", response);

  if (response.error) {
    // redirect("/error");
    console.log("HIT");
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
