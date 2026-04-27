import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { BetterWay } from "@/components/sections/BetterWay";
import { MeetDrGabi } from "@/components/sections/MeetDrGabi";
import { DrGabiHub } from "@/components/sections/DrGabiHub";
import { Process } from "@/components/sections/Process";
import { FoundingMember } from "@/components/sections/FoundingMember";
import { BiologicalPrecision } from "@/components/sections/BiologicalPrecision";
import { OnSite } from "@/components/sections/OnSite";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problem />
        <BetterWay />
        <MeetDrGabi />
        <DrGabiHub />
        <Process />
        <FoundingMember />
        <BiologicalPrecision />
        <OnSite />
      </main>
      <SiteFooter />
    </>
  );
}
