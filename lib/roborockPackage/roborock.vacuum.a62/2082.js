require('./381');

require('./415');

require('./391');

require('./390');

var module50 = require('./50'),
  module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1121 = require('./1121'),
  module419 = require('./419'),
  module414 = require('./414'),
  module1055 = require('./1055'),
  module423 = require('./423'),
  module394 = require('./394'),
  module1907 = require('./1907'),
  module515 = require('./515');

function k(t, n) {
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
      k(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      k(Object(l)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(l, n));
      });
  }

  return t;
}

function w() {
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

var module505 = require('./505').strings,
  base64js = require('base64-js'),
  _ = (function (t) {
    module7.default(_, t);

    var module50 = _,
      module1121 = w(),
      k = function () {
        var t,
          o = module11.default(module50);

        if (module1121) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function _(t) {
      var n;
      module4.default(this, _);
      (n = k.call(this, t)).state = {
        dateString: null,
      };
      n.themeListener = module12.DeviceEventEmitter.addListener(module419.NotificationKeys.ThemeDidChange, function () {
        var t, o, l, u;
        n.updateMap(
          null == (t = globals) ? undefined : null == (o = t.initialData) ? undefined : null == (l = o.initialPage) ? undefined : null == (u = l.data) ? undefined : u.mapData
        );
      });
      return n;
    }

    module5.default(_, [
      {
        key: 'componentDidMount',
        value: function () {
          var t, n, o, l;
          this.updateMap(
            null == (t = globals) ? undefined : null == (n = t.initialData) ? undefined : null == (o = n.initialPage) ? undefined : null == (l = o.data) ? undefined : l.mapData
          );
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
            b,
            v,
            y,
            D,
            S = this,
            C =
              globals.app.state.theme == module515.Themes.light
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
                      : null == (b = f.initialData)
                      ? undefined
                      : null == (v = b.initialPage)
                      ? undefined
                      : null == (y = v.data)
                      ? undefined
                      : null == (D = y.backgroundColor)
                      ? undefined
                      : D.dark)
                ? c
                : this.theme.pageBackgroundColor;
          return React.default.createElement(
            module12.View,
            {
              style: {
                flex: 1,
                backgroundColor: C,
              },
            },
            React.default.createElement(
              module12.Text,
              {
                style: {
                  color: this.theme.mainTextColor,
                  fontSize: 22,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                },
              },
              module505.offline_map_tips_title
            ),
            React.default.createElement(
              module12.Text,
              {
                style: {
                  marginTop: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  color: this.theme.subTextColor,
                  fontSize: 17,
                },
              },
              module505.offline_map_tips_subtitle
            ),
            React.default.createElement(
              module12.Text,
              {
                style: {
                  position: 'absolute',
                  left: 20,
                  bottom: 50,
                  color: this.theme.mainTextColor,
                  fontSize: 18,
                  fontWeight: 'bold',
                },
              },
              this.state.dateString && module505.offline_map_tips_off_line_date
            ),
            React.default.createElement(
              module12.Text,
              {
                style: {
                  position: 'absolute',
                  left: 20,
                  bottom: 30,
                  color: this.theme.subTextColor,
                  fontSize: 17,
                },
              },
              this.state.dateString
            ),
            React.default.createElement(module1055.MapView, {
              top: 150,
              bottom: 10,
              left: 30,
              right: 30,
              style: {
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
              },
              ref: function (t) {
                return (S.mapView = t);
              },
              style: {
                flex: 1,
                justifyContent: 'center',
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
              },
            })
          );
        },
      },
      {
        key: 'updateMap',
        value: function (t) {
          if (t) {
            var n = module1907.parse(t, globals.app.state.theme != module515.Themes.light, module423.DMM.isSapphirePlus, module394.MC.sapMapBeautify),
              l = {
                carpetMap: n.carpetMap || {},
                customCarpet: n.customCarpet || {},
                floorMap: n.floorMap || {},
                map: n.map || {},
                path: n.path,
                charger: n.charger,
                zones: n.zones || {},
                walls: n.walls || {},
                fbzs: n.fbzs || {},
                mfbzs: n.mfbzs || {},
                clfbzs: n.clfbzs || {},
                furnitures: n.furnitures || {},
                obstacles: n.obstacles || n.obstaclesOld || {},
                ignoredObstacles: n.ignoredObstacles || n.ignoredObstaclesOld || {},
                mopPath: n.mopPath || {},
                robot: n.robot,
                dockType: n.dockType || {},
                dsfbz: n.dsfbz || {},
                date: n.date || null,
              };

            if (
              (l &&
                l.map &&
                l.map.data &&
                module22.default(l.map.data, {
                  data: base64js.toByteArray(t),
                }),
              -2 != this.state.mapFlag && module414.MM.mapRotateAngle)
            ) {
              var u = module414.MM.mapRotateAngle[this.state.mapFlag];
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
          } else console.warn('test');
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
    ]);
    return _;
  })(React.default.Component);

exports.default = _;
_.contextType = module1121.AppConfigContext;
module12.StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
