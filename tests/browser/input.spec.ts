/** Real focused keyboard dispatch and native command-button activation. */
import {expect,test} from '@playwright/test';
async function state(page:import('@playwright/test').Page){return JSON.parse((await page.locator('#snapshot').textContent())!);}
test('repeat/filter/focus/default behavior routes commands once',async({page})=>{
 await page.goto('/tests/fixtures/playable.html?mode=rotate');
 await page.locator('#game').evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft',repeat:true,bubbles:true,cancelable:true})));
 expect((await state(page)).active.x).toBe(2);
 await page.keyboard.press('ArrowUp');
 await page.locator('#game').evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowUp',repeat:true,bubbles:true})));
 expect((await state(page)).active.orientation).toBe(1);
 for(const key of ['Control+ArrowRight','Alt+ArrowRight','Meta+ArrowRight'])await page.keyboard.press(key);
 expect((await state(page)).active.x).toBe(2);
 await page.keyboard.press('p');expect((await state(page)).status).toBe('paused');const frozen=await state(page);
 const prevented=await page.locator('#game').evaluate(el=>!el.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true,cancelable:true})));
 expect(prevented).toBe(true);expect(await state(page)).toEqual(frozen);
 await page.locator('#game').evaluate(el=>el.dispatchEvent(new KeyboardEvent('keydown',{key:'p',repeat:true,bubbles:true})));
 expect((await state(page)).status).toBe('paused');await page.keyboard.press('P');expect((await state(page)).status).toBe('running');
 await page.evaluate(()=>{const input=document.createElement('input');input.id='editable';document.querySelector('#game')!.append(input);input.focus();});
 const before=await state(page);await page.keyboard.press('r');expect(await state(page)).toEqual(before);
 await page.getByRole('button',{name:'Advance one second'}).focus();await page.keyboard.press('ArrowLeft');expect((await state(page)).active.x).toBe(2);
 await page.locator('#board').click();await expect(page.locator('#game')).toBeFocused();
});
test('ordinary labeled buttons support Enter and Space; paused arrows never scroll',async({page})=>{
 await page.goto('/');const pause=page.getByRole('button',{name:'Pause',exact:true});await pause.focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('status')).toHaveText('Paused');await page.locator('#game').focus();
 const y=await page.evaluate(()=>scrollY);await page.keyboard.press('ArrowDown');expect(await page.evaluate(()=>scrollY)).toBe(y);
 await page.getByRole('button',{name:'Resume',exact:true}).click();await expect(page.getByRole('status')).toHaveText('Running');
 await page.getByRole('button',{name:'Restart',exact:true}).focus();await page.keyboard.press('Space');await expect(page.getByRole('status')).toHaveText('Running');
 await expect(page.locator('#score')).toHaveText('0');
});
