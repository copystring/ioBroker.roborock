require('./1409');

var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200'),
  module385 = require('./385'),
  module391 = require('./391');

function v() {
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

require('./389');

require('./1492');

var module393 = require('./393'),
  module510 = require('./510'),
  w = module510.strings,
  T = module13.Dimensions.get('window'),
  S = (function (t) {
    module9.default(T, t);

    var o = T,
      module1200 = v(),
      b = function () {
        var t,
          n = module12.default(o);

        if (module1200) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function T(t) {
      module6.default(this, T);
      return b.call(this, t);
    }

    module7.default(T, [
      {
        key: 'render',
        value: function () {
          var t = this.context.theme;
          return React.default.createElement(
            module13.View,
            {
              style: {
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                top: 20,
                backgroundColor: t.settingBackgroundColor,
              },
            },
            React.default.createElement(
              module13.View,
              {
                style: E.rowView,
              },
              React.default.createElement(module385.PureButton, {
                funcId: 'contract_question_upload',
                style: [
                  E.uploadButton,
                  {
                    backgroundColor: t.settingListItem.backgroundColor,
                  },
                ],
                textColor: t.supplies.resetTextColor,
                title: this.props.text1,
                onPress: this.props.onUploadLog,
              }),
              React.default.createElement(
                module13.Text,
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
                module13.View,
                {
                  style: {
                    marginTop: 8,
                    marginBottom: 50,
                    flexDirection: 'row',
                  },
                },
                React.default.createElement(
                  module13.Text,
                  {
                    style: {
                      fontSize: 13,
                      color: t.customService.generateTextColor,
                    },
                  },
                  w.rubys_setting_guide_contact_report_for_reference
                ),
                React.default.createElement(
                  module13.TouchableHighlight,
                  module22.default({}, module391.default.getAccessibilityLabel('contract_privacy_html'), {
                    underlayColor: 'transparent',
                    onPress: this.props.onClickOpenPrivacyPage,
                  }),
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        fontSize: 13,
                        color: module393.isMiApp ? t.customService.generateTextColor : t.customService.highlightTextColor,
                      },
                    },
                    w.localization_strings_Main_Views_ImprovementPage_0
                  )
                )
              )
            )
          );
        },
      },
    ]);
    return T;
  })(React.default.Component);

exports.default = S;
S.contextType = module1200.AppConfigContext;
var E = module13.StyleSheet.create({
  rowView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  uploadButton: {
    alignSelf: 'stretch',
    height: 60,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
  },
});
