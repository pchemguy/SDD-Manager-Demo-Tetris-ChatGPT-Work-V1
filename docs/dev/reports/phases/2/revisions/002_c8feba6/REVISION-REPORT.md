# Full-interval landing delay steering amendment

## Objective and boundary

The developer clarified on 2026-10-07 that every landing must allow one full gravity interval before locking. Apply the same rule to natural descent, soft drop, hard drop, and legal movement/rotation into a grounded placement. Grounded adjustments, rejected actions, and zero-distance drops do not extend the deadline. Leaving support permits descent; landing again starts a full interval. Pause freezes active time; hold/restart retain their existing reset rules. No new scoring, source, UI, or kick-table behavior is introduced.

Campaign: `002_c8feba6`. Baseline/paused target: `main` at `c8feba6bae939c3bf0134679c6a78c413fe81040`. Working branch: `revision/002_c8feba6-full-interval-lock`; remote: origin in the established GitHub repository. The feature and both phases were complete at this checkpoint; no unfinished task is resumed.

Affected stable owners: G-04/G-06/G-08/G-10, A-02/A-05, FA-02/FA-06/FA-07; T-005/T-010/T-014/T-029/T-036 and their review boundaries. Historical execution evidence and archived feature sources remain intact. Current preparation assessments and completion evidence are reassessed within this amendment; no new executable task IDs or hosted task objects are allocated.

## Preparation assessment

The engine remains sole owner of gameplay timing; the controller supplies elapsed active time, and presentation consumes snapshots. A first manual transition from airborne to grounded clears the gravity remainder; natural gravity landing already occurs at a tick boundary. This uses the existing accumulator, with no second lock timer. Remaining elapsed time within an advance call is actual time after its ticks and must not be discarded. Movement while continuously grounded never resets the accumulator. Current design/SPEC/PLAN/TASKS/layout are directly reconciled; adjacent QC reports retain the initial observations and append this focused recheck.

## Implementation and verification

Implemented a shared legal manual-placement commit in the engine. It resets the existing gravity accumulator only when the old placement can descend and the new placement cannot. Hard drop, soft drop, horizontal movement and kicked rotation all use it. Natural gravity placement keeps post-tick residual elapsed time, preserving large-call/partition equivalence. Grounded/no-op commands preserve the deadline. No public API, kick-table, source, scoring or product dependency change.

Test-first RED: selected landing-delay, timing and controller suites executed 26 tests: 9 failed for early locking, 17 passed. Failures covered hard/soft landing, continuous-support deadline, horizontal/rotation contact, paused remaining delay, level-2/minimum-speed contact and controller near-tick behavior. Production edits followed this observed failure. GREEN and regression: `npm test` passed all 288 unit tests; `npm run typecheck` passed; `npm run test:browser` passed all 68 Chromium checks and its required production build. Two added shipped-page scenarios cross the obsolete deadline after hard/soft landing, remain active near the full interval, and lock afterward. Existing rendering, hold, kick, score/progression, pause/restart, terminal/fault, static-delivery and network checks remain green.

Code review by the main agent was performed separately from test execution: inspected every action placement path, zero-distance/O/rejection behavior, first-contact predicates, tick residual handling, source/hold entitlement, controller integration, tests and current docs. The original multi-rotation test was narrowed to one supported-to-airborne rotation: its three-rotation cycle recontacted support and therefore correctly started a fresh interval. New explicit rotation-contact coverage protects that changed contract. No unresolved product defect or TODO was found; no independent reviewer is claimed.

Current PROJECT/design/SPEC/PLAN/TASKS/layout and player/README documentation agree on full-interval first landing. Original task/phase checkpoints and archived feature sources are unchanged historical evidence. Affected completion claims are re-established; all 42 original issues and eleven original milestones remain complete without allocating/replaying tasks. Documentation links and current QC identities are checked before publication. Existing npm http-proxy and color-environment warnings are non-fatal; no skipped unit/browser tests. Native desktop focus-event delivery, Windows and other browsers remain unverified; headless modeled lifecycle tests retain their established scope.

## Integration and publication

Preparation checkpoint `d25235e5472632fe591c0c89b961389d1a2bd1a4` and verified amendment `2080b79586b5fb60a747779b67e82d3ea0c20240` were normally pushed and read back exactly on `revision/002_c8feba6-full-interval-lock`. Main was refreshed from origin and remained at baseline `c8feba6bae939c3bf0134679c6a78c413fe81040`. The explicit `--no-ff --no-commit` merge of amendment tip 2080b79 into that target had no conflicts.

Merged-state verification passes: 288 unit tests, strict typecheck, production build and all 68 Chromium checks. All 46 Markdown documents, 252 local links/anchors and current preparation source hashes pass. Standalone production output consists of exactly HTML/CSS/JS, with no test-harness or credential markers. The engine retains domain-only imports. Original hosted task/milestone state was read back: all 42 issues and eleven milestones remain closed; no new task or external comment was created.

The coherent verified merge is ready for its two-parent commit and normal main push. Exact merge commit/publication observation will be added after readback. The revision branch is retained; no further task or phase is selected.

## Findings and TODO

No unresolved scope decision. Product verification passed. Native desktop focus events and other platforms retain their established evidence limits.
