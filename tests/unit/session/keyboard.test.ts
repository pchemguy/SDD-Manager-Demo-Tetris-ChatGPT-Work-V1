/** Key mapping/filtering without dependence on browser repeat timing. */
import { expect,it } from 'vitest';
import { commandFor } from '../../../src/session/keyboard';
function key(key:string,extra:Partial<KeyboardEvent>={}):KeyboardEvent{return {key,repeat:false,ctrlKey:false,altKey:false,metaKey:false,target:null,...extra} as KeyboardEvent;}
it('maps arrows and case-insensitive P/R with the specified repeat policy',()=>{
 for(const [name,command] of [['ArrowLeft','left'],['ArrowRight','right'],['ArrowDown','down'],['ArrowUp','rotate'],['p','pause'],['P','pause'],['r','restart'],['R','restart']])expect(commandFor(key(name!))).toBe(command);
 for(const name of ['ArrowLeft','ArrowRight','ArrowDown'])expect(commandFor(key(name,{repeat:true}))).not.toBeNull();
 for(const name of ['ArrowUp','p','R'])expect(commandFor(key(name,{repeat:true}))).toBeNull();
 expect(commandFor(key('Space'))).toBeNull();
});
it('ignores Ctrl/Alt/Meta shortcuts and editable or ordinary-control origins',()=>{
 for(const modifier of ['ctrlKey','altKey','metaKey'])expect(commandFor(key('ArrowLeft',{[modifier]:true}))).toBeNull();
 // closest models an ancestor interactive/editable element, including nested contenteditable spans.
 const target={closest:()=>({})} as unknown as EventTarget;
 expect(commandFor(key('p',{target}))).toBeNull();
});
it('maps one-shot Space through key/code and rejects repeated or modified drop',()=>{
 expect(commandFor(key(' '))).toBe('hard-drop');expect(commandFor(key('Unidentified',{code:'Space'}))).toBe('hard-drop');
 expect(commandFor(key(' ',{repeat:true}))).toBeNull();expect(commandFor(key(' ',{ctrlKey:true}))).toBeNull();
});

it('maps one-shot case-insensitive C and preserves all shortcut/origin filters',()=>{
 expect(commandFor(key('c'))).toBe('hold');expect(commandFor(key('C'))).toBe('hold');
 expect(commandFor(key('c',{repeat:true}))).toBeNull();expect(commandFor(key('C',{altKey:true}))).toBeNull();
 expect(commandFor(key('c',{target:{closest:()=>({})} as unknown as EventTarget}))).toBeNull();
});
