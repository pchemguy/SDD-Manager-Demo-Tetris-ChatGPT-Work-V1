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
const renderer=new Renderer(canvas.getContext('2d')!);
const controller=new Controller(new Game(bagSource()),region,snapshot=>{renderer.draw(snapshot);showStatus(status,snapshot);});
controller.start(); region.focus();
