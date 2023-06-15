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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var f = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (f && (f.get || f.set)) Object.defineProperty(u, c, f);
        else u[c] = t[c];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12'),
  module1231 = require('./1231'),
  module1344 = require('./1344'),
  module386 = require('./386'),
  module506 = require('./506');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function S() {
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

require('./491').strings;

var V = (function (t) {
  module7.default(E, t);

  var module506 = E,
    v = S(),
    V = function () {
      var t,
        n = module11.default(module506);

      if (v) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function E(t) {
    module4.default(this, E);
    return V.call(this, t);
  }

  module5.default(E, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme;
        return React.default.createElement(
          module12.View,
          {
            style: b.containter,
          },
          React.default.createElement(module12.Image, {
            style: b.icon,
            source: n.mapTipView.icon,
          }),
          React.default.createElement(
            module12.View,
            {
              style: b.desContainter,
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  b.tip,
                  {
                    color: n.mapTipView.textColor,
                  },
                ],
              },
              this.props.tip
            ),
            this.props.shouldShowGuideButton &&
              React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: this.onPressGuideButton.bind(this),
                },
                React.default.createElement(module12.Image, {
                  style: b.imageStyle,
                  source: n.mapTipView.questionIcon,
                })
              )
          ),
          this.props.shouldShowGuideButton &&
            module386.default.isMultiFloorSupported() &&
            React.default.createElement(module1231.MultiFloorEnableTipsView, {
              ref: function (n) {
                t.mapSavingHintView = n;
              },
              parent: this,
            }),
          this.props.shouldShowGuideButton &&
            !module386.default.isMultiFloorSupported() &&
            React.default.createElement(module1344.default, {
              ref: function (n) {
                t.tipsView = n;
              },
              parent: this,
            })
        );
      },
    },
    {
      key: 'onPressGuideButton',
      value: function () {
        if (module386.default.isMultiFloorSupported()) {
          if (this.mapSavingHintView)
            this.mapSavingHintView.setState({
              shouldShow: true,
            });
        } else if (this.tipsView)
          this.tipsView.setState({
            shouldShow: true,
          });
      },
    },
  ]);
  return E;
})(React.Component);

exports.default = V;
V.contextType = module506.AppConfigContext;
var b = module12.StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 220,
    height: 115,
  },
  tip: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 14,
  },
  desContainter: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageStyle: {
    width: 18,
    height: 18,
    padding: 2,
    marginTop: 1,
  },
});
