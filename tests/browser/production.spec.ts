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

test('production play requests only same-origin static files without sockets or harnesses',async({page})=>{
 const requests:{url:string;method:string}[]=[],sockets:string[]=[],errors:string[]=[];
 page.on('request',r=>requests.push({url:r.url(),method:r.method()}));page.on('websocket',s=>sockets.push(s.url()));page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.route('**/*',route=>new URL(route.request().url()).origin===production?route.continue():route.abort());
 await page.goto(production);await expect(page.getByRole('status')).toHaveText('Running');
 await page.keyboard.press('c');await page.keyboard.press('ArrowUp');await page.keyboard.press('Space');await page.keyboard.press('ArrowDown');await page.keyboard.press('p');await page.getByRole('button',{name:'Restart',exact:true}).click();
 expect(requests.some(r=>r.url.endsWith('.js'))).toBe(true);expect(requests.some(r=>r.url.endsWith('.css'))).toBe(true);
 for(const r of requests){expect(new URL(r.url).origin).toBe(production);expect(r.method).toBe('GET');expect(new URL(r.url).pathname).toMatch(/^\/$|^\/assets\/[^/]+\.(js|css)$/);}
 expect(sockets).toEqual([]);expect(errors).toEqual([]);await expect(page.locator('#snapshot,#tick,#dispose')).toHaveCount(0);
});

test('shipped controls combine ghost, hold, wall kick and delayed drop without a harness',async({page},info)=>{
 await page.addInitScript(()=>{Math.random=()=>.999;});await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));await page.goto(production);
 const image=(id:string)=>page.locator('#'+id).evaluate(c=>(c as HTMLCanvasElement).toDataURL());
 const ghostPixel=(x:number,y:number)=>page.locator('#board').evaluate((c,{x,y})=>Array.from((c as HTMLCanvasElement).getContext('2d')!.getImageData(x*24+3,y*24+3,1,1).data),{x,y});
 expect(await ghostPixel(3,19)).toEqual([148,163,184,255]);await expect(page.locator('#hold-state')).toHaveText('Empty · Available');
 await page.keyboard.press('c');await expect(page.locator('#hold-state')).toHaveText('Unavailable until lock');const held=await image('held'),preview=await image('preview');
 await page.keyboard.press('ArrowUp');for(let i=0;i<4;i++)await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowUp');
 expect(await cells(page)).toEqual([{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:2,y:2}]);expect(await ghostPixel(0,18)).toEqual([148,163,184,255]);
 await page.keyboard.press('Space');expect(await cells(page)).toEqual([{x:0,y:18},{x:1,y:18},{x:2,y:18},{x:2,y:19}]);expect(await image('held')).toBe(held);expect(await image('preview')).toBe(preview);await expect(page.locator('#score')).toHaveText('0');
 await page.keyboard.press('ArrowRight');expect(await cells(page)).toEqual([{x:1,y:18},{x:2,y:18},{x:3,y:18},{x:3,y:19}]);
 expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeLessThanOrEqual(600);await page.screenshot({path:info.outputPath('piece-controls-page.png')});await page.clock.runFor(1100);expect(await cells(page)).toHaveLength(8);await expect(page.locator('#hold-state')).toHaveText('Available');
 const afterLockPreview=await image('preview');await page.keyboard.press('c');expect(await image('preview')).toBe(afterLockPreview);expect(await image('held')).not.toBe(held);await expect(page.locator('#hold-state')).toHaveText('Unavailable until lock');
 await page.keyboard.press('r');await expect(page.locator('#hold-state')).toHaveText('Empty · Available');expect(await cells(page)).toEqual([{x:3,y:1},{x:4,y:1},{x:5,y:1},{x:6,y:1}]);await expect(page.locator('#snapshot,#tick,#dispose')).toHaveCount(0);
});
