var regeneratorRuntime = require('regenerator-runtime'),
  module23 = require('@babel/runtime/helpers/slicedToArray'),
  module414 = require('./414'),
  module393 = require('./393'),
  l = (TimerUnitTest = {
    delAllServerTimersFromRobot: function () {
      var t;
      return regeneratorRuntime.default.async(
        function (c) {
          for (;;)
            switch ((c.prev = c.next)) {
              case 0:
                c.prev = 0;
                c.next = 3;
                return regeneratorRuntime.default.awrap(module414.default.getServerTimer());

              case 3:
                t = c.sent;
                console.log('RobotApi.getServerTimer - ' + JSON.stringify(t));
                t.result.forEach(function (t) {
                  var c, l, u;
                  return regeneratorRuntime.default.async(
                    function (f) {
                      for (;;)
                        switch ((f.prev = f.next)) {
                          case 0:
                            c = module23.default(t, 1);
                            l = c[0];
                            f.next = 3;
                            return regeneratorRuntime.default.awrap(module414.default.deleteServerTimer(l));

                          case 3:
                            u = f.sent;
                            console.log('RobotApi.deleteServerTimer -' + l + ' -' + JSON.stringify(u));

                          case 5:
                          case 'end':
                            return f.stop();
                        }
                    },
                    null,
                    null,
                    null,
                    Promise
                  );
                });
                c.next = 11;
                break;

              case 8:
                c.prev = 8;
                c.t0 = c.catch(0);
                console.log('TimerUnitTest - delAllServerTimersFromRobot  error: ' + ('object' == typeof c.t0 ? JSON.stringify(c.t0) : c.t0));

              case 11:
              case 'end':
                return c.stop();
            }
        },
        null,
        null,
        [[0, 8]],
        Promise
      );
    },
    rrAddTimer: function () {
      var t, module23, o;
      return regeneratorRuntime.default.async(
        function (l) {
          for (;;)
            switch ((l.prev = l.next)) {
              case 0:
                l.prev = 0;
                t = '10:27';
                module23 = {
                  id: 1,
                  method: 'server_scheduled_start',
                  params: ['a1113414', 101, '0'],
                };
                l.next = 5;
                return regeneratorRuntime.default.awrap(module393.rrAddOrEditTimer(t, module23, ''));

              case 5:
                o = l.sent;
                console.log('RRMISDK.rrAddOrEditTimer  success -- ' + JSON.stringify(o));
                l.next = 12;
                break;

              case 9:
                l.prev = 9;
                l.t0 = l.catch(0);
                console.log('RRMISDK.rrAddOrEditTimer  error: ' + ('object' == typeof l.t0 ? JSON.stringify(l.t0) : l.t0));

              case 12:
              case 'end':
                return l.stop();
            }
        },
        null,
        null,
        [[0, 9]],
        Promise
      );
    },
    rrGetTimer: function () {
      var t;
      return regeneratorRuntime.default.async(
        function (s) {
          for (;;)
            switch ((s.prev = s.next)) {
              case 0:
                s.prev = 0;
                s.next = 3;
                return regeneratorRuntime.default.awrap(module393.getServerTimers());

              case 3:
                t = s.sent;
                console.log('RRMISDK.testGetTimer  success -- ' + JSON.stringify(t));
                s.next = 10;
                break;

              case 7:
                s.prev = 7;
                s.t0 = s.catch(0);
                console.log('RRMISDK.testGetTimer  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));

              case 10:
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
    rrDelAllServerTimer: function () {
      return regeneratorRuntime.default.async(
        function (t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                t.next = 2;
                return regeneratorRuntime.default.awrap(module393.getServerTimers());

              case 2:
                t.sent.forEach(function (t) {
                  var s;
                  return regeneratorRuntime.default.async(
                    function (o) {
                      for (;;)
                        switch ((o.prev = o.next)) {
                          case 0:
                            o.prev = 0;
                            o.next = 3;
                            return regeneratorRuntime.default.awrap(module393.delServerTimer(t.timerId));

                          case 3:
                            s = o.sent;
                            console.log('RRMISDK.deleteServerTimer -' + t.timerId + ' -' + JSON.stringify(s));
                            o.next = 10;
                            break;

                          case 7:
                            o.prev = 7;
                            o.t0 = o.catch(0);
                            console.log('RRMISDK.delServerTimer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));

                          case 10:
                          case 'end':
                            return o.stop();
                        }
                    },
                    null,
                    null,
                    [[0, 7]],
                    Promise
                  );
                });

              case 4:
              case 'end':
                return t.stop();
            }
        },
        null,
        null,
        null,
        Promise
      );
    },
  });

exports.default = l;
