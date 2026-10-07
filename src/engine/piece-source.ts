/** Production seven-piece bags with an injectable uniform [0,1) random input. */
import { KINDS, type Kind, type PieceSource } from './types';
export function bagSource(random:()=>number=Math.random): PieceSource {
 let bag: Kind[]=[];
 return {next() {
  if(bag.length===0) {
   bag=[...KINDS];
   for(let i=bag.length-1;i>0;i--) {
    const sample=random();
    if(!Number.isFinite(sample)||sample<0||sample>=1) throw new RangeError('Invalid random input');
    const j=Math.floor(sample*(i+1));
    [bag[i],bag[j]]=[bag[j]!,bag[i]!];
   }
  }
  return bag.shift()!;
 }};
}
