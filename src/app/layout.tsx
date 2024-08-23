import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { ModeToggle } from "~/components/mode-toggle";
import { ThemeProvider } from "~/components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import Footer from "./_components/footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "P4nth3r NPC | Quests",
  description: "P4nth3r Quests Comapanion App",
  icons: [{ rel: "icon", url: "./favicon.ico" }],
};

const TopNav = () => {
  return (
    <div className="flex justify-between">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        P4nth3r.NPC
      </h3>
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
        "flex min-h-screen w-full items-center justify-center bg-background p-4 font-sans antialiased"
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
            <Footer />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
