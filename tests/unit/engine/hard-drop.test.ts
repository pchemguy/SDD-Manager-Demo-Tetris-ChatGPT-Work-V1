/** Drop reaches the ghost without lock/source/score/time side effects. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import type {Action} from '../../../src/engine/types';
import {sequenceSource} from '../../support/piece-source';
import {lockGrounded,moveTo} from '../../support/scenarios';
const drop=(game:Game)=>game.action('hard-drop' as Action);
it('lands without locking, preserving the next scheduled tick and source calls',()=>{
 let calls=0;const source=sequenceSource(['O','T','I']);const game=new Game({next(){calls++;return source.next();}});game.advance(999);
 const before=game.snapshot();drop(game);expect(game.snapshot().active).toEqual(before.ghost);
 expect(game.snapshot().board).toEqual(before.board);expect(game.snapshot().score).toBe(0);expect(calls).toBe(2);
 const grounded=game.snapshot();drop(game);expect(game.snapshot()).toEqual(grounded);
 game.advance(1);expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(4);expect(game.snapshot().active?.kind).toBe('T');expect(calls).toBe(3);
});
it('movement after dropping off a ledge permits descent at the scheduled tick',()=>{
 const game=new Game(sequenceSource(['O','I','T','Z']));lockGrounded(game);game.advance(900);drop(game);
 expect(game.snapshot().active?.y).toBe(16);moveTo(game,0);game.advance(100);
 expect(game.snapshot().active?.y).toBe(17);expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(4);
});
it('paused and completed drops are complete no-ops',()=>{
 const game=new Game(sequenceSource(Array(30).fill('O')));game.pause();const paused=game.snapshot();drop(game);expect(game.snapshot()).toEqual(paused);game.resume();
 for(let i=0;i<10;i++)lockGrounded(game);const final=game.snapshot();drop(game);expect(game.snapshot()).toEqual(final);
});
