var module4 = require('./4'),
  module228 = require('./228');

class _ {
  constructor() {
    module4(this, _);
  }

  start(n, t, o, _, u) {}

  stop() {
    if (this.__nativeId) module228.API.stopAnimation(this.__nativeId);
  }

  __getNativeAnimationConfig() {
    throw new Error('This animation type cannot be offloaded to native');
  }

  __debouncedOnEnd(n) {
    var t = this.__onEnd;
    this.__onEnd = null;
    if (t) t(n);
  }

  __startNativeAnimation(n) {
    module228.API.enableQueue();

    n.__makeNative();

    module228.API.disableQueue();
    this.__nativeId = module228.generateNewAnimationId();
    module228.API.startAnimatingNode(this.__nativeId, n.__getNativeTag(), this.__getNativeAnimationConfig(), this.__debouncedOnEnd.bind(this));
  }
}

module.exports = _;
