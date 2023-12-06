"use client";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";

/**
 * Register page component.
 */
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handler used to update form data.
   */
  const UpdateFormDataHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  /**
   * Register handler used to call register API.
   */
  const RegisterHandler = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setIsLoading(true);

      const results = await fetch("/api/user/register", {
        method: "post",
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (results.status === 201) {
        console.log("User registered successfully!");
      } else {
        console.log("Error while registering user!");
      }
    },
    [formData]
  );

  return (
    <section className="flex-1 w-1/2 rounded-sm rounded-md">
      <form
        className="flex flex-col justify-center p-12 w-100 h-full"
        onSubmit={RegisterHandler}
      >
        {/* Username input */}
        {/* <label htmlFor="user_name">Username</label> */}
        <input
          type="user_name"
          name="user_name"
          placeholder="Username"
          required
          minLength={2}
          maxLength={16}
          onChange={UpdateFormDataHandler}
          className="bg-gray-100 shadow-md rounded mb-4 p-2 text-sm"
        />
        {/* Email input */}
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength={2}
          maxLength={320}
          onChange={UpdateFormDataHandler}
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
          onChange={UpdateFormDataHandler}
          pattern={
            formData.confirm_password
              ? `^${formData.confirm_password}$`
              : undefined
          }
          className="bg-gray-100 shadow-md rounded mb-4 p-2 text-sm"
        />
        {/* Confirm password input */}
        {/* <label htmlFor="confirm_password">Confirm password</label> */}
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          required
          minLength={6}
          maxLength={256}
          onChange={UpdateFormDataHandler}
          pattern={formData.password ? `^${formData.password}$` : undefined}
          className="bg-gray-100 shadow-md rounded mb-4 p-2 text-sm"
        />
        {/* Register button */}
        <button
          type="submit"
          className="bg-rose-500 hover:bg-opacity-80 p-2 mt-2 rounded-md text-white text-sm text-center shadow-lg"
        >
          Register
        </button>
      </form>
    </section>
  );
}
