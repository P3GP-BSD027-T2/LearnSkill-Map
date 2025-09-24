// app/courses/page.tsx
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
import { Clock, Tag } from "lucide-react"; // ⏰ jam & 💲 harga
import { checkToken, getUserById } from "@/server-action";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const buttonPressHandler = async (course: Course) => {
    // apakah berbayar
    if (course.price === 0) {
      setSelectedCourse(course);
    } else {
      const res = await checkToken();
      const data = await getUserById(res.userId);
      // console.log(data);
      const ownedCourseId: string[] = [];
      data?.owned_courses?.forEach((val) => {
        ownedCourseId.push(val._id);
      });
      if (!res.hasToken) {
        router.replace("/account"); // belum login harus login dan bayar
      } else {
        if (ownedCourseId.includes(course._id)) {
          setSelectedCourse(course); // bisa akses
        } else {
          router.replace(`/payment/${course.slug}`); // harus beli
        }
      }
    }
  };

  useEffect(() => {
    getCourses()
      .then((data) => setCourses(data))
      .catch((err) => setError(err.message));
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

        {courses.length === 0 ? (
          <p className="text-gray-600 text-center">No courses available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border flex flex-col overflow-hidden"
              >
                <div className="mt-2 flex items-center justify-end gap-1 text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 text-[#375EEB]" />
                  {course.price === 0
                    ? "Free"
                    : `${course.currency} ${course.price.toLocaleString(
                        "id-ID"
                      )}`}
                </div>
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

                  <div className="mt-4 flex justify-between items-center text-xs">
                    <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-600">
                      {course.level}
                    </span>

                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-4 h-4 text-[#28C9B8]" />
                      {course.duration} min
                    </span>
                  </div>

                  {/* <Button
                    className="mt-5 w-full bg-[#375EEB]"
                    onClick={() => setSelectedCourse(course)}
                  >
                    See Details
                  </Button> */}
                  <Button
                    className="mt-5 w-full bg-[#375EEB]"
                    onClick={() => {
                      buttonPressHandler(course);
                    }}
                  >
                    See Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
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
