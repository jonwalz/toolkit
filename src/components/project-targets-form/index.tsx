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
import { useEffect } from "react";
import { upsertProjectTargets } from "@/server/functions/updateProjectTargets";
import { supabase } from "@/client/supabase";

type FormData = {
  totalWordCount: number;
  startDate: string;
  endDate: string;
  writingDaysPerWeek: number;
};

export function ProjectTargetsForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      totalWordCount: 0,
      startDate: undefined,
      endDate: undefined,
      writingDaysPerWeek: 0,
    },
  });

  const formData = watch();

  const calculateAverageWordsPerDay = () => {
    const { totalWordCount, startDate, endDate, writingDaysPerWeek } = formData;
    if (!totalWordCount || !startDate || !endDate || !writingDaysPerWeek)
      return 0;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const days = (end - start) / (1000 * 60 * 60 * 24);
    const totalWritingDays = (days / 7) * writingDaysPerWeek;

    return totalWritingDays ? totalWordCount / totalWritingDays : 0;
  };

  useEffect(() => {
    const subscription = watch((value) => {
      async function run() {
        const user = await supabase.auth.getUser();
        const userId = user?.data?.user?.id;

        if (userId) {
          await upsertProjectTargets({
            totalWordCount: value.totalWordCount ?? null,
            startDate: value.startDate,
            endDate: value.endDate,
            writingDaysPerWeek: value.writingDaysPerWeek ?? null,
            userId,
          });
        }
      }

      void run();
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  console.log("RENDER");

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
          <Input type="date" {...register("startDate")} />
          {errors.startDate && (
            <p className="text-xs text-red-600">{errors.startDate.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <Label className="mr-2 w-48">Target Completion Date:</Label>
          <Input type="date" {...register("endDate")} />
          {errors.endDate && (
            <p className="text-xs text-red-600">{errors.endDate.message}</p>
          )}
        </div>
        <div className="flex items-center">
          <Label className="mr-2 w-48">Writing Days Per Week:</Label>
          <Input
            type="number"
            {...register("writingDaysPerWeek", { valueAsNumber: true })}
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
            {calculateAverageWordsPerDay().toFixed()}
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
}
