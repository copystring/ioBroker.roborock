'use strict';

// The worker supplies choices and callbacks from one current original render.
function createModeBridge(adapter, prefix, worker) {
 const id = `${prefix}.mode`, absoluteId = `${adapter.namespace}.${id}`;
 let published;
 let queue = Promise.resolve();
 function run(task) { const result = queue.then(task); queue = result.catch(() => {}); return result; }
 function validate(view) {
  if (!view || !Array.isArray(view.tabs) || view.tabs.length === 0 || !Number.isSafeInteger(view.current)) throw Error('Original mode view unavailable');
  const seen = new Set();
  for (const tab of view.tabs) {
   if (!Number.isSafeInteger(tab.value) || tab.value < 0 || seen.has(tab.value) || typeof tab.label !== 'string' || !tab.label || typeof tab.actionId !== 'string' || !tab.actionId) throw Error('Original mode choices unavailable');
   seen.add(tab.value);
  }
  if (!seen.has(view.current)) throw Error('Original current mode unavailable');
  return view;
 }
 async function publish(view) {
  validate(view);
  await adapter.extendObjectAsync(id, {type:'state', common:{name:'Modus',type:'number',role:'level',read:true,write:true,states:Object.fromEntries(view.tabs.map(t=>[String(t.value),t.label]))}, native:{source:'appplugin-original'}});
  await adapter.setStateAsync(id, {val:view.current,ack:true});
  published = view;
 }
 return {
  refresh: () => run(async () => publish(await worker.snapshot())),
  onStateChange: (changedId, state) => {
   if (changedId !== absoluteId || !state || state.ack) return Promise.resolve();
   return run(async () => {
    if (!Number.isSafeInteger(state.val) || !published) throw Error('Mode choice unavailable');
    const prior = published.tabs.find(tab => tab.value === state.val);
    const fresh = validate(await worker.snapshot());
    const current = fresh.tabs.find(tab => tab.value === state.val);
    if (!prior || !current || prior.label !== current.label || prior.actionId !== current.actionId) throw Error('Mode choice unavailable or changed');
    if (fresh.current === current.value) { await publish(fresh); return; }
    const result = await worker.activate(current.actionId);
    if (result?.confirmed !== true) throw Error('Device did not confirm original mode action');
    // The original host must re-read the view; no acknowledgement is fabricated here.
    const observed = validate(await worker.snapshot());
    if (observed.current !== current.value) throw Error('Original view did not report the requested mode');
    await publish(observed);
   });
  }
 };
}
module.exports = {createModeBridge};
