var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module1200 = require('./1200'),
  React = require('react'),
  module13 = require('./13');

function p() {
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

var y = {
  Stripe: 0,
  Block: 1,
};
exports.LevelSelectViewStyle = y;

var x = (function (t) {
  module9.default(I, t);

  var module1200 = I,
    x = p(),
    v = function () {
      var t,
        n = module12.default(module1200);

      if (x) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function I(t) {
    var l;
    module6.default(this, I);
    (l = v.call(this, t)).state = {
      selectedIndex: l.props.defaultSelectedIndex,
    };
    l.itemWidth = 0;
    l.animatedLeft = new module13.Animated.Value(t.defaultSelectedIndex * l.itemWidth);
    l.state = {
      selectedIndex: t.defaultSelectedIndex,
    };
    return l;
  }

  module7.default(I, [
    {
      key: 'onSelectItemAtIndex',
      value: function (t) {
        this.setState({
          selectedIndex: t,
        });
        this.props.onSelectItemAtIndex(t);
        if (this.props.isAnimatable)
          module13.Animated.parallel([
            module13.Animated.spring(this.animatedLeft, {
              duration: 100,
              toValue: t * this.itemWidth,
              speed: 5,
            }),
          ]).start(function () {});
        else this.animatedLeft.setValue(t * this.itemWidth);
      },
    },
    {
      key: 'onLayoutIndicator',
      value: function (t) {
        if (0 == this.itemWidth && this.itemWidth != t.nativeEvent.layout.width) {
          this.itemWidth = t.nativeEvent.layout.width;
          this.animatedLeft.setValue(this.state.selectedIndex * this.itemWidth);
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this;
        return React.default.createElement(
          module13.View,
          {
            style: this.props.style,
          },
          this.props.viewStyle == y.Stripe &&
            React.default.createElement(function (n) {
              var l = 100 / n.items.length + '%';
              return React.default.createElement(
                module13.View,
                {
                  style: {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: t.context.theme.settingBackgroundColor,
                    flex: 1,
                    height: 45,
                    borderRadius: 22.5,
                  },
                },
                t.state.selectedIndex >= 0 &&
                  React.default.createElement(module13.Animated.View, {
                    style: {
                      backgroundColor: '#7292EE',
                      position: 'absolute',
                      width: l,
                      left: t.animatedLeft,
                      height: '100%',
                      borderRadius: 22.5,
                    },
                    onLayout: function (n) {
                      return t.onLayoutIndicator(n);
                    },
                  }),
                n.items.map(function (l, o) {
                  return React.default.createElement(
                    module13.TouchableWithoutFeedback,
                    {
                      key: o,
                      disabled: n.disabled,
                      onPress: function () {
                        return t.onSelectItemAtIndex(o);
                      },
                    },
                    React.default.createElement(
                      module13.View,
                      {
                        style: {
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 20,
                          backgroundColor: 'transparent',
                        },
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: {
                            textAlign: 'center',
                            color: t.state.selectedIndex == o ? '#FFFFFF' : '#9B9B9B',
                          },
                        },
                        l
                      )
                    )
                  );
                })
              );
            }, this.props),
          this.props.viewStyle == y.Block &&
            React.default.createElement(function (n) {
              return React.default.createElement(
                module13.View,
                {
                  style: {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: 'tranparent',
                    flex: 1,
                    height: 40,
                  },
                },
                n.items.map(function (l, o) {
                  return React.default.createElement(
                    module13.TouchableWithoutFeedback,
                    {
                      key: o,
                      disabled: n.disabled,
                      onPress: function () {
                        return t.onSelectItemAtIndex(o);
                      },
                    },
                    React.default.createElement(
                      module13.View,
                      {
                        style: {
                          flex: 1,
                          justifyContent: '   center',
                          alignItems: 'center',
                          borderRadius: 8,
                          backgroundColor: t.state.selectedIndex == o ? '#7292EE' : t.context.theme.settingBackgroundColor,
                          marginLeft: 0 == o ? 0 : 7.5,
                          marginRight: o == n.items.length - 1 ? 0 : 7.5,
                          opacity: n.disabled ? 0.5 : 1,
                        },
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: {
                            textAlign: 'center',
                            color: t.state.selectedIndex == o ? '#FFFFFF' : '#9B9B9B',
                          },
                        },
                        l
                      )
                    )
                  );
                })
              );
            }, this.props)
        );
      },
    },
  ]);
  return I;
})(React.default.Component);

exports.default = x;
x.defaultProps = {
  items: [],
  defaultSelectedIndex: 0,
  onSelectItemAtIndex: function () {},
  viewStyle: y.Stripe,
  isAnimatable: true,
};
x.contextType = module1200.AppConfigContext;
