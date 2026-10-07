# Repository layout

## Purpose and status

This document assigns physical ownership for the logical components in [DECOMPOSITION](DECOMPOSITION.md) and delivery boundaries in [PLAN](PLAN.md). It defines intended placement; source, test, and build files are not present at this planning checkpoint.

The existing repository contains LICENSE, README, .gitignore, root SDD usage/disclosure records, and development documents. An ignored protected repository-local credential file is an operational input, never a product asset.

## Ownership map

| Location | Owner and purpose | Related checks / consumers |
| --- | --- | --- |
| `index.html` | Browser page structure, gameplay region, board/preview canvases, status/controls, and static fallback text. | Browser initialization, usability, and ordinary-page acceptance. |
| `src/main.ts` | Browser entry point: resolve elements, assemble the engine/controller/views, and handle setup faults. | Integration/browser tests; imports the three application blocks. |
| `src/style.css` | Desktop presentation, square-cell display sizing, page layout, and visible focus. | Browser viewport/visual inspection; loaded by the browser entry point. |
| `src/engine/types.ts` | Engine-domain kinds, coordinates, actions, statuses, and snapshot contracts. | All engine modules and external engine consumers. No browser types. |
| `src/engine/pieces.ts` | Tetromino geometry, orientation, and occupied-cell coordinates. | Engine and renderer; geometry unit tests. |
| `src/engine/board.ts` | Placement, lock-cell updates, and row compaction. | Engine; board unit tests. |
| `src/engine/piece-source.ts` | Production bag source and random-input boundary. | Engine; bag/sequence unit tests. Deterministic test sources belong in test support. |
| `src/engine/game.ts` | Gameplay-state owner and semantic action/time/snapshot boundary. Scoring and progression remain here unless cohesion justifies a documented helper. | Controller; deterministic engine scenario tests. |
| `src/session/keyboard.ts` | Key mapping, repeat/filter rules, focus scope, and default prevention. | Controller; input and real-browser tests. |
| `src/session/controller.ts` | Scheduling, elapsed-time forwarding, pause/restart, interruption lifecycle, fault handling, and disposal. | Entry point; controlled scheduler tests and browser session checks. |
| `src/view/renderer.ts` | Canvas board/preview drawing from snapshots and shared immutable geometry. | Controller; browser rendering correspondence checks. |
| `src/view/status.ts` | DOM status/instructions and labeled command controls. | Controller; browser status/focus/command checks. |
| `tests/unit/engine/` | Geometry, board, piece-source, and game-contract tests, grouped by their owning source responsibility. | Vitest in a non-browser environment. |
| `tests/unit/session/` | Controller/input tests that require only controlled adapters and events. DOM-dependent behavior belongs in browser tests. | Vitest; controlled scheduler/input fixtures. |
| `tests/browser/` | Real Chromium checks for normal page play, rendering, lifecycle, failures, and static production delivery. | Playwright Test; production page and isolated test fixtures. |
| `tests/support/` | Reusable deterministic piece sources, scenario builders, and scheduler/adapter fakes. | Unit/browser tests only; product code does not import this directory. |
| `tests/fixtures/` | Isolated HTML/TypeScript browser harnesses and invalid-initialization fixtures. Assemble controlled collaborators without adding debug interfaces to the production page. | Browser tests through the development test server; excluded from production output. |
| `package.json` and `package-lock.json` | Repository-local package dependencies, exact locked resolution, and developer commands. | npm installation, all checks/builds; both tracked. |
| `tsconfig.json` | Strict product/test typechecking and ES2020-related compilation settings. Focused secondary configs are allowed if needed for environment boundaries. | Typecheck/build; do not conceal unchecked browser or configuration code. |
| `vite.config.ts` | Development/static-build configuration, including explicit production target and production entry selection. | Development server, build, and preview. |
| `vitest.config.ts` | Unit-test discovery and execution without browser dependencies. | Unit suite; excludes browser tests from discovery. |
| `playwright.config.ts` | Chromium checks and development/production server orchestration. | Browser suite; includes browser prerequisites without assuming installed binaries. |
| `README.md` | Project introduction, current product status, setup/run/build/check commands, and document navigation. | Developer reproduction and delivery acceptance. |
| `docs/USER-GUIDE.md` | Player controls, rules overview, pause/restart/game over, and browser expectations. | Delivery documentation checks; links canonical detailed rules instead of duplicating contracts. |
| `docs/dev/` | PROJECT, ARCHITECTURE, DECOMPOSITION, SPEC and children/review, PLAN and review, layout, and the owning TASKS/review when created. | SDD authoring, implementation, and conformance checks. |
| `docs/dev/reports/phases/1/` | Milestone reports named by stable milestone ID, and PHASE-REPORT.md. | Review tasks and phase integration gates. |
| `docs/dev/reports/IMPLEMENTATION-REPORT.md` | Final completed-project evidence and aggregated permitted TODOs. | Final phase review and delivery status. |
| Root `LICENSE`, `AI_DISCLOSURE.md`, `SDD-MANAGER.md` | License and truthful development attribution. | Product/development documentation and first-adoption evidence. |
| `.gitignore` | Generated/local-file exclusion; retain credential exclusion and final `.obsidian`/`.trash` lines. | Git publication and shipped-artifact checks. |

## Dependency and placement rules

- Engine files depend only on engine-domain code and supplied collaborators. They do not import session, view, main, tests, or browser APIs.
- Session code consumes the engine boundary and injected presentation/scheduling collaborators. View code consumes snapshots and immutable geometry; it owns no gameplay state.
- The entry point assembles concrete browser collaborators. Product code has no import from tests; test-only setup cannot be reachable through the production module graph.
- Unit tests mirror logical ownership sufficiently to make focused checks discoverable; avoid one test per private function or duplicate independent suites for the same contract.
- Shared test helpers stay in tests/support. Browser fixtures stay outside product sources, even when they instantiate the real engine, controller, and views.
- TASKS chooses concrete edit scopes from these ownership locations. Add a helper or focused configuration only when the responsibility requires it; update this document for a material ownership change.

## Generated and operational locations

`node_modules/`, `dist/`, coverage, browser reports/results, tool caches, and local logs are generated and ignored. The production build writes `dist/`; it is verified under static HTTP rather than committed as source. Fixtures, credentials, and operational scripts do not belong in that output.

`gh.tkn` remains beside the root .gitignore, protected and ignored by `*.tkn`. It is consumed through a repository-scoped credential mechanism for authorized publication. No token value, helper-specific local path, or secret is written into product code or documentation.

Browser screenshots/traces used during a check initially belong in ignored test output. When durable evidence is required for a review report, retain only selected sanitized evidence under the owning report directory and link it from that report. No automatic retention of every generated image is required.

No plugin installation snapshot, dependency bundle, GitHub Actions workflow, hosted-site configuration, or release archive is required by the accepted project scope. Their absence does not block the planned local/static delivery.
