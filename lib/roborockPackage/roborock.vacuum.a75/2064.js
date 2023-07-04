exports.convertState = u;
exports.isConnectionExpensive = c;
exports.isConnected = l;
exports.warnOnce = f;

var module13 = require('./13'),
  module2065 = require('./2065');

function u(n) {
  var t = 'unknown';
  if ('cellular' === n.type) t = n.details.cellularGeneration || 'unknown';
  return {
    type: n.type === module2065.NetInfoStateType.vpn || n.type === module2065.NetInfoStateType.other ? 'unknown' : n.type,
    effectiveType: t,
  };
}

function c(n) {
  if ('android' === module13.Platform.OS) return n.type !== module2065.NetInfoStateType.none && n.type !== module2065.NetInfoStateType.unknown && n.details.isConnectionExpensive;
  throw new Error('Currently not supported on iOS');
}

function l(n) {
  return n.isConnected;
}

var p = false;

function f() {
  if (!p) {
    console.warn(
      'Warning: RNCNetInfo - You are using the deprecated API. It will still work, but you must upgrade to the new API to receive the new features. The old API will be removed in the future'
    );
    p = true;
  }
}

var s = {
  convertState: u,
  isConnectionExpensive: c,
  isConnected: l,
  warnOnce: f,
};
exports.default = s;
