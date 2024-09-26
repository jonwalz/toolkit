"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { getCount } from "@/server/functions/getCount";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setCount } from "@/server/functions/setCount";
import { format, parseISO } from "date-fns";

const formSchema = z.object({
  startDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function CountStartDate() {
  const { data, error } = useQuery({
    queryKey: ["count"],
    queryFn: getCount,
  });
  const serverDate = data?.[0]?.date;

  const mutation = useMutation({
    mutationFn: async (data: { count: string | undefined }) => {
      return await setCount(data.count);
    },
  });

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      startDate: new Date().toISOString(),
    },
  });

  useEffect(() => {
    if (serverDate) {
      const x = parseISO(serverDate.toString());
      setValue("startDate", format(x, "yyyy-MM-dd"));
    }
  }, [serverDate, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      function run() {
        if (value.startDate) {
          mutation.mutate({ count: value.startDate });
        }
      }

      void run();
    });

    return subscription.unsubscribe;
  }, [mutation, watch]);

  if (error) return <p>Error loading data</p>;

  return (
    <div className="flex flex-grow flex-col">
      <form className="grid gap-4">
        <div className="flex items-center">
          <Label className="mr-2 w-48">Enter start date:</Label>
          <Input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
          />
          {errors.startDate && (
            <p className="text-xs text-red-600">{errors.startDate.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
