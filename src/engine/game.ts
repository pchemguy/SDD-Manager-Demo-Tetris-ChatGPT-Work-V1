/** Gameplay state owner. Scoring uses the level before each simultaneous clear. */
import { canPlace, clearRows, createBoard, lock } from './board';
import { rotate, spawn } from './pieces';
import type { Action, Piece, PieceSource, Snapshot, Status } from './types';

export class Game {
 private readonly board=createBoard();
 private active: Piece | null;
 private preview: Snapshot['preview'];
 private status: Status='running';
 private accumulator=0;
 private score=0;
 private lines=0;
 private get level():number {return 1+Math.floor(this.lines/10);}
 constructor(private readonly source: PieceSource) {
  this.active=spawn(source.next()); this.preview=source.next();
 }
 /** Detached state: rendering and callers cannot mutate the board or active piece. */
 snapshot(): Snapshot {
  return {board:this.board.map(row=>row.slice()),active:this.active?{...this.active}:null,
   preview:this.preview,status:this.status,score:this.score,lines:this.lines,level:this.level};
 }
 /** Attempt one semantic move; invalid movement/rotation and blocked soft drop are no-ops. */
 action(action: Action): void {
  if(this.status!=='running'||!this.active) return;
  const candidate=action==='rotate'?rotate(this.active):{...this.active,
   x:this.active.x+(action==='left'?-1:action==='right'?1:0),y:this.active.y+(action==='down'?1:0)};
  if(canPlace(this.board,candidate)) this.active=candidate;
 }
 /** Advance active elapsed milliseconds, retaining fractions and promotion residuals. */
 advance(elapsedMs: number): void {
  if(!Number.isFinite(elapsedMs)||elapsedMs<0) throw new RangeError('Elapsed time must be finite and nonnegative');
  if(this.status!=='running') return;
  this.accumulator+=elapsedMs;
  while(this.accumulator>=1000&&this.status==='running') { this.accumulator-=1000; this.tick(); }
 }
 private tick(): void {
  if(!this.active) return;
  const below={...this.active,y:this.active.y+1};
  if(canPlace(this.board,below)) { this.active=below; return; }
  lock(this.board,this.active);
  const cleared=clearRows(this.board);
  this.score+=[0,100,300,500,800][cleared]!*this.level;
  this.lines+=cleared;
  const promoted=spawn(this.preview); this.preview=this.source.next();
  if(canPlace(this.board,promoted)) this.active=promoted;
  else { this.active=null; this.status='game-over'; }
 }
}
