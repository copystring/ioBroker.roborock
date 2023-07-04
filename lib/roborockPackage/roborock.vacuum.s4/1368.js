exports.resolveRepeatModeByTargetTime = function (t, n, o, s, u) {
  var c = t;
  if (s == n) u == o + 1 ? (c = h(t, 1)) : u == o - 1 && (c = h(t, -1));
  else c = h(t, 1 == u ? 1 : -1);
  return c;
};

exports.getDaysArrByOffset = h;

exports.getLoopStringOfRepeatMode = function (t) {
  return M[t] || t;
};

exports.cronRepeatToTimerRepeat = C;

exports.timerRepeatToCronRepeat = function (t) {
  if (t == y.Once) return module1367.CodeOnce;
  if (t == y.Everyday) return module1367.CodeEveryday;
  if (t == y.Weekdays) return module1367.CodeWeekdays;
  if (t == y.Weekends) return module1367.CodeWeekends;
  t = module1367.ConvertArrayToRepeatNum(t.split(''));
  return t;
};

exports.isCustomMode = function (t) {
  return !!M[t];
};

exports.isTimerExpired = function (t, n, s) {
  var u = (s ? p[t] : C(t)) || t,
    c = module1365.default(n, 'YYYYMMDD HH:mm:ss');
  return u == y.Once && c.isBefore();
};

exports.isTimerExpiredByRepeatMode = function (t, n) {
  var s = module1365.default(n, 'YYYYMMDD HH:mm:ss');
  return t == y.Once && s.isBefore();
};

exports.getRepeatMode = S;
exports.getTextOfRepeatMode = k;

exports.getTextOfRepeatPattern = function (t, n, o) {
  return k(S(t, o), n);
};

exports.deleteServerTimer = function (t, o) {
  var module491, c;
  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            l.prev = 0;
            l.next = 3;
            return regeneratorRuntime.default.awrap(module407.default.deleteServerTimer(o));

          case 3:
            module491 = l.sent;
            console.log('RobotApi.deleteServerTimer -' + o + ' - ' + JSON.stringify(module491));
            l.next = 7;
            return regeneratorRuntime.default.awrap(module389.delServerTimer(t));

          case 7:
            c = l.sent;
            console.log('RRMISDK ' + (module389.isMiApp ? 'mi' : 'rr') + ' delServerTimer  - ' + JSON.stringify(c));
            l.next = 15;
            break;

          case 11:
            l.prev = 11;
            l.t0 = l.catch(0);
            console.log('RRMISDK ' + (module389.isMiApp ? 'mi' : 'rr') + ' error', t);
            console.log('RRMISDK ' + (module389.isMiApp ? 'mi' : 'rr') + ' error', l.t0);

          case 15:
          case 'end':
            return l.stop();
        }
    },
    null,
    null,
    [[0, 11]],
    Promise
  );
};

exports.addZeroPrefix = function (t) {
  var n = parseInt(t);
  return n < 10 ? '0' + n : n;
};

exports.fixTargetTime = function (t) {
  var n = new Date(),
    o = undefined === t.day ? t.dateofmonth : t.day;
  return {
    minute: -1 != t.minute ? t.minute : n.getMinutes(),
    hour: -1 != t.hour ? t.hour : n.getHours(),
    day: -1 != o ? o : n.getDate(),
    month: -1 != t.month ? t.month : n.getMonth() + 1,
  };
};

exports.convertToTargetTime = R;
exports.convertTimeFromSourceZoneToPhoneZone = W;
exports.convertTimeFromSourceZoneToPhoneZoneByTimestamp = D;

exports.convertToBeijingTime = function (t, n, o, s) {
  return R(t, n, o, s, 288e5);
};

exports.convertToPhoneTimeZoneTime = function (t, n, o, s) {
  return W(t, n, o, s, 288e5);
};

exports.utcTimeConvertToPhoneTimeZoneTime = function (t) {
  var n = new Date(t),
    o = n.getHours(),
    s = n.getMinutes(),
    u = n.getDate(),
    c = n.getMonth() + 1;
  return {
    minute: s,
    hour: o,
    day: u,
    month: c,
  };
};

exports.convetToWeekendsByStartTime = function (t, n, o) {
  var s = [0, 0, 0, 0, 0, 0, 0];

  if (t == y.Once) {
    var u = new Date(),
      c = u.getFullYear(),
      _ = u.getMonth() + 1;

    if (1 == n && 1 == o && 12 == _) c += 1;
    var l = new Date(Date.parse(c + '/' + o + '/' + n));
    s[l.getDay()] = 1;
  } else
    t == y.Everyday
      ? (s = [1, 1, 1, 1, 1, 1, 1])
      : t == y.Weekdays
      ? (s = [0, 1, 1, 1, 1, 1, 0])
      : t == y.Weekends
      ? (s = [1, 0, 0, 0, 0, 0, 1])
      : t.split('').forEach(function (t, n) {
          if (1 == t) s[n] = 1;
        });

  return s;
};

