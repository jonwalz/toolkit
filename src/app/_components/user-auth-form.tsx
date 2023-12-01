"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "~/@/lib/utils"
import { buttonVariants } from "~/@/components/ui/button"
import { Input } from "~/@/components/ui/input"
import { Label } from "~/@/components/ui/label"
import { toast } from "~/@/components/ui/use-toast"
import { Icons } from "~/@/components/icons"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { asOptionalField } from "../_lib/zod"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const formSchema = z.object({
  email: z.string().min(3),
  password: z.string().min(3).max(20),
  confirmPassword: asOptionalField(z.string()
    .min(3)
    .max(20))
}).refine((data) => {
  if (data?.confirmPassword) {
    return data?.password === data?.confirmPassword
  } else {
    return true;
  };
})

type FormData = z.infer<typeof formSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const isRegister = pathname === "/register";
  const isLogin = pathname === "/login";

  async function onSubmit({ email, password }: FormData) {
    setIsLoading(true)

    if (isRegister) {
      const resp = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (resp.error) {
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        })
      }

      router.push("/login")
    }

    if (isLogin) {
      const resp = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (resp.error) {
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        })
      }
      router.refresh()
    }

    setIsLoading(false)
  }

  console.log("errors: ", errors) 

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("email")}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("password")}
            />
            {isRegister && <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              {...register("confirmPassword")}
            />}
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            { isLogin ? "Sign In with Email" : "Sign Up with Email"}
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          // TODO: Implement GitHub login
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  )
}
