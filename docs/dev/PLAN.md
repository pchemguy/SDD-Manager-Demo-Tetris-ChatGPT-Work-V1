# Delivery plan

## Objective and governing inputs

Deliver the complete desktop, single-player browser game in [SPEC](SPEC.md), using the structure in [ARCHITECTURE](ARCHITECTURE.md) and [DECOMPOSITION](DECOMPOSITION.md). [Layout](layout.md) assigns physical ownership. TASKS owns executable work derived from these documents; this plan contains no task checklist or implementation progress.

The accepted specification and piece-control extension are incorporated into this full-project plan. [Specification review](SPEC-REVIEW-REPORT.md) and [planning review](PLAN-REVIEW-REPORT.md) identify the current sources; execution and retained historical baselines belong to TASKS/reports.

## Delivery strategy

Use two phases: the complete classic game, followed by the scoped piece-control extension. Each phase has capability milestones and one dedicated whole-phase review. The application remains static and cohesive, without a backend or release-platform phase.

The earliest useful milestone is a real falling-block game: keyboard movement and rotation, gravity, next-tick locking, line clearing, and game over on a visible Canvas board. It uses the real engine and browser input; it is not a mocked demonstration. Scoring/progression, preview display, pause/restart, full presentation, and comprehensive failure handling are explicitly deferred to named subsequent milestones. The complete SPEC remains authoritative for the final outcome.

Install and validate the build/test tools within that first milestone, alongside its gameplay increments. Dependency availability and launching a real browser are necessary prerequisites, not separate infrastructure milestones. Establish deterministic engine checks and a browser smoke check before extending the playable slice.

## Tooling and runtime decisions

Use npm with a committed lockfile, TypeScript strict checking, Vite for development/static production builds, Vitest for browser-independent unit checks, and Playwright Test with Chromium for real-browser checks. Product code uses no UI or game framework. Test tools are development dependencies.

Use Node 24 for this demonstration. Resolve mutually compatible package versions during initial implementation, record exact versions in the lockfile, and validate their declared engine/peer requirements before relying on them. Do not silently substitute runtime-owned packages for the repository's declared dependencies. Configure the production JavaScript target as ES2020 to match SPEC; do not assume Vite's default target establishes that contract.

Planned developer commands:

| Command | Intended purpose |
| --- | --- |
| `npm ci` | Install the committed dependency resolution. |
| `npm run dev` | Start the development server without automatic browser opening. |
| `npm run typecheck` | Strict checking of product and relevant test/configuration types. |
| `npm test` | Run the unit suite once without watch mode. |
| `npm run test:browser` | Run the required Chromium suite. |
| `npm run build` | Type-check and create static production content. |
| `npm run preview` | Serve the production build for local acceptance. |

These repository scripts are implemented and locked. Scripts use portable npm command syntax. Developer instructions support Windows CMD and the cloud Linux shell without requiring PowerShell.

