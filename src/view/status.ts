/** Baseline textual session feedback; progression and command controls arrive later. */
import type { Snapshot } from '../engine/types';
export function showStatus(element:HTMLElement,snapshot:Snapshot):void {
 element.textContent=snapshot.status==='game-over'?'Game over':snapshot.status==='paused'?'Paused':'Running';
}
