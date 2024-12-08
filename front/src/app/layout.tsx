import type { Metadata } from "next";
import "./globals.css";
import UniverseBackground from "@/components/UniverseBackground";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Nine months",
  description: "Time capsule from the past",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark relative">
        <UniverseBackground />
        <Header />
        <div className="relative z-10 pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}

