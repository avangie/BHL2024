import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Last nine months",
  description: "Time capsule from the past",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        {children}
      </body>
    </html>
  );
}
