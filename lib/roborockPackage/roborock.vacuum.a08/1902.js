var module21 = require('./21'),
  module49 = require('./49'),
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
    var o = v(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (s && (s.get || s.set)) Object.defineProperty(l, u, s);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module506 = require('./506'),
  module381 = require('./381'),
  module1067 = require('./1067'),
  module387 = require('./387');

function v(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (v = function (t) {
    return t ? o : n;
  })(t);
}

function x(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var l = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      x(Object(l), true).forEach(function (n) {
        module49.default(t, n, l[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      x(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function _() {
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

require('./385');

require('./503');

var module491 = require('./491'),
  C = module491.strings,
  D = module12.Dimensions.get('window'),
  S = D.height,
  E = (function (t) {
    module7.default(x, t);

    var module49 = x,
      module506 = _(),
      v = function () {
        var t,
          n = module11.default(module49);

        if (module506) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      module4.default(this, x);
      return v.call(this, t);
    }

    module5.default(x, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            o = P(
              {
                width: module12.Dimensions.get('window').width - 100,
                height: 45,
                radius: 22,
              },
              t.shadowConfig
            );
          return React.default.createElement(
            module12.View,
            {
              style: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                height: 'tw' == this.props.location ? S - 204 : S - 344,
                backgroundColor: t.settingBackgroundColor,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: T.rowView,
              },
              React.default.createElement(
                module1067.BoxShadow,
                {
                  setting: o,
                },
                React.default.createElement(module381.PureButton, {
                  funcId: 'contract_question_upload',
                  style: [
                    T.uploadButton,
                    {
                      backgroundColor: t.supplies.resetBackgroundColor,
                    },
                  ],
                  textColor: t.supplies.resetTextColor,
                  title: this.props.text1,
                  onPress: this.props.onUploadLog,
                })
              ),
              React.default.createElement(
                module12.Text,
                {
                  numberOfLines: 5,
                  style: {
                    textAlign: 'center',
                    fontSize: 12,
                    color: t.customService.generateTextColor,
                    lineHeight: 17,
                    marginTop: 8,
                  },
                },
                this.props.text2
              ),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    marginTop: 8,
                    marginBottom: 50,
                    flexDirection: 'row',
                  },
                },
                React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      fontSize: 13,
                      color: t.customService.generateTextColor,
                    },
                  },
                  C.rubys_setting_guide_contact_report_for_reference
                ),
                React.default.createElement(
                  module12.TouchableHighlight,
                  module21.default({}, module387.default.getAccessibilityLabel('contract_privacy_html'), {
                    underlayColor: 'transparent',
                    onPress: this.props.onClickOpenPrivacyPage,
                  }),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: {
                        fontSize: 13,
                        color: t.customService.highlightTextColor,
                      },
                    },
                    C.localization_strings_Main_Views_ImprovementPage_0
                  )
                )
              )
            )
          );
        },
      },
    ]);
    return x;
  })(React.default.Component);

exports.default = E;
E.contextType = module506.AppConfigContext;
var T = module12.StyleSheet.create({
  rowView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 22,
    marginRight: 22,
  },
  uploadButton: {
    alignSelf: 'stretch',
    height: 40,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 26,
    minWidth: module12.Dimensions.get('window').width - 100,
  },
});
