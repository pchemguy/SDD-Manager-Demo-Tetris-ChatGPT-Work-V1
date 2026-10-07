# Piece-control feature architecture

## Objective and baseline

Add ghost, hold, hard drop, and clockwise wall kicks to the desktop TypeScript game. The accepted correction requires hard drop to use scheduled gravity locking. This feature delta supplements [Architecture](ARCHITECTURE.md) and the [project brief](PROJECT.md); its identity and baseline are in the [feature package](features/001_a043a43/README.md).

## Arrangement and ownership

The engine/controller/presentation arrangement is retained. The engine owns held-piece state and hold eligibility, applies drop/hold actions, and resolves landing and kicked rotation using pure board/geometry operations. Snapshots carry detached ghost placement, held kind, and hold eligibility in addition to their existing data. No browser dependency enters the engine.

Landing calculation is shared by ghost snapshots and hard drop. This prevents the view from independently predicting collisions. Kick selection applies immutable ordered transition data through the existing placement predicate; the engine commits only a legal candidate. Piece geometry retains its accepted rotation frames and spawn definitions.

The controller routes semantic actions and retains exclusive scheduling/lifecycle ownership. Presentation draws supplied ghost geometry and held preview, exposes hold availability and new instructions, and owns no collision or kick rules. Entry validation includes the new presentation resources before scheduling or subscription begins.

## Rationale and invariants

Sharing landing calculation makes the ghost a reliable indication of the drop destination. Holding stores only a kind; orientation and position belong to the active piece. Reusing normal spawn and source validation keeps held-piece failures inside the established game-over and application-fault boundaries.

Snapshots remain detached and side-effect-free. Ghost calculation neither consumes a source value nor advances time. A successful hold resets engine gravity accumulation; drop and kicks do not. Only a blocked gravity tick transfers active cells to the board. Pause, restart, disposal, static delivery and runtime independence retain their established ownership.

Exact rules and ordered kick offsets belong to [Feature specification](FEATURE-SPEC.md); logical interfaces belong to [Feature decomposition](FEATURE_DECOMPOSITION.md). No generalized rules plugin, new framework, server or persistent format is needed.
