# SDD Manager findings and proposed amendments

## Purpose and current state

This report collects outstanding SDD Manager amendments identified during the browser Tetris demonstration. It is a working findings register for subsequent plugin revision, with stable finding IDs, evidence, proposed wording, affected capabilities and behavioral validation criteria.

Report date: 2026-10-07 (Europe/Moscow). Installed plugin: SDD Manager 0.14.9. Consumer repository: [SDD-Manager-Demo-Tetris-ChatGPT-Work](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work). Starting checkpoint for this report: `470fb01f95b6ce43b329db90c61576adb8a7887b`, on `phase/1-classic-browser-tetris`. The developer requested the report in the repository root and committed on the current branch. This report does not implement plugin changes, enable GitHub tracking, or resume Tetris implementation.

The developer described the demonstration environment as ChatGPT Work web, Sol 6.1 Medium, lowest Pro tier, with a standard cloud computer sandbox. Executed product checks used the Linux x64 sandbox documented in the milestone reports. Model/tier statements are developer-provided context, not independently verified platform facts.

Evidence consists of the conversation, inspected installed skill instructions, repository documents and retained execution reports. Early automatic-review incidents are supported by the developer's corrections and the retained conversation account; their complete original tool traces and exact rejection wording are not present in this repository. This report does not reconstruct or invent them. Credentials are deliberately omitted.

## Authoritative clarifications

1. The developer explicitly authorized operations involved in the established SDD workflows and repeatedly objected to redundant authorization requests. The supplied repository token provided authentication and, in the context of the developer's request, signaled their intended operational authority. A credential string alone is not unrestricted authority for arbitrary destinations or effects.
2. When an automatic reviewer needs authorization context, the agent must proactively supply the existing developer grant and identify the specific operation and requested authority through the supported channel. It must not send the same authorization question back to the developer unnecessarily. Platform controls still govern execution.
3. Latest developer clarification (2026-10-07 15:00 Europe/Moscow): when the user supplies a GitHub token, GitHub issue/label/milestone tracking should be selected by default, but the manager must still ask for confirmation. This refines the preceding separate-opt-in clarification: the default recommendation is enabled; actual activation still requires confirmation. General Git publication authority must not be mistaken for that confirmation.
4. Proactive conduct applies throughout SDD Manager, not only to hosting. The manager must identify relevant capabilities, prerequisites, missing decisions and coordination gaps without waiting for the developer to discover them.
5. Notes for later plugin amendments must now be collected in this root report. Report creation and publication do not mean the amendments have been implemented or their proposed wording accepted in full.

## Findings index

Priority reflects impact on workflow correctness and developer intervention, rather than a plugin-defined severity scale.

| ID | Finding | Origin | Priority | Disposition |
| --- | --- | --- | --- | --- |
| SDD-F001 | Manager waits for the developer to identify coordination gaps | Explicit developer amendment | High | Required principle; wording proposed; implementation outstanding |
| SDD-F002 | Token-triggered default tracking proposal and confirmation were missing | Explicit developer clarifications and observed omission | High | Default enabled with confirmation required; coordination amendment outstanding |
| SDD-F003 | Existing authority was not carried into automatic-review responses and appropriate retries | Explicit developer amendments | High | Required behavior; enforcement/examples outstanding |
| SDD-F004 | Agent explanations confuse policy, authorization and observed state | Observed error; proposed supporting amendment | High | Proposed; not separately accepted |
| SDD-F005 | Amendment notes lack a durable, accurately reported register | Developer's current collection request; proposed generalization | Medium | This report establishes the demo register; plugin guidance proposed |
| SDD-F006 | Environment recovery needs representative capability evidence and proactive alternatives | Demo execution evidence; proposed supporting amendment | Medium | Consumer repairs verified; general plugin amendment proposed |

All six plugin findings remain open. Operational recovery in the consumer repository is not verification of amended plugin behavior.

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

When challenged, the agent claimed that authorization for all workflow operations necessarily enabled tracking without another decision. The developer first clarified separate opt-in, then refined the desired policy: a supplied GitHub token should default the tracking choice to enabled, while still requiring confirmation. Current demo state is therefore **default recommendation: enable; activation confirmation pending**. It is neither an established refusal nor confirmation to create objects.

The installed sdd-forge limits itself to requested hosted operations. sdd-manage coordinates hosting when requested or already active. phase-activation.md requires complete eligible-phase projection when tracking is active. Their request boundary must be retained while the manager gains an explicit token-triggered default proposal and confirmation handoff.

### Proposed amendment

