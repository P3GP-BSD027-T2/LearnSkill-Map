import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6">
   <div className="mb-6">
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
      <h1 className="text-4xl font-extrabold text-gray-900 text-center max-w-2xl leading-snug">
        Master Any Skill with{" "}
        <span className="text-blue-600">Intelligent Roadmaps</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-xl">
        Navigate your learning journey with personalized, visual roadmaps. Track
        progress, unlock achievements, and accelerate your professional growth.
      </p>

      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Explore Roadmaps →
        </button>
        <button className="px-6 py-3 rounded-lg border border-green-500 text-green-600 font-medium hover:bg-green-50 transition">
          Create Custom Path
        </button>
      </div>

      {/* Stats */}
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
    </main>
  );
}

