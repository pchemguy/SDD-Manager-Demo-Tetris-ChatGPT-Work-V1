# Archived feature source

Historical/non-executable feature preparation. Current main PROJECT/design/SPEC/PLAN/layout and [TASKS](../../TASKS.md) own the project. This archived source and its adjacent review are retained for provenance; original review hashes identify their published preparation checkpoints, before execution/navigation updates.

# Ghost, hold, hard drop and wall-kick specification

## Scope and authority

This active feature delta adds four accepted mechanics to the desktop game specified by [SPEC](../../SPEC.md). Design owners are [Feature architecture](FEATURE_ARCHITECTURE.md) and [Feature decomposition](FEATURE_DECOMPOSITION.md); [package context](README.md) pins the baseline. These are intended requirements, not implemented capability.

The accepted defaults retain clockwise-only rotation, the 10 × 20 board without hidden rows, existing spawn geometry, existing score/progression, and browser-controlled movement repeat. Counterclockwise/180-degree controls, spin/combo/drop bonuses, configurable rules, touch controls and commercial-edition conformance are outside this feature.

| Main owner | Declared delta |
| --- | --- |
| PROJECT/SPEC exclusions | Ghost, hold, hard drop and wall kicks enter the intended scope upon accepted incorporation. |
| G-01/G-02 | Placement remains legal only for in-board unoccupied cells; rotation gains the ordered kick policy F-04. |
| G-03/G-05 | Empty-slot hold also promotes preview; locking restores hold entitlement; blocked held spawn also causes game over. |
| G-04/G-06 | Hard drop is added without locking or timing reset; successful hold resets the gravity accumulator. |
| S-01/S-02 | Restart clears hold; keyboard gains C/Space one-shot commands. |
| S-04/S-05/SYS-05 | Detached snapshot and presentation gain ghost/held/hold-entitlement data. |
| A-01/A-02/A-04/A-05/A-06/A-07/A-08/A-09 | Retain applicable acceptance and add FA-01–FA-07 below. |

Unaffected contracts remain owned by [gameplay](../../spec/gameplay.md) and [session](../../spec/session.md). Active feature requirements govern the declared deltas during feature execution; complete main documents are reconciled through accepted feature incorporation.

## F-01 — Landing and ghost

For a legal active piece, landing is reached by repeatedly moving one cell down while placement stays legal. It has the same kind, orientation and x as the active piece and the greatest downward-reachable y before the first blocked descent. It cannot pass through an obstructing row to another free area. A grounded piece lands at its current position.

Every snapshot with an active piece supplies its landing as ghost placement; no active piece means null ghost. Acquisition changes no state, consumes no pieces and advances no time. Supplied ghost and active data are detached. Ghost refreshes after any change to active placement or board, including hold, kick, spawn and row clearing.

Render ghost cells as distinguishable outlines behind solid active cells and without modifying board cells. When ghost overlaps active cells, active cells remain fully legible. Pause preserves the active/ghost display; game over shows the locked board without active or ghost cells.

## F-02 — Hard drop and scheduled locking

While running, hard drop moves the active piece to F-01 landing and performs no lock, clear, score/progression update, source consumption or preview promotion. It preserves the gravity accumulator and hold entitlement. At zero distance it is a no-op.

The piece remains movable, rotatable and eligible for hold according to F-03. The next scheduled gravity tick locks it only if descent is still blocked; if an intervening move/kick makes descent legal, that tick moves it down. Hard drop introduces no new timer and grants no full-interval delay: with 999 ms accumulated at level 1, a drop followed by 1 ms locks a still-grounded piece. Paused/completed drop is a no-op. There is no drop score bonus.

## F-03 — Hold, source order and lifecycle

A fresh session has an empty held slot and hold entitlement enabled. A successful hold disables entitlement until the active piece locks and its successor is legally spawned. An unavailable hold is a complete no-op, including source and timing state. Moving, rotating, soft/hard dropping, pausing or resuming does not restore entitlement.

With an empty slot, store the outgoing active kind, promote preview into an orientation-zero piece at its ordinary spawn, and consume exactly one validated source kind as the new preview. With a populated slot, exchange outgoing active kind for held kind; incoming kind uses ordinary orientation-zero spawn, while preview/source remain unchanged. Store kind only, never orientation or position. Successful hold leaves locked cells, score, cleared lines and level unchanged and resets engine gravity accumulator to zero.

The incoming spawn is checked by ordinary placement rules. A blocked spawn causes game over immediately, with no illegal active/ghost displayed, the resulting held slot and preview visible, unchanged board/score, and hold entitlement disabled. Empty-slot promotion uses the same validated-source-before-spawn-check order as ordinary G-05 promotion. Invalid/exhausted source invokes the existing application-fault boundary rather than a substituted piece or game over.

Hold input while paused/game over is ignored. Pause retains held kind and entitlement. Restart clears held kind, enables entitlement and resets gameplay/time according to S-01. A hard drop alone never restores entitlement because it does not lock.

