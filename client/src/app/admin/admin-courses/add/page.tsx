import AddCourseForm from "@/components/AddCourseForm";

export default function AddCoursePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col px-16 py-10 gap-4">
        <h1 className="text-2xl font-semibold">Add Course</h1>
        <AddCourseForm />
      </div>
    </>
  );
}
