# Archived feature source

Historical/non-executable feature preparation. Current main PROJECT/design/SPEC/PLAN/layout and [TASKS](../../TASKS.md) own the project. This archived source and its adjacent review are retained for provenance; original review hashes identify their published preparation checkpoints, before execution/navigation updates.

# Piece-control feature physical layout

This scoped ownership delta supplements [layout](../../layout.md) for [Feature plan](FEATURE-PLAN.md) and [Feature decomposition](FEATURE_DECOMPOSITION.md). Main layout remains the owner of unaffected repository-wide locations. Incorporate these accepted placements into main layout during feature integration; this document does not claim that proposed files exist.

| Location | Intended feature ownership and consumers |
| --- | --- |
| `src/engine/types.ts` | Extended semantic actions and detached snapshot data; engine, controller and view consumers. |
| `src/engine/board.ts` | Shared landing calculation using existing placement checks; engine ghost/drop and direct rule tests. |
| `src/engine/kicks.ts` (proposed) | Immutable clockwise offset tables and ordered placement selection; engine rotation. Depends on domain geometry/placement only. |
| `src/engine/pieces.ts` | Existing rotation/occupied-cell/spawn geometry; reused by kicks, landing and all miniature views. |
| `src/engine/game.ts` | Hold state/entitlement, source promotion, drop action, kicked rotation, snapshot derivation and restart/terminal updates. |
| `src/session/keyboard.ts` | C/Space mapping and repeat/default prevention within existing focus rules. |
| `src/session/controller.ts` | Forward added semantic actions; retain existing scheduler/lifecycle/fault ownership. |
| `src/view/renderer.ts` | Board ghost layer, held preview and stale-slot clearing alongside next preview. |
| `src/view/status.ts`, `index.html`, `src/style.css`, `src/main.ts` | Hold availability/instructions, labeled held resources, desktop layout and startup validation/assembly. |
| `tests/unit/engine/` | Landing/drop/hold/kick/source/timing/snapshot checks beside existing engine contract suites. Dedicated focused suites are permitted for independent responsibilities. |
| `tests/unit/session/`, `tests/browser/` | Input/controller checks and real rendering, held/ghost correspondence, failure/lifecycle, viewport and static production acceptance. |
| `tests/support/`, `tests/fixtures/` | Deterministic feature scenarios and isolated rendering/failure resources, including snapshot-consumer updates. Never reachable from the production entry. |
| `README.md`, `docs/USER-GUIDE.md` | Developer navigation and player controls/rules, especially delayed Space locking and hold eligibility. |
| `docs/dev/FEATURE-PLAN.md`, `docs/dev/FEATURE-layout.md`, adjacent planning review | Active feature delivery and physical ownership; package README links these roots. |
| `docs/dev/FEATURE-TASKS.md` and adjacent task review (proposed) | Sole executable feature owner before explicit task reconciliation; stable IDs allocated by task derivation. |
| `docs/dev/features/001_a043a43/` | Stable package context, implementation milestone reports `2.1.md`–`2.4.md`, `PHASE-REPORT.md`, final `IMPLEMENTATION-REPORT.md`, selected sanitized evidence and eligible archived sources/reviews. |

All existing dependency rules apply. No new product dependencies or additional production entry is planned. Generated build/browser output stays ignored; selected sanitized evidence is retained only under the feature prefix. Credential file and helper mechanisms remain operational inputs, never artifacts.

The proposed kick module isolates data and selection from session state. Landing stays with board legality to share the collision predicate. Rendering can share a focused miniature-drawing helper if necessary without creating a second gameplay rule owner. Source/test path refinements require a focused layout update when they materially change ownership; avoid unrelated restructuring or naming migrations.
