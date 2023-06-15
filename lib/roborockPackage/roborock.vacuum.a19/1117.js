var module21 = require('./21'),
  module4 = require('./4'),
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
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var f = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (f && (f.get || f.set)) Object.defineProperty(l, u, f);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387'),
  PropTypes = require('prop-types'),
  module1116 = require('./1116'),
  module506 = require('./506');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function C(t) {
  var n = S();
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

var module491 = require('./491').strings,
  k = (function (t) {
    module7.default(f, t);
    var u = C(f);

    function f() {
      module4.default(this, f);
      return u.apply(this, arguments);
    }

    module5.default(f, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = this.props;
          return React.default.createElement(
            module12.TouchableHighlight,
            module21.default({}, module387.default.getAccessibilityLabel(o.accessibilityLabel), {
              onPress: o.enabled && o.onPress,
              underlayColor: o.enabled ? t.actionSheet.underlayColor : 'transparent',
              activeOpacity: o.enabled ? 0.85 : 1,
            }),
            React.default.createElement(
              module12.View,
              {
                style: [_.action, o.style],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    _.actionText,
                    {
                      color: o.textColor || 'rgba(0,0,0,0.8)',
                    },
                    {
                      fontSize: o.fontSize || 18,
                    },
                  ],
                },
                module387.default.reuduceEnterString(o.action)
              ),
              o.showLine &&
                React.default.createElement(module12.View, {
                  style: [
                    _.line,
                    {
                      backgroundColor: t.actionSheet.borderColor,
                    },
                  ],
                })
            )
          );
        },
      },
    ]);
    return f;
  })(React.Component);

k.contextType = module506.AppConfigContext;
k.defaultProps = {
  enabled: true,
};
k.propTypes = {
  action: PropTypes.default.string,
  enabled: PropTypes.default.bool,
};

var x = (function (t) {
  module7.default(u, t);
  var n = C(u);

  function u(t) {
    module4.default(this, u);
    return n.call(this, t);
  }

  module5.default(u, [
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
          f = c.actions,
          y = c.enabledAdapter,
          w = u
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
          b = f.map(function (n, c) {
            var u = !y || y(c);
            return React.default.createElement(k, {
              action: n,
              enabled: u,
              key: c,
              accessibilityLabel: 'action_item_' + c,
              showLine: c != f.length - 1,
              onPress: u && t.didSelectRow.bind(t, c),
              style: {
                overflow: 'hidden',
              },
              textColor: u ? o : l,
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
                _.containter,
                {
                  backgroundColor: n.actionSheet.backgroundColor,
                },
              ],
            },
            w,
            b
          ),
          React.default.createElement(
            module12.View,
            null,
            React.default.createElement(
              module12.View,
              {
                style: [
                  _.containter,
                  {
                    marginBottom: module387.default.isIphoneX() ? 0 : 15,
                    backgroundColor: n.actionSheet.backgroundColor,
                  },
                ],
              },
              React.default.createElement(k, {
                accessibilityLabel: 'action_item_cancel',
                action: module491.localization_strings_Main_MainPage_11,
                style: _.action,
                textColor: o,
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
  return u;
})(React.Component);

exports.ActionSheetView = x;
x.contextType = module506.AppConfigContext;
x.defaultProps = {
  title: null,
  actions: [],
};
x.propTypes = {
  title: PropTypes.default.string,
  actions: PropTypes.default.arrayOf(PropTypes.default.string),
  didSelectRow: PropTypes.default.func,
  onPressCancel: PropTypes.default.func,
};

var _ = module12.StyleSheet.create({
    containter: {
      width: module12.Dimensions.get('window').width - 16,
      marginLeft: 8,
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'transparent',
      marginBottom: 8,
      overflow: 'hidden',
    },
    action: {
      width: module12.Dimensions.get('window').width - 16,
      alignSelf: 'center',
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
      width: module12.Dimensions.get('window').width - 16,
      left: 0,
      bottom: 0,
      height: 0.5,
    },
    lineView: {
      width: module12.Dimensions.get('window').width - 16,
      height: 10,
    },
    cancel: {
      height: 60,
    },
  }),
  E = module1116.default(x, true);

exports.default = E;
