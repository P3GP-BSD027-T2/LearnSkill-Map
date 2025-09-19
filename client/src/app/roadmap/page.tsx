"use client";
import Link from "next/link";
import { useState } from "react";


export default function RoadmapCatalog() {
  const allRoadmaps = [
    {
      id: 1,
      title: "Frontend Developer",
      description:
        "Learn HTML, CSS, JavaScript, and modern frameworks like React to build stunning UIs.",
      level: "Beginner → Advanced",
      category: "Web Development",
      trending: true,
    },
    {
      id: 2,
      title: "Backend Developer",
      description:
        "Master Node.js, databases, authentication, and API development for scalable apps.",
      level: "Intermediate → Advanced",
      category: "Web Development",
      trending: false,
    },
    {
      id: 3,
      title: "Data Science",
      description:
        "Dive into Python, statistics, machine learning, and data visualization.",
      level: "Beginner → Expert",
      category: "Data",
      trending: true,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      description:
        "CI/CD, Docker, Kubernetes, and cloud deployment strategies for modern apps.",
      level: "Advanced",
      category: "Infrastructure",
      trending: false,
    },
      {
      id: 5,
      title: "Front End Engineer",
      description:
        "Dive into Python, statistics, machine learning, and data visualization.",
      level: "Beginner → Expert",
      category: "Data",
      trending: true,
    },
    {
      id: 6,
      title: "HTML",
      description:
        "CI/CD, Docker, Kubernetes, and cloud deployment strategies for modern apps.",
      level: "Advanced",
      category: "Infrastructure",
      trending: false,
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredRoadmaps = allRoadmaps.filter((roadmap) => {
    const matchesSearch = roadmap.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "All" || roadmap.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-[#375EEB]">Browse Roadmaps</h1>
        <p className="text-gray-600 mt-2">
          Explore curated learning paths designed to help you master new skills
          step by step.
        </p>
      </div>

   {/* Search & Filter */}
<div className="max-w-6xl mx-auto mb-8 flex justify-center">
  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
    {/* Search */}
    <input
      type="text"
      placeholder="Search roadmap..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full sm:w-120 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28C9B8]"
    />

    {/* Filter */}
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



      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 text-[#375EEB]">
           Trending Roadmaps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRoadmaps
            .filter((r) => r.trending)
            .map((roadmap) => (
              <div
                key={roadmap.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between border-t-4 border-[#FFC857]"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {roadmap.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {roadmap.description}
                  </p>
                  <p className="text-xs text-[#28C9B8] font-medium">
                    {roadmap.level}
                  </p>
                </div>
             <Link href={`/roadmap/${roadmap.id}`}>
                <button className="mt-4 px-4 py-2 bg-[#28C9B8] text-white rounded-lg text-sm hover:bg-blue-700 transition">
              See Details
            </button>
            </Link>

              </div>
            ))}
        </div>
      </div>

      {/* All Roadmaps */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#375EEB]">
           All Roadmaps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoadmaps.map((roadmap) => (
            <div
              key={roadmap.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between border border-gray-200"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {roadmap.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {roadmap.description}
                </p>
                <p className="text-xs text-[#28C9B8] font-medium">
                  {roadmap.level}
                </p>
              </div>
              <Link href={`/roadmap/${roadmap.id}`}>
                <button className="mt-4 px-4 py-2 bg-[#375EEB] text-white rounded-lg text-sm hover:bg-blue-700 transition">
                 See Details
              </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
