"use server";
import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import {
  loginSchema,
  signupSchema,
} from "@/components/user-auth-form/loginSchema";

import { LoginFormData } from "@/components/user-auth-form/loginSchema";
import { z } from "zod";

export async function login(data: LoginFormData) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0]?.message };
  }

  const supabase = createClient();
  const response = await supabase.auth.signInWithPassword(result.data);

  if (response.error) {
    return { error: "Invalid email or password" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signupSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.issues[0]?.message };
  }

  const supabase = createClient();
  const response = await supabase.auth.signUp(result.data);

  if (response.error) {
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendMagicLink(formData: FormData) {
  const email = formData.get("email");

  const result = z
    .string()
    .email("Please enter a valid email address")
    .safeParse(email);

  if (!result.success) {
    return { error: result.error.issues[0]?.message };
  }

  // TODO: Create exit case to check if email is valid within kartra
  // const isValid = await checkEmailKartra(email);

  const supabase = createClient();
  const response = await supabase.auth.signInWithOtp({
    email: result.data,
  });

  if (response.error) {
    console.log("response.error", response.error);
    return { error: "Something went wrong" };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
