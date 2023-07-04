var module21 = require('./21'),
  module42 = require('./42'),
  module322 = require('./322'),
  module323 = require('./323'),
  module13 = require('./13'),
  module324 = require('./324')({
    __types: true,
  });

var E = {
  emit: function (t, n, s, _, o, v, E) {
    return this.__getEventEmitter().emit(t, n, s, _, o, v, E);
  },
  emitAndHold: function (t, n, s, _, o, v, E) {
    return this.__getEventEmitter().emitAndHold(t, n, s, _, o, v, E);
  },
  addListener: function (t, n, s) {
    return this.__getEventEmitter().addListener(t, n, s);
  },
  once: function (t, n, s) {
    return this.__getEventEmitter().once(t, n, s);
  },
  addRetroactiveListener: function (t, n, s) {
    return this.__getEventEmitter().addRetroactiveListener(t, n, s);
  },
  addListenerMap: function (t, n) {
    return this.__getEventEmitter().addListenerMap(t, n);
  },
  addRetroactiveListenerMap: function (t, n) {
    return this.__getEventEmitter().addListenerMap(t, n);
  },
  removeAllListeners: function () {
    this.__getEventEmitter().removeAllListeners();
  },
  removeCurrentListener: function () {
    this.__getEventEmitter().removeCurrentListener();
  },
  releaseHeldEventType: function (t) {
    this.__getEventEmitter().releaseHeldEventType(t);
  },
  __getEventEmitter: function () {
    if (!this.__eventEmitter) {
      var t = new module42(),
        o = new module323();
      this.__eventEmitter = new module322(t, o);
    }

    return this.__eventEmitter;
  },
};

module.exports = function (n, s) {
  module13(s, 'Must supply set of valid event types');

  var _ = n.prototype || n;

  module13(!_.__eventEmitter, 'An active emitter is already mixed in');
  var u = n.constructor;
  if (u) module13(u === Object || u === Function, 'Mix EventEmitter into a class, not an instance');
  if (_.hasOwnProperty(module324)) module21(_.__types, s);
  else if (_.__types) _.__types = module21({}, _.__types, s);
  else _.__types = s;
  module21(_, E);
};
