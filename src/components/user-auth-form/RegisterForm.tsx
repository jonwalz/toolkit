import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "@/components/ui/use-toast";
import { signup } from "@/app/(auth)/login/actions";
import InputField from "./InputField";
import AuthButton from "./AuthButton";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(3, { message: "Email must contain at least 3 characters." }),
    password: z
      .string()
      .min(3, { message: "Password must contain at least 3 characters." })
      .max(20),
    confirmPassword: z.string().min(3).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const handleAuthError = (message: string) => {
  toast({
    title: "Something went wrong.",
    description: message,
    variant: "destructive",
  });
};

const prepareFormData = (email: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return formData;
};

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    const formData = prepareFormData(email, password);

    try {
      const response = await signup(formData);
      if (response.error) {
        setError("email", { type: "manual", message: response.error });
      }
    } catch (e) {
      if (e instanceof Error) {
        handleAuthError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <InputField<RegisterFormData>
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          register={register}
          error={errors.email}
        />
        <InputField<RegisterFormData>
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="password"
          disabled={isLoading}
          register={register}
          error={errors.password}
        />
        <InputField<RegisterFormData>
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autoComplete="confirm-password"
          disabled={isLoading}
          register={register}
          error={errors.confirmPassword}
        />
        <AuthButton isLoading={isLoading} className="mt-4">
          Sign Up with Email
        </AuthButton>
      </div>
    </form>
  );
};

export default RegisterForm;
