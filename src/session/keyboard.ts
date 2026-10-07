/** Focus-scoped key translation; native repeat is retained only for movement. */
import type { Action } from '../engine/types';
export type Command=Action|'pause'|'restart';
const arrows:Readonly<Record<string,Action>>={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'rotate',ArrowDown:'down'};
function allowed(event:KeyboardEvent):boolean {
 if(event.ctrlKey||event.altKey||event.metaKey)return false;
 return !(event.target as Element|null)?.closest?.('input,textarea,select,button,a,[contenteditable]:not([contenteditable="false"])');
}
/** Translate supported unmodified keys, ignoring editable and native-control origins. */
export function commandFor(event:KeyboardEvent):Command|null {
 if(!allowed(event))return null;
 const action=(event.code==='Space'||event.key===' ')?'hard-drop':arrows[event.key]??(event.key.toLowerCase()==='p'?'pause':event.key.toLowerCase()==='r'?'restart':null);
 if(event.repeat&&(action==='rotate'||action==='hard-drop'||action==='pause'||action==='restart'))return null;
 return action;
}
/** Subscribe to the gameplay region only; handled arrows suppress native scrolling in all statuses. */
export function keyboard(region:HTMLElement,dispatch:(command:Command)=>void):()=>void {
 const listener=(event:KeyboardEvent)=>{
  if(!region.contains(region.ownerDocument.activeElement))return;
  if(!allowed(event))return;
  if(arrows[event.key]||event.code==='Space'||event.key===' ')event.preventDefault();
  const command=commandFor(event);if(command){event.preventDefault();dispatch(command);}
 };
 region.addEventListener('keydown',listener);
 return ()=>region.removeEventListener('keydown',listener);
}
