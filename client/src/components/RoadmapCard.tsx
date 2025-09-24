"use client";

// import { useEffect, useState } from "react";

import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "./ui/card";

import { Skill } from "@/app/user/page";
import { Progress } from "./ui/progress";
import Link from "next/link";

export default function RoadmapCard({ data }: { data: Skill }) {
  // console.log(data);
  // const skillBySlug = await getSkillBySlug(val.slug);
  // const [isTaken, setIsTaken] = useState(false);
  // useEffect(() => {
  //   const taken = localStorage.getItem(`taken-${data.slug}`);
  //   if (taken === "true") setIsTaken(true);
  // }, [data.slug]);
  const totalNode = data.roadmap.nodes.length;
  //let completedNode: number = 0;
  const completedNode = data.roadmap.nodes.filter(
    (val) => val.progress?.completed_at
  ).length;

  // data.roadmap.nodes.forEach((val) => {
  //   if (val.progress.completed_at !== null) completedNode++;
  // });
  console.log(completedNode);
  // console.log(completedNode);

  const skillProgress = Math.ceil((completedNode / totalNode) * 100);
  return (
    <>
      <Card className="p-4 rounded-xl shadow-sm transition-all duration-200">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full justify-between">
            <h3 className="text-lg font-semibold">{data.name}</h3>
            {totalNode !== completedNode ? (
              <Circle className="w-7 h-7 text-gray-600 mt-1" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-green-500 mt-1" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{data.description}</p>
          <span className="mt-2 inline-block text-xs font-medium px-2 py-1 rounded-md bg-purple-100 text-purple-600 w-fit">
            {data.category}
          </span>

          <div className="flex w-full items-center gap-4">
            <Progress value={skillProgress} />
            <p>{skillProgress}%</p>
          </div>

          <div className="flex w-full justify-between items-center mt-2">
            <p className="text-xs text-gray-500 mt-1">
              {totalNode !== completedNode ? (
                "Not Completed Yet"
              ) : (
                <>
                  Completed date:{" "}
                  <span className="font-medium">Mar 1, 2024</span>
                </>
              )}
            </p>
            <Link href={`/skill/${data.slug}`}>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition hover:cursor-pointer">
                View Tracker
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
}
