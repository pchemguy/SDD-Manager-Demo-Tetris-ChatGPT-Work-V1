/** Present snapshot counters/status and native session-command controls. */
import type { Snapshot } from '../engine/types';
export interface Controls {pause:HTMLButtonElement;restart:HTMLButtonElement}
export interface Counters {score:HTMLElement;level:HTMLElement;lines:HTMLElement}
export function showStatus(element:HTMLElement,snapshot:Snapshot,counters?:Counters,controls?:Controls):void {
 element.dataset.state=snapshot.status;
 if(counters)for(const key of ['score','level','lines'] as const)counters[key].textContent=String(snapshot[key]);
 if(controls){controls.pause.textContent=snapshot.status==='paused'?'Resume':'Pause';controls.pause.disabled=snapshot.status==='game-over';}
 element.textContent=snapshot.status==='game-over'?'Game over':snapshot.status==='paused'?'Paused':'Running';
}

/** Report a sanitized application failure even when the normal status node is absent. */
export function showError(doc:Document,message:string):void {
 let status=doc.querySelector<HTMLElement>('#status');
 if(!status){status=doc.createElement('p');status.id='status';doc.body.append(status);}
 status.setAttribute('role','status');status.setAttribute('aria-live','assertive');
 status.dataset.state='error';status.textContent=message;
 for(const id of ['pause','restart']){const button=doc.querySelector<HTMLButtonElement>('#'+id);if(button)button.disabled=true;}
}
