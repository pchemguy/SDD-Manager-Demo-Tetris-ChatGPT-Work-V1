/** Real controller/input/view with finite sources and a controllable frame scheduler. */
import { KINDS } from '../../src/engine/types';
import { Game } from '../../src/engine/game';
import { Controller, type Scheduler } from '../../src/session/controller';
import { Renderer } from '../../src/view/renderer';
import { showStatus } from '../../src/view/status';
import { sequenceSource } from '../support/piece-source';
import { lockGrounded, moveTo } from '../support/scenarios';
const mode=new URLSearchParams(location.search).get('mode');
const previewKind=KINDS.find(kind=>kind===new URLSearchParams(location.search).get('kind'))??'T';
const game=new Game(sequenceSource(mode==='hold'?[previewKind,'I','O','T']:mode==='preview'?['O',previewKind,'I']:mode==='rotate'?['T','I','O']:mode==='progress'?[...Array(25).fill('O'),'T','I','L']:Array(30).fill('O')));
if(mode==='hold')game.action('hold');
if(mode==='progress') {for(let i=0;i<4;i++)for(const x of [0,2,4,6,8]){moveTo(game,x);lockGrounded(game);}for(const x of [0,2,4,6]){moveTo(game,x);lockGrounded(game);}}
if(mode==='clear') for(const x of [0,2,4,6]) {moveTo(game,x);lockGrounded(game);}
if(mode==='over') for(let i=0;i<9;i++) lockGrounded(game);
let handle=0, time=0; const pending=new Map<number,FrameRequestCallback>();
const scheduler:Scheduler={request(callback){pending.set(++handle,callback);return handle;},cancel(id){pending.delete(id);}};
function frame() {const callbacks=[...pending.values()];pending.clear();for(const callback of callbacks) callback(time);}
const region=document.querySelector<HTMLElement>('#game')!;
const renderer=new Renderer(document.querySelector<HTMLCanvasElement>('#board')!.getContext('2d')!,document.querySelector<HTMLCanvasElement>('#preview')!.getContext('2d')!,document.querySelector<HTMLCanvasElement>('#held')!.getContext('2d')!);
const controller=new Controller(game,region,snapshot=>{
 renderer.draw(snapshot);showStatus(document.querySelector<HTMLElement>('#status')!,snapshot,{score:document.querySelector<HTMLElement>('#score')!,level:document.querySelector<HTMLElement>('#level')!,lines:document.querySelector<HTMLElement>('#lines')!},undefined,document.querySelector<HTMLElement>('#hold-state')!);
 document.querySelector('#snapshot')!.textContent=JSON.stringify(snapshot);
},scheduler,{freshSource:()=>sequenceSource(['T','I','O','Z'])});
region.focus();controller.start();frame();
document.querySelector('#tick')!.addEventListener('click',()=>{time+=1000;frame();});
