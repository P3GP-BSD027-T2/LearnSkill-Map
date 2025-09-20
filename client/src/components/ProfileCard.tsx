"use client";

import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Mail } from "lucide-react";

export default function ProfileCard() {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-center gap-6 rounded-2xl shadow-sm w-full">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/user.png" alt="Profile picture" />
          <AvatarFallback className="bg-blue-500 text-white font-semibold text-2xl">
            AC
          </AvatarFallback>
        </Avatar>
        {/* Status Icon */}
      </div>

      {/* User Info */}
      <div className="flex-1 flex gap-2">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold">Alexander Chen</h2>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> alexander.chen@example.com
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col items-center">
            <p className="text-purple-600 font-bold text-lg">10</p>
            <span className="text-sm text-muted-foreground">Total Roadmap</span>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-green-600 font-bold text-lg">1</p>
            <span className="text-sm text-muted-foreground">
              Completed Roadmap
            </span>
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
