# Gameplay contracts

This child owns the engine's gameplay behavior. [Session](session.md) owns browser input and lifecycle. Coordinates use x increasing rightward and y downward; the top-left visible board cell is (0, 0).

## G-01 — Board and placement

The board has 10 columns and 20 rows, with no hidden rows. Each cell is empty or contains a locked piece kind. Active-piece cells are separate from locked board cells. A placement is legal only if all four occupied cells are inside the board and overlap no locked cell. An invalid move or rotation leaves the board, active position, orientation, score, preview/held kinds, hold entitlement, and timing unchanged.

## G-02 — Geometry, rotation, and spawn

The seven kinds are I, J, L, O, S, T, and Z. The following local coordinates define orientation 0. Matrix size defines the rotation frame, including its empty cells.

| Kind | Matrix size | Occupied (x, y) coordinates |
| --- | --- | --- |
| I | 4 × 4 | (0,1), (1,1), (2,1), (3,1) |
| J | 3 × 3 | (0,0), (0,1), (1,1), (2,1) |
| L | 3 × 3 | (2,0), (0,1), (1,1), (2,1) |
| O | 2 × 2 | (0,0), (1,0), (0,1), (1,1) |
| S | 3 × 3 | (1,0), (2,0), (0,1), (1,1) |
| T | 3 × 3 | (1,0), (0,1), (1,1), (2,1) |
| Z | 3 × 3 | (0,0), (1,0), (1,1), (2,1) |

Clockwise rotation maps each cell in an n × n frame from (x, y) to (n − 1 − y, x). Four rotations restore orientation 0. O rotation is a no-op. Other rotations use the ordered clockwise kick policy in G-10; the first legal candidate wins, and complete rejection preserves all state.

Each piece spawns in orientation 0 at frame origin (floor((10 − n) / 2), 0). Only occupied cells participate in collision. A blocked spawn produces game over immediately, with no illegal active piece displayed and no changes to locked cells.

## G-03 — Piece source and preview

Ordinary play draws successive shuffled bags, each containing every kind exactly once. A piece can repeat across a bag boundary. No requirement prescribes the shuffle algorithm, but it must permit every permutation under a suitable random input and must not duplicate or omit kinds within a bag.

Starting a session draws one active piece and one preview piece. After a lock/clear transition, the preview becomes the active piece and the source supplies its successor preview. An empty hold also promotes preview and consumes its successor; a populated swap consumes none (G-09). The engine accepts a deterministic source for verification. Valid sources supply only defined kinds and enough pieces for the requested sequence; source failure or invalid output produces an application fault and stops gameplay, rather than silently substituting a kind.

## G-04 — Movement, soft drop, and locking

Left and right actions attempt one horizontal cell. Soft drop attempts one downward cell. Successful movement does not award points. A legal action that first changes an airborne piece into a grounded piece resets the gravity accumulator to zero, granting a full gravity interval before locking. Grounded means that one downward cell is illegal. A blocked soft drop is a no-op and does not lock the piece.

A gravity tick attempts one downward cell. If descent succeeds, the piece remains active even when that move leaves it resting on the floor or stack. If descent is blocked, the piece locks at that tick. Every landing grants one full current-level gravity interval before a blocked tick can lock. Natural descent lands at a tick boundary; manual descent, hard drop, horizontal movement or rotation that first grounds an airborne piece starts a fresh interval. Horizontal movement and legal rotation remain available during the delay; actions that keep the piece grounded do not postpone its deadline. If the piece is moved into a position from which descent is possible, the tick moves it down instead of locking.

Hard drop follows this same full-interval landing rule (G-08). Leaving support permits descent on the scheduled tick; a subsequent airborne-to-grounded transition starts a fresh interval. There is no immediate-lock drop exception, separate lock timer, or lock-delay reset counter.

## G-05 — Lock, clear, score, and game over

Lock writes the four legal active cells into the board. All complete rows are identified and removed together. Remaining rows preserve relative order and fall to fill the gaps; empty rows are inserted at the top. The engine then updates score and progression, resets orientation for the promoted preview, and checks its spawn placement.

| Rows cleared by one lock | Base score |
| --- | --- |
| 0 | 0 |
| 1 | 100 |
| 2 | 300 |
| 3 | 500 |
| 4 | 800 |

The awarded score is base score multiplied by the level immediately before the clear. Cleared-line total increases by the number cleared. Level is 1 + floor(total cleared lines / 10). The post-clear level governs subsequent gravity. No combo, spin, drop, or other bonus exists.

Game over occurs when the promoted piece's occupied spawn cells collide with the board. The final locked board, score, level, cleared-line total, preview and held kind remain visible, with hold entitlement false. Movement, rotation, soft/hard drop, hold, pause toggles, and elapsed time are no-ops during game over; restart remains available.

## G-06 — Gravity and elapsed time

