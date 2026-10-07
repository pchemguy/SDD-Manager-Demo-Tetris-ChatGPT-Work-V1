/** Gravity intervals, residual time and next-tick locking across level changes. */
import { expect,it } from 'vitest';
import { Game } from '../../../src/engine/game';
import { sequenceSource } from '../../support/piece-source';
import { CLEAR_RECIPES,place } from '../../support/clears';
import { ground } from '../../support/scenarios';
// Threshold checks allow one millionth of a millisecond for floating-point powers.
// Setup uses accepted intervals only to reach a level; assertions use literal thresholds.
function levelGame(level:number):Game {
 const recipe=Array.from({length:(level-1)*5},()=>CLEAR_RECIPES[2]).flat();
 const game=new Game(sequenceSource([...recipe.map(p=>p.kind),'O','T','I']));
 for(const p of recipe){place(game,p);game.advance(Math.max(100,1000*0.8**(game.snapshot().level-1)));}
 expect(game.snapshot().level).toBe(level);return game;
}
it.each([{level:1,interval:1000},{level:2,interval:800},{level:3,interval:640},{level:12,interval:100},{level:25,interval:100}])('level $level uses $interval ms including the speed floor',({level,interval})=>{
 const game=levelGame(level);game.advance(interval-0.25);expect(game.snapshot().active?.y).toBe(0);game.advance(0.250001);expect(game.snapshot().active?.y).toBe(1);
});
it('a grounded piece still waits for its scheduled level-2 tick after movement',()=>{
 const game=levelGame(2);ground(game);game.advance(799);game.action('left');expect(game.snapshot().board.flat().filter(Boolean)).toHaveLength(0);game.advance(1);
 expect(game.snapshot().board[19]!.slice(3,5)).toEqual(['O','O']);expect(game.snapshot().active?.kind).toBe('T');
});
function readyToCross():Game {
 const recipe=Array.from({length:5},()=>CLEAR_RECIPES[2]).flat();
 const game=new Game(sequenceSource([...recipe.map(p=>p.kind),'T','I','O']));
 for(const p of recipe.slice(0,-1)){place(game,p);game.advance(1000);}
 place(game,recipe[recipe.length-1]!);return game;
}
it('spends residual time at the new interval immediately after a level-changing promotion',()=>{
 const game=readyToCross();game.advance(900);game.advance(900);
 expect(game.snapshot()).toMatchObject({lines:10,score:1500,level:2,active:{kind:'T',y:1}});
 game.advance(799.5);expect(game.snapshot().active?.y).toBe(1);game.advance(0.5);expect(game.snapshot().active?.y).toBe(2);
});
it('partitioned elapsed calls agree across a clear, promotion and level change',()=>{
 const a=readyToCross(),b=readyToCross();a.advance(2600.25);
 for(const ms of [900,100,500,300,800,0.25])b.advance(ms);
 expect(a.snapshot()).toEqual(b.snapshot());expect(a.snapshot()).toMatchObject({level:2,active:{kind:'T',y:2}});
 a.advance(799.75);b.advance(799.75);expect(a.snapshot()).toEqual(b.snapshot());expect(a.snapshot().active?.y).toBe(3);
});
