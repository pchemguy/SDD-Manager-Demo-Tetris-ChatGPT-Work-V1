# Gameplay contracts

This child owns the engine's gameplay behavior. [Session](session.md) owns browser input and lifecycle. Coordinates use x increasing rightward and y downward; the top-left visible board cell is (0, 0).

## G-01 — Board and placement

The board has 10 columns and 20 rows, with no hidden rows. Each cell is empty or contains a locked piece kind. Active-piece cells are separate from locked board cells. A placement is legal only if all four occupied cells are inside the board and overlap no locked cell. An invalid move or rotation leaves the board, active position, orientation, score, preview, and timing unchanged.

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

Clockwise rotation maps each cell in an n × n frame from (x, y) to (n − 1 − y, x). Four rotations restore orientation 0. O rotation is a no-op. Other rotations retain the frame's board origin; a collision or boundary violation rejects the rotation without a wall kick.

Each piece spawns in orientation 0 at frame origin (floor((10 − n) / 2), 0). Only occupied cells participate in collision. A blocked spawn produces game over immediately, with no illegal active piece displayed and no changes to locked cells.

## G-03 — Piece source and preview

Ordinary play draws successive shuffled bags, each containing every kind exactly once. A piece can repeat across a bag boundary. No requirement prescribes the shuffle algorithm, but it must permit every permutation under a suitable random input and must not duplicate or omit kinds within a bag.

Starting a session draws one active piece and one preview piece. After a lock/clear transition, the preview becomes the active piece and the source supplies its successor preview. The engine accepts a deterministic source for verification. Valid sources supply only defined kinds and enough pieces for the requested sequence; source failure or invalid output produces an application fault and stops gameplay, rather than silently substituting a kind.

## G-04 — Movement, soft drop, and locking

Left and right actions attempt one horizontal cell. Soft drop attempts one downward cell. Successful movement does not award points or reset the gravity accumulator. A blocked soft drop is a no-op and does not lock the piece.

A gravity tick attempts one downward cell. If descent succeeds, the piece remains active even when that move leaves it resting on the floor or stack. If descent is blocked, the piece locks at that tick. Thus the next gravity tick after reaching a resting position locks the piece if it still cannot descend. Horizontal movement and legal rotation remain available before that tick; neither postpones the scheduled tick. If the piece is moved into a position from which descent is possible, the tick moves it down instead of locking.

There is no immediate-lock soft-drop exception, hard drop, separate lock timer, or lock-delay reset counter.

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

Game over occurs when the promoted piece's occupied spawn cells collide with the board. The final locked board, score, level, cleared-line total, and preview remain visible. Movement, rotation, soft drop, pause toggles, and elapsed time are no-ops during game over; restart remains available.

## G-06 — Gravity and elapsed time

At level L, the interval in milliseconds is max(100, 1000 × 0.8^(L − 1)). A fresh session starts with accumulator 0. Advancing time adds a finite nonnegative elapsed-millisecond value to the accumulator. Whenever it reaches the current interval, subtract that interval and process one gravity tick. Repeat while enough time remains, using the resulting level's interval after any clear. Fractional milliseconds are retained; no rounding is required.

Accumulated residual time continues across piece promotion during active play. Game over stops remaining tick processing. Pause preserves the fractional accumulator but contributes no elapsed time. Restart clears it. Manual moves and rotations never reset it.

Negative, NaN, or infinite elapsed time raises a RangeError before any mutation. Valid elapsed time has no effect when paused or game over. Identical total elapsed time without interleaved actions yields the same result whether supplied as one call or multiple calls, subject to ordinary floating-point precision.

## Gameplay acceptance boundaries

Acceptance [A-02 through A-04 and A-06](../SPEC.md#end-to-end-acceptance) includes every geometry, floor/wall/stack collisions, rejected rotation, a grounded piece moved before its next tick, a blocked soft drop that stays active, simultaneous/nonadjacent row compaction, pre-clear scoring at a level boundary, minimum-speed saturation, bag boundaries, and blocked spawn after row clearing.
