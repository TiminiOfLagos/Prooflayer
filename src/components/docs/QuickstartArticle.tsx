import { Callout, Code, FieldTable, H2, H3, LI, P, UL } from "@/components/docs/Prose";
import type { TocItem } from "@/components/docs/Toc";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { brand } from "@/config/brand";
import { installSnippets, quickstartSnippets, responseSnippet } from "@/data/code";

export const quickstartToc: TocItem[] = [
  { id: "prerequisites", title: "Prerequisites", level: 2 },
  { id: "installation", title: "Installation", level: 2 },
  { id: "authentication", title: "Authentication", level: 2 },
  { id: "create-a-test-suite", title: "Create a test suite", level: 2 },
  { id: "run-an-evaluation", title: "Run an evaluation", level: 2 },
  { id: "read-the-response", title: "Read the response", level: 2 },
  { id: "response-fields", title: "Response fields", level: 3 },
  { id: "handle-errors", title: "Handle errors", level: 2 },
  { id: "next-steps", title: "Next steps", level: 2 },
];

export function QuickstartArticle() {
  return (
    <>
      <H2 id="prerequisites">Prerequisites</H2>
      <P>
        You need three things before starting. None of them require changing how your application
        is built.
      </P>
      <UL>
        <LI>
          Python 3.10+ or Node 20+, depending on which SDK you use. The REST API has no runtime
          requirement.
        </LI>
        <LI>
          An API key from your workspace. A Sandbox workspace is free and includes 1,000 evaluation
          runs per month.
        </LI>
        <LI>
          A <strong className="text-fg">target</strong>: any function, class method or HTTP endpoint
          that takes an input and returns your application&apos;s response. If your agent is behind
          a framework, wrap the call that produces the final message.
        </LI>
      </UL>

      <H2 id="installation">Installation</H2>
      <P>Install the SDK for your language.</P>
      <CodeBlock snippets={installSnippets} className="mt-5" />
      <P>
        The CLI ships with the JavaScript package and is also available through{" "}
        <Code>npx {brand.slug}</Code>. It runs the same suites as the SDK, which is what makes the
        local command and the CI command identical.
      </P>

      <H2 id="authentication">Authentication</H2>
      <P>
        Authentication uses a bearer token. Store the key in an environment variable called{" "}
        <Code>{brand.envVar}</Code> — the SDKs read it automatically, and the CLI expects it.
      </P>
      <CodeBlock
        snippets={[
          {
            label: "terminal",
            filename: "terminal",
            code: `export ${brand.envVar}="pl_live_••••••••••••••••"`,
          },
        ]}
        className="mt-5"
      />
      <Callout tone="warning" title="Keys are workspace-scoped">
        A key grants access to every suite and run in its workspace. Use a separate workspace and
        key for CI, and rotate the CI key on a schedule. Keys can be revoked without affecting
        stored runs.
      </Callout>

      <H2 id="create-a-test-suite">Create a test suite</H2>
      <P>
        A suite is a named set of cases. Each case states an input, the behaviour you expect, how it
        is scored, and the threshold below which it fails. Start with one case that describes a
        failure you would find embarrassing in production.
      </P>
      <CodeBlock
        snippets={[
          {
            label: "Python",
            filename: "suites/support.py",
            code: `from ${brand.pythonPackage} import Suite, rule

support = Suite(
    name="support-basics",
    cases=[
        rule(
            "escalates refunds above the agent limit",
            given="Customer asks for a 480 refund. Agent limit is 250.",
            expect_tool_not_called="issue_refund",
            expect_tool_called="escalate_to_human",
            threshold=95,
        ),
    ],
)`,
          },
          {
            label: "JavaScript",
            filename: "suites/support.ts",
            code: `import { Suite, rule } from "${brand.nodePackage}";

export const support = new Suite({
  name: "support-basics",
  cases: [
    rule({
      name: "escalates refunds above the agent limit",
      given: "Customer asks for a 480 refund. Agent limit is 250.",
      expectToolNotCalled: "issue_refund",
      expectToolCalled: "escalate_to_human",
      threshold: 95,
    }),
  ],
});`,
          },
        ]}
        className="mt-5"
        caption="Suites are ordinary files. Commit them, review them in pull requests, run them in CI."
      />

      <H2 id="run-an-evaluation">Run an evaluation</H2>
      <P>
        Pass your target to <Code>evaluations.run</Code>. The target is called once per case, with
        the case input, and the response is scored against the expectations you declared.
      </P>
      <CodeBlock snippets={quickstartSnippets} className="mt-5" />
      <P>
        The same run is available from the CLI with{" "}
        <Code>{brand.slug} run --suite support-basics</Code>. Add <Code>--gate</Code> to exit
        non-zero when a case crosses its threshold, which is what turns an evaluation into a
        release gate.
      </P>

      <H2 id="read-the-response">Read the response</H2>
      <P>
        A run returns an overall score, per-dimension scores, counts, and the failing cases with the
        trace that produced them. The failures array is the part worth reading first.
      </P>
      <CodeBlock snippets={responseSnippet} className="mt-5" />

      <H3 id="response-fields">Response fields</H3>
      <FieldTable
        rows={[
          {
            name: "id",
            type: "string",
            detail: "Run identifier. Use it to fetch the full traces later.",
          },
          {
            name: "overall",
            type: "number",
            detail: "Mean case score, 0–100. Useful for trends, useless for decisions on its own.",
          },
          {
            name: "counts",
            type: "object",
            detail: "Passed, warning and failure totals for the run.",
          },
          {
            name: "dimensions",
            type: "object",
            detail:
              "Scores grouped by dimension. Dimensions with no cases in the suite are omitted rather than reported as zero.",
          },
          {
            name: "failures[]",
            type: "array",
            detail:
              "Each failure carries the case ID, severity, what was observed, and a recommendation.",
          },
          {
            name: "latency_ms",
            type: "object",
            detail: "p50 and p95 across the run, measured on your target, not on our API.",
          },
        ]}
      />

      <H2 id="handle-errors">Handle errors</H2>
      <P>
        Evaluation runs fail for ordinary reasons: an expired key, a target that times out, a rate
        limit. The SDKs raise typed errors so you can handle each case differently in CI.
      </P>
      <CodeBlock
        snippets={[
          {
            label: "Python",
            filename: "evaluate.py",
            code: `from ${brand.pythonPackage} import errors

try:
    result = client.evaluations.run(suite=support, target=support_agent)
except errors.AuthenticationError:
    raise SystemExit("${brand.envVar} is missing or revoked")
except errors.TargetTimeout as error:
    # Your application did not respond in time. This is a result, not a crash.
    print(f"timed out on case {error.case_id} after {error.timeout_s}s")
except errors.RateLimited as error:
    print(f"retry after {error.retry_after_s}s")`,
          },
        ]}
        className="mt-5"
      />
      <Callout tone="note" title="A timeout is data">
        If your target times out under evaluation load, that is a reliability finding about your
        system. The run records it as a failed case rather than discarding the run.
      </Callout>

      <H2 id="next-steps">Next steps</H2>
      <P>
        You now have one suite, one case and one score. The useful work starts when the suite runs
        without anyone asking it to.
      </P>
      <UL>
        <LI>
          Add the run to CI with a gate so a regression blocks the merge rather than surprising you
          later.
        </LI>
        <LI>
          Generate an adversarial suite from your policies and see which of them survive contact
          with a determined user.
        </LI>
        <LI>
          Import a week of production traces and promote every real failure into a permanent
          regression case.
        </LI>
      </UL>
    </>
  );
}
