"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { asOptionalField } from "@/lib/zod";
import { supabase } from "@/client/supabase";

const formSchema = z
  .object({
    email: z.string().min(3),
    password: z.string().min(3).max(20),
    confirmPassword: asOptionalField(z.string().min(3).max(20)),
  })
  .refine((data) => {
    if (data?.confirmPassword) {
      return data?.password === data?.confirmPassword;
    } else {
      return true;
    }
  });

type FormData = z.infer<typeof formSchema>;

export function UserAuthForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const isLogin = pathname === "/login";

  async function onSubmit({ email, password }: FormData) {
    setIsLoading(true);

    if (isRegister) {
      const resp = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (resp.error) {
        // TODO: convert log to be captured by sentry or other visibility product
        console.log("Register error:", resp.error);
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      } else {
        router.push("/login");
      }
    }

    if (isLogin) {
      const resp = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (resp.error) {
        console.log("Login error:", resp.error);
        toast({
          title: "Something went wrong.",
          description:
            "Email and password combination not found. Please try again.",
          variant: "destructive",
        });
      }
      router.refresh();
    }

    setIsLoading(false);
  }

  async function onSignInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error?.message === "OAuth popup closed by user") {
      toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
    }

    router.push("/");
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="mb-4"
              {...register("email")}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              className="mb-4"
              {...register("password")}
            />
            {isRegister && (
              <>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  autoComplete="Confirm password"
                  autoCorrect="off"
                  disabled={isLoading}
                  className="mb-4"
                  {...register("confirmPassword")}
                />
              </>
            )}
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                Email must contain at least 3 character(s)
              </p>
            )}
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                Password must contain at least 3 character(s)
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLogin ? "Sign In with Email" : "Sign Up with Email"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button className="gsi-material-button" onClick={onSignInWithGoogle}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{ display: "block" }}
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">
              {isRegister ? "Sign up" : "Sign in"} with Google
            </span>
            <span style={{ display: "none" }}>
              {isRegister ? "Sign up" : "Sign in"} with Google
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
