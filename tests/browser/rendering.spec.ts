/** Canvas pixels correspond to detached engine snapshots. */
import { expect, test, type Page } from '@playwright/test';
async function pixels(page:Page) {
 return page.locator('canvas').evaluate(canvas=>{
  const c=canvas as HTMLCanvasElement, ctx=c.getContext('2d')!;
  return Array.from({length:20},(_,y)=>Array.from({length:10},(_,x)=>Array.from(ctx.getImageData(x*24+12,y*24+12,1,1).data)));
 });
}
test('draws the real snapshot at exact occupied/empty locations and redraws moved cells',async({page},info)=>{
 await page.goto('/tests/fixtures/rendering.html'); await expect(page.locator('#snapshot')).toContainText('running');
 const snapshot=JSON.parse((await page.locator('#snapshot').textContent())!);
 expect(snapshot.active).toEqual({kind:'T',orientation:0,x:3,y:0}); expect(snapshot.board[19].slice(0,3)).toEqual(['O','O',null]);
 const initial=await pixels(page);
 for(let y=0;y<20;y++) for(let x=0;x<10;x++) {
  const locked=y>=18&&x<2, active=(y===0&&x===4)||(y===1&&x>=3&&x<=5);
  expect(initial[y]![x],`cell ${x},${y}`).toEqual(locked?[250,204,21,255]:active?[192,132,252,255]:[15,23,42,255]);
 }
 await page.getByRole('button',{name:'Drop one cell'}).click();
 const moved=await pixels(page); expect(moved[0]![4]).toEqual([15,23,42,255]); expect(moved[2]![3]).toEqual([192,132,252,255]); expect(moved[19]![0]).toEqual([250,204,21,255]);
 const bounds=await page.locator('canvas').boundingBox(); expect(bounds!.width/bounds!.height).toBe(0.5);
 await page.locator('canvas').screenshot({path:info.outputPath('rendered-board.png')});
});

test('ghost outline follows the snapshot and active cells cover overlap',async({page},info)=>{
 await page.goto('/tests/fixtures/playable.html?mode=rotate');
 const ghostPixel=()=>page.locator('#board').evaluate(c=>Array.from((c as HTMLCanvasElement).getContext('2d')!.getImageData(4*24+3,18*24+3,1,1).data));
 expect(await ghostPixel()).toEqual([148,163,184,255]);
 await page.keyboard.press('p');const frozen=await page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL());
 await page.getByRole('button',{name:'Advance one second'}).click();expect(await page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL())).toBe(frozen);
 await page.locator('#game').focus();await page.keyboard.press('p');
 for(let i=0;i<20;i++)await page.keyboard.press('ArrowDown');
 expect(await ghostPixel()).toEqual([192,132,252,255]);
 await page.screenshot({path:info.outputPath('ghost-overlap.png')});
});
test('ordinary page shows a ghost which redraws after movement',async({page})=>{
 await page.addInitScript(()=>{Math.random=()=>.999;});await page.goto('/');
 const pixel=()=>page.locator('#board').evaluate(c=>Array.from((c as HTMLCanvasElement).getContext('2d')!.getImageData(3*24+3,19*24+3,1,1).data));
 expect(await pixel()).toEqual([148,163,184,255]);await page.keyboard.press('ArrowRight');expect(await pixel()).toEqual([15,23,42,255]);
});
