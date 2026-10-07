/** Desktop layout, native focus indication and preserved paused/terminal display. */
import {expect,test} from '@playwright/test';
test('800 by 600 page fits square board, preview, labels and visibly focused controls',async({page},info)=>{
 await page.goto('/');
 for(const id of ['held','hold-state','instructions','board','preview','status','score','level','lines','pause','restart']){
  const box=await page.locator('#'+id).boundingBox();expect(box).not.toBeNull();expect(box!.x).toBeGreaterThanOrEqual(0);expect(box!.y).toBeGreaterThanOrEqual(0);expect(box!.x+box!.width).toBeLessThanOrEqual(800);expect(box!.y+box!.height).toBeLessThanOrEqual(600);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(800);
 const board=await page.locator('#board').boundingBox();expect((board!.width-2)/10).toBe((board!.height-2)/20);
 await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeVisible();await expect(page.locator('#board')).toHaveAttribute('aria-label',/board/);
 await page.keyboard.press('Tab');await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeFocused();
 expect(await page.locator('#pause').evaluate(el=>parseFloat(getComputedStyle(el).outlineWidth))).toBeGreaterThan(0);
 const runningColor=await page.getByRole('status').evaluate(el=>getComputedStyle(el).color);
 await page.screenshot({path:info.outputPath('desktop-page.png')});
 await page.keyboard.press('Enter');await expect(page.getByRole('status')).toHaveText('Paused');
 expect(await page.getByRole('status').evaluate(el=>getComputedStyle(el).color)).not.toBe(runningColor);
 await page.screenshot({path:info.outputPath('paused-page.png')});
});
test('pause and game over preserve the scored board and text status',async({page})=>{
 await page.goto('/tests/fixtures/playable.html?mode=progress');const pixels=()=>page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL());
 const board=await pixels();await page.keyboard.press('p');await expect(page.getByRole('status')).toHaveText('Paused');await expect(page.locator('#score')).toHaveText('1200');expect(await pixels()===board).toBe(true);
 await page.goto('/tests/fixtures/playable.html?mode=over');await page.getByRole('button',{name:'Advance one second'}).click();await expect(page.getByRole('status')).toHaveText('Game over');
 const final=await pixels();await page.locator('#game').focus();await page.keyboard.press('p');await page.keyboard.press('ArrowDown');expect(await pixels()===final).toBe(true);await expect(page.locator('#score')).toHaveText('0');
});
