import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./helpers/jwt";
import { cookies } from "next/headers";

export const config = {
  runtime: "nodejs",
};

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/user")||request.nextUrl.pathname.startsWith("/request-roadmap")) {
    const cookieStorage = await cookies();
    const token = cookieStorage.get("token");

    if (!token) {
      const loginUrl = new URL("/account", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const userData = verifyToken(token.value) as {
      _id: string;
    };

    const requestHeaders = new Headers(request.headers);

    requestHeaders.set("x-user-id", userData._id);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
