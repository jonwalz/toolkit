import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { NextUIProviderComp } from "./_providers/nextUIProvider";
import { Nav } from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Writer's Toolkit",
  description: "A toolkit for writers",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextUIProviderComp>
            <Nav />
            <div className="border-t">
              <div className="bg-background">
                <div className="grid lg:grid-cols-5">
                  <Sidebar className="hidden lg:block" />
                  <div className="px-2 py-5">{children}</div>
                </div>
              </div>
            </div>
          </NextUIProviderComp>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
