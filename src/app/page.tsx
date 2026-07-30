import MakerProfile from "@/components/MakerProfile";
import SpaceJourneyWrapper from "@/components/SpaceJourneyWrapper";
import WorkArchive from "@/components/WorkArchive";

export default function Home() {
  return (
    <main>
      <SpaceJourneyWrapper />
      <MakerProfile />
      <WorkArchive />
    </main>
  );
}
