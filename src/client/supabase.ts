"use client";
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  // process.env.NEXT_PUBLIC_SUPABASE_URL!,
  "https://ivyetfewzyvpkmjdtyiy.supabase.co",
  // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2eWV0ZmV3enl2cGttamR0eWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2NDI4MTcsImV4cCI6MjAxNTIxODgxN30.Po-imTOcr7fybNqGo1Vkuub2Wyyl5sqxqBX2nHJlw5s",
);
