var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module506 = require('./506'),
  module483 = require('./483'),
  module387 = require('./387');

function y() {
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

require('./389');

require('./934');

var C = (function (t) {
  module7.default(S, t);

  var module506 = S,
    C = y(),
    R = function () {
      var t,
        o = module11.default(module506);

      if (C) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function S(t) {
    var o;
    module4.default(this, S);
    (o = R.call(this, t)).state = {
      current: t.current ? t.current : 0,
      dataSource: new module483.default.DataSource({
        rowHasChanged: function (t, o) {
          return t !== o;
        },
      }),
    };
    return o;
  }

  module5.default(S, [
    {
      key: 'componentDidMount',
      value: function () {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.items),
        });
      },
    },
    {
      key: '_pressRow',
      value: function (t) {
        this.setState({
          current: t,
        });
        this.props.onSelectRow(t);
      },
    },
    {
      key: '_renderRow',
      value: function (t, n, l) {
        var c = this,
          u = this.context.theme.repeatDialog,
          s =
            l == this.props.items.length - 1
              ? React.default.createElement(module12.View, null)
              : React.default.createElement(module12.View, {
                  style: [
                    x.separator,
                    {
                      backgroundColor: u.borderColor,
                    },
                  ],
                }),
          module1866 =
            l != this.state.current
              ? null
              : React.default.createElement(module12.Image, {
                  style: x.listArrow,
                  source: require('./1866'),
                });
        return React.default.createElement(
          module12.TouchableHighlight,
          module21.default({}, module387.default.getAccessibilityLabel('repeat_dialog_item_' + l), {
            onPress: function () {
              return c._pressRow(l);
            },
          }),
          React.default.createElement(
            module12.View,
            {
              style: [
                x.rowContainer,
                {
                  backgroundColor: u.backgroundColor,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: x.rowView,
              },
              module1866,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    x.title,
                    {
                      color: this.state.current == l ? '#3384FF' : u.detailColor,
                      marginLeft: this.state.current == l ? 6 : 11,
                    },
                  ],
                },
                t
              )
            ),
            s
          )
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this.context.theme.repeatDialog;
        return React.default.createElement(
          module12.View,
          {
            style: [
              x.container,
              {
                backgroundColor: t.backgroundColor,
              },
            ],
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                x.titleView,
                {
                  borderBottomColor: t.borderColor,
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  x.titleLabel,
                  {
                    color: t.titleColor,
                  },
                ],
              },
              this.props.title
            )
          ),
          React.default.createElement(module483.default, {
            style: x.list,
            dataSource: this.state.dataSource,
            scrollEnabled: false,
            renderRow: this._renderRow.bind(this),
          })
        );
      },
    },
  ]);
  return S;
})(React.default.Component);

C.contextType = module506.AppConfigContext;
var x = module12.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
  },
  list: {
    flex: 0,
    alignSelf: 'stretch',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 58,
    alignItems: 'stretch',
  },
  titleView: {
    height: 45,
    justifyContent: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'stretch',
  },
  titleLabel: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  rowView: {
    flex: 1,
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 20,
    textAlign: globals.isRTL ? 'right' : 'left',
  },
  listArrow: {
    width: 8,
    height: 13,
    transform: [
      {
        rotateY: globals.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  separator: {
    height: 0.8,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 26,
    justifyContent: 'center',
    marginVertical: 15,
  },
  buttonText: {
    flex: 0,
    fontSize: 14,
    alignSelf: 'center',
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
});
module.exports = C;
