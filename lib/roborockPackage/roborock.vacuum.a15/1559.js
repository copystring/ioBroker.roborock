var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module415 = require('./415'),
  module381 = require('./381'),
  module1560 = require('./1560'),
  module1543 = require('./1543');

function T(t, n) {
  var s = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    s.push.apply(s, o);
  }

  return s;
}

function v(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      T(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./398');

require('./1561');

var module393 = require('./393'),
  module1562 = require('./1562'),
  module1563 = require('./1563'),
  S = null,
  L = (function () {
    function t() {
      module4.default(this, t);

      if (!S) {
        this.init();
        S = this;
      }

      return S;
    }

    module5.default(
      t,
      [
        {
          key: 'init',
          value: function () {
            this.resultTimerList = undefined;
            this.robotTimerList = [];
            this.miTimerScenes = [];
            this.serverTimerList = [];
            this.loopTimerList = [];
            this.hasFetchedRecordCount = 0;
          },
        },
        {
          key: 'fetchTimerList',
          value: function (t) {
            var module23;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      if ((console.log('FCCState - ' + module381.RSM.FCCState), t || !this.resultTimerList)) {
                        s.next = 6;
                        break;
                      }

                      module23 = [];
                      this.resultTimerList.forEach(function (t) {
                        if (!(module1563.isTimerExpiredByRepeatMode(t.repeatMode, t.fullDate + ':59') && 0 != module381.RSM.FCCState)) module23.push(t);
                      });
                      this.resultTimerList = module23;
                      return s.abrupt('return');

                    case 6:
                      if (!this.isLoading) {
                        s.next = 8;
                        break;
                      }

                      return s.abrupt('return');

                    case 8:
                      if ((this.init(), (this.isLoading = true), 1 != module381.RSM.FCCState)) {
                        s.next = 16;
                        break;
                      }

                      s.next = 13;
                      return regeneratorRuntime.default.awrap(this.fetchTimerListFromServer());

                    case 13:
                      this.resultTimerList = s.sent;
                      s.next = 19;
                      break;

                    case 16:
                      s.next = 18;
                      return regeneratorRuntime.default.awrap(this.fetchListDataFromRobot());

                    case 18:
                      this.resultTimerList = s.sent;

                    case 19:
                      this.isLoading = false;
                      console.log('fetchTimerList resultTimerList ' + JSON.stringify(this.resultTimerList));

                    case 21:
                    case 'end':
                      return s.stop();
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
          key: 'fetchTimerListFromServer',
          value: function () {
            var t, n;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      s.prev = 0;
                      s.next = 3;
                      return regeneratorRuntime.default.awrap(module415.default.getServerTimer());

                    case 3:
                      t = s.sent;
                      console.log('RobotApi.getServerTimer - ' + JSON.stringify(t));
                      s.next = 7;
                      return regeneratorRuntime.default.awrap(module393.getServerTimers());

                    case 7:
                      if (((n = s.sent), console.log('fetchTimerListFromServer - ' + n), !module393.isMiApp)) {
                        s.next = 13;
                        break;
                      }

                      return s.abrupt('return', this.miHandleServerTimerList(t.result, n));

                    case 13:
                      return s.abrupt('return', this.rrHandleServerTimerList(t.result, n));

                    case 14:
                      s.next = 20;
                      break;

                    case 16:
                      s.prev = 16;
                      s.t0 = s.catch(0);
                      console.log('fetchTimerListFromServer  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                      return s.abrupt('return', []);

                    case 20:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[0, 16]],
              Promise
            );
          },
        },
        {
          key: 'miHandleServerTimerList',
          value: function (t, s) {
            var module4,
              module5,
              module381,
              module1560,
              p = this;
            return regeneratorRuntime.default.async(
              function (T) {
                for (;;)
                  switch ((T.prev = T.next)) {
                    case 0:
                      module4 = [];
                      module5 = this;
                      module381 = [];
                      s.forEach(function (s) {
                        var c, h, T, y, S, L, O, w, M, k, P, R, D, C, F, _, N, I, J, Z, j, B, E, H;

                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  if (
                                    (console.log('mi data item', s.setting),
                                    (c = module5.parseServerTimerParas(s.setting.on_param)),
                                    (h = c.name),
                                    (T = '1' == s.setting.enable_timer),
                                    (y = p.getServerTimerDisable(t, s.setting.on_param[0].name)),
                                    (S = module1562.ConvertToReadableFormat(s.setting.on_time)),
                                    (L = module1563.fixTargetTime(S)),
                                    (O = module1563.convertToPhoneTimeZoneTime(S.minute, S.hour, S.dateofmonth, S.month)),
                                    (w = O.hour),
                                    (M = O.minute),
                                    (k = new Date()),
                                    (P = k.getFullYear()),
                                    1 == O.month && 1 == O.day && k.getMonth() + 1 == 12 && 31 == k.getDate() && (P += 1),
                                    (R = '' + P + module1563.addZeroPrefix(O.month) + module1563.addZeroPrefix(O.day)),
                                    (D = R + ' ' + module1563.addZeroPrefix(w) + ':' + module1563.addZeroPrefix(M)),
                                    !(C = module1563.isTimerExpired(S.repeat, D + ':59', false)))
                                  ) {
                                    o.next = 20;
                                    break;
                                  }

                                  module1563.deleteServerTimer(s, h);
                                  console.log('task is outOfDate - date-' + D + ' - ' + h + ' - ' + C);
                                  return o.abrupt('return');

                                case 20:
                                  if ((F = module1563.getRepeatMode(S.repeat, false)) != module1563.RepeatMode.Once)
                                    O.month == L.month
                                      ? O.day == L.day + 1
                                        ? (F = module1563.getDaysArrByOffset(F, 1))
                                        : O.day == L.day - 1 && (F = module1563.getDaysArrByOffset(F, -1))
                                      : (F = 1 == O.day ? module1563.getDaysArrByOffset(F, 1) : module1563.getDaysArrByOffset(F, -1));
                                  _ = module1563.timerRepeatToCronRepeat(F);
                                  N = module1563.getTextOfRepeatPattern(_, R, false);
                                  I = module1563.addZeroPrefix(O.hour) + ' : ' + module1563.addZeroPrefix(O.minute);
                                  J = module1563.convetToWeekendsByStartTime(F, S.dateofmonth, S.month);
                                  Z = v(
                                    {
                                      name: h,
                                      hour: O.hour,
                                      minute: O.minute,
                                      enabled: T,
                                      cleanTime: I,
                                      repeatMode: F,
                                      repeatModeText: N,
                                      startWeekdays: J,
                                      disable: y,
                                      fullDate: D,
                                    },
                                    c
                                  );

                                  if (
                                    (j = t.find(function (t) {
                                      var s = module23.default(t, 2),
                                        o = s[0];
                                      s[1];
                                      return o == h;
                                    }))
                                  ) {
                                    module381.push(j);
                                    B = module23.default(j, 3);
                                    B[0];
                                    E = B[1];
                                    if (undefined !== (H = B[2])) Z.mapId = H;
                                    Z.enabled = 'on' == E && T;
                                    module4.push(Z);
                                    p.miTimerScenes.push(s);
                                  }

                                case 29:
                                case 'end':
                                  return o.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      });
                      this.sortListByTime(module4);
                      module1560 = [];
                      module4.forEach(function (t) {
                        var s = module5.miTimerScenes.find(function (s) {
                          var o = module23.default(s.setting.on_param, 3),
                            u = o[0];
                          return u.constructor == Object ? u.name == t.name : u == t.name;
                        });
                        if (s) module1560.push(s);
                      });
                      this.miTimerScenes = module1560;
                      this.serverTimerList = module4;
                      console.log(
                        'Sorted scenes - ' + JSON.stringify(this.miTimerScenes) + ' - shownList - ' + JSON.stringify(module4) + ' -- serverTimerList ' + this.serverTimerList
                      );
                      t.forEach(function (t) {
                        var s, u, l;
                        return regeneratorRuntime.default.async(
                          function (h) {
                            for (;;)
                              switch ((h.prev = h.next)) {
                                case 0:
                                  if (
                                    ((s = module23.default(t, 3)),
                                    (u = s[0]),
                                    s[1],
                                    s[2],
                                    (l =
                                      -1 !=
                                      module381.findIndex(function (t) {
                                        var s = module23.default(t, 3),
                                          o = s[0];
                                        return u == o;
                                      })),
                                    console.log('isUsed', l, t),
                                    (h.t0 = !l),
                                    !h.t0)
                                  ) {
                                    h.next = 7;
                                    break;
                                  }

                                  h.next = 7;
                                  return regeneratorRuntime.default.awrap(module415.default.deleteServerTimer(u));

                                case 7:
                                case 'end':
                                  return h.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      });
                      return T.abrupt('return', module4);

                    case 12:
                    case 'end':
                      return T.stop();
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
          key: 'rrHandleServerTimerList',
          value: function (t, s) {
            var u = this,
              l = [],
              f = this,
              p = [];
            s.forEach(function (s) {
              var c, T, b, S, L, O, w, M, k, P, R, D, C, F, _, N, I, J, Z, j;

              return regeneratorRuntime.default.async(
                function (B) {
                  for (;;)
                    switch ((B.prev = B.next)) {
                      case 0:
                        if ((console.log('data item - ' + JSON.stringify(s)), s.params.params)) {
                          B.next = 6;
                          break;
                        }

                        B.next = 4;
                        return regeneratorRuntime.default.awrap(module393.delServerTimer(s.timerId));

                      case 4:
                        return B.abrupt('return');

                      case 6:
                        if (
                          ((c = f.parseServerTimerParas(s.params.params)),
                          (T = c.name),
                          (b = s.time.split(':')),
                          (S = module23.default(b, 2)),
                          (L = S[0]),
                          (O = S[1]),
                          '00000000' == s.date &&
                            ((w = new Date()), (s.date = '' + w.getFullYear() + module1563.addZeroPrefix(w.getMonth() + 1) + module1563.addZeroPrefix(w.getDate()))),
                          (M = s.date + ' ' + s.time),
                          (k = module1560.default(M, 'YYYYMMDD HH:mm')),
                          console.log('date date - ' + k.date() + ' - ' + (k.month() + 1)),
                          (P = module1563.convertTimeFromSourceZoneToPhoneZone(O, L, k.date(), k.month() + 1, module393.robotTimeZone)),
                          (L = P.hour),
                          (O = P.minute),
                          (M = s.date + ' ' + module1563.addZeroPrefix(L) + ' : ' + module1563.addZeroPrefix(O)),
                          !module1563.isTimerExpired(s.loops, M + ':59', true))
                        ) {
                          B.next = 22;
                          break;
                        }

                        B.next = 20;
                        return regeneratorRuntime.default.awrap(module1563.deleteServerTimer(s.timerId, T));

                      case 20:
                        console.log('task is outOfDate - date-' + s.date + ' ' + s.time + ' - ' + module1563.isTimerExpired(s.loops, M + ':59', true));
                        return B.abrupt('return');

                      case 22:
                        R = module1563.getRepeatMode(s.loops, true);
                        R = module1563.resolveRepeatModeByTargetTime(R, k.month() + 1, k.date(), P.month, P.day);
                        R = module1563.getRepeatMode(R, true);
                        D = module1563.getTextOfRepeatPattern(R, s.date, true);
                        C = module1563.convetToWeekendsByStartTime(R, P.dateofmonth, P.month);
                        F = u.getServerTimerDisable(t, T);
                        _ = v(
                          {
                            name: T,
                            hour: L,
                            minute: O,
                            date: s.date,
                            timerId: s.timerId,
                            cleanTime: module1563.addZeroPrefix(L) + ' : ' + module1563.addZeroPrefix(O),
                            repeatMode: R,
                            repeatModeText: D,
                            startWeekdays: C,
                            disable: F,
                            fullDate: M,
                          },
                          c
                        );

                        if (
                          (N = t.find(function (t) {
                            var s = module23.default(t, 2),
                              o = s[0];
                            s[1];
                            return o == T;
                          }))
                        ) {
                          p.push(N);
                          I = module23.default(N, 3);
                          J = I[0];
                          Z = I[1];
                          if (undefined !== (j = I[2])) _.mapId = j;
                          _.name = J;
                          _.enabled = 'on' == Z && 1 == s.status;
                          l.push(_);
                        }

                      case 31:
                      case 'end':
                        return B.stop();
                    }
                },
                null,
                null,
                null,
                Promise
              );
            });
            t.forEach(function (t) {
              var s, u, l;
              return regeneratorRuntime.default.async(
                function (f) {
                  for (;;)
                    switch ((f.prev = f.next)) {
                      case 0:
                        if (
                          ((s = module23.default(t, 3)),
                          (u = s[0]),
                          s[1],
                          s[2],
                          (l =
                            -1 !=
                            p.findIndex(function (t) {
                              var s = module23.default(t, 3),
                                o = s[0];
                              return u == o;
                            })),
                          console.log('isUsed', l, t),
                          (f.t0 = !l),
                          !f.t0)
                        ) {
                          f.next = 7;
                          break;
                        }

                        f.next = 7;
                        return regeneratorRuntime.default.awrap(module415.default.deleteServerTimer(u));

                      case 7:
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
            this.sortListByTime(l);
            this.serverTimerList = l;
            return l;
          },
        },
        {
          key: 'parseServerTimerParas',
          value: function (t) {
            var s = 0,
              o = [],
              u = '',
              l = 0,
              c = 0,
              f = undefined,
              h = 0,
              T = 0,
              v = -99,
              y = null;

            if (t[0].constructor == Object) {
              var b = module23.default(t, 1)[0];
              u = b.name;
              s = b.fan_power;
              o = b.segments;
              l = b.clean_order_mode;
              c = b.water_box_mode;
              f = b.map_index;
              h = b.mop_mode;
              T = b.clean_mop;
              v = b.mop_template_id;
              y = module1543.ModeDataInstance.getCustomMopModeNameById(v);
            } else {
              var x = module23.default(t, 3);
              u = x[0];
              s = x[1];
              o = x[2];
            }

            return {
              mode: s,
              segments: o,
              name: u,
              cleanOrder: l,
              waterMode: c,
              mapId: f,
              mopMode: h,
              cleanMethod: T,
              mopModeId: v,
              mopModeName: y,
            };
          },
        },
        {
          key: 'getServerTimerDisable',
          value: function (t, n) {
            for (var s in t) if (t[s][0] == n && 'disable' == t[s][1]) return true;

            return false;
          },
        },
        {
          key: 'sortListByTime',
          value: function (t) {
            t.sort(function (t, n) {
              return t.hour > n.hour ? 1 : t.hour == n.hour ? (t.minute > n.minute ? 1 : t.minute < n.minute ? -1 : 0) : -1;
            });
          },
        },
        {
          key: 'fetchListDataFromRobot',
          value: function () {
            var t,
              n = this;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      if (((s.prev = 0), [], !module381.RSM.isSupportFeature(122))) {
                        s.next = 6;
                        break;
                      }

                      return s.abrupt(
                        'return',
                        new Promise(function (t, s) {
                          n.loopFetchRobotTimer(function (n, o) {
                            if (o) s(o);
                            else t(n);
                          });
                        })
                      );

                    case 6:
                      s.next = 8;
                      return regeneratorRuntime.default.awrap(module415.default.getTimer());

                    case 8:
                      t = s.sent;
                      this.totalTimerCount = t.result.length;
                      s.next = 12;
                      return regeneratorRuntime.default.awrap(this.handleRobotTimerList(t.result));

                    case 12:
                      return s.abrupt('return', s.sent);

                    case 13:
                      s.next = 19;
                      break;

                    case 15:
                      s.prev = 15;
                      s.t0 = s.catch(0);
                      console.log('fetchListDataFromRobot  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                      return s.abrupt('return', []);

                    case 19:
                    case 'end':
                      return s.stop();
                  }
              },
              null,
              this,
              [[0, 15]],
              Promise
            );
          },
        },
        {
          key: 'loopFetchRobotTimer',
          value: function (t) {
            var n,
              s = this;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      u.next = 3;
                      return regeneratorRuntime.default.awrap(module415.default.getTimerListSummary());

                    case 3:
                      if (((n = u.sent), console.log('getTimerListSummary - ' + JSON.stringify(n)), (this.totalTimerCount = n.result.length || 0), 0 != this.totalTimerCount)) {
                        u.next = 12;
                        break;
                      }

                      if (!t) {
                        u.next = 11;
                        break;
                      }

                      t([]);
                      u.next = 12;
                      break;

                    case 11:
                      return u.abrupt('return', this.handleRobotTimerList([]));

                    case 12:
                      this.hasFetchedRecordCount = 0;
                      n.result.forEach(function (n) {
                        s.fetchTimerDetail(n, t);
                      });
                      u.next = 25;
                      break;

                    case 16:
                      if (((u.prev = 16), (u.t0 = u.catch(0)), (this.hasFetchedRecordCount = 0), !t)) {
                        u.next = 24;
                        break;
                      }

                      console.log('getTimerListSummary  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
                      t(this.robotTimerList, u.t0);
                      u.next = 25;
                      break;

                    case 24:
                      return u.abrupt('return', this.handleRobotTimerList([]));

                    case 25:
                    case 'end':
                      return u.stop();
                  }
              },
              null,
              this,
              [[0, 16]],
              Promise
            );
          },
        },
        {
          key: 'fetchTimerDetail',
          value: function (t, n) {
            var s;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      u.next = 3;
                      return regeneratorRuntime.default.awrap(module415.default.getTimerDetail(t));

                    case 3:
                      s = u.sent;
                      this.loopTimerList.push(s.result[0]);
                      console.log('fetchTimerDetail ' + t + ' -' + JSON.stringify(s));
                      this.hasFetchedRecordCount++;
                      console.log(this.hasFetchedRecordCount + ' -- ' + this.totalTimerCount);

                      if (this.checkShouldUpdateTimerList()) {
                        this.handleRobotTimerList(this.loopTimerList);
                        if (n) n(this.robotTimerList);
                      }

                      u.next = 15;
                      break;

                    case 11:
                      u.prev = 11;
                      u.t0 = u.catch(0);
                      this.hasFetchedRecordCount++;
                      console.log('fetchTimerDetail ' + t + ' error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                    case 15:
                    case 'end':
                      return u.stop();
                  }
              },
              null,
              this,
              [[0, 11]],
              Promise
            );
          },
        },
        {
          key: 'checkShouldUpdateTimerList',
          value: function () {
            return this.hasFetchedRecordCount >= this.totalTimerCount;
          },
        },
        {
          key: 'handleRobotTimerList',
          value: function (t) {
            var module50;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      module50 = [];
                      t.forEach(function (t) {
                        var u, l, c, h, T, v, y, S, L, O, w, M, k, P, R, D, C, F, _, N, I, J, Z, j, B, E, H, A, Y;

                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  console.log('data item - ' + JSON.stringify(t));
                                  u = module23.default(t, 3);
                                  l = u[0];
                                  c = u[1];
                                  h = u[2];
                                  T = module23.default(h, 2);
                                  v = T[0];
                                  y = T[1];
                                  S = module1562.ConvertToReadableFormat(v);
                                  L = 0;
                                  O = [];
                                  w = 0;
                                  M = 0;
                                  k = null;
                                  P = 0;
                                  R = 0;
                                  D = -99;
                                  C = null;

                                  if (
                                    module381.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ||
                                    module381.RobotStatusManager.sharedManager().containOrderSegmentCleanString(JSON.stringify(t))
                                  ) {
                                    F = module23.default(y, 2);
                                    _ = F[1];
                                    L = _.fan_power;
                                    O = _.segments;
                                    w = _.clean_order_mode;
                                    M = _.water_box_mode;
                                    k = _.map_index;
                                    P = _.mop_mode;
                                    R = _.clean_mop;
                                    D = _.mop_template_id;
                                    C = module1543.ModeDataInstance.getCustomMopModeNameById(D);
                                  } else {
                                    N = module23.default(y, 3);
                                    I = N[1];
                                    J = N[2];
                                    L = I;
                                    O = J;
                                  }

                                  Z = '' + new Date().getFullYear() + module1563.addZeroPrefix(S.month) + module1563.addZeroPrefix(S.dateofmonth);
                                  j = Z + ' ' + module1563.addZeroPrefix(S.hour) + ':' + module1563.addZeroPrefix(S.minute);
                                  B = module1563.getRepeatMode(S.repeat, false);
                                  E = module1563.getTextOfRepeatPattern(S.repeat, Z, false);
                                  H = module1563.addZeroPrefix(S.hour) + ' : ' + module1563.addZeroPrefix(S.minute);
                                  A = module1563.convetToWeekendsByStartTime(B, S.dateofmonth, S.month);
                                  Y = {
                                    name: l,
                                    hour: S.hour,
                                    minute: S.minute,
                                    enabled: 'on' == c,
                                    cleanTime: H,
                                    mode: L,
                                    segments: O,
                                    repeatMode: B,
                                    repeatModeText: E,
                                    cleanOrder: w,
                                    waterMode: M,
                                    startWeekdays: A,
                                    disable: 'disable' == c,
                                    mapId: k,
                                    mopMode: P,
                                    cleanMethod: R,
                                    mopModeId: D,
                                    mopModeName: C,
                                    fullDate: j,
                                  };
                                  console.log('data- ' + JSON.stringify(Y));
                                  module50.push(Y);

                                case 23:
                                case 'end':
                                  return o.stop();
                              }
                          },
                          null,
                          null,
                          null,
                          Promise
                        );
                      });
                      this.sortListByTime(module50);
                      this.robotTimerList = module50;
                      return u.abrupt('return', module50);

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
        {
          key: 'deleteServerTimer',
          value: function (t) {
            var module23, module50;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      module23 = this.serverTimerList[t];
                      module50 = module393.isMiApp ? this.miTimerScenes[t] : module23.timerId;
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(module1563.deleteServerTimer(module50, module23.name));

                    case 4:
                      this.resultTimerList = this.deleteList(parseInt(t), 1, this.resultTimerList);
                      this.serverTimerList = this.deleteList(parseInt(t), 1, this.serverTimerList);

                    case 6:
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
        {
          key: 'deleteRobotTimer',
          value: function (t) {
            var module23, module50;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      module23 = this.robotTimerList[t];
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(module415.default.deleteTimer(module23.name));

                    case 4:
                      module50 = u.sent;
                      console.log('deleteRobotTimer ' + t + ' ' + JSON.stringify(module50));
                      this.resultTimerList = this.deleteList(parseInt(t), 1, this.resultTimerList);
                      this.robotTimerList = this.deleteList(parseInt(t), 1, this.robotTimerList);
                      this.totalTimerCount--;
                      return u.abrupt('return', module50);

                    case 12:
                      u.prev = 12;
                      u.t0 = u.catch(0);
                      console.log('deleteRobotTimer  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));

                    case 15:
                    case 'end':
                      return u.stop();
                  }
              },
              null,
              this,
              [[0, 12]],
              Promise
            );
          },
        },
        {
          key: 'deleteList',
          value: function (t, n, s) {
            var o = JSON.parse(JSON.stringify(s));
            o.splice(t, n);
            return o;
          },
        },
        {
          key: 'updateTimerOnStatus',
          value: function (t, n, s) {
            var u, module5, h, p;
            return regeneratorRuntime.default.async(
              function (T) {
                for (;;)
                  switch ((T.prev = T.next)) {
                    case 0:
                      if (((u = s ? 'on' : 'off'), 1 != module381.RSM.FCCState)) {
                        T.next = 13;
                        break;
                      }

                      console.log('updateServerTimer - ' + JSON.stringify(n));
                      T.next = 5;
                      return regeneratorRuntime.default.awrap(module415.default.updateServerTimer([[n.name, u]]));

                    case 5:
                      module5 = T.sent;
                      console.log('rpc update Server timer - ' + JSON.stringify(module5));
                      T.next = 9;
                      return regeneratorRuntime.default.awrap(module393.updateTimer(module393.isMiApp ? this.miTimerScenes[t] : n.timerId, s ? 1 : 0));

                    case 9:
                      h = T.sent;
                      console.log('RRMISDK update Server timer - ' + JSON.stringify(h));
                      T.next = 17;
                      break;

                    case 13:
                      T.next = 15;
                      return regeneratorRuntime.default.awrap(module415.default.updateTimer([n.name, u]));

                    case 15:
                      p = T.sent;
                      console.log('rpc update Robot timer - ' + JSON.stringify(p));

                    case 17:
                      this.resultTimerList[t].enabled = !!s;

                    case 18:
                    case 'end':
                      return T.stop();
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
          key: 'sortListByDiffTime',
          value: function (t) {
            t.sort(function (t, n) {
              return t.diffTime > n.diffTime ? 1 : -1;
            });
          },
        },
        {
          key: 'GetListByHours',
          value: function (t) {
            var module23;
            return regeneratorRuntime.default.async(
              function (s) {
                for (;;)
                  switch ((s.prev = s.next)) {
                    case 0:
                      module23 = [];
                      s.next = 3;
                      return regeneratorRuntime.default.awrap(this.fetchTimerList(false));

                    case 3:
                      if (this.resultTimerList)
                        this.resultTimerList.forEach(function (s) {
                          var o = module1562.GetExecDate(s.hour, s.minute, module1563.timerRepeatToCronRepeat(s.repeatMode)),
                            u = new Date();
                          u.setFullYear(o.year, o.month - 1, o.date);
                          u.setHours(o.hour);
                          u.setMinutes(o.minute);
                          var l = new Date(),
                            c = u.getTime() - l.getTime();

                          if (s.enabled && c < 60 * t * 60 * 1e3 && c > 0) {
                            s.diffTime = c;
                            module23.push(s);
                          }
                        });
                      this.sortListByDiffTime(module23);
                      console.log('GetListByHours - ' + JSON.stringify(module23));
                      return s.abrupt('return', module23);

                    case 7:
                    case 'end':
                      return s.stop();
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
          key: 'sharedManager',
          value: function () {
            return new t();
          },
        },
      ]
    );
    return t;
  })();

exports.default = L;
var O = L.sharedManager();
exports.TLM = O;
