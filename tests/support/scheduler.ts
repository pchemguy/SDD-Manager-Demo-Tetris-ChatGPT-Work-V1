/** Deterministic animation timestamps and observable scheduled-frame ownership. */
import type { Scheduler } from '../../src/session/controller';
export class ManualScheduler implements Scheduler {
 readonly pending=new Map<number,FrameRequestCallback>();
 private next=0;
 request(callback:FrameRequestCallback):number {const id=++this.next;this.pending.set(id,callback);return id;}
 cancel(id:number):void {this.pending.delete(id);}
 step(time:number):void {const work=[...this.pending.values()];this.pending.clear();for(const callback of work)callback(time);}
}
