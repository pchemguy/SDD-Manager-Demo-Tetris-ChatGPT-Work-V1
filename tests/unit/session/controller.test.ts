/** Real engine/controller with controlled timestamps and lifecycle event targets. */
import {expect,it} from 'vitest';
import {Game} from '../../../src/engine/game';
import {Controller,type Lifecycle} from '../../../src/session/controller';
import {ManualScheduler} from '../../support/scheduler';
import {ObservedTarget} from '../../support/event-target';
import type {Snapshot} from '../../../src/engine/types';
import {ground} from '../../support/scenarios';
import {sequenceSource} from '../../support/piece-source';
function setup(eligible=true){
 const events={window:new ObservedTarget(),document:new ObservedTarget(),eligible:()=>eligible} satisfies Lifecycle;
 const region=new ObservedTarget() as unknown as HTMLElement;
 const game=new Game(sequenceSource(['T','I','O'])),scheduler=new ManualScheduler();
 const displayed:Snapshot[]=[];let faults=0;
 const controller=new Controller(game,region,s=>displayed.push(s),scheduler,{onError:()=>{faults++;},lifecycle:events,freshSource:()=>sequenceSource(['O','I','T'])});
 return {game,scheduler,controller,events,region,displayed,faults:()=>faults,setEligible:(value:boolean)=>{eligible=value;}};
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

it('source exhaustion stops frames/input, retains display and releases every owned listener',()=>{
 const {game,scheduler,controller,events,region,displayed,faults}=setup();
 game.restart(sequenceSource(['O','T']));ground(game);controller.start();scheduler.step(0);const last=displayed[displayed.length-1];
 expect(()=>scheduler.step(1000)).not.toThrow();expect(faults()).toBe(1);expect(displayed[displayed.length-1]).toEqual(last);expect(scheduler.pending.size).toBe(0);
 expect(events.window.subscriptions+events.document.subscriptions+(region as unknown as ObservedTarget).subscriptions).toBe(0);
 const frozen=game.snapshot();controller.command('restart');controller.command('down');scheduler.step(90000);expect(game.snapshot()).toEqual(frozen);controller.dispose();expect(faults()).toBe(1);
});
it.each(['initial','later'])('%s scheduling fault is contained and reported once',stage=>{
 const {game,controller,scheduler,events,faults}=setup();const request=scheduler.request.bind(scheduler);let count=0;
 scheduler.request=callback=>{if(++count===(stage==='initial'?1:2))throw new Error('private credential path');return request(callback);};
 expect(()=>controller.start()).not.toThrow();if(stage==='later')expect(()=>scheduler.step(0)).not.toThrow();
 expect(faults()).toBe(1);expect(scheduler.pending.size).toBe(0);expect(events.window.subscriptions+events.document.subscriptions).toBe(0);
 const stopped=game.snapshot();controller.command('down');expect(game.snapshot()).toEqual(stopped);
});
it('repeated disposal cancels a frame and permanently disables an instance',()=>{
 const {controller,scheduler,game,events}=setup();controller.start();const stale=[...scheduler.pending.values()][0]!;controller.dispose();controller.dispose();controller.start();controller.command('down');
 const before=game.snapshot();stale(10000);expect(game.snapshot()).toEqual(before);expect(scheduler.pending.size).toBe(0);expect(events.window.subscriptions+events.document.subscriptions).toBe(0);
});
