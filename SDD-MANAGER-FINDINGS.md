# SDD Manager findings and proposed amendments

## Purpose and current state

This report collects outstanding SDD Manager amendments identified during the browser Tetris demonstration. It is a working findings register for subsequent plugin revision, with stable finding IDs, evidence, proposed wording, affected capabilities and behavioral validation criteria.

Report date: 2026-10-07 (Europe/Moscow). Installed plugin: SDD Manager 0.14.9. Consumer repository: [SDD-Manager-Demo-Tetris-ChatGPT-Work](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work). Starting checkpoint for this report: `470fb01f95b6ce43b329db90c61576adb8a7887b`, on `phase/1-classic-browser-tetris`. The developer requested the report in the repository root and committed on the current branch. The initial report did not implement plugin changes, enable GitHub tracking, or resume Tetris implementation. Subsequent authorized consumer operations are recorded separately.

The developer described the demonstration environment as ChatGPT Work web, Sol 6.1 Medium, lowest Pro tier, with a standard cloud computer sandbox. Executed product checks used the Linux x64 sandbox documented in the milestone reports. Model/tier statements are developer-provided context, not independently verified platform facts.

Evidence consists of the conversation, inspected installed skill instructions, repository documents and retained execution reports. Early automatic-review incidents are supported by the developer's corrections and the retained conversation account; their complete original tool traces and exact rejection wording are not present in this repository. This report does not reconstruct or invent them. Credentials are deliberately omitted.

## Authoritative clarifications

1. The developer explicitly authorized operations involved in the established SDD workflows and repeatedly objected to redundant authorization requests. The supplied repository token provided authentication and, in the context of the developer's request, signaled their intended operational authority. A credential string alone is not unrestricted authority for arbitrary destinations or effects.
2. When an automatic reviewer needs authorization context, the agent must proactively supply the existing developer grant and identify the specific operation and requested authority through the supported channel. It must not send the same authorization question back to the developer unnecessarily. Platform controls still govern execution.
3. Latest developer clarification (2026-10-07 15:00 Europe/Moscow): when the user supplies a GitHub token, GitHub issue/label/milestone tracking should be selected by default, but the manager must still ask for confirmation. This refines the preceding separate-opt-in clarification: the default recommendation is enabled; actual activation still requires confirmation. General Git publication authority must not be mistaken for that confirmation.
4. Proactive conduct applies throughout SDD Manager, not only to hosting. The manager must identify relevant capabilities, prerequisites, missing decisions and coordination gaps without waiting for the developer to discover them.
5. Notes for later plugin amendments must now be collected in this root report. Report creation and publication do not mean the amendments have been implemented or their proposed wording accepted in full.
6. SDD-F006 is a useful addition with both general and browser-specific content. The developer requires special consideration of its SDD placement. The ownership and conditional-loading arrangement below is proposed, not an accepted plugin layout change.

## Findings index

Priority reflects impact on workflow correctness and developer intervention, rather than a plugin-defined severity scale.

| ID | Finding | Origin | Priority | Disposition |
| --- | --- | --- | --- | --- |
| SDD-F001 | Manager waits for the developer to identify coordination gaps | Explicit developer amendment | High | Required principle; wording proposed; implementation outstanding |
| SDD-F002 | Token-triggered default tracking proposal and confirmation were missing | Explicit developer clarifications and observed omission | High | Default enabled with confirmation required; coordination amendment outstanding |
| SDD-F003 | Existing authority was not carried into automatic-review responses and appropriate retries | Explicit developer amendments | High | Required behavior; enforcement/examples outstanding |
| SDD-F004 | Agent explanations confuse policy, authorization and observed state | Observed error; proposed supporting amendment | High | Proposed; not separately accepted |
| SDD-F005 | Amendment notes lack a durable, accurately reported register | Developer's current collection request; proposed generalization | Medium | This report establishes the demo register; plugin guidance proposed |
| SDD-F006 | Environment recovery needs representative capability evidence and proactive alternatives | Demo evidence; developer accepts addition and flags placement | Medium | Consumer repairs verified; general/specific placement proposed; plugin revision outstanding |
| SDD-F007 | Campaign directories omit the descriptive branch slug | Developer observation during feature preparation; proposed convention amendment | Medium | Recorded; naming and compatibility rules proposed; implementation outstanding |
| SDD-F008 | Project positioning omits its learning-by-doing purpose and related projects | Explicit developer amendment; positioning wording proposed | Medium | Record experimental framing and cited context; implementation outstanding |
| SDD-F009 | Manager does not create and maintain a concise AGENTS.md orientation entry point | Explicit developer amendment | High | Mandatory creation/maintenance requested; ownership and safeguards proposed; implementation outstanding |

