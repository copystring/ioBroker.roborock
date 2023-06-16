var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  PropTypes = require('prop-types'),
  module1501 = require('./1501'),
  module1193 = require('./1193');

function S(t) {
  var n = x();
  return function () {
    var o,
      l = module12.default(t);

    if (n) {
      var c = module12.default(this).constructor;
      o = Reflect.construct(l, arguments, c);
    } else o = l.apply(this, arguments);

    return module11.default(this, o);
  };
}

function x() {
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
  E = (function (t) {
    module9.default(s, t);
    var n = S(s);

    function s() {
      module6.default(this, s);
      return n.apply(this, arguments);
    }

    module7.default(s, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            n = this.props;
          return React.default.createElement(
            module13.TouchableHighlight,
            module22.default({}, module391.default.getAccessibilityLabel(n.accessibilityLabel), {
              onPress: n.enabled ? n.onPress : null,
              underlayColor: n.enabled ? n.underlayColor || t.actionSheet.underlayColor : 'transparent',
              activeOpacity: n.enabled ? 0.85 : 1,
            }),
            React.default.createElement(
              module13.View,
              {
                style: [A.action, n.style],
              },
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    A.actionText,
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
              n.detail &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      A.detailText,
                      {
                        color: n.textColor || 'rgba(0,0,0,0.8)',
                      },
                    ],
                  },
                  module391.default.reuduceEnterString(n.detail)
                ),
              n.showLine &&
                React.default.createElement(module13.View, {
                  style: [
                    A.line,
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

E.contextType = module1193.AppConfigContext;
E.defaultProps = {
  enabled: true,
};
E.propTypes = {
  action: PropTypes.default.string,
  enabled: PropTypes.default.bool,
};

var k = (function (t) {
  module9.default(o, t);
  var n = S(o);

  function o(t) {
    module6.default(this, o);
    return n.call(this, t);
  }

  module7.default(o, [
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
          x = c.textColorAdapter,
          k = c.details,
          P = u
            ? React.default.createElement(E, {
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
            : React.default.createElement(module13.View, null),
          T = s.map(function (n, c) {
            var u,
              h,
              y = !f || f(c),
              C = (null != (u = null == (h = null != k ? k : []) ? undefined : h.length) ? u : 0) <= c ? null : k[c];
            return React.default.createElement(E, {
              action: n,
              detail: C,
              enabled: y,
              key: c,
              accessibilityLabel: 'action_item_' + c,
              showLine: c != s.length - 1,
              onPress: y && t.didSelectRow.bind(t, c),
              style: {
                overflow: 'hidden',
              },
              textColor: x ? x(c) : y ? b || o : l,
              underlayColor: v,
              lineColor: S,
              fontSize: 18,
            });
          });
        return React.default.createElement(
          module13.View,
          {
            style: {
              backgroundColor: 'transparent',
            },
          },
          React.default.createElement(
            module13.View,
            {
              style: [
                A.containter,
                {
                  backgroundColor: C || n.actionSheet.backgroundColor,
                },
              ],
            },
            P,
            T
          ),
          React.default.createElement(
            module13.View,
            null,
            React.default.createElement(
              module13.View,
              {
                style: [
                  A.containter,
                  {
                    marginBottom: module391.default.isIphoneX() ? 0 : 15,
                    backgroundColor: C || n.actionSheet.backgroundColor,
                  },
                ],
              },
              React.default.createElement(E, {
                accessibilityLabel: 'action_item_cancel',
                action: module510.localization_strings_Main_MainPage_11,
                style: A.action,
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

exports.ActionSheetView = k;
k.contextType = module1193.AppConfigContext;
k.defaultProps = {
  title: null,
  actions: [],
  details: [],
};
k.propTypes = {
  title: PropTypes.default.string,
  actions: PropTypes.default.arrayOf(PropTypes.default.string),
  didSelectRow: PropTypes.default.func,
  onPressCancel: PropTypes.default.func,
};
var A = module13.StyleSheet.create({
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
      paddingVertical: 16,
    },
    actionText: {
      textAlign: 'center',
      color: '#4A4A4A',
      fontSize: 18,
      lineHeight: 24,
    },
    detailText: {
      textAlign: 'center',
      color: '#9B9B9B',
      fontSize: 14,
      lineHeight: 20,
      marginTop: 4,
    },
    line: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 0.5,
    },
  }),
  P = module1501.default(k, true);
exports.default = P;
