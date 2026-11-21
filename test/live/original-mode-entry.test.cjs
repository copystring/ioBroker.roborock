'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {findModeEntry}=require('./original-mode-entry.cjs');
const graph={truncated:false,screenNativeRootTag:42,fibers:[{id:11,events:[{event:'onPressModeSettingButton',callbackId:14,bindingIdentity:15}]},{id:12,events:[{event:'onPressCleanButton',callbackId:22,bindingIdentity:23}]}]};
test('finds the original mode entry without a list of device models or labels',()=>{
 assert.deepEqual(findModeEntry({graph,revision:4,route:'MainPage'}),{fiberId:11,callbackId:14,bindingIdentity:15,revision:4,route:'MainPage'});
});
test('rejects a truncated or ambiguous original entry',()=>{
 assert.throws(()=>findModeEntry({graph:{...graph,truncated:true},revision:4,route:'MainPage'}),/unavailable/i);
 assert.throws(()=>findModeEntry({graph:{...graph,fibers:[graph.fibers[0],{...graph.fibers[0],id:13}]},revision:4,route:'MainPage'}),/ambiguous/i);
});
