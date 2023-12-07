import connectMongoDB from "../../../lib/mongodb/connect_db";
import User from "../../../lib/mongodb/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJWT } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

/**
 * Post handler to login with user credentials.
 * @param request
 * @returns API response
 */
export async function POST(request: {
  json: () => Record<"email" | "password", string>;
}) {
  try {
    const { email, password } = await request.json();

    await connectMongoDB();

    const user = await User.findOne({ email });

    if (!(user && bcrypt.compareSync(password, user.password))) {
      throw "Username or password don't match, please make sure to enter matching password and email.";
    }

    const accessToken = await signJWT({ sub: user.email });

    cookies().set("accessToken", accessToken, { secure: true });

    return NextResponse.json(
      {
        message: "Logged in successfully!",
        accessToken,
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
            : "An error occurred while trying to login!",
      },
      {
        status: 500,
      }
    );
  }
}
