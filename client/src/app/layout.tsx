import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { verifyToken } from "@/helpers/jwt";

export const metadata: Metadata = {
  title: "Learn Skill Map",
  description: "Platform buat bikin roadmap skill",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;

  let role: string | null = null;

  type UserBasic = { _id: string };
  type UserWithRole = { _id: string; role: string };

  if (token) {
    const userData = verifyToken(token) as UserBasic | UserWithRole;
    if ("role" in userData) {
      if (userData.role === "admin") {
        role = userData.role;
      }
    }
  }

  // console.log(role);

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        {token ? <Navbar userToken={token} /> : <Navbar />}
        <main>{children}</main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
