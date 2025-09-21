"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Page() {
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        },
        body: JSON.stringify({ skill_title: project }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} → ${text}`);
      }

      const data = await res.json();
      setRoadmap(data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#F9FBFF] px-4 pt-10">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600 font-medium shadow-sm mb-5">
          <Sparkles className="w-4 h-4" />
          AI Roadmap Generator
        </span>
        <h1 className="text-2xl font-bold mt-4 text-gray-800 mb-5">
          Generate Your Project Roadmap
        </h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Describe your project, and let AI create a roadmap for you.
        </p>
      </div>

      {/* Form */}
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
          placeholder="e.g. software engineer"
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

      {error && (
        <p className="mt-4 text-red-500 font-medium max-w-xl text-center">
          {error}
        </p>
      )}

      {roadmap && Array.isArray(roadmap) && (
        <div className="mt-8 w-full max-w-xl space-y-3">
          {roadmap.map((step: any, idx: number) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-white shadow-sm flex items-center gap-3"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                {idx + 1}
              </span>
              <div>
                <p className="font-medium text-gray-800">{step.title}</p>
                {step.type && (
                  <p className="text-sm text-gray-500">{step.type}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
