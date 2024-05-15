import "@/styles/globals.css";

import { NextUIProviderComp } from "../_providers/nextUIProvider";

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
    <NextUIProviderComp>
      <div className="border-t">
        <div className="dark:bg-custom-gradient-dark">
          <div className="grid">
            <div className="col-span-4 flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </NextUIProviderComp>
  );
}
