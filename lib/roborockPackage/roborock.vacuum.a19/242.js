var module4 = require('./4'),
  module5 = require('./5'),
  module224 = require('./224'),
  _ = (function () {
    function _() {
      module4(this, _);
    }

    module5(_, [
      {
        key: 'start',
        value: function (n, t, o, _, u) {},
      },
      {
        key: 'stop',
        value: function () {
          if (this.__nativeId) module224.API.stopAnimation(this.__nativeId);
        },
      },
      {
        key: '__getNativeAnimationConfig',
        value: function () {
          throw new Error('This animation type cannot be offloaded to native');
        },
      },
      {
        key: '__debouncedOnEnd',
        value: function (n) {
          var t = this.__onEnd;
          this.__onEnd = null;
          if (t) t(n);
        },
      },
      {
        key: '__startNativeAnimation',
        value: function (n) {
          module224.API.enableQueue();

          n.__makeNative();

          module224.API.disableQueue();
          this.__nativeId = module224.generateNewAnimationId();
          module224.API.startAnimatingNode(this.__nativeId, n.__getNativeTag(), this.__getNativeAnimationConfig(), this.__debouncedOnEnd.bind(this));
        },
      },
    ]);
    return _;
  })();

module.exports = _;
