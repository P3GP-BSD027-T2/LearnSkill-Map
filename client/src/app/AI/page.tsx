"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RoadmapCatalog() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/skills`
        );
        if (Array.isArray(res.data)) {
          setRoadmaps(res.data);
        } else {
          console.warn("Unexpected response:", res.data);
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
      const matchesSearch = name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "All" || category === filter;
      return matchesSearch && matchesFilter;
    });

  if (loading) {
    return <p className="text-center py-20">Loading roadmaps...</p>;
  }

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-[#375EEB]">Browse Skills</h1>
        <p className="text-gray-600 mt-2">
          Explore curated learning paths designed to help you master new skills
          step by step.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search roadmap..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-120 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28C9B8]"
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
        <h2 className="text-xl font-semibold mb-4 text-[#375EEB]">
          All Skills
        </h2>
        {filteredRoadmaps.length === 0 ? (
          <p className="text-center text-gray-500">No roadmaps found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoadmaps.map((roadmap, index) => (
              <div
                key={roadmap.id ?? `roadmap-${index}`}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between border border-gray-200"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {roadmap?.name ?? "Untitled"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {roadmap?.description ?? "No description yet."}
                  </p>
                  <p className="text-xs text-[#28C9B8] font-medium">
                    {roadmap?.level ?? "Beginner"}
                  </p>
                </div>
                <Link href={`/skill/${roadmap.slug}`}>
                  <button className="mt-4 px-4 py-2 bg-[#375EEB] text-white rounded-lg text-sm hover:bg-blue-700 transition">
                    See Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
