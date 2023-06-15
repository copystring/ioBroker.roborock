require('./1878');

var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1877 = require('./1877'),
  module385 = require('./385'),
  module391 = require('./391'),
  module390 = require('./390'),
  module1869 = require('./1869'),
  module387 = require('./387');

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
  module1153 = require('./1153'),
  T = module12.Dimensions.get('window'),
  U = T.width,
  B = (function (t) {
    module7.default(B, t);

    var module391 = B,
      module1153 = E(),
      T = function () {
        var t,
          n = module11.default(module391);

        if (module1153) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function B(t) {
      var o;
      module4.default(this, B);
      (o = T.call(this, t)).state = {
        isError: false,
      };
      return o;
    }

    module5.default(B, [
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
          module387.LogEventCommon('enter_guide_detail');
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = !module390.default.isShowProductGuideVideo() || '' == this.videoUrl || this.foreCloseVideo,
            module1827 = React.default.createElement(
              module12.View,
              {
                style: k.errorView,
              },
              React.default.createElement(module12.Image, {
                style: k.errorImage,
                source: require('./1827'),
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
                module500.localization_strings_Setting_CleanModePage_3
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
            this.state.isError && module1827,
            !n &&
              !this.state.isError &&
              React.default.createElement(
                module12.View,
                {
                  style: {
                    height: 240,
                  },
                },
                React.default.createElement(module1877.default, {
                  style: {
                    flex: 1,
                    height: 0.5625 * U,
                    width: U,
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                  url: this.videoUrl,
                  posterUrl: this.videoPosterUrl,
                })
              ),
            !this.state.isError &&
              React.default.createElement(module1869.WebView, {
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
                  width: U,
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
            module1818 = React.default.createElement(module385.PureImageButton, {
              image: require('./1818'),
              onPress: this.onPressShareButton.bind(this),
              imageWidth: 40,
              imageHeight: 40,
              enabled: true,
              style: k.shareButton,
            });
          this.props.navigation.setParams({
            rightItems: t && module393.isMiApp ? [module1818] : null,
          });
        },
      },
      {
        key: 'onPressShareButton',
        value: function () {
          module393.openShareListBar(this.shareTitle, this.shareSubTitle, '', this.guideUrl);
        },
      },
    ]);
    return B;
  })(React.default.PureComponent);

exports.default = B;
var k = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module1153.NavigationBarHeight,
  },
  shareButton: {
    width: 40,
    height: 30,
    marginTop: module391.default.iOSAndroidReturn(0, module12.StatusBar.currentHeight),
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
