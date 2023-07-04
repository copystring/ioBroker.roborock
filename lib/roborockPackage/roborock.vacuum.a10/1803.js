var module4 = require('./4'),
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
    var o = h(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, c, f);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module925 = require('./925');

require('./381');

function h(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (h = function (t) {
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

var module491 = require('./491').strings,
  module1804 = (function (t) {
    module7.default(_, t);

    var h = _,
      module1804 = y(),
      O = function () {
        var t,
          n = module11.default(h);

        if (module1804) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      module4.default(this, _);
      return O.call(this, t);
    }

    module5.default(_, [
      {
        key: 'componentDidMount',
        value: function () {
          if (this.lottieView) this.lottieView.play();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: [b.containter, this.props.style],
            },
            React.default.createElement(module925.default, {
              ref: function (n) {
                return (t.lottieView = n);
              },
              style: [b.lottieView],
              source: require('./1804'),
            }),
            React.default.createElement(
              module12.Text,
              {
                style: b.desc,
              },
              module491.cleaning_in_exploration_mode_tip
            )
          );
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = module1804;
module1804.defaultProps = {};
var b = module12.StyleSheet.create({
  containter: {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 37,
    borderRadius: 18.5,
    marginBottom: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  lottieView: {
    marginTop: 1,
    width: 48,
    height: 33.6,
  },
  desc: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  cancelButton: {
    borderColor: 'rgba(0,0,0,0.3)',
    borderWidth: 0.4,
    marginTop: 20,
    width: 100,
    height: 40,
    borderRadius: 8,
  },
});
