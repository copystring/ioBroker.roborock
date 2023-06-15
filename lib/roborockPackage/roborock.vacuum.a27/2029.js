var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module391 = require('./391');

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

var module393 = require('./393'),
  module505 = require('./505').strings,
  C = (function (t) {
    module7.default(k, t);

    var o = k,
      C = b(),
      R = function () {
        var t,
          n = module11.default(o);

        if (C) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var o;
      module4.default(this, k);
      (o = R.call(this, t)).state = {
        simOneName: ' ',
        simOneOperator: ' ',
        simOneCountryCode: ' ',
        simTwoName: ' ',
        simTwoOperator: ' ',
        simTwoCountryCode: ' ',
        hasSimTwo: false,
      };
      return o;
    }

    module5.default(k, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getOperatorsInfo();
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          console.log('System Info : ' + JSON.stringify(module393.systemInfo));
        },
      },
      {
        key: 'getItems',
        value: function () {
          return [
            {
              title: '\u53611',
              detail: ' ',
              detailWidth: 150,
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: '\u8fd0\u8425\u5546\u540d\u79f0',
              detail: this.state.simOneName,
              detailWidth: 350,
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: '\u8fd0\u8425\u5546 \u56fd\u5bb6\u7f16\u7801(\u4e09\u4f4d)+\u7f51\u7edc\u7f16\u7801',
              detail: this.state.simOneOperator,
              detailWidth: 150,
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: '\u8fd0\u8425\u5546\u56fd\u5bb6\u7801',
              detail: this.state.simOneCountryCode,
              shouldShowRightArrow: false,
              visible: true,
            },
            {
              title: '\u53612',
              detail: ' ',
              detailWidth: 150,
              shouldShowRightArrow: false,
              visible: this.state.hasSimTwo,
            },
            {
              title: '\u8fd0\u8425\u5546\u540d\u79f0',
              detail: this.state.simTwoName,
              detailWidth: 350,
              shouldShowRightArrow: false,
              visible: this.state.hasSimTwo,
            },
            {
              title: '\u8fd0\u8425\u5546 \u56fd\u5bb6\u7f16\u7801(\u4e09\u4f4d)+\u7f51\u7edc\u7f16\u7801',
              detail: this.state.simTwoOperator,
              detailWidth: 150,
              shouldShowRightArrow: false,
              visible: this.state.hasSimTwo,
            },
            {
              title: '\u8fd0\u8425\u5546\u56fd\u5bb6\u7801',
              detail: this.state.simTwoCountryCode,
              shouldShowRightArrow: false,
              visible: this.state.hasSimTwo,
            },
          ];
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.getItems().map(function (t, o) {
              return t.visible
                ? React.default.createElement(
                    module385.SettingListItemView,
                    module22.default({}, t, {
                      key: o,
                      titleColor: 'rgba(0,0,0,0.8)',
                    })
                  )
                : React.default.createElement(module12.View, {
                    key: o,
                  });
            });
          return React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: true,
              onRequestClose: this.onPressHideButton.bind(this),
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  T.containter,
                  {
                    height: module12.Dimensions.get('window').height - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: {
                    backgroundColor: 'white',
                  },
                },
                o,
                React.default.createElement(
                  module12.View,
                  {
                    style: T.bottom,
                  },
                  React.default.createElement(module385.PureButton, {
                    title: module505.debug_info_close,
                    textColor: '#000000',
                    style: T.button,
                    onPress: function () {
                      return t.onPressHideButton();
                    },
                  })
                )
              )
            )
          );
        },
      },
      {
        key: 'onPressHideButton',
        value: function () {
          this.props.parent.setState({
            shouldShowDebugOperatorsInfoView: false,
          });
        },
      },
      {
        key: 'getOperatorsInfo',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module393.getOperatorsInfo());

                  case 2:
                    if ((t = o.sent)) {
                      o.next = 6;
                      break;
                    }

                    console.log('getOperatorsInfo error\uff1a + ' + t);
                    return o.abrupt('return');

                  case 6:
                    if (undefined != t[1])
                      this.setState({
                        simOneName: this.replaceTrim(t[1].name),
                        simOneOperator: this.replaceTrim(t[1].simOperator),
                        simOneCountryCode: this.replaceTrim(t[1].countryCode),
                      });
                    if (undefined != t[2])
                      this.setState({
                        simTwoName: this.replaceTrim(t[2].name),
                        simTwoOperator: this.replaceTrim(t[2].simOperator),
                        simTwoCountryCode: this.replaceTrim(t[2].countryCode),
                        hasSimTwo: true,
                      });
                    console.log('getOperatorsInfo \uff1a + ' + JSON.stringify(t));

                  case 9:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'replaceTrim',
        value: function (t) {
          return '' == t ? '\u672a\u77e5' : t;
        },
      },
    ]);
    return k;
  })(React.Component);

exports.default = C;
var T = module12.StyleSheet.create({
  containter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    width: 100,
    height: 40,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 20,
  },
});
