/** Cross-control source, ghost, score, entitlement and scheduled-tick guarantees. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import {sequenceSource} from '../../support/piece-source';
import {moveTo} from '../../support/scenarios';
it('hold then wall kick, drop, floor kick and move can free the original scheduled tick',()=>{
 let calls=0;const source=sequenceSource(['O','I','T','Z']);const game=new Game({next(){calls++;return source.next();}});
 game.action('hold');game.action('rotate');moveTo(game,-2);game.action('rotate');
 expect(game.snapshot().active).toEqual({kind:'I',orientation:2,x:0,y:0});expect(game.snapshot().ghost).toEqual({kind:'I',orientation:2,x:0,y:17});
 game.advance(999);const ghost=game.snapshot().ghost;game.action('hard-drop');expect(game.snapshot().active).toEqual(ghost);expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(0);
 game.action('rotate');expect(game.snapshot().active).toEqual({kind:'I',orientation:3,x:2,y:16});moveTo(game,3);game.action('rotate');
 expect(game.snapshot().ghost).toEqual({kind:'I',orientation:0,x:3,y:18});expect(game.snapshot().held).toBe('O');expect(game.snapshot().holdAvailable).toBe(false);expect(calls).toBe(3);
 game.advance(1);expect(game.snapshot().active?.y).toBe(17);expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(0);expect(game.snapshot().score).toBe(0);
 game.action('hard-drop');game.advance(1000);expect(game.snapshot().active?.kind).toBe('T');expect(game.snapshot().preview).toBe('Z');expect(game.snapshot().holdAvailable).toBe(true);expect(game.snapshot().held).toBe('O');expect(calls).toBe(4);expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(4);
});
it('O rotation is a complete state and timing no-op',()=>{
 const game=new Game(sequenceSource(['O','T','I']));game.advance(999);game.action('hard-drop');const before=game.snapshot();game.action('rotate');expect(game.snapshot()).toEqual(before);game.advance(1);expect(game.snapshot().active?.kind).toBe('T');
});
