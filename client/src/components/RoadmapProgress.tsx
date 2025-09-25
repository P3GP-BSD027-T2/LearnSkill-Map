import { Target } from "lucide-react";
import { Progress } from "./ui/progress";
import RoadmapCard from "./RoadmapCard";
import { Data } from "@/app/user/page";
import Link from "next/link";

export default async function RoadmapProgress({ data }: { data: Data }) {
  const totalSkills =
    data.skills[0].roadmap._id === undefined ? 0 : data.skills.length;
  // const slug = data?.skills[0].slug;
  // console.log(slug);
  let completedSkills: number = 0;

  data.skills.forEach((val) => {
    let completedNode: number = 0;
    val.roadmap.nodes.forEach((val2) => {
      if (val2.progress.completed_at !== null) completedNode++;
    });
    if (val.roadmap.nodes.length === completedNode) completedSkills++;
  });

  const completedSkillBar = Math.ceil((completedSkills / totalSkills) * 100);
  return (
    <>
      <div className="p-6 flex flex-col items-start gap-8 rounded-2xl shadow-sm w-full border">
        <div className="flex gap-4 items-center w-full">
          <div className="flex items-center bg-blue-100 p-2 rounded-lg">
            <Target className=" text-blue-600 w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold text-xl">My Roadmaps</p>
            {totalSkills && totalSkills > 0 ? (
              <div className="flex gap-4 items-center">
                <Progress
                  value={completedSkillBar}
                  className="[&>div]:bg-blue-500"
                />
                <p>{completedSkillBar}%</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col px-4 w-full gap-4">
          {totalSkills && totalSkills > 0 ? (
            data.skills.map((val, idx) => <RoadmapCard data={val} key={idx} />)
          ) : (
            <p className="text-gray-400 text-center py-4">
              No skills available yet.
            </p>
          )}
        </div>
        {totalSkills && totalSkills > 0 ? (
          <Link href="/myroadmap" className="w-full">
            <button className="px-4 py-2 w-full rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 hover:cursor-pointer transition">
              View All My Roadmaps
            </button>
          </Link>
        ) : null}
      </div>
    </>
  );
}
