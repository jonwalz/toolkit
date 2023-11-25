"use client";

import React from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Book,
  CheckCircle,
  Crosshair,
  Edit,
  Smile,
  BookOpen,
} from "react-feather";

import { cn } from "~/@/lib/utils";

export default function Sidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              href="/progress"
              as={Link}
              variant="ghost"
              className="w-full justify-start"
            >
              <Book size="16px" />
              Progress log
            </Button>
            <Button
              href="/accomplishments"
              as={Link}
              variant="ghost"
              className="w-full justify-start"
            >
              <CheckCircle size="16px" />
              Story accomplishments
            </Button>
            <Button
              href="targets"
              as={Link}
              variant="ghost"
              className="w-full justify-start"
            >
              <Crosshair size="16px" />
              Project Targets
            </Button>
            <Button
              href="count"
              as={Link}
              variant="ghost"
              className="w-full justify-start"
            >
              <Edit size="16px" />
              Word count
            </Button>
            <Button
              href="mindset"
              as={Link}
              variant="ghost"
              className="w-full justify-start"
            >
              <Smile size="16px" />
              Mindset
            </Button>
            <Button
              href="journal"
              as={Link}
              variant="ghost"
              className="w-full justify-start"
            >
              <BookOpen size="16px" />
              Journal prompts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