All nine plugin findings remain open. Operational recovery in the consumer repository is not verification of amended plugin behavior.

## SDD-F001 — Require proactive coordination throughout the manager

### Context and consequence

The developer asked why responsibility for issues, labels and milestones had been ignored. The agent had continued through T-012 without surfacing the hosting choice. The developer then clarified: “the manager MUST act proactively,” both here and generally. Waiting for corrective prompts caused repeated developer intervention and concealed an unresolved workflow decision.

The installed sdd-manage already tells the coordinator to identify the request, coordinate responsible skills and ask only for materially necessary decisions. The amendment should make proactive behavior an explicit obligation with observable checkpoints, rather than rely on those general statements being inferred correctly.

### Proposed amendment

> The manager MUST proactively identify relevant capabilities, prerequisites, missing decisions, incomplete coordination and known blockers throughout the selected workflow. It MUST act on authorized routine work, raise consequential unresolved choices at the appropriate checkpoint, and report the effect of any remaining gap. It MUST NOT wait for the developer to discover an omission, silently manufacture a decision, or expand the authorized scope to avoid asking a necessary question.

At entry, preparation handoff, phase activation and completion, check the concerns relevant to the current scope. Use existing handoffs and evidence; do not introduce a separate administrative task chain or mechanical checklist with irrelevant questions. Proactivity must preserve requested stopping boundaries and must not activate optional services automatically.

### Targets and validation

Primary targets: sdd-manage SKILL.md, coordination.md, workflows.md, phase-activation.md and examples.md. Dependent skills should return missing decisions or coordination gaps to the manager.

Behavioral validation: a new project request with a GitHub repository triggers a timely hosting-choice offer; a missing prerequisite is surfaced before dependent execution; an already-authorized routine operation proceeds without another permission request; an explicit pause is respected. Inspect actual agent behavior, not just the presence of MUST in a file.

## SDD-F002 — Default to GitHub tracking when a token is supplied, with confirmation

### Context and evidence

PLAN and TASKS introduced conditional hosting and recorded no active tracking. Milestone [1.1](docs/dev/reports/phases/1/1.1.md) and [1.2](docs/dev/reports/phases/1/1.2.md) repeated “hosted tracking is inactive.” Those statements describe the absence of performed projection, but do not establish that the developer declined it. The choice was not proactively presented.

When challenged, the agent claimed that authorization for all workflow operations necessarily enabled tracking without another decision. The developer first clarified separate opt-in, then refined the desired policy: a supplied GitHub token should default the tracking choice to enabled, while still requiring confirmation. Current demo state is therefore **default recommendation: enable; confirmed by the developer on 2026-10-07 at 15:04 Europe/Moscow; phase 1 tracking activated and reconciled**. It is neither an established refusal nor confirmation to create objects.

The installed sdd-forge limits itself to requested hosted operations. sdd-manage coordinates hosting when requested or already active. phase-activation.md requires complete eligible-phase projection when tracking is active. Their request boundary must be retained while the manager gains an explicit token-triggered default proposal and confirmation handoff.

### Proposed amendment

> When the user supplies a GitHub token for the established repository workflow, the manager MUST select GitHub tracking as the default recommendation and proactively ask for confirmation before activating it. It MUST state the concrete projection and lifecycle scope. Record default recommendation, pending confirmation and confirmed activation as distinct facts; do not silently leave tracking off or create hosted objects before confirmation.
>
> Before phase activation, establish whether tracking is confirmed, already active, explicitly declined or awaiting a decision. Respect an explicit decline. When confirmation already covers the same repository/scope, carry it forward without asking again. Without a supplied token, proactively offer supported tracking where relevant, but do not invent credentials, account access or consent. Git publication and hosted tracking remain distinct workflow effects.

