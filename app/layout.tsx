import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login Application",
  description: "Submission for Quality Professionals task.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation */}
        <div>
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
