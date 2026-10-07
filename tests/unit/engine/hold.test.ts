/** Hold owns exact source order, lock-cycle entitlement, spawn and timing. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import type {Kind} from '../../../src/engine/types';
import {sequenceSource} from '../../support/piece-source';
import {lockGrounded,moveTo} from '../../support/scenarios';
const hold=(g:Game)=>g.action('hold');
const state=(g:Game)=>g.snapshot();
it('empty hold promotes preview once; disabled hold is entirely inert until lock',()=>{
 let calls=0;const source=sequenceSource(['T','I','O','Z']);const g=new Game({next(){calls++;return source.next();}});
 expect(state(g).held).toBeNull();expect(state(g).holdAvailable).toBe(true);
 g.action('rotate');g.advance(999);hold(g);expect(state(g).held).toBe('T');expect(state(g).active).toEqual({kind:'I',orientation:0,x:3,y:0});expect(state(g).preview).toBe('O');expect(calls).toBe(3);expect(state(g).holdAvailable).toBe(false);
 g.advance(900);const before=state(g);hold(g);expect(state(g)).toEqual(before);expect(calls).toBe(3);g.advance(100);expect(state(g).active?.y).toBe(1);
 g.action('hard-drop');expect(state(g).holdAvailable).toBe(false);g.advance(1000);expect(state(g).holdAvailable).toBe(true);
 hold(g);expect(state(g).active).toEqual({kind:'T',orientation:0,x:3,y:0});expect(state(g).held).toBe('O');expect(calls).toBe(4);expect(state(g).preview).toBe('Z');
});
it('hold resets gravity but pause retains state and restart clears the slot',()=>{
 const g=new Game(sequenceSource(['O','T','I']));g.advance(999);hold(g);g.advance(1);expect(state(g).active?.y).toBe(0);g.advance(999);expect(state(g).active?.y).toBe(1);
 g.pause();const frozen=state(g);hold(g);g.advance(5000);expect(state(g)).toEqual(frozen);g.resume();expect(state(g).held).toBe('O');
 g.restart(sequenceSource(['Z','L']));expect(state(g).held).toBeNull();expect(state(g).holdAvailable).toBe(true);expect(state(g).active?.kind).toBe('Z');
});
it('empty hold with blocked incoming spawn consumes its successor then ends legally',()=>{
 let calls=0;const source=sequenceSource([...Array(11).fill('O'),'I','T'] as Kind[]);const g=new Game({next(){calls++;return source.next();}});
 for(let i=0;i<10;i++){moveTo(g,2);lockGrounded(g);}const before=state(g);expect(before.status).toBe('running');hold(g);
 expect(state(g).status).toBe('game-over');expect(state(g).active).toBeNull();expect(state(g).ghost).toBeNull();expect(state(g).held).toBe('O');expect(state(g).preview).toBe('T');expect(state(g).holdAvailable).toBe(false);expect(state(g).board).toEqual(before.board);expect(calls).toBe(13);
 const final=state(g);hold(g);expect(state(g)).toEqual(final);
});
it('populated hold blocked spawn consumes nothing and retains held/preview display',()=>{
 let calls=0;const source=sequenceSource(['I',...Array(12).fill('O'),'T'] as Kind[]);const g=new Game({next(){calls++;return source.next();}});hold(g);
 for(let i=0;i<10;i++){moveTo(g,2);lockGrounded(g);}const before=state(g),count=calls;hold(g);
 expect(state(g).status).toBe('game-over');expect(state(g).active).toBeNull();expect(state(g).ghost).toBeNull();expect(state(g).held).toBe('O');expect(state(g).preview).toBe(before.preview);expect(calls).toBe(count);expect(state(g).board).toEqual(before.board);
});
it('hold keeps earned score, level and cleared lines unchanged',()=>{
 const g=new Game(sequenceSource(['O','O','O','O','O','T','I','Z']));for(const x of [0,2,4,6,8]){moveTo(g,x);lockGrounded(g);}
 expect(g.snapshot().score).toBe(300);const before=g.snapshot();hold(g);for(const key of ['score','lines','level'] as const)expect(g.snapshot()[key]).toBe(before[key]);
});
for(const kind of ['invalid','exhausted'] as const)it(`${kind} source during hold is a fault instead of substituted spawn`,()=>{
 const source=sequenceSource(kind==='invalid'?['O','T','X' as Kind]:['O','T']);const g=new Game(source);expect(()=>hold(g)).toThrow();
});
