/** Baseline arrow-key mapping scoped to the focused gameplay region. */
import type { Action } from '../engine/types';
const arrows:Readonly<Record<string,Action>>={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'rotate',ArrowDown:'down'};
export function keyboard(region:HTMLElement,dispatch:(action:Action)=>void):()=>void {
 const listener=(event:KeyboardEvent)=>{const action=arrows[event.key];if(action){event.preventDefault();dispatch(action);}};
 region.addEventListener('keydown',listener);
 return ()=>region.removeEventListener('keydown',listener);
}
