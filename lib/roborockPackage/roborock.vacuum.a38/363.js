var module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module142 = require('./142'),
  module364 = require('./364'),
  module13 = require('./13');

function _(n, s) {
  var t = Object.keys(n);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    if (s)
      o = o.filter(function (s) {
        return Object.getOwnPropertyDescriptor(n, s).enumerable;
      });
    t.push.apply(t, o);
  }

  return t;
}

function l(n) {
  for (var t = 1; t < arguments.length; t++) {
    var o = null != arguments[t] ? arguments[t] : {};
    if (t % 2)
      _(Object(o), true).forEach(function (t) {
        module50.default(n, t, o[t]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(n, Object.getOwnPropertyDescriptors(o));
    else
      _(Object(o)).forEach(function (s) {
        Object.defineProperty(n, s, Object.getOwnPropertyDescriptor(o, s));
      });
  }

  return n;
}

require('./52');

var S = Object.freeze({
    GRANTED: 'granted',
    DENIED: 'denied',
    NEVER_ASK_AGAIN: 'never_ask_again',
  }),
  O = Object.freeze({
    READ_CALENDAR: 'android.permission.READ_CALENDAR',
    WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR',
    CAMERA: 'android.permission.CAMERA',
    READ_CONTACTS: 'android.permission.READ_CONTACTS',
    WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
    GET_ACCOUNTS: 'android.permission.GET_ACCOUNTS',
    ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
    RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
    READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE',
    CALL_PHONE: 'android.permission.CALL_PHONE',
    READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
    WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG',
    ADD_VOICEMAIL: 'com.android.voicemail.permission.ADD_VOICEMAIL',
    USE_SIP: 'android.permission.USE_SIP',
    PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS',
    BODY_SENSORS: 'android.permission.BODY_SENSORS',
    SEND_SMS: 'android.permission.SEND_SMS',
    RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
    READ_SMS: 'android.permission.READ_SMS',
    RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH',
    RECEIVE_MMS: 'android.permission.RECEIVE_MMS',
    READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
    WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
  }),
  R = (function () {
    function n() {
      module4.default(this, n);
      this.PERMISSIONS = O;
      this.RESULTS = S;
    }

    module5.default(n, [
      {
        key: 'checkPermission',
        value: function (n) {
          console.warn('"PermissionsAndroid.checkPermission" is deprecated. Use "PermissionsAndroid.check" instead');
          module13.default(module364.default, 'PermissionsAndroid is not installed correctly.');
          return module364.default.checkPermission(n);
        },
      },
      {
        key: 'check',
        value: function (n) {
          module13.default(module364.default, 'PermissionsAndroid is not installed correctly.');
          return module364.default.checkPermission(n);
        },
      },
      {
        key: 'requestPermission',
        value: function (n, s) {
          var module4;
          return regeneratorRuntime.default.async(
            function (E) {
              for (;;)
                switch ((E.prev = E.next)) {
                  case 0:
                    console.warn('"PermissionsAndroid.requestPermission" is deprecated. Use "PermissionsAndroid.request" instead');
                    E.next = 4;
                    break;

                  case 4:
                    E.next = 6;
                    return regeneratorRuntime.default.awrap(this.request(n, s));

                  case 6:
                    module4 = E.sent;
                    return E.abrupt('return', module4 === this.RESULTS.GRANTED);

                  case 8:
                  case 'end':
                    return E.stop();
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
        key: 'request',
        value: function (n, s) {
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 3;
                    break;

                  case 3:
                    if ((module13.default(module364.default, 'PermissionsAndroid is not installed correctly.'), !s)) {
                      o.next = 10;
                      break;
                    }

                    o.next = 7;
                    return regeneratorRuntime.default.awrap(module364.default.shouldShowRequestPermissionRationale(n));

                  case 7:
                    if (!o.sent || !module142.default) {
                      o.next = 10;
                      break;
                    }

                    return o.abrupt(
                      'return',
                      new Promise(function (t, o) {
                        var E = l({}, s);
                        module142.default.showAlert(
                          E,
                          function () {
                            return o(new Error('Error showing rationale'));
                          },
                          function () {
                            return t(module364.default.requestPermission(n));
                          }
                        );
                      })
                    );

                  case 10:
                    return o.abrupt('return', module364.default.requestPermission(n));

                  case 11:
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
        key: 'requestMultiple',
        value: function (n) {
          module13.default(module364.default, 'PermissionsAndroid is not installed correctly.');
          return module364.default.requestMultiplePermissions(n);
        },
      },
    ]);
    return n;
  })();

R = new R();
module.exports = R;
