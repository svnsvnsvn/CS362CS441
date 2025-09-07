import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "CS427 & CS441 - Course Notes",
  description: "Personal study notes for Operating Systems (CS-441) and Intrusion Detection Systems (CS-427)",
  icons: {
    icon: '/note_icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
