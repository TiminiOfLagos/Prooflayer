import { brand } from "@/config/brand";

export type IconKey =
  | "evaluations"
  | "redteam"
  | "guardrails"
  | "monitoring"
  | "demo"
  | "overview"
  | "agents"
  | "retrieval"
  | "copilot"
  | "internal"
  | "docs"
  | "changelog"
  | "security"
  | "pricing";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon: IconKey;
};

/** A labelled column inside a mega-menu panel. */
export type NavColumn = {
  title: string;
  links: NavLink[];
  /** Compact columns show the title only, no description line. */
  compact?: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  columns?: NavColumn[];
};

/** Routes are declared once so navigation, footer and sitemap cannot drift apart. */
export const routes = {
  home: "/",
  product: "/product",
  evaluations: "/evaluations",
  redTeaming: "/red-teaming",
  guardrails: "/guardrails",
  monitoring: "/product#monitoring",
  demo: "/demo",
  docs: "/docs",
  quickstart: "/docs/quickstart/run-your-first-evaluation",
  security: "/security",
  pricing: "/pricing",
  careers: "/careers",
  changelog: "/changelog",
  apiKey: "/api-key",
  signIn: "/api-key#sign-in",
} as const;

export const primaryNav: NavItem[] = [
  {
    label: "Product",
    columns: [
      {
        title: "By capability",
        links: [
          {
            label: "Evaluations",
            href: routes.evaluations,
            description: "Repeatable tests for expected behaviour",
            icon: "evaluations",
          },
          {
            label: "Red-teaming",
            href: routes.redTeaming,
            description: "Adversarial simulations across your system",
            icon: "redteam",
          },
          {
            label: "Guardrails",
            href: routes.guardrails,
            description: "Prove that policies hold under pressure",
            icon: "guardrails",
          },
          {
            label: "Continuous monitoring",
            href: routes.monitoring,
            description: "Keep scoring after release",
            icon: "monitoring",
          },
        ],
      },
      {
        title: "Get started",
        compact: true,
        links: [
          { label: "Interactive demo", href: routes.demo, icon: "demo" },
          { label: "Product overview", href: routes.product, icon: "overview" },
          { label: "Quickstart", href: routes.quickstart, icon: "docs" },
          { label: "Changelog", href: routes.changelog, icon: "changelog" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        title: "By system",
        links: [
          {
            label: "Agents and tool use",
            href: "/red-teaming#tool-misuse",
            description: "Permission escalation and unsafe calls",
            icon: "agents",
          },
          {
            label: "RAG and retrieval",
            href: "/evaluations#groundedness",
            description: "Citation accuracy and unsupported claims",
            icon: "retrieval",
          },
          {
            label: "Customer-facing copilots",
            href: "/guardrails#output-policies",
            description: "Output policies and escalation rules",
            icon: "copilot",
          },
          {
            label: "Internal assistants",
            href: routes.demo,
            description: "Data boundaries for company knowledge",
            icon: "internal",
          },
        ],
      },
      {
        title: "Resources",
        compact: true,
        links: [
          { label: "Documentation", href: routes.docs, icon: "docs" },
          { label: "Security", href: routes.security, icon: "security" },
          { label: "Pricing", href: routes.pricing, icon: "pricing" },
          { label: "Careers", href: routes.careers, icon: "internal" },
        ],
      },
    ],
  },
  { label: "Docs", href: routes.docs },
  { label: "Security", href: routes.security },
  { label: "Pricing", href: routes.pricing },
  { label: "Changelog", href: routes.changelog },
];

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Evaluations", href: routes.evaluations },
      { label: "Red-teaming", href: routes.redTeaming },
      { label: "Guardrails", href: routes.guardrails },
      { label: "Demo", href: routes.demo },
      { label: "Pricing", href: routes.pricing },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: routes.docs },
      { label: "API reference", href: "/docs#api-reference" },
      { label: "SDKs", href: "/docs#sdks" },
      { label: "Changelog", href: routes.changelog },
      { label: "Status", href: "/docs#status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Security", href: routes.security },
      { label: "Careers", href: routes.careers },
      { label: "Contact", href: `mailto:${brand.supportContact}` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/security#privacy" },
      { label: "Terms", href: "/security#terms" },
      { label: "Responsible disclosure", href: "/security#responsible-disclosure" },
    ],
  },
];

/** Pages included in the generated sitemap. */
export const sitemapRoutes = [
  routes.home,
  routes.product,
  routes.evaluations,
  routes.redTeaming,
  routes.guardrails,
  routes.demo,
  routes.docs,
  routes.quickstart,
  routes.security,
  routes.pricing,
  routes.careers,
  routes.changelog,
  routes.apiKey,
];
