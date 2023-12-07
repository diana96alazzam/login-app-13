import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get handler to logout user.
 * @param request
 * @returns API response
 */
export async function GET(req: NextRequest) {
  try {
    cookies().delete("accessToken");

    return NextResponse.json(
      {
        message: "User logged out successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          typeof error === "string"
            ? error
            : "An error occurred while trying to logout!",
      },
      {
        status: 500,
      }
    );
  }
}
