"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { clientSideApi } from "@/trpc/react";

const formSchema = z.object({
  date: z.string(),
  play: z.string(),
  wipTime: z.string(),
  selfCare: z.string(),
  wordCount: z.number(),
  progressParagraph: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function ProgressForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const createNewProgressEntry =
    clientSideApi.progress.createProgress.useMutation();

  const onSubmit = (data: FormData) => {
    createNewProgressEntry.mutate(data);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
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
              Word Count:
              <Input
                className="mb-2"
                type="number"
                {...register("wordCount", { valueAsNumber: true })}
              />
            </Label>
          </div>
          <Label>
            Progress Paragraph:
            <Textarea
              className="mb-2 mt-2 h-full"
              {...register("progressParagraph")}
            />
          </Label>
        </div>

        <button type="submit" className={cn(buttonVariants(), "ml-auto mt-2")}>
          Submit
        </button>
      </form>
    </div>
  );
}
