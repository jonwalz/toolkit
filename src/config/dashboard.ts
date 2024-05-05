import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Progress log",
      href: "/progress",
      icon: "penTool",
    },
    {
      title: "Accomplishments",
      href: "/accomplishments",
      icon: "award",
    },
    {
      title: "Project Targets",
      href: "/targets",
      icon: "crosshair",
    },
    {
      title: "Word count",
      href: "/count",
      icon: "calculator",
    },
    {
      title: "Mindset",
      href: "/mindset",
      icon: "smilePlus",
    },
    {
      title: "Journal prompts",
      href: "/journal",
      icon: "pencilLine",
    },
  ],
};
