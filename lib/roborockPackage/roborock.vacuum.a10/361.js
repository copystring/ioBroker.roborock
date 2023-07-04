var module4 = require('./4'),
  module5 = require('./5'),
  module362 = require('./362'),
  module123 = require('./123'),
  module13 = require('./13'),
  s = new module123(module362.default),
  f = new Map(),
  v = (function () {
    function t(n) {
      var l = this;
      module4.default(this, t);
      this._data = {};
      this._remoteNotificationCompleteCallbackCalled = false;
      this._isRemote = n.remote;
      if (this._isRemote) this._notificationId = n.notificationId;
      if (n.remote)
        Object.keys(n).forEach(function (t) {
          var o = n[t];

          if ('aps' === t) {
            l._alert = o.alert;
            l._sound = o.sound;
            l._badgeCount = o.badge;
            l._category = o.category;
            l._contentAvailable = o['content-available'];
            l._threadID = o['thread-id'];
          } else l._data[t] = o;
        });
      else {
        this._badgeCount = n.applicationIconBadgeNumber;
        this._sound = n.soundName;
        this._alert = n.alertBody;
        this._data = n.userInfo;
        this._category = n.category;
      }
    }

    module5.default(
      t,
      [
        {
          key: 'finish',
          value: function (t) {
            if (this._isRemote && this._notificationId && !this._remoteNotificationCompleteCallbackCalled) {
              this._remoteNotificationCompleteCallbackCalled = true;
              module13(module362.default, 'PushNotificationManager is not available.');
              module362.default.onFinishRemoteNotification(this._notificationId, t);
            }
          },
        },
        {
          key: 'getMessage',
          value: function () {
            return this._alert;
          },
        },
        {
          key: 'getSound',
          value: function () {
            return this._sound;
          },
        },
        {
          key: 'getCategory',
          value: function () {
            return this._category;
          },
        },
        {
          key: 'getAlert',
          value: function () {
            return this._alert;
          },
        },
        {
          key: 'getContentAvailable',
          value: function () {
            return this._contentAvailable;
          },
        },
        {
          key: 'getBadgeCount',
          value: function () {
            return this._badgeCount;
          },
        },
        {
          key: 'getData',
          value: function () {
            return this._data;
          },
        },
        {
          key: 'getThreadID',
          value: function () {
            return this._threadID;
          },
        },
      ],
      [
        {
          key: 'presentLocalNotification',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.presentLocalNotification(t);
          },
        },
        {
          key: 'scheduleLocalNotification',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.scheduleLocalNotification(t);
          },
        },
        {
          key: 'cancelAllLocalNotifications',
          value: function () {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.cancelAllLocalNotifications();
          },
        },
        {
          key: 'removeAllDeliveredNotifications',
          value: function () {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.removeAllDeliveredNotifications();
          },
        },
        {
          key: 'getDeliveredNotifications',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.getDeliveredNotifications(t);
          },
        },
        {
          key: 'removeDeliveredNotifications',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.removeDeliveredNotifications(t);
          },
        },
        {
          key: 'setApplicationIconBadgeNumber',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.setApplicationIconBadgeNumber(t);
          },
        },
        {
          key: 'getApplicationIconBadgeNumber',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.getApplicationIconBadgeNumber(t);
          },
        },
        {
          key: 'cancelLocalNotifications',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.cancelLocalNotifications(t);
          },
        },
        {
          key: 'getScheduledLocalNotifications',
          value: function (t) {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.getScheduledLocalNotifications(t);
          },
        },
        {
          key: 'addEventListener',
          value: function (o, n) {
            var l;
            module13(
              'notification' === o || 'register' === o || 'registrationError' === o || 'localNotification' === o,
              'PushNotificationIOS only supports `notification`, `register`, `registrationError`, and `localNotification` events'
            );
            if ('notification' === o)
              l = s.addListener('remoteNotificationReceived', function (o) {
                n(new t(o));
              });
            else if ('localNotification' === o)
              l = s.addListener('localNotificationReceived', function (o) {
                n(new t(o));
              });
            else if ('register' === o)
              l = s.addListener('remoteNotificationsRegistered', function (t) {
                n(t.deviceToken);
              });
            else if ('registrationError' === o)
              l = s.addListener('remoteNotificationRegistrationError', function (t) {
                n(t);
              });
            f.set(o, l);
          },
        },
        {
          key: 'removeEventListener',
          value: function (t, o) {
            module13(
              'notification' === t || 'register' === t || 'registrationError' === t || 'localNotification' === t,
              'PushNotificationIOS only supports `notification`, `register`, `registrationError`, and `localNotification` events'
            );
            var n = f.get(t);

            if (n) {
              n.remove();
              f.delete(t);
            }
          },
        },
        {
          key: 'requestPermissions',
          value: function (t) {
            var module4 = {};
            module4 = t
              ? {
                  alert: !!t.alert,
                  badge: !!t.badge,
                  sound: !!t.sound,
                }
              : {
                  alert: true,
                  badge: true,
                  sound: true,
                };
            module13(module362.default, 'PushNotificationManager is not available.');
            return module362.default.requestPermissions(module4);
          },
        },
        {
          key: 'abandonPermissions',
          value: function () {
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.abandonPermissions();
          },
        },
        {
          key: 'checkPermissions',
          value: function (t) {
            module13('function' == typeof t, 'Must provide a valid callback');
            module13(module362.default, 'PushNotificationManager is not available.');
            module362.default.checkPermissions(t);
          },
        },
        {
          key: 'getInitialNotification',
          value: function () {
            module13(module362.default, 'PushNotificationManager is not available.');
            return module362.default.getInitialNotification().then(function (o) {
              return o && new t(o);
            });
          },
        },
      ]
    );
    return t;
  })();

v.FetchResult = {
  NewData: 'UIBackgroundFetchResultNewData',
  NoData: 'UIBackgroundFetchResultNoData',
  ResultFailed: 'UIBackgroundFetchResultFailed',
};
module.exports = v;
