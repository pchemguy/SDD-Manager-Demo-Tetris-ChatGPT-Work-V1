/** Public-action recipes for final locks clearing 1–4 rows; no state-loading seam. */
import type { Game } from '../../src/engine/game';
import type { Kind } from '../../src/engine/types';
import { ground, moveTo } from './scenarios';
export interface Placement { kind:Kind; x:number; turns:number }
const squares=(layers:number):Placement[]=>Array.from({length:layers},()=>[0,2,4,6].map(x=>({kind:'O' as const,x,turns:0}))).flat();
export const CLEAR_RECIPES:Record<1|2|3|4,readonly Placement[]>={
 1:[...squares(1),{kind:'L',x:7,turns:1}],
 2:[...squares(1),{kind:'O',x:8,turns:0}],
 // First L clears one row; the final L clears the remaining three together.
 3:[...squares(2),{kind:'L',x:7,turns:1},{kind:'L',x:8,turns:3}],
 4:[...squares(2),{kind:'I',x:6,turns:1},{kind:'I',x:7,turns:1}],
};
export function place(game:Game,placement:Placement):void {
 if(game.snapshot().active?.kind!==placement.kind)throw new Error('Recipe/source mismatch');
 for(let i=0;i<placement.turns;i++)game.action('rotate');
 moveTo(game,placement.x);ground(game);
}
