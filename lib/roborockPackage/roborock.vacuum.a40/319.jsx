var module22 = require('./22'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11');

require('./320');

function h() {
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

require('./52');

require('./61');

var module321 = require('./321'),
  React = require('react'),
  v = (function (t, ...args) {
    module7.default(S, t);

    var v = S,
      b = h(),
      _ = function () {
        var t,
          n = module11.default(v);

        if (b) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S() {
      var t;
      module4.default(this, S);

      (t = _.call(this, ...args))._handleChange = function (n) {
        if (null != t._nativeSwitchRef) {
          var o = true === t.props.value;

          t._nativeSwitchRef.setNativeProps({
            on: o,
          });

          if (null != t.props.onChange) t.props.onChange(n);
          if (null != t.props.onValueChange) t.props.onValueChange(n.nativeEvent.value);
        }
      };

      t._handleSwitchNativeComponentRef = function (n) {
        t._nativeSwitchRef = n;
      };

      return t;
    }

    module5.default(S, [
      {
        key: 'render',
        value: function () {
          var t = this.props,
            l = t.disabled,
            u = t.style,
            c = t.thumbColor,
            s = t.trackColor,
            f = t.value,
            h = module56.default(t, ['disabled', 'ios_backgroundColor', 'onChange', 'onValueChange', 'style', 'thumbColor', 'trackColor', 'value']),
            v = c,
            b = null == s ? undefined : s.false,
            _ = null == s ? undefined : s.true,
            S = h,
            k = S.thumbTintColor,
            w = S.tintColor,
            T = S.onTintColor;

          if (null != k) v = k;
          if (null != w) b = w;
          if (null != T) _ = T;
          var V,
            F = {
              enabled: true !== l,
              on: true === f,
              style: u,
              thumbTintColor: v,
              trackColorForFalse: b,
              trackColorForTrue: _,
              trackTintColor: true === f ? _ : b,
            };
          return <module321 />;
        },
      },
    ]);
    return S;
  })(React.Component),
  R = function () {
    return false;
  },
  y = function () {
    return true;
  };

module.exports = v;
