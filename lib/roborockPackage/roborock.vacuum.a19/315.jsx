require('./316');

var module21 = require('./21'),
  module55 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  h = ['disabled', 'ios_backgroundColor', 'onChange', 'onValueChange', 'style', 'thumbColor', 'trackColor', 'value'];

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

require('./51');

require('./60');

var module317 = require('./317'),
  React = require('react'),
  R = (function (t, ...args) {
    module7.default(S, t);

    var R = S,
      _ = p(),
      k = function () {
        var t,
          n = module11.default(R);

        if (_) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S() {
      var t;
      module4.default(this, S);

      (t = k.call(this, ...args))._handleChange = function (n) {
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
            f = t.trackColor,
            s = t.value,
            p = module55.default(t, h),
            R = c,
            _ = null == f ? undefined : f.false,
            k = null == f ? undefined : f.true,
            S = p,
            w = S.thumbTintColor,
            T = S.tintColor,
            V = S.onTintColor;

          if (null != w) R = w;
          if (null != T) _ = T;
          if (null != V) k = V;
          var F,
            N = {
              enabled: true !== l,
              on: true === s,
              style: u,
              thumbTintColor: R,
              trackColorForFalse: _,
              trackColorForTrue: k,
              trackTintColor: true === s ? k : _,
            };
          return <module317 />;
        },
      },
    ]);
    return S;
  })(React.Component),
  y = function () {
    return false;
  },
  b = function () {
    return true;
  };

module.exports = R;
