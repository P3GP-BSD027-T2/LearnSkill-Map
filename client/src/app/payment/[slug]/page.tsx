import PaymentCard from "@/components/PaymentCard";
import { verifyToken } from "@/helpers/jwt";
import { getCourseBySlug } from "@/server-action";
import { cookies } from "next/headers";

export default async function PaymentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  // console.log(slug);
  const course = await getCourseBySlug(slug);

  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  let userId: string | null = null;

  type UserBasic = { _id: string };
  type UserWithRole = { _id: string; role: string };

  if (token) {
    const userData = verifyToken(token) as UserBasic | UserWithRole;
    userId = userData._id;
  }

  return (
    <>
      <div className="flex items-center justify-center pt-28">
        <PaymentCard course={course} userId={userId} />
      </div>
    </>
  );
}
