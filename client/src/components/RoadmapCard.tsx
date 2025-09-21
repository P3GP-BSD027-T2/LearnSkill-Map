"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "./ui/card";
import Link from "next/link";
import { UserData } from "@/app/user/[userId]/page";

export default function RoadmapCard({ data }: { data: UserData }) {
  return (
    <>
      <Card className="p-4 rounded-xl shadow-sm transition-all duration-200">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-semibold">{data.skills.name}</h3>
            {data.completed_at === null ? (
              <Circle className="w-7 h-7 text-gray-600 mt-1" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-green-500 mt-1" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {data.skills.description}
          </p>
          <span className="mt-2 inline-block text-xs font-medium px-2 py-1 rounded-md bg-purple-100 text-purple-600 w-fit">
            {data.skills.category}
          </span>

          <div className="flex w-full justify-between items-center mt-2">
            <p className="text-xs text-gray-500 mt-1">
              {data.completed_at === null ? (
                "Not Completed"
              ) : (
                <>
                  Completed date:{" "}
                  <span className="font-medium">Mar 1, 2024</span>
                </>
              )}
            </p>
            <Link href="/">
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition hover:cursor-pointer">
                View Roadmap
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
}