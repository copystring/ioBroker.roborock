var module21 = require('./21'),
  module49 = require('./49'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  p = ['disabled', 'value', 'tintColors', 'style', 'forwardedRef'];

function h(t, n) {
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

function v(t) {
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      h(Object(c), true).forEach(function (o) {
        module49(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      h(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
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

var React = require('react'),
  module60 = require('./60'),
  module77 = require('./77'),
  module284 = require('./284'),
  module210 = require('./210'),
  module285 = require('./285'),
  P = (function (n, ...args) {
    module7(k, n);

    var h = k,
      module60 = y(),
      P = function () {
        var t,
          n = module11(h);

        if (module60) {
          var o = module11(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9(this, t);
      };

    function k() {
      var t;
      module4(this, k);
      (t = P.call(this, ...args))._nativeRef = null;
      t._setNativeRef = module285({
        getForwardedRef: function () {
          return t.props.forwardedRef;
        },
        setLocalRef: function (n) {
          t._nativeRef = n;
        },
      });

      t._onChange = function (n) {
        var o,
          c = null != (o = t.props.value) && o;
        module210(t._nativeRef).setNativeProps({
          value: c,
        });
        if (t.props.onChange) t.props.onChange(n);
        if (t.props.onValueChange) t.props.onValueChange(n.nativeEvent.value);
      };

      return t;
    }

    module5(k, [
      {
        key: 'getTintColors',
        value: function (t) {
          return t
            ? {
                true: module77(t.true),
                false: module77(t.false),
              }
            : undefined;
        },
      },
      {
        key: 'render',
        value: function () {
          var n,
            c,
            u = this.props,
            s = u.tintColors,
            f = u.style,
            l = module55(u, p),
            h = null != (n = this.props.disabled) && n,
            y = null != (c = this.props.value) && c,
            b = v(
              v({}, l),
              {},
              {
                onStartShouldSetResponder: function () {
                  return true;
                },
                onResponderTerminationRequest: function () {
                  return false;
                },
                enabled: !h,
                on: y,
                tintColors: this.getTintColors(s),
                style: [_.rctCheckBox, f],
              }
            );
          return <module284 />;
        },
      },
    ]);
    return k;
  })(React.Component),
  _ = module60.create({
    rctCheckBox: {
      height: 32,
      width: 32,
    },
  }),
  k = React.forwardRef(function (n, o) {
    return <P />;
  });

module.exports = k;
