require('./411');

require('./387');

var regeneratorRuntime = require('regenerator-runtime'),
  module392 = require('./392'),
  module4 = require('./4'),
  module5 = require('./5'),
  module412 = require('./412'),
  module413 = require('./413'),
  module386 = require('./386'),
  module414 = require('./414'),
  module415 = require('./415'),
  v = null,
  module389 = require('./389'),
  module481 = require('./481'),
  x = (function () {
    function t() {
      module4.default(this, t);

      if (!v) {
        this.beginTime = 0;
        this.endTime = 0;
        this.logs = [];
        v = this;
        this.isEnterd = false;
      }

      return v;
    }

    module5.default(
      t,
      [
        {
          key: 'deleteExpiredLogs',
          value: function () {
            var t, module4, module5;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      t = new Date().getTime();
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(this.getLogList());

                    case 4:
                      module4 = u.sent;
                      module5 = [];
                      module4.sort(function (t, n) {
                        var s = parseInt(t.replace('log_', ''));
                        return parseInt(n.replace('log_', '')) - s;
                      });

                      if (module4.length >= 30) {
                        module5.concat(module4.splice(29, module4.length - 30));
                        module392.default('expiredLogs');
                      }

                      module4.forEach(function (s, o) {
                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  if ((t - parseInt(s.replace('log_', ''))) / 1e3 >= 259200) module5.push(s);

                                case 2:
                                case 'end':
                                  return n.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      });
                      u.next = 11;
                      return regeneratorRuntime.default.awrap(this.deleteLogs(module5));

                    case 11:
                      u.next = 16;
                      break;

                    case 13:
                      u.prev = 13;
                      u.t0 = u.catch(0);
                      console.log('delete all logs  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                    case 16:
                    case 'end':
                      return u.stop();
                  }
              },
              null,
              this,
              [[0, 13]],
              Promise
            );
          },
        },
        {
          key: 'log',
          value: function (t, n, s, o) {
            module412.Types.LoopMap;
            module412.Types.LoopStatus;
            var l = new Date();
            if (!o) console.log('@' + t + '::', '', n);
            var c = {
              time: l.getTime(),
              type: t,
              content: n,
              infoColor: s || module412.InfoColors.Normal,
            };
            this.logs.push(c);
          },
        },
        {
          key: 'enter',
          value: function (t) {
            if (!this.isEnterd) {
              this.beginTime = new Date().getTime();
              this.logs = [];
              this.endTime = 0;
              this.log(module412.Types.KeyEvent, t ? 'enter plugin from background' : 'firstly enter plugin');
              this.isEnterd = true;
            }
          },
        },
        {
          key: 'deleteLog',
          value: function (t) {
            module389.deleteFile(this.getLogPath(t), function (t) {
              if (!t) console.log('deleteLog  error: ' + ('object' == typeof error ? JSON.stringify(error) : error));
            });
          },
        },
        {
          key: 'deleteLogs',
          value: function (t) {
            var s = this;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      try {
                        t.forEach(function (t) {
                          return regeneratorRuntime.default.async(
                            function (n) {
                              for (;;)
                                switch ((n.prev = n.next)) {
                                  case 0:
                                    module389.deleteFile(s.getLogPath(t), function (t) {});

                                  case 1:
                                  case 'end':
                                    return n.stop();
                                }
                            },
                            null,
                            null,
                            null,
                            Promise
                          );
                        });
                      } catch (t) {
                        console.log('delete logs  error: ' + ('object' == typeof t ? JSON.stringify(t) : t));
                      }

                    case 1:
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
          key: 'deleteAll',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      s.prev = 0;
                      s.next = 3;
                      return regeneratorRuntime.default.awrap(this.getLogList());

                    case 3:
                      t = s.sent;
                      s.next = 6;
                      return regeneratorRuntime.default.awrap(this.deleteLogs(t));

                    case 6:
                      s.next = 11;
                      break;

                    case 8:
                      s.prev = 8;
                      s.t0 = s.catch(0);
                      console.log('delete all logs  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

                    case 11:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[0, 8]],
              Promise
            );
          },
        },
        {
          key: 'getLogPath',
          value: function (t) {
            return 'logs/' + t;
          },
        },
        {
          key: 'save',
          value: function () {
            var t, module392;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if (
                        !(
                          !module389.isLogFunctionSupported() ||
                          this.logs.length <= 5 ||
                          this.logs.length >= 2e3 ||
                          (module415.DMM.isV1 && !module386.default.isDebuggableV1User())
                        )
                      ) {
                        o.next = 2;
                        break;
                      }

                      return o.abrupt('return');

                    case 2:
                      t = 'log_' + this.beginTime;
                      o.prev = 3;
                      module392 = JSON.stringify({
                        uid: module389.userId,
                        logs: this.logs,
                      });
                      o.next = 7;
                      return regeneratorRuntime.default.awrap(module389.writeFileToPath(this.getLogPath(t), module392));

                    case 7:
                      console.log('save log ' + t + ' -- ' + module392);
                      o.next = 13;
                      break;

                    case 10:
                      o.prev = 10;
                      o.t0 = o.catch(3);
                      console.log('save  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                    case 13:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              this,
              [[3, 10]],
              Promise
            );
          },
        },
        {
          key: 'exit',
          value: function (t) {
            if (this.isEnterd) {
              this.endTime = new Date().getTime();
              this.log(module412.Types.KeyEvent, t ? 'enter background mode' : 'completely quit plugin');
              this.save();
              this.isEnterd = false;
            }
          },
        },
        {
          key: 'getLogList',
          value: function () {
            var t;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      s.prev = 0;
                      s.next = 3;
                      return regeneratorRuntime.default.awrap(module389.readFileListAtPath('logs/'));

                    case 3:
                      t = s.sent;
                      return s.abrupt('return', t);

                    case 7:
                      s.prev = 7;
                      s.t0 = s.catch(0);
                      console.log('getLogList  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                      return s.abrupt('return', []);

                    case 11:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              null,
              [[0, 7]],
              Promise
            );
          },
        },
        {
          key: 'getLog',
          value: function (t) {
            var module392;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      o.prev = 0;
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(module389.readFilePromise(this.getLogPath(t)));

                    case 3:
                      module392 = o.sent;
                      console.log('getLog ' + t + ' ' + module392);
                      return o.abrupt('return', JSON.parse(module392));

                    case 8:
                      o.prev = 8;
                      o.t0 = o.catch(0);
                      console.log('getLog ' + t + ' error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                      return o.abrupt('return', null);

                    case 12:
                    case 'end':
                      return o.stop();
                  }
              },
              null,
              this,
              [[0, 8]],
              Promise
            );
          },
        },
        {
          key: 'upload',
          value: function (t, s) {
            var o, module5, module412, module386, module415, v, x;
            return regeneratorRuntime.default.async(
              function (w) {
                for (;;)
                  switch ((w.prev = w.next)) {
                    case 0:
                      if (((w.prev = 0), !(o = 'current' == t))) {
                        w.next = 6;
                        break;
                      }

                      w.t0 = JSON.stringify(this.logs);
                      w.next = 11;
                      break;

                    case 6:
                      w.t1 = JSON;
                      w.next = 9;
                      return regeneratorRuntime.default.awrap(this.getLog(t));

                    case 9:
                      w.t2 = w.sent;
                      w.t0 = w.t1.stringify.call(w.t1, w.t2);

                    case 11:
                      module5 = w.t0;
                      module412 = o ? this.beginTime : t.replace('log_', '');
                      module386 = module389.deviceId;
                      module415 = module389.userId;
                      v = module481(module412 + '_' + module415 + '_' + module386);
                      x = {
                        id: v,
                        log: module5,
                        time: module412,
                        did: module386,
                        uid: module415,
                        overwrite: s,
                      };
                      w.next = 19;
                      return regeneratorRuntime.default.awrap(
                        fetch(module414.LogUploadUrl, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                          },
                          body: module413.default.jsonToQueryString(x),
                        })
                      );

                    case 19:
                      console.log('upload success', t);
                      w.next = 26;
                      break;

                    case 23:
                      w.prev = 23;
                      w.t3 = w.catch(0);
                      console.log('upload  error: ', w.t3, t);

                    case 26:
                    case 'end':
                      return w.stop();
                  }
              },
              null,
              this,
              [[0, 23]],
              Promise
            );
          },
        },
        {
          key: 'uploadAll',
          value: function (t) {
            var s,
              o,
              l = this;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.next = 2;
                      return regeneratorRuntime.default.awrap(this.getLogList());

                    case 2:
                      s = u.sent;
                      o = s.length;
                      s.forEach(function (s, u) {
                        setTimeout(function () {
                          return regeneratorRuntime.default.async(
                            function (u) {
                              for (;;)
                                switch ((u.prev = u.next)) {
                                  case 0:
                                    u.prev = 0;
                                    u.next = 3;
                                    return regeneratorRuntime.default.awrap(l.upload(s));

                                  case 3:
                                    if (0 == --o && t) t();
                                    u.next = 11;
                                    break;

                                  case 7:
                                    u.prev = 7;
                                    u.t0 = u.catch(0);
                                    if (0 == --o && t) t();

                                  case 11:
                                  case 'end':
                                    return u.stop();
                                }
                            },
                            null,
                            null,
                            [[0, 7]],
                            Promise
                          );
                        }, 1e3 * Math.floor(u / 15));
                      });

                    case 5:
                    case 'end':
                      return u.stop();
                  }
              },
              null,
              this,
              null,
              Promise
            );
          },
        },
      ],
      [
        {
          key: 'sharedInstance',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.Logger = x;
var w = x.sharedInstance();
exports.Log = w;
