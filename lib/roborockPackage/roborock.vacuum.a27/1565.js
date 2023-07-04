exports.resolveRepeatModeByTargetTime = function (t, n, o, s, u) {
  var _ = t;
  if (s == n) u == o + 1 ? (_ = C(t, 1)) : u == o - 1 && (_ = C(t, -1));
  else _ = C(t, 1 == u ? 1 : -1);
  return _;
};

exports.getDaysArrByOffset = C;

exports.getLoopStringOfRepeatMode = function (t) {
  return M[t] || t;
};

exports.cronRepeatToTimerRepeat = h;

exports.timerRepeatToCronRepeat = function (t) {
  if (t == y.Once) return module1564.CodeOnce;
  if (t == y.Everyday) return module1564.CodeEveryday;
  if (t == y.Weekdays) return module1564.CodeWeekdays;
  if (t == y.Weekends) return module1564.CodeWeekends;
  t = module1564.ConvertArrayToRepeatNum(t.split(''));
  return t;
};

exports.isCustomMode = function (t) {
  return !!M[t];
};

exports.isTimerExpired = function (t, n, s) {
  var u = (s ? S[t] : h(t)) || t,
    _ = module1562.default(n, 'YYYYMMDD HH:mm:ss');

  return u == y.Once && _.isBefore();
};

exports.isTimerExpiredByRepeatMode = function (t, n) {
  var s = module1562.default(n, 'YYYYMMDD HH:mm:ss');
  return t == y.Once && s.isBefore();
};

exports.getRepeatMode = R;
exports.getTextOfRepeatMode = k;

exports.getTextOfRepeatPattern = function (t, n, o) {
  return k(R(t, o), n);
};

