/** Present snapshot status and progression; command controls arrive next milestone. */
import type { Snapshot } from '../engine/types';
export interface Counters {score:HTMLElement;level:HTMLElement;lines:HTMLElement}
export function showStatus(element:HTMLElement,snapshot:Snapshot,counters?:Counters):void {
 if(counters)for(const key of ['score','level','lines'] as const)counters[key].textContent=String(snapshot[key]);
 element.textContent=snapshot.status==='game-over'?'Game over':snapshot.status==='paused'?'Paused':'Running';
}
