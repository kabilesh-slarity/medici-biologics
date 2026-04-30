import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MindHero } from "@/components/sections/MindHero";
import { MindStrap } from "@/components/sections/MindStrap";
import { MindClinical } from "@/components/sections/MindClinical";
import { MindCredentials } from "@/components/sections/MindCredentials";
import { MindBenefits } from "@/components/sections/MindBenefits";
import { MindMechanism } from "@/components/sections/MindMechanism";
import { MindTestimonial } from "@/components/sections/MindTestimonial";
import { MindPricing } from "@/components/sections/MindPricing";
import { MindQualify } from "@/components/sections/MindQualify";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <MindHero />
        <MindStrap />
        <MindClinical />
        <MindCredentials />
        <MindBenefits />
        <MindMechanism />
        <MindTestimonial />
        <MindPricing />
        <MindQualify />
      </main>
      <SiteFooter />
    </>
  );
}
