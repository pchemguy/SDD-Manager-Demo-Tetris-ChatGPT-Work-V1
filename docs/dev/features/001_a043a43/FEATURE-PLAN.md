# Archived feature source

Historical/non-executable feature preparation. Current main PROJECT/design/SPEC/PLAN/layout and [TASKS](../../TASKS.md) own the project. This archived source and its adjacent review are retained for provenance; original review hashes identify their published preparation checkpoints, before execution/navigation updates.

# Piece-control feature delivery plan

## Objective and inputs

Deliver [FEATURE-SPEC](FEATURE-SPEC.md) F-01–F-05 and FA-01–FA-07 while preserving applicable main A-01–A-09 behavior. Use the accepted [feature architecture](FEATURE_ARCHITECTURE.md), [feature decomposition](FEATURE_DECOMPOSITION.md), and [scoped layout](FEATURE-layout.md). [Package context](README.md) establishes campaign identity, starting baseline, working branch and integration target.

Planning entry is `65a088f8f2ceb824177ad9fb53c6618b7ac9d636`. The developer requested the next feature step after specification publication. Its existing QC report is current: all nine recorded document hashes match. This is preparation only; executable tasks and implementation require their subsequent stages.

## Strategy and main-plan relationship

Add one scoped phase, numbered 2 to preserve unique project phase/milestone identities after completed phase 1. The feature branch remains `feature/001_a043a43-piece-controls`, targeting `main`; phase numbering does not require a second working branch. Feature preparation does not reopen or replay phase 1. The main plan's engine/browser split, repository-local tools, static runtime, review policy and credential exclusion continue to apply.

The earliest useful increment combines landing/ghost with Space hard drop. It demonstrates the prediction and action in real play, including the interval for adjustment before locking. Hold and kicks then extend that playable path; no setup-only milestone precedes it. Existing locked dependencies and working Chromium/font provisioning are reused. No new dependency, framework, CI, deployment or release archive is planned.

Run relevant unit/controller and real-browser checks alongside each capability. Preserve the previously working game at every boundary, update player instructions as controls become available, and distinguish partial feature acceptance from complete acceptance. FEATURE-TASKS will derive concrete bounded units and command scopes; this plan does not allocate task IDs.

## Phase 2 — Piece-control extension

| Milestone | Outcome and scope | Dependencies | Objective exit evidence |
| --- | --- | --- | --- |
| 2.1 — Ghost and delayed hard drop | Shared landing calculation, detached ghost snapshot, visible outline, Space routing and landing-only drop. Hold and kicks remain deferred. | Accepted feature inputs and reviewed FEATURE-TASKS; confirmed phase tracking projection before execution; current toolchain/browser readiness. | FA-01/FA-02 and relevant FA-05 checks show legal landing, obstruction handling, zero-distance no-op, snapshot purity, real keyboard/Canvas correspondence, repeat/scroll rules and residual-time locking. Existing movement, scoring, preview and lifecycle regressions remain green. Instructions explain that Space does not lock immediately. Final milestone code review, regressions, blocker repair and report pass. |
| 2.2 — Hold and held-piece presentation | Held-kind/entitlement state, empty-slot preview promotion, populated swap, C routing, held panel and availability, added-resource initialization validation. | 2.1 delivery and review complete; hosted milestone closed. | FA-03 and hold portions of FA-05/FA-06 pass: exact source consumption, orientation/spawn reset, once-per-lock-cycle behavior, timing reset, blocked spawn, source fault, paused/terminal no-ops and restart cleanup. Real page retains both panels and controls at 800 × 600. Prior ghost/drop and lifecycle checks stay green. Final milestone review/report and regression evidence pass. |
| 2.3 — Clockwise wall kicks | Immutable ordered kick data and first-legal rotation selection using existing geometry/placement. | 2.2 delivery and review complete; hosted milestone closed. | FA-04 and combined FA-06 sequences cover all clockwise transitions/families, walls/floor/stack/top bounds, candidate priority and rejection, O no-op and unchanged gravity/hold entitlement. Browser play updates the ghost after kicks and retains post-drop adjustment until a blocked tick. Regression and final milestone review/report pass. |
| 2.4 — Static acceptance and document incorporation | Complete user/developer documentation, accepted feature incorporation into main project/design/SPEC/PLAN/layout and task ownership, archive eligible feature sources, and reproduce static delivery with full cross-feature acceptance. | 2.3 delivery and review complete; hosted milestone closed; incorporated sources and task disposition satisfy feature integration policy. | FA-01–FA-07 and applicable A-01–A-09 have explicit evidence. Locked install, fresh browser provisioning where needed, strict typecheck, full unit/browser suite, production build/static play and external-network independence pass. Shipped output excludes fixtures/debug interfaces/credentials. Reassessed main document gates and repaired navigation are coherent; feature archive remains discoverable. Final delivery milestone code review/report passes. |
| 2.5 — Whole-phase review | Review all capability interactions, final regressions, exits, hosted state and retained findings; establish completed-feature integration eligibility. Contains exactly one phase review/testing/report task. | All four delivery milestones and their review tasks complete; all four hosted delivery milestones closed. | Separate whole-boundary code review and test evidence, phase report and final feature implementation report; required blockers repaired and permissible TODOs aggregated. Close review issue/milestone after report publication. Explicitly merge verified feature into main, check merged state, push and confirm remote containment before reporting integrated completion. |

