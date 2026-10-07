/** Session status and fresh reset contracts through the public engine boundary. */
import { expect,it } from 'vitest';
import { Game } from '../../../src/engine/game';
import { sequenceSource } from '../../support/piece-source';
import { lockGrounded,moveTo } from '../../support/scenarios';
it('pause freezes actions/time and resume preserves fractional gravity remainder',()=>{
 const game=new Game(sequenceSource(['T','I','O']));game.advance(700.25);game.pause();
 const frozen=game.snapshot();expect(frozen.status).toBe('paused');
 for(const action of ['left','right','down','rotate'] as const)game.action(action);
 game.advance(90000);game.pause();expect(game.snapshot()).toEqual(frozen);
 game.resume();game.resume();game.advance(299.5);expect(game.snapshot().active?.y).toBe(0);
 game.advance(.25);expect(game.snapshot().active?.y).toBe(1);
});
it.each(['running','paused','game-over'] as const)('restart from %s resets state and consumes a supplied fresh source',status=>{
 const game=new Game(sequenceSource(Array(30).fill('O')));
 for(const x of [0,2,4,6,8]){moveTo(game,x);lockGrounded(game);}expect(game.snapshot().score).toBe(300);
 if(status==='game-over')for(let i=0;i<10;i++)lockGrounded(game);
 if(status==='paused')game.pause();expect(game.snapshot().status).toBe(status);
 game.advance(123.75);game.restart(sequenceSource(['T','I','Z']));
 expect(game.snapshot()).toMatchObject({score:0,lines:0,level:1,status:'running',preview:'I',active:{kind:'T',orientation:0,x:3,y:0}});
 expect(game.snapshot().board.flat().every(c=>c===null)).toBe(true);
 game.advance(999.75);expect(game.snapshot().active?.y).toBe(0);game.advance(.25);expect(game.snapshot().active?.y).toBe(1);
});
it('pause/resume never change a completed session',()=>{
 const game=new Game(sequenceSource(Array(30).fill('O')));for(let i=0;i<10;i++)lockGrounded(game);
 const final=game.snapshot();game.pause();game.resume();game.action('down');game.advance(10000);expect(game.snapshot()).toEqual(final);
});
