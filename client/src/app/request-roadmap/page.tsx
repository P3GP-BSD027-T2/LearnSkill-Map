"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react"; 

export default function Page() {
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dummyRoadmap = [
      { id: 1, title: "Belajar Dasar HTML & CSS", type: "learning" },
      { id: 2, title: "JavaScript Fundamental", type: "learning" },
      { id: 3, title: "Git & Version Control", type: "optional" },
      { id: 4, title: "React.js", type: "milestone" },
      { id: 5, title: "Next.js + Deployment", type: "milestone" },
    ];

    setTimeout(() => {
      setRoadmap(dummyRoadmap);
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#F9FBFF] px-4 pt-10">
  
      <div className="text-center mb-15">
        <span className="inline-flex items-center gap-2 px-4 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600 font-medium shadow-sm mb-5">
          <Sparkles className="w-4 h-4 text-indigo- " />
          AI Roadmap Generator
        </span>
        <h1 className="text-2xl font-bold mt-4 text-gray-800 mb-5">
          Generate Your Project Roadmap
        </h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Describe your project, and let AI create a roadmap for you.
        </p>
      </div>    
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      >
        <label className="block text-left text-gray-700 font-medium mb-2">
          What would you like to build?
        </label>
        <textarea
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full border rounded-lg px-3 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows={3}
          placeholder="enter a topic"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition disabled:bg-gray-300"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </form>
    </main>
  );
}
