/** Stateless board drawing from detached snapshots; shared geometry prevents rotation drift. */
import { occupied, shape } from '../engine/pieces';
import type { Kind, Snapshot } from '../engine/types';
const colors: Record<Kind,string>={I:'#22d3ee',J:'#60a5fa',L:'#fb923c',O:'#facc15',S:'#4ade80',T:'#c084fc',Z:'#f87171'};
const CELL=24;
export class Renderer {
 constructor(private readonly context: CanvasRenderingContext2D,private readonly previewContext?:CanvasRenderingContext2D,private readonly heldContext?:CanvasRenderingContext2D) {
  context.canvas.width=10*CELL; context.canvas.height=20*CELL;
  for(const miniature of [previewContext,heldContext])if(miniature){miniature.canvas.width=4*CELL;miniature.canvas.height=4*CELL;}
 }
 /** Draw locked cells, ghost, active piece and optional orientation-zero next/held previews; remove stale cells each time. */
 draw(snapshot: Snapshot): void {
  const ctx=this.context; ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.strokeStyle='#1e293b'; ctx.lineWidth=1;
  for(let x=0;x<=10;x++) {ctx.beginPath();ctx.moveTo(x*CELL+0.5,0);ctx.lineTo(x*CELL+0.5,480);ctx.stroke();}
  for(let y=0;y<=20;y++) {ctx.beginPath();ctx.moveTo(0,y*CELL+0.5);ctx.lineTo(240,y*CELL+0.5);ctx.stroke();}
  snapshot.board.forEach((row,y)=>row.forEach((kind,x)=>{if(kind) this.cell(x,y,kind);}));
  // Draw prediction first so grounded active cells cover its outline.
  if(snapshot.ghost){
   ctx.strokeStyle='#94a3b8';ctx.lineWidth=2;
   for(const {x,y} of occupied(snapshot.ghost))ctx.strokeRect(x*CELL+3,y*CELL+3,CELL-6,CELL-6);
  }
  if(snapshot.active) for(const {x,y} of occupied(snapshot.active)) this.cell(x,y,snapshot.active.kind);
  if(this.previewContext)this.miniature(this.previewContext,snapshot.preview);
  if(this.heldContext)this.miniature(this.heldContext,snapshot.held);
 }
 /** Both panels use normal orientation; clearing a null slot removes stale pixels. */
 private miniature(context:CanvasRenderingContext2D,kind:Kind|null):void {
  context.fillStyle='#0f172a';context.fillRect(0,0,96,96);
  if(kind){const offset=kind==='O'?1:0;for(const {x,y} of shape(kind,0))this.cell(x+offset,y+offset,kind,context);}
 }

 private cell(x:number,y:number,kind:Kind,context=this.context):void {
  context.fillStyle=colors[kind]; context.fillRect(x*CELL+1,y*CELL+1,CELL-2,CELL-2);
 }
}
