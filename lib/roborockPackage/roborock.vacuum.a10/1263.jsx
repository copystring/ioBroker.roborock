var module49 = require('./49'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  module415 = require('./415'),
  module1233 = require('./1233'),
  module506 = require('./506'),
  module1264 = require('./1264'),
  module386 = require('./386');

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
        module49.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      x(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function D(t) {
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
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (t) {
    return false;
  }
}

var React = require('react'),
  module1265 = require('./1265'),
  module1267 = require('./1267'),
  k = module1267.RRSurface,
  O = module1267.isRRSurface,
  module1245 = require('./1245'),
  module1268 = require('./1268').Palette,
  M = module12.ART.Shape,
  T = module12.ART.Transform,
  _ = 100,
  W = (function (t) {
    module7.default(l, t);
    var n = D(l);

    function l() {
      module4.default(this, l);
      return n.apply(this, arguments);
    }

    module5.default(l, [
      {
        key: 'getCleanPath',
        value: function (t, n, o) {
          if (!(null == (s = this.props) ? undefined : null == (h = s.pathData) ? undefined : h.pathType)) module1233.MoppingType.MOPPING_TYPE_BOTH_BOTH;
          module4 = null == (l = this.props) ? undefined : l.transform;
          var s,
            h,
            l,
            p,
            c,
            v,
            x,
            A,
            D = module386.default.isMopPathSupported() && this.props.pathData && this.props.pathData.mopData,
            b = {
              path: '',
            };

          if (null != (p = this.props) && null != (c = p.pathData) && null != (v = c.points) && v.length) {
            var I,
              w,
              _,
              W,
              V,
              G,
              N,
              C,
              F,
              U,
              B = D ? (null == (I = this.props) ? undefined : null == (w = I.pathData) ? undefined : w.mopData) : null;

            b =
              'android' != module12.Platform.OS || O
                ? module1245._parsePath(
                    null == (N = this.props) ? undefined : null == (C = N.pathData) ? undefined : C.points,
                    null == (F = this.props) ? undefined : null == (U = F.pathData) ? undefined : U.offset,
                    B,
                    false
                  )
                : module1245._parsePathWithTransform(
                    null == (_ = this.props) ? undefined : null == (W = _.pathData) ? undefined : W.points,
                    null == (V = this.props) ? undefined : null == (G = V.pathData) ? undefined : G.offset,
                    module4
                  );
          }

          var L,
            H,
            z,
            Y,
            Z,
            q,
            J,
            K,
            Q = {
              mopPath: '',
            };
          if (D)
            Q =
              'android' != module12.Platform.OS || O
                ? module1245._parseMopPath(
                    null == (Z = this.props) ? undefined : null == (q = Z.pathData) ? undefined : q.points,
                    null == (J = this.props) ? undefined : null == (K = J.pathData) ? undefined : K.offset,
                    this.props.pathData.mopData
                  )
                : module1245._parseMopPathWithTransform(
                    null == (L = this.props) ? undefined : null == (H = L.pathData) ? undefined : H.points,
                    null == (z = this.props) ? undefined : null == (Y = z.pathData) ? undefined : Y.offset,
                    module4,
                    this.props.pathData.mopData
                  );
          var X,
            $,
            tt,
            et,
            at,
            nt,
            it,
            ot,
            st = {
              backWashPath: '',
            };
          if (D)
            st =
              'android' != module12.Platform.OS || O
                ? module1245._parseBackWashPath(
                    null == (at = this.props) ? undefined : null == (nt = at.pathData) ? undefined : nt.points,
                    null == (it = this.props) ? undefined : null == (ot = it.pathData) ? undefined : ot.offset,
                    this.props.pathData.mopData
                  )
                : module1245._parseBackWashPathWithTransform(
                    null == (X = this.props) ? undefined : null == ($ = X.pathData) ? undefined : $.points,
                    null == (tt = this.props) ? undefined : null == (et = tt.pathData) ? undefined : et.offset,
                    this.props.pathData.mopData
                  );
          var rt = {
            pathGotoPlan: '',
          };

          if (null != (x = this.props) && null != (A = x.pathData) && A.planPoints) {
            var ht,
              lt,
              pt,
              ut,
              dt =
                'android' != module12.Platform.OS || O
                  ? module1245._parseGotoPlanPath(
                      this.props.pathData.planPoints,
                      null == (pt = this.props) ? undefined : null == (ut = pt.pathData) ? undefined : ut.offset,
                      new T()
                    )
                  : module1245._parseGotoPlanPath(
                      this.props.pathData.planPoints,
                      null == (ht = this.props) ? undefined : null == (lt = ht.pathData) ? undefined : lt.offset,
                      module4
                    );
            rt.pathGotoPlan = dt.path;
          }

          var ct = null;
          if ('' != rt.pathGotoPlan)
            ct = (
              <M
                transform={'android' != module12.Platform.OS || O ? module4 : null}
                stroke={module1268.map.pathGotoPlan}
                strokeWidth={1}
                strokeDash={'android' == module12.Platform.OS ? [5, 10] : [2, 2]}
                d={rt.pathGotoPlan}
              />
            );
          var ft = null;
          if (b && '' != b.path)
            ft = <M transform={'android' != module12.Platform.OS || O ? module4 : null} stroke={this.context.theme.map.pathColor} strokeWidth={0.5} d={b.path} />;
          var vt = null;
          if (Q && '' != Q.mopPath)
            vt = (
              <module1264.RRShape
                transform={'android' != module12.Platform.OS || O ? module4 : null}
                stroke={this.context.theme.map.mopPathColor}
                strokeWidth={6.5}
                strokeOverlay
                d={Q.mopPath}
              />
            );
          var mt = null;
          if (st && '' != st.backWashPath)
            mt = (
              <M
                transform={'android' != module12.Platform.OS || O ? module4 : null}
                stroke={this.context.theme.map.backWashPathColor}
                strokeWidth={0.5}
                strokeDash={'android' == module12.Platform.OS ? [4, 8] : [1.5, 1.5]}
                d={st.backWashPath}
              />
            );
          return (
            <k width={this.props.width} height={this.props.height} style={j.pathContainer}>
              {ct}
              {vt}
              {ft}
              {mt}
            </k>
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

exports.AnimatedPath = W;
W.contextType = module506.AppConfigContext;
W.defaultProps = {
  transform: new T(),
  pathData: {},
  width: 0,
  height: 0,
};

var V = (function (t) {
  module7.default(l, t);
  var n = D(l);

  function l(t) {
    var s;
    module4.default(this, l);
    (s = n.call(this, t)).state = {
      animatedValue: new module12.Animated.Value(0),
    };
    s.currentIndex = 0;
    s.pathPoints = [];
    s.speed = _;
    s.status = module1233.RobotAnimationStatus.DEFAULT;
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
          D,
          b = module415.DMM.robotInMap.image,
          w = new T({
            xx: this.props.transform.xx,
            yy: this.props.transform.yy,
          }),
          k = this.pathPoints[this.currentIndex].x * w.xx - 5.4 * w.xx,
          O = this.pathPoints[this.currentIndex].y * w.yy - 5.4 * w.yy,
          R = this.pathPoints.length > this.currentIndex + 1 ? this.pathPoints[this.currentIndex + 1].x * w.xx - 5.4 * w.xx : k,
          E = this.pathPoints.length > this.currentIndex + 1 ? this.pathPoints[this.currentIndex + 1].y * w.yy - 5.4 * w.yy : O,
          M = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [k, R],
          }),
          _ = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [O, E],
          }),
          V = A({}, this.props.pathData);

        if (null != (t = this.props) && null != (n = t.pathData) && null != (o = n.points) && o.length) {
          V.points = null == V ? undefined : null == (s = V.points) ? undefined : null == s.slice ? undefined : s.slice(0, this.currentIndex + 1);
          V.mopData = null == V ? undefined : null == (h = V.mopData) ? undefined : null == h.slice ? undefined : h.slice(0, this.currentIndex + 1);
        }

        if (this.pathPoints.length <= this.currentIndex + 1) {
          k = null == (l = this.pathPoints) ? undefined : null == (p = l[this.currentIndex - 1]) ? undefined : p.x;
          O = null == (f = this.pathPoints) ? undefined : null == (v = f[this.currentIndex - 1]) ? undefined : v.y;
          R = null == (P = this.pathPoints) ? undefined : null == (y = P[this.currentIndex]) ? undefined : y.x;
          E = null == (x = this.pathPoints) ? undefined : null == (D = x[this.currentIndex]) ? undefined : D.y;
        }

        var j = (180 * (E - O) ** (R - k)) / Math.PI;
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
            {this.props.showPath && <W pathData={V} transform={w} width={this.props.width} height={this.props.height} />}
            {React.createElement(
              module12.Animated.View,
              {
                style: {
                  position: 'absolute',
                  overflow: 'visible',
                  left: M,
                  top: _,
                  transform: [
                    {
                      rotateZ: j,
                    },
                  ],
                },
              },
              React.createElement(module1265, {
                resizeMethod: 'scale',
                source: b,
                style: {
                  width: 10.8 * w.xx,
                  height: 10.8 * w.yy,
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
        else if (this.status != module1233.RobotAnimationStatus.PAUSED) {
          if (this.status != module1233.RobotAnimationStatus.DEFAULT || this.props.autoAnimated)
            if (this.pathPoints.length > this.currentIndex + 1) {
              this.pathPoints.length;
              this.currentIndex;
              this.run();
            } else {
              if (this.status == module1233.RobotAnimationStatus.ANIMATING && !this.props.autoAnimated) {
                this.status = module1233.RobotAnimationStatus.DEFAULT;
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
        if (this.status == module1233.RobotAnimationStatus.ANIMATING) this.status = module1233.RobotAnimationStatus.PAUSED;
      },
    },
    {
      key: 'play',
      value: function () {
        if (this.status == module1233.RobotAnimationStatus.PAUSED) this.status = module1233.RobotAnimationStatus.ANIMATING;

        if (this.status == module1233.RobotAnimationStatus.DEFAULT) {
          this.reset(true);
          this.status = module1233.RobotAnimationStatus.ANIMATING;
        }
      },
    },
    {
      key: 'stop',
      value: function () {
        if (this.pathPoints.length) this.currentIndex = this.pathPoints.length - 1;
        if (this.props.autoAnimated) this.wait();
        this.status = module1233.RobotAnimationStatus.DEFAULT;
      },
    },
    {
      key: 'setSpeed',
      value: function (t) {
        var n = t;
        if (n < 1) n = 1;
        if (n > 10) n = 10;
        this.speed = _ / n;
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
var j = module12.StyleSheet.create({
  pathContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
