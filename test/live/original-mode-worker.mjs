import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {createServer} from './appplugin-ipc.cjs';
import {extractModeView} from './original-mode-tabs.cjs';
import {createWriteConfirmation} from './original-write-confirmation.cjs';
import {waitForOriginalMode} from './wait-for-original-mode.cjs';

const root=process.env.APPPLUGIN_RUNTIME_ROOT;
if(!root || !process.send) throw Error('AppPlugin worker requires an isolated runtime and IPC');
const load=path=>import(pathToFileURL(resolve(root,path)).href);
const [{AccountRuntime},{prepareDevicePlugin},{createApkAppPluginHttpHeaders},{createDesktopTextBackend},{createHeadlessSession},{DEFAULT_ANDROID_CONFIGURATION},{DeviceMqtt}] = await Promise.all([
 load('src/account-runtime.ts'),load('src/device-plugin.ts'),load('vendor/apkAppPluginHttpHeaders.ts'),
 load('src/text-backend.ts'),load('src/headless-session.ts'),load('src/android-configuration.ts'),load('src/device-mqtt.ts')
]);
let session,transport,serverStop,started=false,closed=false,action;
async function close(){
 if(closed)return; closed=true;
 serverStop?.();try{await session?.close();}catch{} transport?.close();
}
process.once('disconnect',()=>{void close();});
process.on('message',async message=>{
 if(message?.kind!=='appplugin-start'||started)return;
 started=true; let stage='account';
 try{
  const {userdata,home,baseUrl,clientId,duid}=message;
  const account=new AccountRuntime({load:async()=>({version:1,baseUrl,loginResponse:userdata,storedAt:Date.now()})},globalThis.fetch);
  if(!await account.restore({loadHomes:false}))throw Error('account session unavailable');
  account.homeDetails=[{...home,id:home.rrHomeId}];account.state={phase:'home-ready',saved:true,homeCount:1,deviceCount:home.devices.length};
  const index=home.devices.findIndex(d=>d.duid===duid&&home.products.some(p=>String(p.id)===String(d.productId)&&typeof p.model==='string'&&p.model.startsWith('roborock.vacuum.')));
  if(index<0)throw Error('selected Roborock vacuum unavailable');
  const headers=createApkAppPluginHttpHeaders({androidId:clientId,language:'de',mobileModel:'Android'});
  stage='package'; const plugin=await prepareDevicePlugin(account,headers,0,index);
  transport=new DeviceMqtt(userdata.rriot,plugin.device);
  const publish=transport.sendJson.bind(transport);
  transport.sendJson=async(request,route,signal)=>{
   const read=/^(get_|app_get_)[a-z0-9_]+$/.test(request.method);
   if(!read){
    if(!action || !['set_clean_motor_mode','app_set_clean_sequence_type','set_mop_mode'].includes(request.method)){
     action?.blocked(request.method);throw Error('Outside the verified original mode operation');
    }
    action.sent(request.id,request.method);
   }
   return publish(request,route,signal);
  };
  transport.sendProtobuf=(request,route,signal)=>{
   if(!action)throw Error('device write requires explicit original-mode action');
   throw Error('original mode protobuf action is not yet supported');
  };
  transport.subscribe({onDps(dps){action?.acceptDps(dps);}});
  stage='backend'; const backend=await createDesktopTextBackend();
  async function openSession(){
   const mapSignal=AbortSignal.timeout(25000);
   let resolveMap;
   const mapReady = new Promise(resolve=>{ resolveMap=resolve; });
   const stop = transport.subscribe({onBinary(frame){if(frame.protocol===301)resolveMap();}});
   mapSignal.addEventListener('abort',resolveMap,{once:true});
   try {
    session=await createHeadlessSession({plugin,account,headers,backend,transport,configuration:{...DEFAULT_ANDROID_CONFIGURATION,systemLocale:'de-DE'},mock:false,ownsTransport:false,allowLiveMode:true,fastModeGraph:true});
    await mapReady;
    return await session.openOriginalMode();
   } finally {
    stop();
    mapSignal.removeEventListener('abort',resolveMap);
   }
  }
  stage='mode-entry'; const opened=await openSession();
  const graphFibers=new Map((opened.graph?.fibers??[]).map(f=>[f.id,f]));
  let contextFiber=(opened.graph?.fibers??[]).find(f=>(f.events??[]).some(e=>e.event==='tabWillChange'));const homeFlags=[];
  for(let depth=0;contextFiber&&depth<128;depth++,contextFiber=graphFibers.get(contextFiber.parentId)){if(typeof contextFiber.props?.isInHomePage==='boolean')homeFlags.push(contextFiber.props.isInHomePage);}
  process.send?.({kind:'appplugin-mode-context',homeFlags,widths:opened.graph?.fibers.find(f=>f.tabLayoutWidths)?.tabLayoutWidths});
  let latest=extractModeView({graph:opened.graph,graphRevision:opened.revision,menu:opened.menu,objects:opened.objects});
  async function snapshot(){ return latest; }
  async function refresh(){
   const readView = view => extractModeView({graph:view.graph,graphRevision:view.revision,menu:view.menu,objects:view.objects});
   const view = await session.modeSnapshot();
   try {
    latest = readView(view);
   } catch (error) {
    if (!/Original tab group is missing or ambiguous/.test(error.message)) throw error;
    // An original selection can dismiss the panel. Reopen the original
    // dialog to observe its selection, without resending the mode command.
    latest = readView(await session.openOriginalMode());
   }
   return latest;
  }
  async function activate(actionId,signal){
   signal?.throwIfAborted();
   const target=latest.tabs.find(tab=>tab.actionId===actionId);
   if(!target)throw Error('Original mode action unavailable');
   try{
    const inspected=await session.modeSnapshot(),row=inspected.objects.objects.find(o=>o._id===actionId);
    const control=(inspected.menu.controls??[]).find(c=>row&&c.title===row.common.name&&c.reactPath===row.native.sourcePath&&c.source===row.native.source&&c.handlerType===row.native.handlerType);
    const binding=(inspected.graph?.bindings??[]).find(b=>b.reference===control?.reference),fibers=new Map((inspected.graph?.fibers??[]).map(f=>[f.id,f]));
    let fiber=fibers.get(binding?.fiberId);const states=[];
    for(let depth=0;fiber&&depth<128;depth++,fiber=fibers.get(fiber.parentId)){if(fiber.pressState&&(fiber.pressState.enabled!==null||fiber.pressState.isAnimating!==null))states.push(fiber.pressState);}
    process.send?.({kind:'appplugin-press-state',states});
   }catch{}
   if(action)throw Error('Original mode operation already running');
   const plan=await session.planCurrentAction({id:actionId,value:true,expectedCurrentRoute:'MainPage'});
   signal?.throwIfAborted();
   if(action)throw Error('Original mode operation already running');
   action=createWriteConfirmation();
   try{
    const result=await session.executeCurrentAction(plan);
    process.send?.({kind:'appplugin-action-state',status:result.status,alertCount:result.alerts?.length??0,nativePress:!!result.activation?.nativePressTarget});
    signal?.throwIfAborted();
    await action.wait(15000,signal);
    signal?.throwIfAborted();
    try {
     latest=await waitForOriginalMode({read:refresh,subscribe:listener=>session.subscribeMenuChanged(listener)},target.value,12000,signal);
    } catch (error) {
     signal?.throwIfAborted();
     // The device already replied. A new original session observes the
     // actual device configuration; it does not replay the write.
     await session.close();
     const observed = await openSession();
     latest=extractModeView({graph:observed.graph,graphRevision:observed.revision,menu:observed.menu,objects:observed.objects});
     if(latest.current!==target.value || latest.tabs.find(tab=>tab.value===target.value)?.label!==target.label)throw error;
    }
    return {confirmed:true,methods:action.methods()};
   }finally{
    let alertCount=-1,current=null;
    try{const view=await session.modeSnapshot();alertCount=view.alerts?.length??0;current=extractModeView({graph:view.graph,graphRevision:view.revision,menu:view.menu,objects:view.objects}).current;}catch{}
    process.send?.({kind:'appplugin-action-diagnostic',methods:action?.methods()??[],alertCount,current});action=undefined;
   }
  }
  serverStop=createServer(process,async ({method,params},signal)=>{
   if(method==='snapshot')return snapshot();
   if(method==='refresh')return refresh();
   if(method==='activate'&&typeof params?.actionId==='string')return activate(params.actionId,signal);
   throw Error('unknown mode operation');
  });
  stage='mode-snapshot'; const view=await snapshot();
  process.send?.({kind:'appplugin-ready',view});
 }catch(error){
  const text=error instanceof Error?error.message:'';
  const category=/konvergieren|Layouttransaktion/i.test(text)?'layout':/Mode entry rejected/i.test(text)?'entry-rejected':/Mode entry graph unavailable/i.test(text)?'entry-graph-unavailable':/Original mode graph timed out/i.test(text)?'mode-graph-timeout':/ambiguous|mehrdeutig/i.test(text)?'ambiguous':/Mode entry|Modus/i.test(text)?'mode-entry':/Snapshot|snapshot|Graph/i.test(text)?'snapshot':/timeout|zeitüberschreitung/i.test(text)?'timeout':'other';
  process.send?.({kind:'appplugin-failed',stage,category});
  await close();process.disconnect?.();
 }
});
