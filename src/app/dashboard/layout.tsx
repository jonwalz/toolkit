import { dashboardConfig } from "@/config/dashboard";

import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { UserAccountNav } from "@/components/user-account-nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="container my-4 ml-4 hidden w-[240px] flex-col gap-6 rounded-xl bg-white py-4 pl-4 dark:bg-[rgba(55,70,85,1)] md:flex">
        <MainNav items={dashboardConfig.mainNav}>
          <UserAccountNav />
        </MainNav>
        <DashboardNav items={dashboardConfig.mainNav} />
      </aside>
      <div className="min-h-screen flex-1 gap-12 md:container md:grid-cols-[240px_1fr]">
        <main className="flex w-full max-w-full flex-col ">
          <header className="container sticky z-40 mt-4 flex h-12 max-w-[50%] items-center justify-center rounded-full border dark:bg-[rgba(55,70,85,1)]">
            <Link
              href="/"
              className="hidden items-center space-x-2 pl-2 md:flex"
            >
              <Icons.logo className="w-4" />
              <span className="hidden font-bold sm:inline-block">
                {siteConfig.title}
              </span>
            </Link>
          </header>
          {children}
        </main>
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </div>
  );
}
