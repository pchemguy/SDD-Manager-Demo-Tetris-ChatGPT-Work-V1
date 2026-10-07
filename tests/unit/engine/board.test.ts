import { expect, it } from 'vitest';
import { canPlace, clearRows, createBoard, lock } from '../../../src/engine/board';
import { spawn } from '../../../src/engine/pieces';
it('creates independent empty rows on a 10 by 20 board',()=>{
 const b=createBoard(); expect(b).toHaveLength(20); expect(b.every(r=>r.length===10&&r.every(c=>c===null))).toBe(true);
 b[0]![0]='T'; expect(b[1]![0]).toBeNull();
});
it('rejects floor/wall/stack collisions using only occupied cells',()=>{
 const b=createBoard(), p=spawn('O');
 expect(canPlace(b,{...p,x:0,y:18})).toBe(true);
 for(const candidate of [{...p,x:-1},{...p,x:9},{...p,y:-1},{...p,y:19}]) expect(canPlace(b,candidate)).toBe(false);
 b[1]![4]='I'; expect(canPlace(b,p)).toBe(false);
 expect(canPlace(b,{...spawn('I'),x:6})).toBe(true);
 expect(canPlace(b,{...spawn('I'),orientation:1,x:-2})).toBe(true);
 b[1]![4]=null; b[0]![3]='Z'; expect(canPlace(b,spawn('I'))).toBe(true);
 b[1]![3]='Z'; expect(canPlace(b,spawn('I'))).toBe(false);
});
it('locks exactly four cells and rejects an illegal lock without mutation',()=>{
 const b=createBoard(); lock(b,{...spawn('T'),x:0,y:18});
 expect(b[18]).toEqual([null,'T',null,null,null,null,null,null,null,null]);
 expect(b[19]).toEqual(['T','T','T',null,null,null,null,null,null,null]);
 const before=structuredClone(b); expect(()=>lock(b,{...spawn('O'),y:19})).toThrow(RangeError); expect(b).toEqual(before);
});
it.each([[19],[18,19],[17,18,19],[16,17,18,19],[3,8,17]].map(rows=>({rows})))('compacts complete rows %j together preserving remaining order',({rows})=>{
 const b=createBoard(); b[0]![0]='I'; b[5]![1]='T'; b[15]![2]='Z';
 for(const y of rows) b[y]=Array(10).fill('O');
 const expected=b.filter((_,y)=>!rows.includes(y)).map(r=>r.slice());
 for(let i=0;i<rows.length;i++) expected.unshift(Array(10).fill(null));
 expect(clearRows(b)).toBe(rows.length); expect(b).toEqual(expected); expect(b).toHaveLength(20);
});
it('preserves a board with no completed row',()=>{
 const b=createBoard(); b[19]![1]='J'; const before=structuredClone(b);
 expect(clearRows(b)).toBe(0); expect(b).toEqual(before);
});
