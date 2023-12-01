import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { NextUIProviderComp } from "../_providers/nextUIProvider";

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
    <TRPCReactProvider cookies={cookies().toString()}>
      <NextUIProviderComp>
        <div className="border-t">
          <div className="bg-background">
            <div className="grid">
              <div className="col-span-4 flex flex-col items-center justify-center px-2 py-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </NextUIProviderComp>
    </TRPCReactProvider>
  );
}
