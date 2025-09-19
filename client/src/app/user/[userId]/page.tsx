import Achievement from "@/components/Achievement";
import ProfileCard from "@/components/ProfileCard";
import RoadmapProgress from "@/components/RoadmapProgress";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-1 flex-col min-h-screen px-36 py-6 gap-10">
        <h1>Profile</h1>
        <ProfileCard />
        <RoadmapProgress />
        <Achievement />
      </div>
    </>
  );
}
