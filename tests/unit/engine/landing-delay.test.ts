/** Every first landing grants a full interval; continuous support cannot extend it. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import {sequenceSource} from '../../support/piece-source';
import {ground,lockGrounded,moveTo} from '../../support/scenarios';
const count=(game:Game)=>game.snapshot().board.flat().filter(Boolean).length;
it.each(['down','hard-drop'] as const)('%s landing discards pre-landing remainder and waits a full interval',action=>{
 const game=new Game(sequenceSource(['O','T','I']));game.advance(999);
 if(action==='down')for(let i=0;i<17;i++)game.action('down');
 game.action(action);expect(game.snapshot().active?.y).toBe(18);expect(count(game)).toBe(0);
 game.advance(999);expect(count(game)).toBe(0);expect(game.snapshot().active?.kind).toBe('O');
 game.advance(1);expect(count(game)).toBe(4);expect(game.snapshot().active?.kind).toBe('T');
});
it('zero-distance drops, blocked soft drop, O rotation and grounded movement do not extend delay',()=>{
 const game=new Game(sequenceSource(['O','T','I']));game.advance(999);game.action('hard-drop');game.advance(900);
 game.action('hard-drop');game.action('down');game.action('rotate');game.action('left');game.advance(99);expect(count(game)).toBe(0);
 game.advance(1);expect(count(game)).toBe(4);expect(game.snapshot().active?.kind).toBe('T');
});
it('horizontal movement onto a stack starts a full interval after leaving support',()=>{
 const game=new Game(sequenceSource(['O','I','T','Z']));lockGrounded(game);ground(game);moveTo(game,0);game.advance(999);moveTo(game,3);
 expect(game.snapshot().active?.y).toBe(16);game.advance(999);expect(count(game)).toBe(4);game.advance(1);expect(count(game)).toBe(8);expect(game.snapshot().active?.kind).toBe('T');
});
it('rotation from airborne to grounded grants a full interval',()=>{
 const game=new Game(sequenceSource(['I','T','Z']));game.action('rotate');ground(game);game.action('rotate');game.advance(999);game.action('rotate');
 expect(game.snapshot().active?.orientation).toBe(3);game.advance(999);expect(count(game)).toBe(0);game.advance(1);expect(count(game)).toBe(4);
});
it('pause freezes the remaining landing delay and hold/restart clear it',()=>{
 const game=new Game(sequenceSource(['O','T','I','Z']));game.advance(999);game.action('hard-drop');game.advance(400.25);game.pause();game.advance(10000);game.resume();
 game.advance(599.5);expect(count(game)).toBe(0);game.advance(.25);expect(count(game)).toBe(4);
 game.action('hard-drop');game.advance(900);game.action('hold');game.advance(999);expect(game.snapshot().active?.y).toBe(0);game.advance(1);expect(game.snapshot().active?.y).toBe(1);
 game.action('hard-drop');game.advance(900);game.restart(sequenceSource(['O','I','T']));game.advance(999);expect(count(game)).toBe(0);expect(game.snapshot().active?.y).toBe(0);
});
it('natural landing keeps later elapsed time and agrees with partitioned calls',()=>{
 const a=new Game(sequenceSource(['O','T','I'])),b=new Game(sequenceSource(['O','T','I']));
 a.advance(18999);b.advance(17999);b.advance(1000);expect(a.snapshot()).toEqual(b.snapshot());expect(count(a)).toBe(0);
 a.advance(1);b.advance(1);expect(a.snapshot()).toEqual(b.snapshot());expect(count(a)).toBe(4);
});
