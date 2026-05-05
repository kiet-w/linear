import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { Sidebar } from "@/widgets/sidebar";
import { TopNav } from "@/widgets/top-nav";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevOS",
  description: "Engineering workspace for Linear-style project management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--color-background)] text-[var(--color-foreground)]">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="ml-64 flex min-h-screen flex-1 flex-col">
            <TopNav />
            <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
