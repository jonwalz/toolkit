import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Progress log",
      href: "/dashboard/progress",
      icon: "penTool",
    },
    {
      title: "Accomplishments",
      href: "/dashboard/accomplishments",
      icon: "award",
    },
    {
      title: "Project Targets",
      href: "/dashboard/targets",
      icon: "crosshair",
    },
    {
      title: "Word count",
      href: "/dashboard/count",
      icon: "calculator",
    },
    {
      title: "Mindset",
      href: "/dashboard/mindset",
      icon: "smilePlus",
    },
    {
      title: "Journal prompts",
      href: "/dashboard/journal",
      icon: "pencilLine",
    },
  ],
};
