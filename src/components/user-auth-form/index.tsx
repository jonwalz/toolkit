"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AuthLayout from "./AuthLayout";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import MagicLinkForm from "./MagicLink";

// Magic link does not work locally. Using user/password to develop locally
const enableUserPassFlow = process.env.NODE_ENV === "development";

const PATHS = {
  REGISTER: "/register",
  LOGIN: "/login",
};

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const isRegister = pathname === PATHS.REGISTER;

  return (
    <AuthLayout className={className} {...props}>
      {/* {enableUserPassFlow && (isRegister ? <RegisterForm /> : <LoginForm />)} */}
      <MagicLinkForm />
    </AuthLayout>
  );
}
