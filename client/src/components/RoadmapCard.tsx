"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

interface NodeData {
  _id: string;
  roadmap_id: string;
  title: string;
  description: string;
  order: number;
  estimated_hours: number;
  prerequisites: string[];
  courses: any[];
}

interface Skill {
  id: string;
  name: string;
  slug: string;
  description: string;
  roadmap?: any;
  nodes?: NodeData[];
}

const nodeWidth = 180;
const nodeHeight = 50;

export default function SkillRoadmapPage() {
  const { slug } = useParams<{ slug: string }>();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get<Skill>(
          `https://n8n.self-host.my.id/webhook/4c167dde-64b5-44b8-86b9-73c5b92f88fc/lsm/skills/${slug}`
        );
        setSkill(res.data);
      } catch (err) {
        console.error("Gagal fetch skill:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchSkill();
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading roadmap...</p>;
  if (!skill || !skill.nodes) return <p className="text-center py-20">Skill not found.</p>;

  // --- convert ke reactflow nodes ---
  const rfNodes: Node[] = skill.nodes.map((n) => ({
    id: n._id,
    data: { label: n.title },
    position: { x: 0, y: 0 },
    style: {
      width: nodeWidth,
      height: nodeHeight,
      border: "2px solid #facc15", // kuning
      borderRadius: 6,
      background: "#fef9c3", // kuning muda
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 600,
      color: "#333",
      cursor: "pointer",
    },
  }));

  const rfEdges: Edge[] = skill.nodes.flatMap((n) =>
    n.prerequisites.map((pre) => ({
      id: `${pre}-${n._id}`,
      source: skill.nodes?.find((x) => x.title === pre)?._id || "",
      target: n._id,
      type: "smoothstep",
      style: { stroke: "#facc15", strokeWidth: 2 }, // garis kuning
      animated: false,
    }))
  );

  // --- dagre layout (Top to Bottom) ---
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 30, ranksep: 50 });

  rfNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  rfEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);

  const layoutedNodes = rfNodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });
}