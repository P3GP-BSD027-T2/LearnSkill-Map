import { Target } from "lucide-react";
import { Progress } from "./ui/progress";
import RoadmapCard from "./RoadmapCard";

export default function RoadmapProgress() {
  return (
    <>
      <div className="p-6 flex flex-col items-center gap-8 rounded-2xl shadow-sm w-full border col-span-2">
        <div className="flex gap-4 items-center w-full">
          <div className="flex items-center bg-blue-100 p-2 rounded-lg">
            <Target className=" text-blue-600 w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold text-xl">Your Roadmaps</p>
            <div className="flex gap-2 items-center">
              <Progress value={50} className="[&>div]:bg-blue-500" />
              <p>50%</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-4 w-full">
          <RoadmapCard />
        </div>
      </div>
    </>
  );
}
