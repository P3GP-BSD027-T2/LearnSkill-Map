"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "./ui/button";
import { logoutHandler } from "@/server-action";

export default function Navbar({ userToken }: { userToken?: string }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-8 flex items-center justify-between">
      <div className="flex items-center ">
        <Image
          src={Logo}
          alt="LearnSkill Map Logo"
          width={38}
          height={38}
          className="rounded-md"
        />

        <Link href="/" className="font-semibold text-blue-800 text-base">
          LearnSkill Map
        </Link>
      </div>

      <div className="hidden md:flex space-x-3 text-sm text-gray-700 gap-5 ">
        <Link href={"/roadmap"} className="hover:text-blue-600 transition">
          Browser
        </Link>
        <a href="#" className="hover:text-blue-600 transition">
          My Learning
        </a>
        <a href="#" className="hover:text-blue-600 transition">
          Achievements
        </a>
        <Link href={"/user/1"} className="hover:text-blue-600 transition">
          Profile
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {userToken ? (
          <Button
            type="button"
            className="rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        ) : (
          <Link href="/account">
            <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
