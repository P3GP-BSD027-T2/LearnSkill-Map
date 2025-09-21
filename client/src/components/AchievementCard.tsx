import { Award } from "lucide-react";
import { Card } from "./ui/card";

export default function AchievementCard() {
  return (
    <>
      <Card className="p-4 flex items-start gap-4 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md hover:border-amber-300 hover:bg-amber-50 cursor-pointer">
        <div className="flex flex-col gap-1">
          <div className="w-full flex justify-between mb-2 items-center">
            <h3 className="text-md font-semibold">Frontend Developer</h3>
            <Award className="w-7 h-7 text-amber-600 mt-1" />
          </div>
          <p className="text-xs text-muted-foreground">
            Step by step guide to becoming a modern frontend developer in 2025
          </p>

          <p className="text-xs text-amber-500 mt-1">
            Earned on: <span className="font-medium">Mar 7, 2024</span>
          </p>
        </div>
      </Card>
    </>
  );
}
