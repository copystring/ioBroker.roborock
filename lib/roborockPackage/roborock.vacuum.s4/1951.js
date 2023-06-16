require('./387');

require('./390');

var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module1952 = S(require('./1952')),
  React = S(require('react')),
  module12 = require('./12'),
  module1953 = require('./1953'),
  module1954 = require('./1954'),
  PropTypes = require('prop-types'),
  module506 = require('./506');

function w(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    s = new WeakMap();
  return (w = function (t) {
    return t ? s : n;
  })(t);
}

function S(t, n) {
  if (!n && t && t.__esModule) return t;
  if (null === t || ('object' != typeof t && 'function' != typeof t))
    return {
      default: t,
    };
  var s = w(n);
  if (s && s.has(t)) return s.get(t);
  var o = {},
    l = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var c in t)
    if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
      var u = l ? Object.getOwnPropertyDescriptor(t, c) : null;
      if (u && (u.get || u.set)) Object.defineProperty(o, c, u);
      else o[c] = t[c];
    }

  o.default = t;
  if (s) s.set(t, o);
  return o;
}

function b() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

require('./936');

var P = module12.Dimensions.get('window').width,
  E = module12.Dimensions.get('window').height,
  R = P / 10,
  k = (function (t) {
    module7.default(S, t);

    var PropTypes = S,
      module506 = b(),
      w = function () {
        var t,
          n = module11.default(PropTypes);

        if (module506) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function S(t) {
      var n;
      module4.default(this, S);
      (n = w.call(this, t)).timer = null;
      n.lastIndex = -1;
      n.sequence = '';
      n.isMoving = false;

      for (var o = [], l = R, c = 0; c < 9; c++) {
        var u = c % 3,
          f = parseInt(c / 3);
        o.push({
          isActive: false,
          x: u * (2 * R + l) + l + R,
          y: f * (2 * R + l) + l + R,
        });
      }

      n.state = {
        circles: o,
        lines: [],
      };
      return n;
    }

    module5.default(S, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this._panResponder = module12.PanResponder.create({
            onStartShouldSetPanResponder: function (t, n) {
              return true;
            },
            onStartShouldSetPanResponderCapture: function (t, n) {
              return true;
            },
            onMoveShouldSetPanResponder: function (t, n) {
              return true;
            },
            onMoveShouldSetPanResponderCapture: function (t, n) {
              return true;
            },
            onPanResponderGrant: function (n, s) {
              t.onStart(n, s);
            },
            onPanResponderMove: function (n, s) {
              t.onMove(n, s);
            },
            onPanResponderRelease: function (n, s) {
              t.onEnd(n, s);
            },
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.context.theme,
            s = 'wrong' === this.props.status,
            o = s ? this.props.wrongColor : this.props.rightColor,
            l = E <= 564 && E / P <= 1.5,
            c = l ? 10 : 70,
            u = l ? 90 : 130;
          return React.default.createElement(
            module12.View,
            {
              style: [
                M.frame,
                {
                  backgroundColor: t.monitor.backgroundColor,
                },
                this.props.style,
                {
                  flex: 1,
                },
              ],
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  M.message,
                  {
                    top: c,
                  },
                ],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    M.title,
                    {
                      color: t.monitor.passwordTitle,
                    },
                  ],
                },
                this.props.title
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    M.msgText,
                    {
                      color: s ? '#eb0029' : t.monitor.passwordMsg,
                    },
                  ],
                },
                this.state.message || this.props.message
              )
            ),
            React.default.createElement(
              module12.View,
              module21.default(
                {
                  style: [
                    M.board,
                    {
                      top: u,
                    },
                  ],
                },
                this._panResponder.panHandlers
              ),
              this.renderCircles(),
              this.renderLines(),
              React.default.createElement(module1953.default, {
                ref: 'line',
                color: o,
              })
            ),
            this.props.children
          );
        },
      },
      {
        key: 'renderCircles',
        value: function () {
          var t,
            n,
            s,
            o,
            l = [],
            c = this.props,
            u = c.status,
            f = c.normalColor,
            p = c.wrongColor,
            v = c.rightColor,
            x = c.innerCircle,
            C = c.outerCircle;
          this.state.circles.forEach(function (c, w) {
            t = c.isActive;
            n = 'wrong' === u ? p : v;
            s = !!x;
            o = !!C;
            o = c.isActive;
            l.push(
              React.default.createElement(module1954.default, {
                key: 'c_' + w,
                fill: t,
                normalColor: f,
                color: n,
                x: c.x,
                y: c.y,
                r: R,
                inner: s,
                outer: o,
              })
            );
          });
          return l;
        },
      },
      {
        key: 'renderLines',
        value: function () {
          var t,
            n = [],
            s = this.props,
            o = s.status,
            l = s.wrongColor,
            c = s.rightColor;
          this.state.lines.forEach(function (s, u) {
            t = 'wrong' === o ? l : c;
            n.push(
              React.default.createElement(module1953.default, {
                key: 'l_' + u,
                color: t,
                start: s.start,
                end: s.end,
              })
            );
          });
          return n;
        },
      },
      {
        key: 'setActive',
        value: function (t) {
          this.state.circles[t].isActive = true;
          var n = this.state.circles;
          this.setState({
            circles: n,
          });
        },
      },
      {
        key: 'resetActive',
        value: function () {
          this.state.lines = [];

          for (var t = 0; t < 9; t++) this.state.circles[t].isActive = false;

          var n = this.state.circles;
          this.setState({
            circles: n,
          });
          if (this.props.onReset) this.props.onReset();
        },
      },
      {
        key: 'getTouchChar',
        value: function (t) {
          for (var n = t.x, s = t.y, o = 0; o < 9; o++)
            if (
              module1952.isPointInCircle(
                {
                  x: n,
                  y: s,
                },
                this.state.circles[o],
                R
              )
            )
              return String(o);

          return false;
        },
      },
      {
        key: 'getCrossChar',
        value: function (t) {
          var n = String(this.lastIndex);
          if ('13457'.indexOf(t) > -1 || '13457'.indexOf(n) > -1) return false;

          for (var s = module1952.getMiddlePoint(this.state.circles[n], this.state.circles[t]), o = 0; o < '13457'.length; o++) {
            var l = '13457'[o];
            if (module1952.isEquals(s, this.state.circles[l])) return String(l);
          }

          return false;
        },
      },
      {
        key: 'onStart',
        value: function (t, n) {
          var s = t.nativeEvent.pageX,
            o = t.nativeEvent.locationY;
          console.log('ee', t.nativeEvent);
          var l = this.getTouchChar({
            x: s,
            y: o,
          });

          if (l) {
            this.isMoving = true;
            this.lastIndex = Number(l);
            this.sequence = l;
            this.resetActive();
            this.setActive(this.lastIndex);
            var c = {
              x: this.state.circles[this.lastIndex].x,
              y: this.state.circles[this.lastIndex].y,
            };
            this.refs.line.setNativeProps({
              start: c,
              end: c,
            });
            if (this.props.onStart) this.props.onStart();
            if (this.props.interval > 0) clearTimeout(this.timer);
          }
        },
      },
      {
        key: 'onMove',
        value: function (t, n) {
          var s = t.nativeEvent.pageX,
            o = t.nativeEvent.locationY;

          if (!(o < 1)) {
            if (this.isMoving) {
              this.refs.line.setNativeProps({
                end: {
                  x: s,
                  y: o,
                },
              });
              var l = null;

              if (
                (module1952.isPointInCircle(
                  {
                    x: s,
                    y: o,
                  },
                  this.state.circles[this.lastIndex],
                  R
                ) ||
                  (l = this.getTouchChar({
                    x: s,
                    y: o,
                  })),
                l && -1 === this.sequence.indexOf(l))
              ) {
                if (!this.props.allowCross) {
                  var c = this.getCrossChar(l);

                  if (c && -1 === this.sequence.indexOf(c)) {
                    this.sequence += c;
                    this.setActive(Number(c));
                  }
                }

                var u = this.lastIndex,
                  h = Number(l);
                this.state.lines.push({
                  start: {
                    x: this.state.circles[u].x,
                    y: this.state.circles[u].y,
                  },
                  end: {
                    x: this.state.circles[h].x,
                    y: this.state.circles[h].y,
                  },
                });
                this.lastIndex = Number(l);
                this.sequence += l;
                this.setActive(this.lastIndex);
                var p = {
                  x: this.state.circles[this.lastIndex].x,
                  y: this.state.circles[this.lastIndex].y,
                };
                this.refs.line.setNativeProps({
                  start: p,
                });
              }
            }

            if (9 === this.sequence.length) this.onEnd();
          }
        },
      },
      {
        key: 'onEnd',
        value: function (t, n) {
          var s = this;

          if (this.isMoving) {
            var o = module1952.getRealPassword(this.sequence);
            this.sequence = '';
            this.lastIndex = -1;
            this.isMoving = false;
            var l = {
              x: 0,
              y: 0,
            };
            this.refs.line.setNativeProps({
              start: l,
              end: l,
            });
            if (this.props.onEnd) this.props.onEnd(o);
            if (this.props.interval > 0)
              this.timer = setTimeout(function () {
                return s.resetActive();
              }, this.props.interval);
          }
        },
      },
    ]);
    return S;
  })(React.Component);

