var module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module13 = require('./13'),
  module424 = require('./424'),
  module1127 = require('./1127'),
  module1200 = require('./1200'),
  module1414 = require('./1414'),
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
  var n = S();
  return function () {
    var o,
      s = module12.default(t);

    if (n) {
      var h = module12.default(this).constructor;
      o = Reflect.construct(s, arguments, h);
    } else o = s.apply(this, arguments);

    return module11.default(this, o);
  };
}

function S() {
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

module13.ART.Shape;

var React = require('react'),
  module1415 = require('./1415'),
  module1417 = require('./1417'),
  w = module1417.RRSurface,
  k = module1417.isRRSurface,
  module1340 = require('./1340'),
  module1418 = require('./1418').Palette,
  M = module13.ART.Transform,
  C = 100,
  T = (function (t) {
    module9.default(l, t);
    var n = b(l);

    function l() {
      module6.default(this, l);
      return n.apply(this, arguments);
    }

    module7.default(l, [
      {
        key: 'getCleanPath',
        value: function (t, n, o) {
          module6 = null == (s = this.props) ? undefined : s.transform;
          var s,
            h,
            l,
            p,
            c,
            f,
            v,
            x,
            A,
            b,
            S = (module390.default.isMopPathSupported() || module390.default.isGotoPureCleanPathSupported()) && this.props.pathData && this.props.pathData.mopData,
            D = module390.default.isGotoPureCleanPathSupported(),
            I = module390.default.isShowPureMopPath(),
            M =
              'android' != module13.Platform.OS || k
                ? {
                    xx: 1,
                    yy: 1,
                  }
                : module6,
            C = {
              path: '',
            };

          if (null == (h = this.props) ? undefined : null == (l = h.pathData) ? undefined : null == (p = l.points) ? undefined : p.length) {
            var T,
              V,
              G,
              N,
              W,
              F,
              U = S ? (null == (T = this.props) ? undefined : null == (V = T.pathData) ? undefined : V.mopData) : null;
            C = module1340._parsePath(
              null == (G = this.props) ? undefined : null == (N = G.pathData) ? undefined : N.points,
              null == (W = this.props) ? undefined : null == (F = W.pathData) ? undefined : F.offset,
              U,
              M,
              D,
              I
            );
          }

          var _ = S
              ? module1340._parseMopPath(
                  null == (c = this.props) ? undefined : null == (f = c.pathData) ? undefined : f.points,
                  null == (v = this.props) ? undefined : null == (x = v.pathData) ? undefined : x.offset,
                  this.props.pathData.mopData,
                  M
                )
              : {
                  mopPath: '',
                },
            L = {
              pathGotoPlan: '',
            };

          if (null == (A = this.props) ? undefined : null == (b = A.pathData) ? undefined : b.planPoints) {
            var z,
              Z,
              q = module1340._parseGotoPlanPath(this.props.pathData.planPoints, null == (z = this.props) ? undefined : null == (Z = z.pathData) ? undefined : Z.offset, M);

            L.pathGotoPlan = q.path;
          }

          var B = null;
          if ('' != L.pathGotoPlan)
            B = (
              <module1414.RRShape
                transform={'android' != module13.Platform.OS || k ? module6 : null}
                stroke={module1418.map.pathGotoPlan}
                strokeWidth={1}
                strokeDash={'android' == module13.Platform.OS ? [5, 10] : [2, 2]}
                d={L.pathGotoPlan}
              />
            );
          var H = null;
          if (C && '' != C.path)
            H = <module1414.RRShape transform={'android' != module13.Platform.OS || k ? module6 : null} stroke={this.context.theme.map.pathColor} strokeWidth={0.5} d={C.path} />;
          var J = null;
          if (_ && '' != _.mopPath)
            J = (
              <module1414.RRShape
                transform={'android' != module13.Platform.OS || k ? module6 : null}
                stroke={this.context.theme.map.mopPathColor}
                strokeWidth={6.5}
                strokeOverlay
                d={_.mopPath}
              />
            );
          var K = null;
          if (C && C.backWashPath && '' != C.backWashPath)
            K = (
              <module1414.RRShape
                transform={'android' != module13.Platform.OS || k ? module6 : null}
                stroke={this.context.theme.map.backWashPathColor}
                strokeWidth={0.5}
                strokeDash={'android' == module13.Platform.OS ? [0.5, 3] : [0.15, 1]}
                d={C.backWashPath}
              />
            );
          var Q = null;
          if (C && C.pureCleanPath && '' != C.pureCleanPath)
            Q = (
              <module1414.RRShape
                transform={'android' != module13.Platform.OS || k ? module6 : null}
                stroke={this.context.theme.map.pureMopColor}
                strokeWidth={0.5}
                d={C.pureCleanPath}
              />
            );
          return (
            <w width={this.props.width} height={this.props.height} style={j.pathContainer}>
              {B}
              {J}
              {H}
              {K}
              {Q}
            </w>
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.getCleanPath(this.props.width, this.props.height, this.props.transform);
          return (
            <module13.View
              pointerEvents="none"
              style={{
                left: 0,
                top: 0,
                width: this.props.width,
                height: this.props.height,
              }}
            >
              {t}
            </module13.View>
          );
        },
      },
    ]);
    return l;
  })(React.Component);

exports.AnimatedPath = T;
T.contextType = module1200.AppConfigContext;
T.defaultProps = {
  transform: new M(),
  pathData: {},
  width: 0,
  height: 0,
};

var V = (function (t) {
  module9.default(l, t);
  var n = b(l);

  function l(t) {
    var s;
    module6.default(this, l);
    (s = n.call(this, t)).state = {
      animatedValue: new module13.Animated.Value(0),
    };
    s.currentIndex = 0;
    s.pathPoints = [];
    s.speed = C;
    s.status = module1127.RobotAnimationStatus.DEFAULT;
    return s;
  }

  module7.default(l, [
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
        if (this.pathPoints.length < 1) return <module13.View />;
        if (undefined === this.pathPoints[this.currentIndex]) return <module13.View />;
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
          S = module424.DMM.robotInMap.image,
          I = new M({
            xx: this.props.transform.xx,
            yy: this.props.transform.yy,
          }),
          w = this.pathPoints[this.currentIndex].x * I.xx - 5.4 * I.xx,
          k = this.pathPoints[this.currentIndex].y * I.yy - 5.4 * I.yy,
          O = this.pathPoints.length > this.currentIndex + 1 ? this.pathPoints[this.currentIndex + 1].x * I.xx - 5.4 * I.xx : w,
          E = this.pathPoints.length > this.currentIndex + 1 ? this.pathPoints[this.currentIndex + 1].y * I.yy - 5.4 * I.yy : k,
          C = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [w, O],
          }),
          V = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [k, E],
          }),
          j = A({}, this.props.pathData);

        if (null == (t = this.props) ? undefined : null == (n = t.pathData) ? undefined : null == (o = n.points) ? undefined : o.length) {
          j.points = null == j ? undefined : null == (s = j.points) ? undefined : null == s.slice ? undefined : s.slice(0, this.currentIndex + 1);
          j.mopData = null == j ? undefined : null == (h = j.mopData) ? undefined : null == h.slice ? undefined : h.slice(0, this.currentIndex + 1);
        }

        if (this.pathPoints.length <= this.currentIndex + 1) {
          w = null == (l = this.pathPoints) ? undefined : null == (p = l[this.currentIndex - 1]) ? undefined : p.x;
          k = null == (f = this.pathPoints) ? undefined : null == (v = f[this.currentIndex - 1]) ? undefined : v.y;
          O = null == (P = this.pathPoints) ? undefined : null == (y = P[this.currentIndex]) ? undefined : y.x;
          E = null == (x = this.pathPoints) ? undefined : null == (b = x[this.currentIndex]) ? undefined : b.y;
        }

        var G = (180 * (E - k) ** (O - w)) / Math.PI;
        if (isNaN(G)) G = 0;
        G += 'deg';
        return (
          <module13.View
            pointerEvents="box-none"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: this.props.width,
              height: this.props.height,
            }}
          >
            {this.props.showPath && <T pathData={j} transform={I} width={this.props.width} height={this.props.height} />}
            {React.createElement(
              module13.Animated.View,
              {
                style: {
                  position: 'absolute',
                  overflow: 'visible',
                  left: C,
                  top: V,
                  transform: [
                    {
                      rotateZ: G,
                    },
                  ],
                },
              },
              React.createElement(module1415, {
                resizeMethod: 'scale',
                source: S,
                style: {
                  width: 10.8 * I.xx,
                  height: 10.8 * I.yy,
                },
              })
            )}
          </module13.View>
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
        else if (this.status != module1127.RobotAnimationStatus.PAUSED) {
          if (this.status != module1127.RobotAnimationStatus.DEFAULT || this.props.autoAnimated)
            if (this.pathPoints.length > this.currentIndex + 1) {
              this.pathPoints.length;
              this.currentIndex;
              this.run();
            } else {
              if (this.status == module1127.RobotAnimationStatus.ANIMATING && !this.props.autoAnimated) {
                this.status = module1127.RobotAnimationStatus.DEFAULT;
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
        module13.Animated.timing(this.state.animatedValue, {
          toValue: 1,
          duration: this.speed,
        }).start(function () {
          if (t.currentIndex < t.pathPoints.length - 1) t.currentIndex = t.currentIndex + 1;
          t.setState(
            {
              animatedValue: new module13.Animated.Value(0),
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
        module13.Animated.delay(100).start(function () {
          t.next();
        });
      },
    },
    {
      key: 'pause',
      value: function () {
        if (this.status == module1127.RobotAnimationStatus.ANIMATING) this.status = module1127.RobotAnimationStatus.PAUSED;
      },
    },
    {
      key: 'play',
      value: function () {
        if (this.status == module1127.RobotAnimationStatus.PAUSED) this.status = module1127.RobotAnimationStatus.ANIMATING;

        if (this.status == module1127.RobotAnimationStatus.DEFAULT) {
          this.reset(true);
          this.status = module1127.RobotAnimationStatus.ANIMATING;
        }
      },
    },
    {
      key: 'stop',
      value: function () {
        if (this.pathPoints.length) this.currentIndex = this.pathPoints.length - 1;
        if (this.props.autoAnimated) this.wait();
        this.status = module1127.RobotAnimationStatus.DEFAULT;
      },
    },
    {
      key: 'setSpeed',
      value: function (t) {
        var n = t;
        if (n < 1) n = 1;
        if (n > 10) n = 10;
        this.speed = C / n;
      },
    },
  ]);
  return l;
})(React.Component);

exports.AnimatedRobot = V;
V.defaultProps = {
  autoAnimated: false,
  onPlayFinished: function () {},
};
var j = module13.StyleSheet.create({
  pathContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
