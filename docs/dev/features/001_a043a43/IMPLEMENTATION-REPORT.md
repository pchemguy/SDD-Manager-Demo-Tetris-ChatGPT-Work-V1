# Piece-control implementation report

## Delivered behavior

The browser game provides ghost landing outlines, C hold/swap once per lock cycle, Space hard drop, and clockwise wall/floor kicks. Hard drop only lands: it preserves the gravity remainder and locks only on the next scheduled tick if descent is blocked. Movement/kicks can free descent before that tick. Successful hold resets gravity and normalizes incoming spawn/orientation; empty holds consume one successor preview, populated swaps consume none. Existing scoring, bag, pause/restart, terminal and fault behavior is preserved.

Next and Hold are distinct labeled orientation-zero panels; hold availability and all controls fit 800×600, with safe missing/wrong-type/context startup failures. The engine stays browser-independent, snapshots detached, and runtime static without an external gameplay service.

## Evidence and governing state

Full T-027–T-042 implementation was authorized on 2026-10-07. Campaign baseline `a043a43252c8fdf1307a33d34ce244e8c7280161`; working branch `feature/001_a043a43-piece-controls`, target `main`. [Phase review](PHASE-REPORT.md), [complete acceptance](ACCEPTANCE.md) and milestone reports [2.1](2.1.md)/[2.2](2.2.md)/[2.3](2.3.md)/[2.4](2.4.md) retain review, RED/repair, actual check and selected visual evidence.

Strict checking, 278 unit and 66 real Chromium checks, locked installation, fresh-cache browser/font provisioning, build/static play and shipped/network independence pass. Verified environment: Linux x64, Node 24.19.0/npm 11.9.0, Playwright 1.63.0, Chromium 153.0.8010.0. Current canonical PROJECT/design/SPEC/PLAN/layout and sole main TASKS are reconciled; preparation/reviews are archived here and original task/hosted identities preserved.

Final Git publication uses verified identical Git data objects and fast-forward-only refs after normal push server errors; API and Git readback establish actual remote publication. Final main integration is pending below, separate from a passing feature branch.

## Final integration observation

Pending main merge/check/publish/readback; phase completion is not yet asserted. This section is replaced with actual merge parents and observed target publication after integration.

## TODO and limits

Aggregate permitted product TODO: None. Native desktop focus/visibility delivery, Windows and other browsers remain unverified. Main-agent review was not independent review. SDD Manager findings remain separate amendment proposals; no plugin change, CI, hosted deployment or release archive was included.
