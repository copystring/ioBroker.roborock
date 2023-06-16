require('./387');

require('./1956');

require('./1957');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, o) {
    if (!o && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var n = x(o);
    if (n && n.has(t)) return n.get(t);
    var l = {},
      s = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = s ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(l, c, u);
        else l[c] = t[c];
      }

    l.default = t;
    if (n) n.set(t, l);
    return l;
  })(require('react')),
  module12 = require('./12'),
  module407 = require('./407'),
  module381 = require('./381'),
  module377 = require('./377'),
  module390 = require('./390'),
  module386 = require('./386'),
  module1363 = require('./1363'),
  module927 = require('./927'),
  module415 = require('./415'),
  module506 = require('./506'),
  module1261 = require('./1261');

function x(t) {
  if ('function' != typeof WeakMap) return null;
  var o = new WeakMap(),
    n = new WeakMap();
  return (x = function (t) {
    return t ? n : o;
  })(t);
}

function C() {
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

require('./936');

require('./1270').Palette;

require('./1249');

module12.ART.Group;
module12.ART.Transform;

var module389 = require('./389'),
  module491 = require('./491').strings,
  j = module12.ART.Surface,
  E = module12.ART.Shape,
  B = module12.ART.Path,
  D = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
  };

exports.PhotoLoadingStatus = D;

