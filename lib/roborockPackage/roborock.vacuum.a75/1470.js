var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  PropTypes = require('prop-types'),
  module381 = require('./381'),
  module424 = require('./424'),
  module1199 = require('./1199'),
  module1210 = require('./1210'),
  module1126 = require('./1126'),
  module1349 = require('./1349');

function y() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if ('function' == typeof Proxy) return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (n) {
    return false;
  }
}

var module1420 = require('./1420'),
  M = module13.ART.Transform,
  module510 = require('./510').strings,
  module1343 = require('./1343'),
  module1339 = require('./1339'),
  E = (function (n) {
    module9.default(E, n);

    var t = E,
      PropTypes = y(),
      R = function () {
        var n,
          l = module12.default(t);

        if (PropTypes) {
          var s = module12.default(this).constructor;
          n = Reflect.construct(l, arguments, s);
        } else n = l.apply(this, arguments);

        return module11.default(this, n);
      };

    function E(n) {
      var t;
      module6.default(this, E);

      (t = R.call(this, n)).handleFBZPanOnShouldStart = function () {
        return module1349.default.enableEditMap();
      };

      t.handleFBZPanStart = function (n, l) {
        if (n == module1126.FbzType.FBZ_TYPE_REGULAR) {
          t._setMapZonesFocus(t.forbidReferences, l);

          t._clearMapZonesFocus(t.wallReferences);

          t._clearMapZonesFocus(t.moppingFbzReferences);

          t._clearMapZonesFocus(t.cleanFbzReferences);
        } else if (n == module1126.FbzType.FBZ_TYPE_MOPPING) {
          t._setMapZonesFocus(t.moppingFbzReferences, l);

          t._clearMapZonesFocus(t.wallReferences);

          t._clearMapZonesFocus(t.forbidReferences);

          t._clearMapZonesFocus(t.cleanFbzReferences);
        } else if (n == module1126.FbzType.FBZ_TYPE_CLEANING) {
          t._setMapZonesFocus(t.cleanFbzReferences, l);

          t._clearMapZonesFocus(t.wallReferences);

          t._clearMapZonesFocus(t.forbidReferences);

          t._clearMapZonesFocus(t.moppingFbzReferences);
        }

        t._clearAllCliffsFocus();
      };

      t.handleFBZPanEnd = function (n, l) {
        t._checkFBZInChargerOrRobot(n);

        if (!(null == t.props.handleFBZPanEnd)) t.props.handleFBZPanEnd(n, l);
      };

      t.handleRemoveFBZ = function (n, l) {
        return t.removeFBZone(n, l);
      };

      t.handleRectAndAngleChanged = function (n) {
        return t._tagAIFBZEdited(n);
      };

      t.handleWallPanStart = function (n) {
        t._setMapZonesFocus(t.wallReferences, n);

        t._clearMapZonesFocus(t.forbidReferences);

        t._clearMapZonesFocus(t.moppingFbzReferences);

        t._clearMapZonesFocus(t.cleanFbzReferences);

        t._clearAllCliffsFocus();
      };

      t.handleWallPanEnd = function (n) {
        return t._checkWallInChargerOrRobot(n);
      };

      t.handleRemoveWall = function (n) {
        return t.removeWall(n);
      };

      t.cliffPanOnShouldStart = function () {
        module1349.default.enableEditMap();
        return true;
      };

      t.cliffPanStart = function (n) {
        t.setState({
          cliffFocusId: n,
        });

        t._clearMapZonesFocus(t.wallReferences);

        t._clearMapZonesFocus(t.forbidReferences);

        t._clearMapZonesFocus(t.moppingFbzReferences);

        t._clearMapZonesFocus(t.cleanFbzReferences);
      };

      t.cliffDelete = function (n) {
        return t._removeCliffPoints(n);
      };

      t.cliffUpdateRect = function (n, l) {
        t._updataCliffData(n, l, null);
      };

      t.cliffUpdateAngle = function (n, l) {
        t._updataCliffData(n, null, l);
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
      t.cliffDelFlag = false;
      t.state = {
        cliffData: n.cliffZones || [],
        cliffFocusId: t._initCliffFocusId(),
      };
      return t;
    }

    module7.default(E, [
      {
        key: 'UNSAFE_componentWillUpdate',
        value: function (n, t) {
          if (!n.zonesHasEdited) {
            this._initWallRects(n.fbzWalls);

            this._initFBZones(n.fbzZones, module1126.FbzType.FBZ_TYPE_REGULAR);

            this._initFBZones(n.mopZones, module1126.FbzType.FBZ_TYPE_MOPPING);

            this._initFBZones(n.cleanZones, module1126.FbzType.FBZ_TYPE_CLEANING);
          }

          this._addInitFBZ();
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (n) {
          if (!n.zonesHasEdited) {
            this.setState({
              cliffData: n.cliffZones || [],
            });
            this.changed = false;
            this.cliffDelFlag = false;
          }
        },
      },
      {
        key: 'getNewWallIndex',
        value: function () {
          for (var n = this._getVisibleZonesCount(this.wallReferences), t = 1; t <= module1126.MAX_COUNT_WALL_OR_FBZ; t++)
            if (this.wallReferences[t] && 0 == this.wallReferences[t].state.visible && this.wallReferences[t].state.serial == n + 1) return t;

          return 0;
        },
      },
      {
        key: 'addWall',
        value: function (n, t, l) {
          var s = this;
          this.wallReferences[n].addNew(t, l, function () {
            s.handleWallPanStart(n);
          });
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
          return this._getVisibleZonesCount(this.wallReferences) >= module1126.MAX_COUNT_WALL_OR_FBZ;
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
          for (var t = this._getFbzRefsByType(n), l = this._getVisibleZonesCount(t), s = 1; s <= module1126.MAX_COUNT_WALL_OR_FBZ; s++)
            if (t[s] && 0 == t[s].state.visible && t[s].state.serial == l + 1) return s;

          return 0;
        },
      },
      {
        key: 'addFBZZones',
        value: function (n, t, l, s) {
          var o,
            c,
            u = this,
            f = arguments.length > 4 && undefined !== arguments[4] && arguments[4],
            h = this._getFbzRefsByType(s);

          if (
            (null == (o = h[n]) ||
              o.addNew(t, l, function () {
                u.handleFBZPanStart(s, n);
              }),
            f)
          ) {
            this.AIFbzId = n;
            if (!(null == (c = h[n]))) c.setAITag(true);
          }
        },
      },
      {
        key: 'removeFBZone',
        value: function (n, t) {
          var l = this._getFbzRefsByType(n);

          if (l) this._removeMapZone(l, t);

          this._tagAIFBZEdited(t);
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

          return !!t && this._getVisibleZonesCount(t) >= module1126.MAX_COUNT_WALL_OR_FBZ;
        },
      },
      {
        key: 'getVisibleFBZZones',
        value: function () {
          for (var n = [], t = 1; t <= module1126.MAX_COUNT_WALL_OR_FBZ; t++) {
            var l, s, o;
            if (null == (l = this.forbidReferences[t]) ? undefined : l.isVisible()) n.push(this.forbidReferences[t]);
            if (null == (s = this.moppingFbzReferences[t]) ? undefined : s.isVisible()) n.push(this.moppingFbzReferences[t]);
            if (null == (o = this.cleanFbzReferences[t]) ? undefined : o.isVisible()) n.push(this.cleanFbzReferences[t]);
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
        key: 'getEditStuckPoint',
        value: function () {
          return this.AIFbzEdit && this.props.initStuckPt ? [this.props.initStuckPt] : null;
        },
      },
      {
        key: 'getEditCliffZones',
        value: function () {
          var n = this.state.cliffData;
          return !n || n.length <= 0
            ? []
            : this.state.cliffData.filter(function (n) {
                return true === n.changed;
              });
        },
      },
      {
        key: 'getNoEditCliffZones',
        value: function () {
          var n = this.state.cliffData;
          return !n || n.length <= 0
            ? []
            : this.state.cliffData.filter(function (n) {
                return !n.changed;
              });
        },
      },
      {
        key: 'isDeleteCliff',
        value: function () {
          return this.cliffDelFlag;
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
            3 * module1126.MAX_COUNT_WALL_OR_FBZ
          );
        },
      },
      {
        key: 'checkAllInChargerOrRobot',
        value: function () {
          for (var n = 0, t = 1; t <= module1126.MAX_COUNT_WALL_OR_FBZ; t++)
            if (this.wallReferences[t] && this.wallReferences[t].state.visible) {
              var l = this._checkWallInChargerOrRobot(this.wallReferences[t]);

              if (1 == l) return 1;
              if (2 == l) n = 2;
            }

          var s = [this.forbidReferences, this.moppingFbzReferences, this.cleanFbzReferences];

          for (t = 1; t <= module1126.MAX_COUNT_WALL_OR_FBZ; t++)
            for (var o = 0; o < s.length; o++) {
              var c = s[o];

              if (c[t] && c[t].state.visible) {
                var u = this._checkFBZInChargerOrRobot(c[t]);

                if (1 == u) return 1;
                if (2 == u) n = 2;
              }
            }

          return n;
        },
      },
      {
        key: 'clearAllFBZEditFocus',
        value: function () {
          this._clearMapZonesFocus(this.forbidReferences);

          this._clearMapZonesFocus(this.wallReferences);

          this._clearMapZonesFocus(this.moppingFbzReferences);

          this._clearMapZonesFocus(this.cleanFbzReferences);

          this._clearAllCliffsFocus();
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
        key: '_updataCliffData',
        value: function (n, t, l) {
          var s = this.state.cliffData;
          if (s && !(s.length <= 0))
            if (this.isFBZsReachMaxNum(module1126.FbzType.FBZ_TYPE_REGULAR) || this.isAllZonesReachMaxNum()) globals.showToast(module510.map_edit_forbidden_zone_exceed_limit);
            else {
              var o = s.findIndex(function (t) {
                return t.id == n;
              });

              if (-1 != o) {
                if (null != t) s[o].rectSize = t;
                if (null != l && undefined !== l) s[o].slopeAngle = l;
                s[o].changed = true;
                this.setState({
                  cliffData: s,
                });

                this._setChanged();
              }
            }
        },
      },
      {
        key: '_removeCliffPoints',
        value: function (n) {
          var t = this.state.cliffData;

          if (t && 0 != t.length) {
            var l = t.findIndex(function (t) {
              return t.id == n;
            });

            if (-1 != l) {
              t.splice(l, 1);
              this.setState({
                cliffData: t,
              });

              this._setChanged();

              this.cliffDelFlag = true;
            }
          } else
            this.setState({
              cliffData: [],
            });
        },
      },
      {
        key: '_clearAllCliffsFocus',
        value: function () {
          this.setState({
            cliffFocusId: -9999,
          });
        },
      },
      {
        key: '_setChanged',
        value: function () {
          var n, t;

          if (!this.changed) {
            this.changed = true;
            if (!(null == (n = (t = this.props).mapEditPageDidChange))) n.call(t);
          }
        },
      },
      {
        key: '_tagAIFBZEdited',
        value: function (n) {
          if (n == this.AIFbzId) this.AIFbzEdit = true;
        },
      },
      {
        key: '_addInitFBZ',
        value: function () {
          var n = this,
            t = false,
            l = null,
            s = false,
            o = 0;

          if ((!this.FBZZoneInit && this.props.initFBZone && ((t = true), (l = this.props.initFBZone), (this.FBZZoneInit = true)), !this.stuckPtInit && this.props.initStuckPt)) {
            var c,
              u = this.props.initStuckPt;
            this.stuckPtInit = true;
            t = true;
            this.AIFbzEdit = true;

            if ((null == u ? undefined : null == (c = u.nearby) ? undefined : c.length) > 1) {
              l = u.nearby[1].rectSize;
              o = u.nearby[1].slopeAngle;
            } else {
              l = module1339._pointToStuckRect(u);
              s = true;
            }
          }

          if (t && l)
            module1420.setTimeout(function () {
              var t = n.getNewRectIndex(module1126.FbzType.FBZ_TYPE_REGULAR);

              if (t > 0) {
                n.addFBZZones(t, l, o, module1126.FbzType.FBZ_TYPE_REGULAR, s);
                module1420.setTimeout(function () {
                  return n._checkFBZInChargerOrRobot(n.forbidReferences[t]);
                }, 200);
              } else globals.showToast(module510.map_edit_forbidden_zone_exceed_limit);
            }, 500);
        },
      },
      {
        key: '_initWallRects',
        value: function (n) {
          if (n && 0 != n.length) {
            for (o = 1; o <= module1126.MAX_COUNT_WALL_OR_FBZ; o++)
              if (o <= n.length) {
                var t,
                  l = n[o - 1];
                if (!(null == (t = this.wallReferences[o]))) t.showWall(o, l.start, l.end);
              } else {
                var s;
                if (!(null == (s = this.wallReferences[o]))) s.reInitRender(o);
              }
          } else
            for (var o = 1; o <= module1126.MAX_COUNT_WALL_OR_FBZ; o++) {
              var c;
              if (!(null == (c = this.wallReferences[o]))) c.reInitRender(o);
            }
        },
      },
      {
        key: '_initFBZones',
        value: function (n, t) {
          var l = this._getFbzRefsByType(t);

          if (l)
            if (n && 0 != n.length) {
              for (u = 1; u <= module1126.MAX_COUNT_WALL_OR_FBZ; u++)
                if (u <= n.length) {
                  var s,
                    o = n[u - 1];
                  if (!(null == (s = l[u]))) s.showZone(u, o.rectSize, o.slopeAngle);
                } else {
                  var c;
                  if (!(null == (c = l[u]))) c.reInitRender(u);
                }
            } else
              for (var u = 1; u <= module1126.MAX_COUNT_WALL_OR_FBZ; u++) {
                var f;
                if (!(null == (f = l[u]))) f.reInitRender(u);
              }
        },
      },
      {
        key: '_initCliffFocusId',
        value: function () {
          var n, t;
          return undefined !== (null == (n = this.props.initCliffZone) ? undefined : n.id) ? (null == (t = this.props.initCliffZone) ? undefined : t.id) : -9999;
        },
      },
      {
        key: '_getFbzRefsByType',
        value: function (n) {
          return n == module1126.FbzType.FBZ_TYPE_REGULAR
            ? this.forbidReferences
            : n == module1126.FbzType.FBZ_TYPE_MOPPING
            ? this.moppingFbzReferences
            : n == module1126.FbzType.FBZ_TYPE_CLEANING
            ? this.cleanFbzReferences
            : null;
        },
      },
      {
        key: '_removeMapZone',
        value: function (n, t) {
          var l;

          if (n[t].state.visible) {
            for (var s = this._getVisibleZonesCount(n), o = 1; o <= module1126.MAX_COUNT_WALL_OR_FBZ; o++)
              n[o] &&
                n[o].state.visible &&
                n[o].state.serial > n[t].state.serial &&
                n[o] &&
                n[o].setState({
                  serial: n[o].state.serial - 1,
                });

            if (!(null == (l = n[t]))) l.removeZone(s);
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
            if (null == (s = n[l]) ? undefined : s.isVisible()) t++;
          });
          return t;
        },
      },
      {
        key: '_checkFBZInChargerOrRobot',
        value: function (n) {
          if (this._ifFBZInTarget(n, false)) {
            globals.showToast(module510.map_edit_forbidden_too_close_to_dock);
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
            c = t ? module1126.ROBOT_FORBIDDEN_R : module1126.DOCK_FORBIDDEN_R;
          return !(!o || (0 == o.x && 0 == o.y)) && module1339._judgeInlegalFBZ(o.x, o.y, n, c * this.props.transform.xx);
        },
      },
      {
        key: '_checkWallInChargerOrRobot',
        value: function (n) {
          if (this._ifWallInTarget(n, false)) {
            globals.showToast(module510.map_edit_virtual_wall_too_close_to_dock);
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
            c = t ? module1126.ROBOT_FORBIDDEN_R : module1126.DOCK_FORBIDDEN_R;
          if (!o || (0 == o.x && 0 == o.y)) return false;

          var u = module1339._convertToPixelEndpoint(n.state.position, this.props.transform);

          return module1339._disBtwPointSegement(o.x, o.y, u.start.x, u.start.y, u.end.x, u.end.y).distance / this.props.transform.xx < c;
        },
      },
      {
        key: 'getForbiddenZone',
        value: function (n, t, l) {
          var s = this,
            o = this.props.mapMode == module1343.MAP_MODE_MAP_EDIT;
          return Object.keys(t).map(function (c, u) {
            return React.default.createElement(module1210.ForbiddenZone, {
              key: u,
              id: c,
              type: n,
              mapDeg: s.props.mapDeg,
              ref: function (n) {
                return (t[c] = n);
              },
              transform: l,
              editable: o,
              showArea: s.props.mapMode == module1343.MAP_MODE_MAP_EDIT,
              handlePanOnShouldStart: s.handleFBZPanOnShouldStart,
              handlePanStart: s.handleFBZPanStart,
              handlePanEnd: s.handleFBZPanEnd,
              handleRemoveFBZ: s.handleRemoveFBZ,
              handleRectAndAngleChanged: s.handleRectAndAngleChanged,
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
            l = this.props.mapMode == module1343.MAP_MODE_MAP_EDIT;
          return Object.keys(this.wallReferences).map(function (s, o) {
            return React.default.createElement(module1210.InvisibleWall, {
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
        key: 'getStuckPoint',
        value: function (n) {
          if (this.props.initStuckPt && this.props.initStuckPt.nearby) {
            var t = this.props.initStuckPt;
            t = module1339._convertToPixelPoint(t, n);
            var l = module1126.Config.size.objectsRadius * (n.xx || 1);
            return React.default.createElement(module13.Image, {
              resizeMethod: 'scale',
              resizeMode: 'contain',
              style: [
                T.stuckImage,
                {
                  left: t.x - l / 2,
                  top: t.y - l / 2,
                  height: l,
                  width: l,
                  transform: [
                    {
                      rotateZ: -1 * this.props.mapDeg + 'deg',
                    },
                  ],
                },
              ],
              source: this.zoneTheme.stuckPtImg,
            });
          }

          return null;
        },
      },
      {
        key: 'getCliffZonesView',
        value: function (n) {
          var t = this;
          if (!this.state.cliffData || this.state.cliffData.length <= 0) return null;
          var l = {
              backgroundColor: this.zoneTheme.allFBZColor,
              borderColor: this.zoneTheme.allFBZBorderColor,
            },
            s = this.props.mapMode == module1343.MAP_MODE_MAP_EDIT;
          return this.state.cliffData.map(function (o, c) {
            var u = o.rectSize || module1339._pointToStuckRect(o),
              h = o.slopeAngle || 0;

            return React.default.createElement(module1210.RectZone, {
              key: c,
              id: c,
              rectSize: u,
              slopeAngle: h,
              mapDeg: t.props.mapDeg,
              transform: n,
              editable: s,
              isFocus: t.state.cliffFocusId == o.id,
              viewStyle: l,
              accessibilityLabelKey: 'rect_zone_cliff',
              innerImage: o.changed ? null : module1126.MapAITag,
              handlePanShouldStart: t.cliffPanOnShouldStart,
              handlePanOnStart: t.cliffPanStart,
              handlePanDelete: t.cliffDelete,
              handleUpdateRect: t.cliffUpdateRect,
              handleUpdateAngle: t.cliffUpdateAngle,
              checkAndroidOverflow: t.props.checkAndroidOverflow,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var n = new M({
              xx: this.props.transform.xx || 1,
              yy: this.props.transform.yy || 1,
            }),
            t =
              this.props.alwaysShowFBZ ||
              this.props.mapMode == module1343.MAP_MODE_MAP_EDIT ||
              !module381.RSM.isRunning ||
              (module381.RSM.isRunning && module381.RSM.isMopForbiddenEnabled),
            l =
              module424.DMM.isGarnet &&
              (this.props.mapMode == module1343.MAP_MODE_MAP_EDIT || !module381.RSM.isRunning || (module381.RSM.isRunning && module381.RSM.isCleanFBZEnabled)),
            s = module1349.default.mapEditStep >= module1349.MapEditSteps.Saved || this.props.mapMode != module1343.MAP_MODE_MAP_EDIT;
          return React.default.createElement(
            module13.View,
            {
              style: T.container,
            },
            this.getStuckPoint(n),
            this.getInvisibleWall(n),
            this.getForbiddenZone(module1126.FbzType.FBZ_TYPE_REGULAR, this.forbidReferences, n),
            l && this.getForbiddenZone(module1126.FbzType.FBZ_TYPE_CLEANING, this.cleanFbzReferences, n),
            t && this.getForbiddenZone(module1126.FbzType.FBZ_TYPE_MOPPING, this.moppingFbzReferences, n),
            s && this.getCliffZonesView(n)
          );
        },
      },
      {
        key: 'zoneTheme',
        get: function () {
          return this.context.theme.displayZones;
        },
      },
    ]);
    return E;
  })(React.default.Component);

exports.default = E;
E.contextType = module1199.AppConfigContext;
E.propTypes = {
  mapEditPageDidChange: PropTypes.default.func,
  checkAndroidOverflow: PropTypes.default.func,
};
E.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1343.MAP_MODE_REGULAR,
  walls: null,
  fbzZones: null,
  mopZones: null,
  cleanZones: null,
  cliffZones: null,
  initFBZone: null,
  initStuckPt: null,
  initCliffZone: null,
  zonesHasEdited: false,
  mapEditPageDidChange: function () {},
  checkAndroidOverflow: function () {},
};
var T = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  stuckImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
});
