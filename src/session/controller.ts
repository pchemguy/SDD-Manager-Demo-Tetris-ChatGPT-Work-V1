/** Own one frame chain and input subscription; gameplay rules remain in the engine. */
import type { Game } from '../engine/game';
import { bagSource } from '../engine/piece-source';
import type { PieceSource, Snapshot } from '../engine/types';
import type { Controls } from '../view/status';
import { keyboard, type Command } from './keyboard';
export interface Scheduler { request(callback:FrameRequestCallback):number; cancel(handle:number):void }
export const browserScheduler:Scheduler={request:callback=>requestAnimationFrame(callback),cancel:handle=>cancelAnimationFrame(handle)};
export interface ControllerOptions {controls?:Controls;freshSource?:()=>PieceSource}
export class Controller {
 private running=false;
 private handle:number|null=null;
 private previous:number|null=null;
 private unsubscribe:(()=>void)|null=null;
 constructor(private readonly game:Game,private readonly region:HTMLElement,
  private readonly present:(snapshot:Snapshot)=>void,private readonly scheduler:Scheduler=browserScheduler,private readonly options:ControllerOptions={}) {}
 /** Repeated starts do not add subscriptions or parallel frame chains. */
 start():void {
  if(this.running) return;
  this.running=true;this.previous=null;
  const offKeys=keyboard(this.region,command=>this.command(command));
  const pause=()=>this.command('pause'),restart=()=>this.command('restart');
  const focus=(event:MouseEvent)=>{if((event.target as Element).closest('canvas'))this.region.focus();};
  this.region.addEventListener('click',focus);
  this.options.controls?.pause.addEventListener('click',pause);this.options.controls?.restart.addEventListener('click',restart);
  this.unsubscribe=()=>{offKeys();this.region.removeEventListener('click',focus);this.options.controls?.pause.removeEventListener('click',pause);this.options.controls?.restart.removeEventListener('click',restart);};
  this.present(this.game.snapshot());this.handle=this.scheduler.request(this.frame);
 }
 /** Route keys and buttons through one semantic command path. */
 command(command:Command):void {
  if(!this.running)return;
  if(command==='pause') {if(this.game.snapshot().status==='paused')this.game.resume();else this.game.pause();this.previous=null;}
  else if(command==='restart'){this.game.restart((this.options.freshSource??bagSource)());this.previous=null;}
  else this.game.action(command);
  this.present(this.game.snapshot());
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
