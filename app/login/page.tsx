"use client";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { SubmitButton } from "@/components/submit_button";
import { Input } from "@/components/input";
import { AsideLayout } from "@/components/aside_layout";

/**
 * Login page component
 */
export default function LoginPage() {
  const router = useRouter();

  /**
   * State used to track loading for form.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login handler used to call login API.
   */
  const LoginHandler = useCallback(
    async (e: LoginFormEvent) => {
      e.preventDefault();

      setIsLoading(true);

      const results = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (results.status === 200) {
        const data = await results.json();
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/profile");
        router.refresh();
      } else {
        alert("Error while trying to login!");
        setIsLoading(false);
      }
    },
    [router]
  );

  return (
    <>
      <section className="flex-1 w-1/2 rounded-sm rounded-md">
        <Spinner isLoading={isLoading} />
        {!isLoading && (
          <form
            className="flex flex-col justify-center p-12 w-100 h-full"
            onSubmit={LoginHandler}
          >
            {/* Email input */}
            <Input type="email" name="email" placeholder="Email" required />
            {/* Password input */}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            {/* Login button */}
            <SubmitButton text="Login" />
          </form>
        )}
      </section>
      <AsideLayout />
    </>
  );
}

/**
 * Page types
 */
interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    email: {
      value: string;
    };
    password: {
      value: string;
    };
  };
}
