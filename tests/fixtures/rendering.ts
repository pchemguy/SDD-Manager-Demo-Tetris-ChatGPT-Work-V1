/** Isolated real-engine fixture; no production state-loading API or debug global. */
import { Game } from '../../src/engine/game';
import { Renderer } from '../../src/view/renderer';
import { sequenceSource } from '../support/piece-source';
import { lockGrounded, moveTo } from '../support/scenarios';
const game=new Game(sequenceSource(['O','T','I'])); moveTo(game,0); lockGrounded(game);
const canvas=document.querySelector<HTMLCanvasElement>('#board')!;
const renderer=new Renderer(canvas.getContext('2d')!);
function draw() { renderer.draw(game.snapshot()); document.querySelector('#snapshot')!.textContent=JSON.stringify(game.snapshot()); }
document.querySelector('#down')!.addEventListener('click',()=>{game.action('down');draw();}); draw();
