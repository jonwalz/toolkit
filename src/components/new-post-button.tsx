"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function NewPostButton() {
  const handleOnClick = () => {
    // TODO: Open log modal? Or new page?
    console.log("HIT");
  };

  return (
    <button onClick={handleOnClick} className={cn(buttonVariants())}>
      New post
    </button>
  );
}
