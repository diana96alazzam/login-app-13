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
    <form onSubmit={LoginHandler}>
      {/* Email input */}
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required minLength={2} maxLength={320} />
      {/* Password input */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        minLength={6}
        maxLength={256}
      />
      {/* Login button */}
      <button type="submit">Login</button>
    </form>
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
