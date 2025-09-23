"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
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
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Award, BarChart, BookOpen } from "lucide-react";
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
  doneSteps?: string[];
}

export default function SkillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [doneSteps, setDoneSteps] = useState<string[]>([]);
  const [showTrackDialog, setShowTrackDialog] = useState(false);
  const [isTaken, setIsTaken] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get<Skill>(
          `https://n8n.self-host.my.id/webhook/4c167dde-64b5-44b8-86b9-73c5b92f88fc/lsm/skills/${slug}`
        );
        setSkill(res.data);

        let steps: string[] = res.data.doneSteps || [];
        const savedSteps = localStorage.getItem(`doneSteps-${slug}`);
        if (savedSteps) steps = JSON.parse(savedSteps);

        setDoneSteps(steps);
        if (steps.length > 0) setIsTaken(true);
      } catch {
        setError("Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchData();
  }, [slug]);

  const toggleDone = async (id: string) => {
    const updatedSteps = doneSteps.includes(id)
      ? doneSteps.filter((s) => s !== id)
      : [...doneSteps, id];
    setDoneSteps(updatedSteps);
    localStorage.setItem(`doneSteps-${slug}`, JSON.stringify(updatedSteps));
    try {
      await axios.post(
        `https://n8n.self-host.my.id/webhook/fe69fd3f-847a-4fe4-a1e2-d03ccdec3c9c/lsm/skills/${slug}`,
        { doneSteps: updatedSteps }
      );
    } catch (err) {
      console.error("Gagal simpan progress:", err);
    }
  };

  const handleRightClickNode = (node: NodeData, e: React.MouseEvent) => {
    e.preventDefault();
    if (!isTaken) {
    setShowTrackDialog(true); 
    return;
  }
    toggleDone(node._id);
  };

  const takeRoadmap = async () => {
    setIsTaken(true);
    setShowTrackDialog(false);
    try {
      await axios.post(
        `https://n8n.self-host.my.id/webhook/fe69fd3f-847a-4fe4-a1e2-d03ccdec3c9c/lsm/skills/${slug}`,
        { doneSteps }
      );
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  const prepareFlow = (nodes: NodeData[]) => {
    const flowNodes: Node[] = [];
    const flowEdges: Edge[] = [];
    const groups: Record<number, NodeData[]> = {};

    nodes.forEach((node) => {
      const mainOrder = Math.floor(node.order);
      if (!groups[mainOrder]) groups[mainOrder] = [];
      groups[mainOrder].push(node);
    });

    const yStep = 150;
    const xStep = 200;

    Object.keys(groups)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((key) => {
        const group = groups[Number(key)];
        const totalBranches = group.length;

        group.forEach((node, idx) => {
          const x = idx * xStep - ((totalBranches - 1) * xStep) / 2;
          const y = Number(key) * yStep;

          const isDone = doneSteps.includes(node._id);

          flowNodes.push({
            id: node._id,
            type: "default",
            data: {
              label: (
                <div
                  onContextMenu={(e) => handleRightClickNode(node, e)}
                  onClick={() => isTaken && setSelectedNode(node)}
                  style={{
                    padding: "12x 12px",
              
                    backgroundColor: isDone ? "#d1fae5" : "#eff6ff",
                    textDecoration: isDone ? "line-through" : "none",
                    cursor: "pointer",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {node.title}
                </div>
              ),
            },
            position: { x, y },
          });

          if (Number(key) > 0) {
            const prevGroup = groups[Number(key) - 1];
            prevGroup?.forEach((prevNode) => {
              flowEdges.push({
                id: `${prevNode._id}-${node._id}`,
                source: prevNode._id,
                target: node._id,
                type: "smoothstep",
              });
            });
          }
        });
      });

    return { flowNodes, flowEdges };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!skill) return <p>Skill tidak ditemukan</p>;

  const { flowNodes, flowEdges } = prepareFlow(skill.nodes);

  const totalNodes = skill.nodes?.length || 0;
  const doneCount = doneSteps.length;
  const progressPercent = totalNodes > 0 ? (doneCount / totalNodes) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">{skill.name} Roadmap</h1>
      <p className="text-gray-600 text-center mb-8">{skill.description}</p>

      <div className="max-w-3xl mx-auto mb-8 px-2">
        <div className="flex items-center gap-4 mb-2">
          <span>Progress: {doneCount}/{totalNodes} steps</span>
          <Progress value={progressPercent} className="h-3 flex-1" />
          <span>{Math.round(progressPercent)}%</span>

          {!isTaken ? (
            <Button onClick={() => setShowTrackDialog(true)} className="bg-[#28C9B8] hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition">
              Take this Roadmap <TrendingUp className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={() => setShowTrackDialog(true)} className="bg-[#28C9B8] hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition">
               Track Your Progress
            </Button>
          )}
        </div>
      </div>

      <div className="h-[500px] w-full border rounded-lg bg-white mb-5">
        <ReactFlow nodes={flowNodes} edges={flowEdges} fitView>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <Dialog open={showTrackDialog && !isTaken} onOpenChange={setShowTrackDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take this roadmap?</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to take this roadmap? Then you can track your progress.</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowTrackDialog(false)}>No</Button>
            <Button onClick={takeRoadmap} className="bg-blue-600 text-white">Yes, Take Roadmap</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTrackDialog && isTaken} onOpenChange={setShowTrackDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-blue-600">
            <DialogTitle>How to update your progress</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600 space-y-2">
            <p>You can change the step status in two ways:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><b>Right click</b> on a step to toggle DONE.</li>
              <li><b>Click a node</b> then select status in the dropdown (NEXT / DONE).</li>
            </ul>
          </div>
         
          <DialogFooter>
            <Button onClick={() => setShowTrackDialog(false)} className="bg-[#28C9B8]">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedNode && (
        <Sheet open={!!selectedNode} onOpenChange={(open) => !open && setSelectedNode(null)}>
          <SheetTrigger asChild><div></div></SheetTrigger>
          <SheetContent className="bg-white text-gray-800 p-6 max-w-[35vw] min-w-[350px] w-full">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-[#375EEB]">{selectedNode.title}</SheetTitle>
              <SheetDescription className="text-gray-600 mt-1">{selectedNode.description}</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-5">
              <div className="pl-2">
                <label className="font-semibold text-gray-700 mr-2">Status:</label>
                <select
                  value={doneSteps.includes(selectedNode._id) ? "done" : "next"}
                  onChange={(e) => {
                      if (!isTaken) {
                        return;
                    }
                    if (e.target.value === "done" && !doneSteps.includes(selectedNode._id)) toggleDone(selectedNode._id);
                    else if (e.target.value === "next" && doneSteps.includes(selectedNode._id)) toggleDone(selectedNode._id);
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="next">NEXT</option>
                  <option value="done">DONE</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pl-2">
                <Clock className="w-4 h-4 text-[#28C9B8]" />
                <span className="font-semibold text-gray-700">Estimated Hours:</span>
                <span className="text-[#28C9B8] font-medium">{selectedNode.estimated_hours}</span>
              </div>

              {selectedNode.prerequisites.length > 0 && (
                <div className="pl-2 flex gap-2">
                  <BookOpen className="w-4 h-4 text-[#375EEB]" />
                  <span className="font-semibold text-gray-700">Prerequisites:</span>
                  <span className="text-gray-600">{selectedNode.prerequisites.join(", ")}</span>
                </div>
              )}

              {selectedNode.courses.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-[#375EEB] pl-2">Courses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto">
                    {selectedNode.courses.map((course, idx) => (
                      <Link
                        key={course._id || idx}
                        href={`/courses/${course.slug || course._id}`}
                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50 block"
                      >
                        {course.thumbnail && (
                          <img src={course.thumbnail} alt={course.title} className="w-full h-28 object-cover rounded-md mb-3 border border-gray-200" />
                        )}
                        <h4 className="font-semibold text-gray-800">{course.title}</h4>
                        {course.summary && <p className="text-sm mb-1 text-gray-600 line-clamp-2">{course.summary}</p>}
                        <p className="text-sm mb-1">
                          Price: {course.price === 0 ? <span className="text-[#28C9B8] font-bold">FREE</span> : <span className="text-red-500 font-semibold">{(course.price ?? 0).toLocaleString()} {course.currency || "IDR"}</span>}
                        </p>
                        {course.duration && <p className="text-sm text-gray-600 mb-1 flex items-center gap-1"><Clock className="w-4 h-4 text-gray-500" />{course.duration} min</p>}
                        {course.level && <p className="text-sm text-gray-600 mb-1 flex items-center gap-1"><Award className="w-4 h-4 text-gray-500" />{course.level}</p>}
                        {course.relevance_score && <p className="text-sm text-[#FFC857] mb-1 flex items-center gap-1"><BarChart className="w-4 h-4" />Relevance Score: {course.relevance_score}</p>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <SheetFooter className="mt-6 flex justify-center">
              <SheetClose asChild>
                <Button className="px-3 py-2 bg-[#375EEB] hover:bg-blue-700 text-white rounded">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