At level L, the interval in milliseconds is max(100, 1000 × 0.8^(L − 1)). A fresh session starts with accumulator 0. Advancing time adds a finite nonnegative elapsed-millisecond value to the accumulator. Whenever it reaches the current interval, subtract that interval and process one gravity tick. Repeat while enough time remains, using the resulting level's interval after any clear. Fractional milliseconds are retained; no rounding is required.

Accumulated residual time continues across piece promotion during active play. Game over stops remaining tick processing. Pause preserves the fractional accumulator but contributes no elapsed time. Restart clears it. Manual actions reset it only on the airborne-to-grounded transition described in G-04; rejected actions, continuously grounded adjustments and zero-distance hard drop never reset it. Successful hold resets it to zero (G-09). Natural landing does not discard residual elapsed time after its tick; bulk and partitioned advances agree.

Negative, NaN, or infinite elapsed time raises a RangeError before any mutation. Valid elapsed time has no effect when paused or game over. Identical total elapsed time without interleaved actions yields the same result whether supplied as one call or multiple calls, subject to ordinary floating-point precision.

## G-07 — Landing and ghost

For a legal active piece, landing is reached by repeatedly moving one cell down while placement stays legal. It has the same kind, orientation and x as the active piece and the greatest downward-reachable y before the first blocked descent. It cannot pass through an obstructing row to another free area. A grounded piece lands at its current position.

Every snapshot with an active piece supplies its landing as ghost placement; no active piece means null ghost. Acquisition changes no state, consumes no pieces and advances no time. Supplied ghost and active data are detached. Ghost refreshes after any change to active placement or board, including hold, kick, spawn and row clearing.

Presentation consumes supplied ghost placement under [S-05](session.md#s-05--presentation); it does not duplicate landing rules.

## G-08 — Hard drop and full-interval locking

While running, hard drop moves the active piece to G-07 landing and performs no lock, clear, score/progression update, source consumption or preview promotion. It preserves hold entitlement and starts a full gravity interval when it moves an airborne piece onto support. At zero distance it is a no-op.

The piece remains movable, rotatable and eligible for hold according to G-09. The next gravity tick, one full interval after landing, locks it only if descent is still blocked; if an intervening move/kick makes descent legal, that tick moves it down. Hard drop uses the same accumulator and landing rule as ordinary descent: with 999 ms accumulated at level 1, a positive-distance drop followed by 999 ms remains active; the following 1 ms locks a still-grounded piece. Repeated zero-distance drops do not extend this deadline. Paused/completed drop is a no-op. There is no drop score bonus.

## G-09 — Hold, source order and lifecycle

A fresh session has an empty held slot and hold entitlement enabled. A successful hold disables entitlement until the active piece locks and its successor is legally spawned. An unavailable hold is a complete no-op, including source and timing state. Moving, rotating, soft/hard dropping, pausing or resuming does not restore entitlement.

With an empty slot, store the outgoing active kind, promote preview into an orientation-zero piece at its ordinary spawn, and consume exactly one validated source kind as the new preview. With a populated slot, exchange outgoing active kind for held kind; incoming kind uses ordinary orientation-zero spawn, while preview/source remain unchanged. Store kind only, never orientation or position. Successful hold leaves locked cells, score, cleared lines and level unchanged and resets engine gravity accumulator to zero.

The incoming spawn is checked by ordinary placement rules. A blocked spawn causes game over immediately, with no illegal active/ghost displayed, the resulting held slot and preview visible, unchanged board/score, and hold entitlement disabled. Empty-slot promotion uses the same validated-source-before-spawn-check order as ordinary G-05 promotion. Invalid/exhausted source invokes the existing application-fault boundary rather than a substituted piece or game over.

Hold input while paused/game over is ignored. Pause retains held kind and entitlement. Restart clears held kind, enables entitlement and resets gameplay/time according to S-01. A hard drop alone never restores entitlement because it does not lock.

## G-10 — Clockwise SRS-based kicks

Use G-02 geometry, clockwise orientation cycle 0 → 1 → 2 → 3 → 0, and spawn origin. O remains a no-op. For another kind, rotate within its existing matrix, then apply each offset below to the ORIGINAL frame origin, in listed order. Commit the first legal candidate; if none is legal, reject without any gameplay/timing/source change. Do not apply offsets cumulatively. Kicks apply the same airborne-to-grounded timing rule as other movement; grounded adjustments and rejected kicks never reset gravity. Rotation never locks, awards score or changes hold entitlement.

Offsets use game coordinates: positive x is right, positive y is DOWN. They are the clockwise subset of the standard SRS tables with the source's upward-positive y inverted. Vertical offsets include floor/stack kicks. Occupied cells above row 0 remain illegal; there are no hidden spawn rows.

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

## Gameplay acceptance boundaries

Acceptance [A-02 through A-04 and A-06](../SPEC.md#end-to-end-acceptance) includes every geometry, floor/wall/stack collisions, rejected rotation, a grounded piece moved before its next tick, a blocked soft drop that stays active, simultaneous/nonadjacent row compaction, pre-clear scoring at a level boundary, minimum-speed saturation, bag boundaries, and blocked spawn after row clearing.
