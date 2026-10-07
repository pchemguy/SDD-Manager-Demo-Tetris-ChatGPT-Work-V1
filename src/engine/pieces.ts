/** Canonical local geometry; callers receive fresh coordinates, never mutable definitions. */
import type { Cell, Kind, Orientation, Piece } from './types';
const definitions: Record<Kind, { size: number; cells: readonly (readonly [number, number])[] }> = {
 I: {size:4,cells:[[0,1],[1,1],[2,1],[3,1]]},
 J: {size:3,cells:[[0,0],[0,1],[1,1],[2,1]]},
 L: {size:3,cells:[[2,0],[0,1],[1,1],[2,1]]},
 O: {size:2,cells:[[0,0],[1,0],[0,1],[1,1]]},
 S: {size:3,cells:[[1,0],[2,0],[0,1],[1,1]]},
 T: {size:3,cells:[[1,0],[0,1],[1,1],[2,1]]},
 Z: {size:3,cells:[[0,0],[1,0],[1,1],[2,1]]},
};
/** Local occupied cells, clockwise in the specified square frame; O is invariant. */
export function shape(kind: Kind, orientation: Orientation): readonly Cell[] {
 const definition=definitions[kind];
 let cells=definition.cells.map(([x,y])=>({x,y}));
 if(kind!=='O') for(let i=0;i<orientation;i++) cells=cells.map(({x,y})=>({x:definition.size-1-y,y:x}));
 return cells;
}
/** Center the unrotated frame at the visible top row. */
export function spawn(kind: Kind): Piece { return {kind,orientation:0,x:Math.floor((10-definitions[kind].size)/2),y:0}; }
/** Keep the frame origin; collision rejection belongs to the board/game boundary. */
export function rotate(piece: Piece): Piece { return {...piece,orientation:piece.kind==='O'?piece.orientation:(piece.orientation+1)%4 as Orientation}; }
/** Translate only occupied cells, including frames that extend beyond a boundary. */
export function occupied(piece: Piece): readonly Cell[] { return shape(piece.kind,piece.orientation).map(({x,y})=>({x:x+piece.x,y:y+piece.y})); }
