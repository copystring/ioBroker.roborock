var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module407 = require('./407'),
  module377 = require('./377'),
  module1365 = require('./1365'),
  module1354 = require('./1354');

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
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      T(Object(s), true).forEach(function (n) {
        module49.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      T(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

require('./394');

require('./1366');

var module389 = require('./389'),
  module1367 = require('./1367'),
  module1368 = require('./1368'),
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
            var module22;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      if ((console.log('FCCState - ' + module377.RSM.FCCState), t || !this.resultTimerList)) {
                        o.next = 6;
                        break;
                      }

                      module22 = [];
                      this.resultTimerList.forEach(function (t) {
                        if (!(module1368.isTimerExpiredByRepeatMode(t.repeatMode, t.fullDate + ':59') && 0 != module377.RSM.FCCState)) module22.push(t);
                      });
                      this.resultTimerList = module22;
                      return o.abrupt('return');

                    case 6:
                      if (!this.isLoading) {
                        o.next = 8;
                        break;
                      }

                      return o.abrupt('return');

                    case 8:
                      if ((this.init(), (this.isLoading = true), 1 != module377.RSM.FCCState)) {
                        o.next = 16;
                        break;
                      }

                      o.next = 13;
                      return regeneratorRuntime.default.awrap(this.fetchTimerListFromServer());

                    case 13:
                      this.resultTimerList = o.sent;
                      o.next = 19;
                      break;

                    case 16:
                      o.next = 18;
                      return regeneratorRuntime.default.awrap(this.fetchListDataFromRobot());

                    case 18:
                      this.resultTimerList = o.sent;

                    case 19:
                      this.isLoading = false;
                      console.log('fetchTimerList resultTimerList ' + JSON.stringify(this.resultTimerList));

                    case 21:
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
          key: 'fetchTimerListFromServer',
          value: function () {
            var t, s;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      o.prev = 0;
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(module407.default.getServerTimer());

                    case 3:
                      t = o.sent;
                      console.log('RobotApi.getServerTimer - ' + JSON.stringify(t));
                      o.next = 7;
                      return regeneratorRuntime.default.awrap(module389.getServerTimers());

                    case 7:
                      if (((s = o.sent), console.log('fetchTimerListFromServer - ' + s), !module389.isMiApp)) {
                        o.next = 13;
                        break;
                      }

                      return o.abrupt('return', this.miHandleServerTimerList(t.result, s));

                    case 13:
                      return o.abrupt('return', this.rrHandleServerTimerList(t.result, s));

                    case 14:
                      o.next = 20;
                      break;

                    case 16:
                      o.prev = 16;
                      o.t0 = o.catch(0);
                      console.log('fetchTimerListFromServer  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                      return o.abrupt('return', []);

                    case 20:
                    case 'end':
                      return o.stop();
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
          value: function (t, o) {
            var module4,
              module5,
              module377,
              module1365,
              p = this;
            return regeneratorRuntime.default.async(
              function (T) {
                for (;;)
                  switch ((T.prev = T.next)) {
                    case 0:
                      module4 = [];
                      module5 = this;
                      module377 = [];
                      o.forEach(function (o) {
                        var c, h, T, y, S, L, O, w, M, k, P, R, D, C, F, _, N, I, J, Z, j, B, E, H;

                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  if (
                                    (console.log('mi data item', o.setting),
                                    (c = module5.parseServerTimerParas(o.setting.on_param)),
                                    (h = c.name),
                                    (T = '1' == o.setting.enable_timer),
                                    (y = p.getServerTimerDisable(t, o.setting.on_param[0].name)),
                                    (S = module1367.ConvertToReadableFormat(o.setting.on_time)),
                                    (L = module1368.fixTargetTime(S)),
                                    (O = module1368.convertToPhoneTimeZoneTime(S.minute, S.hour, S.dateofmonth, S.month)),
                                    (w = O.hour),
                                    (M = O.minute),
                                    (k = new Date()),
                                    (P = k.getFullYear()),
                                    1 == O.month && 1 == O.day && k.getMonth() + 1 == 12 && 31 == k.getDate() && (P += 1),
                                    (R = '' + P + module1368.addZeroPrefix(O.month) + module1368.addZeroPrefix(O.day)),
                                    (D = R + ' ' + module1368.addZeroPrefix(w) + ':' + module1368.addZeroPrefix(M)),
                                    !(C = module1368.isTimerExpired(S.repeat, D + ':59', false)))
                                  ) {
                                    n.next = 20;
                                    break;
                                  }

                                  module1368.deleteServerTimer(o, h);
                                  console.log('task is outOfDate - date-' + D + ' - ' + h + ' - ' + C);
                                  return n.abrupt('return');

                                case 20:
                                  if ((F = module1368.getRepeatMode(S.repeat, false)) != module1368.RepeatMode.Once)
                                    O.month == L.month
                                      ? O.day == L.day + 1
                                        ? (F = module1368.getDaysArrByOffset(F, 1))
                                        : O.day == L.day - 1 && (F = module1368.getDaysArrByOffset(F, -1))
                                      : (F = 1 == O.day ? module1368.getDaysArrByOffset(F, 1) : module1368.getDaysArrByOffset(F, -1));
                                  _ = module1368.timerRepeatToCronRepeat(F);
                                  N = module1368.getTextOfRepeatPattern(_, R, false);
                                  I = module1368.addZeroPrefix(O.hour) + ' : ' + module1368.addZeroPrefix(O.minute);
                                  J = module1368.convetToWeekendsByStartTime(F, S.dateofmonth, S.month);
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
                                      var n = module22.default(t, 2),
                                        o = n[0];
                                      n[1];
                                      return o == h;
                                    }))
                                  ) {
                                    module377.push(j);
                                    B = module22.default(j, 3);
                                    B[0];
                                    E = B[1];
                                    if (undefined !== (H = B[2])) Z.mapId = H;
                                    Z.enabled = 'on' == E && T;
                                    module4.push(Z);
                                    p.miTimerScenes.push(o);
                                  }

                                case 29:
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
                      this.sortListByTime(module4);
                      module1365 = [];
                      module4.forEach(function (t) {
                        var n = module5.miTimerScenes.find(function (n) {
                          var o = module22.default(n.setting.on_param, 3),
                            u = o[0];
                          return u.constructor == Object ? u.name == t.name : u == t.name;
                        });
                        if (n) module1365.push(n);
                      });
                      this.miTimerScenes = module1365;
                      this.serverTimerList = module4;
                      console.log(
                        'Sorted scenes - ' + JSON.stringify(this.miTimerScenes) + ' - shownList - ' + JSON.stringify(module4) + ' -- serverTimerList ' + this.serverTimerList
                      );
                      t.forEach(function (t) {
                        var o, u, l;
                        return regeneratorRuntime.default.async(
                          function (h) {
                            for (;;)
                              switch ((h.prev = h.next)) {
                                case 0:
                                  if (
                                    ((o = module22.default(t, 3)),
                                    (u = o[0]),
                                    o[1],
                                    o[2],
                                    (l =
                                      -1 !=
                                      module377.findIndex(function (t) {
                                        var n = module22.default(t, 3),
                                          o = n[0];
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
                                  return regeneratorRuntime.default.awrap(module407.default.deleteServerTimer(u));

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
          value: function (t, o) {
            var u = this,
              l = [],
              f = this,
              p = [];
            o.forEach(function (o) {
              var c, T, b, S, L, O, w, M, k, P, R, D, C, F, _, N, I, J, Z, j;

              return regeneratorRuntime.default.async(
                function (B) {
                  for (;;)
                    switch ((B.prev = B.next)) {
                      case 0:
                        if ((console.log('data item - ' + JSON.stringify(o)), o.params.params)) {
                          B.next = 6;
                          break;
                        }

                        B.next = 4;
                        return regeneratorRuntime.default.awrap(module389.delServerTimer(o.timerId));

                      case 4:
                        return B.abrupt('return');

                      case 6:
                        if (
                          ((c = f.parseServerTimerParas(o.params.params)),
                          (T = c.name),
                          (b = o.time.split(':')),
                          (S = module22.default(b, 2)),
                          (L = S[0]),
                          (O = S[1]),
                          '00000000' == o.date &&
                            ((w = new Date()), (o.date = '' + w.getFullYear() + module1368.addZeroPrefix(w.getMonth() + 1) + module1368.addZeroPrefix(w.getDate()))),
                          (M = o.date + ' ' + o.time),
                          (k = module1365.default(M, 'YYYYMMDD HH:mm')),
                          console.log('date date - ' + k.date() + ' - ' + (k.month() + 1)),
                          (P = module1368.convertTimeFromSourceZoneToPhoneZone(O, L, k.date(), k.month() + 1, module389.robotTimeZone)),
                          (L = P.hour),
                          (O = P.minute),
                          (M = o.date + ' ' + module1368.addZeroPrefix(L) + ' : ' + module1368.addZeroPrefix(O)),
                          !module1368.isTimerExpired(o.loops, M + ':59', true))
                        ) {
                          B.next = 22;
                          break;
                        }

                        B.next = 20;
                        return regeneratorRuntime.default.awrap(module1368.deleteServerTimer(o.timerId, T));

                      case 20:
                        console.log('task is outOfDate - date-' + o.date + ' ' + o.time + ' - ' + module1368.isTimerExpired(o.loops, M + ':59', true));
                        return B.abrupt('return');

                      case 22:
                        R = module1368.getRepeatMode(o.loops, true);
                        R = module1368.resolveRepeatModeByTargetTime(R, k.month() + 1, k.date(), P.month, P.day);
                        R = module1368.getRepeatMode(R, true);
                        D = module1368.getTextOfRepeatPattern(R, o.date, true);
                        C = module1368.convetToWeekendsByStartTime(R, P.dateofmonth, P.month);
                        F = u.getServerTimerDisable(t, T);
                        _ = v(
                          {
                            name: T,
                            hour: L,
                            minute: O,
                            date: o.date,
                            timerId: o.timerId,
                            cleanTime: module1368.addZeroPrefix(L) + ' : ' + module1368.addZeroPrefix(O),
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
                            var n = module22.default(t, 2),
                              o = n[0];
                            n[1];
                            return o == T;
                          }))
                        ) {
                          p.push(N);
                          I = module22.default(N, 3);
                          J = I[0];
                          Z = I[1];
                          if (undefined !== (j = I[2])) _.mapId = j;
                          _.name = J;
                          _.enabled = 'on' == Z && 1 == o.status;
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
              var o, u, l;
              return regeneratorRuntime.default.async(
                function (f) {
                  for (;;)
                    switch ((f.prev = f.next)) {
                      case 0:
                        if (
                          ((o = module22.default(t, 3)),
                          (u = o[0]),
                          o[1],
                          o[2],
                          (l =
                            -1 !=
                            p.findIndex(function (t) {
                              var n = module22.default(t, 3),
                                o = n[0];
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
                        return regeneratorRuntime.default.awrap(module407.default.deleteServerTimer(u));

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
            var n = 0,
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
              var b = module22.default(t, 1)[0];
              u = b.name;
              n = b.fan_power;
              o = b.segments;
              l = b.clean_order_mode;
              c = b.water_box_mode;
              f = b.map_index;
              h = b.mop_mode;
              T = b.clean_mop;
              v = b.mop_template_id;
              y = module1354.ModeDataInstance.getCustomMopModeNameById(v);
            } else {
              var x = module22.default(t, 3);
              u = x[0];
              n = x[1];
              o = x[2];
            }

            return {
              mode: n,
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
              s = this;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      o.prev = 0;
                      [];
                      module377.RSM.isSupportFeature(122);
                      return o.abrupt(
                        'return',
                        new Promise(function (t, n) {
                          s.loopFetchRobotTimer(function (s, o) {
                            if (o) n(o);
                            else t(s);
                          });
                        })
                      );

                    case 6:
                      o.next = 8;
                      return regeneratorRuntime.default.awrap(module407.default.getTimer());

                    case 8:
                      t = o.sent;
                      this.totalTimerCount = t.result.length;
                      o.next = 12;
                      return regeneratorRuntime.default.awrap(this.handleRobotTimerList(t.result));

                    case 12:
                      return o.abrupt('return', o.sent);

                    case 13:
                      o.next = 19;
                      break;

                    case 15:
                      o.prev = 15;
                      o.t0 = o.catch(0);
                      console.log('fetchListDataFromRobot  error: ' + ('object' == typeof o.t0 ? JSON.stringify(o.t0) : o.t0));
                      return o.abrupt('return', []);

                    case 19:
                    case 'end':
                      return o.stop();
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
            var s,
              o = this;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      u.next = 3;
                      return regeneratorRuntime.default.awrap(module407.default.getTimerListSummary());

                    case 3:
                      if (((s = u.sent), console.log('getTimerListSummary - ' + JSON.stringify(s)), (this.totalTimerCount = s.result.length || 0), 0 != this.totalTimerCount)) {
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
                      s.result.forEach(function (n) {
                        o.fetchTimerDetail(n, t);
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
          value: function (t, s) {
            var o;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      u.next = 3;
                      return regeneratorRuntime.default.awrap(module407.default.getTimerDetail(t));

                    case 3:
                      o = u.sent;
                      this.loopTimerList.push(o.result[0]);
                      console.log('fetchTimerDetail ' + t + ' -' + JSON.stringify(o));
                      this.hasFetchedRecordCount++;
                      console.log(this.hasFetchedRecordCount + ' -- ' + this.totalTimerCount);

                      if (this.checkShouldUpdateTimerList()) {
                        this.handleRobotTimerList(this.loopTimerList);
                        if (s) s(this.robotTimerList);
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
            var module49;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      module49 = [];
                      t.forEach(function (t) {
                        var u, l, c, h, T, v, y, S, L, O, w, M, k, P, R, D, C, F, _, N, I, J, Z, j, B, E, H, A, Y;

                        return regeneratorRuntime.default.async(
                          function (n) {
                            for (;;)
                              switch ((n.prev = n.next)) {
                                case 0:
                                  console.log('data item - ' + JSON.stringify(t));
                                  u = module22.default(t, 3);
                                  l = u[0];
                                  c = u[1];
                                  h = u[2];
                                  T = module22.default(h, 2);
                                  v = T[0];
                                  y = T[1];
                                  S = module1367.ConvertToReadableFormat(v);
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
                                    module377.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ||
                                    module377.RobotStatusManager.sharedManager().containOrderSegmentCleanString(JSON.stringify(t))
                                  ) {
                                    F = module22.default(y, 2);
                                    _ = F[1];
                                    L = _.fan_power;
                                    O = _.segments;
                                    w = _.clean_order_mode;
                                    M = _.water_box_mode;
                                    k = _.map_index;
                                    P = _.mop_mode;
                                    R = _.clean_mop;
                                    D = _.mop_template_id;
                                    C = module1354.ModeDataInstance.getCustomMopModeNameById(D);
                                  } else {
                                    N = module22.default(y, 3);
                                    I = N[1];
                                    J = N[2];
                                    L = I;
                                    O = J;
                                  }

                                  Z = '' + new Date().getFullYear() + module1368.addZeroPrefix(S.month) + module1368.addZeroPrefix(S.dateofmonth);
                                  j = Z + ' ' + module1368.addZeroPrefix(S.hour) + ':' + module1368.addZeroPrefix(S.minute);
                                  B = module1368.getRepeatMode(S.repeat, false);
                                  E = module1368.getTextOfRepeatPattern(S.repeat, Z, false);
                                  H = module1368.addZeroPrefix(S.hour) + ' : ' + module1368.addZeroPrefix(S.minute);
                                  A = module1368.convetToWeekendsByStartTime(B, S.dateofmonth, S.month);
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
                                  module49.push(Y);

                                case 23:
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
                      this.sortListByTime(module49);
                      this.robotTimerList = module49;
                      return u.abrupt('return', module49);

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
            var module22, module49;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      module22 = this.serverTimerList[t];
                      module49 = module389.isMiApp ? this.miTimerScenes[t] : module22.timerId;
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(module1368.deleteServerTimer(module49, module22.name));

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
            var module22, module49;
            return regeneratorRuntime.default.async(
              function (u) {
                for (;;)
                  switch ((u.prev = u.next)) {
                    case 0:
                      u.prev = 0;
                      module22 = this.robotTimerList[t];
                      u.next = 4;
                      return regeneratorRuntime.default.awrap(module407.default.deleteTimer(module22.name));

                    case 4:
                      module49 = u.sent;
                      console.log('deleteRobotTimer ' + t + ' ' + JSON.stringify(module49));
                      this.resultTimerList = this.deleteList(parseInt(t), 1, this.resultTimerList);
                      this.robotTimerList = this.deleteList(parseInt(t), 1, this.robotTimerList);
                      this.totalTimerCount--;
                      return u.abrupt('return', module49);

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
          value: function (t, s, o) {
            var u, module5, h, p;
            return regeneratorRuntime.default.async(
              function (T) {
                for (;;)
                  switch ((T.prev = T.next)) {
                    case 0:
                      if (((u = o ? 'on' : 'off'), 1 != module377.RSM.FCCState)) {
                        T.next = 13;
                        break;
                      }

                      console.log('updateServerTimer - ' + JSON.stringify(s));
                      T.next = 5;
                      return regeneratorRuntime.default.awrap(module407.default.updateServerTimer([[s.name, u]]));

                    case 5:
                      module5 = T.sent;
                      console.log('rpc update Server timer - ' + JSON.stringify(module5));
                      T.next = 9;
                      return regeneratorRuntime.default.awrap(module389.updateTimer(module389.isMiApp ? this.miTimerScenes[t] : s.timerId, o ? 1 : 0));

                    case 9:
                      h = T.sent;
                      console.log('RRMISDK update Server timer - ' + JSON.stringify(h));
                      T.next = 17;
                      break;

                    case 13:
                      T.next = 15;
                      return regeneratorRuntime.default.awrap(module407.default.updateTimer([s.name, u]));

                    case 15:
                      p = T.sent;
                      console.log('rpc update Robot timer - ' + JSON.stringify(p));

                    case 17:
                      this.resultTimerList[t].enabled = !!o;

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
            var module22;
            return regeneratorRuntime.default.async(
              function (o) {
                for (;;)
                  switch ((o.prev = o.next)) {
                    case 0:
                      module22 = [];
                      o.next = 3;
                      return regeneratorRuntime.default.awrap(this.fetchTimerList(false));

                    case 3:
                      if (this.resultTimerList)
                        this.resultTimerList.forEach(function (n) {
                          var o = module1367.GetExecDate(n.hour, n.minute, module1368.timerRepeatToCronRepeat(n.repeatMode)),
                            u = new Date();
                          u.setFullYear(o.year, o.month - 1, o.date);
                          u.setHours(o.hour);
                          u.setMinutes(o.minute);
                          var l = new Date(),
                            c = u.getTime() - l.getTime();

                          if (n.enabled && c < 60 * t * 60 * 1e3 && c > 0) {
                            n.diffTime = c;
                            module22.push(n);
                          }
                        });
                      this.sortListByDiffTime(module22);
                      console.log('GetListByHours - ' + JSON.stringify(module22));
                      return o.abrupt('return', module22);

                    case 7:
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
