import "~/styles/globals.css";

import { type Metadata } from "next";

import Link from "next/link";
import { ModeToggle } from "~/components/mode-toggle";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";
import EventFeed from "./_components/event-feed";

export const metadata: Metadata = {
  title: "P4nth3r NPC | Quests",
  description: "P4nth3r Quests Comapanion App",
  icons: [
    {
      rel: "icon",
      url: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%25%22 y=%220.95em%22 text-anchor=%22middle%22 font-size=%2290px%22>${`📜`}</text></svg>`,
    },
  ],
};

const TopNav = () => {
  return (
    <div className="flex justify-between">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">⭐</h1>
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
        <Link href={"/"}>p4nth3r.npc</Link>
      </h1>
      <ModeToggle />
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={
        "font-sans flex min-h-screen w-full items-center justify-center bg-background p-4 antialiased"
      }
    >
      <body className="flex h-full w-full max-w-screen-md flex-col gap-4">
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopNav />
            {children}
            <EventFeed />
            <Toaster />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
