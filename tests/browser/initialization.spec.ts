/** Setup validates all required elements/contexts before any active resource. */
import {expect,test} from '@playwright/test';
for(const mode of ['game','board','preview','status','score','level','lines','pause','restart','canvas'])test(`missing ${mode} shows safe fallback without gameplay resources`,async({page})=>{
 await page.goto('/tests/fixtures/invalid.html?mode='+mode);
 await expect(page.getByRole('status')).toContainText('unavailable');await expect(page.locator('#resources')).toHaveText('0');
});
test('ordinary setup remains successful without console errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');await expect(page.getByRole('status')).toHaveText('Running');expect(errors).toEqual([]);
});
