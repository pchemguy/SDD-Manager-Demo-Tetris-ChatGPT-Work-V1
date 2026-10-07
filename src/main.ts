/** Validate browser prerequisites before assembling a single gameplay application. */
import './style.css';
import { Game } from './engine/game';
import { bagSource } from './engine/piece-source';
import { Controller } from './session/controller';
import { Renderer } from './view/renderer';
import { showError,showStatus } from './view/status';

/** Missing page elements/contexts never leave an active partial session. */
function initialize(doc:Document):void {
 let controller:Controller|null=null;
 try {
  const required=<T extends HTMLElement>(id:string,tag?:string):T=>{
   const element=doc.getElementById(id);if(!element||(tag&&element.tagName!==tag))throw new Error('Missing page element');
   return element as T;
  };
  const region=required<HTMLElement>('game');
  const board=required<HTMLCanvasElement>('board','CANVAS'),preview=required<HTMLCanvasElement>('preview','CANVAS');
  const held=required<HTMLCanvasElement>('held','CANVAS'),holdState=required<HTMLElement>('hold-state','P');
  const status=required<HTMLElement>('status');
  const counters={score:required<HTMLElement>('score'),level:required<HTMLElement>('level'),lines:required<HTMLElement>('lines')};
  const controls={pause:required<HTMLButtonElement>('pause','BUTTON'),restart:required<HTMLButtonElement>('restart','BUTTON')};
  const boardContext=board.getContext('2d'),previewContext=preview.getContext('2d'),heldContext=held.getContext('2d');
  if(!boardContext||!previewContext||!heldContext)throw new Error('Canvas 2D unavailable');
  const renderer=new Renderer(boardContext,previewContext,heldContext);
  controller=new Controller(new Game(bagSource()),region,snapshot=>{renderer.draw(snapshot);showStatus(status,snapshot,counters,controls,holdState);},undefined,{controls,onError:()=>showError(doc,'Game stopped because of an internal failure. Reload this page to start again.')});
  region.focus();controller.start();
 }catch {
  controller?.dispose();
  showError(doc,'Game unavailable. This browser could not initialize the game. Reload this page and try again.');
 }
}
initialize(document);
