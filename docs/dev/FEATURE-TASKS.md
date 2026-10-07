# Piece-control feature tasks

## Authority and context

This active list derives from accepted [FEATURE-PLAN](FEATURE-PLAN.md), [scoped layout](FEATURE-layout.md), [FEATURE-SPEC](FEATURE-SPEC.md), [feature architecture](FEATURE_ARCHITECTURE.md) and [decomposition](FEATURE_DECOMPOSITION.md). [Planning QC](FEATURE-PLAN-REVIEW-REPORT.md) establishes current upstream readiness; [task QC](FEATURE-TASKS-REVIEW-REPORT.md) assesses this breakdown.

Task preparation baseline: `299822a2861ef5221892f0ab6fcecb5b84cfd4da`. Campaign `001_a043a43`; working branch `feature/001_a043a43-piece-controls`, target `main`. Main [TASKS](TASKS.md) has completed T-001–T-026. Feature tasks start at T-027, referencing that baseline without reopening or copying its checklist. Affected baseline owners include T-002/T-003 geometry/board, T-005 engine, T-006 renderer, T-007 input, T-009/T-010 score/time, T-011 preview, T-013–T-020 lifecycle/presentation/failures, and T-022–T-026 docs/delivery/review.

The developer accepted the written plan/layout on 2026-10-07. Preparation does not authorize task execution or project hosted objects. On execution, phase 1 publication/closure is the predecessor gate; project phase 2 label, five milestones and all these task issues before the first task. Tracking is already enabled, with normal scoped commit/push authority established. Confirm actual API identities instead of guessing associations.

FEATURE-TASKS owns feature execution until explicit incorporation in T-040. That handoff transfers completed and pending items to main TASKS, preserving IDs/status/evidence and original issues; mark the archived feature list non-executable. The feature phase/milestone checkboxes measure only this scope. Do not renumber or rename the established campaign/package for SDD-F007.

## Evidence and execution boundary

Every task includes its own relevant tests/docs and completion evidence, plus typechecking for code changes. Listed commands/outcomes are planned checks, not executed results. New focused suite filenames may be selected within layout-owned directories. Use meaningful behavioral RED where implementing changed behavior, distinguish characterization/setup failures, and retain source/time/rendering determinism without test controls in the shipped entry.

Each completion checkpoint reconciles the owning checkbox, actual check results and commit/push; hosted issue closure follows verification/publication. Review tasks require code review separately from tests, blocker repair, reports and TODO aggregation with accurate limits. Delivery milestone closure follows all constituent issues including review. No phase completion claim precedes required main integration/publication.

Recommended first execution range: T-027–T-030, delivering and reviewing milestone 2.1. This is a proposed selection for the developer; implementation has not started. A partial range pauses after verified publication on the feature branch.

## Phase 2 — Piece-control extension

