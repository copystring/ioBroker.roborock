var module49 = require('./49'),
  module21 = require('./21'),
  module4 = require('./4'),
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
    var o = S(n);
    if (o && o.has(t)) return o.get(t);
    var u = {},
      c = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var l in t)
      if ('default' !== l && Object.prototype.hasOwnProperty.call(t, l)) {
        var s = c ? Object.getOwnPropertyDescriptor(t, l) : null;
        if (s && (s.get || s.set)) Object.defineProperty(u, l, s);
        else u[l] = t[l];
      }

    u.default = t;
    if (o) o.set(t, u);
    return u;
  })(require('react')),
  module12 = require('./12');

function S(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (S = function (t) {
    return t ? o : n;
  })(t);
}

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

function y() {
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

var C = module12.NativeModules.RRVideoViewManager,
  PropTypes = require('prop-types'),
  P = (function (t, ...args) {
    module7.default(R, t);

    var module49 = R,
      S = y(),
      h = function () {
        var t,
          o = module11.default(module49);

        if (S) {
          var u = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, u);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R() {
      var t;
      module4.default(this, R);

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

    module5.default(R, [
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
          if (this.currentSDKAPILevel() >= 2) C.enterFullScreenWithTag(this.getHandle());
          else C.enterFullScreen();
        },
      },
      {
        key: 'exitFullScreen',
        value: function () {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f exitFullScreen ----\x3e');
          if (this.currentSDKAPILevel() >= 2) C.exitFullScreenWithTag(this.getHandle());
          else C.exitFullScreen();
        },
      },
      {
        key: 'enableMicrophone',
        value: function (t) {
          C.enableMicrophone(t);
        },
      },
      {
        key: 'goRecordSetting',
        value: function () {
          if (C.goRecordSetting) C.goRecordSetting();
        },
      },
      {
        key: 'startRecordVideo',
        value: function (t) {
          if (C.startRecordVideo) C.startRecordVideo(t);
        },
      },
      {
        key: 'stopRecordVideo',
        value: function (t) {
          if (C.stopRecordVideo) C.stopRecordVideo(t);
        },
      },
      {
        key: 'captureCurrentFrame',
        value: function (t) {
          if (C.captureCurrentFrame) C.captureCurrentFrame(t);
        },
      },
      {
        key: 'stopCameraPreview',
        value: function () {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f stopCameraPreview');

          if (this.currentSDKAPILevel() >= 2) {
            if (C.stopCameraPreviewWithTag) C.stopCameraPreviewWithTag(this.getHandle());
            console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f stopCameraPreview --- \u8c03\u7528\u6210\u529f');
          } else C.stopCameraPreview();
        },
      },
      {
        key: 'startCameraPreview',
        value: function (t) {
          console.log('\u5f00\u59cb\u8c03\u7528\u539f\u751f startCameraPreview');
          if (this.currentSDKAPILevel() >= 2) {
            if (C.startCameraPreviewWithTag) C.startCameraPreviewWithTag(this.getHandle(), t);
          } else C.startCameraPreview(t);
        },
      },
      {
        key: 'sendTurnServerInfoToSDK',
        value: function (t, n) {
          if (this.currentSDKAPILevel() >= 2) {
            if (C.sendTurnServerInfoToSDKWithTag) C.sendTurnServerInfoToSDKWithTag(this.getHandle(), t, n);
          } else C.sendTurnServerInfoToSDK(t, n);
        },
      },
      {
        key: 'sendSdpInfoToSDK',
        value: function (t, n) {
          if (this.currentSDKAPILevel() >= 2) {
            if (C.sendSdpInfoToSDKWithTag) C.sendSdpInfoToSDKWithTag(this.getHandle(), t, n);
          } else C.sendSdpInfoToSDK(t, n);
        },
      },
      {
        key: 'sendIceInfoToSDK',
        value: function (t, n) {
          if (this.currentSDKAPILevel() >= 2) {
            if (C.sendIceInfoToSDKWithTag) C.sendIceInfoToSDKWithTag(this.getHandle(), t, n);
          } else C.sendIceInfoToSDK(t, n);
        },
      },
      {
        key: 'getCurrentSDKStatusInfo',
        value: function (t) {
          if (this.currentSDKAPILevel() >= 2) {
            if (C.getCurrentSDKStatusInfoWithTag) C.getCurrentSDKStatusInfoWithTag(this.getHandle(), t);
          } else if (C.getCurrentSDKStatusInfo) C.getCurrentSDKStatusInfo(t);
        },
      },
      {
        key: 'currentSupportAPILevel',
        value: function () {},
      },
      {
        key: 'isIOSPlatform',
        value: function () {
          return 'ios' == module12.Platform.OS;
        },
      },
      {
        key: 'isSupportGetSdkInfo',
        value: function () {
          return !!C.getCurrentSDKStatusInfo;
        },
      },
      {
        key: 'currentSDKAPILevel',
        value: function () {
          return C.VERSION ? C.VERSION : 1;
        },
      },
      {
        key: 'getHandle',
        value: function () {
          return module12.findNodeHandle(this.root);
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            T,
            module21.default({}, this.props, {
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

exports.default = P;

P.propTypes = (function (t) {
  for (var o = 1; o < arguments.length; o++) {
    var u = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      h(Object(u), true).forEach(function (o) {
        module49.default(t, o, u[o]);
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
  module12.ViewPropTypes
);

var T = module12.requireNativeComponent('RRVideoView', P);
