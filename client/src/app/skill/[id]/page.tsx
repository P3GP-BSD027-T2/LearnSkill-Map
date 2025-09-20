"use client";

import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import RoadmapNode from "@/components/RoadmapNode";

const nodeTypes = { custom: RoadmapNode };

const initialNodes: Node[] = [
  { id: "1", type: "custom", position: { x: 250, y: 0 }, data: { label: "Frontend Developer", type: "root" } },
  { id: "2", type: "custom", position: { x: 100, y: 120 }, data: { label: "HTML", type: "learning" } },
  { id: "3", type: "custom", position: { x: 400, y: 120 }, data: { label: "CSS", type: "learning" } },
  { id: "4", type: "custom", position: { x: 250, y: 240 }, data: { label: "JavaScript", type: "milestone" } },
  { id: "5", type: "custom", position: { x: 250, y: 360 }, data: { label: "Next.js", type: "optional" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
];

export default function RoadmapPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={16} color="#eee" />
      </ReactFlow>
    </div>
  );
}
