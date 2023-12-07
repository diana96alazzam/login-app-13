import { cookies } from "next/headers";
import Link from "next/link";

/**
 * Aside layout buttons component.
 */
export function AsideLayout() {
  const accessToken = cookies().get("accessToken")?.value;

  return (
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
      <div className="flex flex-wrap gap-4 justify-center my-4">
        {(accessToken
          ? [
              { id: "home", href: "/", label: "Home" },
              { id: "profile", href: "/profile", label: "Profile" },
              { id: "logout", href: "/logout", label: "Logout" },
            ]
          : [
              { id: "home", href: "/", label: "Home" },
              { id: "register", href: "/register", label: "Register" },
              { id: "login", href: "/login", label: "Login" },
            ]
        ).map((navItem) => (
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
  );
}