var M = (function (t) {
  module7.default(R, t);

  var module506 = R,
    x = C(),
    M = function () {
      var t,
        o = module11.default(module506);

      if (x) {
        var n = module11.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module9.default(this, t);
    };

  function R(t) {
    var o;
    module4.default(this, R);
    (o = M.call(this, t)).state = {
      gotPhoto: false,
      photoSource: '',
      photoSize: null,
      rectInfo: null,
      readPhotoLoadingStatus: D.LOADING,
      isSure: false,
    };
    return o;
  }

  module5.default(R, [
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {},
    },
    {
      key: 'componentWillUnmount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {
        this.requestPhoto();
      },
    },
    {
      key: 'requestPhoto',
      value: function () {
        var t = this,
          o = this.props.navigation.state.params.currentObj.type,
          n = this.props.navigation.state.params.currentObj.photoId;
        if (18 == o && n.length < 1)
          this.setState({
            readPhotoLoadingStatus: D.FINISHED,
          });
        else if (!n || n.length < 1)
          this.setState({
            readPhotoLoadingStatus: D.NOPHOTO,
          });
        else if (module386.default.isFwFilterObstacleSupported() && module1363.default.mapObjectPhotoEnabled && n) {
          this.setState({
            readPhotoLoadingStatus: D.LOADING,
          });

          if (module390.MC.mapObjectMosaicPhotos['' + n]) {
            this.setState({
              photoSource: module390.MC.mapObjectMosaicPhotos['' + n].photoData,
              photoSize: module390.MC.mapObjectMosaicPhotos['' + n].photoSize,
              rectInfo: module390.MC.mapObjectMosaicPhotos['' + n].rectInfo,
            });
            this.setState({
              readPhotoLoadingStatus: D.FINISHED,
            });
          } else
            module389.getPhotoBase64Data(n, 2, function (o, l) {
              if (o) {
                var s = '' + l.photoData;
                module390.MC.mapObjectMosaicPhotos['' + n] = l;
                t.setState({
                  photoSource: s,
                  photoSize: l.photoSize,
                  rectInfo: l.rectInfo,
                  readPhotoLoadingStatus: D.FINISHED,
                });
              } else
                t.setState({
                  readPhotoLoadingStatus: D.FAILED,
                });
            });
        }
      },
    },
    {
      key: 'mapObjectPhotoPageMenuDidSelectRow',
      value: function (t) {
        var o = this;
        if (0 == t)
          setTimeout(function () {
            if (o.mapObjectIgnoreDescDialog) o.mapObjectIgnoreDescDialog.show();
          }, 100);
        else if (1 == t)
          this.props.navigation.navigate('ObstacleTypeSelection', {
            title: module491.actual_type_of_obstacle,
          });
      },
    },
    {
      key: 'getInnerFailedView',
      value: function (t, o) {
        var n = this;
        return React.default.createElement(
          module12.View,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          React.default.createElement(module381.TopImageButton, {
            image: t,
            color: 'rgba(0,0,0,0.3)',
            imageWidth: 120,
            imageHeight: 120,
            style: {},
            title: o,
            textColor: this.context.theme.mapObjectPhoto.detailColor,
            fontSize: 16,
            textTop: -5,
            onPress: function () {
              n.requestPhoto();
            },
          })
        );
      },
    },
    {
      key: 'sureButtonOnpress',
      value: function () {
        this.setState({
          isSure: !this.state.isSure,
        });
      },
    },
    {
      key: 'cancleButtonOnpress',
      value: function () {
        var t = this.props.navigation.state.params.backKey;
        this.props.navigation.goBack(t);
      },
    },
    {
      key: 'uploadButtonOnpress',
      value: function () {
        var t,
          module4,
          module5,
          module7,
          module9,
          u = this;
        return regeneratorRuntime.default.async(
          function (f) {
            for (;;)
              switch ((f.prev = f.next)) {
                case 0:
                  if (!this.state.isSure) {
                    f.next = 23;
                    break;
                  }

                  if (!module377.RSM.isRunning) {
                    f.next = 5;
                    break;
                  }

                  module1261.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                    globals.showToast(module491.robot_communication_exception);
                  });
                  f.next = 21;
                  break;

                case 5:
                  t = this.props.navigation.state.params.currentObj.type;
                  module4 = this.props.navigation.state.params.currentObj.photoId;
                  module5 = this.props.navigation.state.params.chooseId;
                  f.prev = 8;
                  module7 = {
                    photos: [
                      {
                        id: module4,
                        src_type: t,
                        actual_type: module5,
                      },
                    ],
                  };
                  module9 = JSON.parse(JSON.stringify(module7));
                  console.log('uploadObstaclesPhotos - ' + JSON.stringify(module9));
                  f.next = 14;
                  return regeneratorRuntime.default.awrap(module407.default.uploadObstaclesPhotos(module9));

                case 14:
                  globals.showToast(module491.introduction_to_image_uploading6);
                  setTimeout(function () {
                    u.cancleButtonOnpress();
                  }, 2e3);
                  f.next = 21;
                  break;

                case 18:
                  f.prev = 18;
                  f.t0 = f.catch(8);
                  globals.showToast(module491.introduction_to_image_uploading7);

                case 21:
                  f.next = 24;
                  break;

                case 23:
                  globals.showToast(module491.introduction_to_image_uploading8);

                case 24:
                case 'end':
                  return f.stop();
              }
          },
          null,
          this,
          [[8, 18]],
          Promise
        );
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.context.theme,
          n = module12.Dimensions.get('window').width - 40,
          l = 0.75 * n,
          s = this.props.navigation.state.params.currentObj.type,
          c = this.props.navigation.state.params.currentObj.photoId,
          u = React.default.createElement(module12.View, null);

        if (this.state.photoSize && this.state.rectInfo) {
          var p = n / this.state.photoSize.width,
            b = this.state.rectInfo.x0 * p,
            y = this.state.rectInfo.y0 * p,
            S = (this.state.rectInfo.x1 - this.state.rectInfo.x0) * p,
            I = (this.state.rectInfo.y1 - this.state.rectInfo.y0) * p,
            P = b - 10 < 1 ? b - 1 : 10,
            x = y - 10 < 1 ? y - 1 : 10,
            C = y + I + 10 > l ? l - y - I - 2 : 10,
            _ = b + S + 10 > n ? n - b - S - 2 : 10;

          b -= P;
          y -= x;
          S = S + P + _;
          I = I + x + C;
          u = React.default.createElement(module12.View, {
            style: {
              position: 'absolute',
              left: b,
              top: y,
              width: S,
              height: I,
              borderColor: 'yellow',
              borderWidth: 1,
            },
          });
          var M = new B();
          M.moveTo(1, 8);
          M.lineTo(1, 1);
          M.lineTo(8, 1);
          M.moveTo(S + 1 - 8, 1);
          M.lineTo(S + 1, 1);
          M.lineTo(S + 1, 8);
          M.moveTo(S + 1, I + 1 - 8);
          M.lineTo(S + 1, I + 1);
          M.lineTo(S + 1 - 8, I + 1);
          M.moveTo(9, I + 1);
          M.lineTo(1, I + 1);
          M.lineTo(1, I + 1 - 8);
          u = React.default.createElement(
            module12.View,
            {
              style: {
                position: 'absolute',
                left: b - 1,
                top: y - 1,
                width: S + 2,
                height: I + 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module12.View, {
              style: {
                position: 'absolute',
                left: 1,
                top: 1,
                width: S,
                height: I,
                borderColor: '#007aff',
                borderWidth: 1,
                backgroundColor: '#007aff22',
              },
            }),
            React.default.createElement(
              j,
              {
                width: S + 2,
                height: I + 2,
                style: {
                  flex: 1,
                  alignSelf: 'stretch',
                },
              },
              React.default.createElement(E, {
                stroke: '#007aff',
                strokeWidth: 3,
                d: M,
              })
            )
          );
        }

        var module1960 = this.getInnerFailedView(require('./1960'), module491.map_object_bubble_tip_no_photo),
          module1961 = this.getInnerFailedView(require('./1961'), module491.button_title_retry),
          module1278 = React.default.createElement(module927.default, {
            source: require('./1278'),
            autoPlay: true,
            loop: true,
            style: {
              width: 550,
              height: 550,
            },
          }),
          module1962 = React.default.createElement(
            module12.View,
            {
              style: {
                width: n,
                height: l,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: 'transparent',
              },
            },
            React.default.createElement(
              module12.ImageBackground,
              {
                resizeMode: 'contain',
                style: {
                  width: n,
                  height: l,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                source:
                  18 == s && c.length < 1
                    ? require('./1962')
                    : {
                        uri: this.state.photoSource,
                      },
              },
              u,
              this.state.readPhotoLoadingStatus == D.LOADING && module1278,
              this.state.readPhotoLoadingStatus == D.FAILED && module1961,
              this.state.readPhotoLoadingStatus == D.NOPHOTO && module1960
            )
          ),
          module1963 = React.default.createElement(
            module12.ImageBackground,
            {
              resizeMode: 'contain',
              style: {
                width: n,
                height: 0.45 * n,
                justifyContent: 'center',
                alignItems: 'center',
              },
              source: require('./1963'),
            },
            React.default.createElement(module12.ImageBackground, {
              resizeMode: 'contain',
              style: {
                width: 147,
                height: 147,
                justifyContent: 'center',
                alignItems: 'center',
              },
              source: module415.DMM.obstacleImagesMap.topBigImage[s],
            })
          ),
          module1981 = this.state.isSure ? require('./1981') : o.monitor.confirmPhoto;
        return React.default.createElement(
          module12.View,
          {
            style: [
              V.containter,
              {
                backgroundColor: o.pageBackgroundColor,
              },
            ],
          },
          React.default.createElement(
            module12.ScrollView,
            null,
            React.default.createElement(
              module12.View,
              {
                style: [
                  V.top,
                  {
                    backgroundColor: o.componentBackgroundColor,
                  },
                ],
              },
              (module386.default.isFwFilterObstacleSupported() && module1363.default.mapObjectPhotoEnabled) ||
                (module386.default.isFwFilterObstacleSupported() && module1363.default.mapObjectPhotoEnabled && 18 == s)
                ? module1962
                : module1963,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    V.contentText,
                    {
                      color: o.mainTextColor,
                    },
                  ],
                },
                module491.introduction_to_image_uploading1 + '\n' + module491.introduction_to_image_uploading2 + '\n' + module491.introduction_to_image_uploading3
              ),
              React.default.createElement(
                module12.View,
                {
                  style: V.sureView,
                },
                React.default.createElement(
                  module12.TouchableOpacity,
                  {
                    style: V.sureButton,
                    onPress: function () {
                      t.sureButtonOnpress();
                    },
                  },
                  React.default.createElement(module12.Image, {
                    style: V.sureButtonImage,
                    source: module1981,
                  })
                ),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      V.sureText,
                      ,
                      {
                        color: o.mainTextColor,
                      },
                    ],
                  },
                  module491.introduction_to_image_uploading4
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: [
                    V.bottomView,
                    {
                      backgroundColor: o.componentBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      V.cancelView,
                      {
                        backgroundColor: o.componentBackgroundColor,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.TouchableOpacity,
                    {
                      onPress: function () {
                        t.cancleButtonOnpress();
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          V.cancelText,
                          {
                            color: o.mainTextColor,
                          },
                        ],
                      },
                      module491.localization_strings_Main_MainPage_11
                    )
                  )
                ),
                React.default.createElement(
                  module12.View,
                  {
                    style: [
                      V.uploadView,
                      {
                        backgroundColor: o.componentBackgroundColor,
                      },
                    ],
                  },
                  React.default.createElement(
                    module12.TouchableOpacity,
                    {
                      onPress: function () {
                        t.uploadButtonOnpress();
                      },
                    },
                    React.default.createElement(
                      module12.Text,
                      {
                        style: [
                          V.uploadText,
                          {
                            color: this.state.isSure ? '#007aff' : o.subTextColor,
                          },
                        ],
                      },
                      module491.introduction_to_image_uploading5
                    )
                  )
                )
              )
            )
          )
        );
      },
    },
  ]);
  return R;
})(React.Component);

