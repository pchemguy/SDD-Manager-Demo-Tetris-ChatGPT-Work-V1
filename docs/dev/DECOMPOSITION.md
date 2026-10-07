# Component decomposition

## Component model

This document refines the blocks in [Architecture](ARCHITECTURE.md). Components are logical responsibilities; the table does not prescribe one file or class per row.

| Component | Responsibility and provided boundary | Required inputs | State ownership and verification seam |
| --- | --- | --- | --- |
| Piece geometry | Define the seven tetromino shapes and their orientations; provide occupied cell coordinates. | Piece kind and orientation. | Immutable geometry; check four unique connected cells and rotation outcomes. |
| Board operations | Check legal placement, lock cells, and remove completed rows. | Board and occupied cell coordinates. | Operates on engine-owned board state; verify boundaries, collisions, and row compaction. |
| Piece source | Supply piece identities for active and preview pieces. | Random input in ordinary play or a fixed sequence in tests. | Own sequence state; test consumption and preview ordering independently. |
| Game engine | Apply semantic actions and elapsed time; coordinate spawning, locking, clearing, scoring, progression, and terminal state. | Geometry, board operations, piece source, actions, and elapsed time. | Own complete gameplay state; verify deterministic action/time sequences and snapshot isolation. |
| Keyboard adapter | Translate supported keys into semantic actions and manage relevant browser default behavior. | Keyboard events and session/focus state. | Own held-key state if required by the specified repeat policy; verify mappings and listener cleanup. |
| Session controller | Create/reset sessions, schedule frames, forward actions and elapsed time, handle pause/focus lifecycle, and request display updates. | Engine, input adapter, scheduler, lifecycle events, and presentation boundary. | Own scheduling handles and browser timing state; verify one running loop, pause/resume timing, and disposal. |
| Canvas renderer | Draw locked cells, active piece, and next-piece preview from a snapshot. | Snapshot, Canvas contexts, and presentation dimensions. | Own drawing resources only; verify board/preview correspondence and resize behavior in browser checks. |
| Status and controls view | Display score, level, session state, and keyboard instructions; expose session commands. | Snapshot and controller callbacks. | Own DOM elements only; verify displayed state and command routing. |
| Browser entry point | Resolve required page elements, assemble collaborators, start the controller, and report initialization failure. | Browser document and concrete adapters. | Own application lifetime; verify complete initialization and failure visibility. |

## Interfaces and collaboration

The engine exposes a design-level boundary for applying an action, advancing active play time, restarting with a piece source, and obtaining a read-only snapshot. Names and exact TypeScript signatures are provisional until specification and implementation preparation settle the contract.

A snapshot describes board cells, active and preview pieces, score, cleared lines or level information, and session status. It contains enough information for both the renderer and status view without granting access to mutable engine internals.

The controller coordinates all browser interaction. A key event is translated into an action, then forwarded to the engine; a frame supplies elapsed time, then requests display of the resulting snapshot. Session commands such as pause and restart pass through the controller so scheduling and gameplay state remain coherent.

Geometry and board operations supply pure rule operations to the engine. The piece source supplies identities only; it does not place pieces, draw previews, or change scores. Scoring and progression stay in the engine unless their final complexity justifies a focused helper.

## Lifecycle and failure boundaries

Application setup constructs the engine, browser adapters, and views once. Restart resets gameplay and timing without multiplying event subscriptions or animation loops. Disposal cancels scheduling and removes owned listeners.

The engine rejects illegal moves through its specified action result rather than exposing invalid intermediate state. DOM/Canvas initialization failures are handled by application setup. Runtime contracts for invalid elapsed time, exhausted test piece sources, and unsupported browser capabilities must be resolved in specification.

## Specification handoff

[SPEC](SPEC.md) and its focused children define board dimensions, spawn positions, orientation and rotation behavior, piece selection, locking and row clearing, scoring and progression, gravity timing, key mappings/repeat policy, pause/focus behavior, restart, game over, browser support, and measurable acceptance.

Component ownership and dependency direction are accepted design decisions; no component is implemented by this document.
