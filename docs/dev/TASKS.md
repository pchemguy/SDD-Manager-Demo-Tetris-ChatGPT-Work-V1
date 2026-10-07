# Implementation tasks

## Authority and execution context

This list derives the complete intended work from accepted [PLAN](PLAN.md), [layout](layout.md), [SPEC](SPEC.md) and its [gameplay](spec/gameplay.md) and [session](spec/session.md) children, [ARCHITECTURE](ARCHITECTURE.md), and [DECOMPOSITION](DECOMPOSITION.md). [TASKS review](TASKS-REVIEW-REPORT.md) establishes preparation readiness. All tasks are planned and unchecked; no product implementation has started.

Preparation baseline: `470ee46e48cc58c919fb5ac799691579126e42c1` on `main`. Execution uses `phase/1-classic-browser-tetris`, targeting `main` in the established GitHub repository. Record its actual starting checkpoint when implementation begins; do not infer that it remains the preparation baseline after task-list publication.

Active execution: T-001–T-008, milestone 1.1. Phase branch started from `bf1b05e0621c79be4c21cf9ddd23dcd0604d7cef`; stop after the verified milestone report, publish the incomplete phase branch, and keep main unmerged. Hosted tracking is inactive.

Execute a human-selected bounded range through sdd-implement. A partial phase publishes task/review checkpoints and pauses on its phase branch. Only full verified phase completion permits default integration. Git publication is established; no hosted issue/milestone tracking has been activated by task preparation. If enabled, eligible-phase projection precedes the first task and closure gates apply.

## Task evidence conventions

Each delivery task includes its relevant tests and documentation, plus strict typechecking when code is introduced. Unit check syntax is `npm test -- <test path>`; browser check syntax is `npm run test:browser -- <test path>`. Concrete test filenames below are intended paths under layout-owned directories and may be refined without moving ownership or changing outcomes. `npm test` runs once, not in watch mode.

Each task records the commands actually run, their outcomes, applicable contract coverage/limits, and required repairs before its completion commit/push. Commands listed below are future verification obligations, not executed evidence. Keep the source/test/doc changes and owning checkbox coherent in each task checkpoint; sdd-implement owns completion updates. Preserve previously passing capability checks.

Every milestone/phase review requires both code review and testing. Fix bugs, critical issues, and SPEC/PLAN violations before its completion. Reports contain Findings/Blockers and a TODO section (`None` when empty); permitted non-critical deferrals retain identity, evidence, rationale, options, and follow-up scope. Planned report paths are given as code rather than links because those files do not exist yet.

## Phase 1 — Complete classic browser Tetris

