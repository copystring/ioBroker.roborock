var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1217 = require('./1217'),
  module391 = require('./391'),
  module515 = require('./515');

function _() {
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

var module500 = require('./500').strings,
  v = (function (t) {
    module7.default(B, t);

    var o = B,
      module515 = _(),
      v = function () {
        var t,
          n = module11.default(o);

        if (module515) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      module4.default(this, B);
      (o = v.call(this, t)).state = {
        shouldShow: true,
        currentDate: o.props.showDate,
      };
      return o;
    }

    module5.default(B, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme.customDatePicker;
          return React.default.createElement(
            module12.View,
            {
              style: [w.containter, this.props.style],
            },
            React.default.createElement(
              module12.View,
              module22.default(
                {
                  style: [
                    w.wrapView,
                    {
                      backgroundColor: t.backgroundColor,
                    },
                  ],
                },
                module391.default.getAccessibilityLabel('timer_picker_wrapper')
              ),
              React.default.createElement(
                module12.View,
                {
                  style: [
                    w.titleView,
                    {
                      borderBottomColor: t.lineColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      w.titleLabel,
                      {
                        color: t.titleColor,
                      },
                    ],
                  },
                  this.props.title || module500.localization_strings_Setting_DoNotDisturbPage_0
                )
              ),
              React.default.createElement(module1217.default, {
                style: [
                  w.datePicker,
                  {
                    backgroundColor: t.backgroundColor,
                  },
                ],
                date: this.state.currentDate,
                mode: 'time',
                onDateChange: this.onDateChange.bind(this),
                minuteInterval: 1,
                itemColor: t.titleColor,
                selectedBackgroundColor: t.selectedBackgroundColor,
              })
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  w.buttons,
                  {
                    backgroundColor: t.backgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableHighlight,
                module22.default(
                  {
                    style: [
                      w.button,
                      {
                        borderTopLeftRadius: 14,
                        borderBottomLeftRadius: 14,
                        backgroundColor: t.backgroundColor,
                      },
                    ],
                    onPress: this.onPressCancelButton.bind(this),
                    underlayColor: t.underlayColor,
                  },
                  module391.default.getAccessibilityLabel('timer_sel_alert_btn1')
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      w.buttonText,
                      {
                        color: t.titleColor,
                      },
                    ],
                  },
                  module500.localization_strings_Main_MainPage_11
                )
              ),
              React.default.createElement(module12.View, {
                style: [
                  w.line,
                  {
                    backgroundColor: t.lineColor,
                  },
                ],
              }),
              React.default.createElement(
                module12.TouchableHighlight,
                module22.default(
                  {
                    style: [
                      w.button,
                      {
                        borderTopRightRadius: 14,
                        borderBottomRightRadius: 14,
                        backgroundColor: t.backgroundColor,
                      },
                    ],
                    onPress: this.onPressConfirmButton.bind(this),
                    underlayColor: t.underlayColor,
                  },
                  module391.default.getAccessibilityLabel('timer_sel_alert_btn2')
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      w.buttonText,
                      {
                        color: t.confirmTextColor,
                      },
                    ],
                  },
                  module500.rubys_location_confirm_button_confirm
                )
              )
            )
          );
        },
      },
      {
        key: 'onDateChange',
        value: function (t) {
          this.setState({
            currentDate: t,
          });
        },
      },
      {
        key: 'onPressCancelButton',
        value: function () {
          if (this.props.onPressCancelButton) this.props.onPressCancelButton();
        },
      },
      {
        key: 'onPressConfirmButton',
        value: function () {
          if (this.props.onPressConfirmButton) this.props.onPressConfirmButton(this.state.currentDate);
        },
      },
    ]);
    return B;
  })(React.Component);

exports.default = v;
v.contextType = module515.AppConfigContext;
var w = module12.StyleSheet.create({
  containter: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
  wrapView: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  datePicker: {
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: 'rgba(0,0,0,0.15)',
    borderTopWidth: 0.4,
    height: 52,
    borderRadius: 14,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
  titleView: {
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.4,
    alignSelf: 'stretch',
  },
  titleLabel: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  line: {
    width: 0.4,
  },
});
