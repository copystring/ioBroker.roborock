var module4 = require('./4'),
  module5 = require('./5'),
  module221 = require('./221'),
  module224 = require('./224'),
  module85 = require('./85'),
  module13 = require('./13'),
  module224 = require('./224').shouldUseNativeDriver;

function l(t, n, _) {
  var l = [];
  module13(_[0] && _[0].nativeEvent, 'Native driven events only support animated values contained inside `nativeEvent`.');

  (function t(n, v) {
    if (n instanceof module221) {
      n.__makeNative();

      l.push({
        nativeEventPath: v,
        animatedValueTag: n.__getNativeTag(),
      });
    } else if ('object' == typeof n) for (var o in n) t(n[o], v.concat(o));
  })(_[0].nativeEvent, []);

  var h = module85.findNodeHandle(t);
  l.forEach(function (t) {
    module224.API.addAnimatedEventToView(h, n, t);
  });
  return {
    detach: function () {
      l.forEach(function (t) {
        module224.API.removeAnimatedEventFromView(h, n, t.animatedValueTag);
      });
    },
  };
}

var h = (function () {
  function v(n) {
    var s = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : {};
    module4(this, v);
    this._listeners = [];
    this._argMapping = n;
    if (s.listener) this.__addListener(s.listener);
    this._callListeners = this._callListeners.bind(this);
    this._attachedEvent = null;
    this.__isNative = module224(s);
  }

  module5(v, [
    {
      key: '__addListener',
      value: function (t) {
        this._listeners.push(t);
      },
    },
    {
      key: '__removeListener',
      value: function (t) {
        this._listeners = this._listeners.filter(function (n) {
          return n !== t;
        });
      },
    },
    {
      key: '__attach',
      value: function (t, n) {
        module13(this.__isNative, 'Only native driven events need to be attached.');
        this._attachedEvent = l(t, n, this._argMapping);
      },
    },
    {
      key: '__detach',
      value: function (t, n) {
        module13(this.__isNative, 'Only native driven events need to be detached.');
        if (this._attachedEvent) this._attachedEvent.detach();
      },
    },
    {
      key: '__getHandler',
      value: function () {
        var t = this;
        return this.__isNative
          ? this._callListeners
          : function (...args) {
              var c = function t(n, v, o) {
                if ('number' == typeof v && n instanceof module221) n.setValue(v);
                else if ('object' == typeof n) for (var c in n) t(n[c], v[c], c);
              };

              if (!t.__isNative)
                t._argMapping.forEach(function (t, n) {
                  c(t, args[n]);
                });

              t._callListeners.apply(t, args);
            };
      },
    },
    {
      key: '_callListeners',
      value: function (...args) {
        this._listeners.forEach(function (t) {
          return t.apply(undefined, args);
        });
      },
    },
    {
      key: '_validateMapping',
      value: function () {},
    },
  ]);
  return v;
})();

module.exports = {
  AnimatedEvent: h,
  attachNativeEvent: l,
};
