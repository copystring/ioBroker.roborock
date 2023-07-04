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
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module1116 = require('./1116'),
  module382 = require('./382');

function y(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (y = function (t) {
    return t ? o : n;
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
  v = (function (t) {
    module7.default(E, t);

    var module1116 = E,
      y = w(),
      v = function () {
        var t,
          n = module11.default(module1116);

        if (y) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var o;
      module4.default(this, E);
      (o = v.call(this, t)).state = {
        selectedIndexs: t.selectedIndexs || [],
      };
      return o;
    }

    module5.default(E, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          this.setState({
            selectedIndexs: undefined == t.selectedIndexs ? 0 : t.selectedIndexs,
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {},
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props,
            o = n.options,
            l = n.title,
            s = n.multiSelectionEnabled,
            module1119 = function (t) {
              return React.default.createElement(
                module12.TouchableWithoutFeedback,
                {
                  onPress: t.onPress,
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [x.option, t.style],
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: x.optionText,
                      },
                      t.option
                    ),
                    t.selected &&
                      React.default.createElement(module12.Image, {
                        style: {
                          width: 30,
                          height: 30,
                          marginRight: 15,
                        },
                        source: require('./1119'),
                      })
                  ),
                  t.showLine &&
                    React.default.createElement(module12.View, {
                      style: x.line,
                    })
                )
              );
            },
            p = o.map(function (n, l) {
              var s = -1 !== t.state.selectedIndexs.indexOf(l);
              return React.default.createElement(module1119, {
                option: n,
                key: l,
                selected: s,
                showLine: l != o.length - 1,
                onPress: t.didSelectRow.bind(t, l),
              });
            });

          return React.default.createElement(
            module12.View,
            {
              style: x.containter,
            },
            React.default.createElement(
              module12.View,
              {
                style: x.titleWrap,
              },
              React.default.createElement(
                module12.Text,
                {
                  style: x.title,
                },
                l
              ),
              React.default.createElement(module12.View, {
                style: x.titleBottomLine,
              })
            ),
            p,
            s &&
              React.default.createElement(
                module12.View,
                {
                  style: x.actionWrap,
                },
                React.default.createElement(module382.PureButton, {
                  title: module491.localization_strings_Main_MainPage_11,
                  style: x.actionButton,
                  onPress: function () {
                    return t.props.parent.hide();
                  },
                }),
                React.default.createElement(module382.PureButton, {
                  title: module491.localization_strings_Main_Error_ErrorDetailPage_3,
                  style: [
                    x.actionButton,
                    {
                      borderLeftWidth: 0.8,
                      borderColor: '#eeeeee',
                    },
                  ],
                  onPress: function () {
                    if (t.props.selectedItemsDidChange) t.props.selectedItemsDidChange(t.state.selectedIndexs);
                    t.props.parent.hide();
                  },
                })
              )
          );
        },
      },
      {
        key: 'didSelectRow',
        value: function (t) {
          if (this.props.multiSelectionEnabled) {
            var n = this.state.selectedIndexs.indexOf(t),
              o = -1 != n;
            console.log(t + ' - ' + o);
            var l = this.state.selectedIndexs.concat();
            if (o) l.splice(n, 1);
            else l.push(t);
            this.setState({
              selectedIndexs: l,
            });
          } else {
            this.props.parent.hide();
            this.setState({
              selectedIndexs: [t],
            });
            if (this.props.didSelectRow) this.props.didSelectRow(t);
          }
        },
      },
    ]);
    return E;
  })(React.Component);

v.defaultProps = {
  options: ['\u9009\u98791', '\u9009\u98792', '\u9009\u98793', '\u9009\u98794'],
  multiSelectionEnabled: false,
};
var x = module12.StyleSheet.create({
    containter: {
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      marginHorizontal: 10,
      marginVertical: 10,
      borderRadius: 8,
      overflow: 'hidden',
    },
    titleWrap: {
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 17,
      paddingVertical: 15,
      color: 'rgba(0,0,0,0.8)',
    },
    titleBottomLine: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: module12.Dimensions.get('window').width - 20,
      backgroundColor: 'rgba(0,0,0,0.2)',
      height: 0.5,
    },
    option: {
      alignSelf: 'stretch',
      height: 50,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    optionText: {
      marginLeft: 15,
      textAlign: 'center',
      color: 'rgba(0,0,0,0.8)',
    },
    line: {
      position: 'absolute',
      width: module12.Dimensions.get('window').width,
      left: 0,
      bottom: 0,
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    cancel: {
      marginTop: 5,
    },
    actionWrap: {
      borderTopWidth: 0.8,
      borderColor: '#eeeeee',
      flexDirection: 'row',
    },
    actionButton: {
      flex: 1,
      height: 50,
    },
  }),
  E = module1116.default(v, true);
exports.default = E;
