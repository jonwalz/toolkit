"use client";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { createNewProgressEntry } from "@/server/functions/createNewProgressEntry";
import { updateProgressEntry } from "@/server/functions/updateProgressEntry";
import { deleteProgressEntry } from "@/server/functions/deleteProgressEntry";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const formSchema = z.object({
  date: z.string().optional(),
  play: z.string().optional(),
  wipTime: z.string().optional(),
  selfCare: z.string().optional(),
  wordCount: z
    .string()
    .transform((value) => (value === "" ? null : parseFloat(value)))
    .nullable()
    .optional(),
  progressParagraph: z.string().optional(),
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
  const deleteProgressEntryWithId = deleteProgressEntry.bind(null, id);

  return (
    <div className="flex flex-grow flex-col">
      <form ref={formRef} action={action}>
        <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-2">
          <div className="col-span-1 sm:col-span-1">
            <Label>
              Date:
              <Input
                className="mb-2"
                type="date"
                defaultValue={defaultValues.date}
                {...register("date")}
              />
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
              Word Count:
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
          <Label className="flex flex-col">
            Progress Paragraph:
            <Textarea
              className="mb-2 mt-2 h-[100%] min-h-[200px]"
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
        <div className="flex justify-between">
          <button
            type="submit"
            className={cn(buttonVariants(), "mt-2 justify-self-start")}
            disabled={!isValid}
          >
            Submit
          </button>
          {id && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "destructive" }),
                    "ml-auto mt-2",
                  )}
                >
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div>Are you sure you want to delete this entry?</div>
                <AlertDialogFooter>
                  <form action={deleteProgressEntryWithId}>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className={cn(buttonVariants({ variant: "destructive" }))}
                    >
                      Confirm Delete
                    </AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form>
    </div>
  );
}
