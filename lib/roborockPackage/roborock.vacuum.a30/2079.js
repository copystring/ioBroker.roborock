var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module419 = require('./419'),
  module1121 = require('./1121'),
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

var module414 = require('./414').MM,
  k = (function (t) {
    module7.default(P, t);

    var n = P,
      module1121 = b(),
      k = function () {
        var t,
          o = module11.default(n);

        if (module1121) {
          var f = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, f);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var n;
      module4.default(this, P);

      (n = k.call(this, t)).onPressSubmit = function () {
        return regeneratorRuntime.default.async(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  module414.mapDiffCount = parseInt(n.state.mapCount);

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
        mapCount: module414.mapDiffCount + '',
        diffInfo: module414.diffInfo,
      };
      return n;
    }

    module5.default(P, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          this.diffListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.MapDynamicDiffInfoChange, function (n) {
            t.setState({
              diffInfo: module414.diffInfo,
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
            f = React.default.createElement(module12.TextInput, {
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
            module12.View,
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
              module12.Text,
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
k.contextType = module1121.AppConfigContext;
var S = module12.StyleSheet.create({
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
