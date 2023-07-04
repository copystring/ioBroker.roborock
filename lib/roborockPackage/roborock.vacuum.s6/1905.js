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
    var o = y(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      f = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = f ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module387 = require('./387');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
  })(t);
}

function b() {
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

var module389 = require('./389'),
  v = (function (t) {
    module7.default(C, t);

    var y = C,
      v = b(),
      R = function () {
        var t,
          n = module11.default(y);

        if (v) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      module4.default(this, C);
      return R.call(this, t);
    }

    module5.default(C, [
      {
        key: 'render',
        value: function () {
          var module1906 =
              '' == this.props.guideUrl
                ? React.default.createElement(module12.View, null)
                : React.default.createElement(module12.Image, {
                    style: [
                      L.listArrow,
                      {
                        tintColor: module389.isDarkMode() ? 'xmwhite' : null,
                      },
                    ],
                    source: require('./1906'),
                  }),
            o = '' == this.props.name,
            l = React.default.createElement(
              module12.Text,
              {
                style: L.title,
                numberOfLines: 1,
              },
              this.props.name
            );
          return React.default.createElement(
            module12.TouchableHighlight,
            module21.default({}, module387.default.getAccessibilityLabel(this.props.accessibilityLabelKey), {
              disabled: o,
              onPress: this.props.onPress,
              style: o
                ? {
                    backgroundColor: 'rgba(239,239,244,1)',
                  }
                : {
                    backgroundColor: 'white',
                  },
              underlayColor: 'rgba(140,140,140,0.2)',
            }),
            React.default.createElement(
              module12.View,
              {
                style: o ? L.blankRowContainer : L.rowContainer,
              },
              this.props.hasTopSeparator &&
                React.default.createElement(module12.View, {
                  style: L.topLine,
                }),
              React.default.createElement(
                module12.View,
                {
                  style: L.rowView,
                },
                globals.isRTL && module1906,
                globals.isRTL && l,
                !globals.isRTL && l,
                !globals.isRTL && module1906
              ),
              React.default.createElement(module12.View, {
                style: this.props.shortSeparator ? L.separator : L.separatorLong,
              })
            )
          );
        },
      },
    ]);
    return C;
  })(React.default.PureComponent);

exports.default = v;
var L = module12.StyleSheet.create({
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 50,
    alignItems: 'stretch',
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    paddingRight: 3,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  separator: {
    height: 'ios' == module12.Platform.OS ? 0.5 : 0.4,
    marginTop: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 20,
  },
  separatorLong: {
    height: 'ios' == module12.Platform.OS ? 0.5 : 0.4,
    marginTop: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginLeft: 0,
    marginRight: 0,
  },
  blankRowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 8,
    alignItems: 'stretch',
  },
  listArrow: {
    width: 7,
    height: 13,
    marginRight: 20,
    marginLeft: 20,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  topLine: {
    height: 'ios' == module12.Platform.OS ? 0.5 : 0.4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
