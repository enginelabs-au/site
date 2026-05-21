import HomeSplash from "@/app/_components/HomeSplash";
import HomeKeyFacts from "@/app/_components/HomeKeyFacts";
import HomeBriefPanel from "@/app/_components/HomeBriefPanel";
import HomeRepoReadme from "@/app/_components/HomeRepoReadme";
import HomeFaqSection from "@/app/_components/HomeFaqSection";
import BuiltOnStrip from "@/app/_components/BuiltOnStrip";
import HomeClosingCta from "@/app/_components/HomeClosingCta";
import HomeContactSection from "@/app/_components/HomeContactSection";

export default function HomePage() {
  return (
    <>
      <HomeSplash />
      <HomeKeyFacts />
      <HomeBriefPanel />
      <HomeRepoReadme />
      <HomeFaqSection />
      <BuiltOnStrip />
      <HomeClosingCta />
      <HomeContactSection />
    </>
  );
}
