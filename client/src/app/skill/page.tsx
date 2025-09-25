"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";

export default function RoadmapCatalog() {
  const [roadmaps, setRoadmaps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        // const res = await axios.get(
        //   `https://learnskillmap.vercel.app/api/skills`
        // );
        // if (Array.isArray(res.data)) {
        //   setRoadmaps(res.data);
        // } else {
        //   setRoadmaps([]);
        // }
         const res = await axios.get(`http://localhost:3000/api/skills`);
        if (Array.isArray(res.data)) {
          setRoadmaps(res.data);
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
    .filter((roadmap) => roadmap?.is_ai_generated === false)
    .filter((roadmap) => {
      const name = roadmap?.name ?? "";
      const category = roadmap?.category ?? "";
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" || category === filter;
      return matchesSearch && matchesFilter;
    });

  if (loading) return <Loading />;

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-[#375EEB]">Browse Skills</h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Explore curated learning paths designed to help you master new skills
          step by step.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-10 flex justify-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search roadmap..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28C9B8] bg-white shadow-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28C9B8] bg-white shadow-sm"
          >
            <option value="All">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Data">Data</option>
            <option value="Infrastructure">Infrastructure</option>
          </select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-5 text-[#375EEB]">
          All Skills
        </h2>
        {filteredRoadmaps.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No roadmaps found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoadmaps.map((roadmap, index) => (
              <div
                key={roadmap.id ?? `roadmap-${index}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between border border-gray-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#28C9B8] bg-[#E6F9F6] px-2 py-0.5 rounded-full">
                      {roadmap?.category ?? "General"}
                    </span>
                    <span className="text-xs font-medium text-[#375EEB] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                      {roadmap?.level ?? "Beginner"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {roadmap?.name ?? "Untitled"}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {roadmap?.description ?? "No description yet."}
                  </p>
                </div>
                <Link href={`/skill/${roadmap.slug}`} className="mt-6 w-full">
                  <Button className="w-full bg-[#375EEB] hover:bg-blue-700 text-white font-medium">
                    See Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
