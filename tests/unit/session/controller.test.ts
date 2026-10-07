/** Real engine/controller with controlled timestamps and lifecycle event targets. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import {Controller,type Lifecycle} from '../../../src/session/controller';
import {ManualScheduler} from '../../support/scheduler';
import {sequenceSource} from '../../support/piece-source';
function setup(eligible=true){
 const events={window:new EventTarget(),document:new EventTarget(),eligible:()=>eligible} satisfies Lifecycle;
 const region=new EventTarget() as unknown as HTMLElement;
 const game=new Game(sequenceSource(['T','I','O'])),scheduler=new ManualScheduler();
 const controller=new Controller(game,region,()=>{},scheduler,{lifecycle:events,freshSource:()=>sequenceSource(['O','I','T'])});
 return {game,scheduler,controller,events,setEligible:(value:boolean)=>{eligible=value;}};
}
it('pause and explicit resume exclude inactive time and retain the engine remainder',()=>{
 const {game,scheduler,controller}=setup();controller.start();scheduler.step(0);scheduler.step(700.25);controller.command('pause');
 scheduler.step(90000);controller.command('pause');scheduler.step(100000);scheduler.step(100299.5);
 expect(game.snapshot().active?.y).toBe(0);scheduler.step(100299.75);expect(game.snapshot().active?.y).toBe(1);
});
it.each(['blur','visibilitychange'])('%s pauses; restored eligibility never resumes automatically',event=>{
 const {game,scheduler,controller,events,setEligible}=setup();controller.start();scheduler.step(0);scheduler.step(700);
 setEligible(false);(event==='blur'?events.window:events.document).dispatchEvent(new Event(event));expect(game.snapshot().status).toBe('paused');
 controller.command('pause');expect(game.snapshot().status).toBe('paused');scheduler.step(200000);
 setEligible(true);events.window.dispatchEvent(new Event('focus'));events.document.dispatchEvent(new Event('visibilitychange'));expect(game.snapshot().status).toBe('paused');
 controller.command('pause');scheduler.step(300000);scheduler.step(300299);expect(game.snapshot().active?.y).toBe(0);scheduler.step(300300);expect(game.snapshot().active?.y).toBe(1);
});
it('inactive startup/restart stays paused; repeated starts/restarts retain one frame chain',()=>{
 const {game,scheduler,controller,setEligible}=setup(false);controller.start();controller.start();expect(game.snapshot().status).toBe('paused');expect(scheduler.pending.size).toBe(1);
 for(let i=0;i<8;i++){controller.command('restart');expect(game.snapshot().status).toBe('paused');expect(scheduler.pending.size).toBe(1);}
 setEligible(true);controller.command('pause');scheduler.step(10000);scheduler.step(10700);controller.command('restart');scheduler.step(20000);scheduler.step(20999);
 expect(game.snapshot().active?.y).toBe(0);scheduler.step(21000);expect(game.snapshot().active?.y).toBe(1);expect(scheduler.pending.size).toBe(1);
});
