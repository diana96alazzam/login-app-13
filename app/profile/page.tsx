"use client";
import { Spinner } from "@/components/spinner";
import { useCallback, useState, useEffect } from "react";

export default function Profile() {
  /**
   * State to track loading
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * State to save profile data.
   */
  const [profileData, setProfileData] = useState<{
    user_name: string;
    email: string;
    created_at: string;
  } | null>(null);

  /**
   * Memoized function to fetch user details.
   */
  const GetUserProfile = useCallback(async () => {
    setIsLoading(true);

    const results = await fetch("/api/user", {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("accessToken") || "",
      },
    });

    setIsLoading(false);

    if (results.status === 200) {
      const data = await results.json();
      setProfileData(data.details);
    } else {
      console.log("Error while trying to Fetch user profile!");
    }
  }, []);

  useEffect(() => {
    GetUserProfile();
  }, [GetUserProfile]);

  return (
    <section className="flex-1 w-1/2 rounded-sm rounded-md">
      <div className="flex flex-col justify-center items-center p-12 w-100 h-full">
        <h4 className="text-2xl font-extrabold text-center mb-6">Profile</h4>
        <Spinner isLoading={isLoading} />
        {profileData && !isLoading && (
          <table>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 bg-gray-100">Username</td>
                <td className="p-2">{profileData?.user_name}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 bg-gray-100">Email</td>
                <td className="p-2">{profileData?.email}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 bg-gray-100">Create at</td>
                <td className="p-2">{profileData?.created_at}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
