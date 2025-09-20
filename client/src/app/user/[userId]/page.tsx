import Achievement from "@/components/Achievement";
import ProfileCard from "@/components/ProfileCard";
import RoadmapProgress from "@/components/RoadmapProgress";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-1 flex-col min-h-screen px-36 py-6 gap-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col col-span-1 gap-6">
            <ProfileCard />
            <Achievement />
          </div>
          <RoadmapProgress />
        </div>
      </div>
    </>
  );
}
