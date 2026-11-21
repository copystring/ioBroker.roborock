'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const {EventEmitter,once}=require('node:events');const path=require('node:path');
const {start}=require('./original-mode-parent.cjs');
class Adapter extends EventEmitter {
 constructor(){super();this.namespace='roborock.0';this.objects=new Map();this.states=new Map();this.http_api={userData:{},loginApi:{defaults:{baseURL:'https://example.test'}},homeData:{devices:[{duid:'test',productId:1}],products:[{id:1,model:'roborock.vacuum.test'}]}};}
 async getStateAsync(){return {val:'client'};}
 async getObjectAsync(id){return this.objects.get(id);}
 async extendObjectAsync(id,value){this.objects.set(id,{...this.objects.get(id),...value});}
 async setStateAsync(id,value){this.states.set(id,value);this.emit('written',id,value);}
 async subscribeStatesAsync(){}
}
async function waitFor(adapter,id,value){if(adapter.states.get(id)?.val===value)return;for(;;){const [actual,state]=await once(adapter,'written',{signal:AbortSignal.timeout(5000)});if(actual===id&&state.val===value)return;}}
test('publishes original choices and routes ioBroker selection into the worker',async()=>{
 const adapter=new Adapter(),prefix='Devices.test.appPluginRuntime';
 const runtime=await start(adapter,{runtimeRoot:path.join(__dirname,'fixtures'),deviceId:'test'});
 try{
  await waitFor(adapter,prefix+'.status','ready');
  assert.deepEqual(adapter.objects.get(prefix+'.mode').common.states,{'0':'First','1':'Second'});
  adapter.emit('stateChange','roborock.0.'+prefix+'.mode',{val:1,ack:false});
  await waitFor(adapter,prefix+'.mode',1);
  assert.deepEqual(adapter.states.get(prefix+'.mode'),{val:1,ack:true});
 }finally{runtime.close();}
});
test('disables the mode state when its original worker stops',async()=>{
 const adapter=new Adapter(),prefix='Devices.test.appPluginRuntime';
 const runtime=await start(adapter,{runtimeRoot:path.join(__dirname,'fixtures'),deviceId:'test'});
 await waitFor(adapter,prefix+'.status','ready');
 runtime.close();
 await waitFor(adapter,prefix+'.status','unavailable');
 assert.equal(adapter.objects.get(prefix+'.mode').common.write,false);
});
