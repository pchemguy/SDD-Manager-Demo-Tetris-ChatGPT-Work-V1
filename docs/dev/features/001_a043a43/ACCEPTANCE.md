# Piece-control acceptance evidence

Verified on 2026-10-07 from the shipped application on the feature branch. Merged-state checks pass and main integration `65a8e8c` is published; [final report](IMPLEMENTATION-REPORT.md) records ordered parents and remote observations. Linux x64, Node 24.19.0/npm 11.9.0, Playwright 1.63.0 and Chromium 153.0.8010.0.

## Reproduction and delivery

`npm ci` installed the committed resolution (65 packages). Removed only the ignored browser extraction cache, then the ordinary browser command extracted pinned Chromium/fonts afresh and launched successfully. `npm run typecheck`, `npm test` (278), `npm run build` and `npm run test:browser` (66) pass. The build contains exactly one HTML entry, one CSS asset and one JavaScript asset, with ES2020 target. A post-browser inspection found two older generated asset hashes alongside the current output; a standalone documented build cleaned the output and the final three-file inventory passed. Inspected final output contains no fixture paths, debug controls, fault diagnostics or credential filename. No product dependency was added. A strengthened production check exposed 605px page height only when hold availability wrapped onto two lines; reduced outer padding repairs that state without shrinking cells or text.

Static HTTP checks run the unchanged shipped entry, using controlled browser randomness/time rather than exposing an engine or debug interface. They exercise real keys, ghost pixels, empty hold, wall kick, delayed landing, movement before a tick, legal lock, populated swap, preview retention and restart. [Inspected production image](piece-controls-page.png) shows distinct Next/Hold panels, unavailable hold, instructions, focus and a landed active piece at 800 × 600. External requests are blocked; all observed requests are same-origin GETs for the entry/CSS/JS, with no socket or console/page error.

## Acceptance mapping

| Condition | Actual evidence |
| --- | --- |
| FA-01 | landing.test.ts: all kinds/orientations, first obstruction, grounded/detached/pure/null snapshots; hard-drop and browser rendering correspondence. |
| FA-02 | hard-drop.test.ts and piece-controls.test.ts: no lock/source/score/reset, exact 999+1ms boundary, post-drop move/kick descent, subsequent blocked lock; browser input and shipped controls. |
| FA-03 | hold.test.ts: exact empty/populated calls, unrotated spawn, spent entitlement/no-op, legal lock renewal, blocked spawn, restart and source faults; real C input and panel cleanup. |
| FA-04 | kicks.test.ts: 147 table/legal-placement cases, every family/transition, independent offsets, priority, reachable later successes, top/floor/wall/stack bounds and rejection/O. Public engine rejection and combined browser scenarios. |
| FA-05 | rendering, progression-preview, presentation and input suites: literal cells/colors for all seven held kinds, outline layering, pause/restart, one-shot C/Space/default behavior and full 800×600 height/width. |
| FA-06 | combined engine/browser hold→kick→drop→move→tick, source-fault resource cleanup, session interruption/restart/disposal, independent added initialization failures. |
| FA-07 | locked/fresh-cache reproduction, complete type/unit/browser/build checks, ordinary production static play and network/artifact inspection. |
| A-01–A-04 | initial counters/board and preview, geometry/source/timing, clear-cardinality recipes, compaction and level boundaries remain covered by the complete unit and browser progression/playable suites. |
| A-05–A-08 | session/controller, invariant, initialization, runtime failures, snapshot isolation, terminal/restart checks retained and expanded for hold. |
| A-09 | documented locked install/build/check commands, static production HTTP and graph/network checks pass. |

Test suite paths above are under `tests/unit/engine/` or `tests/browser/` as named. [Baseline detailed acceptance](../../reports/phases/1/ACCEPTANCE.md) is retained; its result counts describe that historical boundary.

Native desktop focus/visibility delivery is not verified in headless shell; controlled lifecycle events and scheduler tests prove handlers/time behavior. Windows and other browsers remain unverified. Review is performed by the main agent. Non-fatal npm proxy/color warnings persist.

## TODO

None.
