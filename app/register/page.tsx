"use client";
import { AsideLayout } from "@/components/aside_layout";
import { Input } from "@/components/input";
import { Spinner } from "@/components/spinner";
import { SubmitButton } from "@/components/submit_button";
import { useState, useCallback, ChangeEvent, FormEvent } from "react";

/**
 * Register page component.
 */
export default function RegisterPage() {
  /**
   * State used to store register form data.
   */
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  /**
   * State used to track loading for form.
   */
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

      const results = await fetch("/api/register", {
        method: "post",
        body: JSON.stringify(formData),
      });

      setIsLoading(false);

      if (results.status === 201) {
        alert("User registered successfully!");
      } else {
        alert("Error while registering user!");
      }
    },
    [formData]
  );

  return (
    <>
      <section className="flex-1 w-1/2 rounded-sm rounded-md">
        <Spinner isLoading={isLoading} />
        {!isLoading && (
          <form
            className="flex flex-col justify-center p-12 w-full h-full"
            onSubmit={RegisterHandler}
          >
            {/* Username input */}
            <Input
              type="text"
              name="user_name"
              placeholder="Username"
              required
              onChange={UpdateFormDataHandler}
            />
            {/* Email input */}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={UpdateFormDataHandler}
            />
            {/* Password input */}
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={UpdateFormDataHandler}
              pattern={
                formData.confirm_password
                  ? `^${formData.confirm_password}$`
                  : undefined
              }
            />
            {/* Confirm password input */}
            <Input
              type="password"
              name="confirm_password"
              placeholder="Confirm password"
              required
              onChange={UpdateFormDataHandler}
              pattern={formData.password ? `^${formData.password}$` : undefined}
            />
            {/* Register button */}
            <SubmitButton text="Register" />
          </form>
        )}
      </section>
      <AsideLayout />
    </>
  );
}