## Coverage and demonstration boundaries

| Canonical contract / acceptance | Delivery route |
| --- | --- |
| F-01 / FA-01 | 2.1 landing/ghost; 2.2/2.3 refresh across hold/kicks; 2.4 integrated acceptance. |
| F-02 / FA-02 | 2.1 delayed drop; 2.2 entitlement interaction; 2.3 kicked/moved descent; 2.4 production regression. |
| F-03 / FA-03 | 2.2 source/state/error/lifecycle and UI; 2.3 combined rule interaction; 2.4 production acceptance. |
| F-04 / FA-04 | 2.3 table-driven kick outcomes and timing; 2.4 complete regression. |
| F-05 / FA-05 | 2.1 Space/ghost; 2.2 C/held panel/resources/layout; 2.3 redraw; 2.4 actual shipped entry. |
| FA-06 | 2.1/2.2 focused lifecycle/failure, 2.3 combined sequences, 2.4 full integration. |
| FA-07 and retained main acceptance | Relevant regressions at every delivery boundary; reproducible full production acceptance and main-document QC at 2.4; final/merged checks at 2.5. |

At 2.1 demonstrate real ghost/drop play and residual-time locking for the developer's continue/amend/simplify/stop decision. At 2.3 demonstrate adjustment through kicks after landing and hold availability/source behavior. At 2.4 demonstrate the shipped complete game. Feedback can identify a scoped amendment; it does not silently change contracts or resume beyond an authorized execution range.

## Risk and evidence policy

Landing must stop at the first obstruction; using one operation for ghost/drop is checked rather than assumed. Source calls during hold and snapshot reads are counted deterministically. Kick tests distinguish coordinate signs, independent offsets and first-success priority. Existing tests expecting all colliding rotations to fail must be revised only where F-04 explicitly changes their contract; retain complete-rejection and unchanged-state coverage.

Added snapshot fields affect deterministic browser fixtures and view consumers together. Hold Canvas/DOM resources must be validated before scheduling, including independent failure fixtures. Production checks exercise the shipped entry without exposing test controls. Headless native focus/visibility delivery, Windows and other-browser limits remain explicit unless new evidence establishes them; modeled events do not prove native delivery.

Reuse `npm ci`, `npm run typecheck`, `npm test`, `npm run test:browser` and `npm run build`. Use the existing static-HTTP production check and network inspection. Record actual environment and results; baseline 85 unit/45 browser results are starting evidence, not feature acceptance targets or promised final counts.

## Tracking, incorporation and stopping points

GitHub tracking is active. Preparation creates no phase objects. After reviewed FEATURE-TASKS and an authorized execution range exist, sdd-forge must project the eligible phase's label, five native milestones and task issues before its first task, preserving phase 1 objects. Stable task IDs and associations are derived from the owning task lists, not guessed here.

Each completed task is verified, committed, pushed and then closed with evidence. Delivery review closure precedes milestone closure; all delivery milestone closures precede phase review. Completion on the feature branch is distinct from verified publication in main.

Accepted incorporation is performed on the feature branch by sdd-integrate-feature before final verification/merge. Include PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC/children, PLAN, layout and both task owners as needed for coherent final state. Preserve stable identities and issue associations; do not erase phase 1 evidence. Archive only eligible feature sources and their adjacent reviews, repair links, retain feature reports, and mark historical sources non-executable. Main planning must describe the full intended project, not an appended editing history.

Partial execution stops with a pushed feature checkpoint. Complete authorized execution includes explicit merge, merged-state verification and target publication. Keep feature identity unchanged; SDD-F007 records a proposed naming amendment and does not authorize renaming this package. Preparation stops before task execution. [Planning review](FEATURE-PLAN-REVIEW-REPORT.md) establishes readiness for task derivation.
