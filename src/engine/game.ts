/** Gameplay state owner. Scoring uses the level before each simultaneous clear. */
import { canPlace, clearRows, createBoard, landing, lock } from './board';
import { spawn } from './pieces';
import { kickedRotation } from './kicks';
import { KINDS, type Action, type Kind, type Piece, type PieceSource, type Snapshot, type Status } from './types';

export class Game {
 private board=createBoard();
 private active: Piece | null;
 private preview: Snapshot['preview'];
 private status: Status='running';
 private held: Kind | null=null;
 private holdAvailable=true;
 private accumulator=0;
 private score=0;
 private lines=0;
 private get level():number {return 1+Math.floor(this.lines/10);}
 private get interval():number {return Math.max(100,1000*0.8**(this.level-1));}
 constructor(private source: PieceSource) {
  this.active=spawn(this.next()); this.preview=this.next();
 }
 /** Freeze a running session without discarding its gravity remainder. */
 pause():void {if(this.status==='running')this.status='paused';}
 /** Resume only a paused session; completed games remain terminal. */
 resume():void {if(this.status==='paused')this.status='running';}
 /** Replace all gameplay state using a caller-owned fresh piece source. */
 restart(source:PieceSource):void {
  this.source=source;this.board=createBoard();this.score=0;this.lines=0;this.accumulator=0;
  this.held=null;this.holdAvailable=true;
  this.active=spawn(this.next());this.preview=this.next();this.status='running';
 }
 /** Return detached rows/piece data; acquisition consumes no pieces or gameplay time. */
 snapshot(): Snapshot {
  return {board:this.board.map(row=>row.slice()),active:this.active?{...this.active}:null,
   ghost:this.active?landing(this.board,this.active):null,preview:this.preview,held:this.held,holdAvailable:this.holdAvailable,status:this.status,score:this.score,lines:this.lines,level:this.level};
 }
 /** Apply an action; first manual landing and successful hold start a full interval.
  * Continuously grounded/rejected actions preserve time. Only a blocked tick locks.
  */
 action(action: Action): void {
  if(this.status!=='running'||!this.active) return;
  if(action==='hold'){this.hold();return;}
  if(action==='hard-drop'){this.move(landing(this.board,this.active));return;}
  if(action==='rotate'){const candidate=kickedRotation(this.board,this.active);if(candidate)this.move(candidate);return;}
  const candidate={...this.active,
   x:this.active.x+(action==='left'?-1:action==='right'?1:0),y:this.active.y+(action==='down'?1:0)};
  if(canPlace(this.board,candidate)) this.move(candidate);
 }
 /** Commit a legal manual placement, restarting time only at first contact.
  * Gravity placements already occur at tick boundaries; resetting there would
  * discard actual post-tick elapsed time in a bulk advance call.
  */
 private move(candidate:Piece):void {
  const airborne=this.active&&canPlace(this.board,{...this.active,y:this.active.y+1});
  if(airborne&&!canPlace(this.board,{...candidate,y:candidate.y+1}))this.accumulator=0;
  this.active=candidate;
 }
 /** Advance active elapsed milliseconds, retaining fractions and promotion residuals.
  * @throws RangeError for negative/nonfinite input before mutation, even when inactive.
  */
 advance(elapsedMs: number): void {
  if(!Number.isFinite(elapsedMs)||elapsedMs<0) throw new RangeError('Elapsed time must be finite and nonnegative');
  if(this.status!=='running') return;
  this.accumulator+=elapsedMs;
  while(this.status==='running'&&this.accumulator>=this.interval) {
   // Subtract the pre-tick interval; a clear may change the next interval.
   this.accumulator-=this.interval;this.tick();
  }
 }
 /** Validate externally supplied identities at every consumption boundary. */
 private next():Kind {
  const kind=this.source.next();if(!KINDS.includes(kind))throw new Error('Invalid piece source output');return kind;
 }
 /** Exchange identities at normal spawn, consuming a preview only for an empty slot.
  * A successful exchange starts a fresh gravity interval and spends this lock cycle.
  * Source failures propagate to the session fault boundary.
  */
 private hold():void {
  if(!this.holdAvailable||!this.active)return;
  const incoming=this.held??this.preview;
  if(this.held===null)this.preview=this.next();
  this.held=this.active.kind;this.holdAvailable=false;this.accumulator=0;
  const promoted=spawn(incoming);
  if(canPlace(this.board,promoted))this.active=promoted;
  else {this.active=null;this.status='game-over';}
 }
 private tick(): void {
  if(!this.active) return;
  const below={...this.active,y:this.active.y+1};
  if(canPlace(this.board,below)) { this.active=below; return; }
  lock(this.board,this.active);
  const cleared=clearRows(this.board);
  this.score+=[0,100,300,500,800][cleared]!*this.level;
  this.lines+=cleared;
  const promoted=spawn(this.preview); this.preview=this.next();
  if(canPlace(this.board,promoted)) {this.active=promoted;this.holdAvailable=true;}
  else { this.active=null; this.status='game-over';this.holdAvailable=false; }
 }
}
