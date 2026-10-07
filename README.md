# Browser Tetris

A classic-style, single-player TypeScript game with Canvas rendering, shuffled seven-piece bags, a next-piece preview, score and level progression, pause/resume, restart and game over. It runs entirely in the browser without a gameplay server or saved state.

Session controls, desktop presentation and failure boundaries are reviewed through milestone 1.4. Locked installation, strict checking, 85 unit checks and 44 Chromium checks pass, including production static play. Shipped-output/network inspection also passes; final delivery review remains in progress. [Player guide](docs/USER-GUIDE.md) explains controls, scoring and the resting-piece locking rule.

## Install and play locally

Prerequisites: Node.js 24 with npm, and a desktop browser supporting ES2020, Canvas 2D, keyboard events and animation frames. Use these commands from the repository root in Windows CMD or the cloud Linux shell:

```text
npm ci
npm run dev
```

Open <http://127.0.0.1:5173> manually. The scripts bind to loopback and do not launch a browser or require PowerShell. Click the board to focus gameplay; use the arrows, P and R, or the visible Pause/Resume and Restart buttons. The full interface fits 800 × 600 at default zoom; smaller screens may scroll. Touch controls are outside scope.

## Check and build

```text
npm run typecheck
npm test
npm run build
npm run test:browser
```

`npm test` runs the browser-independent engine/controller tests once. Browser tests build production output and start both the development server (5173) and static preview server (4173), then run Chromium through Playwright against fixtures and the ordinary development/production pages. Both ports must be available. On Windows or other non-Linux-x64 systems, first run:

```text
npx playwright install chromium
```

Linux x64 tests use pinned npm-packaged Chromium, extracted into an ignored cache with fonts configured locally. This verified sandbox route avoids a blocked browser CDN; it is test tooling, not a production dependency. Other platforms use normal Playwright installation and have not been checked here.

The current verified environment is Linux x64, Node 24.19.0/npm 11.9.0, Chromium 153.0.8010.0 and Playwright 1.63.0. Native desktop tab switching is unverified: headless shell reports pages as focused/visible. Tests use controlled browser lifecycle properties/events and independent scheduler tests for interruption behavior. Other browsers and Windows remain intended targets without a verification claim.

## Serve the static build

After `npm run build`:

```text
npm run preview -- --port 4173 --strictPort
```

Open <http://127.0.0.1:4173>. `dist/` is the production output; serve that directory over static HTTP rather than opening its HTML as a local file. Assets use root-relative URLs, so deploy at an HTTP site's root. Dependency installation needs network access; runtime play needs no external service. Automated production-play checks pass, including keyboard/Canvas/status, pause/resume, game over and restart. Output inspection confirms only HTML/CSS/JavaScript application assets are shipped, and production play requests only same-origin static files without sockets or external gameplay services.

## Development and evidence

The engine owns rules and detached snapshots, the controller owns input/time/lifecycle, and the views consume snapshots. Production imports no test fixtures or debug interfaces. The repository uses [SDD Manager](SDD-MANAGER.md); [AI_DISCLOSURE.md](AI_DISCLOSURE.md) describes AI assistance. License: [MIT](LICENSE).

- [Project brief](docs/dev/PROJECT.md), [architecture](docs/dev/ARCHITECTURE.md), [decomposition](docs/dev/DECOMPOSITION.md)
- [Specification](docs/dev/SPEC.md) and [review](docs/dev/SPEC-REVIEW-REPORT.md)
- [Delivery plan](docs/dev/PLAN.md), [layout](docs/dev/layout.md) and [plan review](docs/dev/PLAN-REVIEW-REPORT.md)
- [Tasks and execution evidence](docs/dev/TASKS.md), [task-list review](docs/dev/TASKS-REVIEW-REPORT.md)
- Milestone reviews: [1.1](docs/dev/reports/phases/1/1.1.md), [1.2](docs/dev/reports/phases/1/1.2.md), [1.3](docs/dev/reports/phases/1/1.3.md), [1.4](docs/dev/reports/phases/1/1.4.md)
- [SDD Manager findings and proposed amendments](SDD-MANAGER-FINDINGS.md)
- [GitHub task issues](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/issues) and [milestones](https://github.com/pchemguy/SDD-Manager-Demo-Tetris-ChatGPT-Work/milestones)
