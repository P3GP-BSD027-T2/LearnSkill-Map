import { verifyToken } from "@/helpers/jwt";
import SkillDetail from "./ClientSkillComponent";
import { cookies } from "next/headers";

export default async function SkillPage() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;
  let userId: string | null = null;

  type UserBasic = { _id: string };
  type UserWithRole = { _id: string; role: string };

  if (token) {
    const userData = verifyToken(token) as UserBasic | UserWithRole;
    userId = userData._id;
  }

  return <SkillDetail userId={userId} />;
}
