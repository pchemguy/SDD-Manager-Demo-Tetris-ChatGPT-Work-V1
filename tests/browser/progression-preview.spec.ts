import {expect,test,type Page} from '@playwright/test';
async function previewPixels(page:Page){return page.locator('#preview').evaluate(canvas=>{
 const ctx=(canvas as HTMLCanvasElement).getContext('2d')!;
 return Array.from({length:4},(_,y)=>Array.from({length:4},(_,x)=>Array.from(ctx.getImageData(x*24+12,y*24+12,1,1).data)));
});}
test('ordinary startup presents initial counters and a real four-cell preview',async({page},info)=>{
 await page.goto('/');await expect(page.getByRole('status')).toHaveText('Running');
 await expect(page.locator('#score')).toHaveText('0');await expect(page.locator('#lines')).toHaveText('0');await expect(page.locator('#level')).toHaveText('1');
 const pixels=(await previewPixels(page)).flat();expect(pixels.filter(p=>p[3]===255&&(p[0]!==15||p[1]!==23||p[2]!==42))).toHaveLength(4);
 await page.screenshot({path:info.outputPath('scored-page.png')});
});
test('level-boundary clear updates counters and promotes the orientation-zero preview',async({page})=>{
 await page.goto('/tests/fixtures/playable.html?mode=progress');
 await expect(page.locator('#score')).toHaveText('1200');await expect(page.locator('#lines')).toHaveText('8');await expect(page.locator('#level')).toHaveText('1');
 const before=await previewPixels(page);
 for(let y=0;y<4;y++)for(let x=0;x<4;x++)expect(before[y]![x]).toEqual((y===0&&x===1)||(y===1&&x<=2)?[192,132,252,255]:[15,23,42,255]);
 for(let i=0;i<4;i++)await page.keyboard.press('ArrowRight');for(let i=0;i<20;i++)await page.keyboard.press('ArrowDown');
 await page.getByRole('button',{name:'Advance one second'}).click();
 await expect(page.locator('#score')).toHaveText('1500');await expect(page.locator('#lines')).toHaveText('10');await expect(page.locator('#level')).toHaveText('2');
 const snapshot=JSON.parse((await page.locator('#snapshot').textContent())!);expect(snapshot.active).toEqual({kind:'T',orientation:0,x:3,y:0});expect(snapshot.preview).toBe('I');
 const after=await previewPixels(page);for(let y=0;y<4;y++)for(let x=0;x<4;x++)expect(after[y]![x]).toEqual(y===1?[34,211,238,255]:[15,23,42,255]);
});
// Additional coverage of already-working previews uses literal SPEC geometry and colors.
for(const [kind,occupied,color] of [
 ['I',[[0,1],[1,1],[2,1],[3,1]],[34,211,238,255]],
 ['J',[[0,0],[0,1],[1,1],[2,1]],[96,165,250,255]],
 ['L',[[2,0],[0,1],[1,1],[2,1]],[251,146,60,255]],
 ['O',[[1,1],[2,1],[1,2],[2,2]],[250,204,21,255]],
 ['S',[[1,0],[2,0],[0,1],[1,1]],[74,222,128,255]],
 ['T',[[1,0],[0,1],[1,1],[2,1]],[192,132,252,255]],
 ['Z',[[0,0],[1,0],[1,1],[2,1]],[248,113,113,255]],
] as const){test(`${kind} preview matches its unrotated occupied cells`,async({page})=>{
 await page.goto(`/tests/fixtures/playable.html?mode=preview&kind=${kind}`);const pixels=await previewPixels(page);
 for(let y=0;y<4;y++)for(let x=0;x<4;x++)expect(pixels[y]![x]).toEqual(occupied.some(c=>c[0]===x&&c[1]===y)?[...color]:[15,23,42,255]);
});}
