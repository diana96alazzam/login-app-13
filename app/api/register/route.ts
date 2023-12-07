import connectMongoDB from "../../../lib/mongodb/connect_db";
import User from "../../../lib/mongodb/models/user";
import { NextRequest, NextResponse } from "next/server";
import { mongodb_codes } from "../../../lib/mongodb/mongodb_codes";

/**
 * Post handler to register user in the DB.
 * @param request
 * @returns API response
 */
export async function POST(request: NextRequest) {
  try {
    const { user_name, email, password } = await request.json();

    await connectMongoDB();

    await User.create({
      user_name,
      email,
      password,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    // Return error for unique value validation
    const asserted_error = error as { code: number; keyValue: object };
    if (asserted_error?.code === mongodb_codes.duplicate_Key) {
      return NextResponse.json(
        {
          message: `${Object.values(
            asserted_error.keyValue
          )} is already used, please choose a different value.`,
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        message:
          "An error occurred while registering the user! Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}
