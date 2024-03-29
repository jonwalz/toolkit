import { dashboardConfig } from "@/config/dashboard";

// TODO: Figure this out with Supabase / trpc
// import { getCurrentUser } from "@/lib/session"
import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import { UserAccountNav } from "@/components/user-account-nav";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav items={dashboardConfig.mainNav} />
            <UserAccountNav />
          </div>
        </header>
        <div className="grid flex-1 gap-12 px-3 md:container md:grid-cols-[240px_1fr]">
          <aside className="hidden w-[240px] flex-col md:flex">
            <DashboardNav items={dashboardConfig.mainNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col">{children}</main>
        </div>
        <SiteFooter className="border-t" />
      </div>
    </TRPCReactProvider>
  );
}