> When the user supplies a GitHub token for the established repository workflow, the manager MUST select GitHub tracking as the default recommendation and proactively ask for confirmation before activating it. It MUST state the concrete projection and lifecycle scope. Record default recommendation, pending confirmation and confirmed activation as distinct facts; do not silently leave tracking off or create hosted objects before confirmation.
>
> Before phase activation, establish whether tracking is confirmed, already active, explicitly declined or awaiting a decision. Respect an explicit decline. When confirmation already covers the same repository/scope, carry it forward without asking again. Without a supplied token, proactively offer supported tracking where relevant, but do not invent credentials, account access or consent. Git publication and hosted tracking remain distinct workflow effects.

The offer should state what will be managed: the eligible phase label, milestone labels, hosted milestones and task issues, their associations, and verification-based closures. Once opted in, perform required projection/readback and maintained lifecycle operations without repeated approvals. If declined, continue local/Git workflows without nagging. If unresolved, retain the default-enabled recommendation and pending-confirmation state; do not label it as a refusal or silently claim activation consent exists.

If tracking is opted into after local execution has begun, reconcile the existing phase idempotently: discover existing objects, create only missing eligible objects, attach retained completion evidence, close verified tasks/milestones and leave incomplete work open. Do not replay completed product tasks or rewrite history to pretend projection preceded them.

### Targets and validation

Targets: sdd-manage phase-activation.md, workflows.md, examples.md; sdd-implement startup handoff; sdd-forge GitHub projection/lifecycle guidance; sdd-report hosted-state wording.

Validate token-supplied/default-enabled/pending-confirmation, confirmed, declined, already-active, no-token and late-confirmation cases. The token-supplied case must produce a concrete activation proposal and confirmation question without any premature hosted write. For this demo, a future late opt-in would reconcile one eligible phase, six milestones and 26 tasks; only T-001–T-012 and milestones 1.1–1.2 currently have completed local evidence. Phase completion remains pending. This is a conditional recovery proposal, not a hosted operation already performed or newly authorized by this report.

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

### Proposed amendment

> On a dependency or browser-installation blocker, the manager MUST investigate reasonable supported alternatives within the authorized scope before settling on an environment blocker. Compare actual artifact validity, compatibility and launch behavior; keep successful partial work. Material substitutions must be disclosed and handled under existing decisions rather than hidden.
>
> Tool/browser readiness MUST establish the capabilities required by the planned checks. A successful single launch is not sufficient evidence for a suite using successive contexts, rendered text and Canvas. Select representative probes and visual inspection where relevant, and record actual platform/version coverage and limitations.

Targets: sdd-implement startup/task execution, sdd-verify check selection/evidence and sdd-manage blocker coordination. Validate an unavailable download route with a supported alternative; malformed HTTP-200 artifacts; a browser that launches once but fails a second context; DOM text present with no glyph pixels; and fresh-cache reproduction. Bound investigation by real scope and constraints, not an arbitrary retry quota. A genuine policy denial is governed by SDD-F003, not installation workarounds.

## Consolidated revision handoff

1. Strengthen proactive coordination and explicit optional-capability decision handling (SDD-F001/F002). Apply the latest default-enabled-on-token policy with explicit activation confirmation; retain the earlier opt-in exchange as finding context.
2. Strengthen scoped-authorization recognition, automatic reviewer context and supported continuation examples (SDD-F003). Retain platform-control boundaries and secret handling.
3. Align diagnosis and reporting language with actual decisions/evidence (SDD-F004/F005). Existing records must not manufacture user decisions.
4. Add environment-recovery and representative-readiness examples (SDD-F006), reusing the demo evidence without claiming general compatibility.
5. Review cross-skill consistency and run consumer-behavior scenarios before marking plugin amendments verified. Structural text checks alone do not prove proactive coordination or correct review responses.

The principle of proactivity, token-triggered default tracking with confirmation, and authorization/reviewer-response obligations were explicitly requested or clarified by the developer. Detailed wording, cross-file placement and the supporting recommendations remain proposals. This report is not an accepted plugin revision plan and does not change the installed version.

## Scope preserved and evidence limits

Tetris implementation remains paused after T-012. Phase 1 is incomplete and unmerged. GitHub tracking has not been confirmed or activated. Under the latest policy, the supplied token makes enablement the default recommendation, with confirmation still pending; the milestone reports' inactive-state statements are not proof of a developer refusal. No product-rule amendment is proposed here: the locking typo was corrected in conversation and the accepted next-blocked-gravity-tick rule is implemented and tested.

Successful existing practices include incremental commits/pushes, bounded milestone pauses, pure engine seams, accurate partial-acceptance reporting, and distinguishing behavioral RED from setup/characterization evidence. Their presence does not resolve the open coordination findings; they should remain intact during plugin revision.

No installed plugin source was modified, no hosted labels/issues/milestones were created or closed, and no additional product tasks were executed for this report. Tests of the proposed amended plugin behavior have not been run. Report verification covers source/context consistency, local links, finding identity/status consistency, whitespace and absence of credential values. Publication is verified by the accompanying completion response, not inferred from this file's existence.
