'use strict';
// This is a currently observed React property, not a generated model command.
function findModeEntry({graph,revision,route}) {
 if (!graph || graph.truncated !== false || !Array.isArray(graph.fibers) || !Number.isSafeInteger(graph.screenNativeRootTag) || !Number.isSafeInteger(revision) || typeof route !== 'string' || !route) throw Error('Original mode entry unavailable');
 const found=[];
 for (const fiber of graph.fibers) for (const event of fiber.events??[]) {
  if (event.event === 'onPressModeSettingButton' && Number.isSafeInteger(fiber.id) && Number.isSafeInteger(event.callbackId) && Number.isSafeInteger(event.bindingIdentity)) found.push({fiberId:fiber.id,callbackId:event.callbackId,bindingIdentity:event.bindingIdentity,revision,route});
 }
 if (found.length !== 1) throw Error('Original mode entry missing or ambiguous');
 return found[0];
}
module.exports={findModeEntry};