The offer should state what will be managed: the eligible phase label, hosted milestones and task issues, their associations, and verification-based closures. Once opted in, perform required projection/readback and maintained lifecycle operations without repeated approvals. If declined, continue local/Git workflows without nagging. If unresolved, retain the default-enabled recommendation and pending-confirmation state; do not label it as a refusal or silently claim activation consent exists.

If tracking is opted into after local execution has begun, reconcile the existing phase idempotently: discover existing objects, create only missing eligible objects, attach retained completion evidence, close verified tasks/milestones and leave incomplete work open. Do not replay completed product tasks or rewrite history to pretend projection preceded them.

### Targets and validation

Targets: sdd-manage phase-activation.md, workflows.md, examples.md; sdd-implement startup handoff; sdd-forge GitHub projection/lifecycle guidance; sdd-report hosted-state wording.

Validate token-supplied/default-enabled/pending-confirmation, confirmed, declined, already-active, no-token and late-confirmation cases. The token-supplied case must produce a concrete activation proposal and confirmation question without any premature hosted write. At the initial report checkpoint, the late-opt-in proposal covered one eligible phase, six milestones and 26 tasks; T-001–T-012 and milestones 1.1–1.2 then had completed local evidence. The confirmed reconciliation and subsequent continuation are recorded below. Those consumer operations do not verify this proposed plugin amendment.

## SDD-F003 — Carry existing authorization into review responses and supported retries

### Context and outstanding developer notes

The early Git publication sequence repeatedly returned authorization questions to the developer despite their established repository/workflow request and supplied token. The developer explicitly asked why the agent had not retried using that existing authority and requested stronger SDD instructions. They also required the agent to respond automatically to the reviewer, identifying the specific requested authorization.

These are three related obligations: recognize the actual scoped grant; proactively provide it to the reviewer; continue an appropriately contextualized supported operation when the rejection is a resolvable authorization-context mismatch. Authentication suitability and platform execution permission remain separate checks.

The installed revision-authorization.md already says to reuse actual human authorization, distinguish missing authority from platform denial, supply concrete scope/evidence through a supported channel, and avoid unchanged retries or bypasses. The failure demonstrates an enforcement/consumer-behavior gap; it does not prove that these rules are absent.

### Proposed amendment

> Before asking the developer to authorize an operation, the manager MUST inspect the current request and standing session grants. A token supplied for a named repository workflow MUST be interpreted together with the accompanying request and explicit authority statements. The agent MUST carry that established authority through coordinator/worker handoffs and publication operations; it MUST NOT claim that authority is missing merely because authentication uses a token.
>
> On an automatic-review rejection or request for authorization context, the agent MUST identify the specific proposed operation, destination/ref or hosted object, payload scope, prior developer grant and applicable verification. It MUST proactively supply that information through the platform-supported operation/review channel where available. If the denial is demonstrably caused by missing context and the supported channel permits reconsideration, the agent MUST attempt the appropriately contextualized operation without requiring the developer to restate the same grant.
>
> This obligation does not override platform controls. Do not retry an unchanged denied request, switch tools/accounts/transports to evade a denial, or fabricate authority. A genuine missing grant or explicit platform requirement for additional human confirmation must be reported with its exact origin and reason.

Operation context must identify the authority needed: for example, normal push of the verified report commit to the established phase branch, or creation of the opted-in phase's task issues. “Token provided” alone is insufficient context. Never expose the token in reviewer explanations, ordinary output, reports or commit content.

A supported reviewer channel may be operation context attached to the tool request; a separate direct reviewer-messaging API cannot be assumed. If no supported reconsideration path exists, report that limitation and preserve pending work. Do not promise that plugin wording disables automatic review.

### Targets and validation

Targets: sdd-manage revision-authorization.md, credentials.md, coordination.md and examples.md; sdd-implement startup/completion handoffs; sdd-forge credential/hosted-operation handoffs.

Behavioral cases: existing grant plus missing review context yields a contextualized supported response/retry without developer nagging; a suitable token plus a genuine policy denial does not trigger token replacement or circumvention; a credential without a scoped request does not authorize arbitrary writes; revoked authority is respected; explicit platform-required confirmation identifies that platform requirement accurately. Assess recorded operation/result sequences and whether secrets stayed absent. Do not fabricate a live denial merely to manufacture evidence.

