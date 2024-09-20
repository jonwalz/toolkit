"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useRef } from "react";
import { upsertProjectTargets } from "@/server/functions/updateProjectTargets";
import { supabase } from "@/client/supabase";

type FormData = {
  totalWordCount: number | null;
  targetStartDate: string | null;
  targetCompleteDate: string | null;
  writingDaysPerWeek: number | null;
};

const calculateAverageWordsPerDay = (formData: FormData) => {
  const {
    totalWordCount,
    targetStartDate,
    targetCompleteDate,
    writingDaysPerWeek,
  } = formData;
  if (
    !totalWordCount ||
    !targetStartDate ||
    !targetCompleteDate ||
    !writingDaysPerWeek
  )
    return 0;

  const start = new Date(targetStartDate).getTime();
  const end = new Date(targetCompleteDate).getTime();
  const days = (end - start) / (1000 * 60 * 60 * 24);
  const totalWritingDays = (days / 7) * writingDaysPerWeek;

  return totalWritingDays ? totalWordCount / totalWritingDays : 0;
};

export function ProjectTargetsForm({
  totalWordCount,
  targetStartDate,
  targetCompleteDate,
  writingDaysPerWeek,
}: {
  totalWordCount: number | null;
  targetStartDate: string | null;
  targetCompleteDate: string | null;
  writingDaysPerWeek: number | null;
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      totalWordCount,
      targetStartDate,
      targetCompleteDate,
      writingDaysPerWeek,
    },
  });

  const formData = watch();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = watch((value) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      function runFunction() {
        () => {
          const run = async () => {
            try {
              const user = await supabase.auth.getUser();
              const userId = user?.data?.user?.id;

              if (userId) {
                await upsertProjectTargets({
                  totalWordCount: value.totalWordCount ?? null,
                  targetStartDate: value.targetStartDate ?? null,
                  targetCompleteDate: value.targetCompleteDate ?? null,
                  writingDaysPerWeek: value.writingDaysPerWeek ?? null,
                });
              }
            } catch (error) {
              console.error("Error updating project targets:", error);
            }
          };

          void run();
        };
      }

      debounceRef.current = setTimeout(runFunction, 500);
    });

    return () => {
      subscription.unsubscribe();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [watch]);

  return (
    <div className="max-w-[600px]">
      <form className="grid gap-4">
        <div className="flex items-center">
          <Label className="mr-2 w-48">Total Word Count Goal:</Label>
          <Input
            type="number"
            {...register("totalWordCount", { valueAsNumber: true })}
          />
          {errors.totalWordCount && (
            <p className="text-xs text-red-600">
              {errors.totalWordCount.message}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Label className="mr-2 w-48">Target Start Date:</Label>
          <Input type="date" {...register("targetStartDate")} />
          {errors.targetStartDate && (
            <p className="text-xs text-red-600">
              {errors.targetStartDate.message}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Label className="mr-2 w-48">Target Completion Date:</Label>
          <Input type="date" {...register("targetCompleteDate")} />
          {errors.targetCompleteDate && (
            <p className="text-xs text-red-600">
              {errors.targetCompleteDate.message}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <Label className="mr-2 w-48">Writing Days Per Week:</Label>
          <Input
            type="number"
            {...register("writingDaysPerWeek", {
              valueAsNumber: true,
            })}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.value) {
                const value = parseInt(target.value, 10);
                if (value < 1) target.value = "1";
                if (value > 7) target.value = "7";
              }
            }}
          />
          {errors.writingDaysPerWeek && (
            <p className="text-xs text-red-600">
              {errors.writingDaysPerWeek.message}
            </p>
          )}
        </div>
      </form>
      <Card className="mt-4">
        <CardHeader>
          <CardDescription>Average Words Per Day:</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-4xl">
            {calculateAverageWordsPerDay(formData).toFixed()}
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
