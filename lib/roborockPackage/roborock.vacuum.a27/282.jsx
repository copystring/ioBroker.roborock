var module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module50 = require('./50');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

function l(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var c = Object.getOwnPropertySymbols(t);
    if (n)
      c = c.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, c);
  }

  return o;
}

function h(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      l(Object(o), true).forEach(function (n) {
        module50(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      l(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./52');

require('./261');

var React = require('react'),
  module283 = require('./283'),
  v = h(
    h({}, module283.defaultProps),
    {},
    {
      stickySectionHeadersEnabled: false,
    }
  );

class w {
  constructor() {
    var t;
    module4(this, w);

    (t = v.call(this, ...args))._captureRef = function (n) {
      t._wrapperListRef = n;
    };

    return t;
  }

  scrollToLocation(t) {
    if (null != this._wrapperListRef) this._wrapperListRef.scrollToLocation(t);
  }

  recordInteraction() {
    var t = this._wrapperListRef && this._wrapperListRef.getListRef();

    if (t) t.recordInteraction();
  }

  flashScrollIndicators() {
    var t = this._wrapperListRef && this._wrapperListRef.getListRef();

    if (t) t.flashScrollIndicators();
  }

  getScrollResponder() {
    var t = this._wrapperListRef && this._wrapperListRef.getListRef();

    if (t) return t.getScrollResponder();
  }

  getScrollableNode() {
    var t = this._wrapperListRef && this._wrapperListRef.getListRef();

    if (t) return t.getScrollableNode();
  }

  setNativeProps(t) {
    var n = this._wrapperListRef && this._wrapperListRef.getListRef();

    if (n) n.setNativeProps(t);
  }

  render() {
    return <module283 />;
  }
}

w.defaultProps = v;
module.exports = w;
