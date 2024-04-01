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
  date: z.string(),
  play: z.string(),
  wipTime: z.string(),
  selfCare: z.string(),
  wordCount: z
    .string()
    .transform((value) => (value === "" ? null : parseFloat(value)))
    .nullable()
    .optional(),
  progressParagraph: z.string(),
  id: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  date: new Date().toDateString(),
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
  });

  const {
    register,
    formState: { errors },
  } = form;

  // const router = useRouter();

  // const { updateProgress } = clientSideApi.progress;

  // const updateProgressEntry = updateProgress.useMutation({
  //   onSuccess: () => router.push("/dashboard/progress"),
  // });

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
            </Label>
            <Label>
              Play:
              <Input className="mb-2" {...register("play")} />
            </Label>
            <Label>
              WIP Time:
              <Input className="mb-2" {...register("wipTime")} />
            </Label>
            <Label>
              Self Care:
              <Input className="mb-2" {...register("selfCare")} />
            </Label>
            <Label>
              Word Count (Optional):
              <Input
                className="mb-2"
                type="number"
                {...register("wordCount")}
              />
            </Label>
          </div>
          <Label>
            Progress Paragraph:
            <Textarea
              className="mb-2 mt-2"
              {...register("progressParagraph")}
            />
          </Label>
          {id && <Input type="hidden" {...register("id")} value={id} />}
        </div>
        {Object.keys(errors).length > 0 && (
          <p className="px-1 text-xs text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
        <button type="submit" className={cn(buttonVariants(), "ml-auto mt-2")}>
          Submit
        </button>
      </form>
    </div>
  );
}
