'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createModeBridge } = require('./adapter-mode-runtime.cjs');

test('publishes the original mode choices and dispatches the selected original action exactly once', async () => {
 const objects = new Map(), states = new Map(), calls = [];
 const adapter = { namespace:'roborock.0', async extendObjectAsync(id, obj) { objects.set(id, obj); }, async setStateAsync(id, state) { states.set(id, state); } };
 let currentMode=1;
 const worker = { async snapshot() { return {current: currentMode, tabs: [{value:0,label:'A',actionId:'a'},{value:1,label:'B',actionId:'b'}]}; }, async activate(id) { calls.push(id); currentMode=0; return {confirmed:true}; } };
 const bridge = createModeBridge(adapter, 'Devices.device.plugin', worker);
 await bridge.refresh();
 assert.deepEqual(objects.get('Devices.device.plugin.mode').common.states, {'0':'A','1':'B'});
 assert.deepEqual(states.get('Devices.device.plugin.mode'), {val:1,ack:true});
 await bridge.onStateChange('roborock.0.Devices.device.plugin.mode', {val:0,ack:false});
 assert.deepEqual(calls, ['a']);
});

test('rejects unknown choices and ignores acknowledged state changes', async () => {
 let calls=0;
 const adapter = { namespace:'r.0', async extendObjectAsync(){}, async setStateAsync(){} };
 const worker = { async snapshot(){return {current:0,tabs:[{value:0,label:'A',actionId:'a'},{value:1,label:'B',actionId:'b'}]};}, async activate(){calls++;} };
 const bridge=createModeBridge(adapter,'Devices.x.plugin',worker);
 await bridge.refresh();
 await bridge.onStateChange('r.0.Devices.x.plugin.mode',{val:1,ack:true});
 await assert.rejects(bridge.onStateChange('r.0.Devices.x.plugin.mode',{val:3,ack:false}),/unavailable/i);
 assert.equal(calls,0);
});

test('does not dispatch a changed callback or acknowledge an unsuccessful action', async () => {
 const states=[]; let snapshots=0, sends=0;
 const adapter={namespace:'r.0',async extendObjectAsync(){},async setStateAsync(_id,s){states.push(s);}};
 const worker={async snapshot(){snapshots++;return {current:0,tabs:[{value:0,label:'A',actionId:'a'},{value:1,label:'B',actionId:snapshots===1?'b':'changed'}]};},async activate(){sends++;}};
 const bridge=createModeBridge(adapter,'Devices.x.plugin',worker);
 await bridge.refresh();
 await assert.rejects(bridge.onStateChange('r.0.Devices.x.plugin.mode',{val:1,ack:false}),/changed/i);
 assert.equal(sends,0);
 assert.deepEqual(states,[{val:0,ack:true}]);
});

test('does not send an action when the original mode is already selected', async () => {
 let sends=0;
 const adapter={namespace:'r.0',async extendObjectAsync(){},async setStateAsync(){}};
 const worker={async snapshot(){return {current:0,tabs:[{value:0,label:'A',actionId:'a'}]};},async activate(){sends++;}};
 const bridge=createModeBridge(adapter,'Devices.x.plugin',worker);
 await bridge.refresh(); await bridge.onStateChange('r.0.Devices.x.plugin.mode',{val:0,ack:false});
 assert.equal(sends,0);
});


test('does not acknowledge an unconfirmed device action', async () => {
 const states=[];
 const adapter={namespace:'r.0',async extendObjectAsync(){},async setStateAsync(_id,s){states.push(s);}};
 const worker={async snapshot(){return {current:0,tabs:[{value:0,label:'A',actionId:'a'},{value:1,label:'B',actionId:'b'}]};},async activate(){return {confirmed:false};}};
 const bridge=createModeBridge(adapter,'Devices.x.plugin',worker);
 await bridge.refresh();
 await assert.rejects(bridge.onStateChange('r.0.Devices.x.plugin.mode',{val:1,ack:false}),/confirm/i);
 assert.deepEqual(states,[{val:0,ack:true}]);
});

test('does not acknowledge a device response when the original view still has the previous mode', async () => {
 const states=[];
 const adapter={namespace:'r.0',async extendObjectAsync(){},async setStateAsync(_id,s){states.push(s);}};
 const worker={async snapshot(){return {current:0,tabs:[{value:0,label:'A',actionId:'a'},{value:1,label:'B',actionId:'b'}]};},async activate(){return {confirmed:true};}};
 const bridge=createModeBridge(adapter,'Devices.x.plugin',worker);
 await bridge.refresh();
 await assert.rejects(bridge.onStateChange('r.0.Devices.x.plugin.mode',{val:1,ack:false}),/original.*mode/i);
 assert.deepEqual(states,[{val:0,ack:true}]);
});
