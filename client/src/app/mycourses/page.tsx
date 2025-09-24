"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Loading from "@/components/ui/loading";

type Course = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail: string;
  price: number;
  currency: string;
  duration: number;
  level: string;
  tags: string[];
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
};

async function getCourses(): Promise<Course[]> {
  const res = await fetch("https://n8n.self-host.my.id/webhook/lsm/courses", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch courses");

  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data.courses && Array.isArray(data.courses)) return data.courses;
  throw new Error("Unexpected API response format");
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    setLoading(true);
    getCourses()
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <main className="min-h-screen px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <p className="text-red-500">Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-[#375EEB] text-center">
          Explore Courses
        </h1>

        {loading ? (
          <Loading />
        ) : courses.length === 0 ? (
          <p className="text-gray-600 text-center">No courses available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition border flex flex-col overflow-hidden"
              >
                <div className="relative h-40 w-full">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-600 flex-1 line-clamp-3">
                    {course.summary}
                  </p>

                  <div className="mt-4">
                    {course.price === 0 ? (
                      <span className="text-2xl font-extrabold text-green-600">
                        Free
                      </span>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-gray-400 line-through">
                          {course.currency}{" "}
                          {(course.price * 1.5).toLocaleString("id-ID")}
                        </span>
                        <span className="text-2xl font-extrabold text-[#375EEB]">
                          {course.currency}{" "}
                          {course.price.toLocaleString("id-ID")}
                        </span>
                        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex justify-between items-center text-xs">
                    <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-600">
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4 text-[#28C9B8]" />
                      {course.duration} min
                    </span>
                  </div>

                  <Button
                    className="mt-5 w-full bg-[#375EEB] hover:bg-[#2746b8] transition"
                    onClick={() => setSelectedCourse(course)}
                  >
                    See Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog */}
      <Dialog
        open={!!selectedCourse}
        onOpenChange={() => setSelectedCourse(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ambil course ini?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setSelectedCourse(null)}>
              Cancel
            </Button>
            {selectedCourse && (
              <Link
                href={`/courses/${selectedCourse.slug || selectedCourse._id}`}
              >
                <Button className="bg-[#28C9B8]">Yes, Lanjut</Button>
              </Link>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
