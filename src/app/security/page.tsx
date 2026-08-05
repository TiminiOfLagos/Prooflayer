import type { Metadata } from "next";

import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { Badge, Card, Container, Band, SectionHeading } from "@/components/ui/Primitives";
import { brand } from "@/config/brand";
import { routes } from "@/config/site";

export const metadata: Metadata = {
  title: "Security and compliance",
  description: `How ${brand.name} handles evaluation data: encryption, retention, isolation, access control, redaction and private deployment.`,
};

const controls = [
  {
    id: "data-encryption",
    title: "Data encryption",
    copy: "Encrypted in transit and at rest, with keys separated per environment.",
    facts: ["TLS 1.3 in transit", "AES-256 at rest", "Per-environment keys"],
  },
  {
    id: "data-retention",
    title: "Data retention",
    copy: "Set the window per workspace; it is enforced on write, not by a nightly job.",
    facts: ["7, 30, 90 or 365 days", "Enforced on write", "Deletion receipts logged"],
  },
  {
    id: "workspace-isolation",
    title: "Workspace isolation",
    copy: "Separate keys, data and retention. Cross-workspace queries do not exist in the API.",
    facts: ["Separate keys and data", "No cross-workspace reads", "Independent retention"],
  },
  {
    id: "access-control",
    title: "Access control",
    copy: "Four roles per workspace, with export and key issuance governed separately.",
    facts: ["Owner, admin, editor, viewer", "Per-workspace assignment", "Separate export permission"],
  },
  {
    id: "single-sign-on",
    title: "Single sign-on",
    copy: "SAML and OIDC with SCIM, so leavers lose access when your directory says so.",
    facts: ["SAML 2.0 and OIDC", "SCIM provisioning", "Domain restriction"],
  },
  {
    id: "audit-logging",
    title: "Audit logging",
    copy: "Actor, timestamp and resource recorded for every run, export and permission change.",
    facts: ["Full event trail", "Exportable", "Immutable in-window"],
  },
  {
    id: "data-redaction",
    title: "Data redaction",
    copy: "Redaction runs in the SDK, so raw values never leave your environment.",
    facts: ["Client-side", "Field and pattern rules", "Traces and datasets"],
  },
  {
    id: "private-deployment",
    title: "Private deployment",
    copy: "Run the evaluation plane in your own account; only scores leave it.",
    facts: ["Your account, your VPC", "Metadata-only control plane", "Your model credentials"],
  },
  {
    id: "incident-response",
    title: "Incident response",
    copy: "Defined severities, a named owner, and notes shared with affected customers.",
    facts: ["Severity levels", "Named owner", "Customer-facing notes"],
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security and compliance"
        title="Test sensitive systems without losing control of sensitive data."
        copy="Runs hold your prompts, retrieved documents, tool arguments and failures. The platform is built on that assumption."
        primary={{ label: "Get your API key", href: routes.apiKey }}
        secondary={{ label: "Contact security", href: `mailto:${brand.securityContact}` }}
        meta={["Encryption in transit and at rest", "Configurable retention", "Private deployment"]}
      />

      {/* Honest position statement */}
      <Band tone="dark" bordered={false} className="pt-14 sm:pt-16">
        <Container>
          <Card className="border-warn/30 bg-warn-deep/25 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
              <Badge tone="warn" className="shrink-0">
                Read this first
              </Badge>
              <div>
                <h2 className="font-display text-display-sm">
                  {brand.name} is a concept product and holds no certifications.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  The controls below are designed to support enterprise security and compliance
                  requirements. They are a design specification, not an audited claim — no
                  certification badges appear here because none have been earned.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </Band>

      {/* Controls */}
      <Band tone="dark" bordered={false} className="pt-4">
        <Container>
          <SectionHeading eyebrow="Controls" title="How evaluation data is handled." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {controls.map((control) => (
              <Card key={control.id} id={control.id} className="scroll-mt-28 flex flex-col gap-4 p-5">
                <h3 className="font-display text-display-sm">{control.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-fg-muted">{control.copy}</p>
                <ul className="flex flex-col gap-1.5 border-t border-line pt-4">
                  {control.facts.map((fact) => (
                    <li
                      key={fact}
                      className="flex items-start gap-2 font-mono text-mono-xs text-fg-subtle"
                    >
                      <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-lime" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </Band>

      {/* Compliance roadmap */}
      <Band tone="dark" surface="raised">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-14">
            <SectionHeading
              eyebrow="Compliance readiness"
              title="A roadmap, described as a roadmap."
              copy="This is the sequence a product like this would follow. Nothing here is claimed as achieved."
            />
            <ol className="flex flex-col gap-3">
              {[
                {
                  phase: "Concept",
                  state: "current",
                  title: "Controls designed and documented",
                  detail:
                    "Encryption, retention, isolation, roles, redaction and audit logging specified as product behaviour.",
                },
                {
                  phase: "Phase 1",
                  state: "planned",
                  title: "Policies, DPA and subprocessor register",
                  detail:
                    "Written policies, a data processing agreement and a published subprocessor list with change notice.",
                },
                {
                  phase: "Phase 2",
                  state: "planned",
                  title: "Independent penetration test",
                  detail: "Third-party test of the API, control plane and private deployment path.",
                },
                {
                  phase: "Phase 3",
                  state: "planned",
                  title: "Formal audit",
                  detail:
                    "An audit against a recognised framework, with the report available under NDA.",
                },
              ].map((item) => (
                <li key={item.phase}>
                  <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge tone={item.state === "current" ? "lime" : "neutral"}>
                        {item.phase}
                      </Badge>
                      {item.state === "planned" ? (
                        <span className="font-mono text-mono-xs text-fg-subtle">concept</span>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-fg">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Band>

      {/* Disclosure, subprocessors, contact */}
      <Band tone="dark">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card id="responsible-disclosure" className="scroll-mt-28 flex flex-col gap-4 p-6">
              <h2 className="font-display text-display-sm">Responsible disclosure</h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                Report a suspected vulnerability to{" "}
                <a
                  href={`mailto:${brand.securityContact}`}
                  className="text-lime underline-offset-4 hover:underline"
                >
                  {brand.securityContact}
                </a>
                . A real programme would acknowledge within one business day, agree a remediation
                window with you, and credit reporters who ask to be named.
              </p>
              <ul className="flex flex-col gap-1.5 border-t border-line pt-4 font-mono text-mono-xs text-fg-subtle">
                <li>No testing against other customers&apos; workspaces</li>
                <li>No social engineering of staff or users</li>
                <li>Give us a reasonable window before publishing</li>
              </ul>
            </Card>

            <Card id="subprocessors" className="scroll-mt-28 flex flex-col gap-4 p-6">
              <h2 className="font-display text-display-sm">Subprocessors</h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                A production service would publish every subprocessor that can touch customer data,
                with purpose, region and notice period for changes.
              </p>
              <ul className="flex flex-col gap-2 border-t border-line pt-4 text-sm text-fg-muted">
                {[
                  ["Cloud hosting", "compute and storage"],
                  ["Object storage", "run artefacts and exports"],
                  ["Error monitoring", "application diagnostics"],
                  ["Email delivery", "transactional messages"],
                ].map(([name, purpose]) => (
                  <li key={name} className="flex items-baseline justify-between gap-3">
                    <span>{name}</span>
                    <span className="font-mono text-mono-xs text-fg-subtle">{purpose}</span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-mono-xs text-fg-subtle">
                Categories shown; no vendor is named in a concept build.
              </p>
            </Card>

            <Card id="security-contact" className="scroll-mt-28 flex flex-col gap-4 p-6">
              <h2 className="font-display text-display-sm">Security contact</h2>
              <p className="text-sm leading-relaxed text-fg-muted">
                Security questions, questionnaires and architecture reviews go to one address, and
                it is monitored by the people who built the system.
              </p>
              <a
                href={`mailto:${brand.securityContact}`}
                className="rounded-md border border-line-strong bg-surface-2 px-4 py-3 font-mono text-mono-sm text-lime transition-colors hover:border-lime"
              >
                {brand.securityContact}
              </a>
              <p className="font-mono text-mono-xs text-fg-subtle">
                Fictional address for a concept product.
              </p>
            </Card>
          </div>
        </Container>
      </Band>

      {/* Privacy + terms placeholders, honestly labelled */}
      <Band tone="dark" surface="raised">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Card id="privacy" className="scroll-mt-28 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-display-sm">Privacy</h2>
                <Badge tone="warn">Concept</Badge>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                A real product would publish a full privacy notice here: what is collected, the
                lawful basis, how long it is kept, who processes it, where it is stored, and how to
                exercise your rights. The product behaviour that notice would describe is set out
                in the retention, redaction and isolation sections above.
              </p>
            </Card>

            <Card id="terms" className="scroll-mt-28 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-display-sm">Terms</h2>
                <Badge tone="warn">Concept</Badge>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                A real product would publish service terms, acceptable use, uptime commitments and
                a data processing agreement here. {brand.name} is a portfolio concept and offers no
                service, so there is nothing to agree to.
              </p>
            </Card>
          </div>
        </Container>
      </Band>

      <CTASection
        title="Bring the system you are least comfortable exposing."
        copy="Redaction runs before anything is stored, retention is yours to set, and the whole evaluation plane can run in your own account."
        secondary={{ label: "Read the docs", href: routes.docs }}
      />
    </>
  );
}
