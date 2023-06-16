var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types'),
  module1211 = require('./1211'),
  module1127 = require('./1127'),
  module381 = require('./381'),
  module1125 = require('./1125'),
  module1198 = require('./1198');

function Z() {
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

var module1421 = require('./1421'),
  E = module13.ART.Transform,
  module1344 = require('./1344'),
  module1127 = require('./1127'),
  module1340 = require('./1340'),
  A = (function (t) {
    module9.default(S, t);

    var PropTypes = S,
      A = Z(),
      k = function () {
        var t,
          n = module12.default(PropTypes);

        if (A) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function S(t) {
      var s;
      module6.default(this, S);

      (s = k.call(this, t)).handleFBZPanOnShouldStart = function () {
        return module1125.MapEditCommonService.enableEditMap();
      };

      s.handleFBZPanStart = function (t, n) {
        var o = null;

        if (t == module1127.FbzType.FBZ_TYPE_CARPET) {
          s._setCarpetZonesFocus(s.fbzReferences, n);

          s._clearCarpetZonesFocus(s.customReferences);

          o = s.fbzReferences[n];
        } else if (t == module1127.FbzType.RECT_TYPE_CARPET) {
          s._setCarpetZonesFocus(s.customReferences, n);

          s._clearCarpetZonesFocus(s.fbzReferences);

          o = s.customReferences[n];
        }

        if (o) null == s.props.mapCarpetFocusCallback || s.props.mapCarpetFocusCallback(o.state.newAdded, t == module1127.FbzType.FBZ_TYPE_CARPET);
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
      s.state = {
        ignoreZones: null,
        customZones: null,
      };
      return s;
    }

    module7.default(S, [
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, n) {
          var s = this;
          if (!t.ignoreCarpetEdited) this.initCarpetZones(n.ignoreZones, false);
          if (!t.cusCarpetEdited) this.initCarpetZones(n.customZones, true);

          if (!this.ignoreZoneInit && this.props.initFBZone) {
            module1421.setTimeout(function () {
              s.addCarpetZones(s.props.initFBZone, 0, false);
            }, 500);
            this.ignoreZoneInit = true;
          }
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !module1340.objectShallowEqual(this.props, t, true) || !module1340.objectShallowEqual(this.state, n, true);
        },
      },
      {
        key: 'initCarpetZones',
        value: function (t, n) {
          var s = n ? this.customReferences : this.fbzReferences;
          if (s)
            if (t && 0 != t.length) {
              for (c = 1; c <= module1127.MAX_COUNT_WALL_OR_FBZ; c++)
                if (c <= t.length) {
                  var o,
                    u = t[c - 1];
                  if (!(null == (o = s[c]))) o.showZone(c, u.rectSize, u.slopeAngle);
                } else {
                  var l;
                  if (!(null == (l = s[c]))) l.reInitRender(c);
                }
            } else
              for (var c = 1; c <= module1127.MAX_COUNT_WALL_OR_FBZ; c++) {
                var p;
                if (!(null == (p = s[c]))) p.reInitRender(c);
              }
        },
      },
      {
        key: 'addCarpetZones',
        value: function (t, n, s) {
          for (
            var o = this,
              u = s ? this.customReferences : this.fbzReferences,
              l = this._getVisibleZonesCount(u),
              c = function (c) {
                if (u[c] && 0 == u[c].state.visible && u[c].state.serial == l + 1) {
                  u[c].addNew(t, n, function () {
                    o.handleFBZPanStart(s ? module1127.FbzType.RECT_TYPE_CARPET : module1127.FbzType.FBZ_TYPE_CARPET, c);
                  });
                  return {
                    v: c,
                  };
                }
              },
              p = 1;
            p <= module1127.MAX_COUNT_WALL_OR_FBZ;
            p++
          ) {
            var f = c(p);
            if ('object' == typeof f) return f.v;
          }

          return 0;
        },
      },
      {
        key: 'updateCarpet',
        value: function (t, n) {
          this.setState({
            ignoreZones: n,
            customZones: t,
          });
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
          return this._getVisibleZonesCount(n) >= module1127.MAX_COUNT_WALL_OR_FBZ;
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
        key: 'getCustomCarpets',
        value: function () {
          return this.state.customZones;
        },
      },
      {
        key: 'isEditCarpetOverlap',
        value: function (t) {
          var n = t ? this.fbzReferences : this.customReferences,
            s = this._getEditedCarpetZones(t);

          if (!s || s.length <= 0) return false;

          for (var o = module1340._getRotateMaxRectSize(s[0]), u = 1; u <= module1127.MAX_COUNT_WALL_OR_FBZ; u++)
            if (n[u] && n[u].state.visible) {
              var l = {
                  rectSize: n[u].state.rectSize,
                  slopeAngle: n[u].state.slopeAngle,
                },
                c = module1340._getRotateMaxRectSize(l);

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
            var u = s[o].rectSize,
              l = s[o].slopeAngle,
              c = u.x + u.width / 2,
              p = u.y + u.height / 2;

            if (module1340._isVerticalRotate((180 * l) / Math.PI)) {
              if (p + u.width / 2 < 0 || p - u.width / 2 > n || c + u.height / 2 < 0 || c - u.height / 2 > t) return true;
            } else if (p + u.height / 2 < 0 || p - u.height / 2 > n || c + u.width / 2 < 0 || c - u.width / 2 > t) return true;
          }

          return false;
        },
      },
      {
        key: '_setCarpetZonesFocus',
        value: function (t, n) {
          Object.keys(t).map(function (s) {
            var o,
              u = s == n;
            if (!(null == (o = t[s]))) o.setFocus(u);
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
            var o, u;
            if ((null == (o = n[t]) ? undefined : o.isVisible()) && (null == (u = n[t]) ? undefined : u.hasEdit()))
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
          var u = this;
          return Object.keys(n).map(function (l, p) {
            return React.default.createElement(module1211.ForbiddenZone, {
              key: p,
              id: l,
              type: t,
              mapDeg: u.props.mapDeg,
              ref: function (t) {
                return (n[l] = t);
              },
              transform: s,
              editable: o,
              handlePanOnShouldStart: u.handleFBZPanOnShouldStart,
              handlePanStart: u.handleFBZPanStart,
              handlePanEnd: u.props.handleFBZPanEnd,
              mapEditPageDidChange: u.props.mapEditPageDidChange,
              checkAndroidOverflow: u.props.checkAndroidOverflow,
              mapCarpetSaveEdit: u.props.mapCarpetSaveEdit,
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
            n = this.props.mapMode == module1344.MAP_MODE_CARPET_EDIT && !module381.RSM.isRunning,
            s = !!(this.props.subCarpetMode & module1198.CarpetEditMode.CarpetIgnore),
            o = !!(this.props.subCarpetMode & module1198.CarpetEditMode.CarpetAdd);
          return React.default.createElement(
            module13.View,
            {
              style: T.container,
            },
            this.getCarpetZoneView(module1127.FbzType.RECT_TYPE_CARPET, this.customReferences, t, o && n),
            n && s && this.getCarpetZoneView(module1127.FbzType.FBZ_TYPE_CARPET, this.fbzReferences, t, true)
          );
        },
      },
    ]);
    return S;
  })(React.default.Component);

exports.default = A;
A.propTypes = {
  handleFBZPanEnd: PropTypes.default.func,
  mapEditPageDidChange: PropTypes.default.func,
  mapCarpetFocusCallback: PropTypes.default.func,
  checkAndroidOverflow: PropTypes.default.func,
};
A.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapRect: {},
  mapMode: module1344.MAP_MODE_REGULAR,
  initFBZone: null,
  ignoreCarpetEdited: false,
  cusCarpetEdited: false,
  handleFBZPanEnd: function () {},
  mapEditPageDidChange: function () {},
  mapCarpetFocusCallback: function () {},
  checkAndroidOverflow: function () {},
};
var T = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