- [ ] Phase 1 — Complete classic browser Tetris
    - [ ] Milestone 1.1 — Playable falling-block slice
        - [ ] T-001 — Establish the repository toolchain and Chromium launch gate
            Outcome: Repository-local npm dependencies, locked compatible versions, strict checking, Vite ES2020 production target, Vitest, and Playwright Test work in the standard sandbox. Create only the minimum buildable entry page/module needed to verify tools; this task does not deliver gameplay.
            Scope: package.json/package-lock.json, tsconfig.json, vite.config.ts, vitest.config.ts, playwright.config.ts, minimal index.html/src/main.ts, .gitignore tool-cache entries as needed, and README setup commands. Retain final .obsidian/.trash rules and token exclusion.
            Depends on: none; accepted upstream reviews and phase setup are execution prerequisites.
            Evidence: Check Node/package engine and peer compatibility; perform install and npm ci; install the selected Playwright Chromium if needed and launch it on a minimal page; run npm run typecheck and npm run build. Verify unit/browser discovery is separated and planned scripts exist. Record versions, launch result, and any environment blocker without substituting runtime packages silently. Trace: SYS-06/SYS-07, A-09 prerequisite.
            Execution checkpoint (2026-10-07): Incomplete and blocked on Chromium launch. Repository-local install and npm ci succeeded with Node 24.19.0/npm 11.9.0, TypeScript 7.0.2, Vite 8.3.3, Vitest 5.0.3, Playwright Test 1.63.0, and @types/node 24.19.1. npm ls reports no unmet direct dependency; resolved Vite/Vitest/Playwright engine/peer requirements support the selected Node/tool versions.
            Observed checks: npm run typecheck and npm run build pass after correcting the setup entry's global-status name collision. Vitest list discovers zero unit cases, as expected before gameplay tasks; Playwright list discovers one toolchain check. Binding Vite to loopback fixes the sandbox's network-interface enumeration failure; its browser-test server then starts successfully.
            Browser blocker: Standard Chromium and supported headless-shell installation both fail because the official archive URLs return HTTP 200 text/html with a 195-byte Site Unavailable page instead of ZIP content. No local Chromium executable was found. The toolchain browser test runs one case and fails at browserType.launch because the required headless-shell executable is absent. No browser assertion executed. npm emits an existing http-proxy configuration warning; color-environment warnings do not explain the missing browser.
            Remaining work: Obtain the selected browser through a supported available installation route and pass the real launch check, then recheck the toolchain before marking T-001 complete. T-002–T-008 have not started. This partial checkpoint is not a completed task or milestone and cannot justify advancing dependent work.
        - [ ] T-002 — Define engine contracts and tetromino geometry
            Outcome: Typed domain contracts and all seven shape/orientation/spawn definitions match SPEC without browser imports.
            Scope: src/engine/types.ts, src/engine/pieces.ts, tests/unit/engine/pieces.test.ts, and focused source documentation.
            Depends on: T-001.
            Evidence: npm test -- tests/unit/engine/pieces.test.ts; npm run typecheck. Cover four unique connected cells, every rotation, O no-op, four-turn identity, centered spawn origins, and occupied-cell coordinates. Trace: G-01/G-02, SYS-01, A-02.
        - [ ] T-003 — Implement legal board placement and row compaction
            Outcome: Board operations reject wall/floor/locked-cell collisions, lock legal occupied cells, and clear completed rows with stable remaining-row order.
            Scope: src/engine/board.ts and tests/unit/engine/board.test.ts.
            Depends on: T-002.
            Evidence: npm test -- tests/unit/engine/board.test.ts; npm run typecheck. Include floor/wall/stack boundaries, occupied-only collision, simultaneous and nonadjacent clears, no-clear preservation, and empty-row insertion. Trace: G-01/G-05, A-02/A-03 compaction scope.
        - [ ] T-004 — Implement the seven-piece bag and deterministic test sources
            Outcome: Production bags contain each kind exactly once, and tests can supply controlled sequences through the same source boundary.
            Scope: src/engine/piece-source.ts, tests/unit/engine/piece-source.test.ts, and tests/support/piece-source.ts.
            Depends on: T-002.
            Evidence: npm test -- tests/unit/engine/piece-source.test.ts; npm run typecheck. Check bag cardinality/uniqueness, consecutive bag boundaries, supplied randomness, and exact deterministic consumption without asserting one production random sequence. Trace: G-03, SYS-02, A-04 source scope.
        - [ ] T-005 — Implement the initial engine play loop
            Outcome: Engine owns board/active/preview state, applies legal moves/rotation/soft drop, advances level-1 gravity, locks on blocked gravity ticks, clears rows, promotes pieces, and detects blocked spawn. Provide a snapshot boundary for browser assembly.
            Scope: src/engine/game.ts, tests/unit/engine/game.test.ts, and reusable scenarios under tests/support/. Scoring/level progression and pause/restart remain assigned to later tasks.
            Depends on: T-003, T-004.
            Evidence: npm test -- tests/unit/engine/game.test.ts; npm run typecheck. Exercise a complete controlled spawn-to-clear sequence; ground contact remaining active, movement/rotation before the next tick, blocked soft drop staying active, illegal actions preserving state, elapsed-time accumulation, preview promotion, and terminal no-op behavior. Trace: G-01 through G-06 at PLAN 1.1 scope; A-02/A-03 clearing/A-04 promotion/A-06 terminal scope.
        - [ ] T-006 — Render the playable board from engine snapshots
            Outcome: A Canvas renderer draws actual locked/active cells with distinguishable colors and geometry; a controlled browser fixture establishes correspondence with the real engine snapshot.
            Scope: src/view/renderer.ts, tests/browser/rendering.spec.ts, and isolated renderer fixture(s) under tests/fixtures/. Share immutable geometry; do not create a production debug global.
            Depends on: T-005.
            Evidence: npm run test:browser -- tests/browser/rendering.spec.ts; npm run typecheck. Verify drawn occupied/empty locations against controlled snapshots and capture a representative board for inspection. Merely locating Canvas is insufficient. Preview/full layout remain in later tasks. Trace: S-04/S-05 board scope, A-07 rendering scope.
        - [ ] T-007 — Assemble real keyboard play and gravity in the browser
            Outcome: The ordinary page runs the real engine/renderer through a single frame loop, handles basic arrow movement/rotation/soft drop, displays game over, and exposes the first playable slice. A controlled fixture uses the same adapters to demonstrate clearing and blocked spawn.
            Scope: src/session/keyboard.ts, src/session/controller.ts, src/view/status.ts baseline, src/main.ts, index.html/src/style.css baseline, tests/browser/playable-slice.spec.ts, and necessary test fixtures. Limit this task to assembly of the established engine and renderer; full input filtering/session commands remain in 1.3.
            Depends on: T-006.
            Evidence: npm run test:browser -- tests/browser/playable-slice.spec.ts; npm test; npm run typecheck; npm run build. Play the ordinary page with real keyboard events, observe gravity/locking and game over, and demonstrate a controlled row clear. Record deferred score/preview/pause/restart behavior accurately. Trace: PLAN 1.1 integrated exit, partial A-01/A-02/A-03/A-04/A-06/A-07/A-09.
        - [ ] T-008 — Review, test, and report milestone 1.1
            Scope: Entire first slice, dependency/browser gate, engine/browser seams, tests, and current developer instructions.
            Depends on: T-001, T-002, T-003, T-004, T-005, T-006, T-007.
            Evidence: Separate code review plus npm test, npm run typecheck, npm run build, and relevant Chromium suite. Repair blockers, demonstrate play/locking/clearing, identify deferred contracts, and record usability/environment feedback for the developer's continue/amend/simplify/stop decision. Commit/push the report and verify containment; close the milestone if tracking is enabled.
            Report: docs/dev/reports/phases/1/1.1.md.
    - [ ] Milestone 1.2 — Scoring, progression, and preview
        - [ ] T-009 — Add cleared-line totals, score, and level transitions
            Outcome: Each lock awards the required pre-clear-level score and updates total cleared lines and derived level.
            Scope: src/engine/game.ts and tests/unit/engine/progression.test.ts; scenario support only where required.
            Depends on: T-008 and milestone 1.1 completion/closure.
            Evidence: npm test -- tests/unit/engine/progression.test.ts; npm run typecheck. Cover 0/1/2/3/4 rows, crossing ten-line boundaries, zero drop bonuses, and unchanged score on rejected actions. Trace: G-05, A-03 scoring/progression.
        - [ ] T-010 — Apply level-dependent gravity and residual active time
            Outcome: Gravity uses the current level interval and preserves fractional/residual time across piece promotion and score-driven level changes.
            Scope: src/engine/game.ts and tests/unit/engine/timing.test.ts.
            Depends on: T-009.
            Evidence: npm test -- tests/unit/engine/timing.test.ts; npm test -- tests/unit/engine/game.test.ts; npm run typecheck. Check level-1 interval, subsequent speed, 100 ms floor, fractional time, partitioned elapsed calls, promotion/level-change residuals, and preservation of next-tick locking. Trace: G-04/G-06, A-02/A-03.
        - [ ] T-011 — Present next-piece preview and score progression
            Outcome: Browser preview and DOM score/level/cleared-line values stay consistent with snapshots after promotion and clearing.
            Scope: src/view/renderer.ts, src/view/status.ts, page elements, controller display routing as needed, and tests/browser/progression-preview.spec.ts.
            Depends on: T-010.
            Evidence: npm run test:browser -- tests/browser/progression-preview.spec.ts; npm test; npm run typecheck; npm run build. Controlled browser sequences verify preview-to-active identity, orientation-0 preview drawing, and score/level updates; ordinary-page startup shows correct initial values. Trace: S-04/S-05, A-01/A-03/A-04/A-07 relevant scope.
        - [ ] T-012 — Review, test, and report milestone 1.2
            Scope: Scoring/gravity/preview increments and their interaction with the first playable slice.
            Depends on: T-009, T-010, T-011.
            Evidence: Separate code review plus unit, typecheck, build, and applicable browser checks; verify all 1.2 exits and prior slice regressions. Repair blockers, commit/push/read back the report, and close the milestone if tracking is enabled.
            Report: docs/dev/reports/phases/1/1.2.md.
    - [ ] Milestone 1.3 — Session controls and interruptions
        - [ ] T-013 — Implement engine pause, resume, and fresh-session reset
            Outcome: Engine status gates actions/time correctly and restart resets board, source, counters, level, active/preview, and accumulator without retaining pending movement.
            Scope: src/engine/game.ts, tests/unit/engine/lifecycle.test.ts, and focused scenario support.
            Depends on: T-012 and milestone 1.2 completion/closure.
            Evidence: npm test -- tests/unit/engine/lifecycle.test.ts; npm run typecheck. Verify freeze/resume with fractional accumulator, restart from running/paused/game over, fresh source consumption, and completed-game command invariants. Trace: S-01, G-05/G-06, A-05/A-06.
        - [ ] T-014 — Complete focused keyboard and visible command controls
            Outcome: Arrow repeat, one-shot rotation/P/R, editable/modified-key filtering, focus scope, scroll prevention, and labeled Pause/Resume/Restart buttons route the defined actions.
            Scope: src/session/keyboard.ts, src/view/status.ts, controller command routing as needed, tests/unit/session/keyboard.test.ts, and tests/browser/input.spec.ts.
            Depends on: T-013.
            Evidence: npm test -- tests/unit/session/keyboard.test.ts; npm run test:browser -- tests/browser/input.spec.ts; npm run typecheck. Include repeated keys, paused/game-over arrows, ignored modified/editable input, ordinary button activation, board focus, and no gameplay page scrolling. Trace: S-02, A-05/A-07.
        - [ ] T-015 — Coordinate browser interruptions and session timing
            Outcome: Controller pauses on blur/hidden document, requires explicit eligible resume, resets its time baseline, and restarts without duplicate subscriptions/frame loops. Starting/restarting hidden or unfocused is paused.
            Scope: src/session/controller.ts, tests/unit/session/controller.test.ts, tests/support/scheduler.ts, and tests/browser/session.spec.ts.
            Depends on: T-014.
            Evidence: npm test -- tests/unit/session/controller.test.ts; npm run test:browser -- tests/browser/session.spec.ts; npm test; npm run typecheck; npm run build. Use controlled frame timestamps plus real browser blur/visibility and repeated restart checks; verify inactive time is excluded and restored focus does not resume automatically. Trace: S-01/S-03, SYS-04, A-05/A-06.
        - [ ] T-016 — Review, test, and report milestone 1.3
            Scope: Complete scored session lifecycle, commands, timing, focus, and prior gameplay integrations.
            Depends on: T-013, T-014, T-015.
            Evidence: Separate code review plus unit/typecheck/build and relevant browser regressions; demonstrate pause/restart and focus interruption to inform the developer's next bounded decision. Repair blockers, commit/push/read back the report, and close the milestone if tracking is enabled.
            Report: docs/dev/reports/phases/1/1.3.md.
    - [ ] Milestone 1.4 — Robust presentation and failure boundaries
        - [ ] T-017 — Complete desktop presentation and keyboard accessibility
            Outcome: Board/preview/status/instructions/controls fit the required desktop viewport with square cells, distinct paused/game-over messages, accessible labels/text alternatives, and visible focus.
            Scope: src/style.css, index.html, src/view/renderer.ts, src/view/status.ts, and tests/browser/presentation.spec.ts.
            Depends on: T-016 and milestone 1.3 completion/closure.
            Evidence: npm run test:browser -- tests/browser/presentation.spec.ts; npm run typecheck; npm run build. Inspect an 800 × 600 viewport for overlap/horizontal scroll and full required content; check drawing scale, labels/focus, and paused/game-over preservation of board/score. Trace: S-05, SYS-05, A-01/A-07.
        - [ ] T-018 — Validate initialization and show safe fallback errors
            Outcome: Required DOM/Canvas validation happens before scheduling/subscriptions; missing elements or contexts display readable fallback error text without a partially active session.
            Scope: src/main.ts, setup boundary in src/session/controller.ts if needed, tests/browser/initialization.spec.ts, and isolated invalid-page fixtures.
            Depends on: T-017.
            Evidence: npm run test:browser -- tests/browser/initialization.spec.ts; npm run typecheck. Check missing gameplay/status elements and unavailable Canvas contexts, visible fallback, and no active loop/listeners. Preserve successful ordinary-page initialization. Trace: S-06, SYS-03, A-08.
        - [ ] T-019 — Stop source/scheduler faults and dispose browser resources
            Outcome: Invalid/exhausted sources and scheduling faults stop gameplay with safe readable errors; disposal cancels frames/removes owned listeners and is repeatable. Unrecoverable faults disable Restart.
            Scope: src/engine/piece-source.ts/src/engine/game.ts source boundary, src/session/controller.ts fault/disposal boundary, existing status error view, tests/unit/session/controller.test.ts, and tests/browser/failures.spec.ts.
            Depends on: T-018.
            Evidence: Focused unit and browser failure suites plus npm run typecheck. Inject invalid source output, exhaustion, scheduler failure, and repeated disposal; verify stopped processing, released resources, retained last display, and no secret/error-path exposure. Avoid treating faults as game over. Trace: G-03, S-03/S-06, SYS-03/SYS-04, A-08.
        - [ ] T-020 — Harden elapsed-input rejection and snapshot isolation
            Outcome: Negative/NaN/infinite time is rejected before mutation, snapshots cannot mutate internal grid/piece state, and snapshot acquisition has no gameplay side effects. Add any missing bounded corrections to the existing engine boundary.
            Scope: src/engine/game.ts, tests/unit/engine/invariants.test.ts, and engine contract documentation.
            Depends on: T-019.
            Evidence: npm test -- tests/unit/engine/invariants.test.ts; npm test; npm run typecheck. Exercise invalid-time rejection in running/paused/completed states, nested snapshot mutation attempts, repeated snapshot reads, and unchanged state after rejected actions. Retain source/browser fault regressions. Trace: G-01/G-06, S-04, SYS-01/SYS-02, A-08.
        - [ ] T-021 — Review, test, and report milestone 1.4
            Scope: Full presentation, initialization/runtime failures, disposal, isolation, and their interaction with gameplay/session behavior.
            Depends on: T-017, T-018, T-019, T-020.
            Evidence: Separate code review plus all unit/typecheck/build checks and relevant browser normal/failure regressions. Verify complete A-01/A-07/A-08 scope, repair blockers, commit/push/read back the report, and close the milestone if tracking is enabled.
            Report: docs/dev/reports/phases/1/1.4.md.
    - [ ] Milestone 1.5 — Reproducible static delivery and complete acceptance
        - [ ] T-022 — Complete player and developer documentation
            Outcome: README and player guide accurately describe current controls/rules/status, prerequisites, install/run/check/build/static-serve commands, verified target limits, and SDD navigation.
            Scope: README.md, docs/USER-GUIDE.md, and in-scope source/API comments or layout links needing reconciliation.
            Depends on: T-021 and milestone 1.4 completion/closure.
            Evidence: Check document links and commands against package scripts and actual behavior; preserve root attribution and ignore policy; support Windows CMD and the cloud shell. Planned production evidence is labeled until gathered by T-023/T-024. Trace: SYS-07, A-09.
        - [ ] T-023 — Verify locked installation and production static play
            Outcome: The locked repository setup reproduces its checks/build and the production output plays over static HTTP with real Chromium. Retain complete acceptance evidence without claiming other browsers were checked.
            Scope: Package/configuration fixes only where required for the accepted tooling, tests/browser/production.spec.ts, developer instructions, and selected sanitized browser evidence under the owning report location.
            Depends on: T-022.
            Evidence: npm ci; npm run typecheck; npm test; npm run build; npm run test:browser with development/production checks as configured. Exercise the built ordinary page for keyboard, rendering/status, pause/restart, and game over; controlled source/time/failure fixtures cover cases not reliably forced in random production play. Record actual browser/runtime versions and map every A-01 through A-09 to concrete check results/limitations. Trace: SYS-06/SYS-07, A-09 and integrated acceptance.
        - [ ] T-024 — Inspect shipped output and runtime independence
            Outcome: Production output contains only intended static application assets, excludes credentials/test harnesses/debug interfaces, and performs no external gameplay-service calls.
            Scope: Production build inspection, tests/browser/production.spec.ts network/output assertions where meaningful, and narrowly required build/entry corrections.
            Depends on: T-023.
            Evidence: Inspect built asset inventory and source graph; check no tests/fixtures or production debug global is shipped; verify credential files are ignored/untracked and absent from output without printing token values. Play the production page under static HTTP while inspecting requests/console errors. Retain successful build and browser regressions. Trace: SPEC runtime-service exclusion, S-06, SYS-07, A-09.
        - [ ] T-025 — Review, test, and report milestone 1.5
            Scope: Complete product acceptance, reproducible commands, production assets, browser evidence, and player/developer documentation.
            Depends on: T-022, T-023, T-024.
            Evidence: Separate code review plus complete unit/typecheck/build/browser checks; report evidence and limits for every A-01 through A-09. Demonstrate production play for the developer's final product decision, repair blockers, commit/push/read back the report, and close the milestone if tracking is enabled.
            Report: docs/dev/reports/phases/1/1.5.md.
    - [ ] Milestone 1.6 — Phase review
        - [ ] T-026 — Review, test, and report phase 1 and complete delivery
            Scope: Entire application, cross-milestone behavior, all acceptance, developer/player documentation, packaging, and retained milestone findings. This is the only task in milestone 1.6; there is no extra milestone-review task.
            Depends on: T-008, T-012, T-016, T-021, T-025 and completion/closure of all five delivery milestones; not the closure of milestone 1.6 itself.
            Evidence: Separate whole-phase code review plus final npm run typecheck, npm test, npm run build, and required Chromium/production acceptance. Resolve blockers; aggregate permitted milestone/phase TODOs with options/provenance; commit/push both phase and final implementation reports with phase/list status. Close the review task and final milestone if tracking is enabled. After this verified phase boundary, sdd-implement/sdd-manage performs the explicit merge to main, checks merged-state acceptance, pushes, and confirms remote containment before reporting complete delivery. Do not treat a partial range or pre-merge report as integrated completion.
            Reports: docs/dev/reports/phases/1/PHASE-REPORT.md and docs/dev/reports/IMPLEMENTATION-REPORT.md.

## Planned range boundaries

There are 26 tasks: 20 delivery tasks, five delivery-milestone review tasks, and one phase review task. The first useful complete milestone is T-001 through T-008; T-001 is the initial dependency/browser risk gate. Review tasks count in any selected next-N range. A request to implement a subset stops at its selected verified checkpoint without adding later tasks or an unrequested review task.

The next operation is selection of an implementation range through sdd-implement after this task list is accepted. This document does not itself authorize dependency installation, branch activation, hosted-object creation, or code execution.
