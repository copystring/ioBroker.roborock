var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1513 = require('./1513'),
  module391 = require('./391'),
  module1199 = require('./1199');

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

var module510 = require('./510').strings,
  D = (function (t) {
    module9.default(x, t);

    var o = x,
      module1199 = _(),
      D = function () {
        var t,
          n = module12.default(o);

        if (module1199) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function x(t) {
      var o;
      module6.default(this, x);
      (o = D.call(this, t)).state = {
        shouldShow: true,
        currentDate: o.props.showDate,
      };
      return o;
    }

    module7.default(x, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          var t,
            o = this.context.theme.customDatePicker;
          return React.default.createElement(
            module13.View,
            {
              style: [w.containter, this.props.style],
            },
            React.default.createElement(
              module13.View,
              module22.default(
                {
                  style: [
                    w.wrapView,
                    {
                      backgroundColor: o.backgroundColor,
                    },
                  ],
                },
                module391.default.getAccessibilityLabel('timer_picker_wrapper')
              ),
              React.default.createElement(
                module13.View,
                {
                  style: [
                    w.titleView,
                    {
                      borderBottomColor: o.lineColor,
                    },
                  ],
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      w.titleLabel,
                      {
                        color: o.titleColor,
                      },
                    ],
                  },
                  this.props.title || module510.localization_strings_Setting_DoNotDisturbPage_0
                )
              ),
              React.default.createElement(module1513.default, {
                style: [
                  w.datePicker,
                  {
                    backgroundColor: o.backgroundColor,
                  },
                ],
                date: this.state.currentDate,
                mode: null != (t = this.props.mode) ? t : 'time',
                onDateChange: this.onDateChange.bind(this),
                minuteStep: this.props.minuteInterval,
                minDate: this.props.minDate,
                maxDate: this.props.maxDate,
                minHour: this.props.minHour,
                maxHour: this.props.maxHour,
                itemColor: o.titleColor,
                todayDescription: this.props.todayDescription,
                tomorrowDescription: this.props.tomorrowDescription,
                selectedBackgroundColor: o.selectedBackgroundColor,
              })
            ),
            React.default.createElement(
              module13.View,
              {
                style: [
                  w.buttons,
                  {
                    backgroundColor: o.backgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module13.TouchableHighlight,
                module22.default(
                  {
                    style: [
                      w.button,
                      {
                        borderTopLeftRadius: 14,
                        borderBottomLeftRadius: 14,
                        backgroundColor: o.backgroundColor,
                      },
                    ],
                    onPress: this.onPressCancelButton.bind(this),
                    underlayColor: o.underlayColor,
                  },
                  module391.default.getAccessibilityLabel('timer_sel_alert_btn1')
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      w.buttonText,
                      {
                        color: o.titleColor,
                      },
                    ],
                  },
                  module510.localization_strings_Main_MainPage_11
                )
              ),
              React.default.createElement(module13.View, {
                style: [
                  w.line,
                  {
                    backgroundColor: o.lineColor,
                  },
                ],
              }),
              React.default.createElement(
                module13.TouchableHighlight,
                module22.default(
                  {
                    style: [
                      w.button,
                      {
                        borderTopRightRadius: 14,
                        borderBottomRightRadius: 14,
                        backgroundColor: o.backgroundColor,
                      },
                    ],
                    onPress: this.onPressConfirmButton.bind(this),
                    underlayColor: o.underlayColor,
                  },
                  module391.default.getAccessibilityLabel('timer_sel_alert_btn2')
                ),
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      w.buttonText,
                      {
                        color: o.confirmTextColor,
                      },
                    ],
                  },
                  module510.rubys_location_confirm_button_confirm
                )
              )
            )
          );
        },
      },
      {
        key: 'onDateChange',
        value: function (t) {
          var o, n;
          this.setState({
            currentDate: t,
          });
          if (!(null == (o = (n = this.props).onDateChange))) o.call(n, t);
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
    return x;
  })(React.Component);

exports.default = D;
D.contextType = module1199.AppConfigContext;
var w = module13.StyleSheet.create({
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
