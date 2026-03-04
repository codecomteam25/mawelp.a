import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mawel P.A — Land Sales Management",
  description: "Professional land sales management system for Ghana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <ConvexClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
