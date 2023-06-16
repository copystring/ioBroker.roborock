var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1330 = require('./1330'),
  module1412 = require('./1412'),
  module390 = require('./390'),
  module515 = require('./515');

function b() {
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

var module500 = require('./500').strings,
  C = (function (t) {
    module7.default(T, t);

    var o = T,
      module515 = b(),
      C = function () {
        var t,
          n = module11.default(o);

        if (module515) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      module4.default(this, T);
      return C.call(this, t);
    }

    module5.default(T, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.context.theme;
          return React.default.createElement(
            module12.View,
            {
              style: V.containter,
            },
            React.default.createElement(module12.Image, {
              style: V.icon,
              source: o.mapTipView.icon,
            }),
            React.default.createElement(
              module12.View,
              {
                style: V.desContainter,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    V.tip,
                    {
                      color: o.mapTipView.textColor,
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
                    style: V.imageStyle,
                    source: o.mapTipView.questionIcon,
                  })
                )
            ),
            this.props.shouldShowGuideButton &&
              module390.default.isMultiFloorSupported() &&
              React.default.createElement(module1330.MultiFloorEnableTipsView, {
                ref: function (o) {
                  t.mapSavingHintView = o;
                },
                parent: this,
              }),
            this.props.shouldShowGuideButton &&
              !module390.default.isMultiFloorSupported() &&
              React.default.createElement(module1412.default, {
                ref: function (o) {
                  t.tipsView = o;
                },
                parent: this,
              }),
            this.props.shouldShowQuickCreateMap &&
              React.default.createElement(
                module12.TouchableHighlight,
                {
                  disabled: this.props.disabled,
                  onPress: function () {
                    return null == t.props.onPressQuickCreateMap ? undefined : t.props.onPressQuickCreateMap();
                  },
                  style: {
                    borderRadius: 20,
                    borderColor: o.mapTipView.borderColor,
                    borderWidth: 1,
                    opacity: this.props.disabled ? 0.3 : 1,
                  },
                  underlayColor: o.mapTipView.borderColor,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      paddingHorizontal: 30,
                      borderRadius: 20,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  },
                  React.default.createElement(
                    module12.Text,
                    {
                      style: [
                        V.tip,
                        {
                          color: o.mapTipView.buttonTextColor,
                        },
                      ],
                    },
                    module500.quick_build_map_start
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
    return T;
  })(React.Component);

exports.default = C;
C.contextType = module515.AppConfigContext;
var V = module12.StyleSheet.create({
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
    paddingHorizontal: 5,
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
