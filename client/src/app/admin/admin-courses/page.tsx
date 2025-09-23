import AdminCoursesTable from "@/components/CoursesTable";
import { getCourses } from "@/server-action";

export default async function AdminCoursesPage() {
  const courses = await getCourses();
  // console.log(courses);
  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen items-center py-16 px-36 gap-6">
        <AdminCoursesTable courses={courses} />
      </div>
    </>
  );
}
