/** Assemble the independent engine, browser adapters and snapshot presentation. */
import './style.css';
import { Game } from './engine/game';
import { bagSource } from './engine/piece-source';
import { Controller } from './session/controller';
import { Renderer } from './view/renderer';
import { showStatus } from './view/status';
const region=document.querySelector<HTMLElement>('#game')!;
const canvas=document.querySelector<HTMLCanvasElement>('#board')!;
const status=document.querySelector<HTMLElement>('#status')!;
const renderer=new Renderer(canvas.getContext('2d')!,document.querySelector<HTMLCanvasElement>('#preview')!.getContext('2d')!);
const counters={score:document.querySelector<HTMLElement>('#score')!,level:document.querySelector<HTMLElement>('#level')!,lines:document.querySelector<HTMLElement>('#lines')!};
const controls={pause:document.querySelector<HTMLButtonElement>('#pause')!,restart:document.querySelector<HTMLButtonElement>('#restart')!};
const controller=new Controller(new Game(bagSource()),region,snapshot=>{renderer.draw(snapshot);showStatus(status,snapshot,counters,controls);},undefined,{controls});
region.focus();controller.start();
