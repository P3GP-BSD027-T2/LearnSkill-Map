import EditCourseForm from "@/components/EditCourseForm";
import { getCourseBySlug } from "@/server-action";

interface Props {
  params: { slug: string };
}

export default async function UpdateCourse({ params }: Props) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);
  // console.log(course);

  return (
    <>
      <div className="min-h-screen flex flex-col px-16 py-10 gap-4">
        <h1 className="text-2xl font-semibold">Add Course</h1>
        <EditCourseForm course={course} />
      </div>
    </>
  );
}
