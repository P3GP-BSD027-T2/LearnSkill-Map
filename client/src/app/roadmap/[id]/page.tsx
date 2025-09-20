"use client";

import React, { useState } from "react";

type RoadmapStep = {
  id: number;
  title: string;
  description: string;
};

const steps: RoadmapStep[] = [
  { id: 1, title: "HTML Dasar", description: "Struktur, heading, paragraf" },
  { id: 2, title: "CSS", description: "Styling, layout, responsif" },
  { id: 3, title: "JavaScript", description: "Interaktivitas dasar" },
  { id: 4, title: "Git & GitHub", description: "Version control" },
  { id: 5, title: "React", description: "Library UI" },
  { id: 6, title: "Next.js", description: "Framework React modern" },
];

export default function RoadmapDetailPage() {
  const [selected, setSelected] = useState<RoadmapStep | null>(null);

  return (
    <div className="relative w-full h-screen bg-[#232C3D] text-white flex flex-col items-center overflow-y-auto">
      <h1 className="text-4xl font-extrabold mt-6 tracking-wide drop-shadow-lg">
         Roadmap Developer
      </h1>

      <div className="relative w-full max-w-6xl mt-12">
        <svg
          width="100%"
          height={steps.length * 200}
          viewBox={`0 0 1200 ${steps.length * 200}`}
        >
 
          <path
            d={`
              M 600 50
              ${steps
                .map((_, i) => {
                  const y = 200 * (i + 1);
                  const x = i % 2 === 0 ? 420 : 780; 
                  return `T ${x} ${y}`;
                })
                .join(" ")}
            `}
            fill="none"
            stroke="#375EEB"
            strokeWidth="22"   
            strokeLinecap="round"
          />

          {/* 🔹 Marka jalan teal */}
          <path
            d={`
              M 600 50
              ${steps
                .map((_, i) => {
                  const y = 200 * (i + 1);
                  const x = i % 2 === 0 ? 420 : 780;
                  return `T ${x} ${y}`;
                })
                .join(" ")}
            `}
            fill="none"
            stroke="#28C9B8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="18 18"
          />

          {steps.map((step, i) => {
            const y = 200 * (i + 1);
            const x = i % 2 === 0 ? 420 : 780;
            return (
              <g
                key={step.id}
                onClick={() => setSelected(step)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="34"
                  fill="url(#gradYellow)"
                  stroke="white"
                  strokeWidth="3"
                  filter="url(#glow)"
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="black"
                >
                  {step.id}
                </text>
              </g>
            );
          })}

          <defs>
            <radialGradient id="gradYellow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFC857" />
              <stop offset="100%" stopColor="#e0a500" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>


        {steps.map((step, i) => {
          const y = 200 * (i + 1);
          const side =
            i % 2 === 0 ? "left-0 pr-6 text-right" : "right-0 pl-6 text-left";
          return (
            <div
              key={`info-${step.id}`}
              className={`absolute w-1/3 ${side}`}
              style={{ top: y - 40 }}
            >
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg hover:scale-105 transition">
                <h2 className="text-lg font-bold text-white">{step.title}</h2>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg max-w-md shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            <p>{selected.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
