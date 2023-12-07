import connectMongoDB from "../../../lib/mongodb/connect_db";
import User from "../../../lib/mongodb/models/user";
import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

/**
 * Get user details
 * @param request
 * @returns API response
 */
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();

    const cookieStore = cookies();

    const accessToken =
      request.headers.get("Authorization") ||
      cookieStore.get("accessToken")?.value;

    if (!accessToken) throw "No token provided";

    const decoded = decodeJwt(accessToken);

    const user = await User.findOne({ email: decoded.sub });

    return NextResponse.json(
      {
        message: "User details fetched successfully",
        details: {
          id: user._id,
          user_name: user.user_name,
          email: user.email,
          created_at: user.createdAt,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "An error occurred while getting user details! Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
