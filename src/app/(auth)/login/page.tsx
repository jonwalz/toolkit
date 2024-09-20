import { Metadata } from "next";

import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/");
  }

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <UserAuthForm />
      </div>
      <div
        className="hidden h-full bg-muted lg:block"
        style={{
          backgroundImage: "url('/monica_blue_book.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Flowers with a canal in the background"
      />
    </div>
  );
}
