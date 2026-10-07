# Phase 2 — Piece-control extension review

## Result and integration gate

Whole-phase checks pass on reviewed source `711e30d6b2684d26e622bb6c1746f5ffd70feb18`, following four delivery milestone reviews/verified closures. Ghost, hold, delayed hard drop and clockwise SRS-based wall/floor kicks satisfy main G-07–G-10, session contracts, FA-01–FA-07 and retained A-01–A-09. T-027–T-041 are published/hosted-closed; T-042 publishes this review and final feature report. Main integration/publication remains the mandatory final gate, recorded below after observation.

## Separate whole-boundary code review

Reviewed the complete product change from `a043a43` and final repaired status behavior, independently of running tests. Landing/ghost/drop have one pure collision owner and detached snapshots. Hold stores kind only, validates the exact empty-slot successor before placement, consumes none on populated swap, resets gravity and spends entitlement until legal lock promotion. Blocked incoming spawn is terminal game over; source/scheduler failure stays an application fault with last display/resource cleanup.

All eight clockwise rows match accepted data in downward-positive coordinates. Candidates use independent original origins, first-legal order and occupied-cell bounds; O is unchanged, complete rejection preserves state, and kicks/drop never reset gravity. A 999+1ms blocked tick locks after drop; adjustment can permit descent, with no drop/extra scoring. Keyboard focus/modifier/editable/native-button/repeat/default behavior and controller scheduling/disposal remain coherent. Ghost layering, held/next distinction, empty cleanup, terminal availability and startup validation agree with snapshots and the 800×600 page.

Reviewed full canonical design/SPEC/PLAN/layout and source ownership. Main TASKS is the sole executable list with 42 stable IDs; phase-one tasks/evidence are preserved exactly. Nine feature preparation sources/reviews are historical/non-executable, with repaired links and existing issue associations. No test interface, external runtime service or product dependency enters the shipped graph. No confirmed unresolved product defect, critical code issue or contract violation remains. Main-agent review is not independent review.

## Verification and exits

`npm run typecheck`, `npm test` (278/278), `npm run build`, and `npm run test:browser` (66/66) pass at the phase boundary. A final standalone build/inspection confirms exactly three clean HTML/CSS/JS assets, pure engine imports and no product test dependencies. Current document SHA-256 identities and all local links/anchors pass. Predecessor readback confirms all four phase-two delivery milestones and their fifteen issues closed. Complete acceptance/reproduction and selected inspected images are retained in [ACCEPTANCE](ACCEPTANCE.md).

Git push of the final delivery checkpoint returned repeated server errors. Publication recovered with the established repository credential through UTF-8 Git data objects, asserting identical local blob/tree/commit hashes and fast-forward-only refs, then verifying through API and Git `ls-remote`. No force update or history rewrite was used. Review/milestone closure follows verified publication.

Native desktop focus/visibility delivery, Windows and other browsers remain unverified; controlled lifecycle events/schedulers establish handler/time behavior. Non-fatal npm proxy/color warnings remain. No product release/deployment or CI was added.

## Final integration observation

Pending explicit two-parent merge, merged-state checks, target publication and remote containment. The phase checklist remains unchecked until those observations are recorded.

## TODO aggregation

Milestones 2.1–2.4 and acceptance each report None. Whole-phase TODO: None. Root SDD Manager findings are separate plugin amendment proposals, not deferred product defects; the plugin was not modified.
