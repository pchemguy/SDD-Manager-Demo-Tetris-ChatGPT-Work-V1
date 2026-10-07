# Browser Tetris

A classic-style, single-player browser Tetris game developed in TypeScript.

The project is implementing its first playable milestone. The toolchain setup page does not yet provide gameplay.

## Development setup

Use Node 24 and npm. From the repository root, run these commands in Windows CMD or the cloud Linux shell:

```text
npm ci
npx playwright install chromium
npm run dev
```

Open the development-server URL shown in the console. Browser opening is manual; the scripts do not require PowerShell.

```text
npm run typecheck
npm test
npm run test:browser
npm run build
npm run preview
```

Unit tests are added with gameplay tasks; the tooling-only checkpoint has no unit cases. Browser checks use real Chromium. The production build is static content in `dist/`.

The current cloud-sandbox checkpoint passes dependency installation, typechecking, and the setup production build. Chromium installation is blocked: the official download URLs return a `Site Unavailable` HTML page instead of browser archives. The browser smoke check consequently fails at launch. T-001 remains incomplete, and gameplay tasks have not started. Details are recorded in [TASKS](docs/dev/TASKS.md).

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
