import { dashboardConfig } from "@/config/dashboard";

// TODO: Figure this out with Supabase / trpc
// import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <div className="flex min-h-screen">
        <aside className="container my-4 ml-4 hidden w-[240px] flex-col gap-6 rounded-xl bg-white py-4 pl-4 md:flex">
          <MainNav items={dashboardConfig.mainNav} />
          <DashboardNav items={dashboardConfig.mainNav} />
        </aside>
        <div className="min-h-screen flex-1 gap-12 md:container md:grid-cols-[240px_1fr]">
          <main className="flex w-full max-w-full flex-col ">
            <header className="container sticky z-40 mt-2 flex h-16 max-w-[50%] items-center justify-center rounded-full border-b bg-background py-4">
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
      </div>
      {/* <SiteFooter className="border-t" /> */}
    </TRPCReactProvider>
  );
}
