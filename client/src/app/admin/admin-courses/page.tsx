import AdminCoursesTable from "@/components/CoursesTable";

export default function AdminCoursesPage() {
  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen items-center py-6 px-36 gap-6">
        <AdminCoursesTable />
      </div>
    </>
  );
}
