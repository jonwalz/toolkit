"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import { LoginFormData } from "@/components/user-auth-form/loginSchema";

export async function login(data: LoginFormData) {
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

  // TODO: Create exit case to check if email is valid within kartra

  // const isValid = await checkEmailKartra(email);

  const supabase = createClient();

  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (response.error) {
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
