require('./51');

var module207 = require('@babel/runtime/helpers/interopRequireDefault')(require('./207')),
  module123 = require('./123');

function v() {
  this.__nativeTVNavigationEventListener = null;
  this.__nativeTVNavigationEventEmitter = null;
}

v.prototype.enable = function (v, o) {
  this.__nativeTVNavigationEventEmitter = new module123(module207.default);
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
