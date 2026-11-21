'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createWriteConfirmation}=require('./original-write-confirmation.cjs');
test('waits for actual replies to all original writes, ignoring unrelated replies',async()=>{
 const c=createWriteConfirmation();c.sent(1);c.sent(2);let settled=false;
 const done=c.wait(1000).then(()=>{settled=true});
 c.accept({id:9,result:['ok']});c.accept({id:1,result:['ok']});await new Promise(setImmediate);assert.equal(settled,false);
 c.accept({id:2,result:['ok']});await done;assert.equal(settled,true);
});
test('does not count a device error as confirmation',async()=>{
 const c=createWriteConfirmation();c.sent(8);const waiting=c.wait(1000);c.accept({id:8,error:{code:-1}});await assert.rejects(waiting,/rejected/i);
});
test('does not confirm a handler that sent no device request',async()=>{
 const c=createWriteConfirmation();await assert.rejects(c.wait(10),/timed out/i);
});
test('accepts a response with a null error and an actual result',async()=>{
 const c=createWriteConfirmation();c.sent(10);const waiting=c.wait(1000);c.accept({id:10,error:null,result:['ok']});await waiting;
});
test('reports the original method without storing request parameters',async()=>{
 const c=createWriteConfirmation();c.sent(12,'app_set_clean_sequence_type');c.accept({id:12,result:['ok']});await c.wait(1000);
 assert.deepEqual(c.methods(),['app_set_clean_sequence_type']);
});
test('handles both decoded and JSON-encoded original DPS replies',async()=>{
 for(const encoded of [true,false]){
  const c=createWriteConfirmation();c.sent(20);const p=c.wait(1000);const r={id:20,result:['ok']};c.acceptDps({'102':encoded?JSON.stringify(r):r});await p;
 }
});
test('records a blocked original method without treating it as sent or confirmed',async()=>{
 const c=createWriteConfirmation();c.blocked('app_set_clean_sequence_type');
 assert.deepEqual(c.methods(),['app_set_clean_sequence_type']);
 await assert.rejects(c.wait(10),/timed out/i);
});
