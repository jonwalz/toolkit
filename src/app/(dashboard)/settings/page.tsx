import ChangePasswordForm from "@/components/change-password-form";
import { DashboardHeader } from "@/components/header";
import { Shell } from "@/components/shell";

export default function Page() {
  return (
    <Shell>
      <DashboardHeader heading="Settings" />
      <ChangePasswordForm />
    </Shell>
  );
}