exports.deleteServerTimer = function (t, o) {
  var module505, _;

  return regeneratorRuntime.default.async(
    function (l) {
      for (;;)
        switch ((l.prev = l.next)) {
          case 0:
            l.prev = 0;
            l.next = 3;
            return regeneratorRuntime.default.awrap(module415.default.deleteServerTimer(o));

          case 3:
            module505 = l.sent;
            console.log('RobotApi.deleteServerTimer -' + o + ' - ' + JSON.stringify(module505));
            l.next = 7;
            return regeneratorRuntime.default.awrap(module393.delServerTimer(t));

          case 7:
            _ = l.sent;
            console.log('RRMISDK ' + (module393.isMiApp ? 'mi' : 'rr') + ' delServerTimer  - ' + JSON.stringify(_));
            l.next = 15;
            break;

          case 11:
            l.prev = 11;
            l.t0 = l.catch(0);
            console.log('RRMISDK ' + (module393.isMiApp ? 'mi' : 'rr') + ' error', t);
            console.log('RRMISDK ' + (module393.isMiApp ? 'mi' : 'rr') + ' error', l.t0);

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

exports.convertToTargetTime = W;
exports.convertTimeFromSourceZoneToPhoneZone = D;
exports.convertTimeFromSourceZoneToPhoneZoneByTimestamp = O;

exports.convertToBeijingTime = function (t, n, o, s) {
  return W(t, n, o, s, 288e5);
};

exports.convertToPhoneTimeZoneTime = function (t, n, o, s) {
  return D(t, n, o, s, 288e5);
};

exports.utcTimeConvertToPhoneTimeZoneTime = function (t) {
  var n = new Date(t),
    o = n.getHours(),
    s = n.getMinutes(),
    u = n.getDate(),
    _ = n.getMonth() + 1;

  return {
    minute: s,
    hour: o,
    day: u,
    month: _,
  };
};

exports.convetToWeekendsByStartTime = function (t, n, o) {
  var s = [0, 0, 0, 0, 0, 0, 0];

  if (t == y.Once) {
    var u = new Date(),
      _ = u.getFullYear(),
      c = u.getMonth() + 1;

    if (1 == n && 1 == o && 12 == c) _ += 1;
    var l = new Date(Date.parse(_ + '/' + o + '/' + n));
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
  module1562 = require('./1562'),
  module415 = require('./415'),
  module505 = require('./505').strings,
  module1564 = require('./1564'),
  module393 = require('./393'),
  module1563 = require('./1563'),
  module398 = require('./398').fill,
  T = function () {
    return [
      module505.localization_strings_Setting_Timer_Common_5,
      module505.localization_strings_Setting_Timer_Common_6,
      module505.localization_strings_Setting_Timer_Common_7,
      module505.localization_strings_Setting_Timer_Common_8,
      module505.localization_strings_Setting_Timer_Common_9,
      module505.localization_strings_Setting_Timer_Common_10,
      module505.localization_strings_Setting_Timer_Common_11,
    ];
  };

exports.Weeks = T;

exports.RepeatMenuItems = function () {
  return [
    module505.localization_strings_Setting_Timer_Common_0,
    module505.localization_strings_Setting_Timer_Common_1,
    module505.localization_strings_Setting_Timer_Common_2,
    module505.localization_strings_Setting_Timer_Common_3,
    module505.localization_strings_Setting_Timer_Common_4,
  ];
};

exports.SmartSceneRepeatMenuItems = function () {
  return [
    module505.localization_strings_Setting_Timer_Common_1,
    module505.localization_strings_Setting_Timer_Common_2,
    module505.localization_strings_Setting_Timer_Common_3,
    module505.localization_strings_Setting_Timer_Common_4,
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
var p = {
  0: y.Once,
  1: y.Everyday,
  2: y.Weekdays,
  3: y.Weekends,
};
exports.IndexRepeatMap = p;
var v = {
  0: y.Everyday,
  1: y.Weekdays,
  2: y.Weekends,
};
exports.SmartSceneIndexRepeatMap = v;
var S = {
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

function C(t, n) {
  var o = M[t] || t,
    s = new Array(o.length);
  if ((module398(s, 0), 1 == n)) for (var u = 0; u < o.length; u++) 1 == o[u] && (u >= o.length - 1 ? (s[0] = 1) : (s[u + 1] = 1));
  else if (-1 == n) for (u = 0; u < o.length; u++) 1 == o[u] && (0 == u ? (s[o.length - 1] = 1) : (s[u - 1] = 1));
  else s = o;
  return s.join('');
}

function h(t) {
  switch (t) {
    case module1564.CodeOnce:
      return y.Once;

    case module1564.CodeEveryday:
      return y.Everyday;

    case module1564.CodeWeekdays:
      return y.Weekdays;

    case module1564.CodeWeekends:
      return y.Weekends;

    default:
      return t;
  }
}

function R(t, n) {
  var o = (n ? S[t] : h(t)) || t;
  if (!(t != o || n)) o = module1564.ConvertCustomRepeat(t).join('');
  return o;
}

function k(t, n) {
  if (t == y.Once) {
    module1562.default(n, 'YYYYMMDD');
    return module505.localization_strings_Setting_Timer_Common_0;
  }

  if (t == y.Everyday) return module505.localization_strings_Setting_Timer_Common_1;
  if (t == y.Weekends) return module505.localization_strings_Setting_Timer_Common_3;
  if (t == y.Weekdays) return module505.localization_strings_Setting_Timer_Common_2;
  var s = [];
  t.split('').forEach(function (t, n) {
    if (1 == t) s.push(T()[n]);
  });
  return s.join(' ');
}

function W(t, n, o, s, u) {
  var _ = new Date(module1563.GenerateTimestamp(t, n, o, s)),
    c = _.getTime(),
    f = 6e4 * _.getTimezoneOffset(),
    T = new Date(c + f + u),
    y = T.getHours();

  return {
    minute: T.getMinutes(),
    hour: y,
    day: T.getDate(),
    month: T.getMonth() + 1,
  };
}

function D(t, n, o, s, u) {
  return O(new Date(module1563.GenerateTimestamp(t, n, o, s)).getTime(), u);
}

function O(t, n) {
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
