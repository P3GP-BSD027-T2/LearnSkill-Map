import { Award } from "lucide-react";
import AchievementCard from "./AchievementCard";

export default function Achievement() {
  return (
    <>
      <div className="p-6 flex flex-col items-center gap-8 rounded-2xl shadow-sm w-full border">
        <div className="flex gap-4 items-center w-full">
          <div className="flex items-center bg-amber-100 p-2 rounded-lg">
            <Award className=" text-amber-600 w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold text-xl">Your Achievements</p>
          </div>
        </div>

        <div className="flex flex-col px-4 w-full">
          <AchievementCard />
        </div>
      </div>
    </>
  );
}
