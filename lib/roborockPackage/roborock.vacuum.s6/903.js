require('./904');

require('./397');

require('./935');

var module4 = require('./4'),
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
    var o = C(n);
    if (o && o.has(t)) return o.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var u in t)
      if ('default' !== u && Object.prototype.hasOwnProperty.call(t, u)) {
        var c = s ? Object.getOwnPropertyDescriptor(t, u) : null;
        if (c && (c.get || c.set)) Object.defineProperty(l, u, c);
        else l[u] = t[u];
      }

    l.default = t;
    if (o) o.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module382 = require('./382'),
  module387 = require('./387'),
  module390 = require('./390'),
  module925 = require('./925'),
  module506 = require('./506'),
  module937 = require('./937');

function C(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (C = function (t) {
    return t ? o : n;
  })(t);
}

function T() {
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

var module491 = require('./491').strings,
  module389 = require('./389'),
  module936 = require('./936'),
  S = (function (t) {
    module7.default(R, t);

    var module506 = R,
      C = T(),
      S = function () {
        var t,
          n = module11.default(module506);

        if (C) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var o;
      module4.default(this, R);
      (o = S.call(this, t)).state = {
        shouldShow: false,
        isOverTimer: false,
      };
      o.isHide = true;
      return o;
    }

    module5.default(R, [
      {
        key: 'componentWillUnmount',
        value: function () {
          this.clearTimer();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme,
            o = module937.default;
          return React.default.createElement(
            o,
            {
              isModal: !module389.isWindowDisplay,
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {},
              style: {
                borderRadius: module936.AppBorderRadius,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  P.container,
                  {
                    height: module390.default.sharedCache().ScreenHeight - module387.default.statusbarHeight(),
                    backgroundColor: n.loading.backgroundColor,
                    borderRadius: module936.AppBorderRadius,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    P.loadingBox,
                    {
                      backgroundColor: n.loading.boxColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  module387.default.getAccessibilityLabel(this.props.loadingAccessibilityLabelKey),
                  React.default.createElement(module925.default, null)
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      P.text,
                      {
                        color: n.loading.textColor,
                      },
                    ],
                  },
                  this.state.text || module491.localization_strings_Common_Constants_19
                ),
                React.default.createElement(module382.PureImageButton, {
                  funcId: this.props.closeAccessibilityLabelKey,
                  style: {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 40,
                    height: 40,
                  },
                  onPress: function () {
                    t.hide();
                  },
                  imageWidth: 20,
                  imageHeight: 20,
                  image: n.loading.closeIcon,
                })
              )
            )
          );
        },
      },
      {
        key: 'showWithText',
        value: function (t) {
          this.isHide = false;
          this.setState({
            shouldShow: true,
            isOverTimer: false,
            text: t,
          });
        },
      },
      {
        key: 'showWithTextAndOverTimer',
        value: function (t, n) {
          var o = this;
          this.isHide = false;
          this.setState({
            shouldShow: true,
            isOverTimer: true,
            text: t,
          });
          this.timer = setTimeout(function () {
            if (!o.isHide) {
              o.hide();
              setTimeout(function () {
                if (o.props.onOverTimer) o.props.onOverTimer();
              }, 100);
            }
          }, n);
        },
      },
      {
        key: 'hide',
        value: function () {
          this.isHide = true;
          this.setState({
            shouldShow: false,
          });
          this.clearTimer();
        },
      },
      {
        key: 'onPressCancel',
        value: function () {
          this.hide();
          if (this.props.onPressCancel) this.props.onPressCancel();
        },
      },
      {
        key: 'clearTimer',
        value: function () {
          clearTimeout(this.timer);
          this.timer = null;
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = S;
S.contextType = module506.AppConfigContext;
S.defaultProps = {
  showButton: true,
};
var P = module12.StyleSheet.create({
  container: {
    width: module12.Dimensions.get('window').width,
    height: module12.Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 30,
  },
  cancelButton: {
    marginRight: 20,
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 6,
    borderColor: '#eeeeee',
    borderWidth: 1,
    alignSelf: 'center',
  },
  tip: {
    marginLeft: 62,
  },
  text: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  indicator: {
    position: 'absolute',
    left: 27,
    height: 20,
    alignSelf: 'center',
  },
});
