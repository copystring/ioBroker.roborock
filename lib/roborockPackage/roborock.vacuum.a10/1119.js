require('./382');

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = C(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      u = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var s in t)
      if ('default' !== s && Object.prototype.hasOwnProperty.call(t, s)) {
        var c = u ? Object.getOwnPropertyDescriptor(t, s) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, s, c);
        else l[s] = t[s];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module1120 = require('./1120'),
  module387 = require('./387'),
  module506 = require('./506');

function C(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (C = function (t) {
    return t ? n : o;
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

require('./389');

var module491 = require('./491').strings,
  k = (function (t) {
    module7.default(P, t);

    var module506 = P,
      C = w(),
      k = function () {
        var t,
          o = module11.default(module506);

        if (C) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var o;
      module4.default(this, P);
      (o = k.call(this, t)).state = {
        shouldShow: true,
        currentDate: o.props.showDate,
      };
      return o;
    }

    module5.default(P, [
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
              style: [v.containter, this.props.style],
            },
            React.default.createElement(
              module12.View,
              module21.default(
                {
                  style: [
                    v.wrapView,
                    {
                      backgroundColor: t.backgroundColor,
                    },
                  ],
                },
                module387.default.getAccessibilityLabel('timer_picker_wrapper')
              ),
              React.default.createElement(
                module12.View,
                {
                  style: [
                    v.titleView,
                    {
                      borderBottomColor: t.lineColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      v.titleLabel,
                      {
                        color: t.titleColor,
                      },
                    ],
                  },
                  this.props.title || module491.localization_strings_Setting_DoNotDisturbPage_0
                )
              ),
              React.default.createElement(module1120.default, {
                style: [
                  v.datePicker,
                  {
                    backgroundColor: t.backgroundColor,
                  },
                ],
                date: this.state.currentDate,
                mode: 'time',
                onDateChange: this.onDateChange.bind(this),
                minuteInterval: 1,
              })
            ),
            React.default.createElement(
              module12.View,
              {
                style: [
                  v.buttons,
                  {
                    backgroundColor: t.backgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.TouchableHighlight,
                module21.default(
                  {
                    style: [
                      v.button,
                      {
                        borderTopLeftRadius: 14,
                        borderBottomLeftRadius: 14,
                        backgroundColor: t.backgroundColor,
                      },
                    ],
                    onPress: this.onPressCancelButton.bind(this),
                    underlayColor: t.underlayColor,
                  },
                  module387.default.getAccessibilityLabel('timer_sel_alert_btn1')
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      v.buttonText,
                      {
                        color: t.titleColor,
                      },
                    ],
                  },
                  module491.localization_strings_Main_MainPage_11
                )
              ),
              React.default.createElement(module12.View, {
                style: [
                  v.line,
                  {
                    backgroundColor: t.lineColor,
                  },
                ],
              }),
              React.default.createElement(
                module12.TouchableHighlight,
                module21.default(
                  {
                    style: [
                      v.button,
                      {
                        borderTopRightRadius: 14,
                        borderBottomRightRadius: 14,
                        backgroundColor: t.backgroundColor,
                      },
                    ],
                    onPress: this.onPressConfirmButton.bind(this),
                    underlayColor: t.underlayColor,
                  },
                  module387.default.getAccessibilityLabel('timer_sel_alert_btn2')
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      v.buttonText,
                      {
                        color: t.confirmTextColor,
                      },
                    ],
                  },
                  module491.rubys_location_confirm_button_confirm
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
    return P;
  })(React.Component);

exports.default = k;
k.contextType = module506.AppConfigContext;
var v = module12.StyleSheet.create({
  containter: {
    width: module12.Dimensions.get('window').width - 20,
    marginLeft: 10,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flex: 1,
  },
  wrapView: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  floatTipView: {
    position: 'absolute',
    top: 135,
    width: module12.Dimensions.get('window').width - 20,
    height: 45,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
  },
  floatTipInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