exports.default = k;
k.contextType = module506.AppConfigContext;
k.propTypes = {
  message: PropTypes.default.string,
  normalColor: PropTypes.default.string,
  rightColor: PropTypes.default.string,
  wrongColor: PropTypes.default.string,
  status: PropTypes.default.oneOf(['right', 'wrong', 'normal']),
  onStart: PropTypes.default.func,
  onEnd: PropTypes.default.func,
  onReset: PropTypes.default.func,
  interval: PropTypes.default.number,
  allowCross: PropTypes.default.bool,
  innerCircle: PropTypes.default.bool,
  outerCircle: PropTypes.default.bool,
};
k.defaultProps = {
  message: '',
  normalColor: '#007AFF',
  rightColor: '#007AFF',
  wrongColor: '#D93609',
  status: 'normal',
  interval: 0,
  allowCross: false,
  innerCircle: true,
  outerCircle: false,
};
var M = module12.StyleSheet.create({
  frame: {
    backgroundColor: '#ffffff',
  },
  board: {
    position: 'absolute',
    left: 0,
    top: 130,
    width: P,
    height: P,
    transform: [
      {
        rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  message: {
    position: 'absolute',
    left: 0,
    top: 70,
    width: P,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'rgba(0,0,0,0.8)',
    marginHorizontal: 10,
  },
  msgText: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 14,
  },
});
module.exports = k;
