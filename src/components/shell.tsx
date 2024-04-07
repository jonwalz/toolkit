import * as React from "react";

import { cn } from "@/lib/utils";

export function Shell({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("grid items-start gap-8 px-4 py-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
