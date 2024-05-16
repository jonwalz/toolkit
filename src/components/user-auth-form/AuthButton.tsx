import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface AuthButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isLoading,
  children,
  className,
  ...props
}) => (
  <button
    className={cn(buttonVariants(), className)}
    disabled={isLoading}
    {...props}
  >
    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
    {children}
  </button>
);

export default AuthButton;
