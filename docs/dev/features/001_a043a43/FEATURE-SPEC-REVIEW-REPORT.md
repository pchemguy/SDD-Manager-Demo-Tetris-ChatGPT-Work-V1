# Archived feature source

Historical/non-executable feature preparation. Current main PROJECT/design/SPEC/PLAN/layout and [TASKS](../../TASKS.md) own the project. This archived source and its adjacent review are retained for provenance; original review hashes identify their published preparation checkpoints, before execution/navigation updates.

# Piece-control feature specification review

## Current gate and scope

**State: Ready for feature planning on specification/design conformance.** No confirmed unresolved finding remains. Written-specification review by the developer is the next checkpoint. No code, delivery plan, task list or feature hosted objects have been created.

Reviewed on 2026-10-07 using SDD Manager 0.14.9. Reviewer: the main agent; no independent reviewer was used. Baseline `a043a43252c8fdf1307a33d34ce244e8c7280161`, working branch `feature/001_a043a43-piece-controls`, target `main`. Review scope is [FEATURE-SPEC](FEATURE-SPEC.md) against main project/design/specification and the active [architecture](FEATURE_ARCHITECTURE.md)/[decomposition](FEATURE_DECOMPOSITION.md). The user accepted defaults with hard drop subject to scheduled gravity locking.

## Exact inspected document identities

SHA-256 identifies pending documents independently of the report's eventual commit.

| Document under docs/dev | SHA-256 |
| --- | --- |
| PROJECT.md | `0e361f7207334525378e10b9871ef07aca4569243e83a4ef387d6f7f67058618` |
| ARCHITECTURE.md | `a7051007efacd98dc6e26b9f343bda88ad6f23a82eaafa28022bb8bd2db08413` |
| DECOMPOSITION.md | `dec8bb07534ade6847fbcf519ea9c7541f4c035beb8fd369bf446540557475d9` |
| SPEC.md | `b4eb3c1e7d7d28eaab3ba158093c5a1df9ea96e1ddc2b1a2f574b1471a67546a` |
| spec/gameplay.md | `3512776f06ccdd1ffe4f929727e3f4be606081bfe698bf6b57fcac22a31c39a9` |
| spec/session.md | `4b520da25070ebaf70fc8e169431417804510c8e8a362efd929b854b6c146951` |
| FEATURE_ARCHITECTURE.md | `e880f8145c3db478a2713509bd689cef77d29648d77afc291e9b2d65366bccbb` |
| FEATURE_DECOMPOSITION.md | `4fc96f70c1a4b8829325384e6a1cff88ddad0cfc3169f12e133e983c07b5c597` |
| FEATURE-SPEC.md | `413a5cafb603feb9667ce7669e236455d1474ac737a6400c137bf3411054364f` |

## Conformance assessment

| Concern | Assessment / coverage |
| --- | --- |
| Accepted outcome and scope | All four mechanics have canonical contracts F-01–F-05; no counterclockwise input, bonus or lock timer is added. |
| Main conflicts | The delta explicitly identifies exclusions and G/S/SYS/A contracts affected; main documents remain authoritative for unaffected scope until incorporation. |
| Engine and view ownership | Landing is shared by ghost/drop in rule operations; snapshots supply results; renderer owns drawing only. Hold and source order have one state owner. |
| Lock/time interaction | F-02 retains next scheduled blocked tick, including residual-time edge and post-drop movement/kick. F-03 alone resets accumulation on successful hold. |
| Hold/source/error behavior | Empty/populated slots, repeated unavailability, orientation reset, blocked spawn, validated source failure, pause and restart are distinguished. |
| Kick data and geometry | All eight clockwise table rows match the inspected primary source after y sign inversion. Offsets apply independently to the original origin, with first-legal selection and complete rejection. Existing geometry/board bounds fit this scoped adaptation. |
| Input and snapshots | C/Space are one-shot and focus-scoped; Space scroll suppression covers repeat/inactive states. Added snapshot values are detached and acquisition remains pure. |
| Presentation/lifecycle | Ghost overlap, held/preview distinction, 800 × 600 layout, added-resource validation, fault/disposal and restart cleanup have assessable outcomes. |
| Acceptance and compatibility | FA-01–FA-07 cover pure rules, cross-component sequences, real browser display/input, static delivery and regressions. Native focus and other-platform limits cannot be reported as passes without evidence. |

Inspected relevant engine state/action/tick/source code, snapshot types, keyboard adapter, controller, renderer and entry point to establish the implementation baseline. Those observations did not replace accepted requirements. Main architecture's dependency direction and component ownership are sufficient; overlays define added data and collaboration without requiring unrelated restructuring.

## Findings and checks

No confirmed unresolved design/specification issue was found. The accepted delay correction is directly specified, rather than described as an immediate-lock exception. Provisional exploration order is not represented as an accepted delivery plan in this specification.

Checks performed: existing local links resolved; all eight clockwise offset rows checked against section 2 tables 2–3 of the linked research source with upward-to-downward y conversion; feature scope and canonical ownership reviewed; whitespace and secret exclusion checked for the final staged files. Final file-link and staged-content results accompany the publication operation.

This is document QC, not runtime acceptance. No product tests were rerun for unchanged product code, no RED history is claimed, and no browser capability or implementation completion follows from this review. PLAN/layout review and TASKS review remain required before their dependent stages. Existing GitHub tracking will apply to the reviewed executable feature scope before its first task; this preparation creates no guessed issues or milestones.
