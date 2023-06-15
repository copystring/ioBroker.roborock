var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module423 = require('./423'),
  module1057 = require('./1057'),
  module1121 = require('./1121'),
  module1333 = require('./1333'),
  module390 = require('./390');

function x(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function A(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      x(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      x(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function b(t) {
  var n = D();
  return function () {
    var o,
      s = module11.default(t);

    if (n) {
      var h = module11.default(this).constructor;
      o = Reflect.construct(s, arguments, h);
    } else o = s.apply(this, arguments);

    return module9.default(this, o);
  };
}

function D() {
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

module12.ART.Shape;

var React = require('react'),
  module1334 = require('./1334'),
  module1336 = require('./1336'),
  w = module1336.RRSurface,
  k = module1336.isRRSurface,
  module1261 = require('./1261'),
  module1337 = require('./1337').Palette,
  M = module12.ART.Transform,
  T = 100,
  V = (function (t) {
    module7.default(l, t);
    var n = b(l);

    function l() {
      module4.default(this, l);
      return n.apply(this, arguments);
    }

    module5.default(l, [
      {
        key: 'getCleanPath',
        value: function (t, n, o) {
          module4 = null == (s = this.props) ? undefined : s.transform;
          var s,
            h,
            l,
            p,
            c,
            f,
            v = module390.default.isMopPathSupported() && this.props.pathData && this.props.pathData.mopData,
            x =
              'android' != module12.Platform.OS || k
                ? {
                    xx: 1,
                    yy: 1,
                  }
                : module4,
            A = {
              path: '',
            };

          if (null == (h = this.props) ? undefined : null == (l = h.pathData) ? undefined : null == (p = l.points) ? undefined : p.length) {
            var b,
              D,
              R,
              I,
              M,
              T,
              V = ('android' != module12.Platform.OS || k) && v ? (null == (b = this.props) ? undefined : null == (D = b.pathData) ? undefined : D.mopData) : null;
            A = module1261._parsePath(
              null == (R = this.props) ? undefined : null == (I = R.pathData) ? undefined : I.points,
              null == (M = this.props) ? undefined : null == (T = M.pathData) ? undefined : T.offset,
              V,
              false,
              x
            );
          }

          var j,
            N,
            W,
            G,
            F = {
              mopPath: '',
            };
          if (v)
            F = module1261._parseMopPath(
              null == (j = this.props) ? undefined : null == (N = j.pathData) ? undefined : N.points,
              null == (W = this.props) ? undefined : null == (G = W.pathData) ? undefined : G.offset,
              this.props.pathData.mopData,
              x
            );

          var U,
            _,
            L,
            z,
            B = {
              backWashPath: '',
            };

          if (v)
            B = module1261._parseBackWashPath(
              null == (U = this.props) ? undefined : null == (_ = U.pathData) ? undefined : _.points,
              null == (L = this.props) ? undefined : null == (z = L.pathData) ? undefined : z.offset,
              this.props.pathData.mopData,
              x
            );
          var Z = {
            pathGotoPlan: '',
          };

          if (null == (c = this.props) ? undefined : null == (f = c.pathData) ? undefined : f.planPoints) {
            var q,
              H,
              J = module1261._parseGotoPlanPath(this.props.pathData.planPoints, null == (q = this.props) ? undefined : null == (H = q.pathData) ? undefined : H.offset, x);

            Z.pathGotoPlan = J.path;
          }

          var K = null;
          if ('' != Z.pathGotoPlan)
            K = (
              <module1333.RRShape
                transform={'android' != module12.Platform.OS || k ? module4 : null}
                stroke={module1337.map.pathGotoPlan}
                strokeWidth={1}
                strokeDash={'android' == module12.Platform.OS ? [5, 10] : [2, 2]}
                d={Z.pathGotoPlan}
              />
            );
          var Q = null;
          if (A && '' != A.path)
            Q = <module1333.RRShape transform={'android' != module12.Platform.OS || k ? module4 : null} stroke={this.context.theme.map.pathColor} strokeWidth={0.5} d={A.path} />;
          var X = null;
          if (F && '' != F.mopPath)
            X = (
              <module1333.RRShape
                transform={'android' != module12.Platform.OS || k ? module4 : null}
                stroke={this.context.theme.map.mopPathColor}
                strokeWidth={6.5}
                strokeOverlay
                d={F.mopPath}
              />
            );
          var Y = null;
          if (B && '' != B.backWashPath)
            Y = (
              <module1333.RRShape
                transform={'android' != module12.Platform.OS || k ? module4 : null}
                stroke={this.context.theme.map.backWashPathColor}
                strokeWidth={0.5}
                strokeDash={'android' == module12.Platform.OS ? [4, 8] : [1.5, 1.5]}
                d={B.backWashPath}
              />
            );
          return (
            <w width={this.props.width} height={this.props.height} style={C.pathContainer}>
              {K}
              {X}
              {Q}
              {Y}
            </w>
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.getCleanPath(this.props.width, this.props.height, this.props.transform);
          return (
            <module12.View
              pointerEvents="none"
              style={{
                left: 0,
                top: 0,
                width: this.props.width,
                height: this.props.height,
              }}
            >
              {t}
            </module12.View>
          );
        },
      },
    ]);
    return l;
  })(React.Component);

exports.AnimatedPath = V;
V.contextType = module1121.AppConfigContext;
V.defaultProps = {
  transform: new M(),
  pathData: {},
  width: 0,
  height: 0,
};

var j = (function (t) {
  module7.default(l, t);
  var n = b(l);

  function l(t) {
    var s;
    module4.default(this, l);
    (s = n.call(this, t)).state = {
      animatedValue: new module12.Animated.Value(0),
    };
    s.currentIndex = 0;
    s.pathPoints = [];
    s.speed = T;
    s.status = module1057.RobotAnimationStatus.DEFAULT;
    return s;
  }

  module5.default(l, [
    {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function (t) {
        if (t.pathPoints.length) {
          if (this.pathPoints.length < 1) this.currentIndex = t.pathPoints.length - 1;
          this.pathPoints = t.pathPoints;
        }
      },
    },
    {
      key: 'componentWillMount',
      value: function () {},
    },
    {
      key: 'componentDidMount',
      value: function () {
        if (this.props.autoAnimated) this.reset();
      },
    },
    {
      key: 'render',
      value: function () {
        var t, n, o;
        if (this.pathPoints.length < 1) return <module12.View />;
        if (undefined === this.pathPoints[this.currentIndex]) return <module12.View />;
        var s,
          h,
          l,
          p,
          f,
          v,
          P,
          y,
          x,
          b,
          D = module423.DMM.robotInMap.image,
          I = new M({
            xx: this.props.transform.xx,
            yy: this.props.transform.yy,
          }),
          w = this.pathPoints[this.currentIndex].x * I.xx - 5.4 * I.xx,
          k = this.pathPoints[this.currentIndex].y * I.yy - 5.4 * I.yy,
          O = this.pathPoints.length > this.currentIndex + 1 ? this.pathPoints[this.currentIndex + 1].x * I.xx - 5.4 * I.xx : w,
          E = this.pathPoints.length > this.currentIndex + 1 ? this.pathPoints[this.currentIndex + 1].y * I.yy - 5.4 * I.yy : k,
          T = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [w, O],
          }),
          j = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [k, E],
          }),
          C = A({}, this.props.pathData);

        if (null == (t = this.props) ? undefined : null == (n = t.pathData) ? undefined : null == (o = n.points) ? undefined : o.length) {
          C.points = null == C ? undefined : null == (s = C.points) ? undefined : null == s.slice ? undefined : s.slice(0, this.currentIndex + 1);
          C.mopData = null == C ? undefined : null == (h = C.mopData) ? undefined : null == h.slice ? undefined : h.slice(0, this.currentIndex + 1);
        }

        if (this.pathPoints.length <= this.currentIndex + 1) {
          w = null == (l = this.pathPoints) ? undefined : null == (p = l[this.currentIndex - 1]) ? undefined : p.x;
          k = null == (f = this.pathPoints) ? undefined : null == (v = f[this.currentIndex - 1]) ? undefined : v.y;
          O = null == (P = this.pathPoints) ? undefined : null == (y = P[this.currentIndex]) ? undefined : y.x;
          E = null == (x = this.pathPoints) ? undefined : null == (b = x[this.currentIndex]) ? undefined : b.y;
        }

        var N = (180 * (E - k) ** (O - w)) / Math.PI;
        if (isNaN(N)) N = 0;
        N += 'deg';
        return (
          <module12.View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: this.props.width,
              height: this.props.height,
            }}
          >
            {this.props.showPath && <V pathData={C} transform={I} width={this.props.width} height={this.props.height} />}
            {React.createElement(
              module12.Animated.View,
              {
                style: {
                  position: 'absolute',
                  overflow: 'visible',
                  left: T,
                  top: j,
                  transform: [
                    {
                      rotateZ: N,
                    },
                  ],
                },
              },
              React.createElement(module1334, {
                resizeMethod: 'scale',
                source: D,
                style: {
                  width: 10.8 * I.xx,
                  height: 10.8 * I.yy,
                },
              })
            )}
          </module12.View>
        );
      },
    },
    {
      key: 'getRobotAngle',
      value: function () {
        for (var t = '0deg', n = '0deg', o = 0; o < this.robotAngleMap.length; o++)
          this.robotAngleMap[o] &&
            this.robotAngleMap[o].point.x == this.pathPoints[this.currentIndex].x &&
            this.robotAngleMap[o].point.y == this.pathPoints[this.currentIndex].y &&
            ((t = -1 * this.robotAngleMap[o].angle + 'deg'),
            (n = -1 * this.robotAngleMap[o].angle + 'deg'),
            this.robotAngleMap[o + 1] && (n = -1 * this.robotAngleMap[o + 1].angle + 'deg'));

        return [t, n];
      },
    },
    {
      key: 'reset',
      value: function (t) {
        if (t) this.currentIndex = 0;
        this.wait();
      },
    },
    {
      key: 'next',
      value: function () {
        if (this.currentIndex > this.pathPoints.length - 1) this.reset();
        else if (this.status != module1057.RobotAnimationStatus.PAUSED) {
          if (this.status != module1057.RobotAnimationStatus.DEFAULT || this.props.autoAnimated)
            if (this.pathPoints.length > this.currentIndex + 1) {
              this.pathPoints.length;
              this.currentIndex;
              this.run();
            } else {
              if (this.status == module1057.RobotAnimationStatus.ANIMATING && !this.props.autoAnimated) {
                this.status = module1057.RobotAnimationStatus.DEFAULT;
                return void (this.props.onPlayFinished && this.props.onPlayFinished());
              }

              this.wait();
            }
        } else this.wait();
      },
    },
    {
      key: 'run',
      value: function () {
        var t = this;
        module12.Animated.timing(this.state.animatedValue, {
          toValue: 1,
          duration: this.speed,
        }).start(function () {
          if (t.currentIndex < t.pathPoints.length - 1) t.currentIndex = t.currentIndex + 1;
          t.setState(
            {
              animatedValue: new module12.Animated.Value(0),
            },
            function () {
              t.next();
            }
          );
        });
      },
    },
    {
      key: 'wait',
      value: function () {
        var t = this;
        module12.Animated.delay(100).start(function () {
          t.next();
        });
      },
    },
    {
      key: 'pause',
      value: function () {
        if (this.status == module1057.RobotAnimationStatus.ANIMATING) this.status = module1057.RobotAnimationStatus.PAUSED;
      },
    },
    {
      key: 'play',
      value: function () {
        if (this.status == module1057.RobotAnimationStatus.PAUSED) this.status = module1057.RobotAnimationStatus.ANIMATING;

        if (this.status == module1057.RobotAnimationStatus.DEFAULT) {
          this.reset(true);
          this.status = module1057.RobotAnimationStatus.ANIMATING;
        }
      },
    },
    {
      key: 'stop',
      value: function () {
        if (this.pathPoints.length) this.currentIndex = this.pathPoints.length - 1;
        if (this.props.autoAnimated) this.wait();
        this.status = module1057.RobotAnimationStatus.DEFAULT;
      },
    },
    {
      key: 'setSpeed',
      value: function (t) {
        var n = t;
        if (n < 1) n = 1;
        if (n > 10) n = 10;
        this.speed = T / n;
      },
    },
  ]);
  return l;
})(React.Component);

exports.AnimatedRobot = j;
j.defaultProps = {
  autoAnimated: false,
  onPlayFinished: function () {},
};
var C = module12.StyleSheet.create({
  pathContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
