"use client";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";

/**
 * Login page component
 */
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const LoginHandler = useCallback(async (e: LoginFormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const results = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    setIsLoading(false);

    if (results.status === 201) {
      console.log("User logged in successfully!");
    } else {
      console.log("Error while trying to login!");
    }
  }, []);

  return (
    <section className="flex-1 w-1/2 rounded-sm rounded-md">
      <form
        className="flex flex-col justify-center p-12 w-100 h-full"
        onSubmit={LoginHandler}
      >
        {/* Email input */}
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength={2}
          maxLength={320}
          className="bg-gray-100 shadow-md rounded mb-4 p-2 text-sm"
        />
        {/* Password input */}
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          maxLength={256}
          className="bg-gray-100 shadow-md rounded mb-4 p-2 text-sm"
        />
        {/* Login button */}
        <button
          type="submit"
          className="bg-rose-500 hover:bg-opacity-80 p-2 mt-2 rounded-md text-white text-sm text-center shadow-lg"
        >
          Login
        </button>
      </form>
    </section>
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
