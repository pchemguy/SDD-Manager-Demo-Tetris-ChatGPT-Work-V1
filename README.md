# Browser Tetris

A classic-style, single-player browser Tetris game developed in TypeScript.

Milestone 1.2 provides falling blocks, arrow-key movement/clockwise rotation/soft drop, next-tick locking, row clearing, shuffled bags, game over, score/line/level counters, increasing gravity speed, and an orientation-zero next-piece preview. Focus the game to use the arrow keys; reload to begin again. Pause/restart, interruption handling, and full failure handling are planned in later milestones.

## Development setup

Use Node 24 and npm. From the repository root, run these commands in Windows CMD or the cloud Linux shell:

```text
npm ci
npm run dev
```

Open the development-server URL shown in the console. Browser opening is manual; the scripts do not require PowerShell. On Windows, install the test browser with `npx playwright install chromium`. Linux x64 sandbox tests use the pinned `@sparticuz/chromium` package installed by npm, extracted to an ignored cache with local font configuration. The browser runs with multiple processes so successive Playwright contexts work. This route works where the standard Playwright browser CDN is unavailable; it does not change the production application.

```text
npm run typecheck
npm test
npm run test:browser
npm run build
npm run preview
```

Unit tests cover the browser-independent engine. Browser checks use real Chromium. The production build is static content in `dist/`.

The cloud toolchain passes locked installation, strict checking, production build, and a real Chromium smoke test. Linux browser tests currently use Chromium 153.0.8010.0 with Playwright Test 1.63.0. Other operating systems use the standard Playwright installation and have not been verified here.

## Development documents

- [Project brief](docs/dev/PROJECT.md)
- [Architecture](docs/dev/ARCHITECTURE.md)
- [Component decomposition](docs/dev/DECOMPOSITION.md)
- [Specification](docs/dev/SPEC.md)
- [Specification review](docs/dev/SPEC-REVIEW-REPORT.md)
- [Delivery plan](docs/dev/PLAN.md)
- [Repository layout](docs/dev/layout.md)
- [Plan review](docs/dev/PLAN-REVIEW-REPORT.md)
- [Implementation tasks](docs/dev/TASKS.md)
- [Task-list review](docs/dev/TASKS-REVIEW-REPORT.md)
- [Milestone 1.1 review](docs/dev/reports/phases/1/1.1.md)
- [Milestone 1.2 review](docs/dev/reports/phases/1/1.2.md)

Development uses [SDD Manager](SDD-MANAGER.md). See the [AI-assisted development disclosure](AI_DISCLOSURE.md).
