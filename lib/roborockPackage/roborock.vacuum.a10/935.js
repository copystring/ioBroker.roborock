var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var f in t)
      if ('default' !== f && Object.prototype.hasOwnProperty.call(t, f)) {
        var l = s ? Object.getOwnPropertyDescriptor(t, f) : null;
        if (l && (l.get || l.set)) Object.defineProperty(u, f, l);
        else u[f] = t[f];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module936 = require('./936');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function y() {
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

var b = (function (t) {
  module7.default(w, t);

  var module936 = w,
    v = y(),
    b = function () {
      var t,
        n = module11.default(module936);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function w() {
    module4.default(this, w);
    return b.apply(this, arguments);
  }

  module5.default(w, [
    {
      key: 'componentWillUnmount',
      value: function () {
        this.props.navigation.setParams({
          gesturesEnabled: true,
        });
      },
    },
    {
      key: 'onShow',
      value: function () {
        if (this.props.autoGestureEnable)
          this.props.navigation.setParams({
            gesturesEnabled: false,
          });
        if (this.props.onShow) this.props.onShow();
      },
    },
    {
      key: 'onDismiss',
      value: function () {
        if (this.props.autoGestureEnable)
          this.props.navigation.setParams({
            gesturesEnabled: true,
          });
        if (this.props.onDismiss) this.props.onDismiss();
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module12.Modal,
          module21.default({}, this.props, {
            onShow: function () {
              t.onShow();
            },
            onDismiss: function () {
              t.onDismiss();
            },
          })
        );
      },
    },
  ]);
  return w;
})(React.default.Component);

b.defaultProps = {
  autoGestureEnable: true,
};
var w = module936.withNavigation(b);
exports.default = w;
