'use strict';
const {test}=require('node:test');const assert=require('node:assert/strict');const {waitForOriginalMode}=require('./wait-for-original-mode.cjs');
test('waits for the original view to report the requested mode',async()=>{
 let current=0,listener,unsubscribed=false;
 const waiting=waitForOriginalMode({read:async()=>({current}),subscribe:fn=>{listener=fn;return()=>{unsubscribed=true;}}},1,1000);
 await new Promise(setImmediate);current=1;listener();assert.equal((await waiting).current,1);assert.equal(unsubscribed,true);
});
test('returns an error without fabricating a mode on timeout',async()=>{
 await assert.rejects(waitForOriginalMode({read:async()=>({current:0}),subscribe:()=>()=>{}},1,10),/timed out/i);
});
test('does not miss a change that arrives while reading',async()=>{
 let count=0,listener;const result=await waitForOriginalMode({subscribe:fn=>{listener=fn;return()=>{}},read:async()=>{count++;if(count===1){listener();return {current:0}}return {current:1}}},1,1000);
 assert.equal(result.current,1);
});
