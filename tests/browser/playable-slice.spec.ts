import { expect, test, type Page } from '@playwright/test';
async function cells(page:Page) {
 return page.locator('#board').evaluate(canvas=>{
  const ctx=(canvas as HTMLCanvasElement).getContext('2d')!; const cells:{x:number;y:number}[]=[];
  for(let y=0;y<20;y++) for(let x=0;x<10;x++) {const p=ctx.getImageData(x*24+12,y*24+12,1,1).data;if(p[0]!==15||p[1]!==23||p[2]!==42) cells.push({x,y});}
  return cells;
 });
}
async function snapshot(page:Page) {return JSON.parse((await page.locator('#snapshot').textContent())!);}
test('ordinary page responds to real keys and scheduled gravity, then locks',async({page},info)=>{
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));
 await page.goto('/');await expect(page.getByRole('status')).toHaveText('Running');
 const initial=await cells(page);expect(initial).toHaveLength(4);
 await page.keyboard.press('ArrowLeft');expect(await cells(page)).toEqual(initial.map(c=>({...c,x:c.x-1})));
 await page.keyboard.press('ArrowRight');expect(await cells(page)).toEqual(initial);
 await page.keyboard.press('ArrowDown');expect(await cells(page)).toEqual(initial.map(c=>({...c,y:c.y+1})));
 await page.clock.runFor(1100);expect(await cells(page)).toEqual(initial.map(c=>({...c,y:c.y+2})));
 for(let i=0;i<20;i++) await page.keyboard.press('ArrowDown');
 const resting=await cells(page);expect(resting).toHaveLength(4);expect(Math.max(...resting.map(c=>c.y))).toBe(19);
 await page.keyboard.press('ArrowDown');expect(await cells(page)).toEqual(resting);
 await page.clock.runFor(1000);expect(await cells(page)).toHaveLength(8);await expect(page.getByRole('status')).toHaveText('Running');
 await page.screenshot({path:info.outputPath('playable-page.png')});
});
test('controlled keyboard rotation uses the specified clockwise frame',async({page})=>{
 await page.goto('/tests/fixtures/playable.html?mode=rotate');await page.keyboard.press('ArrowUp');
 expect((await snapshot(page)).active).toEqual({kind:'T',orientation:1,x:3,y:0});
});
test('controlled keyboard play clears two rows on the next tick',async({page})=>{
 await page.goto('/tests/fixtures/playable.html?mode=clear');for(let i=0;i<4;i++) await page.keyboard.press('ArrowRight');for(let i=0;i<20;i++) await page.keyboard.press('ArrowDown');
 const grounded=await snapshot(page);expect(grounded.active.y).toBe(18);expect(grounded.board.flat().filter(Boolean)).toHaveLength(16);
 await page.keyboard.press('ArrowDown');expect(await snapshot(page)).toEqual(grounded);
 await page.getByRole('button',{name:'Advance one second'}).click();expect((await snapshot(page)).board.flat().filter(Boolean)).toHaveLength(0);expect(await cells(page)).toHaveLength(4);
});
test('blocked spawn shows game over and later inputs/time preserve the final board',async({page})=>{
 await page.goto('/tests/fixtures/playable.html?mode=over');await page.getByRole('button',{name:'Advance one second'}).click();
 await expect(page.getByRole('status')).toHaveText('Game over');const final=await snapshot(page);expect(final.active).toBeNull();expect(final.board.flat().filter(Boolean)).toHaveLength(40);
 await page.locator('#game').focus();await page.keyboard.press('ArrowLeft');await page.keyboard.press('ArrowDown');await page.getByRole('button',{name:'Advance one second'}).click();expect(await snapshot(page)).toEqual(final);expect(await cells(page)).toHaveLength(40);
});
