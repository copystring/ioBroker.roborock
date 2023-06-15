require('./1900');

var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1899 = require('./1899'),
  module381 = require('./381'),
  module387 = require('./387'),
  module386 = require('./386'),
  module1892 = require('./1892'),
  module383 = require('./383');

function E() {
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
  B = module12.Dimensions.get('window'),
  T = B.width,
  U = (function (t) {
    module7.default(U, t);

    var module387 = U,
      module936 = E(),
      B = function () {
        var t,
          n = module11.default(module387);

        if (module936) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function U(t) {
      var o;
      module4.default(this, U);
      (o = B.call(this, t)).state = {
        isError: false,
      };
      return o;
    }

    module5.default(U, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.contentProps = this.props.navigation.state.params.contentProps;
          this.guideUrl = this.contentProps.guideUrl || '';
          this.videoUrl = this.contentProps.videoUrl || '';
          this.videoPosterUrl = this.contentProps.videoPosterUrl || '';
          this.shareTitle = this.contentProps.shareTitle || '';
          this.shareSubTitle = this.contentProps.shareSubTitle || '';
          this.foreCloseVideo = this.contentProps.foreCloseVideo || false;
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.renderNavRightButton();
          module383.LogEventCommon('enter_guide_detail');
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = !module386.default.isShowProductGuideVideo() || '' == this.videoUrl || this.foreCloseVideo,
            module1818 = React.default.createElement(
              module12.View,
              {
                style: k.errorView,
              },
              React.default.createElement(module12.Image, {
                style: k.errorImage,
                source: require('./1818'),
              }),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    k.errorText,
                    {
                      color: globals.app.state.theme.error.tipTextColor,
                    },
                  ],
                },
                module491.localization_strings_Setting_CleanModePage_3
              )
            );
          return React.default.createElement(
            module12.View,
            {
              style: [
                k.container,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                },
              ],
            },
            this.state.isError && module1818,
            !n &&
              !this.state.isError &&
              React.default.createElement(
                module12.View,
                {
                  style: {
                    height: 240,
                  },
                },
                React.default.createElement(module1899.default, {
                  style: {
                    flex: 1,
                    height: 0.5625 * T,
                    width: T,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  url: this.videoUrl,
                  posterUrl: this.videoPosterUrl,
                })
              ),
            !this.state.isError &&
              React.default.createElement(module1892.WebView, {
                allowsInlineMediaPlayback: true,
                mediaPlaybackRequiresUserAction: true,
                scalesPageToFit: true,
                scrollEnabled: true,
                originWhitelist: ['*'],
                javaScriptEnabled: true,
                mixedContentMode: 'always',
                source: {
                  uri: this.guideUrl,
                },
                style: {
                  flex: 1,
                  backgroundColor: 'transparent',
                  width: T,
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                onError: function (n) {
                  t.setState({
                    isError: true,
                  });
                },
              })
          );
        },
      },
      {
        key: 'renderNavRightButton',
        value: function () {
          var t = this.contentProps.shouldShowShare || false,
            module1813 = React.default.createElement(module381.PureImageButton, {
              image: require('./1813'),
              onPress: this.onPressShareButton.bind(this),
              imageWidth: 40,
              imageHeight: 40,
              enabled: true,
              style: k.shareButton,
            });
          this.props.navigation.setParams({
            rightItems: t && module389.isMiApp ? [module1813] : null,
          });
        },
      },
      {
        key: 'onPressShareButton',
        value: function () {
          module389.openShareListBar(this.shareTitle, this.shareSubTitle, '', this.guideUrl);
        },
      },
    ]);
    return U;
  })(React.default.PureComponent);

exports.default = U;
var k = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module936.NavigationBarHeight,
  },
  shareButton: {
    width: 40,
    height: 30,
    marginTop: module387.default.iOSAndroidReturn(0, module12.StatusBar.currentHeight),
    marginRight: 10,
    alignSelf: 'center',
  },
  errorView: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    width: 150,
    height: 150,
    marginTop: -150,
    marginBottom: 10,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(0,0,0,0.376)',
  },
});
