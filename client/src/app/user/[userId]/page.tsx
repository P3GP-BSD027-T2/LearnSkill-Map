import Achievement from "@/components/Achievement";
import ProfileCard from "@/components/ProfileCard";
import RoadmapProgress from "@/components/RoadmapProgress";
import { getUserById } from "@/server-action";
import { headers } from "next/headers";

export type Skills = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  created_at: string;
};

export type Course = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail: string;
  price: number;
  currency: string;
  duration: number;
  level: string;
  status: string;
  created_at: string;
  updated_at: string;
  purchased_at: string;
};

export type UserData = {
  _id: string;
  roadmap_id: string;
  roadmap_title: string;
  node_id: string;
  node_title: string;
  node_description: string;
  order: number;
  completed_at: string;
  estimated_hours: number;
  skills: Skills;
};

// export type UserCredential = {
//   _id: string;
//   name: string;
//   email: string;
// };

export type Progress = UserData[];

export type Data = {
  owned_courses: Course[];
  _id: string;
  name: string;
  email: string;
  progress: Progress;
};

export default async function ProfilePage() {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  const userData = await getUserById(userId);
  // console.log(userData.owned_courses[0]);
  return (
    <>
      <div className="flex flex-1 flex-col min-h-screen px-36 py-6 gap-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-1 gap-6">
            <ProfileCard data={userData} />
            <Achievement />
          </div>
          <div className="col-span-2">
            <RoadmapProgress data={userData} />
          </div>
        </div>
      </div>
    </>
  );
}
