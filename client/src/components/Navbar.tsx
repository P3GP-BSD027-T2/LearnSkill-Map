"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<null | { name: string }>(null);
  const pathName = usePathname();
  const hiddenRoutes = ["/account"];

  if (hiddenRoutes.includes(pathName)) return null;

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
      <div className="flex items-center ">
        <Image
          src={Logo}
          alt="LearnSkill Map Logo"
          width={38}
          height={38}
          className="rounded-md"
        />
        <span className="font-semibold text-blue-800 text-base">
          LearnSkill Map
        </span>
      </div>

      <div className="hidden md:flex space-x-3 text-sm text-gray-700">
        <a href="#" className="hover:text-blue-600 transition">
          Browse
        </a>
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

      {/* Right */}
      <div className="flex items-center space-x-2">
        <button className="p-1.5 rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {user ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-700">
            {user.name[0].toUpperCase()}
          </div>
        ) : (
          <button
            onClick={() => setUser({ name: "John Doe" })}
            className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