## SDD-F004 — Diagnose omissions accurately and separate authority from capability selection

### Context and consequence

The agent's explanation for missing hosted tracking incorrectly treated broad operation authority as mandatory activation of an optional capability. That apology proposed creating all phase objects without first preserving the separate opt-in distinction. The developer corrected the diagnosis.

Agent-authored planning text can also become circular evidence: recording an assumed mode and later citing that text as proof of a developer decision. Reports need to distinguish performed state, user decisions, policy requirements and unresolved choices.

### Proposed amendment

> When explaining a workflow omission, the manager MUST compare the applicable instruction, actual developer decision, recorded execution state and observed failure. It MUST distinguish authorization to perform an operation from the decision to activate an optional capability. It MUST NOT treat its own unconfirmed assumptions as developer instructions or invent a policy violation to justify an apology or repair proposal.

Explain the actual cause and its evidence. Here, the cause is missing proactive opt-in coordination, not compulsory hosting ignored. Correct the diagnosis explicitly while retaining the observed absence of hosted objects. Where original traces are unavailable, label the evidence limit instead of quoting an invented rejection reason.

Targets: sdd-manage review-and-revision.md and examples.md; sdd-report change kinds and completion/status reporting. Validation: challenge an omitted optional capability and confirm the agent identifies the unresolved choice, rather than treating the default recommendation as completed confirmation or blaming authentication without evidence.

## SDD-F005 — Persist amendment notes and report their storage/status truthfully

### Context

Several developer corrections were marked as notes for later amendments. Before this request, they existed in the conversation, not in a committed findings artifact. The developer now requested a comprehensive root report. This file establishes that durable register for the demo.

### Proposed amendment

> The manager MUST preserve explicit amendment findings in the established findings/backlog artifact when writing it is within scope. Record stable identity, context/evidence, proposed correction, affected owners, validation and disposition. If notes exist only in conversation, say so; do not imply that a durable file or implemented amendment exists. Consolidate related findings without losing distinct requirements or later clarifications.

Respect explicit artifact location, branch and publication limits. Do not create a plugin revision campaign or modify installed skills merely because a finding was recorded. Do not copy credentials into the register. When a later amendment changes a finding's disposition, retain its original evidence and add the decision/verification result. Link implementation evidence before marking Verified.

Targets: sdd-manage coordination/review guidance and sdd-report campaign artifacts. Validate that notes are collected under authorized persistence, rejected proposals remain distinguishable from implemented changes, and conversation-only records are reported honestly.

## SDD-F006 — Proactively explore installation recovery and verify representative browser capability

### Execution evidence

Standard Chromium downloads returned HTML instead of archives. A downloaded Chrome stable binary crashed. The developer had to request alternative installation exploration. Packaged Chromium then launched, but a single smoke test missed successive-context failure; later DOM assertions missed absent rendered text. These defects were repaired in the consumer and documented as M1.1-F001/F002 in the [milestone 1.1 report](docs/dev/reports/phases/1/1.1.md).

The working route uses pinned npm assets, ownership-safe extraction, multiprocess launch and a local font configuration. Fresh-cache checks, glyph rasterization, cell-pixel checks and inspected screenshots provide evidence beyond package installation or DOM presence. This recommendation generalizes that lesson; it does not mandate this package for other projects.

Further phase verification found a browser-specific evidence limit: native second-page activation did not change headless focus/visibility properties, even with focus emulation disabled. [Milestone 1.3](docs/dev/reports/phases/1/1.3.md) records controlled event-handler evidence separately from unverified native desktop delivery. Conditional browser guidance should preserve this distinction rather than equate a passing modeled handler test with native environment capability.

### Proposed amendment

The developer identified a placement concern: this finding combines a general coordination obligation with technical lessons specific to browser testing. Keep the stable finding identity, but separate its normative policy from conditional guidance. Browser installation and rendering probes must not become requirements for every SDD project.

General recovery policy:

> On an environment or tooling blocker, the manager MUST coordinate investigation of reasonable supported alternatives within the authorized scope before declaring the work blocked. Route technical investigation to the responsible workflow, retain successful partial work, and disclose material substitutions under the existing decision process. Bound investigation by real scope and constraints, not an arbitrary retry quota.

