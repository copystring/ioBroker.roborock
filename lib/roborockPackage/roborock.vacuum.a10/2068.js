require('react');

var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module407 = require('./407'),
  c = null,
  module934 = require('./934').VideoError,
  v = (function () {
    function t() {
      module4.default(this, t);
      if (!c) c = this;
      return c;
    }

    module5.default(
      t,
      [
        {
          key: 'addTurnServerCallback',
          value: function (t) {
            this.turnServerCallback = t;
          },
        },
        {
          key: 'addIceListener',
          value: function (t) {
            this.iceCallback = t;
          },
        },
        {
          key: 'addSdpListener',
          value: function (t) {
            this.sdpCallback = t;
          },
        },
        {
          key: 'addErrorCodeListener',
          value: function (t) {
            this.errorCodeCallback = t;
          },
        },
        {
          key: 'notifyFirstVideoFrameRendered',
          value: function () {
            this.clearSdpTimer();
            this.start_getDeviceIceInfoLoop(3e3);
          },
        },
        {
          key: 'onReceivedCandidate',
          value: function (t) {},
        },
        {
          key: 'startVideoPreview',
          value: function (t, o) {
            var s, c, v, h;
            return regeneratorRuntime.default.async(
              function (f) {
                for (;;)
                  switch ((f.prev = f.next)) {
                    case 0:
                      console.log('VideoManager:\u5f00\u59cb\u53d1\u9001 \u9884\u89c8\u547d\u4ee4');
                      this.hasCallStopPreview = false;
                      f.prev = 2;
                      f.next = 5;
                      return regeneratorRuntime.default.awrap(module407.default.startCameraPreview(t));

                    case 5:
                      if (((s = f.sent), 'ok' === c ? o && o(true) : o && o(false), !this.cancelRequest)) {
                        f.next = 10;
                        break;
                      }

                      console.log('\u89c6\u9891 \u5df2\u7ecf cancelRequest \u76f4\u63a5return\uff01');
                      return f.abrupt('return');

                    case 10:
                      if ('ok' === (c = s.result[0])) {
                        this.shouldStopAllLoopTry = false;
                        this.resetAllRetryCount();
                        this.resetAllFlags();
                        this.getTurnServerInfo_IoT();
                        this.start_getDeviceSdpInfoLoop();
                        this.start_getDeviceIceInfoLoop(500);
                      }

                      console.log('VideoManager:\u53d1\u9001\u5f00\u59cb\u9884\u89c8 \u6210\u529f =' + JSON.stringify(s));
                      f.next = 21;
                      break;

                    case 15:
                      f.prev = 15;
                      f.t0 = f.catch(2);
                      if (o) o(false);
                      v = 'none';

                      if ('object' == typeof f.t0.data) {
                        if (f.t0.data.error.client_id) v = f.t0.data.error.client_id;
                        h = f.t0.data.error && f.t0.data.error.code;
                        this.handleErrorCodeWhenStartPreview(h, v);
                      } else this.notifyVideoError(module934.Video_StartPreviewFailed_unKnownReason, v);

                      console.log(
                        'VideoManager:\u53d1\u9001\u5f00\u59cb\u9884\u89c8 \u5931\u8d25\u8fd4\u56de =' + ('object' == typeof f.t0.data ? JSON.stringify(f.t0.data) : f.t0.data)
                      );

                    case 21:
                    case 'end':
                      return f.stop();
                  }
              },
              null,
              this,
              [[2, 15]],
              Promise
            );
          },
        },
        {
          key: 'stopCameraPreview',
          value: function (t, o) {
            var s;
            return regeneratorRuntime.default.async(
              function (c) {
                for (;;)
                  switch ((c.prev = c.next)) {
                    case 0:
                      if ((this.resetAllConfigs(), !this.hasCallStopPreview)) {
                        c.next = 6;
                        break;
                      }

                      console.log('VideoManager:\u5df2\u7ecf\u8c03\u7528\u8fc7 stopCameraPreview_IoT \u76f4\u63a5return');
                      return c.abrupt('return');

                    case 6:
                      console.log('VideoManager: \u5f00\u59cb\u8c03\u7528 stopCameraPreview_IoT');

                    case 7:
                      this.hasCallStopPreview = true;
                      c.prev = 8;
                      c.next = 11;
                      return regeneratorRuntime.default.awrap(module407.default.stopCameraPreview(t));

                    case 11:
                      s = c.sent;
                      console.log('VideoManager:\u505c\u6b62 \u9884\u89c8 \u8fd4\u56de\u7ed3\u679c = ' + JSON.stringify(s));
                      if (o) o(true);
                      c.next = 19;
                      break;

                    case 16:
                      c.prev = 16;
                      c.t0 = c.catch(8);
                      if (o) o(false);

                    case 19:
                    case 'end':
                      return c.stop();
                  }
              },
              null,
              this,
              [[8, 16]],
              Promise
            );
          },
        },
        {
          key: 'resetAllConfigs',
          value: function () {
            this.shouldStopAllLoopTry = true;
            this.clearAllTimeout();
          },
        },
        {
          key: 'handleErrorCodeWhenStartPreview',
          value: function (t, n) {
            if (undefined == t) {
              console.warn('\u5f00\u59cb\u9884\u89c8 \u9519\u8bef\u7801 \u8fd4\u56de\u672a\u77e5\u7c7b\u578b');
              return void this.notifyVideoError(module934.Video_StartPreviewFailed_unKnownReason, n);
            }

            var o = module934.Video_StartPreviewFailed_innerUnknowReason;

            switch (t) {
              case -10009:
                o = module934.Video_StartPreviewFailed_passwordError;
                break;

              case -10010:
                o = module934.Video_StartPreviewFailed_passwordErrorFrequently;
                break;

              case -10011:
                o = module934.Video_StartPreviewFailed_robotInCharge;
                break;

              case -10012:
                o = module934.Video_StartPreviewFailed_cameraStatusError;
                break;

              case -10013:
                o = module934.Video_StartPreviewFailed_alreadyInPreview;
                break;

              case -10014:
                o = module934.Video_StartPreviewFailed_requestTurnserverFailed;
                break;

              case -10015:
                o = module934.Video_StartPreviewFailed_innerUnknowReason;
                break;

              case -10016:
                o = module934.Video_StartPreviewFailed_robotIsDisconnecting;
            }

            this.notifyVideoError(o, n);
          },
        },
        {
          key: 'notifyVideoError',
          value: function (t, n) {
            if (this.errorCodeCallback) this.errorCodeCallback(t, n);
          },
        },
        {
          key: 'start_getDeviceSdpInfoLoop',
          value: function (t) {
            var o = this;
            this.clearSdpTimer();
            this.timer_deviceSDP = setInterval(function () {
              return regeneratorRuntime.default.async(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        t.next = 2;
                        return regeneratorRuntime.default.awrap(o.getDeviceSdpInfo());

                      case 2:
                      case 'end':
                        return t.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }, t || 500);
          },
        },
        {
          key: 'getDeviceSdpInfo',
          value: function () {
            var t, o;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      if (!(this.tryCount_getSdpInfo >= 30) || this.hasGotDeviceSdp) {
                        s.next = 5;
                        break;
                      }

                      console.log('\u91cd\u8bd5\u6b21\u6570\u5df2\u8fbe\u4e0a\u9650 \u7ed3\u675f-------\u9700\u8981\u63d0\u793a\u7528\u6237');
                      this.notifyVideoError(module934.Video_GetDeviceSdpFailed);
                      this.clearSdpTimer();
                      return s.abrupt('return');

                    case 5:
                      s.prev = 5;
                      this.tryCount_getSdpInfo++;
                      s.next = 9;
                      return regeneratorRuntime.default.awrap(module407.default.getDeviceSdpInfo());

                    case 9:
                      t = s.sent;
                      o = t.result.dev_sdp;
                      console.log('VideoManager:\u83b7\u53d6device sdp \u4fe1\u606f \u8fd4\u56de\u7ed3\u679c=' + JSON.stringify(t));

                      if (!('retry' == o)) {
                        console.log('----------------\u83b7\u53d6device sdp \u4fe1\u606f\u6210\u529f---------------------');
                        this.hasGotDeviceSdp = true;
                        if (this.sdpCallback) this.sdpCallback(o);
                      }

                      s.next = 17;
                      break;

                    case 15:
                      s.prev = 15;
                      s.t0 = s.catch(5);

                    case 17:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[5, 15]],
              Promise
            );
          },
        },
        {
          key: 'start_getDeviceIceInfoLoop',
          value: function (t) {
            var o = this;
            this.clearIceTimer();
            this.timer_deviceICE = setInterval(function () {
              return regeneratorRuntime.default.async(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        t.next = 2;
                        return regeneratorRuntime.default.awrap(o.getDeviceIceInfo());

                      case 2:
                      case 'end':
                        return t.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            }, t || 500);
          },
        },
        {
          key: 'getDeviceIceInfo',
          value: function () {
            var t, o;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      s.prev = 0;
                      s.next = 3;
                      return regeneratorRuntime.default.awrap(module407.default.getDeviceIceInfo());

                    case 3:
                      t = s.sent;
                      o = t.result.dev_ice;
                      console.log('VideoManager:\u83b7\u53d6device Ice \u4fe1\u606f \u8fd4\u56de\u7ed3\u679c=' + JSON.stringify(t));
                      if ('retry' == o) console.log('\u83b7\u53d6 Device ICE \u9700\u8981\u91cd\u8bd5');
                      else {
                        console.log('\u83b7\u53d6\u5230 \u8bbe\u5907Ice \u4fe1\u606f');
                        if (this.iceCallback) this.iceCallback(o);
                      }
                      s.next = 11;
                      break;

                    case 9:
                      s.prev = 9;
                      s.t0 = s.catch(0);

                    case 11:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[0, 9]],
              Promise
            );
          },
        },
        {
          key: 'clearSdpTimer',
          value: function () {
            if (this.timer_deviceSDP) {
              console.log('VideoManager: clearSdpTimer');
              clearInterval(this.timer_deviceSDP);
              this.timer_deviceSDP = null;
            }
          },
        },
        {
          key: 'clearIceTimer',
          value: function () {
            if (this.timer_deviceICE) {
              console.log('VideoManager: clearIceTimer');
              clearInterval(this.timer_deviceICE);
              this.timer_deviceICE = null;
            }
          },
        },
        {
          key: 'clearAllTimeout',
          value: function () {
            console.log('VideoManager: clearAllTimeout');
            this.clearSdpTimer();
            this.clearIceTimer();

            if (this.timeout_deviceICE) {
              clearTimeout(this.timeout);
              this.timeout_deviceICE = null;
            }

            if (this.timeout_deviceSDP) {
              clearTimeout(this.timeout_deviceSDP);
              this.timeout_deviceSDP = null;
            }

            if (this.timeout_turnUrl) {
              clearTimeout(this.timeout_turnUrl);
              this.timeout_turnUrl = null;
            }
          },
        },
        {
          key: 'getTurnServerInfo_IoT',
          value: function () {
            var t, o;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      console.log('\u5f00\u59cb\u8bf7\u6c42 turn \u670d\u52a1\u5668\u4fe1\u606f ----------');
                      s.prev = 1;
                      s.next = 4;
                      return regeneratorRuntime.default.awrap(module407.default.getTurnServerInfo());

                    case 4:
                      t = s.sent;
                      console.log('\u83b7\u53d6 turn \u670d\u52a1\u5668\u4fe1\u606f \u8fd4\u56de\u7ed3\u679c=' + JSON.stringify(t));
                      if ('retry' == (o = t.result.url)) this.retryGettingUrlWhenFailed();
                      else {
                        console.log('\u83b7\u53d6\u5230\u7684turn \u670d\u52a1\u5668\u4fe1\u606f =' + o);
                        this.turnServerInfo = t.result;
                        if (this.turnServerCallback) this.turnServerCallback(this.turnServerInfo);
                      }
                      s.next = 14;
                      break;

                    case 10:
                      s.prev = 10;
                      s.t0 = s.catch(1);
                      console.log('\u83b7\u53d6 turn \u670d\u52a1\u5668\u4fe1\u606f \u5931\u8d25 \u8fd4\u56de');
                      this.retryGettingUrlWhenFailed();

                    case 14:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[1, 10]],
              Promise
            );
          },
        },
        {
          key: 'retryGettingUrlWhenFailed',
          value: function () {
            var t = this;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (!this.shouldStopAllLoopTry) {
                        o.next = 3;
                        break;
                      }

                      this.hasFinishedLoop = true;
                      return o.abrupt('return');

                    case 3:
                      if ((console.log('\u83b7\u53d6 turn \u670d\u52a1\u5668\u4fe1\u606f \u9700\u8981\u91cd\u8bd5*********'), !(this.tryCount_getTurnUrl >= 5))) {
                        o.next = 8;
                        break;
                      }

                      console.log('\u91cd\u8bd5\u6b21\u6570\u5df2\u8fbe\u4e0a\u9650 \u7ed3\u675f-------\u9700\u8981\u63d0\u793a\u7528\u6237');
                      this.notifyVideoError(module934.Video_GetTurnServerFailed);
                      return o.abrupt('return');

                    case 8:
                      this.timeout_turnUrl = setTimeout(function () {
                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  t.hasFinishedLoop = false;
                                  t.tryCount_getTurnUrl++;
                                  console.log('\u91cd\u8bd5\u5f00\u59cb ++++++++++++++++++++++++++++++++++++++++++++++++++++    \u7b2c' + t.tryCount_getTurnUrl + '\u6b21');
                                  o.next = 5;
                                  return regeneratorRuntime.default.awrap(t.getTurnServerInfo_IoT());

                                case 5:
                                  console.log('++++++++++++++++++++\u91cd\u8bd5\u7ed3\u675f ++++++++++++++++++');

                                case 6:
                                case 'end':
                                  return o.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      }, 500);

                    case 9:
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
          key: 'resetAllRetryCount',
          value: function () {
            this.tryCount_getTurnUrl = 0;
            this.tryCount_getSdpInfo = 0;
          },
        },
        {
          key: 'resetAllFlags',
          value: function () {
            this.hasGotDeviceSdp = false;
          },
        },
      ],
      [
        {
          key: 'sharedVideoManager',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.default = v;
var h = v.sharedVideoManager();
exports.VideoManager = h;
