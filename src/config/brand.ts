/**
 * Central brand configuration.
 *
 * The working product name lives here and nowhere else. Every page, component,
 * metadata field, code sample, SDK name and legal line reads from this object,
 * so renaming the product is a one-line change.
 */

const NAME = "Prooflayer";

export const brand = {
  /** Working product name. Change this line to rename the product everywhere. */
  name: NAME,
  /** Lowercase machine-safe form used in code samples, packages and CLI output. */
  slug: NAME.toLowerCase(),
  /** Package / SDK identifiers shown in documentation and quickstarts. */
  pythonPackage: `${NAME.toLowerCase()}`,
  nodePackage: `@${NAME.toLowerCase()}/sdk`,
  apiHost: `api.${NAME.toLowerCase()}.dev`,
  apiVersion: "v1",
  envVar: `${NAME.toUpperCase()}_API_KEY`,
  domain: `${NAME.toLowerCase()}.dev`,
  siteUrl: `https://${NAME.toLowerCase()}.dev`,
  tagline: "Know how your AI breaks before your users do.",
  description: `${NAME} helps AI teams evaluate model behaviour, simulate adversarial scenarios, validate guardrails, and catch reliability failures before production.`,
  /** Honest framing — this is a portfolio concept, and the site says so. */
  disclaimer: `${NAME} is a fictional AI infrastructure product created as a product design and development concept.`,
  securityContact: `security@${NAME.toLowerCase()}.dev`,
  supportContact: `hello@${NAME.toLowerCase()}.dev`,
} as const;

export type Brand = typeof brand;