Tool choices were checked against official English-language documentation on 2026-10-07: [Vite guide](https://vite.dev/guide/), [Vitest guide](https://vitest.dev/guide/), and [Playwright browser setup](https://playwright.dev/docs/browsers). Browser binaries must match the selected Playwright version; package presence alone is insufficient evidence of launch capability.

## Phase 1 — Complete classic browser Tetris

**Outcome:** A type-checked static browser game meeting A-01 through A-09, with developer/player documentation and retained verification/review evidence. Implementation uses `phase/1-classic-browser-tetris`, targeting established `main`. TASKS retains stable phase and milestone identities.

| Milestone | Capability and scope | Prerequisites | Objective exit evidence |
| --- | --- | --- | --- |
| 1.1 — Playable falling-block slice | Establish repository-local tools and deterministic seams; implement geometry, board placement/compaction, bag source, basic engine actions/time/locking/spawn, and a real Canvas/keyboard loop with game-over indication. Lines clear; gravity stays at level 1 until 1.2. | Accepted design/SPEC/PLAN/layout and reviewed TASKS; dependency installation and Chromium launch. | Unit evidence for geometry, placement, bag, next-tick locking, clearing, and blocked spawn. A real browser can move/rotate/drop pieces, observe gravity and lock, clear a controlled row, and reach game over. Strict typecheck and slice build pass. Record the exact partial A-01/A-02/A-03/A-04/A-06/A-07/A-09 scope; do not claim deferred acceptance complete. |
| 1.2 — Scoring, progression, and preview | Add score/cleared-line total/level, pre-clear scoring, changing gravity intervals, residual-time behavior across promotions, and the visible next-piece preview. | 1.1 delivery and milestone review complete. | All clear cardinalities and level-boundary/minimum-speed cases pass deterministically. Browser preview agrees with promotion and status values update after clearing. Existing playable-slice checks remain green. |
| 1.3 — Session controls and interruptions | Complete pause/resume, explicit resume after blur/visibility loss, restart from all statuses, keyboard repeat/focus/default handling, and timing reset behavior. | 1.2 delivery and milestone review complete. | Controlled scheduler/input tests and browser checks demonstrate frozen inactive time, restart without duplicate effects, blocked soft-drop behavior, one-shot commands, held arrows, and scroll suppression. A-05 passes and A-06 includes restart. Preserve the gameplay regression suite. |
| 1.4 — Robust presentation and failure boundaries | Complete desktop layout, labels/focus/text alternatives, consistent paused/game-over display, initialization validation/fallback error output, source/scheduler fault handling, disposal, invalid-time rejection, and snapshot isolation. | 1.3 delivery and milestone review complete. | Browser checks at 800 × 600 show all required elements without overlap or horizontal scrolling. Fault/disposal checks establish stopped loops and released listeners; invalid time preserves state and snapshots cannot mutate it. A-01/A-07/A-08 pass in their complete relevant scope. Earlier gameplay/session checks remain green. |
| 1.5 — Reproducible static delivery and complete acceptance | Finish player/developer instructions, clean dependency installation, production build/serve validation, and integrated acceptance coverage. Inspect shipped output and retain browser evidence for the actual target. | 1.4 delivery and milestone review complete. | Run the documented commands from the locked dependency setup; play the production build over static HTTP. All A-01 through A-09 have explicit evidence. Shipped files exclude credentials, fixtures, and test interfaces. No required console errors or runtime service dependencies remain. Document exact environment, checked browser, and limits. |
| 1.6 — Phase review | Review the complete application and cross-milestone interactions, run final required regressions, resolve blockers, retain phase and final implementation reports, and establish integration eligibility. This milestone contains exactly one phase review/testing/report task. | All five delivery milestones complete and reviewed; their hosted milestones closed if tracking is enabled. | Code review and checks are separately evidenced. All phase exits pass; final TODO aggregation retains any permitted non-critical findings. The completed phase is explicitly merged into `main`, the merged result is checked, pushed, and confirmed remotely before full completion is reported. |

## Phase 2 — Piece-control extension

| Milestone | Outcome and scope | Dependencies | Objective exit evidence |
| --- | --- | --- | --- |
| 2.1 — Ghost and delayed hard drop | Shared landing calculation, detached ghost snapshot, visible outline, Space routing and landing-only drop. Hold and kicks remain deferred. | Accepted feature inputs and reviewed TASKS; confirmed phase tracking projection before execution; current toolchain/browser readiness. | FA-01/FA-02 and relevant FA-05 checks show legal landing, obstruction handling, zero-distance no-op, snapshot purity, real keyboard/Canvas correspondence, repeat/scroll rules and residual-time locking. Existing movement, scoring, preview and lifecycle regressions remain green. Instructions explain that Space does not lock immediately. Final milestone code review, regressions, blocker repair and report pass. |
| 2.2 — Hold and held-piece presentation | Held-kind/entitlement state, empty-slot preview promotion, populated swap, C routing, held panel and availability, added-resource initialization validation. | 2.1 delivery and review complete; hosted milestone closed. | FA-03 and hold portions of FA-05/FA-06 pass: exact source consumption, orientation/spawn reset, once-per-lock-cycle behavior, timing reset, blocked spawn, source fault, paused/terminal no-ops and restart cleanup. Real page retains both panels and controls at 800 × 600. Prior ghost/drop and lifecycle checks stay green. Final milestone review/report and regression evidence pass. |
| 2.3 — Clockwise wall kicks | Immutable ordered kick data and first-legal rotation selection using existing geometry/placement. | 2.2 delivery and review complete; hosted milestone closed. | FA-04 and combined FA-06 sequences cover all clockwise transitions/families, walls/floor/stack/top bounds, candidate priority and rejection, O no-op and unchanged gravity/hold entitlement. Browser play updates the ghost after kicks and retains post-drop adjustment until a blocked tick. Regression and final milestone review/report pass. |
| 2.4 — Static acceptance and document incorporation | Complete user/developer documentation, accepted feature incorporation into main project/design/SPEC/PLAN/layout and task ownership, archive eligible feature sources, and reproduce static delivery with full cross-feature acceptance. | 2.3 delivery and review complete; hosted milestone closed; incorporated sources and task disposition satisfy feature integration policy. | FA-01–FA-07 and applicable A-01–A-09 have explicit evidence. Locked install, fresh browser provisioning where needed, strict typecheck, full unit/browser suite, production build/static play and external-network independence pass. Shipped output excludes fixtures/debug interfaces/credentials. Reassessed main document gates and repaired navigation are coherent; feature archive remains discoverable. Final delivery milestone code review/report passes. |
| 2.5 — Whole-phase review | Review all capability interactions, final regressions, exits, hosted state and retained findings; establish completed-feature integration eligibility. Contains exactly one phase review/testing/report task. | All four delivery milestones and their review tasks complete; all four hosted delivery milestones closed. | Separate whole-boundary code review and test evidence, phase report and final feature implementation report; required blockers repaired and permissible TODOs aggregated. Close review issue/milestone after report publication. Explicitly merge verified feature into main, check merged state, push and confirm remote containment before reporting integrated completion. |


### Demonstration and human checkpoints

At 1.1, demonstrate the real play loop and the interval between resting and locking. Report control usability and browser-launch evidence so the developer can choose to continue, amend, simplify, or stop. The demonstration must identify deferred score/preview/session behavior.

At 1.3, demonstrate pause/restart and interruption behavior using the scored game, showing that focus restoration requires explicit resume. At 1.5, demonstrate the production build and provide evidence for complete acceptance. Human feedback can steer a paused task boundary; it does not automatically authorize an amendment or task-list continuation beyond the selected execution range.

### Milestone and phase review exits

Each delivery milestone ends with its own dedicated code review/testing/report task. It assesses the whole delivered capability and relevant dependencies, runs its exits and regressions, repairs confirmed blockers, and commits/pushes a milestone report. Passing tests alone does not complete that review.

The dedicated phase review starts after every delivery milestone is complete; it has no additional milestone-review task. It covers full acceptance, cross-component behavior, documentation, static delivery, and merged-state verification. Bugs, critical code issues, and SPEC/PLAN violations block completion. Reports include a TODO section, using `None` when empty; only non-critical findings consistent with requirements may be deferred with rationale and follow-up options.

Phase review produces the phase report and the final implementation report when the full task list completes. The final report aggregates unresolved permitted milestone/phase TODOs and their provenance. Partial task or milestone requests publish and pause on the phase branch; they do not merge an incomplete phase into `main`.

## Verification route and acceptance coverage

| SPEC coverage | Primary delivery route | Boundary evidence |
| --- | --- | --- |
| G-01/G-02; A-02; SYS-01 | 1.1, hardened in 1.4 | Pure geometry/board checks, controlled engine action sequences, real Canvas/input correspondence. |
| G-03; A-04; SYS-02 | 1.1 source, 1.2 preview, 1.4 faults | Deterministic bag/sequence checks, browser promotion/preview checks, source-failure checks. |
| G-04/G-06; A-02/A-03 | 1.1 locking/gravity, 1.2 progression, 1.3 interruption, 1.4 invalid time | Grounded movement, blocked soft drop, elapsed-time partitioning, level/interval boundaries, paused-time and error invariants. |
| G-05; A-03/A-06 | 1.1 lock/clear/spawn, 1.2 score, 1.3 restart | Controlled clear cardinalities/compaction, pre-clear scoring, blocked spawn and completed-game input invariants. |
| S-01/S-02/S-03; A-05; SYS-04 | 1.3, failure/disposal completion in 1.4 | Controller timing/input tests plus real keyboard/focus/visibility/restart checks; active-loop/listener observations. |
| S-04/S-05; A-01/A-07; SYS-05 | 1.1 board, 1.2 status/preview, 1.4 full presentation/isolation | Snapshot mutation checks; DOM status assertions; Canvas/geometry correspondence and desktop viewport inspection. |
| S-06; A-08; SYS-03 | 1.4 | Missing DOM/Canvas fixtures and source/scheduler faults; visible errors with no active gameplay loop. |
| A-09; SYS-06/SYS-07 | 1.1 tool/browser gate, 1.5 complete delivery | Locked installation, strict checking, production build, static HTTP browser play, exact verified compatibility scope. |
| Complete A-01 through A-09 | 1.5 and 1.6 | Integrated acceptance evidence, code review, phase/final reports, merged-state checks and remote containment. |

Detailed testing strategy belongs to sdd-tdd and executable checks to TASKS. Engine checks use explicit pieces/time and observable snapshots. Browser fixtures may assemble controlled collaborators outside the production entry point; verification must also use the ordinary production page. Avoid production debug globals or test-only gameplay APIs. Rendering evidence combines real-browser inspection and state/geometry correspondence rather than asserting that a Canvas element's existence proves correct drawing.

## Risks, assumptions, and gates

| Risk / assumption | Mitigation and decision gate |
| --- | --- |
| Dependencies or compatible browser binaries cannot be obtained in the standard sandbox. | Establish installation and Chromium launch during 1.1 before claiming a usable milestone. The verified Linux route uses pinned npm-packaged Chromium with local font extraction; fresh-cache launch passes. Other platforms use normal Playwright installation and remain unverified. Report a concrete blocker and preserve work if supported installation fails. Do not claim cloud-computer compatibility from package presence. |
| Gravity/locking bugs depend on frame cadence or level changes. | Deterministic time/action checks alongside engine delivery, including remaining time across promotions, blocked soft drop, and movement before a scheduled lock. |
| Pause/restart multiply callbacks or spend inactive time. | Instrument controlled scheduling and exercise repeated browser interruption/restart before 1.3 completion; disposal/fault coverage completes in 1.4. |
| Browser tests require deterministic state without polluting the product. | Put controlled harnesses in test-owned locations, exercise real adapters there, and separately check ordinary production-page play. Verify build exclusion in 1.5. |
| Scope grows beyond accepted piece controls or into unnecessary abstractions. | Keep accepted exclusions and component ownership; changes to rules return to their owner. No framework, server, general plugin system, or speculative persistence layer is needed. |

GitHub is the established Git publication destination. TASKS and verified hosted identities record active tracking; preparation alone does not activate additional phases. If issue tracking is enabled for implementation, project only the eligible phase before its first task and apply required issue/milestone closure gates; local verification remains authoritative.

## Governing boundaries

The adjacent [PLAN review report](PLAN-REVIEW-REPORT.md) assesses full-project strategy and layout against accepted SPEC/design. TASKS owns executable units, completion evidence and hosted associations; implementation reports own actual verification/publication results. This plan selects capability order and exit gates, without becoming a second executable checklist.

## Piece-control verification and integration

Ghost and drop share landing; hold stores kind and owns exact preview/source consumption; clockwise kick trials use independent original-origin offsets. Relevant unit/browser checks run with each capability, including source/time purity, 999+1ms locking, added initialization failures and combined adjustment sequences. Milestones 2.1–2.4 route FA-01–FA-07 while retaining A-01–A-09. No new product dependency, framework, deployment or release package is required.

The working branch is `feature/001_a043a43-piece-controls`, targeting established `main`. The authorized full range includes document incorporation, sole main TASKS ownership, eligible source/review archival, whole-phase review, explicit two-parent merge, merged-state checks, push and remote containment. Historical feature reports/preparation remain under `features/001_a043a43/`; the existing identity is retained. Phase 1 evidence and hosted identities remain intact.
