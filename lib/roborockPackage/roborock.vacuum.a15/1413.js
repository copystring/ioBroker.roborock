var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module386 = require('./386'),
  module391 = require('./391'),
  module394 = require('./394'),
  module1414 = require('./1414'),
  module1121 = require('./1121'),
  module1138 = require('./1138');

function x() {
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

var module505 = require('./505').strings,
  module393 = require('./393'),
  module1265 = require('./1265'),
  R = (function (t) {
    module7.default(H, t);

    var o = H,
      module1121 = x(),
      R = function () {
        var t,
          n = module11.default(o);

        if (module1121) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function H(t) {
      var o;
      module4.default(this, H);
      (o = R.call(this, t)).state = {
        shouldShow: false,
        isOverTimer: false,
      };
      o.isHide = true;
      return o;
    }

    module5.default(H, [
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
            o = this.context.theme,
            n = module1138.default;
          return React.default.createElement(
            n,
            {
              isModal: !module393.isWindowDisplay,
              transparent: true,
              visible: this.state.shouldShow,
              onRequestClose: function () {},
              style: {
                borderRadius: module1265.AppBorderRadius,
              },
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  A.container,
                  {
                    height: module394.default.sharedCache().ScreenHeight - module391.default.statusbarHeight(),
                    backgroundColor: o.loading.backgroundColor,
                    borderRadius: module1265.AppBorderRadius,
                  },
                ],
              },
              React.default.createElement(
                module12.View,
                {
                  style: [
                    A.loadingBox,
                    {
                      backgroundColor: o.loading.boxColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  module391.default.getAccessibilityLabel(this.props.loadingAccessibilityLabelKey),
                  React.default.createElement(module1414.default, null)
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      A.text,
                      {
                        color: o.loading.textColor,
                      },
                    ],
                  },
                  this.state.text || module505.localization_strings_Common_Constants_19
                ),
                React.default.createElement(module386.PureImageButton, {
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
                  image: o.loading.closeIcon,
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
        value: function (t, o) {
          var n = this;
          this.isHide = false;
          this.setState({
            shouldShow: true,
            isOverTimer: true,
            text: t,
          });
          this.timer = setTimeout(function () {
            if (!n.isHide) {
              n.hide();
              setTimeout(function () {
                if (n.props.onOverTimer) n.props.onOverTimer();
              }, 100);
            }
          }, o);
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
    return H;
  })(React.Component);

exports.default = R;
R.contextType = module1121.AppConfigContext;
R.defaultProps = {
  showButton: true,
};
var A = module12.StyleSheet.create({
  container: {
    alignSelf: 'stretch',
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
  text: {
    fontSize: 14,
    color: '#4A4A4A',
  },
});
