var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module2069 = require('./2069'),
  module414 = require('./414'),
  module2070 = require('./2070'),
  module387 = require('./387'),
  module422 = require('./422');

require('./385');

function y() {
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

var module500 = require('./500'),
  module1153 = require('./1153'),
  F = module1153.VideoError,
  module393 = require('./393'),
  T = (function (t) {
    module7.default(I, t);

    var module500 = I,
      module1153 = y(),
      T = function () {
        var t,
          o = module11.default(module500);

        if (module1153) {
          var n = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, n);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function I(t, o) {
      var s;
      module4.default(this, I);
      (s = T.call(this, t, o)).state = {
        rootViewStyleTyle: 1,
        isFullScreen: s.props.isFullScreen,
        transformAnimation: new module12.Animated.Value(0),
        videoStateString: '',
        videoFrameRate: '',
        shouldShowState: false,
        isFirstVideoFrameRender: false,
        isLocalPing: false,
        sdkStatusInfo: '',
        testSDPCount: 0,
        testDeviceIceCount: 0,
      };
      return s;
    }

    module5.default(I, [
      {
        key: 'componentDidMount',
        value: function () {
          this.viewWillUnmount = false;
          module2070.VideoManager.cancelRequest = false;
          console.log('SmartVideoDetail --\x3ecomponentDidMount');
          if (this.props.onScreenChange) this.props.onScreenChange(true);
          if (this.videoView && this.state.isFullScreen) this.videoView.enterFullScreen();
        },
      },
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          console.log('SmartVideoDetail --\x3ecomponentWillMount');
          module2070.VideoManager.cancelRequest = false;
          module2070.VideoManager.addIceListener(function (o) {
            if (t.videoView)
              t.videoView.sendIceInfoToSDK(o, function (t) {
                console.log('\u53d1\u9001 ICE \u4fe1\u606f \u5230SDK \u6210\u529f');
              });
          });
          module2070.VideoManager.addTurnServerCallback(function (o) {
            t.sendTurnserviceInfoToSdk(o);
          });
          module2070.VideoManager.addSdpListener(function (o) {
            if (t.videoView)
              t.videoView.sendSdpInfoToSDK(o, function (t) {
                console.log('\u53d1\u9001 sdp \u4fe1\u606f \u5230SDK \u6210\u529f');
              });
          });
          module2070.VideoManager.addErrorCodeListener(function (o, n) {
            t.notifyVideoError(o, n);
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          this.viewWillUnmount = true;
          module2070.VideoManager.cancelRequest = true;
          console.log('SmartVideoDetail --\x3ecomponentWillUnmount');
          if (this.videoView && this.state.isFullScreen) this.videoView.exitFullScreen();
        },
      },
      {
        key: 'renderContentOverLayerLandUI',
        value: function (t, o, n) {
          var s = this;
          return React.default.createElement(
            module12.TouchableOpacity,
            {
              style: [
                t,
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: o,
                  height: n,
                },
              ],
              onPress: function () {
                s.setState(function (t) {
                  return {
                    shouldShowState: !t.shouldShowState,
                  };
                });
              },
            },
            this.state.shouldShowState && this.renderStateView(80)
          );
        },
      },
      {
        key: 'renderStateView',
        value: function (t) {
          if (!module422.DMM.isV1 && !module422.DMM.isV3) {
            var o = this.state.isLocalPing ? '\u5c40\u57df\u7f51' : '\u5e7f\u57df\u7f51',
              n =
                this.isSupportGetSdkInfo() &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      left: 0,
                      color: 'white',
                    },
                  },
                  'SDK status info\uff1a' + this.state.sdkStatusInfo
                );
            return React.default.createElement(
              module12.View,
              {
                style: {
                  flex: 1,
                  marginTop: t,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  backgroundColor: 'black',
                  opacity: 0.5,
                },
              },
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    left: 0,
                    color: 'white',
                  },
                },
                '' + this.state.videoStateString
              ),
              n,
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    left: 0,
                    color: 'white',
                  },
                },
                '\u8bbe\u5907 IoT \u901a\u4fe1\u65b9\u5f0f\uff1a' + o
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: {
                    left: 0,
                    color: 'white',
                  },
                },
                '\u4f20\u8f93\u901f\u5ea6\uff1a' + this.state.videoFrameRate
              )
            );
          }
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            o = this.props,
            n = o.videoWidth,
            s = o.videoHeight,
            l = o.style,
            u = b.videoView_port,
            c = b.landscapeStyle_show,
            p = n || module12.Dimensions.get('screen').width,
            w = s || 280;

          if (this.state.isFullScreen) {
            u = b.videoView_land;
            c = b.landscapeStyle_show;
            w = module12.Dimensions.get('screen').height;
            p = module12.Dimensions.get('screen').width;
          }

          return React.default.createElement(
            module12.View,
            {
              style: l,
            },
            React.default.createElement(module2069.default, {
              width: n || p,
              height: s || w,
              backgroundColor: this.props.backgroundColor || 'transparent',
              ref: function (o) {
                return (t.videoView = o);
              },
              isFullScreenMode: this.state.isFullScreen,
              onReceivedSdp: function (o) {
                var n = o.value;
                console.log('RN \u6536\u5230sdp \u4fe1\u606f \u957f\u5ea6 = ' + n.length + ' sdp = ' + n);
                t.showToastWithMessage('\u6536\u5230 sdk sdp \u4fe1\u606f');
                t.sendSdpInfoToRobot(o.value);
              },
              onReceivedCandidate: function (o) {
                var n = o.value;
                console.log('RN \u6536\u5230 sdk Ice \u4fe1\u606f ice = ' + n);
                t.sendIceInfoToRobot(o.value);
              },
              onCallingError: function (o) {
                t.hideStateLabel();
                t.showToastWithMessage('\u6536\u5230 sdk onCallingError \u9519\u8bef code = ' + o.errorCode);
                F.Video_PreviewCalledError.code = F.Video_PreviewCalledError.code + ':' + o.errorCode;
                t.notifyVideoError(F.Video_PreviewCalledError);
                console.log('RN \u6536\u5230 \u89c6\u9891\u547c\u53eb\u9519\u8bef code = ' + o.errorCode);
                module387.LogEventStat(module387.LogEventMap.RealTimeCallingError);
              },
              onCallingTimeout: function () {
                t.showToastWithMessage('\u6536\u5230sdk \u89c6\u9891\u8d85\u65f6 \u9519\u8bef');
                t.hideStateLabel();
                t.notifyVideoError(F.Video_PreviewTimeout);
                console.log('\u89c6\u9891\u8d85\u65f6 \u9519\u8bef');
                module387.LogEventStat(module387.LogEventMap.RealTimeCallTimeout);
              },
              onFrameStuck: function () {
                t.showToastWithMessage('\u6536\u5230sdk \u89c6\u9891\u5361\u987f \u901a\u77e5');
                t.hideStateLabel();
                t.notifyVideoFrameStuck();
                console.log('\u89c6\u9891 \u5361\u987f');
                module387.LogEventStat(module387.LogEventMap.RealTimeFrameStuck);
              },
              onFirstFrameRendered: function () {
                t.setState({
                  isFirstVideoFrameRender: true,
                });
                module2070.VideoManager.notifyFirstVideoFrameRendered();
                t.notifyVideoPreviewSuccessfully();
                console.log('\u6536\u5230 \u89c6\u9891\u9996\u5e27 \u6e32\u67d3\u901a\u77e5 *****');
              },
              onReceivedState: function (o) {
                t.checkLocalPing();
                t.getCurrentSDKInfo();
                var n = t.getCorrectFrameRate(o.frameRate);
                t.notifyVideoFrameRateValueChanged(n);
                if (o)
                  t.unitSetState({
                    videoStateString: o.state,
                    videoFrameRate: n,
                  });
              },
              onVolumeChanged: function (o) {
                var n = parseInt(0.08 * o.volume);
                t.getVolumeChanged(n);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  u,
                  {
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: w,
                    width: p,
                  },
                ],
              },
              this.renderContentOverLayerLandUI(c, p, w)
            )
          );
        },
      },
      {
        key: 'getCorrectFrameRate',
        value: function (t) {
          var o = '',
            n = '';

          if (t > 8e6) {
            o = ((1e-6 * t) / 8).toFixed(2);
            n = 'MB/s';
          } else if (t > 8e3) {
            o = ((0.001 * t) / 8).toFixed(2);
            n = 'KB/s';
          } else {
            o = (t / 8).toFixed(2);
            n = 'B/s';
          }

          o += n;
          return o;
        },
      },
      {
        key: 'enableMicrophone',
        value: function (t) {
          if (this.videoView) this.videoView.enableMicrophone(t);
        },
      },
      {
        key: 'startRecordVideo',
        value: function (t) {
          if (this.videoView) this.videoView.startRecordVideo(t);
        },
      },
      {
        key: 'stopRecordVideo',
        value: function (t) {
          if (this.videoView) this.videoView.stopRecordVideo(t);
        },
      },
      {
        key: 'captureCurrentFrame',
        value: function (t) {
          if (this.videoView) this.videoView.captureCurrentFrame(t);
        },
      },
      {
        key: 'checkLocalPing',
        value: function () {
          var t = this;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(
                      module393.localPingWithCallback(function (o) {
                        if (o) console.log('\u662f\u672c\u5730\u76f4\u8fde local\u72b6\u6001');
                        t.unitSetState({
                          isLocalPing: o,
                        });
                      })
                    );

                  case 2:
                    n.sent;

                  case 3:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'getCurrentSDKInfo',
        value: function () {
          var t = this;
          if (this.videoView)
            this.videoView.getCurrentSDKStatusInfo(function (o) {
              t.unitSetState({
                sdkStatusInfo: o,
              });
            });
        },
      },
      {
        key: 'isSupportGetSdkInfo',
        value: function () {
          return this.videoView && this.videoView.isSupportGetSdkInfo();
        },
      },
      {
        key: 'unitSetState',
        value: function (t) {
          if (!this.viewWillUnmount) this.setState(t);
        },
      },
      {
        key: 'showStateLabel',
        value: function () {
          this.unitSetState({
            shouldShowState: true,
          });
        },
      },
      {
        key: 'hideStateLabel',
        value: function () {
          this.unitSetState({
            shouldShowState: false,
          });
        },
      },
      {
        key: 'sendSdpInfoToRobot',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    console.log('\u5f00\u59cb \u53d1\u9001 sdp \u4fe1\u606f \u5230\u56fa\u4ef6 -----');
                    this.showToastWithMessage('\u5f00\u59cb \u53d1\u9001 sdp \u4fe1\u606f \u5230\u56fa\u4ef6');
                    s.next = 5;
                    return regeneratorRuntime.default.awrap(module414.default.sendSdpInfo(t));

                  case 5:
                    n = s.sent;
                    console.log('\u53d1\u9001 sdp\u4fe1\u606f \u56fa\u4ef6\u8fd4\u56de \u7ed3\u679c----' + JSON.stringify(n));

                    if ('ok' == n.result[0]) {
                      this.showToastWithMessage('\u53d1\u9001 sdk - sdp\u4fe1\u606f \u5230\u56fa\u4ef6 \u5904\u7406\u6210\u529f json=' + JSON.stringify(n));
                      console.log('\u53d1\u9001 sdp\u4fe1\u606f \u5230\u56fa\u4ef6 \u5904\u7406\u6210\u529f');
                    } else {
                      console.log('\u53d1\u9001 sdp\u4fe1\u606f \u5230\u56fa\u4ef6 \u5904\u7406\u5931\u8d25');
                      this.notifyVideoError(F.Video_SendSDKSdpToDeviceFailed_processedError);
                      this.showToastWithMessage('\u53d1\u9001 sdp\u4fe1\u606f \u5230\u56fa\u4ef6 \u5904\u7406\u5931\u8d25');
                    }

                    s.next = 15;
                    break;

                  case 10:
                    s.prev = 10;
                    s.t0 = s.catch(0);
                    console.log('\u53d1\u9001 sdp\u4fe1\u606f \u5230\u56fa\u4ef6 \u9047\u5230\u672a\u77e5 \u9519\u8bef');
                    this.notifyVideoError(F.Video_SendSDKSdpToDeviceFailed_responseTimeout);
                    this.showToastWithMessage('\u53d1\u9001 sdp\u4fe1\u606f \u5230\u56fa\u4ef6 \u9047\u5230\u672a\u77e5 \u9519\u8bef');

                  case 15:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            this,
            [[0, 10]],
            Promise
          );
        },
      },
      {
        key: 'sendIceInfoToRobot',
        value: function (t) {
          var n;
          return regeneratorRuntime.default.async(
            function (s) {
              for (;;)
                switch ((s.prev = s.next)) {
                  case 0:
                    s.prev = 0;
                    console.log('\u5f00\u59cb \u53d1\u9001 ice \u4fe1\u606f \u5230\u56fa\u4ef6 -----');
                    s.next = 4;
                    return regeneratorRuntime.default.awrap(module414.default.sendIceInfo(t));

                  case 4:
                    n = s.sent;
                    console.log('\u5904\u7406 ice \u7ed3\u679c\u8fd4\u56de =' + JSON.stringify(n));
                    if ('ok' == n.result[0]) console.log('\u53d1\u9001 Ice \u4fe1\u606f \u5230\u56fa\u4ef6 \u5904\u7406\u6210\u529f');
                    else console.log('\u53d1\u9001 Ice \u4fe1\u606f \u5230\u56fa\u4ef6 \u5904\u7406\u5931\u8d25');
                    s.next = 12;
                    break;

                  case 9:
                    s.prev = 9;
                    s.t0 = s.catch(0);
                    console.log('\u53d1\u9001 ice \u4fe1\u606f \u5230\u56fa\u4ef6\u9047\u5230\u672a\u77e5\u9519\u8bef');

                  case 12:
                  case 'end':
                    return s.stop();
                }
            },
            null,
            null,
            [[0, 9]],
            Promise
          );
        },
      },
      {
        key: 'sendTurnserviceInfoToSdk',
        value: function (t) {
          var o = this;
          if (this.videoView)
            this.videoView.sendTurnServerInfoToSDK(t, function (t) {
              if (t) o.startCameraPreview();
            });
        },
      },
      {
        key: 'getVideoSDKInfo',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    if (this.videoView)
                      this.videoView.getCurrentSDKStatusInfo(function (o) {
                        if (t) t(o);
                      });

                  case 1:
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
        key: 'stopCameraPreview_IoT',
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    this.stopCameraPreview();
                    module2070.VideoManager.stopCameraPreview(t, n);

                  case 2:
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
        key: 'startCameraPreview_IoT',
        value: function (t, n) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    console.log('\u5f00\u59cb\u53d1\u9001 \u9884\u89c8\u547d\u4ee4');
                    module2070.VideoManager.startVideoPreview(t, n);

                  case 2:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            null,
            null,
            Promise
          );
        },
      },
      {
        key: 'showToastWithMessage',
        value: function (t) {
          if (this.props.onDidReceivedToastMsg) this.props.onDidReceivedToastMsg(t);
        },
      },
      {
        key: 'getVolumeChanged',
        value: function (t) {
          if (this.props.getVolumeChanged) this.props.getVolumeChanged(t);
        },
      },
      {
        key: 'notifyVideoError',
        value: function (t, o) {
          if (this.props.onDidReceivedVideoErrorCode) this.props.onDidReceivedVideoErrorCode(t, o);
        },
      },
      {
        key: 'notifyVideoPreviewSuccessfully',
        value: function () {
          if (this.props.onFirstFrameRendered) this.props.onFirstFrameRendered();
        },
      },
      {
        key: 'notifyVideoFrameRateValueChanged',
        value: function (t) {
          if (this.props.onFrameRateValueChanged) this.props.onFrameRateValueChanged(t);
        },
      },
      {
        key: 'notifyVideoFrameStuck',
        value: function () {
          if (this.props.onFrameStuck) this.props.onFrameStuck();
        },
      },
      {
        key: 'startCameraPreview',
        value: function () {
          if (this.videoView) this.videoView.startCameraPreview(function (t) {});
        },
      },
      {
        key: 'stopCameraPreview',
        value: function () {
          console.log('SmartVideoDetail ->\u51c6\u5907 \u8c03\u7528\u539f\u751f stopCameraPreview');
          if (this.videoView) console.log('SmartVideoDetail ->\u8c03\u7528\u539f\u751f stopCameraPreview --\x3e \u6210\u529f\u8c03\u7528');
          if (this.videoView) this.videoView.stopCameraPreview();
        },
      },
    ]);
    return I;
  })(React.default.Component);

exports.default = T;
var b = module12.StyleSheet.create({
  portraitStyle_hidden: {
    backgroundColor: 'transparent',
    backfaceVisibility: 'hidden',
    opacity: 0,
  },
  landscapeStyle_show: {
    opacity: 1,
    backfaceVisibility: 'visible',
  },
  bottomButton_portrait: {
    paddingBottom: 10,
    opacity: 1,
    backfaceVisibility: 'visible',
  },
  bottomButton_lands: {
    paddingBottom: 10,
    opacity: 0,
    backfaceVisibility: 'hidden',
  },
  videoView_land: {
    position: 'absolute',
  },
  videoView_port: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  transFormStyle_land: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  transFormStyle_port: {
    position: 'absolute',
    justifyContent: 'center',
  },
});
