var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1124 = require('./1124'),
  module1394 = require('./1394'),
  module390 = require('./390'),
  module1199 = require('./1199'),
  module385 = require('./385');

function V() {
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

var module510 = require('./510').strings,
  b = (function (t) {
    module9.default(E, t);

    var n = E,
      module1199 = V(),
      b = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      module6.default(this, E);
      return b.call(this, t);
    }

    module7.default(E, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = this.props.mainPage,
            l =
              undefined !== o && o
                ? React.default.createElement(module13.Image, {
                    style: C.iconMain,
                    source: n.mapTipView.iconMain,
                  })
                : React.default.createElement(module13.Image, {
                    style: C.icon,
                    source: n.mapTipView.icon,
                  });
          return React.default.createElement(
            module13.View,
            {
              style: C.containter,
            },
            l,
            React.default.createElement(
              module13.View,
              {
                style: C.desContainter,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    C.tip,
                    {
                      color: n.mapTipView.textColor,
                    },
                  ],
                  numberOfLines: 2,
                },
                this.props.tip
              ),
              this.props.shouldShowGuideButton &&
                React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  {
                    onPress: this.onPressGuideButton.bind(this),
                  },
                  React.default.createElement(module13.Image, {
                    style: C.imageStyle,
                    source: n.mapTipView.questionIcon,
                  })
                )
            ),
            this.props.shouldShowGuideButton &&
              module390.default.isMultiFloorSupported() &&
              React.default.createElement(module1124.MultiFloorEnableTipsView, {
                ref: function (n) {
                  t.mapSavingHintView = n;
                },
                parent: this,
              }),
            this.props.shouldShowGuideButton &&
              !module390.default.isMultiFloorSupported() &&
              React.default.createElement(module1394.default, {
                ref: function (n) {
                  t.tipsView = n;
                },
                parent: this,
              }),
            this.props.shouldShowQuickCreateMap &&
              React.default.createElement(
                module13.TouchableHighlight,
                {
                  disabled: this.props.disabled,
                  style: {
                    borderRadius: 20,
                  },
                  onPress: function () {
                    return null == t.props.onPressQuickCreateMap ? undefined : t.props.onPressQuickCreateMap();
                  },
                },
                React.default.createElement(
                  module385.GradientView,
                  {
                    colors: [n.mapTipView.btnColor1, n.mapTipView.btnColor2],
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 1,
                    },
                    style: C.quickBtn,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: C.quickTip,
                    },
                    module510.quick_build_map_start
                  )
                )
              )
          );
        },
      },
      {
        key: 'onPressGuideButton',
        value: function () {
          if (module390.default.isMultiFloorSupported()) {
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

exports.default = b;
b.contextType = module1199.AppConfigContext;
var C = module13.StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 220,
    height: 115,
  },
  iconMain: {
    width: 338,
    height: 215,
    marginTop: -20,
  },
  quickBtn: {
    borderRadius: 20,
    height: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickTip: {
    marginHorizontal: 30,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  tip: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 12,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  desContainter: {
    marginHorizontal: 10,
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
