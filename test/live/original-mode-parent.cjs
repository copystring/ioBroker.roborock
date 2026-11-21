'use strict';
const {fork}=require('node:child_process');
const {createClient}=require('./appplugin-ipc.cjs');
const {createModeBridge}=require('./adapter-mode-runtime.cjs');

async function start(adapter,{runtimeRoot,deviceId,loaderUrl}){
 const home=adapter.http_api.homeData,userdata=adapter.http_api.userData;
 const device=(home?.devices??[]).find(d=>d.duid===deviceId && (home.products??[]).some(p=>String(p.id)===String(d.productId)&&typeof p.model==='string'&&p.model.startsWith('roborock.vacuum.')));
 if(!device||!userdata||!adapter.http_api.loginApi)throw Error('Original AppPlugin device or session unavailable');
 const clientId=(await adapter.getStateAsync('clientID'))?.val;
 if(typeof clientId!=='string'||!clientId)throw Error('Original AppPlugin client identifier unavailable');
 const prefix='Devices.'+device.duid+'.appPluginRuntime',modeId=prefix+'.mode',statusId=prefix+'.status';
 await adapter.extendObjectAsync(prefix,{type:'channel',common:{name:'AppPlugin'},native:{source:'appplugin-original'}});
 await adapter.extendObjectAsync(statusId,{type:'state',common:{name:'AppPlugin-Status',type:'string',role:'text',read:true,write:false},native:{source:'appplugin-original'}});
 await adapter.setStateAsync(statusId,{val:'starting',ack:true});
 const child=fork(runtimeRoot+'/original-mode-worker.mjs',[],{cwd:runtimeRoot,env:{...process.env,APPPLUGIN_RUNTIME_ROOT:runtimeRoot},execArgv:loaderUrl?['--import='+loaderUrl]:[],stdio:['ignore','ignore','ignore','ipc']});
 const client=createClient(child);let stopped=false,bridge;
 const worker={snapshot:()=>client.request('snapshot',{}),activate:actionId=>client.request('activate',{actionId})};
 async function unavailable(){
  if(stopped)return;stopped=true;client.close();
  adapter.removeListener('stateChange',onStateChange);
  if(await adapter.getObjectAsync(modeId).catch(()=>null)) await adapter.extendObjectAsync(modeId,{common:{write:false}}).catch(()=>{});
  await adapter.setStateAsync(statusId,{val:'unavailable',ack:true}).catch(()=>{});
 }
 const onStateChange=(id,state)=>{
  if(!bridge||id!==adapter.namespace+'.'+modeId||!state||state.ack)return;
  void bridge.onStateChange(id,state).then(()=>adapter.setStateAsync(statusId,{val:'ready',ack:true})).catch(async()=>{
   await adapter.setStateAsync(statusId,{val:'mode change failed',ack:true}).catch(()=>{});
  });
 };
 child.on('message',message=>{
  if(message?.kind==='appplugin-failed')void unavailable();
  if(message?.kind!=='appplugin-ready'||stopped)return;
  void (async()=>{
   bridge=createModeBridge(adapter,prefix,worker);
   await bridge.refresh();
   await adapter.subscribeStatesAsync(modeId);
   adapter.on('stateChange',onStateChange);
   await adapter.setStateAsync(statusId,{val:'ready',ack:true});
  })().catch(()=>unavailable());
 });
 child.on('error',()=>void unavailable());
 child.on('exit',()=>void unavailable());
 adapter.once('unload',()=>{void unavailable();child.kill();});
 child.send({kind:'appplugin-start',userdata,home,baseUrl:adapter.http_api.loginApi.defaults.baseURL,clientId,duid:device.duid});
 return {close:()=>{void unavailable();child.kill();}};
}
module.exports={start};
