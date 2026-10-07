/** Literal geometry and connected-cell expectations for all seven tetrominoes. */
import { describe, expect, it } from 'vitest';
import { KINDS, type Kind, type Orientation } from '../../../src/engine/types';
import { occupied, rotate, shape, spawn } from '../../../src/engine/pieces';
// Literal frames independently transcribed from SPEC's coordinate/rotation contract.
const frames: Record<Kind, string[]> = {
 I: ['..../####/..../....','..#./..#./..#./..#.','..../..../####/....','.#../.#../.#../.#..'],
 J: ['#../###/...','.##/.#./.#.','.../###/..#','.#./.#./##.'],
 L: ['..#/###/...','.#./.#./.##','.../###/#..','##./.#./.#.'],
 O: ['##/##','##/##','##/##','##/##'],
 S: ['.##/##./...','.#./.##/..#','.../.##/##.','#../##./.#.'],
 T: ['.#./###/...','.#./.##/.#.','.../###/.#.','.#./##./.#.'],
 Z: ['##./.##/...','..#/.##/.#.','.../##./.##','.#./##./#..'],
};
function keys(cells: readonly {x:number;y:number}[]) { return cells.map(c=>`${c.x},${c.y}`).sort(); }
describe.each(KINDS)('%s geometry', kind => {
 it('matches every specified frame with four connected unique cells', () => {
  for (const orientation of [0,1,2,3] as Orientation[]) {
   const rows=frames[kind][orientation]!.split('/');
   const expected=rows.flatMap((row,y)=>[...row].flatMap((v,x)=>v==='#'?[`${x},${y}`]:[])).sort();
   const actual=shape(kind,orientation);
   expect(keys(actual)).toEqual(expected); expect(new Set(keys(actual)).size).toBe(4);
   const reached=new Set([keys(actual)[0]]);
   for(let i=0;i<4;i++) for(const c of actual) if(actual.some(n=>reached.has(`${n.x},${n.y}`)&&Math.abs(c.x-n.x)+Math.abs(c.y-n.y)===1)) reached.add(`${c.x},${c.y}`);
   expect(reached.size).toBe(4);
  }
 });
 it('centers spawn, translates cells and restores after four rotations',()=>{
  const p=spawn(kind); expect(p).toEqual({kind,orientation:0,x:kind==='O'?4:3,y:0});
  expect(keys(occupied(p))).toEqual(keys(shape(kind,0).map(c=>({x:c.x+p.x,y:c.y}))));
  let r=p; for(let i=0;i<4;i++) r=rotate(r); expect(r).toEqual(p);
  expect(rotate(p).orientation).toBe(kind==='O'?0:1);
 });
});