var regeneratorRuntime = require('regenerator-runtime'),
  module1365 = require('./1365'),
  module407 = require('./407'),
  module491 = require('./491').strings,
  module1367 = require('./1367'),
  module389 = require('./389'),
  module1366 = require('./1366'),
  module394 = require('./394').fill,
  T = function () {
    return [
      module491.localization_strings_Setting_Timer_Common_5,
      module491.localization_strings_Setting_Timer_Common_6,
      module491.localization_strings_Setting_Timer_Common_7,
      module491.localization_strings_Setting_Timer_Common_8,
      module491.localization_strings_Setting_Timer_Common_9,
      module491.localization_strings_Setting_Timer_Common_10,
      module491.localization_strings_Setting_Timer_Common_11,
    ];
  };

exports.Weeks = T;

exports.RepeatMenuItems = function () {
  return [
    module491.localization_strings_Setting_Timer_Common_0,
    module491.localization_strings_Setting_Timer_Common_1,
    module491.localization_strings_Setting_Timer_Common_2,
    module491.localization_strings_Setting_Timer_Common_3,
    module491.localization_strings_Setting_Timer_Common_4,
  ];
};

var y = {
  Once: 'Once',
  Everyday: 'Everyday',
  Weekdays: 'Weekdays',
  Weekends: 'Weekends',
};
exports.RepeatMode = y;
exports.RepeatIndexMap = {
  Once: 0,
  Everyday: 1,
  Weekdays: 2,
  Weekends: 3,
};
var v = {
  0: y.Once,
  1: y.Everyday,
  2: y.Weekdays,
  3: y.Weekends,
};
exports.IndexRepeatMap = v;
var p = {
    '0000000': y.Once,
    1111111: y.Everyday,
    1000001: y.Weekends,
    '0111110': y.Weekdays,
  },
  M = {
    Once: '0000000',
    Everyday: '1111111',
    Weekends: '1000001',
    Weekdays: '0111110',
  };

function h(t, n) {
  var o = M[t] || t,
    s = new Array(o.length);
  if ((module394(s, 0), 1 == n)) for (var u = 0; u < o.length; u++) 1 == o[u] && (u >= o.length - 1 ? (s[0] = 1) : (s[u + 1] = 1));
  else if (-1 == n) for (u = 0; u < o.length; u++) 1 == o[u] && (0 == u ? (s[o.length - 1] = 1) : (s[u - 1] = 1));
  else s = o;
  return s.join('');
}

function C(t) {
  switch (t) {
    case module1367.CodeOnce:
      return y.Once;

    case module1367.CodeEveryday:
      return y.Everyday;

    case module1367.CodeWeekdays:
      return y.Weekdays;

    case module1367.CodeWeekends:
      return y.Weekends;

    default:
      return t;
  }
}

function S(t, n) {
  var o = (n ? p[t] : C(t)) || t;
  if (!(t != o || n)) o = module1367.ConvertCustomRepeat(t).join('');
  return o;
}

function k(t, n) {
  if (t == y.Once) {
    module1365.default(n, 'YYYYMMDD');
    return module491.localization_strings_Setting_Timer_Common_0;
  }

  if (t == y.Everyday) return module491.localization_strings_Setting_Timer_Common_1;
  if (t == y.Weekends) return module491.localization_strings_Setting_Timer_Common_3;
  if (t == y.Weekdays) return module491.localization_strings_Setting_Timer_Common_2;
  var s = [];
  t.split('').forEach(function (t, n) {
    if (1 == t) s.push(T()[n]);
  });
  return s.join(' ');
}

function R(t, n, o, s, u) {
  var c = new Date(module1366.GenerateTimestamp(t, n, o, s)),
    _ = c.getTime(),
    f = 6e4 * c.getTimezoneOffset(),
    T = new Date(_ + f + u),
    y = T.getHours();

  return {
    minute: T.getMinutes(),
    hour: y,
    day: T.getDate(),
    month: T.getMonth() + 1,
  };
}

function W(t, n, o, s, u) {
  return D(new Date(module1366.GenerateTimestamp(t, n, o, s)).getTime(), u);
}

function D(t, n) {
  var o = t - n + -1 * new Date().getTimezoneOffset() * 6e4,
    s = new Date(o),
    u = s.getHours();
  return {
    minute: s.getMinutes(),
    hour: u,
    day: s.getDate(),
    month: s.getMonth() + 1,
    year: s.getFullYear(),
  };
}
