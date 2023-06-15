var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module385 = require('./385'),
  module501 = require('./501'),
  module391 = require('./391'),
  module1193 = require('./1193');

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

var module510 = require('./510').strings,
  module1638 = require('./1638'),
  k = (function (t) {
    module9.default(I, t);

    var module1193 = I,
      k = p(),
      v = function () {
        var t,
          n = module12.default(module1193);

        if (k) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function I(t) {
      var n;
      module6.default(this, I);
      (n = v.call(this, t)).state = {
        selectedItems: t.selectedItems,
        dataSource: new module501.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
      };
      return n;
    }

    module7.default(I, [
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
            module1969 =
              1 == parseInt(this.state.selectedItems[l])
                ? React.default.createElement(module13.Image, {
                    style: R.listArrow,
                    source: require('./1969'),
                  })
                : React.default.createElement(module13.View, null),
            w = React.default.createElement(
              module13.Text,
              {
                style: [
                  R.title,
                  {
                    color: s.detailColor,
                  },
                ],
              },
              module1638.Weeks()[l]
            );
          return React.default.createElement(
            module13.TouchableHighlight,
            module22.default({}, module391.default.getAccessibilityLabel('custom_dialog_item_' + l), {
              onPress: function () {
                return c._pressRow(l);
              },
            }),
            React.default.createElement(
              module13.View,
              {
                style: [
                  R.rowContainer,
                  {
                    backgroundColor: s.backgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module13.View,
                {
                  style: R.rowView,
                },
                globals.isRTL ? module1969 : w,
                globals.isRTL ? w : module1969
              ),
              React.default.createElement(module13.View, {
                style: [
                  R.separator,
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
            module13.View,
            {
              style: [
                R.container,
                {
                  backgroundColor: n.backgroundColor,
                },
              ],
            },
            React.default.createElement(module501.default, {
              style: R.list,
              dataSource: this.state.dataSource,
              scrollEnabled: false,
              renderRow: this._renderRow.bind(this),
            }),
            React.default.createElement(
              module13.View,
              {
                style: R.buttons,
              },
              React.default.createElement(module385.PureButton, {
                funcId: 'timer_dialog_cancel',
                title: module510.localization_strings_Main_MainPage_11,
                onPress: function () {
                  return t.props.cancel();
                },
                textColor: n.detailColor,
                style: [
                  R.button,
                  {
                    backgroundColor: n.backgroundColor,
                  },
                ],
                fontSize: 18,
              }),
              React.default.createElement(module13.View, {
                style: [
                  R.line,
                  {
                    backgroundColor: n.borderColor,
                  },
                ],
              }),
              React.default.createElement(module385.PureButton, {
                funcId: 'timer_dialog_confirm',
                title: module510.rubys_location_confirm_button_confirm,
                onPress: function () {
                  return t.props.cancel(t.state.selectedItems);
                },
                textColor: n.detailColor,
                style: [
                  R.button,
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
    return I;
  })(React.default.Component);

k.contextType = module1193.AppConfigContext;
var R = module13.StyleSheet.create({
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 12,
  },
  title: {
    flex: 0.7,
    fontSize: 18,
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 20,
    color: 'rgba(0,0,0,0.8)',
  },
  listArrow: {
    width: 15,
    height: 15,
    marginRight: 20,
    transform: [
      {
        rotateY: module13.I18nManager.isRTL ? '180deg' : '0deg',
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
