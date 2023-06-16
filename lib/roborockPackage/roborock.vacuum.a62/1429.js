var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  PropTypes = require('prop-types'),
  module1428 = require('./1428'),
  module1121 = require('./1121');

function S(t) {
  var n = w();
  return function () {
    var o,
      l = module11.default(t);

    if (n) {
      var c = module11.default(this).constructor;
      o = Reflect.construct(l, arguments, c);
    } else o = l.apply(this, arguments);

    return module9.default(this, o);
  };
}

function w() {
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

var module505 = require('./505').strings,
  k = (function (t) {
    module7.default(s, t);
    var n = S(s);

    function s() {
      module4.default(this, s);
      return n.apply(this, arguments);
    }

    module5.default(s, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            n = this.props;
          return React.default.createElement(
            module12.TouchableHighlight,
            module22.default({}, module391.default.getAccessibilityLabel(n.accessibilityLabel), {
              onPress: n.enabled ? n.onPress : null,
              underlayColor: n.enabled ? n.underlayColor || t.actionSheet.underlayColor : 'transparent',
              activeOpacity: n.enabled ? 0.85 : 1,
            }),
            React.default.createElement(
              module12.View,
              {
                style: [P.action, n.style],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    P.actionText,
                    {
                      color: n.textColor || 'rgba(0,0,0,0.8)',
                    },
                    {
                      fontSize: n.fontSize || 18,
                    },
                  ],
                },
                module391.default.reuduceEnterString(n.action)
              ),
              n.showLine &&
                React.default.createElement(module12.View, {
                  style: [
                    P.line,
                    {
                      backgroundColor: n.lineColor || t.actionSheet.borderColor,
                    },
                  ],
                })
            )
          );
        },
      },
    ]);
    return s;
  })(React.Component);

k.contextType = module1121.AppConfigContext;
k.defaultProps = {
  enabled: true,
};
k.propTypes = {
  action: PropTypes.default.string,
  enabled: PropTypes.default.bool,
};

var E = (function (t) {
  module7.default(o, t);
  var n = S(o);

  function o(t) {
    module4.default(this, o);
    return n.call(this, t);
  }

  module5.default(o, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {},
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          n = this.context.theme,
          o = n.actionSheet.textColor,
          l = n.subTextColor,
          c = this.props,
          u = c.title,
          s = c.actions,
          f = c.enabledAdapter,
          b = c.titleColor,
          C = c.backgroundColor,
          v = c.underlayColor,
          S = c.lineColor,
          w = c.textColorAdapter,
          E = u
            ? React.default.createElement(k, {
                action: u,
                enabled: false,
                key: -1,
                showLine: true,
                onPress: function () {},
                style: {
                  overflow: 'hidden',
                },
                textColor: '#9B9B9B',
                fontSize: 14,
              })
            : React.default.createElement(module12.View, null),
          _ = s.map(function (n, c) {
            var u = !f || f(c);
            return React.default.createElement(k, {
              action: n,
              enabled: u,
              key: c,
              accessibilityLabel: 'action_item_' + c,
              showLine: c != s.length - 1,
              onPress: u && t.didSelectRow.bind(t, c),
              style: {
                overflow: 'hidden',
              },
              textColor: w ? w(c) : u ? b || o : l,
              underlayColor: v,
              lineColor: S,
              fontSize: 18,
            });
          });

        return React.default.createElement(
          module12.View,
          {
            style: {
              backgroundColor: 'transparent',
            },
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                P.containter,
                {
                  backgroundColor: C || n.actionSheet.backgroundColor,
                },
              ],
            },
            E,
            _
          ),
          React.default.createElement(
            module12.View,
            null,
            React.default.createElement(
              module12.View,
              {
                style: [
                  P.containter,
                  {
                    marginBottom: module391.default.isIphoneX() ? 0 : 15,
                    backgroundColor: C || n.actionSheet.backgroundColor,
                  },
                ],
              },
              React.default.createElement(k, {
                accessibilityLabel: 'action_item_cancel',
                action: module505.localization_strings_Main_MainPage_11,
                style: P.action,
                textColor: b || o,
                underlayColor: v,
                showLine: false,
                onPress: function () {
                  if (t.props.onPressCancel) t.props.onPressCancel();
                },
              })
            )
          )
        );
      },
    },
    {
      key: 'didSelectRow',
      value: function (t) {
        if (this.props.didSelectRow) this.props.didSelectRow(t);
      },
    },
  ]);
  return o;
})(React.Component);

exports.ActionSheetView = E;
E.contextType = module1121.AppConfigContext;
E.defaultProps = {
  title: null,
  actions: [],
};
E.propTypes = {
  title: PropTypes.default.string,
  actions: PropTypes.default.arrayOf(PropTypes.default.string),
  didSelectRow: PropTypes.default.func,
  onPressCancel: PropTypes.default.func,
};

var P = module12.StyleSheet.create({
    containter: {
      marginHorizontal: 8,
      backgroundColor: 'white',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: 8,
      overflow: 'hidden',
    },
    action: {
      alignSelf: 'stretch',
    },
    actionText: {
      textAlign: 'center',
      color: '#4A4A4A',
      fontSize: 18,
      lineHeight: 24,
      paddingVertical: 16,
    },
    line: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 0.5,
    },
  }),
  _ = module1428.default(E, true);

exports.default = _;
