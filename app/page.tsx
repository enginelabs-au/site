import HomeSplash from "@/app/_components/HomeSplash";
import HomeBriefPanel from "@/app/_components/HomeBriefPanel";
import HomeRepoReadme from "@/app/_components/HomeRepoReadme";
import HomeClosingCta from "@/app/_components/HomeClosingCta";
import HomeContactSection from "@/app/_components/HomeContactSection";

export default function HomePage() {
  return (
    <>
      <HomeSplash />
      <HomeBriefPanel />
      <HomeRepoReadme />
      <HomeClosingCta />
      <HomeContactSection />
    </>
  );
}
