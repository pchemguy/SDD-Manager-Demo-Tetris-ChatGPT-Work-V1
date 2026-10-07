/** Focus-scoped key translation; native repeat is retained only for movement. */
import type { Action } from '../engine/types';
export type Command=Action|'pause'|'restart';
const arrows:Readonly<Record<string,Action>>={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'rotate',ArrowDown:'down'};
/** Translate supported unmodified keys, ignoring editable and native-control origins. */
export function commandFor(event:KeyboardEvent):Command|null {
 if(event.ctrlKey||event.altKey||event.metaKey)return null;
 const target=event.target as Element|null;
 if(target?.closest?.('input,textarea,select,button,a,[contenteditable]:not([contenteditable="false"])'))return null;
 const action=arrows[event.key]??(event.key.toLowerCase()==='p'?'pause':event.key.toLowerCase()==='r'?'restart':null);
 if(event.repeat&&(action==='rotate'||action==='pause'||action==='restart'))return null;
 return action;
}
/** Subscribe to the gameplay region only; handled arrows suppress native scrolling in all statuses. */
export function keyboard(region:HTMLElement,dispatch:(command:Command)=>void):()=>void {
 const listener=(event:KeyboardEvent)=>{
  if(!region.contains(region.ownerDocument.activeElement))return;
  const command=commandFor(event);if(command){event.preventDefault();dispatch(command);}
 };
 region.addEventListener('keydown',listener);
 return ()=>region.removeEventListener('keydown',listener);
}