General verification policy:

> Readiness evidence MUST establish the capabilities required by the planned checks. Select representative probes appropriate to those checks and record actual environment coverage and limitations. Installation success or a trivial smoke check alone does not establish capabilities it did not exercise.

Conditional browser guidance applies those policies to the demo: inspect downloaded artifact validity and executable compatibility; check successive contexts when the suite uses them; check glyph rendering, Canvas pixels and visual output when acceptance depends on them; verify fresh-cache setup when reproducible provisioning is required. These are examples selected by project needs, not a universal browser checklist. The pinned package, extraction options and font configuration remain a demonstrated recovery recipe rather than prescribed dependencies.

### Proposed SDD placement and loading

| Layer | Proposed owner / placement | Loading trigger and boundary |
| --- | --- | --- |
| General recovery coordination | sdd-manage blocker coordination | Any relevant environment/tooling blocker; owns escalation, scope, decisions and handoff, without embedding browser recipes. |
| Technical recovery execution | sdd-implement startup/task execution, with a conditional troubleshooting reference | An installation or runtime blocker during execution; investigates artifacts, compatibility and alternatives, then returns evidence to the manager. Other affected workflows retain their own technical execution ownership. |
| General evidence adequacy | sdd-verify check selection/evidence | Selection or assessment of verification; derives readiness probes from required capabilities rather than requiring browser tooling. |
| Browser-specific application | Conditional browser guidance referenced by sdd-implement and sdd-verify | Browser provisioning, session or rendering checks are relevant to the selected work; contains recovery examples and capability probes, loaded only when needed. |

Use progressive disclosure: core instructions carry the general obligations and short routing triggers; a shared conditional reference carries the browser detail. Its exact filename and location require a plugin-layout review before implementation. No new standalone skill is proposed, and no reference file has been created. Avoid copying the same policy or package-specific workaround into several skills. A genuine policy denial remains governed by SDD-F003 and cannot be reframed as an installation obstacle to work around.

### Placement and behavioral validation

Validate both layers: a non-browser tooling failure must trigger scoped recovery without loading browser guidance; an engine-only task must not acquire browser/font/Canvas prerequisites. For relevant browser work, validate an unavailable download route with a supported alternative, malformed HTTP-200 artifacts, successive-context failure, DOM text without glyph pixels and fresh-cache reproduction as applicable to the planned checks. Review ownership and routing for gaps or duplicate policy. These amended-plugin scenarios remain unexecuted; the consumer evidence establishes the motivating failures and repairs only.

## SDD-F007 — Preserve descriptive slugs in campaign directory names

### Context and consequence

During preparation of the piece-control extension, the branch was named `feature/001_a043a43-piece-controls`, while its package directory was `docs/dev/features/001_a043a43/`. The developer asked why the directory omitted `piece-controls` and whether this was a template defect, then requested that the concern be added to this register.

The installed 0.14.9 workflow-identity convention explicitly uses `feature/<campaign>-<slug>` for branches and `docs/dev/features/<campaign>/` for directories. The agent followed that convention; the mismatch is a convention-design concern rather than an execution naming error. The campaign identity `001_a043a43` carries sequence and baseline, while `piece-controls` conveys purpose. Omitting the slug from the directory makes feature packages harder to identify in directory listings and requires opening their README for context.

### Proposed amendment and compatibility

> New feature package directories SHOULD include the same descriptive slug as their associated working branch: `feature/<campaign>-<slug>` maps to `docs/dev/features/<campaign>-<slug>/`. Keep `<campaign>` as the stable sequence/baseline identity, separately from the descriptive slug. Record the actual branch, directory, target and full baseline in the package README.

For this example, the proposed directory is `docs/dev/features/001_a043a43-piece-controls/`, with stable campaign ID `001_a043a43`. This is a proposed convention change, not an instruction already present in the installed plugin. The developer requested recording the finding; no directory rename or installed-plugin revision is performed by this report update.

Review equivalent naming for formal review/revision and phase-nested steering directories before selecting a consistent cross-workflow policy. Their inclusion is a design question for plugin revision, not an automatically accepted expansion. Phase-number directory conventions need not acquire a campaign identity.

