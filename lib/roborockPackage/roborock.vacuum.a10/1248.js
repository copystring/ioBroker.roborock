var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  PropTypes = require('prop-types'),
  module1239 = require('./1239'),
  module1233 = require('./1233'),
  module377 = require('./377'),
  module415 = require('./415'),
  module407 = require('./407');

function v() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (n) {
    return false;
  }
}

var y = module12.ART.Transform,
  module1247 = require('./1247'),
  module491 = require('./491').strings,
  module934 = require('./934'),
  module1233 = require('./1233'),
  module1245 = require('./1245'),
  P = (function (n) {
    module7.default(k, n);

    var PropTypes = k,
      P = v(),
      E = function () {
        var n,
          t = module11.default(PropTypes);

        if (P) {
          var l = module11.default(this).constructor;
          n = Reflect.construct(t, arguments, l);
        } else n = t.apply(this, arguments);

        return module9.default(this, n);
      };

    function k(n) {
      var t;
      module4.default(this, k);

      (t = E.call(this, n)).handleFBZPanOnShouldStart = function () {
        return t._enableEditMap();
      };

      t.handleFBZPanStart = function (n, l) {
        if (n == module1233.FbzType.FBZ_TYPE_REGULAR) {
          t._setMapZonesFocus(t.forbidReferences, l);

          t._clearMapZonesFocus(t.wallReferences);

          t._clearMapZonesFocus(t.moppingFbzReferences);

          t._clearMapZonesFocus(t.cleanFbzReferences);
        } else if (n == module1233.FbzType.FBZ_TYPE_MOPPING) {
          t._setMapZonesFocus(t.moppingFbzReferences, l);

          t._clearMapZonesFocus(t.wallReferences);

          t._clearMapZonesFocus(t.forbidReferences);

          t._clearMapZonesFocus(t.cleanFbzReferences);
        } else if (n == module1233.FbzType.FBZ_TYPE_CLEANING) {
          t._setMapZonesFocus(t.cleanFbzReferences, l);

          t._clearMapZonesFocus(t.wallReferences);

          t._clearMapZonesFocus(t.forbidReferences);

          t._clearMapZonesFocus(t.moppingFbzReferences);
        }
      };

      t.handleFBZPanEnd = function (n, l) {
        t._checkFBZInChargerOrRobot(n);

        if (!(null == t.props.handleFBZPanEnd)) t.props.handleFBZPanEnd(n, l);
      };

      t.handleRemoveFBZ = function (n, l) {
        return t.removeFBZone(n, l);
      };

      t.handleWallPanStart = function (n) {
        t._setMapZonesFocus(t.wallReferences, n);

        t._clearMapZonesFocus(t.forbidReferences);

        t._clearMapZonesFocus(t.moppingFbzReferences);

        t._clearMapZonesFocus(t.cleanFbzReferences);
      };

      t.handleWallPanEnd = function (n) {
        return t._checkWallInChargerOrRobot(n);
      };

      t.handleRemoveWall = function (n) {
        return t.removeWall(n);
      };

      t.forbidReferences = {
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
      t.moppingFbzReferences = {
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
      t.cleanFbzReferences = {
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
      t.wallReferences = {
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
      return t;
    }

    module5.default(k, [
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (n, t) {
          var l = this;

          if (!n.zonesHasEdited) {
            this._initWallRects(n.fbzWalls);

            this._initFBZones(n.fbzZones, module1233.FbzType.FBZ_TYPE_REGULAR);

            this._initFBZones(n.mopZones, module1233.FbzType.FBZ_TYPE_MOPPING);

            this._initFBZones(n.cleanZones, module1233.FbzType.FBZ_TYPE_CLEANING);
          }

          if (!this.FBZZoneInit && this.props.initFBZone) {
            module1247.setTimeout(function () {
              var n = l.getNewRectIndex(module1233.FbzType.FBZ_TYPE_REGULAR);

              if (n > 0) {
                l.addFBZZones(n, l.props.initFBZone, 0, module1233.FbzType.FBZ_TYPE_REGULAR);
                module1247.setTimeout(function () {
                  return l._checkFBZInChargerOrRobot(l.forbidReferences[n]);
                }, 200);
              }
            }, 500);
            this.FBZZoneInit = true;
          }
        },
      },
      {
        key: 'getNewWallIndex',
        value: function () {
          for (var n = this._getVisibleZonesCount(this.wallReferences), t = 1; t <= module1233.MAX_COUNT_WALL_OR_FBZ; t++)
            if (this.wallReferences[t] && 0 == this.wallReferences[t].state.visible && this.wallReferences[t].state.serial == n + 1) return t;

          return 0;
        },
      },
      {
        key: 'addWall',
        value: function (n, t, l) {
          this.wallReferences[n].addNew(t, l);
          this.handleWallPanStart(n);
        },
      },
      {
        key: 'removeWall',
        value: function (n) {
          this._removeMapZone(this.wallReferences, n);
        },
      },
      {
        key: 'clearWallsNewAddedFlag',
        value: function () {
          this._clearMapZonesNewAddedFlag(this.wallReferences);
        },
      },
      {
        key: 'clearWallFocus',
        value: function () {
          this._clearMapZonesFocus(this.wallReferences);
        },
      },
      {
        key: 'isWallsReachMaxNum',
        value: function () {
          return this._getVisibleZonesCount(this.wallReferences) >= module1233.MAX_COUNT_WALL_OR_FBZ;
        },
      },
      {
        key: 'getVisibleWalls',
        value: function () {
          var n = this,
            t = [];
          Object.keys(this.wallReferences).map(function (l) {
            var s;
            if (null == (s = n.wallReferences[l]) ? undefined : s.isVisible()) t.push(n.wallReferences[l]);
          });
          if (t.length <= 0) return [];
          else {
            t.sort(function (n, t) {
              return n.state.serial - t.state.serial;
            });
            return t;
          }
        },
      },
      {
        key: 'getNewRectIndex',
        value: function (n) {
          for (var t = this._getFbzRefsByType(n), l = this._getVisibleZonesCount(t), s = 1; s <= module1233.MAX_COUNT_WALL_OR_FBZ; s++)
            if (t[s] && 0 == t[s].state.visible && t[s].state.serial == l + 1) return s;

          return 0;
        },
      },
      {
        key: 'addFBZZones',
        value: function (n, t, l, s) {
          var o,
            u = this;
          if (!(null == (o = this._getFbzRefsByType(s)[n])))
            o.addNew(t, l, function () {
              u.handleFBZPanStart(s, n);
            });
        },
      },
      {
        key: 'removeFBZone',
        value: function (n, t) {
          var l = this._getFbzRefsByType(n);

          if (l) this._removeMapZone(l, t);
        },
      },
      {
        key: 'clearFBZonesFocus',
        value: function (n) {
          var t = this._getFbzRefsByType(n);

          if (t) this._clearMapZonesFocus(t);
        },
      },
      {
        key: 'clearFBZonesNewAddedFlag',
        value: function (n) {
          var t = this._getFbzRefsByType(n);

          if (t) this._clearMapZonesNewAddedFlag(t);
        },
      },
      {
        key: 'isFBZsReachMaxNum',
        value: function (n) {
          var t = this._getFbzRefsByType(n);

          return !!t && this._getVisibleZonesCount(t) >= module1233.MAX_COUNT_WALL_OR_FBZ;
        },
      },
      {
        key: 'getVisibleFBZZones',
        value: function () {
          for (var n = [], t = 1; t <= module1233.MAX_COUNT_WALL_OR_FBZ; t++) {
            var l, s, o;
            if (null != (l = this.forbidReferences[t]) && l.isVisible()) n.push(this.forbidReferences[t]);
            if (null != (s = this.moppingFbzReferences[t]) && s.isVisible()) n.push(this.moppingFbzReferences[t]);
            if (null != (o = this.cleanFbzReferences[t]) && o.isVisible()) n.push(this.cleanFbzReferences[t]);
          }

          if (n.length <= 0) return [];
          else {
            n.sort(function (n, t) {
              return n.state.serial - t.state.serial;
            });
            return n;
          }
        },
      },
      {
        key: 'isAllZonesReachMaxNum',
        value: function () {
          return (
            this._getVisibleZonesCount(this.wallReferences) +
              this._getVisibleZonesCount(this.forbidReferences) +
              this._getVisibleZonesCount(this.moppingFbzReferences) +
              this._getVisibleZonesCount(this.cleanFbzReferences) >=
            3 * module1233.MAX_COUNT_WALL_OR_FBZ
          );
        },
      },
      {
        key: 'checkAllInChargerOrRobot',
        value: function () {
          for (var n = this, t = 0, l = 1; l <= module1233.MAX_COUNT_WALL_OR_FBZ; l++)
            if (this.wallReferences[l] && this.wallReferences[l].state.visible) {
              var s = this._checkWallInChargerOrRobot(this.wallReferences[l]);

              if (1 == s) return 1;
              if (2 == s) t = 2;
            }

          var o = [this.forbidReferences, this.moppingFbzReferences, this.cleanFbzReferences];

          for (l = 1; l <= module1233.MAX_COUNT_WALL_OR_FBZ; l++)
            o.map(function (s) {
              if (s[l] && s[l].state.visible) {
                var o = n._checkFBZInChargerOrRobot(s[l]);

                if (1 == o) return 1;
                if (2 == o) t = 2;
              }
            });

          return t;
        },
      },
      {
        key: 'clearAllFBZEditFocus',
        value: function () {
          this._clearMapZonesFocus(this.forbidReferences);

          this._clearMapZonesFocus(this.wallReferences);

          this._clearMapZonesFocus(this.moppingFbzReferences);

          this._clearMapZonesFocus(this.cleanFbzReferences);
        },
      },
      {
        key: 'clearAllNewAddedFBZFlag',
        value: function () {
          this._clearMapZonesNewAddedFlag(this.wallReferences);

          this._clearMapZonesNewAddedFlag(this.forbidReferences);

          this._clearMapZonesNewAddedFlag(this.moppingFbzReferences);

          this._clearMapZonesNewAddedFlag(this.cleanFbzReferences);
        },
      },
      {
        key: '_enableEditMap',
        value: function () {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(module407.default.startEditMap());

                  case 3:
                    n.next = 8;
                    break;

                  case 5:
                    n.prev = 5;
                    n.t0 = n.catch(0);
                    console.warn('network issue');

                  case 8:
                  case 'end':
                    return n.stop();
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
        key: '_initWallRects',
        value: function (n) {
          if (n && 0 != n.length) {
            for (o = 1; o <= module1233.MAX_COUNT_WALL_OR_FBZ; o++)
              if (o <= n.length) {
                var t,
                  l = n[o - 1];
                if (!(null == (t = this.wallReferences[o]))) t.showWall(o, l.start, l.end);
              } else {
                var s;
                if (!(null == (s = this.wallReferences[o]))) s.reInitRender(o);
              }
          } else
            for (var o = 1; o <= module1233.MAX_COUNT_WALL_OR_FBZ; o++) {
              var u;
              if (!(null == (u = this.wallReferences[o]))) u.reInitRender(o);
            }
        },
      },
      {
        key: '_initFBZones',
        value: function (n, t) {
          var l = this._getFbzRefsByType(t);

          if (l)
            if (n && 0 != n.length) {
              for (c = 1; c <= module1233.MAX_COUNT_WALL_OR_FBZ; c++)
                if (c <= n.length) {
                  var s,
                    o = n[c - 1];
                  if (!(null == (s = l[c]))) s.showZone(c, o.rectSize, o.slopeAngle);
                } else {
                  var u;
                  if (!(null == (u = l[c]))) u.reInitRender(c);
                }
            } else
              for (var c = 1; c <= module1233.MAX_COUNT_WALL_OR_FBZ; c++) {
                var f;
                if (!(null == (f = l[c]))) f.reInitRender(c);
              }
        },
      },
      {
        key: '_getFbzRefsByType',
        value: function (n) {
          return n == module1233.FbzType.FBZ_TYPE_REGULAR
            ? this.forbidReferences
            : n == module1233.FbzType.FBZ_TYPE_MOPPING
            ? this.moppingFbzReferences
            : n == module1233.FbzType.FBZ_TYPE_CLEANING
            ? this.cleanFbzReferences
            : null;
        },
      },
      {
        key: '_removeMapZone',
        value: function (n, t) {
          if (n[t].state.visible) {
            for (var l = this._getVisibleZonesCount(n), s = 1; s <= module1233.MAX_COUNT_WALL_OR_FBZ; s++)
              n[s] &&
                n[s].state.visible &&
                n[s].state.serial > n[t].state.serial &&
                n[s] &&
                n[s].setState({
                  serial: n[s].state.serial - 1,
                });

            if (n[t])
              n[t].setState({
                visible: false,
                newAdded: false,
                isFocus: false,
                serial: l,
              });
          }
        },
      },
      {
        key: '_setMapZonesFocus',
        value: function (n, t) {
          Object.keys(n).map(function (l) {
            var s,
              o = l == t;
            if (!(null == (s = n[l])))
              s.setState({
                isFocus: o,
              });
          });
        },
      },
      {
        key: '_clearMapZonesFocus',
        value: function (n) {
          Object.keys(n).map(function (t) {
            var l;
            if (!(null == (l = n[t])))
              l.setState({
                isFocus: false,
              });
          });
        },
      },
      {
        key: '_clearMapZonesNewAddedFlag',
        value: function (n) {
          Object.keys(n).map(function (t) {
            var l;
            if (!(null == (l = n[t]) || null == l.resetChanged)) l.resetChanged();
          });
        },
      },
      {
        key: '_getVisibleZonesCount',
        value: function (n) {
          var t = 0;
          Object.keys(n).map(function (l) {
            var s;
            if (null != (s = n[l]) && s.isVisible()) t++;
          });
          return t;
        },
      },
      {
        key: '_checkFBZInChargerOrRobot',
        value: function (n) {
          if (this._ifFBZInTarget(n, false)) {
            globals.showToast(module491.map_edit_forbidden_too_close_to_dock);
            return 2;
          } else return this._ifFBZInTarget(n, true) ? 1 : 0;
        },
      },
      {
        key: '_ifFBZInTarget',
        value: function (n, t) {
          var l,
            s,
            o = null == (l = (s = this.props).getTargetPos) ? undefined : l.call(s, t),
            u = t ? module1233.ROBOT_FORBIDDEN_R : module1233.DOCK_FORBIDDEN_R;
          return !(!o || (0 == o.x && 0 == o.y)) && module1245._judgeInlegalFBZ(o.x, o.y, n, u * this.props.transform.xx);
        },
      },
      {
        key: '_checkWallInChargerOrRobot',
        value: function (n) {
          if (this._ifWallInTarget(n, false)) {
            globals.showToast(module491.map_edit_virtual_wall_too_close_to_dock);
            return 2;
          } else return this._ifWallInTarget(n, true) ? 1 : 0;
        },
      },
      {
        key: '_ifWallInTarget',
        value: function (n, t) {
          var l,
            s,
            o = null == (l = (s = this.props).getTargetPos) ? undefined : l.call(s, t),
            u = t ? module1233.ROBOT_FORBIDDEN_R : module1233.DOCK_FORBIDDEN_R;
          if (!o || (0 == o.x && 0 == o.y)) return false;

          var c = module1245._convertToPixelPosition(n.state.position, this.props.transform);

          return module1245._disBtwPointSegement(o.x, o.y, c.start.x, c.start.y, c.end.x, c.end.y).distance / this.props.transform.xx < u;
        },
      },
      {
        key: 'getForbiddenZone',
        value: function (n, t, l) {
          var s = this,
            o = this.props.mapMode == module934.MAP_MODE_MAP_EDIT;
          return Object.keys(t).map(function (u, c) {
            return React.default.createElement(module1239.ForbiddenZone, {
              key: c,
              id: u,
              type: n,
              mapDeg: s.props.mapDeg,
              ref: function (n) {
                return (t[u] = n);
              },
              transform: l,
              editable: o,
              showArea: s.props.mapMode == module934.MAP_MODE_MAP_EDIT,
              handlePanOnShouldStart: s.handleFBZPanOnShouldStart,
              handlePanStart: s.handleFBZPanStart,
              handlePanEnd: s.handleFBZPanEnd,
              handleRemoveFBZ: s.handleRemoveFBZ,
              mapEditPageDidChange: s.props.mapEditPageDidChange,
              checkAndroidOverflow: s.props.checkAndroidOverflow,
            });
          });
        },
      },
      {
        key: 'getInvisibleWall',
        value: function (n) {
          var t = this,
            l = this.props.mapMode == module934.MAP_MODE_MAP_EDIT;
          return Object.keys(this.wallReferences).map(function (s, o) {
            return React.default.createElement(module1239.InvisibleWall, {
              key: o,
              id: s,
              mapDeg: t.props.mapDeg,
              ref: function (n) {
                return (t.wallReferences[s] = n);
              },
              transform: n,
              editable: l,
              handlePanOnShouldStart: t.handleFBZPanOnShouldStart,
              handlePanStart: t.handleWallPanStart,
              handlePanEnd: t.handleWallPanEnd,
              handleRemoveWall: t.handleRemoveWall,
              mapEditPageDidChange: t.props.mapEditPageDidChange,
              checkAndroidOverflow: t.props.checkAndroidOverflow,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var n = new y({
              xx: this.props.transform.xx || 1,
              yy: this.props.transform.yy || 1,
            }),
            t =
              this.props.alwaysShowFBZ ||
              this.props.mapMode == module934.MAP_MODE_MAP_EDIT ||
              !module377.RSM.isRunning ||
              (module377.RSM.isRunning && module377.RSM.isMopForbiddenEnabled),
            l =
              module415.DMM.isGarnet &&
              (this.props.mapMode == module934.MAP_MODE_MAP_EDIT || !module377.RSM.isRunning || (module377.RSM.isRunning && module377.RSM.isCleanFBZEnabled));
          return React.default.createElement(
            module12.View,
            {
              style: w.container,
            },
            this.getInvisibleWall(n),
            this.getForbiddenZone(module1233.FbzType.FBZ_TYPE_REGULAR, this.forbidReferences, n),
            l && this.getForbiddenZone(module1233.FbzType.FBZ_TYPE_CLEANING, this.cleanFbzReferences, n),
            t && this.getForbiddenZone(module1233.FbzType.FBZ_TYPE_MOPPING, this.moppingFbzReferences, n)
          );
        },
      },
    ]);
    return k;
  })(React.default.Component);

exports.default = P;
P.propTypes = {
  mapEditPageDidChange: PropTypes.default.func,
  checkAndroidOverflow: PropTypes.default.func,
};
P.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module934.MAP_MODE_REGULAR,
  walls: null,
  fbzZones: null,
  mopZones: null,
  cleanZones: null,
  initFBZone: null,
  zonesHasEdited: false,
  mapEditPageDidChange: function () {},
  checkAndroidOverflow: function () {},
};
var w = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
