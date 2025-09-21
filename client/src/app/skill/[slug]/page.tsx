"use client";

import { useEffect, useState, JSX } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // ✅ pakai shadcn Progress
import Link from "next/link";

interface NodeData {
  _id: string;
  title: string;
  description: string;
  order: number;
  estimated_hours: number;
  prerequisites: string[];
  courses: {
    _id: string;
    title: string;
    price?: number;
    thumbnail?: string;
    summary?: string;
    currency?: string;
    duration?: number;
    level?: string;
    slug?: string;
    relevance_score?: number;
  }[];
  status?: "review" | "continue" | "next" | "locked";
}

interface Skill {
  name: string;
  description: string;
  nodes: NodeData[];
}

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<Skill>(
          `https://n8n.self-host.my.id/webhook/4c167dde-64b5-44b8-86b9-73c5b92f88fc/lsm/skills/${slug}`
        );
        setSkill(res.data);
      } catch {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!skill) return <p>Skill tidak ditemukan</p>;

  const statusConfig: Record<
    NonNullable<NodeData["status"]>,
    { icon: JSX.Element; badge: string; border: string; bg: string }
  > = {
    review: {
      icon: <div className="w-4 h-4 rounded-full bg-yellow-400"></div>,
      badge: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-300",
      bg: "bg-white",
    },
    continue: {
      icon: <div className="w-4 h-4 rounded-full bg-green-500"></div>,
      badge: "bg-green-100 text-green-700",
      border: "border-green-400",
      bg: "bg-green-50",
    },
    next: {
      icon: <div className="w-3.5 h-3.5 rounded-full bg-blue-500"></div>,
      badge: "bg-blue-100 text-blue-700",
      border: "border-blue-200",
      bg: "bg-white",
    },
    locked: {
      icon: <div className="w-4 h-4 rounded-full bg-gray-400"></div>,
      badge: "bg-gray-200 text-gray-600",
      border: "border-gray-200",
      bg: "bg-gray-50",
    },
  };

  const toggleDone = (id: string) => {
    setDoneSteps((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const totalNodes = skill.nodes?.length || 0;
  const doneCount = doneSteps.length;
  const progressPercent = totalNodes > 0 ? (doneCount / totalNodes) * 100 : 0;
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        {skill.name} Roadmap
      </h1>
      <p className="text-gray-600 text-center mb-8">{skill.description}</p>

      <div className="max-w-3xl mx-auto mb-12 px-2">
        <div className="flex justify-between text-sm mb-2 text-gray-600">
          <span>
            Progress: {doneCount}/{totalNodes} steps
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-3" />
      </div>

      <div className="relative max-w-3xl mx-auto pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200 "></div>

        {(skill.nodes ?? [])
          .sort((a, b) => a.order - b.order)
          .map((node) => {
            const cfg = statusConfig[node.status || "next"];
            const isDone = doneSteps.includes(node._id);
            return (
              <div
                key={node._id}
                onClick={() => setSelectedNode(node)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleDone(node._id);
                }}
                className="relative mb-8 cursor-pointer select-none"
              >
                <div className="absolute -left-2">{cfg.icon}</div>
                <div
                  className={`ml-6 p-4 rounded-lg border ${
                    isDone ? "border-green-500 bg-green-50" : `${cfg.border} ${cfg.bg}`
                  } shadow hover:shadow-md transition`}
                >
                  <div className="flex justify-between items-center">
                    <p
                      className={`font-semibold text-gray-800 ${
                        isDone ? " text-gray-400" : ""
                      }`}
                    >
                      {node.title}
                    </p>
                    <span
                      className={`px-2 py-0.5 text-xs rounded font-medium ${
                        isDone ? "bg-green-100 text-green-700" : cfg.badge
                      }`}
                    >
                      {isDone ? "DONE" : node.status?.toUpperCase() || "NEXT"}
                    </span>
                  </div>
                  <p
                    className={`text-sm mt-1 ${
                      isDone ? " text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {node.description}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {selectedNode && (
        <Sheet
          open={!!selectedNode}
          onOpenChange={(open) => !open && setSelectedNode(null)}
        >
          <SheetTrigger asChild>
            <div></div>
          </SheetTrigger>
          <SheetContent className="bg-white text-gray-800 p-6 max-w-[32vw] min-w-[350px] w-full">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-[#375EEB]">
                {selectedNode.title}
              </SheetTitle>
              <SheetDescription className="text-gray-600 mt-1">
                {selectedNode.description}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-2 pl-2">
                <span className="font-semibold text-gray-700">
                  Estimated Hours:
                </span>
                <span className="text-[#28C9B8] font-medium">
                  {selectedNode.estimated_hours}
                </span>
              </div>

              {selectedNode.prerequisites.length > 0 && (
                <div className="pl-2">
                  <span className="font-semibold text-gray-700">
                    Prerequisites:
                  </span>{" "}
                  <span className="text-gray-600">
                    {selectedNode.prerequisites.join(", ")}
                  </span>
                </div>
              )}

              {selectedNode.courses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-[#375EEB] pl-2">
                    Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto">
                    {selectedNode.courses.map((course, idx) => (
                      <Link
                        key={course._id || idx}
                        href={`https://n8n.self-host.my.id/webhook/07dab5d5-4d0a-4b6b-bad4-e631582bc31a/lsm/courses/${
                          course.slug || course.title
                        }`}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50 block"
                      >
                        {course.thumbnail && (
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-28 object-cover rounded-md mb-3 border border-gray-200"
                          />
                        )}
                        <h4 className="font-semibold text-gray-800">
                          {course.title}
                        </h4>
                        {course.summary && (
                          <p className="text-sm mb-1 text-gray-600">
                            {course.summary}
                          </p>
                        )}
                        <p className="text-sm mb-1">
                          Price:{" "}
                          {course.price === 0 ? (
                            <span className="text-[#28C9B8] font-bold">
                              FREE
                            </span>
                          ) : (
                            <span className="text-red-500 font-semibold">
                              {(course.price ?? 0).toLocaleString()}{" "}
                              {course.currency || "IDR"}
                            </span>
                          )}
                        </p>
                        {course.duration && (
                          <p className="text-sm text-gray-600 mb-1">
                            Duration: {course.duration} min
                          </p>
                        )}
                        {course.level && (
                          <p className="text-sm text-gray-600 mb-1">
                            Level: {course.level}
                          </p>
                        )}
                        {course.relevance_score && (
                          <p className="text-sm text-[#FFC857] mb-1">
                            Relevance Score: {course.relevance_score}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <SheetFooter className="mt-6 flex justify-center">
              <SheetClose asChild>
                <Button className="px-2 py-2 bg-[#375EEB] hover:bg-blue-700 text-white rounded">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
