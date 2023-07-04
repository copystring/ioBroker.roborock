var regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module420 = require('./420'),
  module1199 = require('./1199'),
  module385 = require('./385');

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

var module415 = require('./415').MM,
  k = (function (t) {
    module9.default(P, t);

    var n = P,
      module1199 = b(),
      k = function () {
        var t,
          o = module12.default(n);

        if (module1199) {
          var f = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, f);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function P(t) {
      var n;
      module6.default(this, P);

      (n = k.call(this, t)).onPressSubmit = function () {
        return regeneratorRuntime.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  module415.mapDiffCount = parseInt(n.state.mapCount);

                case 1:
                case 'end':
                  return t.stop();
              }
          },
          null,
          null,
          null,
          Promise
        );
      };

      n.state = {
        mapCount: module415.mapDiffCount + '',
        diffInfo: module415.diffInfo,
      };
      return n;
    }

    module7.default(P, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.diffListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.MapDynamicDiffInfoChange, function (n) {
            t.setState({
              diffInfo: module415.diffInfo,
            });
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          if (!(null == (t = this.diffListener))) t.remove();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = {
              backgroundColor: n.feedbackPage.inputBackgroundColor,
              color: n.feedbackPage.textColor,
            },
            f = React.default.createElement(module13.TextInput, {
              onChangeText: function (n) {
                return t.setState({
                  mapCount: n,
                });
              },
              value: this.state.mapCount,
              style: [S.nameInputStyle, o],
              clearButtonMode: 'while-editing',
              placeholder: '\u8bf7\u8f93\u5165\u5730\u56fe\u53d8\u5316\u70b9\u6570\u9608\u503c',
              placeholderTextColor: n.feedbackPage.inputPlaceholderColor,
            });
          return React.default.createElement(
            module13.View,
            {
              style: [
                S.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            f,
            React.default.createElement(
              module13.Text,
              {
                style: [S.mapDiffText, o],
              },
              this.state.diffInfo
            ),
            React.default.createElement(module385.PureButton, {
              style: S.buttonStyle,
              textColor: 'white',
              title: '\u786e\u5b9a',
              onPress: this.onPressSubmit,
            })
          );
        },
      },
    ]);
    return P;
  })(React.Component);

exports.default = k;
k.contextType = module1199.AppConfigContext;
var S = module13.StyleSheet.create({
  containterView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  nameInputStyle: {
    paddingLeft: 19,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: 'white',
    height: 48,
    marginTop: 15,
  },
  mapDiffText: {
    paddingLeft: 19,
    height: 48,
    marginTop: 15,
    fontSize: 15,
  },
  buttonStyle: {
    height: 40,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#3384ff',
    margin: 10,
  },
});
