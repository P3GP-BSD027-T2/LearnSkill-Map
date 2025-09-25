import { Award } from "lucide-react";
import AchievementCard from "./AchievementCard";
import { Data } from "@/app/user/page";
import { formatDate } from "@/helpers/formatDate";

export default function Achievement({ data }: { data: Data }) {
  const achievements = data.earned_achievements;
  // console.log(achievements);
  return (
    <>
      <div className="p-6 flex flex-col items-center gap-8 rounded-2xl shadow-sm w-full border">
        <div className="flex gap-4 items-center w-full">
          <div className="flex items-center bg-amber-100 p-2 rounded-lg">
            <Award className=" text-amber-600 w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold text-xl">Achievements</p>
          </div>
        </div>

        <div className="flex flex-col px-4 w-full gap-2">
          {data.earned_achievements.length > 0 ? (
            achievements.map((val, idx) => (
              <AchievementCard
                key={idx}
                title={val.title}
                description={val.description}
                earnedDate={formatDate(val.created_at)}
              />
            ))
          ) : (
            <p className="w-full text-center text-gray-400">
              No achievements yet.
            </p>
          )}
          {/* <AchievementCard /> */}
        </div>
      </div>
    </>
  );
}
