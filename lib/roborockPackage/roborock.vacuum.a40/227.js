var module4 = require('./4'),
  module228 = require('./228'),
  _ = module228.API,
  module13 = require('./13'),
  o = 1;

class v {
  constructor() {
    module4(this, v);
    this._listeners = {};
  }

  __attach() {}

  __detach() {
    if (this.__isNative && null != this.__nativeTag) {
      module228.API.dropAnimatedNode(this.__nativeTag);
      this.__nativeTag = undefined;
    }
  }

  __getValue() {}

  __getAnimatedValue() {
    return this.__getValue();
  }

  __addChild(t) {}

  __removeChild(t) {}

  __getChildren() {
    return [];
  }
}

module.exports = v;
