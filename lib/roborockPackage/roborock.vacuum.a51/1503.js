var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1501 = require('./1501'),
  module386 = require('./386');

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

var module510 = require('./510').strings,
  v = (function (t) {
    module9.default(E, t);

    var n = E,
      module1501 = b(),
      v = function () {
        var t,
          o = module12.default(n);

        if (module1501) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function E(t) {
      var n;
      module6.default(this, E);
      (n = v.call(this, t)).state = {
        selectedIndexs: t.selectedIndexs || [],
      };
      return n;
    }

    module7.default(E, [
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
        key: 'render',
        value: function () {
          var t = this,
            n = this.props,
            o = n.options,
            l = n.title,
            s = n.multiSelectionEnabled,
            module1504 = function (t) {
              return React.default.createElement(
                module13.TouchableWithoutFeedback,
                {
                  onPress: t.onPress,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: [w.option, t.style],
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      {
                        style: w.optionText,
                      },
                      t.option
                    ),
                    t.selected &&
                      React.default.createElement(module13.Image, {
                        style: {
                          width: 30,
                          height: 30,
                          marginRight: 15,
                        },
                        source: require('./1504'),
                      })
                  ),
                  t.showLine &&
                    React.default.createElement(module13.View, {
                      style: w.line,
                    })
                )
              );
            },
            u = o.map(function (n, l) {
              var s = -1 !== t.state.selectedIndexs.indexOf(l);
              return React.default.createElement(module1504, {
                option: n,
                key: l,
                selected: s,
                showLine: l != o.length - 1,
                onPress: t.didSelectRow.bind(t, l),
              });
            });

          return React.default.createElement(
            module13.View,
            {
              style: w.containter,
            },
            React.default.createElement(
              module13.View,
              {
                style: w.titleWrap,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: w.title,
                },
                l
              ),
              React.default.createElement(module13.View, {
                style: w.titleBottomLine,
              })
            ),
            u,
            s &&
              React.default.createElement(
                module13.View,
                {
                  style: w.actionWrap,
                },
                React.default.createElement(module386.PureButton, {
                  title: module510.localization_strings_Main_MainPage_11,
                  style: w.actionButton,
                  onPress: function () {
                    return t.props.parent.hide();
                  },
                }),
                React.default.createElement(module386.PureButton, {
                  title: module510.localization_strings_Main_Error_ErrorDetailPage_3,
                  style: [
                    w.actionButton,
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
var w = module13.StyleSheet.create({
    containter: {
      backgroundColor: '#f5f5f5',
      marginHorizontal: 10,
      marginBottom: 10,
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
      right: 0,
      bottom: 0,
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
      left: 0,
      right: 0,
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
  E = module1501.default(v, true);
exports.default = E;
