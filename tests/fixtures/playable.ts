/** Real controller/input/view with finite sources and a controllable frame scheduler. */
import { Game } from '../../src/engine/game';
import { Controller, type Scheduler } from '../../src/session/controller';
import { Renderer } from '../../src/view/renderer';
import { showStatus } from '../../src/view/status';
import { sequenceSource } from '../support/piece-source';
import { lockGrounded, moveTo } from '../support/scenarios';
const mode=new URLSearchParams(location.search).get('mode');
const game=new Game(sequenceSource(mode==='rotate'?['T','I','O']:Array(30).fill('O')));
if(mode==='clear') for(const x of [0,2,4,6]) {moveTo(game,x);lockGrounded(game);}
if(mode==='over') for(let i=0;i<9;i++) lockGrounded(game);
let handle=0, time=0; const pending=new Map<number,FrameRequestCallback>();
const scheduler:Scheduler={request(callback){pending.set(++handle,callback);return handle;},cancel(id){pending.delete(id);}};
function frame() {const callbacks=[...pending.values()];pending.clear();for(const callback of callbacks) callback(time);}
const region=document.querySelector<HTMLElement>('#game')!;
const renderer=new Renderer(document.querySelector<HTMLCanvasElement>('#board')!.getContext('2d')!);
const controller=new Controller(game,region,snapshot=>{
 renderer.draw(snapshot);showStatus(document.querySelector<HTMLElement>('#status')!,snapshot);
 document.querySelector('#snapshot')!.textContent=JSON.stringify(snapshot);
},scheduler);
controller.start();frame();region.focus();
document.querySelector('#tick')!.addEventListener('click',()=>{time+=1000;frame();});
