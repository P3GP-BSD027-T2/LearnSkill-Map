import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./helpers/jwt";
import { cookies } from "next/headers";

export type UserBasic = { _id: string };
export type UserWithRole = { _id: string; role: string };

export const config = {
  runtime: "nodejs",
};

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Daftar route publik yang tidak perlu token
  const publicPaths = [
    "/account",
    "/",
    "/skill",
    "/AI",
    "/courses",
    "/skill/[slug]",
  ];
  const staticPaths = ["/_next", "/favicon.ico", "/assets"];

  // Lewati route publik dan static
  if (
    publicPaths.includes(pathname) ||
    staticPaths.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/skill") ||
    pathname.startsWith("/AI") ||
    pathname.startsWith("/courses") ||
    pathname.startsWith("/payment")
  ) {
    return NextResponse.next();
  }

  // Ambil token dari cookie
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token");

  if (!token) {
    // Token tidak ada → redirect ke halaman login/account
    return NextResponse.redirect(new URL("/account", request.url));
  }

  let userData: UserBasic | UserWithRole;

  try {
    userData = verifyToken(token.value) as UserBasic | UserWithRole;
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(new URL("/account", request.url));
  }

  // Admin → hanya boleh ke /admin
  if ("role" in userData && userData.role === "admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  const userRoutes = [
    "/user",
    "/request-roadmap",
    "/mycourses",
    "/myroadmap",
    "/courses",
    "/payment",
  ];
  if (userRoutes.some((route) => pathname.startsWith(route))) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userData._id);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.redirect(new URL("/", request.url));
};
