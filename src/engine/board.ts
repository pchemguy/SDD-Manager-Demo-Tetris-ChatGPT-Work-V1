/** Locked-cell board operations. Active geometry remains separate until lock. */
import type { Grid, Piece } from './types';
import { occupied } from './pieces';
export function createBoard(): Grid { return Array.from({length:20},()=>Array<null>(10).fill(null)); }
/** Empty frame cells never participate in bounds or overlap checks. */
export function canPlace(board: Grid, piece: Piece): boolean {
 return occupied(piece).every(({x,y})=>x>=0&&x<10&&y>=0&&y<20&&board[y]![x]===null);
}
/** Mutate only after validating the entire placement; illegal locks throw atomically. */
export function lock(board: Grid, piece: Piece): void {
 if(!canPlace(board,piece)) throw new RangeError('Illegal lock placement');
 for(const {x,y} of occupied(piece)) board[y]![x]=piece.kind;
}
/** Compact all completed rows in one transition, keeping the surviving row order. */
export function clearRows(board: Grid): number {
 const remaining=board.filter(row=>row.some(cell=>cell===null));
 const count=20-remaining.length;
 if(count===0) return 0;
 const empty=Array.from({length:count},()=>Array<null>(10).fill(null));
 board.splice(0,board.length,...empty,...remaining);
 return count;
}
