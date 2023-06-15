require('./52');

var module209 = require('@babel/runtime/helpers/interopRequireDefault')(require('./209')),
  module125 = require('./125');

function v() {
  this.__nativeTVNavigationEventListener = null;
  this.__nativeTVNavigationEventEmitter = null;
}

v.prototype.enable = function (v, o) {
  this.__nativeTVNavigationEventEmitter = new module125(module209.default);
  this.__nativeTVNavigationEventListener = this.__nativeTVNavigationEventEmitter.addListener('onHWKeyEvent', function (t) {
    if (o) o(v, t);
  });
};

v.prototype.disable = function () {
  if (this.__nativeTVNavigationEventListener) {
    this.__nativeTVNavigationEventListener.remove();

    delete this.__nativeTVNavigationEventListener;
  }

  if (this.__nativeTVNavigationEventEmitter) delete this.__nativeTVNavigationEventEmitter;
};

module.exports = v;
