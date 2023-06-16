var module22 = require('./22'),
  module50 = require('./50'),
  module56 = require('@babel/runtime/helpers/defineEnumerableProperties'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12');

function p(t, n) {
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
  for (var o = 1; o < arguments.length; o++) {
    var c = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      p(Object(c), true).forEach(function (o) {
        module50(t, o, c[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(c));
    else
      p(Object(c)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(c, n));
      });
  }

  return t;
}

function v() {
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

var React = require('react'),
  module61 = require('./61'),
  module78 = require('./78'),
  module288 = require('./288'),
  module212 = require('./212'),
  module289 = require('./289'),
  P = module61.create({
    rctCheckBox: {
      height: 32,
      width: 32,
    },
  }),
  _ = React.forwardRef(function (n, o) {
    return <j />;
  });

class j {
  constructor() {
    var t;
    module6(this, _);
    (t = j.call(this, ...args))._nativeRef = null;
    t._setNativeRef = module289({
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
      module212(t._nativeRef).setNativeProps({
        value: c,
      });
      if (t.props.onChange) t.props.onChange(n);
      if (t.props.onValueChange) t.props.onValueChange(n.nativeEvent.value);
    };

    return t;
  }

  getTintColors(t) {
    return t
      ? {
          true: module78(t.true),
          false: module78(t.false),
        }
      : undefined;
  }

  render() {
    var n,
      c,
      u = this.props,
      s = u.tintColors,
      f = u.style,
      l = module56(u, ['disabled', 'value', 'tintColors', 'style', 'forwardedRef']),
      p = null != (n = this.props.disabled) && n,
      v = null != (c = this.props.value) && c,
      R = h(
        h({}, l),
        {},
        {
          onStartShouldSetResponder: function () {
            return true;
          },
          onResponderTerminationRequest: function () {
            return false;
          },
          enabled: !p,
          on: v,
          tintColors: this.getTintColors(s),
          style: [P.rctCheckBox, f],
        }
      );
    return <module288 />;
  }
}

module.exports = _;
