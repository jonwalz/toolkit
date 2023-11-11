"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import {
  Book,
  CheckCircle,
  Crosshair,
  Edit,
  Smile,
  BookOpen,
} from "react-feather";

import { cn } from "@/lib/utils";

export default function Sidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Book size="16px" />
              Progress log
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <CheckCircle size="16px" />
              Story accomplishments
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Crosshair size="16px" />
              Project Targets
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Edit size="16px" />
              Word count
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Smile size="16px" />
              Mindset
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen size="16px" />
              Journal prompts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
