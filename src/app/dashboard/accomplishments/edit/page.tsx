"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const runtime = "edge";

export default function Edit() {
  const router = useRouter();

  useEffect(() => {
    async function handleRouteChange() {
      try {
        await router.push("/accomplishments");
      } catch (e) {
        console.error(e);
      }
    }

    void handleRouteChange();
  }, [router]);

  return null;
}
