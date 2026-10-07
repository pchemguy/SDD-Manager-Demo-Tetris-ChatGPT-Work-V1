/** Stateless board drawing from detached snapshots; shared geometry prevents rotation drift. */
import { occupied } from '../engine/pieces';
import type { Kind, Snapshot } from '../engine/types';
const colors: Record<Kind,string>={I:'#22d3ee',J:'#60a5fa',L:'#fb923c',O:'#facc15',S:'#4ade80',T:'#c084fc',Z:'#f87171'};
const CELL=24;
export class Renderer {
 constructor(private readonly context: CanvasRenderingContext2D) {
  context.canvas.width=10*CELL; context.canvas.height=20*CELL;
 }
 /** Draw the whole board, removing stale active cells while preserving locked cells. */
 draw(snapshot: Snapshot): void {
  const ctx=this.context; ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.strokeStyle='#1e293b'; ctx.lineWidth=1;
  for(let x=0;x<=10;x++) {ctx.beginPath();ctx.moveTo(x*CELL+0.5,0);ctx.lineTo(x*CELL+0.5,480);ctx.stroke();}
  for(let y=0;y<=20;y++) {ctx.beginPath();ctx.moveTo(0,y*CELL+0.5);ctx.lineTo(240,y*CELL+0.5);ctx.stroke();}
  snapshot.board.forEach((row,y)=>row.forEach((kind,x)=>{if(kind) this.cell(x,y,kind);}));
  if(snapshot.active) for(const {x,y} of occupied(snapshot.active)) this.cell(x,y,snapshot.active.kind);
 }
 private cell(x:number,y:number,kind:Kind):void {
  this.context.fillStyle=colors[kind]; this.context.fillRect(x*CELL+1,y*CELL+1,CELL-2,CELL-2);
 }
}
