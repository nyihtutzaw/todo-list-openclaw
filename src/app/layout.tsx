import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo List OpenClaw",
  description: "A staging-ready todo list built with Next.js, TypeScript, Tailwind, Prisma, and MySQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
