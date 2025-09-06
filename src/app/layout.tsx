import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS350 - Operating Systems Notes",
  description: "Comprehensive operating systems notes and study materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