exports.default = M;
M.contextType = module506.AppConfigContext;
var R = module12.Dimensions.get('window').width - 80,
  V = module12.StyleSheet.create({
    containter: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      justifyContent: 'space-between',
    },
    top: {
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
      marginVertical: 20,
      marginHorizontal: 20,
      borderRadius: 2,
    },
    contentText: {
      color: 'rgba(0,0,0,0.5)',
      textAlign: globals.isRTL ? 'right' : 'left',
      fontSize: 14,
      marginHorizontal: 20,
      lineHeight: 19,
      marginTop: 17,
    },
    sureView: {
      color: '#009eff',
      height: 30,
      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
      justifyContent: globals.isRTL ? 'flex-end' : 'flex-start',
      marginVertical: 20,
      marginHorizontal: 20,
    },
    sureButton: {
      alignSelf: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 45,
      width: 25,
    },
    sureButtonImage: {
      resizeMode: 'contain',
      height: 18,
      width: 18,
    },
    sureText: {
      alignSelf: 'center',
      color: 'rgba(0,0,0,0.5)',
      textAlign: 'left',
      marginRight: 20,
      fontSize: 12,
    },
    bottomView: {
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      justifyContent: 'center',
      width: R,
      height: 45,
      alignSelf: 'center',
      marginBottom: 20,
    },
    cancelView: {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 12,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      borderRightWidth: 0,
      borderTopLeftRadius: 22.5,
      borderBottomLeftRadius: 22.5,
      height: 45,
      width: R / 2,
    },
    cancelText: {
      alignSelf: 'center',
      color: 'rgba(0,0,0,0.5)',
      textAlign: 'center',
      fontSize: 16,
    },
    uploadView: {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 12,
      borderColor: 'rgba(0,0,0,0.1)',
      borderWidth: 1,
      borderTopRightRadius: 22.5,
      borderBottomRightRadius: 22.5,
      height: 45,
      width: R / 2,
    },
    uploadText: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 16,
    },
  });
