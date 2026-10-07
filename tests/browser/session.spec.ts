/** Browser interruption and explicit-resume behavior on the ordinary page. */
import {expect,test} from '@playwright/test';
test('controlled browser blur/visibility events pause and require eligible explicit resume',async({page})=>{
 // Headless shell exposes all pages as focused/visible. Model lifecycle properties
 // only in this test, then exercise actual browser subscriptions and commands.
 await page.goto('/');await expect(page.getByRole('status')).toHaveText('Running');
 await page.evaluate(()=>{Object.defineProperty(document,'hasFocus',{configurable:true,value:()=>false});window.dispatchEvent(new Event('blur'));});
 await expect(page.getByRole('status')).toHaveText('Paused');
 await page.getByRole('button',{name:'Resume',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Paused');
 await page.getByRole('button',{name:'Restart',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Paused');
 await page.evaluate(()=>{Object.defineProperty(document,'hasFocus',{configurable:true,value:()=>true});window.dispatchEvent(new Event('focus'));});
 await expect(page.getByRole('status')).toHaveText('Paused');await page.getByRole('button',{name:'Resume',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Running');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.getByRole('status')).toHaveText('Paused');
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 await expect(page.getByRole('status')).toHaveText('Paused');await page.getByRole('button',{name:'Resume',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Running');
});
test('pause keeps pixels/counters; resume and repeated restart reset time without duplicate input',async({page})=>{
 await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});await page.clock.pauseAt(new Date('2026-01-01T00:00:00Z'));await page.goto('/');
 const board=page.locator('#board');const data=()=>board.evaluate(c=>(c as HTMLCanvasElement).toDataURL());
 await page.clock.runFor(700);await page.keyboard.press('p');const frozen=await data();await page.clock.runFor(10000);expect(await data()).toBe(frozen);
 await page.keyboard.press('p');await page.clock.runFor(200);expect(await data()).toBe(frozen);await page.clock.runFor(200);expect(await data()).not.toBe(frozen);
 for(let i=0;i<6;i++)await page.keyboard.press('r');await expect(page.getByRole('status')).toHaveText('Running');
 const reset=await data();await page.clock.runFor(900);expect(await data()).toBe(reset);await page.clock.runFor(200);expect(await data()).not.toBe(reset);
});
