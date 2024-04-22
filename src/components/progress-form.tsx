"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { createNewProgressEntry } from "@/server/functions/createNewProgressEntry";
import { useRef } from "react";
import { updateProgressEntry } from "@/server/functions/updateProgressEntry";

const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  play: z.string().min(1, "Play is required"),
  wipTime: z.string().min(1, "WIP Time is required"),
  selfCare: z.string().min(1, "Self Care is required"),
  wordCount: z
    .string()
    .transform((value) => (value === "" ? null : parseFloat(value)))
    .nullable()
    .optional(),
  progressParagraph: z.string().min(1, "Progress Paragraph is required"),
  id: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  date: new Date().toISOString().split("T")[0]!,
  play: "",
  wipTime: "",
  selfCare: "",
  wordCount: null,
  progressParagraph: "",
};

export function ProgressForm({
  entryData,
  id,
}: {
  entryData?: FormData;
  id?: string;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: entryData ?? defaultValues,
    mode: "onChange",
  });

  const {
    register,
    formState: { errors, isValid },
  } = form;

  const formRef = useRef<HTMLFormElement>(null);

  const action = id ? updateProgressEntry : createNewProgressEntry;

  return (
    <div className="grid gap-6">
      <form ref={formRef} action={action}>
        <div className="lg:grid-cols-2p  grid grid-cols-1 gap-4">
          <div className="col-span-1 sm:col-span-1">
            <Label>
              Date:
              <Input className="mb-2" type="date" {...register("date")} />
              {errors.date && (
                <p className="text-xs text-red-600">{errors.date.message}</p>
              )}
            </Label>
            <Label>
              Play:
              <Input className="mb-2" {...register("play")} />
              {errors.play && (
                <p className="text-xs text-red-600">{errors.play.message}</p>
              )}
            </Label>
            <Label>
              WIP Time:
              <Input className="mb-2" {...register("wipTime")} />
              {errors.wipTime && (
                <p className="text-xs text-red-600">{errors.wipTime.message}</p>
              )}
            </Label>
            <Label>
              Self Care:
              <Input className="mb-2" {...register("selfCare")} />
              {errors.selfCare && (
                <p className="text-xs text-red-600">
                  {errors.selfCare.message}
                </p>
              )}
            </Label>
            <Label>
              Word Count (Optional):
              <Input
                className="mb-2"
                type="number"
                {...register("wordCount")}
              />
              {errors.wordCount && (
                <p className="text-xs text-red-600">
                  {errors.wordCount.message}
                </p>
              )}
            </Label>
          </div>
          <Label>
            Progress Paragraph:
            <Textarea
              className="mb-2 mt-2"
              {...register("progressParagraph")}
            />
            {errors.progressParagraph && (
              <p className="text-xs text-red-600">
                {errors.progressParagraph.message}
              </p>
            )}
          </Label>
          {id && <Input type="hidden" {...register("id")} value={id} />}
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="px-1 text-xs text-red-600">
            Please fill in all required fields
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
