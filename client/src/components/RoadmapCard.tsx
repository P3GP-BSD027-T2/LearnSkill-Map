"use client";

import { CheckCircle2, Circle, CircleChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";

export default function RoadmapCard() {
  return (
    <div className="flex flex-col gap-4">
      {/* Roadmap Selesai */}
      <Card className="p-4 flex items-start gap-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:border-green-300 hover:bg-green-50">
        <div className="w-full flex justify-between">
          <CheckCircle2 className="w-7 h-7 text-green-500 mt-1" />
          <Link href={"/"} className="text-blue-500 text-sm">
            View Roadmap
          </Link>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-lg font-semibold">Frontend Developer</h3>
          <p className="text-sm text-muted-foreground">
            Step by step guide to becoming a modern frontend developer in 2025
          </p>
          <span className="mt-2 inline-block text-xs font-medium px-2 py-1 rounded-md bg-purple-100 text-purple-600 w-fit">
            Programming
          </span>

          <div className="bg-gray-100 rounded-md py-2 px-4 text-sm">
            <p className="font-semibold">Paid courses:</p>
            <ul className="list-disc list-inside ml-2">
              <li>
                <Link
                  className="hover:cursor-pointer hover:text-blue-800 underline text-blue-500"
                  href={"https://www.w3schools.com/html/"}
                >
                  Belajar HTML
                </Link>
              </li>
              <li>
                <Link
                  className="hover:cursor-pointer hover:text-blue-800 underline text-blue-500"
                  href={"https://www.w3schools.com/css/"}
                >
                  Belajar CSS
                </Link>
              </li>
              <li>
                <Link
                  className="hover:cursor-pointer hover:text-blue-800 underline text-blue-500"
                  href={"https://tailwindcss.com/docs/"}
                >
                  Belajar Tailwind
                </Link>
              </li>
            </ul>
          </div>

          <p className="text-xs text-gray-500 mt-1">
            Started date: <span className="font-medium">Mar 1, 2024</span>
          </p>
        </div>
      </Card>

      {/* Roadmap Belum Selesai */}
      <Card className="p-4 flex items-start gap-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:border-green-300 hover:bg-green-50">
        <div className="w-full flex justify-between">
          <Circle className="w-7 h-7 text-gray-400 mt-1" />
          <Link href={"/"} className="text-blue-500 text-sm">
            View Roadmap
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Backend Developer</h3>
          <p className="text-sm text-muted-foreground">
            Roadmap untuk memahami backend dengan Node.js, database, dan API.
          </p>
          <span className="mt-2 inline-block text-xs font-medium px-2 py-1 rounded-md bg-blue-100 text-blue-600 w-fit">
            Programming
          </span>
          <div className="bg-gray-100 rounded-md py-2 px-4 text-sm">
            <p className="font-semibold">Paid courses:</p>
            <ul className="list-disc list-inside ml-2">
              <li>
                <Link
                  className="hover:cursor-pointer hover:text-blue-800 underline text-blue-500"
                  href={"https://www.w3schools.com/html/"}
                >
                  Belajar HTML
                </Link>
              </li>
              <li>
                <Link
                  className="hover:cursor-pointer hover:text-blue-800 underline text-blue-500"
                  href={"https://www.w3schools.com/css/"}
                >
                  Belajar CSS
                </Link>
              </li>
              <li>
                <Link
                  className="hover:cursor-pointer hover:text-blue-800 underline text-blue-500"
                  href={"https://tailwindcss.com/docs/"}
                >
                  Belajar Tailwind
                </Link>
              </li>
            </ul>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Started date: <span className="font-medium">Apr 10, 2024</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
