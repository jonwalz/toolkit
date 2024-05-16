import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { login } from "@/app/(auth)/login/actions";
import InputField from "./InputField";
import AuthButton from "./AuthButton";

const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must contain at least 3 characters." }),
  password: z
    .string()
    .min(3, { message: "Password must contain at least 3 characters." })
    .max(20),
});

type LoginFormData = z.infer<typeof loginSchema>;

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

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    const formData = prepareFormData(email, password);

    try {
      const response = await login(formData);
      if (response.error) {
        handleAuthError(response.error);
      } else {
        router.push("/");
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
        <InputField<LoginFormData>
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          register={register}
          error={errors.email}
        />
        <InputField<LoginFormData>
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="password"
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
