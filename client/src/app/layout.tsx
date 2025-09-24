import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Logo from "@/assets/logo.png";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { verifyToken } from "@/helpers/jwt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learn Skill Map",
  description: "Platform buat bikin roadmap skill",
  icons: {
    icon: "/logo.png", 
  },
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
      <body>
        {token ? <Navbar userToken={token} /> : <Navbar />}
        <main>{children}</main>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
