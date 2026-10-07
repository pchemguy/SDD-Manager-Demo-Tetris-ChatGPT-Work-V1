# Browser Tetris specification

## Purpose and scope

The application provides a classic-style, single-player Tetris game in a desktop browser. Players move and rotate falling tetrominoes, clear rows, gain points, and face increasing gravity speed. The game provides a next-piece preview, pause, restart, and a visible game-over state.

The accepted structure is plain TypeScript with Canvas board rendering, a browser-independent engine, a session controller, and presentation consuming snapshots. See [PROJECT](PROJECT.md), [ARCHITECTURE](ARCHITECTURE.md), and [DECOMPOSITION](DECOMPOSITION.md) for intent and ownership.

Mobile touch controls, multiplayer, accounts, online leaderboards, ghost pieces, hold, hard drop, wall kicks, audio, saved games, and exact emulation of a commercial edition are outside this specification. Runtime play requires no application server or external service. Refreshing the page starts a fresh session; no persistence is required.

## Contract ownership

| Owner | Detailed contract | Participating components |
| --- | --- | --- |
| [Gameplay](spec/gameplay.md) | Board, geometry, spawning, bag, actions, gravity, locking, clearing, scoring, progression, and game over. | Geometry, board operations, piece source, engine. |
| [Session and presentation](spec/session.md) | Keyboard mappings, lifecycle, pause/focus, restart, snapshots, rendering, compatibility, and errors. | Engine, keyboard adapter, controller, renderer, status view, entry point. |

These children own detailed rules. This root owns system-wide guarantees and end-to-end acceptance. PLAN selects delivery order and verification commands; neither is a gameplay contract.

## System-wide guarantees

- **SYS-01 — Separation:** The engine accepts semantic actions, explicit elapsed active time, and a supplied piece source without importing DOM, Canvas, or browser scheduling APIs. Engine state has one owner; snapshots do not expose mutable internal state.
- **SYS-02 — Determinism:** Identical valid piece sequences, initial state, actions, and elapsed-time calls produce identical gameplay snapshots. Production randomness is supplied at the piece-source boundary.
- **SYS-03 — State:** Public session status is running, paused, or game over. Initialization/runtime failures are visibly reported by the browser application and stop its gameplay scheduling; they are not presented as game over.
- **SYS-04 — Lifecycle:** Pause and browser focus loss freeze gameplay without spending inactive time. Restart replaces gameplay state and clears timing state. One application instance owns at most one frame loop and one subscription to each required event.
- **SYS-05 — Interface:** The board, active piece, preview, score, level, cleared-line total, controls, and session status are visible together. Commands cannot leave the rendered view permanently inconsistent with engine state.
- **SYS-06 — Compatibility:** The target is desktop browsers with ES2020, Canvas 2D, keyboard events, and requestAnimationFrame. Acceptance must demonstrate real play in an available desktop Chromium browser. Other supported-capability browsers are intended targets without a cross-browser verification claim until checked.
- **SYS-07 — Delivery:** The repository documents reproducible development, verification, and production-build commands. The built application is static browser content and must work under a static HTTP server. Build tooling and deployment hosting are planning concerns.

## End-to-end acceptance

| ID | Required observable outcome |
| --- | --- |
| A-01 | Opening the application displays an empty 10 × 20 board with an active piece, one preview, score 0, level 1, cleared-line total 0, and usable keyboard instructions. |
| A-02 | A controlled piece sequence supports movement, rotation, gravity, collision, and the specified next-gravity-tick locking rule; rejected actions preserve legal state. |
| A-03 | Controlled one-, two-, three-, and four-row clears compact the board correctly and award the specified score. Crossing a ten-line boundary changes level and gravity speed correctly. |
| A-04 | The preview matches the subsequent active piece. Every generated seven-piece bag contains each kind once; tests supply deterministic sequences without a browser. |
| A-05 | Pause, resume, blur/hidden-tab pause, and restart preserve the specified state/timing behavior. Repeated restarts do not duplicate frame loops or input effects. |
| A-06 | A blocked spawn displays game over; movement and time cannot advance the completed game. Restart creates a playable fresh session. |
| A-07 | A real browser session verifies visible board/preview correspondence, keyboard behavior, status updates, focus interruption, restart, and absence of gameplay scrolling. |
| A-08 | Invalid elapsed-time input is rejected without state mutation; snapshots cannot mutate the engine; initialization failures are visible and leave no active gameplay loop. |
| A-09 | Documented commands produce a type-checked production build and run the selected checks. Static HTTP serving permits play without runtime service dependencies. |

Readiness for planning is assessed in [SPEC-REVIEW-REPORT](SPEC-REVIEW-REPORT.md). Specification readiness is distinct from implemented or verified product behavior.
