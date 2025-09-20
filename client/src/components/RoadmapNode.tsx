"use client";

import { Handle, Position } from "reactflow";
import { BookOpen, Star } from "lucide-react";

export default function RoadmapNode({ data }: any) {
  const colors: Record<string, string> = {
    root: "bg-[#232C3D] text-white",
    learning: "bg-[#375EEB] text-white",
    optional: "bg-[#28C9B8] text-white",
    milestone: "bg-[#FFC857] text-black",
  };

  return (
    <div
      className={`px-4 py-2 rounded-xl shadow-md border text-sm font-medium min-w-[120px] text-center ${colors[data.type]}`}
    >
      <div className="flex items-center justify-center gap-2">
        {data.type === "milestone" && <Star size={14} />}
        {data.type === "learning" && <BookOpen size={14} />}
        <span>{data.label}</span>
      </div>

      {/* Connector */}
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}
