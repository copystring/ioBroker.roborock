var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1132 = require('./1132'),
  module1057 = require('./1057'),
  module381 = require('./381'),
  module1055 = require('./1055');

function _() {
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

var module1340 = require('./1340'),
  y = module12.ART.Transform,
  module1265 = require('./1265'),
  module1057 = require('./1057'),
  module1261 = require('./1261'),
  P = (function (t) {
    module7.default(k, t);

    var PropTypes = k,
      P = _(),
      T = function () {
        var t,
          n = module11.default(PropTypes);

        if (P) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var s;
      module4.default(this, k);

      (s = T.call(this, t)).handleFBZPanOnShouldStart = function () {
        return module1055.MapEditCommonService.enableEditMap();
      };

      s.handleFBZPanStart = function (t, n) {
        var o = null;

        if (t == module1057.FbzType.FBZ_TYPE_CARPET) {
          s._setCarpetZonesFocus(s.fbzReferences, n);

          s._clearCarpetZonesFocus(s.customReferences);

          o = s.fbzReferences[n];
        } else if (t == module1057.FbzType.RECT_TYPE_CARPET) {
          s._setCarpetZonesFocus(s.customReferences, n);

          s._clearCarpetZonesFocus(s.fbzReferences);

          o = s.customReferences[n];
        }

        if (o) null == s.props.mapCarpetFocusCallback || s.props.mapCarpetFocusCallback(o.state.newAdded, t == module1057.FbzType.FBZ_TYPE_CARPET);
      };

      s.customReferences = {
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
      s.fbzReferences = {
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
      s.state = {};
      return s;
    }

    module5.default(k, [
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, n) {
          var s = this;
          if (!t.ignoreCarpetEdited) this.initCarpetZones(t.cfbZones, false);
          if (!t.cusCarpetEdited) this.initCarpetZones(t.cusCarpetZones, true);

          if (!this.ignoreZoneInit && this.props.initFBZone) {
            module1340.setTimeout(function () {
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
              for (c = 1; c <= module1057.MAX_COUNT_WALL_OR_FBZ; c++)
                if (c <= t.length) {
                  var o,
                    l = t[c - 1];
                  if (!(null == (o = s[c]))) o.showZone(c, l.rectSize, l.slopeAngle);
                } else {
                  var u;
                  if (!(null == (u = s[c]))) u.reInitRender(c);
                }
            } else
              for (var c = 1; c <= module1057.MAX_COUNT_WALL_OR_FBZ; c++) {
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
                    o.handleFBZPanStart(s ? module1057.FbzType.RECT_TYPE_CARPET : module1057.FbzType.FBZ_TYPE_CARPET, c);
                  });
                  return {
                    v: c,
                  };
                }
              },
              f = 1;
            f <= module1057.MAX_COUNT_WALL_OR_FBZ;
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
          return this._getVisibleZonesCount(n) >= module1057.MAX_COUNT_WALL_OR_FBZ;
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

          for (var o = module1261._getRotateMaxRectSize(s[0]), l = 1; l <= module1057.MAX_COUNT_WALL_OR_FBZ; l++)
            if (n[l] && n[l].state.visible) {
              var u = {
                  rectSize: n[l].state.rectSize,
                  slopeAngle: n[l].state.slopeAngle,
                },
                c = module1261._getRotateMaxRectSize(u);

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

            if (module1261._isVerticalRotate((180 * u) / Math.PI)) {
              if (f + l.width / 2 < 0 || f - l.width / 2 > n || c + l.height / 2 < 0 || c - l.height / 2 > t) return true;
            } else if (f + l.height / 2 < 0 || f - l.height / 2 > n || c + l.width / 2 < 0 || c - l.width / 2 > t) return true;
          }

          return false;
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
            if (null == (o = t[s]) ? undefined : o.isVisible()) n++;
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
            if ((null == (o = n[t]) ? undefined : o.isVisible()) && (null == (l = n[t]) ? undefined : l.hasEdit()))
              s.push({
                rectSize: n[t].state.rectSize,
                slopeAngle: n[t].state.slopeAngle,
              });
          });
          return s;
        },
      },
      {
        key: 'getCarpetZoneView',
        value: function (t, n, s, o) {
          var l = this;
          return Object.keys(n).map(function (u, f) {
            return React.default.createElement(module1132.ForbiddenZone, {
              key: f,
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
              mapCarpetSaveEdit: l.props.mapCarpetSaveEdit,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = new y({
              xx: this.props.transform.xx || 1,
              yy: this.props.transform.yy || 1,
            }),
            n = this.props.mapMode == module1265.MAP_MODE_CARPET_EDIT && !module381.RSM.isRunning,
            s = this.props.subCarpetMode & module381.CarpetEditMode.CarpetIgnore,
            o = this.props.subCarpetMode & module381.CarpetEditMode.CarpetAdd;
          return React.default.createElement(
            module12.View,
            {
              style: A.container,
            },
            this.getCarpetZoneView(module1057.FbzType.RECT_TYPE_CARPET, this.customReferences, t, o && n),
            n && s && this.getCarpetZoneView(module1057.FbzType.FBZ_TYPE_CARPET, this.fbzReferences, t, true)
          );
        },
      },
    ]);
    return k;
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
  mapMode: module1265.MAP_MODE_REGULAR,
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
var A = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
