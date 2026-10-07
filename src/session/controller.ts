/** Own browser input, interruption subscriptions and one animation-frame chain. */
import type { Game } from '../engine/game';
import { bagSource } from '../engine/piece-source';
import type { PieceSource, Snapshot } from '../engine/types';
import type { Controls } from '../view/status';
import { keyboard, type Command } from './keyboard';

export interface Scheduler { request(callback:FrameRequestCallback):number; cancel(handle:number):void }
export const browserScheduler:Scheduler={request:callback=>requestAnimationFrame(callback),cancel:handle=>cancelAnimationFrame(handle)};
/** Injected lifecycle adapters permit deterministic checks without browser globals. */
export interface Lifecycle {window:EventTarget;document:EventTarget;eligible:()=>boolean}
export interface ControllerOptions {
 controls?:Controls;
 freshSource?:()=>PieceSource;
 lifecycle?:Lifecycle;
 /** Entry-owned sanitized error display; the original exception is never exposed. */
 onError?:()=>void;
}
export class Controller {
 private running=false;
 private disposed=false;
 private faulted=false;
 private lifecycle:Lifecycle|null=null;
 private handle:number|null=null;
 private previous:number|null=null;
 private unsubscribe:(()=>void)|null=null;
 constructor(private readonly game:Game,private readonly region:HTMLElement,
  private readonly present:(snapshot:Snapshot)=>void,private readonly scheduler:Scheduler=browserScheduler,
  private readonly options:ControllerOptions={}) {}

 /** Present immediately; repeated starts do not duplicate subscriptions or frames. */
 start():void {
  if(this.running||this.disposed)return;
  this.run(()=>{
   this.running=true;this.previous=null;
   const doc=this.region.ownerDocument;
   this.lifecycle=this.options.lifecycle??{window:doc.defaultView!,document:doc,eligible:()=>!doc.hidden&&doc.hasFocus()};
   const blur=()=>this.interrupt();
   const visibility=()=>{if(!this.lifecycle!.eligible())this.interrupt();};
   const pagehide=()=>this.dispose();
   const offKeys=keyboard(this.region,command=>this.command(command));
   const pause=()=>this.command('pause'),restart=()=>this.command('restart');
   const focus=(event:MouseEvent)=>{if((event.target as Element)?.closest?.('canvas'))this.region.focus();};
   this.lifecycle.window.addEventListener('blur',blur);
   this.lifecycle.window.addEventListener('pagehide',pagehide);
   this.lifecycle.document.addEventListener('visibilitychange',visibility);
   this.region.addEventListener('click',focus);
   this.options.controls?.pause.addEventListener('click',pause);
   this.options.controls?.restart.addEventListener('click',restart);
   this.unsubscribe=()=>{
    offKeys();this.lifecycle?.window.removeEventListener('blur',blur);
    this.lifecycle?.window.removeEventListener('pagehide',pagehide);
    this.lifecycle?.document.removeEventListener('visibilitychange',visibility);
    this.region.removeEventListener('click',focus);
    this.options.controls?.pause.removeEventListener('click',pause);
    this.options.controls?.restart.removeEventListener('click',restart);
   };
   if(!this.lifecycle.eligible())this.game.pause();
   this.present(this.game.snapshot());this.handle=this.scheduler.request(this.frame);
  });
 }

 /** Keys and buttons share commands; restart creates a fresh source without new listeners. */
 command(command:Command):void {
  if(!this.running)return;
  this.run(()=>{
   if(command==='pause') {
    if(this.game.snapshot().status==='paused'){if(this.lifecycle!.eligible())this.game.resume();}
    else this.game.pause();
    this.previous=null;
   }else if(command==='restart') {
    this.game.restart((this.options.freshSource??bagSource)());
    if(!this.lifecycle!.eligible())this.game.pause();
    this.previous=null;
   }else this.game.action(command);
   this.present(this.game.snapshot());
  });
 }

 /** Permanently stop this instance, cancel its pending frame and remove owned listeners. */
 dispose():void {
  if(this.disposed)return;
  this.disposed=true;this.running=false;this.previous=null;
  try {if(this.handle!==null)this.scheduler.cancel(this.handle);}
  catch {this.notifyFault();}
  finally {this.handle=null;this.unsubscribe?.();this.unsubscribe=null;}
 }
 private interrupt():void {
  if(!this.running)return;
  this.run(()=>{this.game.pause();this.previous=null;this.present(this.game.snapshot());});
 }
 /** Faults retain the last presented snapshot and release processing resources. */
 private run(work:()=>void):void {
  if(this.disposed)return;
  try {work();}catch {this.dispose();this.notifyFault();}
 }
 private notifyFault():void {
  if(this.faulted)return;
  this.faulted=true;
  if(this.options.controls){this.options.controls.pause.disabled=true;this.options.controls.restart.disabled=true;}
  this.options.onError?.();
 }
 private readonly frame:FrameRequestCallback=time=>{
  if(!this.running)return;
  this.run(()=>{
   this.handle=null;
   if(!this.lifecycle!.eligible())this.game.pause();
   if(this.game.snapshot().status==='running') {
    if(this.previous!==null)this.game.advance(time-this.previous);
    this.previous=time;
   }else this.previous=null;
   this.present(this.game.snapshot());this.handle=this.scheduler.request(this.frame);
  });
 };
}