Allocation and discovery must parse the stable campaign prefix, preserve the repository-wide sequence across workflows, and detect duplicate campaign reservations despite differing slugs. When a branch requires a collision suffix, establish and record the corresponding descriptive directory name without reallocating the campaign. Preserve established packages and explicit naming overrides on continuation; do not rename existing paths automatically. An explicitly selected rename must repair incoming/outgoing links, archive paths and retained references atomically and verify that active sources remain discoverable.

### Proposed ownership and validation

- **sdd-conventions:** canonical identity, branch/directory mapping, slug and collision rules, and compatibility for established names.
- **sdd-manage:** allocation, setup, discovery and continuation using the actual recorded association.
- **sdd-integrate-feature:** incorporation/archive paths and navigation repair using that association.
- **Dependent references/templates:** reconcile package examples, handoffs and path assumptions without creating a separate registry.

Validate creation of a new descriptive package; allocation beside existing unsuffixed packages; continuation of legacy and explicitly overridden names; duplicate sequence identities with different slugs; collision suffixes; archive/link integrity; and an explicitly requested rename. Verify that campaign ID stays stable as HEAD or descriptive context changes. No amended-plugin scenario has been run for this finding.

## SDD-F008 — Explain project positioning and learning-by-doing purpose

### Context and consequence

The developer identified missing positioning of SDD Manager as probably a learning-by-doing experiment and requested citation of leading related projects such as GitHub Spec Kit and Superpowers. This concerns the SDD Manager project's public description, not a redefinition of the Tetris game's product purpose. The demo supplies practical workflow evidence and findings that can inform that positioning.

Without a clear purpose and maturity statement, readers can mistake a developing experiment for an established comprehensive methodology. Conversely, describing only a collection of capabilities omits why this project exists and how practical consumer runs inform its development. The developer's tentative experimental characterization should become reviewable wording rather than an invented account of the author's historical intentions.

### Proposed amendment and references

Proposed public positioning:

> SDD Manager is a learning-by-doing experiment in specification-driven development with coding agents. It explores how modular skills can coordinate design, specifications, planning, implementation, verification and Git-based checkpoints, with practical project runs informing its refinement.

