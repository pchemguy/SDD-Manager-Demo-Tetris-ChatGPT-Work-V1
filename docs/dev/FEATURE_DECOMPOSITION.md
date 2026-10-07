# Piece-control feature decomposition

This delta refines [Feature architecture](FEATURE_ARCHITECTURE.md) and preserves unaffected [main components](DECOMPOSITION.md).

| Component | Affected responsibility and collaboration | State and verification seam |
| --- | --- | --- |
| Geometry and kick policy | Supply clockwise orientations and ordered offsets for the appropriate kind/transition; do not read browser state. | Immutable data; verify every clockwise transition, family distinction and coordinate signs. |
| Board rule operations | Derive the downward-reachable landing and select the first legal kicked rotation through placement checks. | Pure board/piece inputs; verify obstruction, boundaries, zero-distance landing and complete rejection. |
| Game engine | Own held kind and eligibility; apply hold/drop; coordinate source promotion and blocked spawn; publish ghost placement. | One gameplay state owner; deterministic source/time tests and detached snapshots. |
| Keyboard adapter/controller | Map C/Space to hold/drop, reject repeated one-shot commands, suppress handled scrolling and forward actions. | Existing focus and subscription boundaries; verify repeat, inactive states and cleanup. |
| Canvas renderer | Draw ghost below active cells and an orientation-zero held preview using supplied snapshots/shared geometry. | Drawing resources only; pixel checks, ghost overlap and empty-slot clearing. |
| Status/controls view | Display hold availability and updated instructions while retaining existing commands. | DOM resources only; browser correspondence and focused input checks. |
| Entry point | Resolve/validate any additional held-preview resources before starting the existing collaborators. | Startup-failure fixtures establish no leaked subscriptions or scheduled frame. |

## Interfaces and lifecycle

The semantic action boundary gains hold and hard drop. Snapshot extension supplies a ghost piece or null, a held kind or null, and a boolean hold entitlement. Exact names are implementation choices; consumers can rely on the contracts in [Feature specification](FEATURE-SPEC.md). Renderers use supplied placement and shared geometry without calculating a second landing.

Landing and kicked-placement helpers can be tested directly; they need no new stateful subsystem. Engine lock/clear/source promotion retains one owner. Holding an empty slot uses preview promotion; swapping a populated slot consumes no source value. Controller adapters do not implement these distinctions.

Restart resets hold and timing through the engine and clears browser timing through the controller. Pause preserves all added state. Source failures use the existing controller/entry fault boundary; blocked legal-piece spawning is ordinary game over. No unrelated component reorganization is included.
