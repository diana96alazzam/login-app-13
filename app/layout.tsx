import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
      <body
        className={`${roboto.className} bg-rose-100 flex justify-center items-center h-screen`}
      >
        <main
          className="flex bg-white shadow-2xl w-2/3 rounded-md"
          style={{ height: "80vh" }}
        >
          {children}
          <aside className="flex flex-1 flex-col gap-3 justify-center items-center bg-gradient-to-br from-rose-500 to-indigo-500 rounded-r-md">
            <h1 className="text-white text-xl font-bold text-center">
              Quality Professionals
            </h1>
            <h2 className="text-white text-lg font-bold text-center">
              Login Application
            </h2>
            <h3 className="text-white text-md font-bold text-center">
              Diana Alazzam
            </h3>
            {/* Navigation */}
            <div className="flex flex-wrap gap-4 justify-center my-4">
              {[
                { id: "home", href: "/", label: "Home" },
                { id: "register", href: "/register", label: "Register" },
                { id: "login", href: "/login", label: "Login" },
              ].map((navItem) => (
                <Link
                  key={navItem.id}
                  href={navItem.href}
                  className="bg-rose-500 hover:bg-opacity-40 p-2 rounded-md text-white text-sm text-center shadow-lg"
                >
                  {navItem.label}
                </Link>
              ))}
            </div>
          </aside>
        </main>
      </body>
    </html>
  );
}
