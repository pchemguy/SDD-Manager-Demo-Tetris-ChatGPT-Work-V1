# Browser Tetris

A classic-style, single-player browser Tetris game developed in TypeScript.

The project is implementing its first playable milestone. The toolchain setup page does not yet provide gameplay.

## Development setup

Use Node 24 and npm. From the repository root, run these commands in Windows CMD or the cloud Linux shell:

```text
npm ci
npm run dev
```

Open the development-server URL shown in the console. Browser opening is manual; the scripts do not require PowerShell. On Windows, install the test browser with `npx playwright install chromium`. Linux tests automatically use the pinned `@sparticuz/chromium` package installed by npm, extracted to an ignored cache. This route works where the standard Playwright browser CDN is unavailable; it does not change the production application.

```text
npm run typecheck
npm test
npm run test:browser
npm run build
npm run preview
```

Unit tests are added with gameplay tasks; the tooling-only checkpoint has no unit cases. Browser checks use real Chromium. The production build is static content in `dist/`.

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

Development uses [SDD Manager](SDD-MANAGER.md). See the [AI-assisted development disclosure](AI_DISCLOSURE.md).
