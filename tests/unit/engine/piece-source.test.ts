/** Seven-piece bag distributions, boundaries and deterministic source consumption. */
import { expect, it } from 'vitest';
import { bagSource } from '../../../src/engine/piece-source';
import { KINDS } from '../../../src/engine/types';
import { sequenceSource } from '../../support/piece-source';
it('emits exactly seven unique kinds in each consecutive bag',()=>{
 const source=bagSource(()=>0.37);
 for(let bag=0;bag<4;bag++) expect(Array.from({length:7},()=>source.next()).sort()).toEqual([...KINDS].sort());
});
it('consumes supplied randomness and permits every permutation',()=>{
 const permutations=new Set<string>();
 for(let index=0;index<5040;index++) {
  let value=index; const choices:number[]=[];
  for(let n=7;n>=2;n--) { choices.push((value%n+0.5)/n); value=Math.floor(value/n); }
  let calls=0; const source=bagSource(()=>choices[calls++]!);
  permutations.add(Array.from({length:7},()=>source.next()).join(''));
  expect(calls).toBe(6);
 }
 expect(permutations.size).toBe(5040);
});
it('allows repeat across a bag boundary without duplicating within one',()=>{
 // All last-slot swaps leave the first bag unchanged. The next bag puts Z first.
 const choices=[...Array(6).fill(0.99),0,...Array(5).fill(0.99)];
 let i=0; const source=bagSource(()=>choices[i++]!);
 const kinds=Array.from({length:8},()=>source.next()); expect(kinds.slice(0,7)).toEqual([...KINDS]); expect(kinds.slice(6)).toEqual(['Z','Z']);
});
it('uses the same next contract for exact deterministic consumption',()=>{
 const source=sequenceSource(['T','I','O']); expect([source.next(),source.next(),source.next()]).toEqual(['T','I','O']); expect(()=>source.next()).toThrow('exhausted');
});
