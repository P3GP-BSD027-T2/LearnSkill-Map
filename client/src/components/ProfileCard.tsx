"use client";

import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Mail } from "lucide-react";

export default function ProfileCard() {
  return (
    <Card className="p-6 flex flex-col items-center md:items-start gap-6 rounded-2xl shadow-sm w-full">
      {/* Avatar */}
      <div className="flex gap-4">
        <div className="relative">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/user.png" alt="Profile picture" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold text-xl">
              AC
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">Alexander Chen</h2>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            alexander.chen@example.com
          </span>
        </div>
      </div>

      {/* User Info + Stats */}
      <div className="flex-1 flex flex-col gap-4 w-full">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-2 text-center">
          <div className="flex flex-col items-center">
            <p className="text-purple-600 font-bold text-lg">10</p>
            <span className="text-sm text-muted-foreground">Roadmap</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-green-600 font-bold text-lg">1</p>
            <span className="text-sm text-muted-foreground">Completed</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-blue-600 font-bold text-lg">2</p>
            <span className="text-sm text-muted-foreground">Achievements</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
