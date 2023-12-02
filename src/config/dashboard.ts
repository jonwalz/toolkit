import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Progress log",
      href: "/progress",
      icon: "post",
    },
    {
      title: "Story accomplishments",
      href: "/accomplishments",
      icon: "post",
    },
    {
      title: "Project Targets",
      href: "/targets",
      icon: "post",
    },
    {
      title: "Word count",
      href: "/count",
      icon: "post",
    },
    {
      title: "Mindset",
      href: "/mindset",
      icon: "post",
    },
    {
      title: "Journal prompts",
      href: "/journal",
      icon: "post",
    },
  ],
}