- [ ] Phase 2 — Piece-control extension
    - [ ] Milestone 2.1 — Ghost and delayed hard drop
        - [ ] T-027 — Implement shared landing and detached ghost snapshots
            Outcome: Shared downward-reachable landing and pure detached ghost data, with existing consumers kept type-correct.
            Scope: src/engine/board.ts, types.ts, game.ts; engine rule/snapshot tests and affected fixture snapshots.
            Depends on: none; phase setup, current upstream QC and confirmed hosted projection are prerequisites.
            Evidence: npm test -- tests/unit/engine; npm run typecheck. Cover every kind/orientation, first obstruction, grounded landing, null active, detached values and zero source/time effects. F-01 / FA-01.
        - [ ] T-028 — Render ghost and expose prediction during ordinary play
            Outcome: Visible ghost outline follows active placement without obscuring active cells; pause/game-over rendering remains correct.
            Scope: src/view/renderer.ts and tests/browser/rendering.spec.ts; controlled fixtures and relevant player instructions.
            Depends on: T-027.
            Evidence: npm run test:browser -- tests/browser/rendering.spec.ts; npm run typecheck. Inspect rendered cells and overlap/paused/terminal screenshots; use the ordinary page as well as controlled states. F-01 / ghost portions of FA-05.
        - [ ] T-029 — Integrate one-shot Space drop with scheduled locking
            Outcome: Space uses the shared landing without immediate lock, timing reset, score or source effects; focus/repeat/default rules apply.
            Scope: src/engine/game.ts, types.ts, src/session/keyboard.ts and affected controller consumers; focused engine/session/browser tests and player controls.
            Depends on: T-027, T-028.
            Evidence: npm test -- tests/unit/engine; npm test -- tests/unit/session; npm run test:browser -- tests/browser/input.spec.ts; npm run typecheck. Include 999 ms + drop + 1 ms, grounded no-op, post-drop movement, paused/terminal input, repeat/scroll suppression and unchanged entitlement. F-02 / FA-02 and Space portions of FA-05.
        - [ ] T-030 — Review, test and report milestone 2.1
            Outcome: Review the complete ghost/drop increment and demonstrate landing-to-lock adjustment; repair required blockers and retain evidence.
            Scope: All 2.1 affected code/tests/docs; feature report 2.1.md and selected sanitized screenshots.
            Depends on: T-027, T-028, T-029; their hosted issues closed.
            Evidence: Separate code review; npm run typecheck; npm test; npm run build; relevant real-browser ghost/input/playable regressions. Complete 2.1 exits without claiming hold/kicks. Publish report and reconcile review issue then milestone closure. Report: docs/dev/features/001_a043a43/2.1.md.
    - [ ] Milestone 2.2 — Hold and held-piece presentation
        - [ ] T-031 — Implement hold state, source order and lock-cycle entitlement
            Outcome: Empty-slot promotion and populated swap follow exact source/spawn/timing rules; restart, blocked spawn and faults retain their contracts.
            Scope: src/engine/game.ts, types.ts and focused engine hold/source/lifecycle tests; snapshot fixture consumers.
            Depends on: T-030; milestone 2.1 verified and closed.
            Evidence: npm test -- tests/unit/engine; npm run typecheck. Count source calls, orientation reset, unavailable hold no-op, accumulator reset, entitlement only after lock, drop-without-lock, blocked incoming spawn and invalid/exhausted source. F-03 / FA-03.
        - [ ] T-032 — Route C and preserve hold lifecycle and fault handling
            Outcome: One-shot focus-scoped C command reaches the engine; inactive/fault/disposed sessions cannot process it.
            Scope: src/session/keyboard.ts, controller.ts and session/input/fault checks; controls documentation.
            Depends on: T-031.
            Evidence: npm test -- tests/unit/session; npm run test:browser -- tests/browser/input.spec.ts tests/browser/session.spec.ts tests/browser/failures.spec.ts; npm run typecheck. Verify repeat, modifiers/editable origins, interruption, single action after restarts and source-fault resource cleanup. F-03/F-05 / FA-03 and FA-06.
        - [ ] T-033 — Present held piece and validate added page resources
            Outcome: Labeled held preview/empty state and entitlement remain distinct from next preview; both panels fit the desktop layout and fail startup safely.
            Scope: src/view/renderer.ts, status.ts, src/main.ts, index.html, style.css; browser rendering/presentation/initialization tests and fixtures.
            Depends on: T-031, T-032.
            Evidence: npm run test:browser -- tests/browser/rendering.spec.ts tests/browser/presentation.spec.ts tests/browser/initialization.spec.ts; npm run typecheck. All held kinds, empty-slot cleanup, pause/restart, 800 × 600, independent missing/wrong-type held elements/context and no subscriptions/frames after failed setup. F-03/F-05 / FA-05/FA-06.
        - [ ] T-034 — Review, test and report milestone 2.2
            Outcome: Review complete held-piece rules, input, presentation and failure boundaries; repair required blockers and preserve the working ghost/drop path.
            Scope: All 2.2 changes and dependent consumers; feature report 2.2.md and selected sanitized evidence.
            Depends on: T-031, T-032, T-033; their hosted issues closed.
            Evidence: Separate code review; npm run typecheck; npm test; npm run build; all browser checks. Verify 2.2 exits, source/timing/entitlement interactions and prior regressions. Publish review report, close review issue then milestone. Report: docs/dev/features/001_a043a43/2.2.md.
    - [ ] Milestone 2.3 — Clockwise wall kicks
        - [ ] T-035 — Implement pure clockwise kick data and legal candidate selection
            Outcome: Ordered family/transition tables select the first legal rotated placement using independent original-origin offsets.
            Scope: Proposed src/engine/kicks.ts; existing pieces.ts/board.ts helpers; focused tests/unit/engine kick tests.
            Depends on: T-034; milestone 2.2 verified and closed.
            Evidence: npm test -- tests/unit/engine; npm run typecheck. Check all eight rows against F-04, non-cumulative candidates, first-success precedence, later successes, walls/floor/stack/top bounds, total rejection and O no-op. F-04 / FA-04.
        - [ ] T-036 — Integrate kicks with ghost, hold and delayed-drop timing
            Outcome: Engine rotations apply the pure policy, refresh ghost and retain score/source/gravity/hold guarantees.
            Scope: src/engine/game.ts and affected engine/browser scenario tests; player rule documentation.
            Depends on: T-035.
            Evidence: npm test -- tests/unit/engine; npm run test:browser -- tests/browser/playable-slice.spec.ts tests/browser/rendering.spec.ts; npm run typecheck. Combine hold → kick → drop → move → tick, including post-drop kicked descent and blocked lock. Revise only baseline rotation expectations explicitly changed by F-04. F-01–F-04 / FA-04/FA-06.
        - [ ] T-037 — Review, test and report milestone 2.3
            Outcome: Review all kick/drop/hold interactions and demonstrate adjustment before locking; repair blockers.
            Scope: Complete 2.3 capability and relevant baseline behavior; feature report 2.3.md and sanitized browser evidence.
            Depends on: T-035, T-036; their hosted issues closed.
            Evidence: Separate code review; npm run typecheck; npm test; npm run build; all browser checks. Validate 2.3 exits, unchanged rejection state, candidate order, shared landing and usable controls. Publish report and close review issue then milestone. Report: docs/dev/features/001_a043a43/2.3.md.
    - [ ] Milestone 2.4 — Static acceptance and document incorporation
        - [ ] T-038 — Reproduce complete static delivery and update player/developer guides
            Outcome: Locked installation, complete shipped-page acceptance, runtime independence and accurate controls/documentation are evidenced.
            Scope: README.md, docs/USER-GUIDE.md; tests/browser/production.spec.ts and affected acceptance/support cases; feature ACCEPTANCE.md and selected production images.
            Depends on: T-037; milestone 2.3 verified and closed.
            Evidence: npm ci; npm run typecheck; npm test; npm run build; npm run test:browser. Reproduce browser provisioning from fresh cache where needed; actual static HTTP play exercises all four mechanics without a debug interface; inspect shipped assets and block external runtime requests. Map FA-01–FA-07 and applicable A-01–A-09 with native-focus/platform limits. No fixed final test count is required.
        - [ ] T-039 — Incorporate accepted design, behavior and delivery documents
            Outcome: Main PROJECT/design/SPEC/PLAN/layout describe the coherent full intended project, with affected conformance reassessed.
            Scope: Main project/design, specification children, PLAN/layout and adjacent affected QC reports through sdd-integrate-feature; active feature sources retained until task/evidence disposition.
            Depends on: T-038.
            Evidence: Compare incorporation against accepted feature contracts; resolve local links/anchors, source ownership and changed QC gates. Preserve phase 1 evidence; remove editing-history narrative and contradictory exclusions from current-state documents. Document-only changes do not rerun unchanged product tests without cause. F-01–F-05 / 2.4 document integration exit.
        - [ ] T-040 — Transfer task ownership and archive eligible feature preparation sources
            Outcome: Main TASKS becomes sole owner of all feature tasks including pending review items, retaining IDs, state/evidence and hosted associations; eligible feature sources/reviews are archived with repaired navigation.
            Scope: TASKS, FEATURE-TASKS, their affected reviews and package sources/navigation through sdd-integrate-feature; existing feature prefix retained.
            Depends on: T-039.
            Evidence: Verify exactly one executable owner per ID across both lists, pending tasks remain unchecked, no issue is recreated or closed by transfer, phase 1 identities/status remain intact, and archive/report links resolve. T-040 completion and later T-041/T-042 updates belong to the reconciled main owner; archived FEATURE-TASKS is explicitly historical/non-executable. Do not archive any source still needed as active authority; retain it if eligibility fails and resolve before this task completes.
        - [ ] T-041 — Review, test and report milestone 2.4
            Outcome: Review final static delivery, documentation reconciliation and archive ownership; repair required blockers and retain complete acceptance.
            Scope: All 2.4 changes and final product; reconciled TASKS owner; feature report 2.4.md.
            Depends on: T-038, T-039, T-040; their hosted issues closed.
            Evidence: Separate code/document review; npm run typecheck; npm test; npm run build; all browser checks. Verify main conformance reports, sole task ownership, archive navigation, shipped graph, FA-01–FA-07 and retained main acceptance. Publish report and close review issue then milestone. Report: docs/dev/features/001_a043a43/2.4.md.
    - [ ] Milestone 2.5 — Whole-phase review
        - [ ] T-042 — Review, test, report and integrate the completed feature phase
            Outcome: Whole-boundary review, final reports, hosted reconciliation, explicit main integration and merged-state publication establish feature completion.
            Scope: Final product/doc/task scope; reconciled TASKS; feature PHASE-REPORT.md and IMPLEMENTATION-REPORT.md, existing Git branch/target.
            Depends on: T-030, T-034, T-037, T-041; every delivery milestone verified complete and hosted-closed.
            Evidence: Separate full code review; npm run typecheck; npm test; npm run build; npm run test:browser; complete acceptance and permitted TODO aggregation. Publish phase/final reports, close review issue/milestone, then explicitly merge verified feature into main with two parents, check merged state, push and read back containment. Record actual commits/parents/limits; a branch pass is not published integration. Reports: docs/dev/features/001_a043a43/PHASE-REPORT.md and IMPLEMENTATION-REPORT.md.
