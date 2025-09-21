// app/courses/page.tsx
import Link from "next/link";

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
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    cache: "no-store", // biar ga cached
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  const data = await res.json();
  if (Array.isArray(data)) {
    return data as Course[];
  } else if (data.courses && Array.isArray(data.courses)) {
    return data.courses as Course[];
  } else {
    throw new Error("Unexpected API response format");
  }
}

export default async function CoursesPage() {
  let courses: Course[] = [];

  try {
    courses = await getCourses();
  } catch (error: any) {
    return (
      <main className="min-h-screen px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Courses</h1>

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
                <span className="font-medium text-gray-700">
                  {course.price === 0
                    ? "Free"
                    : `${course.currency} ${course.price.toLocaleString("id-ID")}`}
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
