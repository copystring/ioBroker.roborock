var regeneratorRuntime = require('regenerator-runtime'),
  module22 = require('./22'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1241 = require('./1241'),
  module1235 = require('./1235'),
  module377 = require('./377'),
  module407 = require('./407');

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

var module1249 = require('./1249'),
  E = module12.ART.Transform,
  module936 = require('./936'),
  module1235 = require('./1235'),
  module1247 = require('./1247'),
  P = (function (t) {
    module7.default(w, t);

    var PropTypes = w,
      P = b(),
      O = function () {
        var t,
          n = module11.default(PropTypes);

        if (P) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function w(t) {
      var n;
      module4.default(this, w);

      (n = O.call(this, t)).handleFBZPanOnShouldStart = function () {
        return n._enableEditMap();
      };

      n.handleFBZPanStart = function (t, s) {
        var o,
          l = null;
        if (
          (t == module1235.FbzType.FBZ_TYPE_CARPET
            ? (n._setCarpetZonesFocus(n.fbzReferences, s), (l = n.fbzReferences))
            : t == module1235.FbzType.RECT_TYPE_CARPET && (n._setCarpetZonesFocus(n.customReferences, s), (l = n.customReferences)),
          l)
        )
          null == n.props.mapCarpetFocusCallback || n.props.mapCarpetFocusCallback(s, null == (o = l[s]) ? undefined : o.state.newAdded, l == n.fbzReferences);
      };

      n.customReferences = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
      };
      n.fbzReferences = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
      };
      n.state = {};
      return n;
    }

    module5.default(w, [
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, n) {
          var s = this;
          if (!t.ignoreCarpetEdited) this.initCarpetZones(t.cfbZones, false);
          if (!t.cusCarpetEdited) this.initCarpetZones(t.cusCarpetZones, true);

          if (!this.ignoreZoneInit && this.props.initFBZone) {
            module1249.setTimeout(function () {
              s.addCarpetZones(s.props.initFBZone, 0, false);
            }, 500);
            this.ignoreZoneInit = true;
          }
        },
      },
      {
        key: 'initCarpetZones',
        value: function (t, n) {
          var s = n ? this.customReferences : this.fbzReferences;
          if (s)
            if (t && 0 != t.length) {
              for (c = 1; c <= module1235.MAX_COUNT_WALL_OR_FBZ; c++)
                if (c <= t.length) {
                  var o,
                    l = t[c - 1];
                  if (!(null == (o = s[c]))) o.showZone(c, l.rectSize, l.slopeAngle);
                } else {
                  var u;
                  if (!(null == (u = s[c]))) u.reInitRender(c);
                }
            } else
              for (var c = 1; c <= module1235.MAX_COUNT_WALL_OR_FBZ; c++) {
                var f;
                if (!(null == (f = s[c]))) f.reInitRender(c);
              }
        },
      },
      {
        key: 'addCarpetZones',
        value: function (t, n, s) {
          for (
            var o = this,
              l = s ? this.customReferences : this.fbzReferences,
              u = this._getVisibleZonesCount(l),
              c = function (c) {
                if (l[c] && 0 == l[c].state.visible && l[c].state.serial == u + 1) {
                  l[c].addNew(t, n, function () {
                    o._setCarpetZonesFocus(l, c);

                    if (!(null == o.props.mapCarpetFocusCallback)) o.props.mapCarpetFocusCallback(c, true, !s);
                  });
                  return {
                    v: c,
                  };
                }
              },
              f = 1;
            f <= module1235.MAX_COUNT_WALL_OR_FBZ;
            f++
          ) {
            var p = c(f);
            if ('object' == typeof p) return p.v;
          }

          return 0;
        },
      },
      {
        key: 'clearCarpetZonesFocus',
        value: function (t) {
          var n = t ? this.customReferences : this.fbzReferences;

          this._clearCarpetZonesFocus(n);
        },
      },
      {
        key: 'isCarpetEditZonesMax',
        value: function (t) {
          var n = t ? this.customReferences : this.fbzReferences;
          return this._getVisibleZonesCount(n) >= module1235.MAX_COUNT_WALL_OR_FBZ;
        },
      },
      {
        key: 'getVisibleCarpetZones',
        value: function (t) {
          var n = t ? this.customReferences : this.fbzReferences,
            s = [];
          Object.keys(n).map(function (t) {
            var o;
            if (null == (o = n[t]) ? undefined : o.isVisible()) s.push(n[t]);
          });
          if (s.length <= 0) return [];
          else {
            s.sort(function (t, n) {
              return t.state.serial - n.state.serial;
            });
            return s;
          }
        },
      },
      {
        key: 'isEditCarpetOverlap',
        value: function (t) {
          var n = t ? this.fbzReferences : this.customReferences,
            s = this._getEditedCarpetZones(t);

          if (!s || s.length <= 0) return false;

          for (var o = this._getRotateMaxRectSize(s[0]), l = 1; l <= module1235.MAX_COUNT_WALL_OR_FBZ; l++)
            if (n[l] && n[l].state.visible) {
              var u = {
                  rectSize: n[l].state.rectSize,
                  slopeAngle: n[l].state.slopeAngle,
                },
                c = this._getRotateMaxRectSize(u);

              if (o.x + o.width >= c.x && o.x <= c.x + c.width && o.y + o.height >= c.y && o.y <= c.y + c.height) return true;
            }

          return false;
        },
      },
      {
        key: 'isCustomCarpetOverflow',
        value: function () {
          if (!this.props.mapRect.height || !this.props.mapRect.width) return false;

          var t = this.props.mapRect.width,
            n = this.props.mapRect.height,
            s = this._getEditedCarpetZones(true);

          if (!s) return false;

          for (var o = 0; o < s.length; o++) {
            var l = s[o].rectSize,
              u = s[o].slopeAngle,
              c = l.x + l.width / 2,
              f = l.y + l.height / 2;

            if (module1247._isVerticalRotate((180 * u) / Math.PI)) {
              if (f + l.width / 2 < 0 || f - l.width / 2 > n || c + l.height / 2 < 0 || c - l.height / 2 > t) return true;
            } else if (f + l.height / 2 < 0 || f - l.height / 2 > n || c + l.width / 2 < 0 || c - l.width / 2 > t) return true;
          }

          return false;
        },
      },
      {
        key: '_enableEditMap',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.prev = 0;
                    t.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

                  case 3:
                    t.next = 8;
                    break;

                  case 5:
                    t.prev = 5;
                    t.t0 = t.catch(0);
                    console.warn('network issue');

                  case 8:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            null,
            [[0, 5]],
            Promise
          );
        },
      },
      {
        key: '_setCarpetZonesFocus',
        value: function (t, n) {
          Object.keys(t).map(function (s) {
            var o,
              l = s == n;
            if (!(null == (o = t[s]))) o.setFocus(l);
          });
        },
      },
      {
        key: '_clearCarpetZonesFocus',
        value: function (t) {
          Object.keys(t).map(function (n) {
            var s;
            if (!(null == (s = t[n]))) s.cleanFocus();
          });
        },
      },
      {
        key: '_getVisibleZonesCount',
        value: function (t) {
          var n = 0;
          Object.keys(t).map(function (s) {
            var o;
            if (null != (o = t[s]) && o.isVisible()) n++;
          });
          return n;
        },
      },
      {
        key: '_getEditedCarpetZones',
        value: function (t) {
          var n = t ? this.customReferences : this.fbzReferences,
            s = [];
          Object.keys(n).map(function (t) {
            var o, l;
            if (null != (o = n[t]) && o.isVisible() && null != (l = n[t]) && l.hasEdit())
              s.push({
                rectSize: n[t].state.rectSize,
                slopeAngle: n[t].state.slopeAngle,
              });
          });
          return s;
        },
      },
      {
        key: '_getRotateMaxRectSize',
        value: function (t) {
          var n = t.rectSize,
            o = (-1 * t.slopeAngle * 180) / Math.PI,
            l = n.x + n.width / 2,
            u = n.y + n.height / 2,
            c = module1247._parseDegPoint(n.x - l, n.y - u, o),
            f = module22.default(c, 2),
            p = f[0],
            h = f[1],
            v = module1247._parseDegPoint(n.x - l, n.y + n.height - u, o),
            C = module22.default(v, 2),
            R = C[0],
            _ = C[1],
            y = [Math.abs(p) ** Math.abs(R), Math.abs(h) ** Math.abs(_)],
            b = y[0],
            Z = y[1];

          return {
            x: l - b,
            y: u - Z,
            width: 2 * b,
            height: 2 * Z,
          };
        },
      },
      {
        key: 'getCarpetZoneView',
        value: function (t, n, s, o) {
          var l = this;
          return Object.keys(n).map(function (u, c) {
            return React.default.createElement(module1241.ForbiddenZone, {
              key: c,
              id: u,
              type: t,
              mapDeg: l.props.mapDeg,
              ref: function (t) {
                return (n[u] = t);
              },
              transform: s,
              editable: o,
              handlePanOnShouldStart: l.handleFBZPanOnShouldStart,
              handlePanStart: l.handleFBZPanStart,
              handlePanEnd: l.props.handleFBZPanEnd,
              mapEditPageDidChange: l.props.mapEditPageDidChange,
              checkAndroidOverflow: l.props.checkAndroidOverflow,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = new E({
              xx: this.props.transform.xx || 1,
              yy: this.props.transform.yy || 1,
            }),
            n = this.props.mapMode == module936.MAP_MODE_CARPET_EDIT && !module377.RSM.isRunning,
            s = this.props.subCarpetMode & module377.CarpetEditMode.CarpetIgnore,
            o = this.props.subCarpetMode & module377.CarpetEditMode.CarpetAdd;
          return React.default.createElement(
            module12.View,
            {
              style: M.container,
            },
            this.getCarpetZoneView(module1235.FbzType.RECT_TYPE_CARPET, this.customReferences, t, o && n),
            n && s && this.getCarpetZoneView(module1235.FbzType.FBZ_TYPE_CARPET, this.fbzReferences, t, true)
          );
        },
      },
    ]);
    return w;
  })(React.default.Component);

exports.default = P;
P.propTypes = {
  handleFBZPanEnd: PropTypes.default.func,
  mapEditPageDidChange: PropTypes.default.func,
  mapCarpetFocusCallback: PropTypes.default.func,
  checkAndroidOverflow: PropTypes.default.func,
};
P.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapRect: {},
  mapMode: module936.MAP_MODE_REGULAR,
  cfbZones: null,
  cusCarpetZones: null,
  initFBZone: null,
  ignoreCarpetEdited: false,
  cusCarpetEdited: false,
  handleFBZPanEnd: function () {},
  mapEditPageDidChange: function () {},
  mapCarpetFocusCallback: function () {},
  checkAndroidOverflow: function () {},
};
var M = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
