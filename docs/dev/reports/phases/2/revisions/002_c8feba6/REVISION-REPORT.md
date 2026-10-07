# Full-interval landing delay steering amendment

## Objective and boundary

The developer clarified on 2026-10-07 that every landing must allow one full gravity interval before locking. Apply the same rule to natural descent, soft drop, hard drop, and legal movement/rotation into a grounded placement. Grounded adjustments, rejected actions, and zero-distance drops do not extend the deadline. Leaving support permits descent; landing again starts a full interval. Pause freezes active time; hold/restart retain their existing reset rules. No new scoring, source, UI, or kick-table behavior is introduced.

Campaign: `002_c8feba6`. Baseline/paused target: `main` at `c8feba6bae939c3bf0134679c6a78c413fe81040`. Working branch: `revision/002_c8feba6-full-interval-lock`; remote: origin in the established GitHub repository. The feature and both phases were complete at this checkpoint; no unfinished task is resumed.

Affected stable owners: G-04/G-06/G-08/G-10, A-02/A-05, FA-02/FA-06/FA-07; T-005/T-010/T-014/T-029/T-036 and their review boundaries. Historical execution evidence and archived feature sources remain intact. Current preparation assessments and completion evidence are reassessed within this amendment; no new executable task IDs or hosted task objects are allocated.

## Preparation assessment

The engine remains sole owner of gameplay timing; the controller supplies elapsed active time, and presentation consumes snapshots. A first manual transition from airborne to grounded clears the gravity remainder; natural gravity landing already occurs at a tick boundary. This uses the existing accumulator, with no second lock timer. Remaining elapsed time within an advance call is actual time after its ticks and must not be discarded. Movement while continuously grounded never resets the accumulator. Current design/SPEC/PLAN/TASKS/layout are directly reconciled; adjacent QC reports retain the initial observations and append this focused recheck.

## Implementation and verification

Pending test-first amendment and relevant engine/session/browser/static-build verification. Completion claims for the amended locking behavior are pending reassessment; unaffected task evidence remains valid.

## Integration and publication

Pending verified amendment push and explicit two-parent merge into established target main. Preserve the revision branch after integration; stop without starting further tasks.

## Findings and TODO

No unresolved scope decision. Product verification is pending. Native desktop focus events and other platforms retain their established evidence limits.
