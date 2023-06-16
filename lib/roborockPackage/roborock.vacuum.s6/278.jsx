var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module49 = require('./49');

function p() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
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
        module49(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      l(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./51');

require('./257');

var React = require('react'),
  module279 = require('./279'),
  v = h(
    h({}, module279.defaultProps),
    {},
    {
      stickySectionHeadersEnabled: false,
    }
  ),
  w = (function (u, ...args) {
    module7(w, u);

    var l = w,
      h = p(),
      v = function () {
        var t,
          n = module11(l);

        if (h) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function w() {
      var t;
      module4(this, w);

      (t = v.call(this, ...args))._captureRef = function (n) {
        t._wrapperListRef = n;
      };

      return t;
    }

    module5(w, [
      {
        key: 'scrollToLocation',
        value: function (t) {
          if (null != this._wrapperListRef) this._wrapperListRef.scrollToLocation(t);
        },
      },
      {
        key: 'recordInteraction',
        value: function () {
          var t = this._wrapperListRef && this._wrapperListRef.getListRef();

          if (t) t.recordInteraction();
        },
      },
      {
        key: 'flashScrollIndicators',
        value: function () {
          var t = this._wrapperListRef && this._wrapperListRef.getListRef();

          if (t) t.flashScrollIndicators();
        },
      },
      {
        key: 'getScrollResponder',
        value: function () {
          var t = this._wrapperListRef && this._wrapperListRef.getListRef();

          if (t) return t.getScrollResponder();
        },
      },
      {
        key: 'getScrollableNode',
        value: function () {
          var t = this._wrapperListRef && this._wrapperListRef.getListRef();

          if (t) return t.getScrollableNode();
        },
      },
      {
        key: 'setNativeProps',
        value: function (t) {
          var n = this._wrapperListRef && this._wrapperListRef.getListRef();

          if (n) n.setNativeProps(t);
        },
      },
      {
        key: 'render',
        value: function () {
          return <module279 />;
        },
      },
    ]);
    return w;
  })(React.PureComponent);

w.defaultProps = v;
module.exports = w;
