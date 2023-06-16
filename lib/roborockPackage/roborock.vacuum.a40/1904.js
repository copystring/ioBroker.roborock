var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module391 = require('./391'),
  module385 = require('./385'),
  module394 = require('./394'),
  module515 = require('./515');

function E() {
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
  module393 = require('./393'),
  v = function (t) {
    return t ? module12.Dimensions.get('screen').width : module12.Dimensions.get('window').width;
  },
  b = (function (t) {
    module7.default(_, t);

    var n = _,
      module515 = E(),
      b = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var n;
      module4.default(this, _);
      (n = b.call(this, t)).state = {
        shouldShow: false,
      };
      return n;
    }

    module5.default(_, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'render',
        value: function () {
          React.default.createElement(
            module12.Modal,
            {
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {
                console.log('closed');
              },
            },
            o
          );
          var t = this,
            n = this.context.theme,
            o = React.default.createElement(
              module12.View,
              {
                style: [
                  x.container,
                  {
                    width: v(true),
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    x.wrap,
                    {
                      width: v(true) - 50,
                      backgroundColor: n.netWorkError.backgroundColor,
                    },
                    this.props.style,
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: {
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: (29 * v(true)) / 30,
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: x.icon,
                    resizeMode: 'contain',
                    source: n.netWorkError.icon,
                  }),
                  React.default.createElement(
                    module12.View,
                    {
                      style: x.middle,
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          x.title,
                          {
                            color: n.netWorkError.textColor,
                          },
                        ],
                      },
                      module500.nerwork_error_title
                    ),
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          x.content,
                          {
                            color: n.netWorkError.textColor,
                          },
                        ],
                      },
                      module500.network_error_detail
                    )
                  )
                ),
                React.default.createElement(module12.View, {
                  style: [
                    x.line,
                    {
                      backgroundColor: n.netWorkError.lineColor,
                    },
                  ],
                }),
                React.default.createElement(module385.PureButton, {
                  title: module500.localization_strings_Setting_RemoteControlPage_51,
                  textColor: n.netWorkError.textColor,
                  style: [
                    x.button,
                    {
                      backgroundColor: n.netWorkError.backgroundColor,
                    },
                  ],
                  fontSize: 16,
                  onPress: function () {
                    t.setState({
                      shouldShow: false,
                    });
                    module393.closeCurrentPage();
                  },
                })
              )
            ),
            l = this.state.shouldShow ? o : React.default.createElement(module12.View, null);
          return module391.default.iOSAndroidReturn(l, l);
        },
      },
    ]);
    return _;
  })(React.Component);

exports.default = b;
b.contextType = module515.AppConfigContext;
var x = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(00, 00, 00, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  icon: {
    marginTop: 40,
    width: 200,
    height: 106,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  middle: {
    marginTop: 40,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  content: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  line: {
    marginTop: 30,
    alignSelf: 'stretch',
    height: 1,
  },
  button: {
    alignSelf: 'stretch',
    height: 48,
  },
});
