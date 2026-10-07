/** Own one frame chain and input subscription; gameplay rules remain in the engine. */
import type { Game } from '../engine/game';
import type { Snapshot } from '../engine/types';
import { keyboard } from './keyboard';
export interface Scheduler { request(callback:FrameRequestCallback):number; cancel(handle:number):void }
export const browserScheduler:Scheduler={request:callback=>requestAnimationFrame(callback),cancel:handle=>cancelAnimationFrame(handle)};
export class Controller {
 private running=false;
 private handle:number|null=null;
 private previous:number|null=null;
 private unsubscribe:(()=>void)|null=null;
 constructor(private readonly game:Game,private readonly region:HTMLElement,
  private readonly present:(snapshot:Snapshot)=>void,private readonly scheduler:Scheduler=browserScheduler) {}
 /** Repeated starts do not add subscriptions or parallel frame chains. */
 start():void {
  if(this.running) return;
  this.running=true;this.previous=null;
  this.unsubscribe=keyboard(this.region,action=>{this.game.action(action);this.present(this.game.snapshot());});
  this.present(this.game.snapshot());this.handle=this.scheduler.request(this.frame);
 }
 /** Release this controller's resources. Full fault/interrupt handling is delivered later. */
 dispose():void {
  this.running=false;if(this.handle!==null)this.scheduler.cancel(this.handle);
  this.handle=null;this.previous=null;this.unsubscribe?.();this.unsubscribe=null;
 }
 private readonly frame:FrameRequestCallback=(time)=>{
  if(!this.running)return;
  this.handle=null;
  if(this.previous!==null)this.game.advance(time-this.previous);
  this.previous=time;this.present(this.game.snapshot());
  this.handle=this.scheduler.request(this.frame);
 };
}
