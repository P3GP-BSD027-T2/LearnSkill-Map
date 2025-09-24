"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { getUserRoadmaps } from "@/server-action"; 
import Loading from "@/components/ui/loading";

export default function RoadmapCatalog() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await getUserRoadmaps(); 
        if (Array.isArray(res)) {
          setRoadmaps(res);
        } else {
          setRoadmaps([]);
        }
      } catch (err) {
        console.error("Error fetching roadmaps:", err);
        setRoadmaps([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const filteredRoadmaps = roadmaps
    .filter((roadmap) => roadmap?.is_ai_generated === true)
    .filter((roadmap) => {
      const name = roadmap?.name ?? "";
      const category = roadmap?.category ?? "";
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || category === filter;
      return matchesSearch && matchesFilter;
    });

  
   if (loading) return <Loading/>;
  return (
    <main className="bg-gradient-to-b from-[#F9FBFF] to-white min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#375EEB]">
          Discover Your AI-Created Roadmap
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Curated AI-generated roadmaps to master any skill — faster, smarter,
          and step by step.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder=" Search roadmap..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28C9B8]"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28C9B8]"
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Data">Data</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {filteredRoadmaps.length === 0 ? (
          <p className="text-center text-gray-500">
            No roadmaps found. Try another search
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap, index) => (
              <div
                key={roadmap.id ?? `roadmap-${index}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between border border-gray-100"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {roadmap?.name ?? "Untitled"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {roadmap?.description ?? "No description yet."}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-[#28C9B8] font-semibold">
                    {roadmap?.level ?? "Beginner"}
                  </p>
                </div>
                <Link href={`/AI/${roadmap.slug}`}>
                  <button className="mt-6 px-4 py-2 bg-[#375EEB] text-white rounded-lg text-sm hover:bg-blue-700 transition w-full">
                    See Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="max-w-6xl mx-auto mt-14 flex justify-center">
          <Link href={`/request-roadmap`}>
            <button className="px-6 py-3 bg-[#28C9B8] text-white rounded-xl text-sm font-medium hover:bg-[#20a89b] transition flex items-center gap-2 shadow-md">
              <Sparkles className="w-4 h-4" />
              Generate Your Custom Roadmap
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}