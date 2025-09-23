import RoadmapCard from "@/components/RoadmapCard";
import { getSkillBySlug, getUserById } from "@/server-action";
import { headers } from "next/headers";

export default async function MyRoadmapPage() {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  const data = await getUserById(userId);
  console.log(userId);
  return (
    <>
      <div className="flex  grid min-h-screen grid-cols-3 gap-2 py-6 px-36 gap-8">
        <div className="w-full">
          {data?.skills?.map(async (val, idx) => {
            return (
              <RoadmapCard
                data={val}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
