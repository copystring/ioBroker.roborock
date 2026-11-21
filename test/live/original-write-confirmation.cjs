'use strict';
function createWriteConfirmation(){
 const writes=new Map(),waiters=new Set(),methods=new Set();
 function changed(){for(const notify of [...waiters])notify();}
 function accept(response){if(!response||!writes.has(response.id)||writes.get(response.id)!=='pending')return;
  writes.set(response.id,response.error!=null||response.result===undefined||Array.isArray(response.result)&&response.result[0]==='retry'?'rejected':'confirmed');changed();}
 return {
  sent(id,method){if(!Number.isSafeInteger(id)||id<1||writes.has(id))throw Error('Invalid or duplicate original request');if(typeof method==='string'&&/^[a-zA-Z0-9_.]{1,96}$/.test(method))methods.add(method);writes.set(id,'pending');changed();},
  blocked(method){if(typeof method==='string'&&/^[a-zA-Z0-9_.]{1,96}$/.test(method))methods.add(method);},
  methods(){return [...methods];},
  accept,
  acceptDps(dps){try{const value=dps?.['102'];accept(typeof value==='string'?JSON.parse(value):value);}catch{/* Ignore unrelated or malformed responses. */}},
  wait(timeout,signal){
   if(!Number.isFinite(timeout)||timeout<=0)return Promise.reject(Error('Invalid confirmation timeout'));
   if(signal?.aborted)return Promise.reject(signal.reason);
   return new Promise((resolve,reject)=>{
    let timer;
    const finish=(error)=>{clearTimeout(timer);waiters.delete(check);signal?.removeEventListener('abort',abort);error?reject(error):resolve();};
    const abort=()=>finish(signal.reason??Error('Confirmation cancelled'));
    const check=()=>{if([...writes.values()].includes('rejected'))finish(Error('Device rejected original action'));else if(writes.size&&[...writes.values()].every(s=>s==='confirmed'))finish();};
    waiters.add(check);signal?.addEventListener('abort',abort,{once:true});timer=setTimeout(()=>finish(Error('Device confirmation timed out')),timeout);check();
   });
  }
 };
}
module.exports={createWriteConfirmation};
