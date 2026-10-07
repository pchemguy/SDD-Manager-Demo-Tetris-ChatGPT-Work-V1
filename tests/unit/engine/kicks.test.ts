/** Literal accepted tables and actual legal-board candidates, independent of selector data. */
import {expect,it} from 'vitest';
import {kickOffsets,kickedRotation} from '../../../src/engine/kicks';
import {canPlace,createBoard} from '../../../src/engine/board';
import {occupied,rotate} from '../../../src/engine/pieces';
import type {Piece} from '../../../src/engine/types';
const normal=[[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],[[0,0],[1,0],[1,1],[0,-2],[1,-2]],[[0,0],[1,0],[1,-1],[0,2],[1,2]],[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]]] as const;
const line=[[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],[[0,0],[-1,0],[2,0],[-1,-2],[2,1]],[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],[[0,0],[1,0],[-2,0],[1,2],[-2,-1]]] as const;
for(const kind of ['I','J','L','S','T','Z'] as const)for(const orientation of [0,1,2,3] as const){
 const offsets=(kind==='I'?line:normal)[orientation];
 it(`${kind} ${orientation} clockwise offsets match all five accepted candidates`,()=>{expect(kickOffsets(kind,orientation)).toEqual(offsets);});
 for(let index=0;index<5;index++)it(`${kind} ${orientation} checks candidate ${index} and first-legal precedence`,()=>{
  // For these two T offsets, the original and target cells protect candidate zero.
  // A legal original/target therefore cannot make that later candidate win.
  if(kind==='T'&&((orientation===0&&index===3)||(orientation===2&&index===2))){
   const piece:Piece={kind,orientation,x:3,y:5},rotated=rotate(piece),[dx,dy]=offsets[index]!,target={...rotated,x:piece.x+dx,y:piece.y+dy};
   const protectedCells=[...occupied(piece),...occupied(target)];expect(occupied(rotated).every(c=>protectedCells.some(p=>p.x===c.x&&p.y===c.y))).toBe(true);
   const board=createBoard();for(let y=0;y<20;y++)for(let x=0;x<10;x++)if(!protectedCells.some(p=>p.x===x&&p.y===y))board[y]![x]='O';
   expect(kickedRotation(board,piece)).toEqual(rotated);return;
  }
  // Find a real fixture whose earlier candidates fail, without changing the initial/target cells.
  let fixture:{board:ReturnType<typeof createBoard>;piece:Piece;target:Piece}|undefined;
  search:for(let y=-3;y<20;y++)position:for(let x=-3;x<10;x++){
   const board=createBoard(),piece:Piece={kind,orientation,x,y};if(!canPlace(board,piece))continue;
   const rotated=rotate(piece),[dx,dy]=offsets[index]!,target={...rotated,x:x+dx,y:y+dy};if(!canPlace(board,target))continue;
   const protectedCells=[...occupied(piece),...occupied(target)];
   for(let j=0;j<index;j++){
    const [ax,ay]=offsets[j]!,prior={...rotated,x:x+ax,y:y+ay};if(!canPlace(board,prior))continue;
    const cell=occupied(prior).find(c=>!protectedCells.some(p=>p.x===c.x&&p.y===c.y));if(!cell)continue position;
    board[cell.y]![cell.x]='O';
   }
   fixture={board,piece,target};break search;
  }
  expect(fixture,`real fixture for candidate ${index}`).toBeDefined();const {board,piece,target}=fixture!;
  const before=JSON.stringify({board,piece});expect(kickedRotation(board,piece)).toEqual(target);expect(JSON.stringify({board,piece})).toBe(before);
 });
}
it('rejects every candidate on a filled stack while retaining a legal initial piece',()=>{
 const board=createBoard(),piece:Piece={kind:'T',orientation:0,x:3,y:5};for(let y=0;y<20;y++)for(let x=0;x<10;x++)board[y]![x]='O';for(const c of occupied(piece))board[c.y]![c.x]=null;
 expect(canPlace(board,piece)).toBe(true);const before=JSON.stringify(board);expect(kickedRotation(board,piece)).toBeNull();expect(JSON.stringify(board)).toBe(before);
});
it('O is unchanged; returned offset data cannot corrupt later calls',()=>{
 const piece:Piece={kind:'O',orientation:0,x:4,y:18};expect(kickedRotation(createBoard(),piece)).toEqual(piece);
 const first=kickOffsets('I',0);try{(first as number[][])[0]![0]=99;}catch{/* frozen data is also valid */}
 expect(kickOffsets('I',0)).toEqual(line[0]);
});
it('top and floor bounds use occupied cells and downward-positive coordinates',()=>{
 const board=createBoard();expect(kickedRotation(board,{kind:'I',orientation:0,x:3,y:-1})).toEqual({kind:'I',orientation:1,x:1,y:0});
 expect(kickedRotation(board,{kind:'T',orientation:0,x:3,y:18})).toEqual({kind:'T',orientation:1,x:2,y:17});
});
