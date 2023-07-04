var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1393 = require('./1393'),
  module1332 = require('./1332'),
  module381 = require('./381'),
  module414 = require('./414');

function y() {
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

var module1404 = require('./1404'),
  b = module12.ART.Transform,
  module1153 = require('./1153'),
  module1332 = require('./1332'),
  module1402 = require('./1402'),
  A = (function (t) {
    module7.default(O, t);

    var PropTypes = O,
      A = y(),
      k = function () {
        var t,
          n = module11.default(PropTypes);

        if (A) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var n;
      module4.default(this, O);

      (n = k.call(this, t)).handleFBZPanOnShouldStart = function () {
        return n._enableEditMap();
      };

      n.handleFBZPanStart = function (t, s) {
        var o = null;

        if (t == module1332.FbzType.FBZ_TYPE_CARPET) {
          n._setCarpetZonesFocus(n.fbzReferences, s);

          n._clearCarpetZonesFocus(n.customReferences);

          o = n.fbzReferences[s];
        } else if (t == module1332.FbzType.RECT_TYPE_CARPET) {
          n._setCarpetZonesFocus(n.customReferences, s);

          n._clearCarpetZonesFocus(n.fbzReferences);

          o = n.customReferences[s];
        }

        if (o) null == n.props.mapCarpetFocusCallback || n.props.mapCarpetFocusCallback(o.state.newAdded, t == module1332.FbzType.FBZ_TYPE_CARPET);
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

    module5.default(O, [
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (t, n) {
          var s = this;
          if (!t.ignoreCarpetEdited) this.initCarpetZones(t.cfbZones, false);
          if (!t.cusCarpetEdited) this.initCarpetZones(t.cusCarpetZones, true);

          if (!this.ignoreZoneInit && this.props.initFBZone) {
            module1404.setTimeout(function () {
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
              for (c = 1; c <= module1332.MAX_COUNT_WALL_OR_FBZ; c++)
                if (c <= t.length) {
                  var o,
                    u = t[c - 1];
                  if (!(null == (o = s[c]))) o.showZone(c, u.rectSize, u.slopeAngle);
                } else {
                  var l;
                  if (!(null == (l = s[c]))) l.reInitRender(c);
                }
            } else
              for (var c = 1; c <= module1332.MAX_COUNT_WALL_OR_FBZ; c++) {
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
              u = s ? this.customReferences : this.fbzReferences,
              l = this._getVisibleZonesCount(u),
              c = function (c) {
                if (u[c] && 0 == u[c].state.visible && u[c].state.serial == l + 1) {
                  u[c].addNew(t, n, function () {
                    o.handleFBZPanStart(s ? module1332.FbzType.RECT_TYPE_CARPET : module1332.FbzType.FBZ_TYPE_CARPET, c);
                  });
                  return {
                    v: c,
                  };
                }
              },
              f = 1;
            f <= module1332.MAX_COUNT_WALL_OR_FBZ;
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
          return this._getVisibleZonesCount(n) >= module1332.MAX_COUNT_WALL_OR_FBZ;
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

          for (var o = module1402._getRotateMaxRectSize(s[0]), u = 1; u <= module1332.MAX_COUNT_WALL_OR_FBZ; u++)
            if (n[u] && n[u].state.visible) {
              var l = {
                  rectSize: n[u].state.rectSize,
                  slopeAngle: n[u].state.slopeAngle,
                },
                c = module1402._getRotateMaxRectSize(l);

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
              f = u.y + u.height / 2;

            if (module1402._isVerticalRotate((180 * l) / Math.PI)) {
              if (f + u.width / 2 < 0 || f - u.width / 2 > n || c + u.height / 2 < 0 || c - u.height / 2 > t) return true;
            } else if (f + u.height / 2 < 0 || f - u.height / 2 > n || c + u.width / 2 < 0 || c - u.width / 2 > t) return true;
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
                    return regeneratorRuntime.default.awrap(module414.default.startEditMap());

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
          return Object.keys(n).map(function (l, c) {
            return React.default.createElement(module1393.ForbiddenZone, {
              key: c,
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
          var t = new b({
              xx: this.props.transform.xx || 1,
              yy: this.props.transform.yy || 1,
            }),
            n = this.props.mapMode == module1153.MAP_MODE_CARPET_EDIT && !module381.RSM.isRunning,
            s = this.props.subCarpetMode & module381.CarpetEditMode.CarpetIgnore,
            o = this.props.subCarpetMode & module381.CarpetEditMode.CarpetAdd;
          return React.default.createElement(
            module12.View,
            {
              style: T.container,
            },
            this.getCarpetZoneView(module1332.FbzType.RECT_TYPE_CARPET, this.customReferences, t, o && n),
            n && s && this.getCarpetZoneView(module1332.FbzType.FBZ_TYPE_CARPET, this.fbzReferences, t, true)
          );
        },
      },
    ]);
    return O;
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
  mapMode: module1153.MAP_MODE_REGULAR,
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
var T = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
