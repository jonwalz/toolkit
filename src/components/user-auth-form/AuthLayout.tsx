import React from "react";
import { cn } from "@/lib/utils";
// import GoogleSignInButton from "./GoogleSignInButton";

interface AuthLayoutProps {
  children: React.ReactNode;
  // isRegister: boolean;
  // onSignInWithGoogle: () => void;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  // isRegister,
  // onSignInWithGoogle,
  className,
  ...props
}) => {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {children}
      {/* <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center">
        <GoogleSignInButton
          onClick={onSignInWithGoogle}
          isRegister={isRegister}
        />
      </div> */}
    </div>
  );
};

export default AuthLayout;
