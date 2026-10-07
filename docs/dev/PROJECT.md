# Project brief

## Purpose and users

Develop a classic-style, single-player Tetris game for desktop browser users. The project demonstrates practical greenfield development with SDD Manager in ChatGPT Work web using the standard cloud computer sandbox.

Success means a playable game whose rules can be checked independently of the browser interface, supported by traceable design, specification, delivery planning, implementation, verification, and Git checkpoints.

## Accepted scope

- TypeScript browser application with desktop keyboard controls.
- Falling pieces, rotation, collision, line clearing, scoring, increasing speed, and game over.
- Next-piece preview, pause, and restart.
- Plain TypeScript and Canvas rendering.
- A game engine separated from the session controller and presentation.

## Non-goals

Mobile touch controls, multiplayer, accounts, server-side gameplay, online leaderboards, ghost pieces, hold, hard drop, wall kicks, and exact reproduction of a particular commercial edition are outside the initial scope. The game uses its own visual presentation.

## Development context

- Repository: <https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work>.
- License: MIT, as established by the repository's LICENSE.
- SDD Manager available at adoption: 0.14.9.
- User-reported model setting: Sol 6.1, Medium reasoning, lowest Pro tier.
- User-reported working interface: ChatGPT Work web with its standard cloud computer sandbox.

These context statements identify the demonstration setup; they do not establish compatibility or performance measurements.

## Constraints and decision state

The application runs entirely in the browser. Game rules must be testable without a DOM, Canvas, or real-time clock. Repository checkpoints use Git. Product dependencies and build tooling are not yet selected.

Exact gameplay rules, keyboard mappings, supported browser baseline, and build/test tooling remain to be settled during specification and planning. The architecture and component boundaries are accepted; these behavioral details must not be inferred from the word "classic."

## Vocabulary

- **Tetromino:** a piece made of four connected cells.
- **Board:** the grid of locked cells and the space in which the active piece moves.
- **Active piece:** the falling tetromino controlled by the player.
- **Lock:** transfer the active piece's cells to the board.
- **Gravity:** automatic downward movement governed by elapsed active play time.

## Navigation

[Architecture](ARCHITECTURE.md) defines the major blocks and their relationships. [Decomposition](DECOMPOSITION.md) defines logical components and verification seams. Behavioral requirements belong to the specification stage.
