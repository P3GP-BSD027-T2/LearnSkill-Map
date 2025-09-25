"use client";

import { Search, Grid, List, Clock, Users, Star, Sparkle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import bg from "@/assets/bg.jpg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#eefeff] to-white">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center min-h-screen bg-contain bg-center bg-no-repeat px-6 sm:px-12"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full shadow-sm mb-6">
          <Sparkle className="w-4 h-4 text-yellow-600" /> AI-Powered Learning Paths
        </span>

        <h1 className="text-4xl md:text-6xl font-black text-gray-900 text-center leading-tight mb-6">
          Master Any Skill with
          <span className="block mt-3 text-4xl md:text-5xl text-blue-600">
            Intelligent Roadmaps
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl">
          Navigate your learning journey with personalized, visual roadmaps.
          Track progress, unlock achievements, and accelerate your professional
          growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            href="/skill"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition text-center"
          >
            Explore Roadmaps
          </Link>
          <Link
            href="/request-roadmap"
            className="px-6 py-3 rounded-lg border border-green-500 text-green-600 font-medium hover:bg-green-50 transition text-center"
          >
            Create Custom Path
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">500+</div>
            <p className="mt-1 text-gray-600">Curated Roadmaps</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">10k+</div>
            <p className="mt-1 text-gray-600">Active Learners</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-500">95%</div>
            <p className="mt-1 text-gray-600">Success Rate</p>
          </div>
        </div>
      </section>

      {/* Roadmaps Section */}
      <section className="w-full max-w-6xl px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Discover Your Learning Path
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6">
          Explore curated roadmaps designed by industry experts, or continue
          your ongoing learning journey.
        </p>

        {/* Filter + View Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
              Browse All
            </button>
            <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-50 transition">
              My Learning
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm">
              <Search size={16} /> Filter
            </button>
            <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">
              <Grid size={18} />
            </button>
            <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition">
              <List size={18} />
            </button>
          </div>
        </div>

        {/* Roadmap Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card Example */}
          {[
            {
              category: "Mobile Development",
              title: "React Native Mobile Development",
              desc: "Build cross-platform mobile applications using React Native and modern development practices.",
              rating: 4.7,
              duration: "4-6 months",
              learners: 12056,
              level: "Intermediate",
              color: "blue",
            },
            {
              category: "Programming",
              title: "Python Programming Mastery",
              desc: "From basics to advanced Python programming, including frameworks and best practices.",
              rating: 4.9,
              duration: "4-6 months",
              learners: 18592,
              level: "Beginner",
              color: "purple",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <span
                  className={`px-3 py-1 text-xs font-medium text-${card.color}-700 bg-${card.color}-100 rounded-full`}
                >
                  {card.category}
                </span>
                <span className="flex items-center text-yellow-500 text-sm font-semibold gap-1">
                  <Star size={16} fill="currentColor" /> {card.rating}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-800">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {card.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {card.learners}
                </span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full bg-${card.color}-100 text-${card.color}-700`}
                >
                  {card.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/skill"
            className="px-6 py-2 rounded-lg border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition"
          >
            View All Roadmaps →
          </Link>
        </div>
      </section>

      {/* Interactive Learning Path */}
      <section className="w-full max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Interactive Learning Path
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Follow your personalized roadmap with interactive milestones.
        </p>

        <div className="relative pl-8">
          <div className="absolute left-3 top-0 h-full w-0.5 bg-blue-200"></div>
          {[
            {
              title: "Introduction to React",
              desc: "Learn the fundamentals of React components",
              type: "Review",
            },
            {
              title: "JSX and Components",
              desc: "Understanding JSX syntax and component structure",
              type: "Review",
            },
            {
              title: "Props and State",
              desc: "Managing component data and interactions",
              type: "Continue",
            },
            {
              title: "Build Todo App",
              desc: "Create your first React application",
              type: "Next",
            },
            {
              title: "Hooks Deep Dive",
              desc: "Master useState, useEffect, and custom hooks",
              type: "Locked",
            },
            {
              title: "Context API",
              desc: "Share data across components",
              type: "Locked",
            },
            {
              title: "Final Project",
              desc: "Build a complete React project",
              type: "Locked",
            },
          ].map((step, idx) => (
            <div key={idx} className="relative mb-8 flex items-start gap-4">
              <div className="absolute -left-1.5">
                {step.type === "Review" && (
                  <div className="w-5 h-5 rounded-full border-2 border-yellow-500 flex items-center justify-center text-yellow-500 font-bold text-xs">
                    ✓
                  </div>
                )}
                {step.type === "Continue" && (
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xs">
                    ▶
                  </div>
                )}
                {step.type === "Next" && (
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                )}
                {step.type === "Locked" && (
                  <div className="w-4 h-4 rounded-full border border-gray-400 bg-gray-100"></div>
                )}
              </div>
              <div
                className={`ml-6 p-4 rounded-lg border w-full ${
                  step.type === "Continue"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-800">{step.title}</p>
                  <span
                    className={`px-2 py-0.5 text-xs rounded font-medium ${
                      step.type === "Review"
                        ? "bg-yellow-100 text-yellow-700"
                        : step.type === "Continue"
                        ? "bg-green-100 text-green-700"
                        : step.type === "Next"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {step.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-2">
          Unlock Your Potential
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Earn achievements as you progress through your learning journey.
        </p>

        {/* Achievement Progress */}
        <div className="bg-white p-4 rounded-xl shadow mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Achievement Progress</span>
            <span className="text-sm text-gray-500">3 of 6</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div className="h-2 bg-blue-600 rounded-full w-1/2"></div>
          </div>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">First Steps</p>
            <p className="text-sm text-gray-500">Complete your first lesson</p>
            <span className="text-green-600 text-xs font-bold">Earned</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">Speed Learner</p>
            <p className="text-sm text-gray-500">
              Complete 5 lessons in a single day
            </p>
            <span className="text-green-600 text-xs font-bold">Earned</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">Project Master</p>
            <p className="text-sm text-gray-500">
              Complete 10 hands-on projects
            </p>
            <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full w-[70%]"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
