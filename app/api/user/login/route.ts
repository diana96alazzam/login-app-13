import connectMongoDB from "../../../../mongodb_config/connect_db";
import User from "../../../../mongodb_config/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

    return NextResponse.json(
      {
        message: "Logged in successfully!",
      },
      {
        status: 200,
      }
    );

    // TODO: Check jwt token
    // // create a jwt token that is valid for 7 days
    // const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
    //   expiresIn: "7d",
    // });

    // return {
    //   ...user.toJSON(),
    //   token,
    // };
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
