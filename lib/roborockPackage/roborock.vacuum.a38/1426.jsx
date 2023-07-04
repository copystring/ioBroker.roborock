var module50 = require('./50'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module422 = require('./422'),
  module1332 = require('./1332'),
  module515 = require('./515'),
  module1427 = require('./1427'),
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

function D(t) {
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

function A(t) {
  var n = b();
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

function b() {
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
  module1428 = require('./1428'),
  module1430 = require('./1430'),
  w = module1430.RRSurface,
  k = module1430.isRRSurface,
  module1402 = require('./1402'),
  module1431 = require('./1431').Palette,
  M = module12.ART.Transform,
  T = 100,
  _ = (function (t) {
    module7.default(l, t);
    var n = A(l);

    function l() {
      module4.default(this, l);
      return n.apply(this, arguments);
    }

    module5.default(l, [
      {
        key: 'getCleanPath',
        value: function (t, n, o) {
          if (!(null == (s = this.props) ? undefined : null == (h = s.pathData) ? undefined : h.pathType)) module1332.MoppingType.MOPPING_TYPE_BOTH_BOTH;
          module4 = null == (l = this.props) ? undefined : l.transform;
          var s,
            h,
            l,
            p,
            c,
            v,
            x,
            D,
            A = module390.default.isMopPathSupported() && this.props.pathData && this.props.pathData.mopData,
            b = {
              path: '',
            };

          if (null == (p = this.props) ? undefined : null == (c = p.pathData) ? undefined : null == (v = c.points) ? undefined : v.length) {
            var R,
              I,
              T,
              _,
              W,
              j,
              G,
              N,
              C,
              F,
              U = A ? (null == (R = this.props) ? undefined : null == (I = R.pathData) ? undefined : I.mopData) : null;

            b =
              'android' != module12.Platform.OS || k
                ? module1402._parsePath(
                    null == (G = this.props) ? undefined : null == (N = G.pathData) ? undefined : N.points,
                    null == (C = this.props) ? undefined : null == (F = C.pathData) ? undefined : F.offset,
                    U,
                    false
                  )
                : module1402._parsePathWithTransform(
                    null == (T = this.props) ? undefined : null == (_ = T.pathData) ? undefined : _.points,
                    null == (W = this.props) ? undefined : null == (j = W.pathData) ? undefined : j.offset,
                    module4
                  );
          }

          var L,
            B,
            H,
            z,
            Y,
            Z,
            q,
            J,
            K = {
              mopPath: '',
            };
          if (A)
            K =
              'android' != module12.Platform.OS || k
                ? module1402._parseMopPath(
                    null == (Y = this.props) ? undefined : null == (Z = Y.pathData) ? undefined : Z.points,
                    null == (q = this.props) ? undefined : null == (J = q.pathData) ? undefined : J.offset,
                    this.props.pathData.mopData
                  )
                : module1402._parseMopPathWithTransform(
                    null == (L = this.props) ? undefined : null == (B = L.pathData) ? undefined : B.points,
                    null == (H = this.props) ? undefined : null == (z = H.pathData) ? undefined : z.offset,
                    module4,
                    this.props.pathData.mopData
                  );
          var Q,
            X,
            $,
            tt,
            et,
            at,
            nt,
            it,
            ot = {
              backWashPath: '',
            };
          if (A)
            ot =
              'android' != module12.Platform.OS || k
                ? module1402._parseBackWashPath(
                    null == (et = this.props) ? undefined : null == (at = et.pathData) ? undefined : at.points,
                    null == (nt = this.props) ? undefined : null == (it = nt.pathData) ? undefined : it.offset,
                    this.props.pathData.mopData
                  )
                : module1402._parseBackWashPathWithTransform(
                    null == (Q = this.props) ? undefined : null == (X = Q.pathData) ? undefined : X.points,
                    null == ($ = this.props) ? undefined : null == (tt = $.pathData) ? undefined : tt.offset,
                    this.props.pathData.mopData
                  );
          var st = {
            pathGotoPlan: '',
          };

          if (null == (x = this.props) ? undefined : null == (D = x.pathData) ? undefined : D.planPoints) {
            var rt,
              ht,
              lt,
              pt,
              ut =
                'android' != module12.Platform.OS || k
                  ? module1402._parseGotoPlanPath(
                      this.props.pathData.planPoints,
                      null == (lt = this.props) ? undefined : null == (pt = lt.pathData) ? undefined : pt.offset,
                      new M()
                    )
                  : module1402._parseGotoPlanPath(
                      this.props.pathData.planPoints,
                      null == (rt = this.props) ? undefined : null == (ht = rt.pathData) ? undefined : ht.offset,
                      module4
                    );
            st.pathGotoPlan = ut.path;
          }

          var dt = null;
          if ('' != st.pathGotoPlan)
            dt = (
              <module1427.RRShape
                transform={'android' != module12.Platform.OS || k ? module4 : null}
                stroke={module1431.map.pathGotoPlan}
                strokeWidth={1}
                strokeDash={'android' == module12.Platform.OS ? [5, 10] : [2, 2]}
                d={st.pathGotoPlan}
              />
            );
          var ct = null;
          if (b && '' != b.path)
            ct = <module1427.RRShape transform={'android' != module12.Platform.OS || k ? module4 : null} stroke={this.context.theme.map.pathColor} strokeWidth={0.5} d={b.path} />;
          var ft = null;
          if (K && '' != K.mopPath)
            ft = (
              <module1427.RRShape
                transform={'android' != module12.Platform.OS || k ? module4 : null}
                stroke={this.context.theme.map.mopPathColor}
                strokeWidth={6.5}
                strokeOverlay
                d={K.mopPath}
              />
            );
          var vt = null;
          if (ot && '' != ot.backWashPath)
            vt = (
              <module1427.RRShape
                transform={'android' != module12.Platform.OS || k ? module4 : null}
                stroke={this.context.theme.map.backWashPathColor}
                strokeWidth={0.5}
                strokeDash={'android' == module12.Platform.OS ? [4, 8] : [1.5, 1.5]}
                d={ot.backWashPath}
              />
            );
          return (
            <w width={this.props.width} height={this.props.height} style={V.pathContainer}>
              {dt}
              {ft}
              {ct}
              {vt}
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

exports.AnimatedPath = _;
_.contextType = module515.AppConfigContext;
_.defaultProps = {
  transform: new M(),
  pathData: {},
  width: 0,
  height: 0,
};

var W = (function (t) {
  module7.default(l, t);
  var n = A(l);

  function l(t) {
    var s;
    module4.default(this, l);
    (s = n.call(this, t)).state = {
      animatedValue: new module12.Animated.Value(0),
    };
    s.currentIndex = 0;
    s.pathPoints = [];
    s.speed = T;
    s.status = module1332.RobotAnimationStatus.DEFAULT;
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
          A,
          b = module422.DMM.robotInMap.image,
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
          W = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [k, E],
          }),
          V = D({}, this.props.pathData);

        if (null == (t = this.props) ? undefined : null == (n = t.pathData) ? undefined : null == (o = n.points) ? undefined : o.length) {
          V.points = null == V ? undefined : null == (s = V.points) ? undefined : null == s.slice ? undefined : s.slice(0, this.currentIndex + 1);
          V.mopData = null == V ? undefined : null == (h = V.mopData) ? undefined : null == h.slice ? undefined : h.slice(0, this.currentIndex + 1);
        }

        if (this.pathPoints.length <= this.currentIndex + 1) {
          w = null == (l = this.pathPoints) ? undefined : null == (p = l[this.currentIndex - 1]) ? undefined : p.x;
          k = null == (f = this.pathPoints) ? undefined : null == (v = f[this.currentIndex - 1]) ? undefined : v.y;
          O = null == (P = this.pathPoints) ? undefined : null == (y = P[this.currentIndex]) ? undefined : y.x;
          E = null == (x = this.pathPoints) ? undefined : null == (A = x[this.currentIndex]) ? undefined : A.y;
        }

        var j = (180 * (E - k) ** (O - w)) / Math.PI;
        if (isNaN(j)) j = 0;
        j += 'deg';
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
            {this.props.showPath && <_ pathData={V} transform={I} width={this.props.width} height={this.props.height} />}
            {React.createElement(
              module12.Animated.View,
              {
                style: {
                  position: 'absolute',
                  overflow: 'visible',
                  left: T,
                  top: W,
                  transform: [
                    {
                      rotateZ: j,
                    },
                  ],
                },
              },
              React.createElement(module1428, {
                resizeMethod: 'scale',
                source: b,
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
        else if (this.status != module1332.RobotAnimationStatus.PAUSED) {
          if (this.status != module1332.RobotAnimationStatus.DEFAULT || this.props.autoAnimated)
            if (this.pathPoints.length > this.currentIndex + 1) {
              this.pathPoints.length;
              this.currentIndex;
              this.run();
            } else {
              if (this.status == module1332.RobotAnimationStatus.ANIMATING && !this.props.autoAnimated) {
                this.status = module1332.RobotAnimationStatus.DEFAULT;
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
        if (this.status == module1332.RobotAnimationStatus.ANIMATING) this.status = module1332.RobotAnimationStatus.PAUSED;
      },
    },
    {
      key: 'play',
      value: function () {
        if (this.status == module1332.RobotAnimationStatus.PAUSED) this.status = module1332.RobotAnimationStatus.ANIMATING;

        if (this.status == module1332.RobotAnimationStatus.DEFAULT) {
          this.reset(true);
          this.status = module1332.RobotAnimationStatus.ANIMATING;
        }
      },
    },
    {
      key: 'stop',
      value: function () {
        if (this.pathPoints.length) this.currentIndex = this.pathPoints.length - 1;
        if (this.props.autoAnimated) this.wait();
        this.status = module1332.RobotAnimationStatus.DEFAULT;
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

exports.AnimatedRobot = W;
W.defaultProps = {
  autoAnimated: false,
  onPlayFinished: function () {},
};
var V = module12.StyleSheet.create({
  pathContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
