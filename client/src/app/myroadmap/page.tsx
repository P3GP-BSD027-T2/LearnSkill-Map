import RoadmapCard from "@/components/RoadmapCard";
import { getUserById } from "@/server-action";
import { headers } from "next/headers";

export default async function MyRoadmapPage() {
  const headerList = await headers();
  const userId = headerList.get("x-user-id");
  const data = await getUserById(userId);
  // console.log(userId);
  return (
    <>
      <div className="flex-1 grid grid-cols-3 gap-2 py-6 px-36">
        {data?.skills?.map(async (val, idx) => {
          return <RoadmapCard data={val} key={idx} />;
        })}
      </div>
    </>
  );
}
