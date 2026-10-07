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
