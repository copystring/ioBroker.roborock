var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13');

function h(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var u = Object.getOwnPropertySymbols(t);
    if (n)
      u = u.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, u);
  }

  return o;
}

function C() {
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

var y = module13.NativeModules.RRVideoViewManager,
  PropTypes = require('prop-types'),
  T = (function (t, ...args) {
    module9.default(R, t);

    var n = R,
      module50 = C(),
      h = function () {
        var t,
          u = module12.default(n);

        if (module50) {
          var c = module12.default(this).constructor;
          t = Reflect.construct(u, arguments, c);
        } else t = u.apply(this, arguments);

        return module11.default(this, t);
      };

    function R() {
      var t;
      module6.default(this, R);

      (t = h.call(this, ...args))._onReceivedSdp = function (n) {
        if (t.props.onReceivedSdp) t.props.onReceivedSdp(n.nativeEvent);
      };

      t._onCallingError = function (n) {
        if (t.props.onCallingError) t.props.onCallingError(n.nativeEvent);
      };

      t._onFirstFrameRendered = function (n) {
        if (t.props.onFirstFrameRendered) t.props.onFirstFrameRendered();
      };

      t._onReceivedCandidate = function (n) {
        if (t.props.onReceivedCandidate) t.props.onReceivedCandidate(n.nativeEvent);
      };

      t._onCallingTimeout = function (n) {
        if (t.props.onCallingTimeout) t.props.onCallingTimeout(n.nativeEvent);
      };

      t._onReceivedState = function (n) {
        if (t.props.onReceivedState) t.props.onReceivedState(n.nativeEvent);
      };

      t._onFrameStuck = function (n) {
        if (t.props.onFrameStuck) t.props.onFrameStuck();
      };

      t._onVolumeChanged = function (n) {
        if (t.props.onVolumeChanged) t.props.onVolumeChanged(n.nativeEvent);
      };

      return t;
    }

    module7.default(R, [
      {
        key: 'componentDidMount',
        value: function () {
          console.log('video view \u52a0\u8f7d\u51fa\u6765\u4e86');
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          console.log('video view \u5373\u5c06 componentWillUnmount');
        },
      },
      {
        key: 'enterFullScreen',
        value: function () {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f enterFullScreen ----\x3e');
          if (this.currentSDKAPILevel() >= 2) y.enterFullScreenWithTag(this.getHandle());
          else y.enterFullScreen();
        },
      },
      {
        key: 'exitFullScreen',
        value: function () {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f exitFullScreen ----\x3e');
          if (this.currentSDKAPILevel() >= 2) y.exitFullScreenWithTag(this.getHandle());
          else y.exitFullScreen();
        },
      },
      {
        key: 'enableMicrophone',
        value: function (t) {
          y.enableMicrophone(t);
        },
      },
      {
        key: 'goRecordSetting',
        value: function () {
          if (y.goRecordSetting) y.goRecordSetting();
        },
      },
      {
        key: 'startRecordVideo',
        value: function (t) {
          if (y.startRecordVideo) y.startRecordVideo(t);
        },
      },
      {
        key: 'stopRecordVideo',
        value: function (t) {
          if (y.stopRecordVideo) y.stopRecordVideo(t);
        },
      },
      {
        key: 'captureCurrentFrame',
        value: function (t) {
          if (y.captureCurrentFrame) y.captureCurrentFrame(t);
        },
      },
      {
        key: 'stopCameraPreview',
        value: function () {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f stopCameraPreview');

          if (this.currentSDKAPILevel() >= 2) {
            if (y.stopCameraPreviewWithTag) y.stopCameraPreviewWithTag(this.getHandle());
            console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f stopCameraPreview --- \u8c03\u7528\u6210\u529f');
          } else y.stopCameraPreview();
        },
      },
      {
        key: 'startCameraPreview',
        value: function (t) {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f startCameraPreview');
          if (this.currentSDKAPILevel() >= 2) {
            if (y.startCameraPreviewWithTag) y.startCameraPreviewWithTag(this.getHandle(), t);
          } else y.startCameraPreview(t);
        },
      },
      {
        key: 'sendTurnServerInfoToSDK',
        value: function (t, n) {
          if (this.currentSDKAPILevel() >= 2) {
            if (y.sendTurnServerInfoToSDKWithTag) y.sendTurnServerInfoToSDKWithTag(this.getHandle(), t, n);
          } else y.sendTurnServerInfoToSDK(t, n);
        },
      },
      {
        key: 'sendSdpInfoToSDK',
        value: function (t, n) {
          if (this.currentSDKAPILevel() >= 2) {
            if (y.sendSdpInfoToSDKWithTag) y.sendSdpInfoToSDKWithTag(this.getHandle(), t, n);
          } else y.sendSdpInfoToSDK(t, n);
        },
      },
      {
        key: 'sendIceInfoToSDK',
        value: function (t, n) {
          if (this.currentSDKAPILevel() >= 2) {
            if (y.sendIceInfoToSDKWithTag) y.sendIceInfoToSDKWithTag(this.getHandle(), t, n);
          } else y.sendIceInfoToSDK(t, n);
        },
      },
      {
        key: 'getCurrentSDKStatusInfo',
        value: function (t) {
          if (this.currentSDKAPILevel() >= 2) {
            if (y.getCurrentSDKStatusInfoWithTag) y.getCurrentSDKStatusInfoWithTag(this.getHandle(), t);
          } else if (y.getCurrentSDKStatusInfo) y.getCurrentSDKStatusInfo(t);
        },
      },
      {
        key: 'currentSupportAPILevel',
        value: function () {},
      },
      {
        key: 'isIOSPlatform',
        value: function () {
          return 'ios' == module13.Platform.OS;
        },
      },
      {
        key: 'isSupportGetSdkInfo',
        value: function () {
          return !!y.getCurrentSDKStatusInfo;
        },
      },
      {
        key: 'currentSDKAPILevel',
        value: function () {
          return y.VERSION ? y.VERSION : 1;
        },
      },
      {
        key: 'getHandle',
        value: function () {
          return module13.findNodeHandle(this.root);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            I,
            module22.default({}, this.props, {
              ref: function (n) {
                return (t.root = n);
              },
              style: [
                {
                  backgroundColor: this.props.backgroundColor,
                  width: this.props.width,
                  height: this.props.height,
                },
                this.props.style,
              ],
              onReceivedSdp: this._onReceivedSdp,
              onCallingError: this._onCallingError,
              onFirstFrameRendered: this._onFirstFrameRendered,
              onReceivedCandidate: this._onReceivedCandidate,
              onCallingTimeout: this._onCallingTimeout,
              onReceivedState: this._onReceivedState,
              onFrameStuck: this._onFrameStuck,
              isFullScreenMode: this.props.isFullScreenMode,
              onVolumeChanged: this._onVolumeChanged,
            })
          );
        },
      },
    ]);
    return R;
  })(React.Component);

exports.default = T;

T.propTypes = (function (t) {
  for (var n = 1; n < arguments.length; n++) {
    var u = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      h(Object(u), true).forEach(function (n) {
        module50.default(t, n, u[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(u));
    else
      h(Object(u)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(u, n));
      });
  }

  return t;
})(
  {
    title: PropTypes.string,
    backgroundColor: PropTypes.string,
    isFullScreenMode: PropTypes.bool,
    onReceivedSdp: PropTypes.func,
    onFirstFrameRendered: PropTypes.func,
    onReceivedCandidate: PropTypes.func,
    onCallingError: PropTypes.func,
    onCallingTimeout: PropTypes.func,
    onReceivedState: PropTypes.func,
    onFrameStuck: PropTypes.func,
    onVolumeChanged: PropTypes.func,
  },
  module13.ViewPropTypes
);

var I = module13.requireNativeComponent('RRVideoView', T);
