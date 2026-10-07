/** Present snapshot counters/status and native session-command controls. */
import type { Snapshot } from '../engine/types';
export interface Controls {pause:HTMLButtonElement;restart:HTMLButtonElement}
export interface Counters {score:HTMLElement;level:HTMLElement;lines:HTMLElement}
export function showStatus(element:HTMLElement,snapshot:Snapshot,counters?:Counters,controls?:Controls):void {
 if(counters)for(const key of ['score','level','lines'] as const)counters[key].textContent=String(snapshot[key]);
 if(controls){controls.pause.textContent=snapshot.status==='paused'?'Resume':'Pause';controls.pause.disabled=snapshot.status==='game-over';}
 element.textContent=snapshot.status==='game-over'?'Game over':snapshot.status==='paused'?'Paused':'Running';
}
