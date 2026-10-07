/** Invalid time and detached snapshots preserve engine state and hidden time/source ownership. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import type {Kind,Piece,Status} from '../../../src/engine/types';
import {sequenceSource} from '../../support/piece-source';
import {lockGrounded} from '../../support/scenarios';
for(const status of ['running','paused','game-over'] as const)it.each([-1,NaN,Infinity,-Infinity])(`${status} rejects elapsed %s before mutation`,value=>{
 const game=new Game(sequenceSource(Array(30).fill('O')));if(status==='game-over')for(let i=0;i<10;i++)lockGrounded(game);else game.advance(700.25);
 if(status==='paused')game.pause();const before=game.snapshot();expect(()=>game.advance(value)).toThrow(RangeError);expect(game.snapshot()).toEqual(before);
 if(status!=='game-over'){game.resume();game.advance(299.5);expect(game.snapshot().active?.y).toBe(0);game.advance(.25);expect(game.snapshot().active?.y).toBe(1);}
});
it('nested snapshots are detached and arbitrary caller mutations cannot alter gameplay',()=>{
 const game=new Game(sequenceSource(['O','T','I','Z']));lockGrounded(game);const before=game.snapshot();
 const snapshot=game.snapshot() as unknown as {board:(Kind|null)[][];active:Piece;preview:Kind;score:number;lines:number;level:number;status:Status};
 snapshot.board[19]![4]='I';snapshot.board[0]!.push('Z');snapshot.board.pop();
 Object.assign(snapshot.active,{x:100,y:100,orientation:3,kind:'Z'});Object.assign(snapshot,{preview:'Z',score:9999,lines:999,level:99,status:'game-over'});
 expect(game.snapshot()).toEqual(before);game.action('left');expect(game.snapshot().active?.x).toBe(2);
});
it('repeated reads do not consume a source or spend time',()=>{
 const source=sequenceSource(['T','I','O']);let consumed=0;const game=new Game({next:()=>{consumed++;return source.next();}});game.advance(700.25);
 const before=game.snapshot();for(let i=0;i<100;i++)expect(game.snapshot()).toEqual(before);expect(consumed).toBe(2);
 game.advance(299.5);expect(game.snapshot().active?.y).toBe(0);game.advance(.25);expect(game.snapshot().active?.y).toBe(1);
});
