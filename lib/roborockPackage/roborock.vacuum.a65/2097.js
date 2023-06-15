var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module391 = require('./391'),
  module416 = require('./416'),
  module385 = require('./385'),
  module381 = require('./381'),
  module394 = require('./394'),
  module390 = require('./390'),
  module1640 = require('./1640'),
  module1204 = require('./1204'),
  module424 = require('./424'),
  module1200 = require('./1200'),
  module1201 = require('./1201');

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

var module393 = require('./393'),
  module510 = require('./510').strings,
  B = module13.ART.Surface,
  D = module13.ART.Shape,
  L = module13.ART.Path,
  R = {
    LOADING: 'loading',
    FAILED: 'failed',
    FINISHED: 'finshed',
    NOPHOTO: 'nophoto',
  };

exports.PhotoLoadingStatus = R;

var V = (function (t) {
  module9.default(z, t);

  var o = z,
    module1200 = E(),
    V = function () {
      var t,
        n = module12.default(o);

      if (module1200) {
        var l = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, l);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function z(t) {
    var o;
    module6.default(this, z);
    (o = V.call(this, t)).state = {
      gotPhoto: false,
      photoSource: '',
      photoSize: null,
      rectInfo: null,
      readPhotoLoadingStatus: R.LOADING,
      isSure: false,
    };
    return o;
  }

  module7.default(z, [
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
          o = this.props.navigation.state.params.currentObj.photoId;
        if (!(!o || o.length < 1))
          module390.default.isFwFilterObstacleSupported() &&
            module1640.default.mapObjectPhotoEnabled &&
            o &&
            (this.setState({
              readPhotoLoadingStatus: R.LOADING,
            }),
            module394.MC.mapObjectMosaicPhotos['' + o]
              ? (this.setState({
                  photoSource: module394.MC.mapObjectMosaicPhotos['' + o].photoData,
                  photoSize: module394.MC.mapObjectMosaicPhotos['' + o].photoSize,
                  rectInfo: module394.MC.mapObjectMosaicPhotos['' + o].rectInfo,
                }),
                this.setState({
                  readPhotoLoadingStatus: R.FINISHED,
                }))
              : module393.getPhotoBase64Data(o, 2, function (n, l) {
                  if (n) {
                    var s = '' + l.photoData;
                    module394.MC.mapObjectMosaicPhotos['' + o] = l;
                    t.setState({
                      photoSource: s,
                      photoSize: l.photoSize,
                      rectInfo: l.rectInfo,
                      readPhotoLoadingStatus: R.FINISHED,
                    });
                  } else
                    t.setState({
                      readPhotoLoadingStatus: R.FAILED,
                    });
                }));
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
            title: module510.actual_type_of_obstacle,
          });
      },
    },
    {
      key: 'getInnerFailedView',
      value: function (t, o) {
        var n = this;
        return React.default.createElement(
          module13.View,
          {
            style: {
              alignItems: 'center',
              justifyContent: 'center',
            },
          },
          React.default.createElement(module385.TopImageButton, {
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
          o,
          module22,
          module6,
          module7,
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

                  if (!module381.RSM.isRunning) {
                    f.next = 5;
                    break;
                  }

                  module1201.showFinishCurrentTastAlertIfNeeded().catch(function (t) {
                    globals.showToast(module510.robot_communication_exception);
                  });
                  f.next = 21;
                  break;

                case 5:
                  t = this.props.navigation.state.params.currentObj.type;
                  o = this.props.navigation.state.params.currentObj.photoId;
                  module22 = this.props.navigation.state.params.chooseId;
                  f.prev = 8;
                  module6 = {
                    photos: [
                      {
                        id: o,
                        src_type: t,
                        actual_type: module22,
                      },
                    ],
                  };
                  module7 = JSON.parse(JSON.stringify(module6));
                  console.log('uploadObstaclesPhotos - ' + JSON.stringify(module7));
                  f.next = 14;
                  return regeneratorRuntime.default.awrap(module416.default.uploadObstaclesPhotos(module7));

                case 14:
                  globals.showToast(module510.introduction_to_image_uploading6);
                  setTimeout(function () {
                    u.cancleButtonOnpress();
                  }, 2e3);
                  f.next = 21;
                  break;

                case 18:
                  f.prev = 18;
                  f.t0 = f.catch(8);
                  globals.showToast(module510.introduction_to_image_uploading7);

                case 21:
                  f.next = 24;
                  break;

                case 23:
                  globals.showToast(module510.introduction_to_image_uploading8);

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
          l = module13.Dimensions.get('window').width - 40,
          s = 0.75 * l,
          c = this.props.navigation.state.params.currentObj.type,
          u = this.props.navigation.state.params.currentObj.photoId,
          f = React.default.createElement(module13.View, null);

        if (this.state.photoSize && this.state.rectInfo) {
          var h = l / this.state.photoSize.width,
            S = this.state.rectInfo.x0 * h,
            w = this.state.rectInfo.y0 * h,
            _ = (this.state.rectInfo.x1 - this.state.rectInfo.x0) * h,
            T = (this.state.rectInfo.y1 - this.state.rectInfo.y0) * h,
            O = S - 10 < 1 ? S - 1 : 10,
            P = w - 10 < 1 ? w - 1 : 10,
            E = w + T + 10 > s ? s - w - T - 2 : 10,
            k = S + _ + 10 > l ? l - S - _ - 2 : 10;

          S -= O;
          w -= P;
          _ = _ + O + k;
          T = T + P + E;
          f = React.default.createElement(module13.View, {
            style: {
              position: 'absolute',
              left: S,
              top: w,
              width: _,
              height: T,
              borderColor: 'yellow',
              borderWidth: 1,
            },
          });
          var V = new L();
          V.moveTo(1, 8);
          V.lineTo(1, 1);
          V.lineTo(8, 1);
          V.moveTo(_ + 1 - 8, 1);
          V.lineTo(_ + 1, 1);
          V.lineTo(_ + 1, 8);
          V.moveTo(_ + 1, T + 1 - 8);
          V.lineTo(_ + 1, T + 1);
          V.lineTo(_ + 1 - 8, T + 1);
          V.moveTo(9, T + 1);
          V.lineTo(1, T + 1);
          V.lineTo(1, T + 1 - 8);
          f = React.default.createElement(
            module13.View,
            {
              style: {
                position: 'absolute',
                left: S - 1,
                top: w - 1,
                width: _ + 2,
                height: T + 2,
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
            React.default.createElement(module13.View, {
              style: {
                position: 'absolute',
                left: 1,
                top: 1,
                width: _,
                height: T,
                borderColor: '#007aff',
                borderWidth: 1,
                backgroundColor: '#007aff22',
              },
            }),
            React.default.createElement(
              B,
              {
                width: _ + 2,
                height: T + 2,
                style: {
                  flex: 1,
                  alignSelf: 'stretch',
                },
              },
              React.default.createElement(D, {
                stroke: '#007aff',
                strokeWidth: 3,
                d: V,
              })
            )
          );
        }

        var module2073 = this.getInnerFailedView(require('./2073'), module510.button_title_retry),
          module1422 = React.default.createElement(module1204.default, {
            source: require('./1422'),
            autoPlay: true,
            loop: true,
            style: {
              width: 550,
              height: 550,
            },
          }),
          F = React.default.createElement(
            module13.View,
            {
              style: {
                width: l,
                height: s,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: 'transparent',
              },
            },
            React.default.createElement(
              module13.ImageBackground,
              {
                resizeMode: 'contain',
                style: {
                  width: l,
                  height: s,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                source: {
                  uri: this.state.photoSource,
                },
              },
              f,
              this.state.readPhotoLoadingStatus == R.LOADING && module1422,
              this.state.readPhotoLoadingStatus == R.FAILED && module2073
            )
          ),
          module2074 = React.default.createElement(
            module13.ImageBackground,
            {
              resizeMode: 'contain',
              style: {
                width: l,
                height: 0.45 * l,
                justifyContent: 'center',
                alignItems: 'center',
              },
              source: require('./2074'),
            },
            React.default.createElement(module13.ImageBackground, {
              resizeMode: 'contain',
              style: {
                width: 147,
                height: 147,
                justifyContent: 'center',
                alignItems: 'center',
              },
              source: module424.DMM.obstacleImagesMap.topBigImage[c],
            })
          ),
          module2098 = this.state.isSure ? require('./2098') : o.monitor.confirmPhoto;
        return React.default.createElement(
          module13.View,
          {
            style: [
              M.containter,
              {
                backgroundColor: o.pageBackgroundColor,
              },
            ],
          },
          React.default.createElement(
            module13.ScrollView,
            null,
            React.default.createElement(
              module13.View,
              {
                style: [
                  M.top,
                  {
                    backgroundColor: o.componentBackgroundColor,
                  },
                ],
              },
              module390.default.isFwFilterObstacleSupported() && module1640.default.mapObjectPhotoEnabled && u && u.length >= 1 ? F : module2074,
              React.default.createElement(
                module13.Text,
                module22.default({}, module391.default.getAccessibilityLabel('introduction_to_image_uploading321'), {
                  style: [
                    M.contentText,
                    {
                      color: o.mainTextColor,
                    },
                  ],
                }),
                module510.introduction_to_image_uploading1 + '\n' + module510.introduction_to_image_uploading2 + '\n' + module510.introduction_to_image_uploading3
              ),
              React.default.createElement(
                module13.View,
                {
                  style: M.sureView,
                },
                React.default.createElement(
                  module13.TouchableOpacity,
                  module22.default({}, module391.default.getAccessibilityLabel('introduction_to_image_uploading6'), {
                    style: M.sureButton,
                    onPress: function () {
                      t.sureButtonOnpress();
                    },
                  }),
                  React.default.createElement(module13.Image, {
                    style: M.sureButtonImage,
                    source: module2098,
                  })
                ),
                React.default.createElement(
                  module13.Text,
                  module22.default({}, module391.default.getAccessibilityLabel('introduction_to_image_uploading4'), {
                    style: [
                      M.sureText,
                      ,
                      {
                        color: o.mainTextColor,
                      },
                    ],
                  }),
                  module510.introduction_to_image_uploading4
                )
              ),
              React.default.createElement(
                module13.View,
                {
                  style: [
                    M.bottomView,
                    {
                      backgroundColor: o.componentBackgroundColor,
                    },
                  ],
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      M.cancelView,
                      {
                        backgroundColor: o.componentBackgroundColor,
                      },
                    ],
                  },
                  React.default.createElement(
                    module13.TouchableOpacity,
                    {
                      onPress: function () {
                        t.cancleButtonOnpress();
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      {
                        style: [
                          M.cancelText,
                          {
                            color: o.mainTextColor,
                          },
                        ],
                      },
                      module510.localization_strings_Main_MainPage_11
                    )
                  )
                ),
                React.default.createElement(
                  module13.View,
                  {
                    style: [
                      M.uploadView,
                      {
                        backgroundColor: o.componentBackgroundColor,
                      },
                    ],
                  },
                  React.default.createElement(
                    module13.TouchableOpacity,
                    {
                      onPress: function () {
                        t.uploadButtonOnpress();
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      module22.default({}, module391.default.getAccessibilityLabel('introduction_to_image_uploading5'), {
                        style: [
                          M.uploadText,
                          {
                            color: this.state.isSure ? '#007aff' : o.subTextColor,
                          },
                        ],
                      }),
                      module510.introduction_to_image_uploading5
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
  return z;
})(React.Component);

exports.default = V;
V.contextType = module1200.AppConfigContext;
var M = module13.StyleSheet.create({
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
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 45,
    alignSelf: 'center',
    marginBottom: 20,
  },
  cancelView: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 22.5,
    borderBottomLeftRadius: 22.5,
    height: 45,
  },
  cancelText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
  uploadView: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderTopRightRadius: 22.5,
    borderBottomRightRadius: 22.5,
    height: 45,
  },
  uploadText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
});
