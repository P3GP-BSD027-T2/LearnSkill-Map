"use client";

import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Mail } from "lucide-react";
import { Data } from "@/app/user/[userId]/page";
import Link from "next/link";

export default function ProfileCard({ data }: { data: Data }) {
  const splittedName = data.name.split(" ");
  const defaultPhoto: string =
    splittedName.length === 1
      ? `${splittedName[0][0]}`
      : `${splittedName[0][0]}${splittedName[1][0]}`;

  const totalSkills = data.progress.length;

  let completedSkills: number = 0;
  data.progress.forEach((val) => {
    if (val.completed_at !== null) completedSkills++;
  });

  // const ownedCourse = data.owned_course.length;
  // console.log(data?.owned_course?);

  return (
    <Card className="p-6 flex flex-col items-center md:items-start gap-6 rounded-2xl shadow-sm w-full">
      {/* Avatar */}
      <div className="flex gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/user.png" alt="Profile picture" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold text-xl">
              {defaultPhoto}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">{data.name}</h2>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            {data.email}
          </span>
        </div>
      </div>

      {/* User Info + Stats */}
      <div className="flex-1 flex flex-col w-full">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-2 text-center">
          <div className="flex flex-col items-center">
            <p className="text-purple-600 font-bold text-lg">{totalSkills}</p>
            <span className="text-sm text-muted-foreground">Roadmap</span>
          </div>
          {/* <div className="flex flex-col items-center">
            <p className="text-green-600 font-bold text-lg">
              {completedSkills}
            </p>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div> */}
          <div className="flex flex-col items-center">
            <p className="text-green-600 font-bold text-lg">
              {data?.owned_courses?.length}
            </p>
            <span className="text-sm text-muted-foreground">My Course</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-blue-600 font-bold text-lg">2</p>
            <span className="text-sm text-muted-foreground">Achievements</span>
          </div>
        </div>
      </div>
      <Link href="/" className="w-full">
        <button className="px-4 py-2 w-full rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 hover:cursor-pointer transition">
          View My Courses
        </button>
      </Link>
    </Card>
  );
}
