/** Event adapters expose owned subscriptions without imitating browser rendering. */
export class ObservedTarget extends EventTarget {
 private readonly owned=new Map<string,Set<EventListenerOrEventListenerObject>>();
 override addEventListener(type:string,callback:EventListenerOrEventListenerObject|null,options?:AddEventListenerOptions|boolean):void {
  if(callback){let listeners=this.owned.get(type);if(!listeners){listeners=new Set();this.owned.set(type,listeners);}listeners.add(callback);}
  super.addEventListener(type,callback,options);
 }
 override removeEventListener(type:string,callback:EventListenerOrEventListenerObject|null,options?:EventListenerOptions|boolean):void {
  if(callback)this.owned.get(type)?.delete(callback);super.removeEventListener(type,callback,options);
 }
 get subscriptions():number{return [...this.owned.values()].reduce((sum,listeners)=>sum+listeners.size,0);}
}
