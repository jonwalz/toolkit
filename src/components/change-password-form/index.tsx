"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { passwordChangeSchema } from "@/schemas/forms/passwordChange";
import { z } from "zod";
import InputField from "../user-auth-form/InputField";
import AuthButton from "../user-auth-form/AuthButton";
import { changePassword } from "@/server/functions/changePassword";

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

const handleAuthError = (message: string) => {
  toast({
    title: "Something went wrong.",
    description: message,
    variant: "destructive",
  });
};

const prepareFormData = (password: string) => {
  const formData = new FormData();
  formData.append("password", password);
  return formData;
};

const PasswordChangeForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit: SubmitHandler<PasswordChangeFormData> = async ({
    password,
  }) => {
    setIsLoading(true);
    const formData = prepareFormData(password);

    try {
      const response = await changePassword(formData);
      if (response.error) {
        handleAuthError(response.error);
      } else {
        toast({
          title: "Password changed successfully.",
          description: "Your password has been updated.",
          variant: "default",
        });
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
        <InputField<PasswordChangeFormData>
          id="password"
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
          disabled={isLoading}
          register={register}
          error={errors.password}
        />
        <InputField<PasswordChangeFormData>
          id="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          autoComplete="new-password"
          disabled={isLoading}
          register={register}
          error={errors.confirmPassword}
        />
        <AuthButton isLoading={isLoading} className="mt-4">
          Change Password
        </AuthButton>
      </div>
    </form>
  );
};

export default PasswordChangeForm;
