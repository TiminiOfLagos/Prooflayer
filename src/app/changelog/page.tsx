import type { Metadata } from "next";

import { ChangelogList } from "@/components/changelog/ChangelogList";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Band } from "@/components/ui/Primitives";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Releases across evaluations, red-teaming, guardrails, the API and the platform.`,
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title="Every release, and what it changed."
        copy="Every entry links to the documentation it affects. A release note without docs is an announcement."
        meta={["5 releases", "Filterable by area", "Docs linked per entry"]}
      />

      <Band tone="dark" bordered={false} className="pt-12 sm:pt-14">
        <Container>
          <ChangelogList />
        </Container>
      </Band>

      <CTASection
        eyebrow="Stay current"
        title="New suites are worth nothing if you never run them."
        copy={`Point ${brand.name} at your agent once, and every release above starts applying to your own system.`}
        secondary={{ label: "View quickstart", href: routes.quickstart }}
      />
    </>
  );
}
