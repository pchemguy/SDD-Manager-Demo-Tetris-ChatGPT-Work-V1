# Session and presentation contracts

This child owns browser interaction and the cross-component lifecycle. [Gameplay](gameplay.md) owns actions and time advancement.

## S-01 — Start, pause, resume, and restart

Successful initialization creates a running session and presents its initial state before the first gravity interval elapses. Pausing a running session preserves board, active piece, preview, score, level, cleared lines, and gravity remainder. Resuming preserves that state and resets the controller's previous-frame timestamp, so paused duration is not passed to the engine.

Window blur or a hidden document pauses a running session. Focus or visibility restoration never resumes it automatically. An already paused or completed session retains its status. Starting or restarting while the document is hidden or unfocused creates a paused session; resuming while hidden or unfocused is ignored.

Restart works from running, paused, or game over. It creates an empty board, score 0, cleared-line total 0, level 1, orientation-0 active/preview pair from a fresh bag source, and accumulator 0. It clears the controller's time baseline. Input listeners and the application instance are reused without multiplying subscriptions or frame loops. Restart does not promise the same random sequence.

## S-02 — Keyboard and commands

| Key | Action | Repeated keydown |
| --- | --- | --- |
| ArrowLeft / ArrowRight | Attempt one left/right move. | Accepted while running. |
| ArrowDown | Attempt one soft-drop step. | Accepted while running. |
| ArrowUp | Attempt clockwise rotation. | Ignored; one rotation per physical press. |
| P (case-insensitive) | Toggle running/paused. | Ignored. |
| R (case-insensitive) | Restart. | Ignored. |

Arrow repeat frequency follows the browser/operating-system keyboard repeat; there is no custom repeat timer. Movement/rotation input while paused or game over is ignored. Pause is ignored during game over. Commands are processed in event-delivery order; no movement queue is retained across pause or restart. Modified shortcuts using Ctrl, Alt, or Meta and input originating in editable fields are ignored.

Handled game arrow keys prevent page scrolling when gameplay controls have focus, including while paused or game over. The page provides a focusable gameplay region. Clicking the board focuses it, and initialization focuses it after successful setup. Keyboard handling does not intercept keys from other page controls. Visible Pause/Resume and Restart buttons route the same semantic commands and support ordinary keyboard activation.

## S-03 — Timing and disposal

The controller uses browser animation timestamps, passes elapsed active time to the engine, and requests an updated view after gameplay or status changes. It maintains at most one scheduled frame. Pause/blur/hidden-document handling prevents inactive duration from reaching the engine; the first frame after resume establishes a fresh timestamp.

Application disposal cancels its scheduled frame and removes owned keyboard, focus, visibility, and command listeners. Repeated disposal is safe. The disposed instance processes no further input or time. A scheduling or piece-source fault stops further gameplay processing and shows an error through the entry point's failure boundary.

## S-04 — Snapshot boundary

A snapshot provides the locked 10 × 20 cell grid, active piece kind/orientation/origin when present, preview kind, nonnegative integer score, nonnegative cleared-line total, positive level, and running/paused/game-over status. Snapshot cells and active-piece data cannot be used to mutate engine state. Snapshot acquisition itself has no gameplay side effects. The view derives occupied active cells from geometry and does not duplicate gameplay rules.

## S-05 — Presentation

The Canvas board displays locked and active cells at their actual positions. Empty cells remain distinguishable. Seven piece kinds have distinct colors; geometry conveys their shape. The next-piece preview depicts the next kind in orientation 0 without sharing board state. Canvas display scaling must preserve square cells and the full board.

DOM text displays score, level, cleared-line total, status, and keyboard instructions. Pause and game over have visibly distinct messages without hiding the final board or score. The controls provide accessible text labels and visible keyboard focus. Canvas has a text alternative describing its gameplay role; the specification does not require a nonvisual equivalent of real-time board play.

At a desktop viewport of at least 800 × 600 CSS pixels at default zoom, the complete board, preview, status, and controls are visible without overlapping or horizontal scrolling. Smaller viewports may scroll; touch controls are not required. Rendering updates occur on the next available frame after a valid state change, including paused/restart/game-over status changes.

## S-06 — Compatibility and failures

The browser entry point verifies required DOM elements and usable Canvas 2D contexts before starting gameplay scheduling. Missing elements or unavailable contexts result in readable DOM error text, using a fallback element if the designated status element is missing. Initialization failure leaves no active frame loop or gameplay event subscriptions. Browser-native unsupported-JavaScript messaging may use static HTML text.

The application does not transmit gameplay or credentials. A fault from invalid piece-source output, source exhaustion, or session scheduling stops the running loop, retains the last available display, and exposes a readable error with Restart disabled when the fault cannot be recovered safely. Error output contains no secrets or local credential paths. Invalid elapsed-time input remains an engine programmer error with the mutation guarantee in [G-06](gameplay.md#g-06--gravity-and-elapsed-time).

## Session acceptance boundaries

Acceptance [A-01 and A-05 through A-09](../SPEC.md#end-to-end-acceptance) includes startup, held-arrow repeat, one-shot rotation/pause/restart, paused arrow scroll suppression, blur/visibility interruption, explicit resume, restart during pause and game over, snapshot isolation, disposal, and missing-Canvas/DOM initialization. Browser and build checks establish their actual verified compatibility scope rather than implying all desktop browsers were tested.
