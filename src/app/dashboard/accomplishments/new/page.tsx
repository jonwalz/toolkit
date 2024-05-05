import { DashboardHeader } from "@/components/header";
import { AccomplishmentForm } from "@/components/accomplishment-form";
import { Shell } from "@/components/shell";
import { title } from "../_constants";

export const runtime = "edge";

export default function Accomplishment() {
  return (
    <Shell>
      <DashboardHeader heading={title} />
      <div className={"max-w-[800px]"}>
        <AccomplishmentForm />
      </div>
    </Shell>
  );
}
