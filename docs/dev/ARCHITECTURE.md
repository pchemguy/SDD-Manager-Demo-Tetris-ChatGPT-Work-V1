# Architecture

## System overview

The [project brief](PROJECT.md) establishes a desktop, single-player browser game. The application has three major blocks: game engine, session controller, and presentation. It requires no application server or network calls during play.

## Blocks and dependency direction

| Block | Responsibility | Dependencies |
| --- | --- | --- |
| Game engine | Own gameplay state and apply game actions and elapsed-time updates. | TypeScript data structures and an injected piece source; no browser APIs. |
| Session controller | Translate input and browser timing into engine actions; coordinate the session lifecycle. | Engine contract and browser input, timing, and lifecycle APIs. |
| Presentation | Draw the board and preview; display score, level, controls, and session status. | Read-only engine snapshots, Canvas, and DOM APIs. |

The browser entry point assembles these blocks. The engine does not depend on the controller or presentation. The controller supplies snapshots to presentation after meaningful state changes. Presentation does not mutate gameplay state.

## State and data flow

The engine owns the board, active piece, preview piece, score, progression, gravity accumulator, and gameplay status. The controller owns browser scheduling handles, input/focus state, and the previous frame timestamp. Presentation owns only drawing resources and display elements.

Keyboard events become semantic game actions. Browser frames provide elapsed time to the engine. The engine validates actions, advances gameplay, and provides a snapshot for display. Pausing suspends active play time; browser lifecycle handling prevents background inactivity from producing a burst of accumulated movement.

## Design choices

Plain TypeScript keeps gameplay independent of a UI framework or game framework. Canvas provides direct grid rendering, while DOM elements expose controls and textual status. DOM/CSS rendering is a viable alternative, but the accepted design uses Canvas to keep board drawing in one owner.

Explicit elapsed-time and piece-source inputs provide deterministic test seams. They avoid tests that depend on real browser frame timing or uncontrolled randomness. No generalized plugin system, event bus, dependency-injection framework, or backend is required by the accepted scope.

## Architectural invariants

- The engine is usable in a non-browser test process.
- One engine instance owns one gameplay session's state.
- Consumers cannot mutate engine state through a presentation snapshot.
- Rendering cadence does not define gameplay rules; the engine consumes explicit elapsed time.
- Browser event subscriptions and scheduling have an explicit owner and disposal lifecycle.
- Failed initialization produces a visible failure state rather than a partially active session.

Exact timing, pause, focus-loss, rotation, scoring, and game-over contracts belong to specification. This document establishes their ownership rather than selecting their values.

## Verification and navigation

Engine tests exercise rules using supplied actions, time, and pieces. Controller tests exercise scheduling and input boundaries with controlled browser adapters. Browser checks exercise real keyboard interaction, rendering, and lifecycle behavior together.

[Decomposition](DECOMPOSITION.md) defines the logical components within these blocks. Physical source and test locations belong to layout planning. This architecture describes the intended system; product implementation has not begun.
