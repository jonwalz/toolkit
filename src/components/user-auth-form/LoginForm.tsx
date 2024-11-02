import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { login } from "@/app/(auth)/login/actions";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import { useLoginForm } from "./useLoginForm";
import { LoginFormData } from "./loginSchema";
import { AuthError } from "@/utils/errors";

const ROUTES = {
  HOME: "/",
};

const FORM_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
} as const;

const handleAuthError = (error: AuthError) => {
  console.log("Sign in error: ", error.message);
  toast({
    title: "Authentication Error",
    description: error.message,
    variant: "destructive",
  });
};

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { register, handleSubmit, errors, isLoading, setIsLoading } =
    useLoginForm();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      if (response?.error) {
        throw new AuthError(response.error);
      }
      router.push(ROUTES.HOME);
    } catch (e) {
      if (e instanceof AuthError) {
        handleAuthError(e);
      } else {
        console.error("Unexpected error:", e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <InputField<LoginFormData>
          id={FORM_FIELDS.EMAIL}
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          register={register}
          error={errors.email}
        />
        <InputField<LoginFormData>
          id={FORM_FIELDS.PASSWORD}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          disabled={isLoading}
          register={register}
          error={errors.password}
        />
        <AuthButton isLoading={isLoading} className="mt-4">
          Sign In with Email
        </AuthButton>
      </div>
    </form>
  );
};

export default LoginForm;
