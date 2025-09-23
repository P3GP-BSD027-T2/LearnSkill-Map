import AdminCoursesTable from "@/components/CoursesTable";
import { verifyToken } from "@/helpers/jwt";
import { getCourses } from "@/server-action";
import { cookies } from "next/headers";

export default async function AdminCoursesPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return [];

  const userData = verifyToken(token) as { _id: string; role?: string };
  const userId = userData._id;
  const courses = await getCourses(userId);
  // console.log(courses);
  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen items-center py-16 px-36 gap-6">
        <AdminCoursesTable courses={courses} />
      </div>
    </>
  );
}