## F-04 — Clockwise SRS-based kicks

Use G-02 geometry, clockwise orientation cycle 0 → 1 → 2 → 3 → 0, and spawn origin. O remains a no-op. For another kind, rotate within its existing matrix, then apply each offset below to the ORIGINAL frame origin, in listed order. Commit the first legal candidate; if none is legal, reject without any gameplay/timing/source change. Do not apply offsets cumulatively. Kicks never reset gravity, lock, award score or change hold entitlement.

Offsets use game coordinates: positive x is right, positive y is DOWN. They are the clockwise subset of the standard SRS tables with the source's upward-positive y inverted. Vertical offsets include floor/stack kicks. Occupied cells above row 0 remain illegal; this feature adds no hidden spawn rows.

| Transition | J/L/S/T/Z ordered (dx, dy) candidates |
| --- | --- |
| 0 → 1 | (0,0), (-1,0), (-1,-1), (0,2), (-1,2) |
| 1 → 2 | (0,0), (1,0), (1,1), (0,-2), (1,-2) |
| 2 → 3 | (0,0), (1,0), (1,-1), (0,2), (1,2) |
| 3 → 0 | (0,0), (-1,0), (-1,1), (0,-2), (-1,-2) |

| Transition | I ordered (dx, dy) candidates |
| --- | --- |
| 0 → 1 | (0,0), (-2,0), (1,0), (-2,1), (1,-2) |
| 1 → 2 | (0,0), (-1,0), (2,0), (-1,-2), (2,1) |
| 2 → 3 | (0,0), (2,0), (-1,0), (2,-1), (-1,2) |
| 3 → 0 | (0,0), (1,0), (-2,0), (1,2), (-2,-1) |

Reference for ordered data and coordinate convention: MIT Hardness Group, Demaine, Hall and Li, [Tetris with Few Piece Types, section 2, tables 2–3](https://arxiv.org/html/2404.10712v1#S2). This project adopts those clockwise kick tables; its locking, board and scoring contracts are defined here independently.

## F-05 — Input, snapshot, presentation and failure

Space (`KeyboardEvent.code` Space, or key equal to a single space) maps to hard drop. C/c maps to hold. Both are one-shot: repeated keydown is ignored. Under S-02 focus/modifier/editable-target rules, recognized Space still suppresses scrolling for repeated, paused and game-over input. C retains the same focus routing. Existing arrow/P/R rules remain applicable; input is processed in delivery order.

Snapshot supplies detached ghost placement or null, held kind or null, and boolean hold entitlement. Entitlement describes whether a hold has been spent in the current lock cycle; actions additionally require running status. Game over supplies false entitlement. Ghost derivation and repeated reads have no source/time effects.

A labeled Hold panel shows an orientation-zero held shape or a readable empty indicator, plus availability/unavailability. Paused state preserves the panel; restart clears stale held pixels. Next preview stays distinct from Hold. The complete board, both panels, counters, status and instructions remain usable at 800 × 600 without overlap or horizontal scrolling, with square cells and visible keyboard focus.

Added Canvas/DOM resources are validated with existing startup resources before listeners/frames begin. Their failures show readable fallback text and no active resources. Runtime failures retain the last available display, release resources and disable unsafe restart under S-06. No extra network/runtime dependency or persistent state is introduced.

## Feature acceptance

| ID | Required evidence |
| --- | --- |
| FA-01 | All seven kinds/orientations land above the first floor/stack obstruction; ghost and drop share the destination; zero-distance and detached/pure snapshots pass. |
| FA-02 | Drop does not lock/score/consume/promote; residual-time boundary locks on the next blocked tick; intervening move/kick can permit descent; repeated/paused/terminal commands do not alter state. |
| FA-03 | Empty hold consumes one successor preview; populated swap consumes none; orientation/spawn reset; unavailable hold changes nothing; lock restores entitlement; drop alone does not; blocked incoming spawn and source faults remain distinct. |
| FA-04 | Every clockwise transition/family is checked against the table; exercise wall/floor/stack and upper-boundary candidates, later candidate success, first-legal precedence and total rejection; O remains unchanged. |
| FA-05 | Real Chromium keyboard/rendering checks establish ghost/held/preview correspondence, one-shot commands, Space scroll prevention, active-over-ghost legibility, paused display and restart cleanup at 800 × 600. |
| FA-06 | Combined hold → kick → drop → move → tick sequences retain source order/scoring/time; restart, interruption, fault, disposal and added initialization failures preserve existing guarantees. |
| FA-07 | Strict typecheck, applicable engine/controller and browser regressions, production static-HTTP play and runtime-network independence pass; player/developer docs describe delayed locking. Record native focus/other-platform evidence limits accurately. |

No material decision remains open for this scope. Readiness is assessed in [Feature specification review](FEATURE-SPEC-REVIEW-REPORT.md). Implementation and delivery planning are separate stages.