Accompany the introduction with a concise related-projects section linking [GitHub Spec Kit](https://github.com/github/spec-kit) and [Superpowers](https://github.com/obra/superpowers). Their official English-language repositories were inspected on 2026-10-07: Spec Kit presents structured processes, reusable templates and documented outcomes for coding agents; Superpowers presents a composable-skills development methodology. These descriptions establish relevant comparison context, not endorsement, affiliation, compatibility, superiority or a claim that SDD Manager was derived from either project.

Explain actual SDD Manager scope and demonstrated maturity separately from intended capabilities. Identify these projects as references for readers; claim inspiration, reuse or provenance only where author/repository evidence supports that relationship. The developer's term “leading” motivates selecting the references and is not a benchmark or ranking established by this report. Exact introduction wording and the experimental status statement remain proposals for maintainer review.

### Proposed ownership and validation

Public positioning belongs in the plugin repository README and consistent manifest/interface descriptions where space permits. sdd-manage's own project-design/brief guidance should help establish purpose, learning objectives and evidence-backed status when applicable, without labeling every consumer project an experiment. Shared reporting and documentation guidance should prevent promotional or unsupported maturity claims.

Validate that a new reader can identify purpose, intended audience, experimental character and observed capability without campaign-number narration. Verify links against the actual named projects and distinguish related work from dependencies or attribution. Check consistency across README, project brief and manifest text; do not introduce unsupported comparative claims. This findings update changes none of those plugin artifacts.

## SDD-F009 — Create and maintain AGENTS.md for quick agent orientation

### Context and consequence

The developer requires SDD Manager to create and maintain AGENTS.md as a quick orientation entry point. The inspected Tetris repository has no root AGENTS.md despite SDD adoption, completed phase 1 and active feature preparation. Orientation currently requires discovering the usage notice, brief, governing documents, task owners and commands independently. The installed sdd-orient reads existing governing instructions but does not authorize creating them; read-only inspection alone cannot fulfill the requested maintenance obligation.

### Proposed mandatory behavior

> During authorized SDD repository adoption/bootstrap, sdd-manage MUST ensure that a root AGENTS.md provides concise, accurate agent orientation. If absent, create it; if present, integrate the required orientation while preserving applicable human-authored instructions. The manager MUST coordinate updates when material project structure, commands, governing sources, execution ownership or workflow constraints change, and verify it before affected workflow handoffs are finalized.

The entry point should identify project purpose and source/test/document locations; authoritative design/SPEC/PLAN/layout/task entry points; active feature/task-owner navigation when applicable; validated setup/check commands and shell constraints; verification/commit/publication expectations under established authorization; and how to discover relevant path-scoped instructions. Link to canonical owners instead of duplicating detailed rules, requirements, task checklists or progress records.

Keep current branch/HEAD and rapidly changing task status discoverable through Git and owning evidence rather than embedding stale snapshots. Clearly separate durable operational instructions from document navigation. No credential value, credential-file content, or transient helper path belongs in AGENTS.md. Generic vendor-neutral instructions must not promise identical automatic discovery in every host; explicitly load the file where the host does not discover it.

An existing AGENTS.md can contain controlling instructions. The manager must read it before edits, preserve manual content and scope, and resolve actual conflicts under the governing instruction hierarchy. A maintained orientation section can have clear boundaries when that prevents accidental overwrite; it must not give generated text authority to weaken existing rules or manufacture user decisions. Add nested AGENTS.md only when genuine path-specific guidance is needed, not by default throughout the tree.

### Proposed SDD placement and handoff

- **sdd-manage:** bootstrap creation and coordination of subsequent maintenance within authorized repository edits.
- **sdd-orient:** read root/applicable nested instructions, assess discoverability/currency, and report missing/stale orientation without mutation.
- **sdd-docs:** maintain concise instructions/navigation and verify commands/links when implementation changes relevant facts; route governing-policy decisions to their owner.
- **sdd-plan / sdd-integrate-feature:** recognize AGENTS.md physical ownership and refresh navigation during accepted structure/task-owner changes and archive integration.
- **sdd-implement / sdd-steer:** include affected orientation updates in their own verified work checkpoints, without creating a second journal or approval flow.

### Behavioral validation and boundary

Exercise a missing root file at adoption; a populated human-authored file with scoped instructions; material command/layout changes; active feature ownership and archive transfer; nested instruction discovery; interruption/resumption; and a host that requires explicit file loading. Verify preservation of manual instructions, canonical working links, truthful commands, concise orientation, no duplicate executable checklist, and secret exclusion. A clean startup with current instructions should cause no gratuitous rewrite or commit.

This is a requested plugin amendment. Recording it does not itself create AGENTS.md in the consumer repository or modify the installed plugin; those actions require their selected implementation scope. The manager's read-only orientation skill remains read-only.

## Consolidated revision handoff

1. Strengthen proactive coordination and explicit optional-capability decision handling (SDD-F001/F002). Apply the latest default-enabled-on-token policy with explicit activation confirmation; retain the earlier opt-in exchange as finding context.
2. Strengthen scoped-authorization recognition, automatic reviewer context and supported continuation examples (SDD-F003). Retain platform-control boundaries and secret handling.
3. Align diagnosis and reporting language with actual decisions/evidence (SDD-F004/F005). Existing records must not manufacture user decisions.
4. Review SDD-F006 placement before implementation: put general recovery coordination in sdd-manage and evidence adequacy in sdd-verify; route technical execution and conditionally loaded browser guidance without duplicating policy. Reuse the demo evidence without imposing browser checks on unrelated projects or claiming general compatibility.
5. Align descriptive feature branch/package naming while preserving stable campaign identity and existing packages (SDD-F007); review allocation, collision, discovery and archive consumers together.
6. Establish honest learning-by-doing positioning and cite relevant reference projects without unsupported provenance or maturity claims (SDD-F008).
7. Add bootstrap and ongoing AGENTS.md orientation maintenance with preserved governing instructions and explicit read-only inspection ownership (SDD-F009).
8. Review cross-skill consistency and run consumer-behavior scenarios before marking plugin amendments verified. Structural text checks alone do not prove proactive coordination or correct review responses.

The principle of proactivity, token-triggered default tracking with confirmation, and authorization/reviewer-response obligations were explicitly requested or clarified by the developer. Detailed wording, cross-file placement and the supporting recommendations remain proposals. This report is not an accepted plugin revision plan and does not change the installed version.

## Scope preserved and evidence limits

At initial report creation, Tetris implementation was paused after T-012 and phase 1 was incomplete/unmerged. Subsequent authorized continuation is recorded below. The developer confirmed GitHub tracking on 2026-10-07 at 15:04 Europe/Moscow. Reconciliation of this existing phase is complete; the milestone reports' inactive-state statements are not proof of a developer refusal. No product-rule amendment is proposed here: the locking typo was corrected in conversation and the accepted next-blocked-gravity-tick rule is implemented and tested.

Successful existing practices include incremental commits/pushes, bounded milestone pauses, pure engine seams, accurate partial-acceptance reporting, and distinguishing behavioral RED from setup/characterization evidence. Their presence does not resolve the open coordination findings; they should remain intact during plugin revision.

No installed plugin source was modified, no hosted labels/issues/milestones were created or closed when the initial report was written, and no additional product tasks were executed for it. Subsequent confirmed tracking activation is recorded separately below. Tests of the proposed amended plugin behavior have not been run. Report verification covers source/context consistency, local links, finding identity/status consistency, whitespace and absence of credential values. Publication is verified by the accompanying completion response, not inferred from this file's existence.


## Confirmed consumer tracking follow-up

On 2026-10-07 at 15:04 Europe/Moscow, the developer confirmed the proposed activation of phase 1 GitHub tracking and reconciliation of verified T-001–T-012 / milestones 1.1–1.2. This supplies the previously pending capability-selection decision. Projection/readback and completion reconciliation are complete:

- Created one managed phase label, preserving existing unrelated labels.
- Created six native milestones and 26 task issues with exact SDD identity markers and phase/milestone associations.
- Closed T-001–T-012 with task commit and verification evidence comments. These closures represent verified work on the phase branch, not integration into main.
- Closed and read back [milestone 1.1](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/milestone/1) and [milestone 1.2](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/milestone/2) after their constituent delivery/review issues were closed.
- Retained 14 open task issues and four open milestones. The phase remains incomplete and unmerged.
- Updated the existing TASKS context and historical milestone-report follow-ups. No separate local issue-map registry was added.

This is a late activation and evidence reconciliation; no claim is made that tracking preceded the original task execution. The general plugin amendments above remain open; consumer recovery is not a plugin revision. Hosted metadata readback and documentation checks validate this follow-up; product tests were not rerun because gameplay code and task acceptance did not change.

## Authorized phase continuation follow-up

The developer subsequently requested implementation of the rest of phase 1. T-013–T-026 completed the consumer product and review evidence. Explicit merge `81943b1c6f1c244315e9b87a0c3e100f4d4953c4` into main passed 85 unit / 45 browser checks plus typecheck/build, was pushed and was read back from the remote. All 26 task issues and six milestones are closed; phase-parent completion follows that observed publication. Current acceptance and lifecycle state belong to [TASKS](docs/dev/TASKS.md), the [phase report](docs/dev/reports/phases/1/PHASE-REPORT.md) and [implementation report](docs/dev/reports/IMPLEMENTATION-REPORT.md). Historical tracking counts and pause statements above describe their original checkpoints.

The installed plugin remains 0.14.9, and all six plugin findings remain open. This continuation supplies further consumer evidence for SDD-F006's conditional browser placement; it neither revises plugin sources nor verifies amended manager behavior.

## Feature-preparation findings follow-up

SDD-F007 was added during preparation of [piece controls](docs/dev/features/001_a043a43/README.md), after the published phase 1 completion described above. At that checkpoint, the register contained seven open plugin findings. This update records the naming concern and proposed remedy; it does not rename the consumer package or change the installed plugin.

## Positioning and orientation amendments follow-up

The developer subsequently requested SDD-F008 and SDD-F009 during feature preparation. The register contains nine open plugin findings. Related-project references were checked against official repositories; proposed positioning and AGENTS.md lifecycle behavior are recorded above. No plugin description or consumer instruction file was changed by this report-only update.
