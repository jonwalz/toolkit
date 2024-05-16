"use client";

import React from "react";
// import { usePathname } from "next/navigation";
import AuthLayout from "./AuthLayout";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
// import { supabase } from "@/client/supabase";
// import { toast } from "@/components/ui/use-toast";
import MagicLinkForm from "./MagicLink";

// const PATHS = {
//   REGISTER: "/register",
//   LOGIN: "/login",
// };

// const handleAuthError = (message: string) => {
//   toast({
//     title: "Something went wrong.",
//     description: message,
//     variant: "destructive",
//   });
// };

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // const pathname = usePathname();
  // const isRegister = pathname === PATHS.REGISTER;

  // const onSignInWithGoogle = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `${location.origin}/auth/callback`,
  //       queryParams: {
  //         access_type: "offline",
  //         prompt: "consent",
  //       },
  //     },
  //   });

  //   if (error) {
  //     handleAuthError(error.message);
  //   }
  // };

  return (
    <AuthLayout
      // onSignInWithGoogle={onSignInWithGoogle}
      className={className}
      {...props}
    >
      {/* {isRegister ? <RegisterForm /> : <LoginForm />} */}
      <MagicLinkForm />
    </AuthLayout>
  );
}
