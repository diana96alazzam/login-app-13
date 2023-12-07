import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AsideLayout } from "@/components/aside_layout";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login Application",
  description: "Submission for Quality Professionals task.",
};

/**
 * Layout component.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-rose-100 flex justify-center items-center h-screen`}
      >
        <main className="flex bg-white shadow-2xl w-2/3 rounded-md">
          {children}
          <AsideLayout />
        </main>
      </body>
    </html>
  );
}
