import {createServer} from '../appplugin-ipc.cjs';
let current=0;
const tabs=[{value:0,label:'First',actionId:'a'},{value:1,label:'Second',actionId:'b'}];
process.on('message',message=>{
 if(message?.kind!=='appplugin-start')return;
 createServer(process,async request=>{
  if(request.method==='snapshot')return {current,tabs};
  if(request.method==='activate'&&request.params.actionId==='b'){current=1;return {confirmed:true};}
  throw Error('unexpected original action');
 });
 process.send({kind:'appplugin-ready',view:{current,tabs}});
});
