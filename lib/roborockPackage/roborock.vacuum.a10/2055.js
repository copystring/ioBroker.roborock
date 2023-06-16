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
    var l = y(n);
    if (l && l.has(t)) return l.get(t);
    var o = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = u ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(o, c, f);
        else o[c] = t[c];
      }

    o.default = t;
    if (l) l.set(t, o);
    return o;
  })(require('react')),
  module12 = require('./12'),
  module2052 = require('./2052'),
  module387 = require('./387'),
  module2056 = require('./2056');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    l = new WeakMap();
  return (y = function (t) {
    return t ? l : n;
  })(t);
}

function w() {
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
  x = module12.Dimensions.get('window'),
  P = (function (t) {
    module7.default(P, t);

    var module387 = P,
      y = w(),
      x = function () {
        var t,
          n = module11.default(module387);

        if (y) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var l;
      module4.default(this, P);
      (l = x.call(this, t)).state = {
        soundVolume: undefined !== t.soundVolume ? t.soundVolume : 0,
      };
      isLandscape = false;
      return l;
    }

    module5.default(P, [
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: V.container,
              pointerEvents: 'none',
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: this.props.isLandscape ? V.landscape : V.portrait,
              },
              React.default.createElement(
                module12.View,
                {
                  style: V.volumeView,
                },
                React.default.createElement(module2052.default, {
                  volume: this.props.soundVolume,
                  isCalling: true,
                }),
                React.default.createElement(module2056.default, {
                  style: [
                    {
                      width: 30,
                    },
                    {
                      height: 20,
                    },
                  ],
                  ref: function (n) {
                    return (t.timeView = n);
                  },
                }),
                React.default.createElement(module2052.default, {
                  volume: this.props.soundVolume,
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  numberOfLines: 2,
                  style: V.defaultText,
                },
                module491.be_on_the_phone
              )
            )
          );
        },
      },
      {
        key: 'cancle',
        value: function () {
          if (this.timeView) this.timeView.cancle();
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = P;
var V = module12.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
  },
  landscape: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'column-reverse',
    height: module387.default.scaledPixel(124.75200000000001, true),
    width: module387.default.scaledPixel(202.032, true),
  },
  portrait: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    flexDirection: 'column-reverse',
    alignSelf: 'flex-end',
    height: module387.default.scaledPixel(124.75200000000001, true),
    width: module387.default.scaledPixel(202.032, true),
    marginBottom: module387.default.scaledPixel(242.88000000000002, true),
  },
  volumeView: {
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: module387.default.scaledPixel(34.224000000000004, true),
    width: module387.default.scaledPixel(154.56, true),
  },
  defaultText: {
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    top: module387.default.scaledPixel(72.864, true),
    color: 'rgba(255,255,255,0.6)',
    fontSize: module387.default.scaledPixel(11.040000000000001, true),
  },
});
