import { Search, Filter, Grid, List, Clock, Users, Star } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import bg from "@/assets/bg.jpg"; 

export default function Home() {
  return (
  <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#eefeff] to-white">
  <section
        className="flex flex-col items-center justify-center min-h-screen   bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
    <div className="mb-18">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-yellow-800 bg-yellow-100 rounded-full shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-yellow-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.449a1 1 0 00-1.175 0l-3.37 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
          />
        </svg>
        AI-Powered Learning Paths
      </span>
    </div>

<h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight mb-7">
  Master Any Skill with
  <span className="block mt-2 text-4xl text-blue-600">Intelligent Roadmaps</span>
</h1>

    <p className="mt-4 text-lg text-gray-600 text-center ">
      Navigate your learning journey with personalized, visual roadmaps.{" "}
      Track progress, unlock achievements, and accelerate your professional
      growth.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
      <Link href="/skill" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition inline-block text-center">
        Explore Roadmaps →
      </Link>
      <Link href = "/request-roadmap" className="px-6 py-3 rounded-lg border border-green-500 text-green-600 font-medium hover:bg-green-50 transition">
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
     <section className="w-full max-w-6xl px-6 py-5">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Discover Your Learning Path
      </h2>
      <p className="mt-2 text-gray-600 text-center max-w-2xl mx-auto">
        Explore curated roadmaps designed by industry experts, or continue your ongoing learning journey.
      </p>

      <div className="mt-8 flex items-center justify-between  ">
        <div className="flex space-x-4">
      <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium">
          Browse All
      </button>
      <button className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-50 transition">
      My Learning
      </button>
    </div>
        <div className="flex items-center space-x-3">
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
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              Mobile Development
            </span>
            <span className="flex items-center text-yellow-500 text-sm font-semibold gap-1">
              <Star size={16} fill="currentColor" /> 4.7
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            React Native Mobile Development
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Build cross-platform mobile applications using React Native and modern development practices.
          </p>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} /> 4-6 months
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> 12,056
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
              Intermediate
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex justify-between items-start">
            <span className="px-3 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full">
              Programming
            </span>
            <span className="flex items-center text-yellow-500 text-sm font-semibold gap-1">
              <Star size={16} fill="currentColor" /> 4.9
            </span>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            Python Programming Mastery
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            From basics to advanced Python programming, including frameworks and best practices.
          </p>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} /> 4-6 months
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> 18,592
            </span>
            <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">
              Beginner
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href={"/skill"} className="px-6 py-2 rounded-lg border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition">
          View All Roadmaps →
        </Link>
      </div>
    </section>

<section className="w-full max-w-3xl px-6 py-15">
  <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
    Interactive Learning Path
  </h2>
  <p className="text-gray-600 text-center mb-8">
    Follow your personalized roadmap with interactive milestones.
  </p>

  <div className="relative pl-8">
    <div className="absolute left-3 top-0 h-full w-0.5 bg-blue-200"></div>

    {[
      { title: "Introduction to React", desc: "Learn the fundamentals of React components", type: "Review" },
      { title: "JSX and Components", desc: "Understanding JSX syntax and component structure", type: "Review" },
      { title: "Props and State", desc: "Managing component data and interactions", type: "Continue" },
      { title: "Build Todo App", desc: "Create your first React application", type: "Next" },
      { title: "Hooks Deep Dive", desc: "Master useState, useEffect, and custom hooks", type: "Locked" },
      { title: "Context API", desc: "Share data across components", type: "Locked" },
      { title: "Final Project", desc: "Build a complete React project", type: "Locked" },
    ].map((step, idx) => (
      <div key={idx} className="relative mb-8 flex items-start gap-4">
        <div className="absolute -left-1.5 bg-white">
          {step.type === "Review" && (
            <svg className="text-yellow-500" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
            </svg>
          )}
          {step.type === "Continue" && (
            <svg className="text-green-500" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {step.type === "Next" && (
            <svg className="text-blue-500 fill-blue-500" width="14" height="14" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
          {step.type === "Locked" && (
            <svg className="text-gray-400" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m4-6a4 4 0 10-8 0v2a2 2 0 00-2 2v4h12v-4a2 2 0 00-2-2z" />
            </svg>
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
  <section className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-center mb-2">Unlock Your Potential</h1>
        <p className="text-gray-600 text-center mb-8">
          Earn achievements as you progress through your learning journey.
          Track your milestones and celebrate your accomplishments.
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First Steps */}
          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">First Steps</p>
            <p className="text-sm text-gray-500">Complete your first lesson</p>
            <span className="text-green-600 text-xs font-bold">Earned</span>
          </div>

          {/* Speed Learner */}
          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">Speed Learner</p>
            <p className="text-sm text-gray-500">Complete 5 lessons in a single day</p>
            <span className="text-green-600 text-xs font-bold">Earned</span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold">Project Master</p>
            <p className="text-sm text-gray-500">Complete 10 hands-on projects</p>
            <div className="mt-2 w-full bg-gray-200 h-2 rounded-full">
              <div className="h-2 bg-blue-600 rounded-full w-[70%]"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
</div>
  );
}
