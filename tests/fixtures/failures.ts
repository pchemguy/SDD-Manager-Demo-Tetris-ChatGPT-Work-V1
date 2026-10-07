/** Controlled runtime faults exercise real browser input/view and release ownership. */
import {Game} from '../../src/engine/game';
import type {Kind} from '../../src/engine/types';
import {Controller,type Scheduler} from '../../src/session/controller';
import {Renderer} from '../../src/view/renderer';
import {showError,showStatus} from '../../src/view/status';
import {sequenceSource} from '../support/piece-source';
import {ground} from '../support/scenarios';
const mode=new URLSearchParams(location.search).get('mode');
const region=document.querySelector<HTMLElement>('#game')!;
const controls={pause:document.querySelector<HTMLButtonElement>('#pause')!,restart:document.querySelector<HTMLButtonElement>('#restart')!};
const counters={score:document.querySelector<HTMLElement>('#score')!,level:document.querySelector<HTMLElement>('#level')!,lines:document.querySelector<HTMLElement>('#lines')!};
// Track only the application's target/event pairs; Playwright owns other DOM listeners.
const watched=new Map<EventTarget,readonly string[]>([[window,['blur','pagehide']],[document,['visibilitychange']],[region,['keydown','click']],[controls.pause,['click']],[controls.restart,['click']]]);
const owned:{target:EventTarget;type:string;listener:EventListenerOrEventListenerObject|null}[]=[];
const add=EventTarget.prototype.addEventListener,remove=EventTarget.prototype.removeEventListener;
function resources(){document.querySelector('#resources')!.textContent=JSON.stringify({listeners:owned.length,frames:pending.size});}
EventTarget.prototype.addEventListener=function(type,listener,options){if(watched.get(this)?.includes(type)){owned.push({target:this,type,listener});}add.call(this,type,listener,options);resources();};
EventTarget.prototype.removeEventListener=function(type,listener,options){const i=owned.findIndex(x=>x.target===this&&x.type===type&&x.listener===listener);if(i>=0)owned.splice(i,1);remove.call(this,type,listener,options);resources();};
let count=0,time=0;const pending=new Map<number,FrameRequestCallback>();
const scheduler:Scheduler={request(callback){if((mode==='initial-scheduler'&&count===0)||(mode==='scheduler'&&count===2))throw new Error('PRIVATE_DIAGNOSTIC');pending.set(++count,callback);resources();return count;},cancel(id){pending.delete(id);resources();}};
const kinds=mode==='invalid'?['O','T','X' as Kind]:mode==='exhausted'?['O','T']:['O','T','I','Z'];
const game=new Game(sequenceSource(kinds as Kind[]));ground(game);
const renderer=new Renderer(document.querySelector<HTMLCanvasElement>('#board')!.getContext('2d')!,document.querySelector<HTMLCanvasElement>('#preview')!.getContext('2d')!);
const controller=new Controller(game,region,s=>{renderer.draw(s);showStatus(document.querySelector('#status')!,s,counters,controls);document.querySelector('#snapshot')!.textContent=JSON.stringify(s);},scheduler,{controls,freshSource:()=>{throw new Error('PRIVATE_DIAGNOSTIC');},onError:()=>showError(document,'Game stopped because of an internal failure. Reload this page to start again.')});
function step(){const callbacks=[...pending.values()];pending.clear();for(const callback of callbacks)callback(time);resources();}
region.focus();controller.start();step();resources();
document.querySelector('#tick')!.addEventListener('click',()=>{time+=1000;step();});
document.querySelector('#dispose')!.addEventListener('click',()=>{controller.dispose();controller.dispose();controller.start();resources();});
