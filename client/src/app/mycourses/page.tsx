// app/courses/page.tsx
import { getUserById } from "@/server-action";
import { headers } from "next/headers";
import Link from "next/link";

export default async function CoursesPage() {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  const userData = await getUserById(userId);
  const courses = userData.owned_courses;
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm border p-4 flex flex-col"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="rounded-lg mb-3 object-cover h-40 w-full"
              />
              <h2 className="font-semibold text-lg text-gray-800">
                {course.title}
              </h2>
              <p className="text-sm text-gray-600 flex-1 mt-1">
                {course.summary}
              </p>

              <div className="mt-3 flex justify-between items-center text-sm">
                <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-600">
                  {course.level}
                </span>
              </div>
              <Link
                href={`/courses/${course.slug || course._id}`}
                className="mt-4 inline-block text-center px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
