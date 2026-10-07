# Playing Browser Tetris

Open the locally served game in a desktop browser. A new session starts with an empty 10-column, 20-row board, an active piece, the next-piece preview, score 0 and level 1. Click the board to focus gameplay. The highlighted outline shows keyboard focus.

## Controls

| Input | Result |
| --- | --- |
| Left / Right | Move one cell; holding the key uses your browser's normal repeat. |
| Down | Soft drop one cell; holding repeats. A blocked drop does not lock. |
| Space | Move to the ghost position once per press; landing gives a full gravity interval before locking. |
| Up | Rotate clockwise once per press; ordered wall and floor kicks try the first legal placement. |
| C | Hold or swap once per lock cycle; incoming piece starts at its normal spawn. |
| P | Pause or resume once per press. |
| R | Start a fresh game once per press. |
| Pause / Resume button | The same pause/resume command; Tab then Enter or Space activates it. |
| Restart button | Start a fresh game from running, paused or game over. |

Keys outside the gameplay region, editable fields, and Ctrl/Alt/Meta shortcuts are ignored. Handled arrows and Space prevent page scrolling even during pause or game over. Up/Space/C/P/R repeat events are ignored. The O piece does not change shape when rotated.

## Falling, locking and scoring

Gravity begins at one step per second and accelerates every ten cleared lines. A piece that first reaches the floor or stack gets a full gravity interval to adjust before locking (one second at level 1). Moves and rotations that keep it grounded do not extend that delay; moving off a ledge permits descent, and landing again starts a fresh interval. A ghost outline shows the lowest downward-reachable position; solid active cells cover it when grounded. Hard drop moves to the ghost and grants the same full interval before locking. Pressing Space again while grounded does not extend it. A successful hold starts a fresh gravity interval; the next legal lock restores hold availability. Clockwise rotation uses ordered SRS wall/floor kicks and the same first-landing timing rule; every occupied cell must remain within the visible board. There is no movement queue.

Complete rows clear together and remaining rows fall in their original order. One, two, three or four cleared rows award 100, 300, 500 or 800 points respectively, multiplied by the level before that clear. Dropping earns no extra points. Level starts at 1 and rises after every ten cleared lines. Gravity reaches a minimum interval of 100 ms.

The Next preview shows the piece promoted after a lock. The Hold panel stores a kind, independently of Next. An empty hold stores the outgoing piece and promotes Next, drawing one successor preview. A populated swap consumes no new source piece and leaves Next unchanged. The incoming held piece always starts unrotated at its normal spawn. Hold becomes available after a legal lock; Space alone does not restore it. Every shuffled bag contains the seven kinds exactly once; adjacent bags can repeat a kind at their boundary.

## Pause, interruption and game over

Pause freezes the board, counters and remaining gravity time. Losing window focus or hiding the tab pauses running play. Returning to it leaves the game paused; explicitly choose Resume or press P. Resume is ignored while the document is hidden or unfocused. Starting/restarting in that state produces a paused session.

If a promoted or held incoming piece cannot spawn, Game over appears and the final board/counters remain visible. Arrows and Pause have no effect. Restart clears the board, held slot, counters and timing and creates a fresh random bag; it need not produce the same sequence. Reloading the page also starts fresh, and no progress is saved.

An initialization or internal fault shows an error instead of game over. Processing stops, and unsafe recovery controls are disabled. Reload the page to try a new application instance. Error messages do not reveal internal exception details.

## Browser and display scope

The desktop interface fits 800 × 600 CSS pixels or larger at default zoom. Smaller viewports may scroll. Canvas labels describe the board/preview role; a nonvisual equivalent of real-time play and touch controls are outside scope. Runtime play has no external gameplay-service dependency.

Available Linux headless Chromium is verified for the game and browser adapters. Native desktop tab switching, Windows and other browsers have not been verified; controlled lifecycle events test the interruption handlers. See [setup and checks](../README.md), [exact gameplay contracts](dev/spec/gameplay.md) and [session contracts](dev/spec/session.md).
