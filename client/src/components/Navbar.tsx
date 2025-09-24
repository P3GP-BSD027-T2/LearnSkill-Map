"use client";

import { Bell, LogOut, User, Menu } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { useState } from "react";
import { logoutHandler } from "@/server-action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({
  userToken,
  userAvatar,
}: {
  userToken?: string;
  userAvatar?: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  if (role) return null;
  return (
    <nav className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="LearnSkill Map Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <Link href="/" className="font-bold text-blue-800 text-lg sm:text-xl">
              LearnSkill Map
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            <Link href="/skill" className="hover:text-blue-600 transition">
              Browser
            </Link>
            <Link href="/courses" className="hover:text-blue-600 transition">
              Courses
            </Link>
            <Link href="/AI" className="hover:text-blue-600 transition">
              Roadmap AI
            </Link>
            <Link href="/user" className="hover:text-blue-600 transition">
              Profile
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            {userToken ? (
              <div className="relative flex items-center gap-2">
                {/* Avatar + Online Indicator */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt="User Avatar"
                      width={36}
                      height={36}
                      className="rounded-full border border-gray-300"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-700" />
                  )}
                  {/* Online circle */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-12 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/account">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                  <User className="w-4 h-4" />
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white border-t border-gray-200 py-2 px-4">
            <Link href="/skill" className="block text-gray-700 hover:text-blue-600">
              Browser
            </Link>
            <Link href="/courses" className="block text-gray-700 hover:text-blue-600">
              Courses
            </Link>
            <Link href="/AI" className="block text-gray-700 hover:text-blue-600">
              Roadmap AI
            </Link>
            <Link href="/user" className="block text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            {userToken && (
              <button
                onClick={logoutHandler}
                className="w-full text-left flex items-center gap-2 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
