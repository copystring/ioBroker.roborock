require('./416');

require('./391');

require('./390');

var module50 = require('./50'),
  module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1200 = require('./1200'),
  module420 = require('./420'),
  module415 = require('./415'),
  module381 = require('./381'),
  module1125 = require('./1125'),
  module424 = require('./424'),
  module394 = require('./394'),
  module1994 = require('./1994'),
  module520 = require('./520');

function M(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (n)
      l = l.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, l);
  }

  return o;
}

function P(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      M(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      M(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function T() {
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

require('./393');

var module510 = require('./510').strings,
  base64js = require('base64-js'),
  j = (function (t) {
    module9.default(j, t);

    var module50 = j,
      module1200 = T(),
      M = function () {
        var t,
          o = module12.default(module50);

        if (module1200) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function j(t) {
      var n;
      module6.default(this, j);
      (n = M.call(this, t)).state = {
        dateString: null,
      };
      n.themeListener = module13.DeviceEventEmitter.addListener(module420.NotificationKeys.ThemeDidChange, function () {
        var t, o, l, u;
        n.updateMap(
          null == (t = globals) ? undefined : null == (o = t.initialData) ? undefined : null == (l = o.initialPage) ? undefined : null == (u = l.data) ? undefined : u.mapData
        );
      });
      return n;
    }

    module7.default(j, [
      {
        key: 'componentDidMount',
        value: function () {
          var t = this;
          setTimeout(function () {
            var n, o, l, u;
            t.updateMap(
              null == (n = globals) ? undefined : null == (o = n.initialData) ? undefined : null == (l = o.initialPage) ? undefined : null == (u = l.data) ? undefined : u.mapData
            );
          }, 100);
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          if (!(null == this || null == (t = this.themeListener))) t.remove();
        },
      },
      {
        key: 'getDateString',
        value: function (t) {
          var n = function (t) {
              return t < 10 ? '0' + t : t;
            },
            o = new Date(1e3 * t),
            l = o.getFullYear(),
            u = o.getMonth() + 1,
            s = o.getDate(),
            c = o.getHours(),
            f = o.getMinutes();

          o.getSeconds();
          return l + '.' + u + '.' + s + ' ' + n(c) + ':' + n(f);
        },
      },
      {
        key: 'render',
        value: function () {
          var t,
            n,
            o,
            l,
            u,
            s,
            c,
            f,
            v,
            b,
            y,
            S,
            C = this,
            w =
              this.theme == module520.Themes.light
                ? null !=
                  (t =
                    null == (n = globals)
                      ? undefined
                      : null == (o = n.initialData)
                      ? undefined
                      : null == (l = o.initialPage)
                      ? undefined
                      : null == (u = l.data)
                      ? undefined
                      : null == (s = u.backgroundColor)
                      ? undefined
                      : s.light)
                  ? t
                  : this.theme.pageBackgroundColor
                : null !=
                  (c =
                    null == (f = globals)
                      ? undefined
                      : null == (v = f.initialData)
                      ? undefined
                      : null == (b = v.initialPage)
                      ? undefined
                      : null == (y = b.data)
                      ? undefined
                      : null == (S = y.backgroundColor)
                      ? undefined
                      : S.dark)
                ? c
                : this.theme.pageBackgroundColor;
          return React.default.createElement(
            module13.View,
            {
              style: {
                flex: 1,
                backgroundColor: w,
              },
            },
            React.default.createElement(
              module13.Text,
              {
                style: {
                  color: this.theme.mainTextColor,
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginHorizontal: 40,
                  alignSelf: 'center',
                },
              },
              module510.offline_map_tips_title
            ),
            React.default.createElement(
              module13.Text,
              {
                style: {
                  marginTop: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  color: this.theme.subTextColor,
                  fontSize: 17,
                },
              },
              module510.offline_map_tips_subtitle
            ),
            React.default.createElement(module1125.MapView, {
              top: 0,
              bottom: 80,
              left: 30,
              right: 30,
              style: {
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
              },
              ref: function (t) {
                return (C.mapView = t);
              },
              initSize: {
                height: 0.9 * module13.Dimensions.get('window').height - 28,
                width: 0.9 * module13.Dimensions.get('window').width,
              },
              style: {
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
              },
            }),
            React.default.createElement(
              module13.Text,
              {
                style: {
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  bottom: 50,
                  color: this.theme.mainTextColor,
                  fontSize: 18,
                  fontWeight: 'bold',
                },
              },
              this.state.dateString && module510.offline_map_tips_off_line_date
            ),
            React.default.createElement(
              module13.Text,
              {
                style: {
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  bottom: 30,
                  color: this.theme.subTextColor,
                  fontSize: 17,
                },
              },
              this.state.dateString
            )
          );
        },
      },
      {
        key: 'updateMap',
        value: function (t) {
          if (t) {
            var n = module1994.parse(t, this.theme != module520.Themes.light, module424.DMM.isSapphirePlus, module394.MC.sapMapBeautify),
              l = {
                carpetMap: {},
                customCarpet: {},
                floorMap: {},
                map: n.map || {},
                path: {},
                charger: n.charger,
                zones: {},
                walls: {},
                fbzs: {},
                mfbzs: {},
                clfbzs: {},
                furnitures: {},
                obstacles: {},
                ignoredObstacles: {},
                mopPath: {},
                robot: n.robot,
                dockType: n.dockType || {},
                dsfbz: {},
                date: n.date || null,
                robotStatus: module381.RobotState.CHARGE_ERROR,
              };

            if (
              (l &&
                l.map &&
                l.map.data &&
                module22.default(l.map.data, {
                  data: base64js.toByteArray(t),
                }),
              -2 != this.state.mapFlag && module415.MM.mapRotateAngle)
            ) {
              var u = module415.MM.mapRotateAngle[this.state.mapFlag];
              module22.default(l, {
                mapDeg: u || 0,
              });
            }

            this.mapData = l;
            if (this.mapView) this.mapView.setState(P({}, l));
            if (l.date && l.date.data)
              this.setState({
                dateString: this.getDateString(l.date.data),
              });
          }
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return j;
  })(React.default.Component);

exports.default = j;
j.contextType = module1200.AppConfigContext;
module13.StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
