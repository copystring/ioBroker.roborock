require(d[11]);

var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1514 = require('./1514'),
  module1602 = require('./1602'),
  module1606 = require('./1606');

function M(t, n) {
  var u = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    if (n)
      o = o.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    u.push.apply(u, o);
  }

  return u;
}

function y(t) {
  for (var u = 1; u < arguments.length; u++) {
    var o = null != arguments[u] ? arguments[u] : {};
    if (u % 2)
      M(Object(o), true).forEach(function (u) {
        module50.default(t, u, o[u]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(o));
    else
      M(Object(o)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(o, n));
      });
  }

  return t;
}

function k() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

function x(t) {
  return new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
}

function b(t) {
  return t < 10 ? '0' + t : t + '';
}

function H(t) {
  return new Date(+t);
}

var C = 'datetime',
  P = 'date',
  w = 'time',
  O = 'month',
  Y = 'year',
  S = (function (t, ...args) {
    module9.default(S, t);

    var module50 = S,
      module1606 = k(),
      M = function () {
        var t,
          u = module12.default(module50);

        if (module1606) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(u, arguments, o);
        } else t = u.apply(this, arguments);

        return module11.default(this, t);
      };

    function S() {
      var t;
      module6.default(this, S);
      (t = M.call(this, ...args)).state = {
        date: t.props.date || t.props.defaultDate,
      };

      t.getNewDate = function (n, u) {
        var o,
          s,
          l = parseInt(n[u], 10),
          c = t.props.mode,
          f = H(t.getDate());
        if (c === C || c === P || c === Y || c === O)
          switch (u) {
            case 0:
              f.setFullYear(l);
              break;

            case 1:
              s = l;
              (o = f).setDate(o.getDate() ** x(new Date(o.getFullYear(), s)));
              o.setMonth(s);
              break;

            case 2:
              f.setDate(l);
              break;

            case 3:
              t.setHours(f, l);
              break;

            case 4:
              f.setMinutes(l);
              break;

            case 5:
              t.setAmPm(f, l);
          }
        else if (c === w)
          switch (u) {
            case 0:
              t.setHours(f, l);
              break;

            case 1:
              f.setMinutes(l);
              break;

            case 2:
              t.setAmPm(f, l);
          }
        return t.clipDate(f);
      };

      t.onValueChange = function (n, u) {
        var o = t.props,
          s = t.getNewDate(n, u);
        if (!('date' in o))
          t.setState({
            date: s,
          });
        if (o.onDateChange) o.onDateChange(s);
        if (o.onValueChange) o.onValueChange(n, u);
      };

      t.onScrollChange = function (n, u) {
        var o = t.props;

        if (o.onScrollChange) {
          var s = t.getNewDate(n, u);
          o.onScrollChange(s, n, u);
        }
      };

      return t;
    }

    module7.default(S, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          if ('date' in t)
            this.setState({
              date: t.date || t.defaultDate,
            });
        },
      },
      {
        key: 'setHours',
        value: function (t, n) {
          if (this.props.use12Hours) {
            var u = n;
            u = (u = t.getHours() >= 12 ? n + 12 : n) >= 24 ? 0 : u;
            t.setHours(u);
          } else t.setHours(n);
        },
      },
      {
        key: 'setAmPm',
        value: function (t, n) {
          if (0 === n) t.setTime(+t - 432e5);
          else t.setTime(+t + 432e5);
        },
      },
      {
        key: 'getDefaultMinDate',
        value: function () {
          if (!this.defaultMinDate) this.defaultMinDate = new Date(2e3, 1, 1, 0, 0, 0);
          return this.defaultMinDate;
        },
      },
      {
        key: 'getDefaultMaxDate',
        value: function () {
          if (!this.defaultMaxDate) this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
          return this.defaultMaxDate;
        },
      },
      {
        key: 'getDate',
        value: function () {
          return this.clipDate(this.state.date || this.getDefaultMinDate());
        },
      },
      {
        key: 'getValue',
        value: function () {
          return this.getDate();
        },
      },
      {
        key: 'getMinYear',
        value: function () {
          return this.getMinDate().getFullYear();
        },
      },
      {
        key: 'getMaxYear',
        value: function () {
          return this.getMaxDate().getFullYear();
        },
      },
      {
        key: 'getMinMonth',
        value: function () {
          return this.getMinDate().getMonth();
        },
      },
      {
        key: 'getMaxMonth',
        value: function () {
          return this.getMaxDate().getMonth();
        },
      },
      {
        key: 'getMinDay',
        value: function () {
          return this.getMinDate().getDate();
        },
      },
      {
        key: 'getMaxDay',
        value: function () {
          return this.getMaxDate().getDate();
        },
      },
      {
        key: 'getMinHour',
        value: function () {
          return this.getMinDate().getHours();
        },
      },
      {
        key: 'getMaxHour',
        value: function () {
          return this.getMaxDate().getHours();
        },
      },
      {
        key: 'getMinMinute',
        value: function () {
          return this.getMinDate().getMinutes();
        },
      },
      {
        key: 'getMaxMinute',
        value: function () {
          return this.getMaxDate().getMinutes();
        },
      },
      {
        key: 'getMinDate',
        value: function () {
          return this.props.minDate || this.getDefaultMinDate();
        },
      },
      {
        key: 'getMaxDate',
        value: function () {
          return this.props.maxDate || this.getDefaultMaxDate();
        },
      },
      {
        key: 'getDateData',
        value: function () {
          for (
            var t = this.props,
              n = t.locale,
              u = t.formatMonth,
              o = t.formatDay,
              s = t.mode,
              l = this.getDate(),
              c = l.getFullYear(),
              f = l.getMonth(),
              h = this.getMinYear(),
              p = this.getMaxYear(),
              v = this.getMinMonth(),
              D = this.getMaxMonth(),
              M = this.getMinDay(),
              y = this.getMaxDay(),
              k = [],
              b = h;
            b <= p;
            b++
          )
            k.push({
              value: b + '',
              label: b + n.year + '',
            });

          var H = {
            key: 'year',
            props: {
              children: k,
            },
          };
          if (s === Y) return [H];
          var C = [],
            P = 0,
            w = 11;
          if (h === c) P = v;
          if (p === c) w = D;

          for (var S = P; S <= w; S++) {
            var j = u ? u(S, l) : S + 1 + n.month + '';
            C.push({
              value: S + '',
              label: j,
            });
          }

          var F = {
            key: 'month',
            props: {
              children: C,
            },
          };
          if (s === O) return [H, F];
          var V = [],
            N = 1,
            R = x(l);
          if (h === c && v === f) N = M;
          if (p === c && D === f) R = y;

          for (var E = N; E <= R; E++) {
            var T = o ? o(E, l) : E + n.day + '';
            V.push({
              value: E + '',
              label: T,
            });
          }

          return [
            H,
            F,
            {
              key: 'day',
              props: {
                children: V,
              },
            },
          ];
        },
      },
      {
        key: 'getDisplayHour',
        value: function (t) {
          if (this.props.use12Hours) {
            if (0 === t) t = 12;
            if (t > 12) t -= 12;
            return t;
          } else return t;
        },
      },
      {
        key: 'getTimeData',
        value: function (t) {
          var n = this.props,
            u = n.minHour,
            o = undefined === u ? 0 : u,
            s = n.maxHour,
            l = undefined === s ? 23 : s,
            c = n.minMinute,
            f = undefined === c ? 0 : c,
            h = n.maxMinute,
            p = undefined === h ? 59 : h,
            v = this.props,
            D = v.mode,
            M = v.locale,
            y = v.minuteStep,
            k = v.use12Hours,
            x = this.getMinMinute(),
            H = this.getMaxMinute(),
            P = this.getMinHour(),
            w = this.getMaxHour(),
            O = t.getHours();

          if (D === C) {
            var Y = t.getFullYear(),
              S = t.getMonth(),
              j = t.getDate(),
              F = this.getMinYear(),
              V = this.getMaxYear(),
              N = this.getMinMonth(),
              R = this.getMaxMonth(),
              E = this.getMinDay(),
              T = this.getMaxDay();

            if (F === Y && N === S && E === j) {
              o = P;
              if (P === O) f = x;
            }

            if (V === Y && R === S && T === j) {
              l = w;
              if (w === O) p = H;
            }
          } else {
            o = P;
            if (P === O) f = x;
            l = w;
            if (w === O) p = H;
          }

          var A = [];
          if ((0 === o && 0 === l) || (0 !== o && 0 !== l)) o = this.getDisplayHour(o);
          else if (0 === o && k) {
            o = 1;
            A.push({
              value: '0',
              label: M.hour ? '12' + M.hour : '12',
            });
          }
          l = this.getDisplayHour(l);

          for (var I = o; I <= l; I++)
            A.push({
              value: I + '',
              label: M.hour ? I + M.hour + '' : b(I),
            });

          for (var _ = [], B = t.getMinutes(), L = f; L <= p; L += y) {
            _.push({
              value: L + '',
              label: M.minute ? L + M.minute + '' : b(L),
            });

            if (B > L && B < L + y)
              _.push({
                value: B + '',
                label: M.minute ? B + M.minute + '' : b(B),
              });
          }

          return {
            cols: [
              {
                key: 'hours',
                props: {
                  children: A,
                },
              },
              {
                key: 'minutes',
                props: {
                  children: _,
                },
              },
            ].concat(
              k
                ? [
                    {
                      key: 'ampm',
                      props: {
                        children: [
                          {
                            value: '0',
                            label: M.am,
                          },
                          {
                            value: '1',
                            label: M.pm,
                          },
                        ],
                      },
                    },
                  ]
                : []
            ),
            selMinute: B,
          };
        },
      },
      {
        key: 'clipDate',
        value: function (t) {
          var n = this.props.mode,
            u = this.getMinDate(),
            o = this.getMaxDate();

          if (n === C) {
            if (t < u) return H(u);
            if (t > o) return H(o);
          } else if (n === P || n === Y || n === O) {
            if (+t + 864e5 <= u) return H(u);
            if (t >= +o + 864e5) return H(o);
          } else if (n === w) {
            var s = o.getHours(),
              l = o.getMinutes(),
              c = u.getHours(),
              f = u.getMinutes(),
              h = t.getHours(),
              p = t.getMinutes();
            if (h < c || (h === c && p < f)) return H(u);
            if (h > s || (h === s && p > l)) return H(o);
          }

          return t;
        },
      },
      {
        key: 'getValueCols',
        value: function () {
          var t = this.props,
            n = t.mode,
            u = t.use12Hours,
            o = this.getDate(),
            s = [],
            l = [];
          if (n === Y)
            return {
              cols: this.getDateData(),
              value: [o.getFullYear() + ''],
            };
          if (n === O)
            return {
              cols: this.getDateData(),
              value: [o.getFullYear() + '', o.getMonth() + ''],
            };

          if (((n !== C && n !== P) || ((s = this.getDateData()), (l = [o.getFullYear() + '', o.getMonth() + '', o.getDate() + ''])), n === C || n === w)) {
            var c = this.getTimeData(o);
            s = s.concat(c.cols);
            var f = o.getHours(),
              h = [f + '', c.selMinute + ''];
            if (u) h = [(f > 12 ? f - 12 : f) + '', c.selMinute + '', (f >= 12 ? 1 : 0) + ''];
            l = l.concat(h);
          }

          return {
            value: l,
            cols: s,
          };
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.getValueCols(),
            u = n.value,
            o = n.cols,
            s = this.props,
            l = s.disabled,
            c = s.pickerPrefixCls,
            D = s.prefixCls,
            M = s.rootNativeProps,
            k = s.className,
            x = s.style,
            b = s.itemStyle,
            H = y(
              {
                flexDirection: 'row',
                alignItems: 'center',
                transform: [
                  {
                    rotateZ: module13.I18nManager.isRTL ? '-180deg' : '0deg',
                  },
                ],
              },
              x
            );
          return React.default.createElement(
            module1514.default,
            {
              style: H,
              rootNativeProps: M,
              className: k,
              prefixCls: D,
              selectedValue: u,
              onValueChange: this.onValueChange,
              onScrollChange: this.onScrollChange,
            },
            o.map(function (n, u) {
              return React.default.createElement(
                module1602.default,
                {
                  style: {
                    flex: 1,
                  },
                  key: n.key,
                  disabled: l,
                  prefixCls: c,
                  itemStyle: [
                    b,
                    {
                      color: t.props.itemColor,
                      transform: [
                        {
                          rotateZ: module13.I18nManager.isRTL ? '-180deg' : '0deg',
                        },
                      ],
                    },
                  ],
                  selectedBackgroundColor: t.props.selectedBackgroundColor,
                },
                n.props.children.map(function (t) {
                  return React.default.createElement(
                    module1602.default.Item,
                    {
                      key: t.value,
                      value: t.value,
                    },
                    t.label
                  );
                })
              );
            })
          );
        },
      },
    ]);
    return S;
  })(React.default.Component);

S.defaultProps = {
  prefixCls: 'rmc-date-picker',
  pickerPrefixCls: 'rmc-picker',
  locale: module1606.default,
  mode: P,
  disabled: false,
  minuteStep: 1,
  onDateChange: function () {},
  use12Hours: false,
};
var j = S;
exports.default = j;
