import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { sendMagicLink } from "@/app/(auth)/login/actions";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import { supabase } from "@/client/supabase";

const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must contain at least 3 characters." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const handleAuthError = (message: string) => {
  toast({
    title: "Something went wrong.",
    description: message,
    variant: "destructive",
  });
};

const prepareFormData = (email: string) => {
  const formData = new FormData();
  formData.append("email", email);
  return formData;
};

const MagicLinkForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async ({ email }) => {
    setIsLoading(true);
    // const formData = prepareFormData(email);

    try {
      const response = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: "https://toolkit-e19.pages.dev/",
        },
      });
      // const response = await sendMagicLink(formData);
      if (response?.error instanceof Error) {
        handleAuthError(response.error.message);
      } else {
        toast({
          title: "Magic link sent.",
          description: "Check your email for the magic link.",
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
        <InputField<LoginFormData>
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isLoading}
          register={register}
          error={errors.email}
        />
        <AuthButton isLoading={isLoading} className="mt-4">
          Email me a link
        </AuthButton>
      </div>
    </form>
  );
};

export default MagicLinkForm;
