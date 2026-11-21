'use strict';
async function waitForOriginalMode(port,target,timeout,signal){
 if(!Number.isSafeInteger(target)||!Number.isFinite(timeout)||timeout<=0)throw Error('Invalid original mode wait');
 if(signal?.aborted)throw signal.reason??Error('Mode wait aborted');
 let epoch=0,wake;
 const unsubscribe=port.subscribe(()=>{epoch++;wake?.();});
 let timer,abort;
 const interrupted=new Promise((_,reject)=>{
  timer=setTimeout(()=>reject(Error('Original mode wait timed out')),timeout);
  abort=()=>reject(signal?.reason??Error('Mode wait aborted'));
  signal?.addEventListener('abort',abort,{once:true});
 });
 try{
  for(;;){
   const before=epoch;
   const view=await Promise.race([port.read(),interrupted]);
   if(view?.current===target)return view;
   if(epoch!==before)continue;
   await Promise.race([new Promise(resolve=>{wake=resolve;}),interrupted]);
   wake=undefined;
  }
 }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);unsubscribe();}
}
module.exports={waitForOriginalMode};
