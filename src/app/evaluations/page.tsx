import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { CapabilityList, PageHero } from "@/components/sections/PageHero";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Card, Container, Band, SectionHeading } from "@/components/ui/Primitives";
import { KpiTile } from "@/components/visuals/AppFrame";
import { EvalBuilder } from "@/components/visuals/EvalBuilder";
import { RegressionCompare } from "@/components/visuals/RegressionCompare";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Evaluations",
  description:
    "Build reusable evaluation suites for accuracy, safety, consistency, latency, groundedness and task completion — and run them on every change.",
};

const scoringMethods = [
  {
    title: "Rule-based",
    copy: "Assertions, schemas, forbidden claims and latency budgets. Unambiguous when they fail.",
    meta: "deterministic",
  },
  {
    title: "Model-graded",
    copy: "A grader scores against your rubric, with its agreement rate tracked against human labels.",
    meta: "rubric",
  },
  {
    title: "Human review",
    copy: "Disputed cases routed to a queue with the full trace attached.",
    meta: "queue",
  },
  {
    title: "Custom functions",
    copy: "Your own scorer when correctness is domain-specific.",
    meta: "your code",
  },
];

const dataAndVersions = [
  { title: "Dataset management", copy: "Import traces or upload labelled sets. Datasets are versioned.", meta: "versioned" },
  {
    id: "groundedness",
    title: "Groundedness",
    copy: "Claims checked against retrieved evidence, with abstention when the corpus is silent.",
    meta: "rag",
  },
  { title: "Version comparison", copy: "Two runs, one suite, every difference per case.", meta: "diff" },
  { title: "Regression testing", copy: "Any production failure becomes a permanent case.", meta: "permanent" },
  { title: "Batch and continuous", copy: "Full suite nightly, a fast subset per pull request.", meta: "scheduled" },
  { title: "Evaluation reports", copy: "What moved, what failed, and the traces behind it.", meta: "export" },
  { title: "Team annotations", copy: "Disagreement about what counts as correct, recorded.", meta: "collaboration" },
];

export default function EvaluationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Evaluations"
        title="Turn expected behaviour into repeatable tests."
        copy="Suites that measure whether your AI product is accurate, safe, consistent and ready for release."
        primary={{ label: "Get your API key", href: routes.apiKey }}
        secondary={{ label: "Run the demo", href: routes.demo }}
      >
        <Card className="overflow-hidden p-0">
          <div className="grid grid-cols-2 divide-x divide-line sm:grid-cols-4">
            <KpiTile label="Citation accuracy" value="94" tone="pass" delta={{ value: "12", direction: "up" }} />
            <KpiTile label="Consistency @20" value="92" tone="warn" delta={{ value: "2", direction: "down" }} />
            <KpiTile
              label="Task completion"
              value="89"
              tone="warn"
              className="border-t border-line sm:border-t-0"
            />
            <KpiTile
              label="Refusal quality"
              value="98"
              tone="pass"
              delta={{ value: "0", direction: "flat" }}
              className="border-t border-line sm:border-t-0"
            />
          </div>
        </Card>
      </PageHero>

      <Band tone="dark">
        <Container>
          <SectionHeading
            eyebrow="Builder"
            title="A test case is a claim about your product."
            copy="Input, expected behaviour, scoring method, threshold. The interface writes the file."
          />
          <EvalBuilder className="mt-14" />
        </Container>
      </Band>

      <Band tone="light" bordered={false}>
        <Container>
          <SectionHeading
            eyebrow="Scoring"
            tone="light"
            align="center"
            className="mx-auto"
            title="Four ways to decide whether a response was good."
            copy="Most suites use more than one."
          />
          <CapabilityList items={scoringMethods} tone="light" className="mt-14" />
        </Container>
      </Band>

      <Band tone="dark">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              eyebrow="Suites as code"
              title="Reviewed like code, because that is what they are."
              copy="A suite is a file in your repository. It moves through pull requests and runs in CI."
            />
            <CodeBlock
              snippets={[
                {
                  label: "Python",
                  filename: "suites/support_reliability.py",
                  code: `from ${brand.pythonPackage} import Suite, rule, rubric

support_reliability = Suite(
    name="support-reliability",
    cases=[
        rule(
            "never quotes a refund window from memory",
            forbid_unsourced=["refund window", "processing time"],
        ),
        rubric(
            "asks one clarifying question when ambiguous",
            rubric="The response asks exactly one clarifying question.",
            threshold=90,
        ),
    ],
    gate_on=["severity:high"],
)`,
                },
              ]}
            />
          </div>
        </Container>
      </Band>

      <Band tone="dark" surface="raised">
        <Container>
          <SectionHeading
            eyebrow="Datasets and versions"
            title="A score is meaningless without the set it was measured on."
          />
          <CapabilityList items={dataAndVersions} columns={3} className="mt-14" />
        </Container>
      </Band>

      <Band tone="dark">
        <Container>
          <SectionHeading
            eyebrow="Comparison"
            title="Read the change case by case."
            copy="Including the differences the average score hides."
          />
          <RegressionCompare className="mt-14" />
        </Container>
      </Band>

      <CTASection
        title="Write the first case that matters."
        copy="Pick the failure that would embarrass you most in production."
        secondary={{ label: "View quickstart", href: routes.quickstart }}
      />
    </>
  );
}
