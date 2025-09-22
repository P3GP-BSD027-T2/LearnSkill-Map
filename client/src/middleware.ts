import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./helpers/jwt";
import { cookies } from "next/headers";

export const config = {
  runtime: "nodejs",
};

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  const cookieStorage = await cookies();
  const token = cookieStorage.get("token");

  if (!token) {
    // Tidak ada token, redirect ke login
    return NextResponse.redirect(new URL("/account", request.url));
  }

  type UserBasic = { _id: string };
  type UserWithRole = { _id: string; role: string };

  const userData = verifyToken(token.value) as UserBasic | UserWithRole;

  // Kalau admin → hanya boleh di /admin
  if ("role" in userData && userData.role === "admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Kalau user biasa → hanya boleh di route user
  const userRoutes = ["/user", "/request-roadmap", "/mycourses", "/myroadmap"];

  if (userRoutes.some((route) => pathname.startsWith(route))) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userData._id);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  // Kalau bukan route yang boleh user akses, lempar ke home
  return NextResponse.redirect(new URL("/", request.url));
};
