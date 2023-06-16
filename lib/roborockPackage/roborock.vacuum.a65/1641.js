var module23 = require('@babel/runtime/helpers/slicedToArray'),
  module50 = require('./50'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module416 = require('./416'),
  module381 = require('./381'),
  module1642 = require('./1642');

function p(t, n) {
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

function T(t) {
  for (var n = 1; n < arguments.length; n++) {
    var o = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      p(Object(o), true).forEach(function (n) {
        module50.default(t, n, o[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      p(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

require('./398');

require('./1643');

var module393 = require('./393'),
  module1644 = require('./1644'),
  module1645 = require('./1645'),
  x = null,
  S = (function () {
    function t() {
      module6.default(this, t);

      if (!x) {
        this.init();
        x = this;
      }

      return x;
    }

    module7.default(
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
                        if (!(module1645.isTimerExpiredByRepeatMode(t.repeatMode, t.fullDate + ':59') && 0 != module381.RSM.FCCState)) module23.push(t);
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
                      return regeneratorRuntime.default.awrap(module416.default.getServerTimer());

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
                      s.next = 21;
                      break;

                    case 16:
                      s.prev = 16;
                      s.t0 = s.catch(0);
                      this.isLoading = false;
                      console.log('fetchTimerListFromServer  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                      return s.abrupt('return', []);

                    case 21:
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
            var module6,
              module7,
              module381,
              module1642,
              p = this;
            return regeneratorRuntime.default.async(
              function (v) {
                for (;;)
                  switch ((v.prev = v.next)) {
                    case 0:
                      module6 = [];
                      module7 = this;
                      module381 = [];
                      s.forEach(function (s) {
                        var c, h, v, x, S, L, O, w, k, P, M, R, D, C, F, _, N, J, Z, j, I, B, E, H;

                        return regeneratorRuntime.default.async(
                          function (o) {
                            for (;;)
                              switch ((o.prev = o.next)) {
                                case 0:
                                  if (
                                    (console.log('mi data item', s.setting),
                                    (c = module7.parseServerTimerParas(s.setting.on_param)),
                                    (h = c.name),
                                    (v = '1' == s.setting.enable_timer),
                                    (x = p.getServerTimerDisable(t, s.setting.on_param[0].name)),
                                    (S = module1644.ConvertToReadableFormat(s.setting.on_time)),
                                    (L = module1645.fixTargetTime(S)),
                                    (O = module1645.convertToPhoneTimeZoneTime(S.minute, S.hour, S.dateofmonth, S.month)),
                                    (w = O.hour),
                                    (k = O.minute),
                                    (P = new Date()),
                                    (M = P.getFullYear()),
                                    1 == O.month && 1 == O.day && P.getMonth() + 1 == 12 && 31 == P.getDate() && (M += 1),
                                    (R = '' + M + module1645.addZeroPrefix(O.month) + module1645.addZeroPrefix(O.day)),
                                    (D = R + ' ' + module1645.addZeroPrefix(w) + ':' + module1645.addZeroPrefix(k)),
                                    !(C = module1645.isTimerExpired(S.repeat, D + ':59', false)))
                                  ) {
                                    o.next = 20;
                                    break;
                                  }

                                  module1645.deleteServerTimer(s, h);
                                  console.log('task is outOfDate - date-' + D + ' - ' + h + ' - ' + C);
                                  return o.abrupt('return');

                                case 20:
                                  if ((F = module1645.getRepeatMode(S.repeat, false)) != module1645.RepeatMode.Once)
                                    O.month == L.month
                                      ? O.day == L.day + 1
                                        ? (F = module1645.getDaysArrByOffset(F, 1))
                                        : O.day == L.day - 1 && (F = module1645.getDaysArrByOffset(F, -1))
                                      : (F = 1 == O.day ? module1645.getDaysArrByOffset(F, 1) : module1645.getDaysArrByOffset(F, -1));
                                  _ = module1645.timerRepeatToCronRepeat(F);
                                  N = module1645.getTextOfRepeatPattern(_, R, false);
                                  J = module1645.addZeroPrefix(O.hour) + ' : ' + module1645.addZeroPrefix(O.minute);
                                  Z = module1645.convetToWeekendsByStartTime(F, S.dateofmonth, S.month);
                                  j = T(
                                    {
                                      name: h,
                                      hour: O.hour,
                                      minute: O.minute,
                                      enabled: v,
                                      cleanTime: J,
                                      repeatMode: F,
                                      repeatModeText: N,
                                      startWeekdays: Z,
                                      disable: x,
                                      fullDate: D,
                                    },
                                    c
                                  );

                                  if (
                                    (I = t.find(function (t) {
                                      var s = module23.default(t, 2),
                                        o = s[0];
                                      s[1];
                                      return o == h;
                                    }))
                                  ) {
                                    module381.push(I);
                                    B = module23.default(I, 3);
                                    B[0];
                                    E = B[1];
                                    if (undefined !== (H = B[2])) j.mapId = H;
                                    j.enabled = 'on' == E && v;
                                    module6.push(j);
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
                      this.sortListByTime(module6);
                      module1642 = [];
                      module6.forEach(function (t) {
                        var s = module7.miTimerScenes.find(function (s) {
                          var o = module23.default(s.setting.on_param, 3),
                            u = o[0];
                          return u.constructor == Object ? u.name == t.name : u == t.name;
                        });
                        if (s) module1642.push(s);
                      });
                      this.miTimerScenes = module1642;
                      this.serverTimerList = module6;
                      console.log(
                        'Sorted scenes - ' + JSON.stringify(this.miTimerScenes) + ' - shownList - ' + JSON.stringify(module6) + ' -- serverTimerList ' + this.serverTimerList
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
                                  return regeneratorRuntime.default.awrap(module416.default.deleteServerTimer(u));

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
                      return v.abrupt('return', module6);

                    case 12:
                    case 'end':
                      return v.stop();
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
              var c, y, x, S, L, O, w, k, P, M, R, D, C, F, _, N, J, Z, j, I;

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
                          (y = c.name),
                          (x = s.time.split(':')),
                          (S = module23.default(x, 2)),
                          (L = S[0]),
                          (O = S[1]),
                          '00000000' == s.date &&
                            ((w = new Date()), (s.date = '' + w.getFullYear() + module1645.addZeroPrefix(w.getMonth() + 1) + module1645.addZeroPrefix(w.getDate()))),
                          (k = s.date + ' ' + s.time),
                          (P = module1642.default(k, 'YYYYMMDD HH:mm')),
                          console.log('date date - ' + P.date() + ' - ' + (P.month() + 1)),
                          (M = module1645.convertTimeFromSourceZoneToPhoneZone(O, L, P.date(), P.month() + 1, module393.robotTimeZone)),
                          (L = M.hour),
                          (O = M.minute),
                          (k = s.date + ' ' + module1645.addZeroPrefix(L) + ' : ' + module1645.addZeroPrefix(O)),
                          !module1645.isTimerExpired(s.loops, k + ':59', true))
                        ) {
                          B.next = 22;
                          break;
                        }

                        B.next = 20;
                        return regeneratorRuntime.default.awrap(module1645.deleteServerTimer(s.timerId, y));

                      case 20:
                        console.log('task is outOfDate - date-' + s.date + ' ' + s.time + ' - ' + module1645.isTimerExpired(s.loops, k + ':59', true));
                        return B.abrupt('return');

                      case 22:
                        R = module1645.getRepeatMode(s.loops, true);
                        R = module1645.resolveRepeatModeByTargetTime(R, P.month() + 1, P.date(), M.month, M.day);
                        R = module1645.getRepeatMode(R, true);
                        D = module1645.getTextOfRepeatPattern(R, s.date, true);
                        C = module1645.convetToWeekendsByStartTime(R, M.dateofmonth, M.month);
                        F = u.getServerTimerDisable(t, y);
                        _ = T(
                          {
                            name: y,
                            hour: L,
                            minute: O,
                            date: s.date,
                            timerId: s.timerId,
                            cleanTime: module1645.addZeroPrefix(L) + ' : ' + module1645.addZeroPrefix(O),
                            repeatMode: R,
                            repeatModeText: D,
                            startWeekdays: C,
                            disable: F,
                            fullDate: k,
                          },
                          c
                        );

                        if (
                          (N = t.find(function (t) {
                            var s = module23.default(t, 2),
                              o = s[0];
                            s[1];
                            return o == y;
                          }))
                        ) {
                          p.push(N);
                          J = module23.default(N, 3);
                          Z = J[0];
                          j = J[1];
                          if (undefined !== (I = J[2])) _.mapId = I;
                          _.name = Z;
                          _.enabled = 'on' == j && 1 == s.status;
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
                        return regeneratorRuntime.default.awrap(module416.default.deleteServerTimer(u));

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
              p = 0,
              T = -99;

            if (t[0].constructor == Object) {
              var v = module23.default(t, 1)[0];
              u = v.name;
              s = v.fan_power;
              o = v.segments;
              l = v.clean_order_mode;
              c = v.water_box_mode;
              f = v.map_index;
              h = v.mop_mode;
              p = v.clean_mop;
              T = v.mop_template_id;
            } else {
              var y = module23.default(t, 3);
              u = y[0];
              s = y[1];
              o = y[2];
            }

            return {
              mode: s,
              segments: o,
              name: u,
              cleanOrder: l,
              waterMode: c,
              mapId: f,
              mopMode: h,
              cleanMethod: p,
              mopModeId: T,
              mopModeName: null,
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
                      return regeneratorRuntime.default.awrap(module416.default.getTimer());

                    case 8:
                      t = s.sent;
                      this.totalTimerCount = t.result.length;
                      s.next = 12;
                      return regeneratorRuntime.default.awrap(this.handleRobotTimerList(t.result));

                    case 12:
                      return s.abrupt('return', s.sent);

                    case 13:
                      s.next = 20;
                      break;

                    case 15:
                      s.prev = 15;
                      s.t0 = s.catch(0);
                      this.isLoading = false;
                      console.log('fetchListDataFromRobot  error: ' + ('object' == typeof s.t0 ? JSON.stringify(s.t0) : s.t0));
                      return s.abrupt('return', []);

                    case 20:
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
                      return regeneratorRuntime.default.awrap(module416.default.getTimerListSummary());

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
                      u.next = 26;
                      break;

                    case 16:
                      if (((u.prev = 16), (u.t0 = u.catch(0)), (this.hasFetchedRecordCount = 0), (this.isLoading = false), !t)) {
                        u.next = 25;
                        break;
                      }

                      console.log('getTimerListSummary  error: ' + ('object' == typeof u.t0 ? JSON.stringify(u.t0) : u.t0));
                      t(this.robotTimerList, u.t0);
                      u.next = 26;
                      break;

                    case 25:
                      return u.abrupt('return', this.handleRobotTimerList([]));

                    case 26:
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
                      return regeneratorRuntime.default.awrap(module416.default.getTimerDetail(t));

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
                        var u, l, c, h, p, T, v, x, S, L, O, w, k, P, M, R, D, C, F, _, N, J, Z, j, I, B, E, H, A;

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
                                  p = module23.default(h, 2);
                                  T = p[0];
                                  v = p[1];
                                  x = module1644.ConvertToReadableFormat(T);
                                  S = 0;
                                  L = [];
                                  O = 0;
                                  w = 0;
                                  k = null;
                                  P = 0;
                                  M = 0;
                                  R = -99;
                                  D = null;

                                  if (
                                    module381.RobotStatusManager.sharedManager().isSupportOrderSegmentClean() ||
                                    module381.RobotStatusManager.sharedManager().containOrderSegmentCleanString(JSON.stringify(t))
                                  ) {
                                    C = module23.default(v, 2);
                                    F = C[1];
                                    S = F.fan_power;
                                    L = F.segments;
                                    O = F.clean_order_mode;
                                    w = F.water_box_mode;
                                    k = F.map_index;
                                    P = F.mop_mode;
                                    M = F.clean_mop;
                                    R = F.mop_template_id;
                                  } else {
                                    _ = module23.default(v, 3);
                                    N = _[1];
                                    J = _[2];
                                    S = N;
                                    L = J;
                                  }

                                  Z = '' + new Date().getFullYear() + module1645.addZeroPrefix(x.month) + module1645.addZeroPrefix(x.dateofmonth);
                                  j = Z + ' ' + module1645.addZeroPrefix(x.hour) + ':' + module1645.addZeroPrefix(x.minute);
                                  I = module1645.getRepeatMode(x.repeat, false);
                                  B = module1645.getTextOfRepeatPattern(x.repeat, Z, false);
                                  E = module1645.addZeroPrefix(x.hour) + ' : ' + module1645.addZeroPrefix(x.minute);
                                  H = module1645.convetToWeekendsByStartTime(I, x.dateofmonth, x.month);
                                  A = {
                                    name: l,
                                    hour: x.hour,
                                    minute: x.minute,
                                    enabled: 'on' == c,
                                    cleanTime: E,
                                    mode: S,
                                    segments: L,
                                    repeatMode: I,
                                    repeatModeText: B,
                                    cleanOrder: O,
                                    waterMode: w,
                                    startWeekdays: H,
                                    disable: 'disable' == c,
                                    mapId: k,
                                    mopMode: P,
                                    cleanMethod: M,
                                    mopModeId: R,
                                    mopModeName: D,
                                    fullDate: j,
                                  };
                                  console.log('data- ' + JSON.stringify(A));
                                  module50.push(A);

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
                      return regeneratorRuntime.default.awrap(module1645.deleteServerTimer(module50, module23.name));

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
                      return regeneratorRuntime.default.awrap(module416.default.deleteTimer(module23.name));

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
            var u, module7, h, p;
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
                      return regeneratorRuntime.default.awrap(module416.default.updateServerTimer([[n.name, u]]));

                    case 5:
                      module7 = T.sent;
                      console.log('rpc update Server timer - ' + JSON.stringify(module7));
                      T.next = 9;
                      return regeneratorRuntime.default.awrap(module393.updateTimer(module393.isMiApp ? this.miTimerScenes[t] : n.timerId, s ? 1 : 0));

                    case 9:
                      h = T.sent;
                      console.log('RRMISDK update Server timer - ' + JSON.stringify(h));
                      T.next = 17;
                      break;

                    case 13:
                      T.next = 15;
                      return regeneratorRuntime.default.awrap(module416.default.updateTimer([n.name, u]));

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
                          var o = module1644.GetExecDate(s.hour, s.minute, module1645.timerRepeatToCronRepeat(s.repeatMode)),
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

exports.default = S;
var L = S.sharedManager();
exports.TLM = L;
