/** Failure output is safe, terminal and retains the last available drawing. */
import {expect,test} from '@playwright/test';
for(const mode of ['invalid','exhausted','scheduler','initial-scheduler','restart'])test(`${mode} stops resources and disables recovery controls`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/tests/fixtures/failures.html?mode='+mode);
 const pixels=()=>page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL());const before=await pixels();
 if(mode==='restart')await page.getByRole('button',{name:'Restart',exact:true}).click();else if(mode!=='initial-scheduler')await page.getByRole('button',{name:'Advance',exact:true}).click();
 await expect(page.getByRole('status')).toContainText('Game stopped');await expect(page.getByRole('button',{name:'Restart',exact:true})).toBeDisabled();
 await expect(page.locator('#resources')).toHaveText('{"listeners":0,"frames":0}');
 if(mode==='invalid'||mode==='exhausted')expect(await pixels()===before).toBe(true);
 const final=await pixels();await page.locator('#game').focus();await page.keyboard.press('r');await page.keyboard.press('ArrowDown');await page.getByRole('button',{name:'Advance',exact:true}).click();expect(await pixels()===final).toBe(true);
 expect(await page.locator('body').textContent()).not.toContain('PRIVATE_DIAGNOSTIC');expect(errors).toEqual([]);
});
test('disposal releases all owned browser subscriptions and ignores stale input',async({page})=>{
 await page.goto('/tests/fixtures/failures.html?mode=dispose');await page.getByRole('button',{name:'Dispose',exact:true}).click();await expect(page.locator('#resources')).toHaveText('{"listeners":0,"frames":0}');
 const before=await page.locator('#snapshot').textContent();await page.locator('#game').focus();await page.keyboard.press('ArrowLeft');await page.getByRole('button',{name:'Advance',exact:true}).click();expect(await page.locator('#snapshot').textContent()).toBe(before);
});

for(const mode of ['invalid','exhausted'])test(`hold ${mode} source stops subscriptions and retains last drawing`,async({page})=>{
 await page.goto('/tests/fixtures/failures.html?mode='+mode);const before=await page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL());
 await page.keyboard.press('c');await expect(page.getByRole('status')).toContainText('Game stopped');await expect(page.locator('#resources')).toHaveText('{"listeners":0,"frames":0}');
 expect(await page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL())).toBe(before);await page.keyboard.press('c');await page.keyboard.press('Space');expect(await page.locator('#board').evaluate(c=>(c as HTMLCanvasElement).toDataURL())).toBe(before);
});
