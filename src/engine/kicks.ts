/** Clockwise SRS offsets in downward-positive board coordinates; no gameplay state. */
import {canPlace} from './board';
import {rotate} from './pieces';
import type {Grid,Kind,Orientation,Piece} from './types';
const normal=[[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],[[0,0],[1,0],[1,1],[0,-2],[1,-2]],[[0,0],[1,0],[1,-1],[0,2],[1,2]],[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]]] as const;
const line=[[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],[[0,0],[-1,0],[2,0],[-1,-2],[2,1]],[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],[[0,0],[1,0],[-2,0],[1,2],[-2,-1]]] as const;
/** Return detached ordered offsets, so callers cannot mutate the policy tables. */
export function kickOffsets(kind:Kind,orientation:Orientation):number[][] {
 return (kind==='O'?[[0,0]]:(kind==='I'?line:normal)[orientation]).map(offset=>[...offset]);
}
/** First legal candidate from independent original-origin offsets; null rejects atomically.
 * The supplied piece must be legal. O returns an unchanged detached placement.
 */
export function kickedRotation(board:Grid,piece:Piece):Piece|null {
 if(piece.kind==='O')return {...piece};
 const rotated=rotate(piece);
 for(const [dx,dy] of kickOffsets(piece.kind,piece.orientation)){
  const candidate={...rotated,x:piece.x+dx!,y:piece.y+dy!};if(canPlace(board,candidate))return candidate;
 }
 return null;
}
