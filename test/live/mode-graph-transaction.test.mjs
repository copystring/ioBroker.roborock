import {test} from 'node:test';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';import {resolve} from 'node:path';
const root=process.env.APPPLUGIN_RUNTIME_ROOT;
test('captures the committed original graph without requiring a static native frame',{skip:!root},async()=>{
 const {captureModeGraph}=await import(pathToFileURL(resolve(root,'src/mode-graph-transaction.ts')));
 const events=[];const state={menu:{revision:7,screen:{nativeRootTag:42},presentationGraph:{truncated:false,screenNativeRootTag:42}}};
 const result=await captureModeGraph({async flush(){events.push('flush')},publish(){events.push('publish');state.menu.presentationGraph={...state.menu.presentationGraph}},read(){return state}});
 assert.equal(result.menu.revision,7);assert.deepEqual(events,['flush','publish','flush']);
});
test('rejects a graph from a different screen',{skip:!root},async()=>{
 const {captureModeGraph}=await import(pathToFileURL(resolve(root,'src/mode-graph-transaction.ts')));
 const state={menu:{revision:7,screen:{nativeRootTag:42},presentationGraph:{truncated:false,screenNativeRootTag:99}}};
 await assert.rejects(captureModeGraph({async flush(){},publish(){state.menu.presentationGraph={...state.menu.presentationGraph}},read(){return state}}),/graph/i);
});
test('rejects a previous graph when the worker does not publish a new one',{skip:!root},async()=>{
 const {captureModeGraph}=await import(pathToFileURL(resolve(root,'src/mode-graph-transaction.ts')));
 const state={menu:{revision:7,screen:{nativeRootTag:42},presentationGraph:{truncated:false,screenNativeRootTag:42}}};
 await assert.rejects(captureModeGraph({async flush(){},publish(){},read(){return state}}),/stale/i);
});
