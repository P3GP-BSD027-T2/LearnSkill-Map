"use client";

import { useEffect, useState, JSX } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
      icon: (
        <svg
          className="text-yellow-500"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
        </svg>
      ),
      badge: "bg-yellow-100 text-yellow-700",
      border: "border-yellow-300",
      bg: "bg-white",
    },
    continue: {
      icon: (
        <svg className="text-green-500" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      ),
      badge: "bg-green-100 text-green-700",
      border: "border-green-400",
      bg: "bg-green-50",
    },
    next: {
      icon: (
        <svg className="text-blue-500 fill-blue-500" width="14" height="14" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      badge: "bg-blue-100 text-blue-700",
      border: "border-blue-200",
      bg: "bg-white",
    },
    locked: {
      icon: (
        <svg
          className="text-gray-400"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m4-6a4 4 0 10-8 0v2a2 2 0 00-2 2v4h12v-4a2 2 0 00-2-2z" />
        </svg>
      ),
      badge: "bg-gray-200 text-gray-600",
      border: "border-gray-200",
      bg: "bg-gray-50",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        {skill.name} Roadmap
      </h1>
      <p className="text-gray-600 text-center mb-12">
       {skill.description}
      </p>
      <div className="relative max-w-3xl mx-auto pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200"></div>

        {skill.nodes
          .sort((a, b) => a.order - b.order)
          .map((node) => {
            const cfg = statusConfig[node.status || "next"];
            return (
              <div
                key={node._id}
                onClick={() => setSelectedNode(node)}
                className={`relative mb-8 cursor-pointer`}
              >
              
                <div className="absolute -left-1.5 bg-white">{cfg.icon}</div>

             
                <div
                  className={`ml-6 p-4 rounded-lg border ${cfg.border} ${cfg.bg} shadow hover:shadow-md transition`}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{node.title}</p>
                    <span
                      className={`px-2 py-0.5 text-xs rounded font-medium ${cfg.badge}`}
                    >
                      {node.status?.toUpperCase() || "NEXT"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{node.description}</p>
                </div>
              </div>
            );
          })}
      </div>
    
{/* <div className="max-w-3xl mx-auto mt-12">
  <h2 className="text-lg font-bold mb-2 text-gray-700"> Raw Data</h2>
  <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto">
    {JSON.stringify(skill, null, 2)}
  </pre>
</div> */}

{selectedNode && (
  <Sheet
    open={!!selectedNode}
    onOpenChange={(open) => !open && setSelectedNode(null)}
  >
    <SheetTrigger asChild>
      <div></div>
    </SheetTrigger>

    <SheetContent
      className="bg-white text-gray-800 p-6 max-w-[32vw] min-w-[350px] w-full"
    >
      <SheetHeader>
        <SheetTitle className="text-2xl font-bold text-[#375EEB]">{selectedNode.title}</SheetTitle>
        <SheetDescription className="text-gray-600 mt-1">{selectedNode.description}</SheetDescription>
      </SheetHeader>

      <div className="mt-6 space-y-5">
        <div className="flex items-center gap-2 pl-2">
          <span className="font-semibold text-gray-700">Estimated Hours:</span>
          <span className="text-[#28C9B8] font-medium">{selectedNode.estimated_hours}</span>
        </div>

        {selectedNode.prerequisites.length > 0 && (
          <div className="pl-2">
            <span className="font-semibold text-gray-700">Prerequisites:</span>{" "}
            <span className="text-gray-600">{selectedNode.prerequisites.join(", ")}</span>
          </div>
        )}

        {selectedNode.courses.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#375EEB] pl-2">Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto">
              {selectedNode.courses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50"
                >
                  {course.thumbnail && (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-28 object-cover rounded-md mb-3 border border-gray-200"
                    />
                  )}
                  <h4 className="font-semibold text-gray-800">{course.title}</h4>
                  {course.summary && <p className="text-sm mb-1 text-gray-600">{course.summary}</p>}
                  <p className="text-sm mb-1">
                    Price:{" "}
                    {course.price === 0 ? (
                      <span className="text-[#28C9B8] font-bold">FREE</span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        {(course.price ?? 0).toLocaleString()} {course.currency || "IDR"}
                      </span>
                    )}
                  </p>
                  {course.duration && <p className="text-sm text-gray-600 mb-1">Duration: {course.duration} min</p>}
                  {course.level && <p className="text-sm text-gray-600 mb-1">Level: {course.level}</p>}
                  {course.relevance_score && (
                    <p className="text-sm text-[#FFC857] mb-1">Relevance Score: {course.relevance_score}</p>
                  )}
                </div>
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
