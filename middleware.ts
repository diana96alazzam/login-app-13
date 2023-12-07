import { verifyJWT } from "@/lib/jwt/jwt";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: "/api/user/:path*",
};

export function middleware(request: NextRequest) {
  const accessToken = request.headers.get("Authorization");

  if (!accessToken || !verifyJWT(accessToken)) {
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 }
    );
  }
}
