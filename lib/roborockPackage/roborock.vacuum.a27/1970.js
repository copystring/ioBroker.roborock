var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module1971 = require('./1971'),
  React = require('react'),
  module12 = require('./12'),
  module1972 = require('./1972'),
  module1973 = require('./1973'),
  PropTypes = require('prop-types'),
  module391 = require('./391'),
  module1121 = require('./1121');

function E() {
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

var b = (function (t) {
  module7.default(b, t);

  var s = b,
    PropTypes = E(),
    S = function () {
      var t,
        n = module11.default(s);

      if (PropTypes) {
        var o = module11.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module9.default(this, t);
    };

  function b(t) {
    var s;
    module4.default(this, b);
    (s = S.call(this, t)).timer = null;
    s.lastIndex = -1;
    s.sequence = '';
    s.isMoving = false;
    s.state = {
      circles: s.getCircles(),
      lines: [],
    };
    return s;
  }

  module5.default(b, [
    {
      key: 'componentDidMount',
      value: function () {
        var t = this;
        this.dimListener = module12.DeviceEventEmitter.addListener('ScreenHeightUpdate', function () {
          t.setState({
            circles: t.getCircles(),
          });
        });
      },
    },
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        var t;
        if (!(null == (t = this.dimListener))) t.remove();
      },
    },
    {
      key: 'UNSAFE_componentWillMount',
      value: function () {
        var t = this;
        this._panResponder = module12.PanResponder.create({
          onStartShouldSetPanResponder: function (t, s) {
            return true;
          },
          onStartShouldSetPanResponderCapture: function (t, s) {
            return true;
          },
          onMoveShouldSetPanResponder: function (t, s) {
            return true;
          },
          onMoveShouldSetPanResponderCapture: function (t, s) {
            return true;
          },
          onPanResponderGrant: function (s, n) {
            t.onStart(s, n);
          },
          onPanResponderMove: function (s, n) {
            t.onMove(s, n);
          },
          onPanResponderRelease: function (s, n) {
            t.onEnd(s, n);
          },
        });
      },
    },
    {
      key: 'getCircles',
      value: function () {
        for (var t = [], s = this.radius, n = 0; n < 9; n++) {
          var o = n % 3,
            l = parseInt(n / 3);
          t.push({
            isActive: false,
            x: o * (2 * this.radius + s) + s + this.radius,
            y: l * (2 * this.radius + s) + s + this.radius,
          });
        }

        return t;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          s = this.context.theme,
          o = 'wrong' === this.props.status,
          l = module12.Dimensions.get('window').height,
          u = o ? this.props.wrongColor : this.props.rightColor,
          c = l <= 564 && l / this.width <= 1.5,
          h = c ? 10 : 70,
          f = c ? 90 : 130;
        return React.default.createElement(
          module12.View,
          {
            style: [
              k.frame,
              {
                backgroundColor: s.monitor.backgroundColor,
              },
              this.props.style,
            ],
          },
          React.default.createElement(
            module12.View,
            {
              style: [
                k.message,
                {
                  top: h,
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              module22.default({}, module391.default.getAccessibilityLabel('gesture_password_title'), {
                style: [
                  k.title,
                  {
                    color: s.monitor.passwordTitle,
                  },
                ],
              }),
              this.props.title
            ),
            React.default.createElement(
              module12.Text,
              {
                style: [
                  k.msgText,
                  {
                    color: o ? '#eb0029' : s.monitor.passwordMsg,
                  },
                ],
              },
              this.state.message || this.props.message
            )
          ),
          React.default.createElement(
            module12.View,
            module22.default(
              {},
              module391.default.getAccessibilityLabel('gesturePassword'),
              {
                style: [
                  k.board,
                  {
                    width: this.width,
                    height: this.width,
                    top: f,
                    left: 0,
                  },
                ],
              },
              this._panResponder.panHandlers
            ),
            this.renderCircles(),
            this.renderLines(),
            React.default.createElement(module1972.default, {
              ref: function (s) {
                return (t.lineView = s);
              },
              color: u,
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
          s,
          n,
          o,
          l = [],
          u = this.props,
          c = u.status,
          h = u.normalColor,
          f = u.wrongColor,
          p = u.rightColor,
          y = u.innerCircle,
          x = u.outerCircle,
          w = this.radius;
        this.state.circles.forEach(function (u, S) {
          t = u.isActive;
          s = 'wrong' === c ? f : p;
          n = !!y;
          o = !!x;
          o = u.isActive;
          l.push(
            React.default.createElement(module1973.default, {
              funcId: 'circle' + S,
              key: 'c_' + S,
              fill: t,
              normalColor: h,
              color: s,
              x: u.x,
              y: u.y,
              r: w,
              inner: n,
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
          s = [],
          n = this.props,
          o = n.status,
          l = n.wrongColor,
          u = n.rightColor;
        this.state.lines.forEach(function (n, c) {
          t = 'wrong' === o ? l : u;
          s.push(
            React.default.createElement(module1972.default, {
              key: 'l_' + c,
              color: t,
              start: n.start,
              end: n.end,
            })
          );
        });
        return s;
      },
    },
    {
      key: 'setActive',
      value: function (t) {
        this.state.circles[t].isActive = true;
        var s = this.state.circles;
        this.setState({
          circles: s,
        });
      },
    },
    {
      key: 'resetActive',
      value: function () {
        this.state.lines = [];

        for (var t = 0; t < 9; t++) this.state.circles[t].isActive = false;

        var s = this.state.circles;
        this.setState({
          circles: s,
        });
        if (this.props.onReset) this.props.onReset();
      },
    },
    {
      key: 'getTouchChar',
      value: function (t) {
        for (var s = t.x, n = t.y, o = 0; o < 9; o++)
          if (
            module1971.isPointInCircle(
              {
                x: s,
                y: n,
              },
              this.state.circles[o],
              this.radius
            )
          )
            return String(o);

        return false;
      },
    },
    {
      key: 'getCrossChar',
      value: function (t) {
        var s = String(this.lastIndex);
        if ('13457'.indexOf(t) > -1 || '13457'.indexOf(s) > -1) return false;

        for (var n = module1971.getMiddlePoint(this.state.circles[s], this.state.circles[t]), o = 0; o < '13457'.length; o++) {
          var l = '13457'[o];
          if (module1971.isEquals(n, this.state.circles[l])) return String(l);
        }

        return false;
      },
    },
    {
      key: 'onStart',
      value: function (t, s) {
        var n = t.nativeEvent.pageX,
          o = t.nativeEvent.locationY;
        console.log('ee', t.nativeEvent);
        var l = this.getTouchChar({
          x: n,
          y: o,
        });

        if (l) {
          this.isMoving = true;
          this.lastIndex = Number(l);
          this.sequence = l;
          this.resetActive();
          this.setActive(this.lastIndex);
          var u = {
            x: this.state.circles[this.lastIndex].x,
            y: this.state.circles[this.lastIndex].y,
          };
          this.lineView.setNativeProps({
            start: u,
            end: u,
          });
          if (this.props.onStart) this.props.onStart();
          if (this.props.interval > 0) clearTimeout(this.timer);
        }
      },
    },
    {
      key: 'onMove',
      value: function (t, s) {
        var n = t.nativeEvent.pageX,
          o = t.nativeEvent.locationY;

        if (!(o < 1)) {
          if (this.isMoving) {
            this.lineView.setNativeProps({
              end: {
                x: n,
                y: o,
              },
            });
            var l = null;

            if (
              (module1971.isPointInCircle(
                {
                  x: n,
                  y: o,
                },
                this.state.circles[this.lastIndex],
                this.radius
              ) ||
                (l = this.getTouchChar({
                  x: n,
                  y: o,
                })),
              l && -1 === this.sequence.indexOf(l))
            ) {
              if (!this.props.allowCross) {
                var u = this.getCrossChar(l);

                if (u && -1 === this.sequence.indexOf(u)) {
                  this.sequence += u;
                  this.setActive(Number(u));
                }
              }

              var c = this.lastIndex,
                h = Number(l);
              this.state.lines.push({
                start: {
                  x: this.state.circles[c].x,
                  y: this.state.circles[c].y,
                },
                end: {
                  x: this.state.circles[h].x,
                  y: this.state.circles[h].y,
                },
              });
              this.lastIndex = Number(l);
              this.sequence += l;
              this.setActive(this.lastIndex);
              var v = {
                x: this.state.circles[this.lastIndex].x,
                y: this.state.circles[this.lastIndex].y,
              };
              this.lineView.setNativeProps({
                start: v,
              });
            }
          }

          if (9 === this.sequence.length) this.onEnd();
        }
      },
    },
    {
      key: 'onEnd',
      value: function (t, s) {
        var n = this;

        if (this.isMoving) {
          var o = module1971.getRealPassword(this.sequence);
          this.sequence = '';
          this.lastIndex = -1;
          this.isMoving = false;
          var l = {
            x: 0,
            y: 0,
          };
          this.lineView.setNativeProps({
            start: l,
            end: l,
          });
          if (this.props.onEnd) this.props.onEnd(o);
          if (this.props.interval > 0)
            this.timer = setTimeout(function () {
              return n.resetActive();
            }, this.props.interval);
        }
      },
    },
    {
      key: 'radius',
      get: function () {
        return module12.Dimensions.get('window').width / 10;
      },
    },
    {
      key: 'width',
      get: function () {
        return module12.Dimensions.get('window').width;
      },
    },
  ]);
  return b;
})(React.Component);

exports.default = b;
b.contextType = module1121.AppConfigContext;
b.propTypes = {
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
b.defaultProps = {
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
var k = module12.StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  board: {
    position: 'absolute',
    top: 130,
    transform: [
      {
        rotateY: module12.I18nManager.isRTL ? '180deg' : '0deg',
      },
    ],
  },
  message: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 70,
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
module.exports = b;
