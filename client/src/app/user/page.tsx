import Achievement from "@/components/Achievement";
import ProfileCard from "@/components/ProfileCard";
import RoadmapProgress from "@/components/RoadmapProgress";
import { getUserById } from "@/server-action";
import { headers } from "next/headers";

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

// export type UserCredential = {
//   _id: string;
//   name: string;
//   email: string;
// };

export type Progress = {
  _id: string;
  completed_at: string;
};

export type Node = {
  _id: string;
  title: string;
  description: string;
  order: number;
  prerequisites: [string];
  estimated_hours: number;
  progress: Progress;
};

export type Roadmap = {
  _id: string;
  title: string;
  created_at: string;
  nodes: Node[];
};

export type Skill = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  created_at: string;
  roadmap: Roadmap;
};

export type Data = {
  owned_courses: Course[];
  _id: string;
  name: string;
  email: string;
  skills: Skill[];
};

export default async function ProfilePage() {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  const userData = await getUserById(userId);
  // console.log(userData.skills[0].roadmap.nodes[0].progress);
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
