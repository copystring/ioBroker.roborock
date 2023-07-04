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
    var o = y(n);
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
  module2053 = require('./2053');

require('./387');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function v() {
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
  b = (function (t) {
    module7.default(_, t);

    var y = _,
      x = v(),
      b = function () {
        var t,
          n = module11.default(y);

        if (x) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var o;
      module4.default(this, _);

      (o = b.call(this, t)).onDismiss = function () {
        if (o.props.onDismiss) o.props.onDismiss();
      };

      o.state = {
        soundVolume: undefined !== t.soundVolume ? t.soundVolume : 0,
      };
      isLandscape = false;
      return o;
    }

    module5.default(_, [
      {
        key: 'render',
        value: function () {
          return React.default.createElement(
            module12.View,
            {
              style: w.container,
              pointerEvents: 'none',
            },
            React.default.createElement(
              module12.Animated.View,
              {
                style: this.props.isLandscape ? w.landscapeTextContainer : w.textContainer,
              },
              React.default.createElement(
                module12.View,
                {
                  style: w.volumeView,
                },
                React.default.createElement(module2053.default, {
                  volume: this.props.soundVolume,
                })
              ),
              React.default.createElement(
                module12.View,
                {
                  style: w.textView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: w.timeText,
                  },
                  module491.up_to_15s_can_be_recorded
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    numberOfLines: 2,
                    style: w.defaultText,
                  },
                  module491.let_go_of_send_up_slide_to_cancel
                )
              )
            )
          );
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
    ]);
    return _;
  })(React.Component);

exports.default = b;
var w = module12.StyleSheet.create({
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
  landscapeTextContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'column-reverse',
    height: 113,
    width: 183,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    flexDirection: 'column-reverse',
    alignSelf: 'flex-end',
    height: 113,
    width: 183,
    marginBottom: 210,
  },
  volumeView: {
    alignSelf: 'center',
    position: 'absolute',
    top: 25,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 68,
  },
  timeText: {
    textAlign: 'center',
    marginTop: 11,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
  defaultText: {
    textAlign: 'center',
    marginTop: 2,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
  },
});
