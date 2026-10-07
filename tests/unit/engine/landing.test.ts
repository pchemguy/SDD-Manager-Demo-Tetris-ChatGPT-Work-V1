/** Landing is downward reachable, bounded by the first obstruction, and snapshot-only. */
import {expect,it} from 'vitest';
import * as boardRules from '../../../src/engine/board';
import {shape} from '../../../src/engine/pieces';
import {KINDS,type Orientation,type Piece} from '../../../src/engine/types';
import {Game} from '../../../src/engine/game';
import {sequenceSource} from '../../support/piece-source';
for(const kind of KINDS)for(const orientation of [0,1,2,3] as Orientation[])it(`${kind}/${orientation} lands above floor and first full obstruction`,()=>{
 const board=boardRules.createBoard(),piece:Piece={kind,orientation,x:3,y:0};
 const bottom=Math.max(...shape(kind,orientation).map(c=>c.y));
 const landing=boardRules.landing;
 expect(landing(board,piece)).toEqual({...piece,y:19-bottom});
 board[10]!.fill('O');expect(landing(board,piece)).toEqual({...piece,y:9-bottom});
 expect(piece.y).toBe(0);expect(board[19]!.every(c=>c===null)).toBe(true);
});
it('grounded placement remains unchanged and cannot jump through a stack',()=>{
 const board=boardRules.createBoard();board[10]![4]='O';
 const piece:Piece={kind:'O',orientation:0,x:4,y:8};
 expect(boardRules.landing(board,piece)).toEqual(piece);
});
it('ghost acquisition is detached and consumes no pieces or gravity',()=>{
 let calls=0;const source=sequenceSource(['T','I','O']);const game=new Game({next(){calls++;return source.next();}});
 game.advance(999);const s=game.snapshot();
 expect(s.ghost).toEqual({kind:'T',orientation:0,x:3,y:18});
 Object.assign(s.ghost!,{x:99,y:99});for(let i=0;i<30;i++)expect(game.snapshot().ghost!.x).toBe(3);
 expect(calls).toBe(2);game.advance(1);expect(game.snapshot().active?.y).toBe(1);
 game.pause();expect(game.snapshot().ghost!.y).toBe(18);
});
it('game over has no ghost',()=>{
 const game=new Game(sequenceSource(Array(30).fill('O')));
 for(let i=0;i<10;i++){for(let j=0;j<20;j++)game.action('down');game.advance(1000);}
 expect(game.snapshot().ghost).toBeNull();
});
