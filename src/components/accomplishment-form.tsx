"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useRef } from "react";
import { updateAccomplishmentEntry } from "@/server/functions/updateAccomplishmentEntry";
import { createNewAccomplishmentEntry } from "@/server/functions/createNewAccomplishmentEntry";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  accomplishment: z.string().min(1, "Accomplishment is required"),
  next_step: z.string().min(1, "Next Step is required"),
  id: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  date: new Date().toDateString(),
  accomplishment: "",
  next_step: "",
};

export function AccomplishmentForm({
  entryData,
  id,
}: {
  entryData?: FormData;
  id?: string;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: entryData ?? defaultValues,
  });

  const {
    register,
    formState: { errors, isValid },
  } = form;

  const formRef = useRef<HTMLFormElement>(null);

  const action = id ? updateAccomplishmentEntry : createNewAccomplishmentEntry;

  return (
    <div className="grid gap-6">
      <form ref={formRef} action={action}>
        <div className="lg:grid-cols-2p  grid grid-cols-1 gap-4">
          <div className="col-span-1 sm:col-span-1">
            <Label>
              Date:
              <Input className="mb-2" type="date" {...register("date")} />
              {errors.date && (
                <p className="px-1 text-xs text-red-600">
                  {errors.date.message}
                </p>
              )}
            </Label>
            <Label>
              Accomplishment:
              <Input className="mb-2" {...register("accomplishment")} />
              {errors.accomplishment && (
                <p className="px-1 text-xs text-red-600">
                  {errors.accomplishment.message}
                </p>
              )}
            </Label>
            <Label>
              Next Step:
              <Input className="mb-2" {...register("next_step")} />
              {errors.next_step && (
                <p className="px-1 text-xs text-red-600">
                  {errors.next_step.message}
                </p>
              )}
            </Label>
          </div>
          {id && <Input type="hidden" {...register("id")} value={id} />}
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="px-1 text-xs text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
        <button
          type="submit"
          className={cn(buttonVariants(), "ml-auto mt-2")}
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
