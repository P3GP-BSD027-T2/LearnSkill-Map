import { Target } from "lucide-react";
import { Progress } from "./ui/progress";
import RoadmapCard from "./RoadmapCard";
import { Data } from "@/app/user/[userId]/page";

export default function RoadmapProgress({ data }: { data: Data }) {
  const totalSkills = data.progress.length;

  let completedSkills: number = 0;
  data.progress.forEach((val) => {
    if (val.completed_at !== null) completedSkills++;
  });

  const userProgress = (completedSkills / totalSkills) * 100;
  return (
    <>
      <div className="p-6 flex flex-col items-start gap-8 rounded-2xl shadow-sm w-full border">
        <div className="flex gap-4 items-center w-full">
          <div className="flex items-center bg-blue-100 p-2 rounded-lg">
            <Target className=" text-blue-600 w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold text-xl">Your Roadmaps</p>
            <div className="flex gap-2 items-center">
              <Progress value={userProgress} className="[&>div]:bg-blue-500" />
              <p>{userProgress}%</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-4 w-full gap-4">
          {data.progress.map((val, idx) => (
            <RoadmapCard data={val} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}
