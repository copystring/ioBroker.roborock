require('./2012');

var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module2011 = require('./2011'),
  module385 = require('./385'),
  module391 = require('./391'),
  module390 = require('./390'),
  module2003 = require('./2003'),
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

var module510 = require('./510').strings,
  module393 = require('./393'),
  module1343 = require('./1343'),
  T = module13.Dimensions.get('window'),
  U = T.width,
  B = (function (t) {
    module9.default(B, t);

    var module391 = B,
      module1343 = E(),
      T = function () {
        var t,
          n = module12.default(module391);

        if (module1343) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function B(t) {
      var o;
      module6.default(this, B);
      (o = T.call(this, t)).state = {
        isError: false,
      };
      return o;
    }

    module7.default(B, [
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
            module1957 = React.default.createElement(
              module13.View,
              {
                style: k.errorView,
              },
              React.default.createElement(module13.Image, {
                style: k.errorImage,
                source: require('./1957'),
              }),
              React.default.createElement(
                module13.Text,
                {
                  style: [
                    k.errorText,
                    {
                      color: globals.app.state.theme.error.tipTextColor,
                    },
                  ],
                },
                module510.localization_strings_Setting_CleanModePage_3
              )
            );
          return React.default.createElement(
            module13.View,
            {
              style: [
                k.container,
                {
                  backgroundColor: globals.app.state.theme.settingBackgroundColor,
                },
              ],
            },
            this.state.isError && module1957,
            !n &&
              !this.state.isError &&
              React.default.createElement(
                module13.View,
                {
                  style: {
                    height: 240,
                  },
                },
                React.default.createElement(module2011.default, {
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
              React.default.createElement(module2003.WebView, {
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
            module1949 = React.default.createElement(module385.PureImageButton, {
              image: require('./1949'),
              onPress: this.onPressShareButton.bind(this),
              imageWidth: 40,
              imageHeight: 40,
              enabled: true,
              style: k.shareButton,
            });
          this.props.navigation.setParams({
            rightItems: t && module393.isMiApp ? [module1949] : null,
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
var k = module13.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginBottom: 0,
    marginTop: module1343.NavigationBarHeight,
  },
  shareButton: {
    width: 40,
    height: 30,
    marginTop: module391.default.iOSAndroidReturn(0, module13.StatusBar.currentHeight),
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
