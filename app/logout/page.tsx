"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

/**
 * Logout redirect component.
 */
export default function LogoutPage() {
  const router = useRouter();

  /**
   * Logout handler used to call logout API.
   */
  const LogoutHandler = useCallback(async () => {
    const results = await fetch("/api/logout", {
      method: "get",
    });

    if (results.status === 200) {
      localStorage.clear();
      router.refresh();
      router.push("/");
    } else {
      alert("Error while trying to logout!");
    }
  }, [router]);

  useEffect(() => {
    LogoutHandler();
  }, [LogoutHandler]);

  return <div />;
}
