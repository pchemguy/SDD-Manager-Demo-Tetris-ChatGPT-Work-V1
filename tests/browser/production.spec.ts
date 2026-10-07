/** Real shipped entry under static HTTP; no production test API or engine substitution. */
import {expect,test,type Page} from '@playwright/test';
const production='http://127.0.0.1:4173';
async function cells(page:Page){return page.locator('#board').evaluate(canvas=>{
 const ctx=(canvas as HTMLCanvasElement).getContext('2d')!;const result:{x:number;y:number}[]=[];
 for(let y=0;y<20;y++)for(let x=0;x<10;x++){const p=ctx.getImageData(x*24+12,y*24+12,1,1).data;if(p[0]!==15||p[1]!==23||p[2]!==42)result.push({x,y});}return result;
});}
test('built ordinary page plays, pauses, reaches game over and restarts',async({page},info)=>{
 test.setTimeout(60000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 // Controlled browser randomness/time, while running the unchanged shipped application.
 await page.addInitScript(()=>{Math.random=()=>.999;});
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));
 await page.goto(production);await expect(page.getByRole('status')).toHaveText('Running');
 const initial=[{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1}];expect(await cells(page)).toEqual(initial);
 await page.keyboard.press('ArrowLeft');expect(await cells(page)).toEqual(initial.map(c=>({...c,x:c.x-1})));
 await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowUp');expect(await cells(page)).not.toEqual(initial);
 await page.keyboard.press('p');const frozen=await cells(page);await page.clock.runFor(2500);expect(await cells(page)).toEqual(frozen);
 await page.getByRole('button',{name:'Resume',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Running');
 await page.locator('#game').focus();await page.keyboard.press('r');expect(await cells(page)).toEqual(initial);
 for(let i=0;i<20&&(await page.getByRole('status').textContent())!=='Game over';i++){
  await page.locator('#game').evaluate(el=>{for(let j=0;j<20;j++)el.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true}));});
  await page.clock.runFor(1100);
 }
 await expect(page.getByRole('status')).toHaveText('Game over');await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeDisabled();
 await page.screenshot({path:info.outputPath('production-game-over.png')});
 const final=await cells(page);await page.keyboard.press('ArrowLeft');await page.clock.runFor(1200);expect(await cells(page)).toEqual(final);
 await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Running');expect(await cells(page)).toEqual(initial);
 for(const id of ['score','lines'])await expect(page.locator('#'+id)).toHaveText('0');await expect(page.locator('#level')).toHaveText('1');
 await page.screenshot({path:info.outputPath('production-page.png')});expect(errors).toEqual([]);
});
