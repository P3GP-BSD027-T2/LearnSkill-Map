"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
      <div className="w-3/4 max-w-xl">
        <p className="text-gray-700 font-medium text-lg mb-4 text-center animate-pulse">
          Loading, please wait...
        </p>
        <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-4 w-1/2 bg-blue-500 rounded-full shadow-lg animate-progress-bar"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-bar {
          0% {
            transform: translateX(-100%);
            box-shadow: 0 0 8px #3b82f6;
          }
          50% {
            transform: translateX(0%);
            box-shadow: 0 0 16px #3b82f6;
          }
          100% {
            transform: translateX(100%);
            box-shadow: 0 0 8px #3b82f6;
          }
        }
        .animate-progress-bar {
          animation: progress-bar 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
