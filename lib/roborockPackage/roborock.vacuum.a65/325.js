var module22 = require('./22'),
  module43 = require('./43'),
  module326 = require('./326'),
  module327 = require('./327'),
  module14 = require('./14'),
  module328 = require('./328')({
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
      var t = new module43(),
        o = new module327();
      this.__eventEmitter = new module326(t, o);
    }

    return this.__eventEmitter;
  },
};

module.exports = function (n, s) {
  module14(s, 'Must supply set of valid event types');

  var _ = n.prototype || n;

  module14(!_.__eventEmitter, 'An active emitter is already mixed in');
  var u = n.constructor;
  if (u) module14(u === Object || u === Function, 'Mix EventEmitter into a class, not an instance');
  if (_.hasOwnProperty(module328)) module22(_.__types, s);
  else if (_.__types) _.__types = module22({}, _.__types, s);
  else _.__types = s;
  module22(_, E);
};
