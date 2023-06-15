var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1211 = require('./1211'),
  module1127 = require('./1127'),
  module1198 = require('./1198'),
  module1350 = require('./1350'),
  module1200 = require('./1200');

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

var D = module13.ART.Transform,
  module1344 = require('./1344'),
  module510 = require('./510').strings,
  x = {
    maxWidth: 60,
    minWidth: 8,
    maxHeight: 4,
    minHeight: 2,
  },
  R = {
    maxWidth: 4,
    minWidth: 2,
    maxHeight: 60,
    minHeight: 8,
  },
  C = (function (t) {
    module9.default(P, t);

    var module1200 = P,
      C = _(),
      F = function () {
        var t,
          l = module12.default(module1200);

        if (C) {
          var n = module12.default(this).constructor;
          t = Reflect.construct(l, arguments, n);
        } else t = l.apply(this, arguments);

        return module11.default(this, t);
      };

    function P(t) {
      var n;
      module6.default(this, P);

      (n = F.call(this, t)).handleFBZPanOnShouldStart = function () {
        module1350.default.enableEditMap();
        return true;
      };

      n.handleFBZPanStart = function (t) {
        n.setState({
          focusId: t,
        });

        n._updataSill(t, null, null);
      };

      n.handleFBZoneRemove = function (t) {
        return n._removeDoorSill(t);
      };

      n.handleUpdateRect = function (t, l) {
        n._updataSill(t, l, null);
      };

      n.handleUpdateAngle = function (t, l) {
        n._updataSill(t, null, l);
      };

      n.state = {
        data: t.doorSills || [],
        focusId: n._initDoorSillId(),
      };
      n.changed = false;
      return n;
    }

    module7.default(P, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          if (
            !t.zonesHasEdited &&
            (this.setState({
              data: t.doorSills || [],
            }),
            (this.changed = false),
            -9999 != this.state.focusId)
          ) {
            if (this.checkMaxCount(false)) {
              if (!this.hasChecked) globals.showToast(module510.map_edit_door_sill_exceed_limit);
              return void (this.hasChecked = true);
            }

            this._updataSill(this.state.focusId);
          }
        },
      },
      {
        key: 'addDoorSill',
        value: function (t, l, n) {
          var o,
            s = null == (o = this.state.data) ? undefined : o.length,
            h = {
              rectSize: t,
              slopeAngle: l,
              id: s,
              type: module1127.DoorSillType.RealSill,
              newAdded: true,
              heightLock: n,
            };
          this.state.data.push(h);
          this.setState({
            data: this.state.data,
            focusId: s,
          });

          this._setChanged();
        },
      },
      {
        key: 'clearAllDoorSillFocus',
        value: function () {
          this.setState({
            focusId: -9999,
          });
        },
      },
      {
        key: 'getAllDoorSills',
        value: function () {
          return this.state.data;
        },
      },
      {
        key: 'checkMaxCount',
        value: function () {
          var t = !(arguments.length > 0 && undefined !== arguments[0]) || arguments[0];

          if (
            this.state.data.filter(function (t) {
              return !t.type || t.type != module1127.DoorSillType.SmartSill;
            }).length >= module1127.DoorConfig.max_count
          ) {
            if (t) globals.showToast(module510.map_edit_door_sill_exceed_limit);
            return true;
          } else {
            this.hasChecked = false;
            return false;
          }
        },
      },
      {
        key: '_initDoorSillId',
        value: function () {
          var t, l;
          return undefined !== (null == (t = this.props.initDoorSill) ? undefined : t.id) ? (null == (l = this.props.initDoorSill) ? undefined : l.id) : -9999;
        },
      },
      {
        key: '_updataSill',
        value: function (t, l, n) {
          if (this.state.data && !(this.state.data.length <= 0)) {
            var o = this.state.data.find(function (l) {
              return l.id == t;
            });

            if (o) {
              if (o.type == module1127.DoorSillType.SmartSill && this.checkMaxCount()) return;
              if (l) o.rectSize = l;
              if (null != n && undefined !== n) o.slopeAngle = n;
              if (o.type == module1127.DoorSillType.SmartSill) o.aiToReal = true;
              o.type = module1127.DoorSillType.RealSill;
              this.setState({
                data: this.state.data,
              });

              this._setChanged(t);
            }
          }
        },
      },
      {
        key: '_removeDoorSill',
        value: function (t) {
          if (this.state.data && 0 != this.state.data.length) {
            var l = this.state.data.findIndex(function (l) {
              return l.id == t;
            });

            if (-1 != l) {
              this.state.data.splice(l, 1);
              this.setState({
                data: this.state.data,
              });

              this._setChanged();
            }
          } else
            this.setState({
              data: [],
            });
        },
      },
      {
        key: '_setChanged',
        value: function () {
          var t, l;

          if (!this.changed) {
            this.changed = true;
            if (!(null == (t = (l = this.props).mapEditPageDidChange))) t.call(l);
          }
        },
      },
      {
        key: 'getMainView',
        value: function (t) {
          var l = this;
          if (!this.state.data || this.state.data.length <= 0) return null;
          var n = {
              borderColor: '#FFFA0B',
            },
            o = this.props.mapMode == module1344.MAP_MODE_DOORSILL_EDIT;
          return this.state.data.map(function (s, h) {
            if (s.type && s.type === module1127.DoorSillType.SmartSill && (!o || !module1198.canEditDoorSill())) return null;
            var c = s.rectSize.width >= s.rectSize.height,
              y = s.type != module1127.DoorSillType.SmartSill ? 'rect_zone_doorsill' : 'map_smart_doorsill',
              v = s.type != module1127.DoorSillType.SmartSill ? null : module1127.MapAITag;
            return React.default.createElement(module1211.RectZone, {
              key: h,
              id: s.id,
              rectSize: s.rectSize,
              slopeAngle: s.slopeAngle,
              mapDeg: l.props.mapDeg,
              isFocus: l.state.focusId == s.id,
              transform: t,
              editable: o,
              viewStyle: n,
              showArea: true,
              areaScale: false,
              areaFix: s.heightLock ? 1 : 2,
              strokeColor: '#FFFA0B',
              accessibilityLabelKey: y,
              fillLine: true,
              heightLock: !!s.heightLock,
              edgeWidth: c ? x : R,
              innerImage: v,
              handlePanShouldStart: l.handleFBZPanOnShouldStart,
              handlePanOnStart: l.handleFBZPanStart,
              handlePanDelete: l.handleFBZoneRemove,
              handleUpdateRect: l.handleUpdateRect,
              handleUpdateAngle: l.handleUpdateAngle,
              checkAndroidOverflow: l.props.checkAndroidOverflow,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = new D({
            xx: this.props.transform.xx || 1,
            yy: this.props.transform.yy || 1,
          });
          return React.default.createElement(
            module13.View,
            {
              style: T.container,
            },
            this.getMainView(t)
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
    return P;
  })(React.default.Component);

exports.default = C;
C.contextType = module1200.AppConfigContext;
C.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1344.MAP_MODE_REGULAR,
  doorSills: null,
  initDoorSill: null,
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
});
