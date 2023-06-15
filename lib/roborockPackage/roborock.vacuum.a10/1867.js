var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module381 = require('./381'),
  module483 = require('./483'),
  module387 = require('./387'),
  module506 = require('./506');

function p() {
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

require('./389');

require('./934');

var module491 = require('./491').strings,
  module1366 = require('./1366'),
  k = (function (t) {
    module7.default(E, t);

    var module506 = E,
      k = p(),
      I = function () {
        var t,
          n = module11.default(module506);

        if (k) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function E(t) {
      var n;
      module4.default(this, E);
      (n = I.call(this, t)).state = {
        selectedItems: t.selectedItems,
        dataSource: new module483.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
      };
      return n;
    }

    module5.default(E, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.selectedItems),
          });
        },
      },
      {
        key: '_pressRow',
        value: function (t) {
          var n = this.state.selectedItems.slice();
          n[t] = 1 == n[t] ? 0 : 1;
          this.setState({
            selectedItems: n,
          });
        },
      },
      {
        key: '_renderRow',
        value: function (t, o, l) {
          var c = this,
            s = this.context.theme.repeatDialog,
            module1868 =
              1 == parseInt(this.state.selectedItems[l])
                ? React.default.createElement(module12.Image, {
                    style: v.listArrow,
                    source: require('./1868'),
                  })
                : React.default.createElement(module12.View, null);
          return React.default.createElement(
            module12.TouchableHighlight,
            module21.default({}, module387.default.getAccessibilityLabel('custom_dialog_item_' + l), {
              onPress: function () {
                return c._pressRow(l);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  v.rowContainer,
                  {
                    backgroundColor: s.backgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: v.rowView,
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      v.title,
                      {
                        color: s.detailColor,
                      },
                    ],
                  },
                  module1366.Weeks()[l]
                ),
                module1868
              ),
              React.default.createElement(module12.View, {
                style: [
                  v.separator,
                  {
                    backgroundColor: s.borderColor,
                  },
                ],
              })
            )
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme.repeatDialog;
          return React.default.createElement(
            module12.View,
            {
              style: [
                v.container,
                {
                  backgroundColor: n.backgroundColor,
                },
              ],
            },
            React.default.createElement(module483.default, {
              style: v.list,
              dataSource: this.state.dataSource,
              scrollEnabled: false,
              renderRow: this._renderRow.bind(this),
            }),
            React.default.createElement(
              module12.View,
              {
                style: v.buttons,
              },
              React.default.createElement(module381.PureButton, {
                funcId: 'timer_dialog_cancel',
                title: module491.localization_strings_Main_MainPage_11,
                onPress: function () {
                  return t.props.cancel();
                },
                textColor: n.detailColor,
                style: [
                  v.button,
                  {
                    backgroundColor: n.backgroundColor,
                  },
                ],
                fontSize: 18,
              }),
              React.default.createElement(module12.View, {
                style: [
                  v.line,
                  {
                    backgroundColor: n.borderColor,
                  },
                ],
              }),
              React.default.createElement(module381.PureButton, {
                funcId: 'timer_dialog_confirm',
                title: module491.rubys_location_confirm_button_confirm,
                onPress: function () {
                  return t.props.cancel(t.state.selectedItems);
                },
                textColor: n.detailColor,
                style: [
                  v.button,
                  {
                    backgroundColor: n.backgroundColor,
                  },
                ],
                fontSize: 18,
              })
            )
          );
        },
      },
    ]);
    return E;
  })(React.default.Component);

k.contextType = module506.AppConfigContext;
var v = module12.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 11.5,
    overflow: 'hidden',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 52,
  },
  button: {
    flex: 1,
    width: module12.Dimensions.get('window').width / 2 - 10,
  },
  list: {
    flex: 0,
    alignSelf: 'stretch',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    height: 50,
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 20,
    textAlign: 'left',
    color: 'rgba(0,0,0,0.8)',
  },
  listArrow: {
    width: 15,
    height: 15,
    marginRight: 20,
    transform: [
      {
        rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  line: {
    width: 0.4,
  },
  separator: {
    height: 0.4,
    justifyContent: 'flex-end',
  },
});
module.exports = k;
