import { DashboardHeader } from "@/components/header";
import { AccomplishmentForm } from "@/components/accomplishment-form";
import { Shell } from "@/components/shell";
import { title } from "../_constants";

export const runtime = "edge";

export default function Accomplishment() {
  return (
    <Shell>
      <DashboardHeader heading={title} />
      <div
        className={
          "flex min-h-[400px] flex-col justify-center rounded-md border p-8 animate-in fade-in-50"
        }
      >
        <AccomplishmentForm />
      </div>
    </Shell>
  );
}
