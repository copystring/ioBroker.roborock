var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1132 = require('./1132'),
  module1057 = require('./1057'),
  module1271 = require('./1271');

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

var v = module12.ART.Transform,
  module1265 = require('./1265'),
  module505 = require('./505').strings,
  k = {
    maxWidth: 60,
    minWidth: 8,
    maxHeight: 4,
    minHeight: 2,
  },
  A = (function (t) {
    module7.default(P, t);

    var A = P,
      R = y(),
      x = function () {
        var t,
          n = module11.default(A);

        if (R) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, l);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function P(t) {
      var l;
      module4.default(this, P);

      (l = x.call(this, t)).handleFBZPanOnShouldStart = function () {
        module1271.default.enableEditMap();
        return true;
      };

      l.handleFBZPanStart = function (t) {
        l.setState({
          focusId: t,
        });
      };

      l.handleFBZoneRemove = function (t) {
        return l._removeDoorSill(t);
      };

      l.handleUpdateRect = function (t, n) {
        if (l.state.data && !(l.state.data.length <= 0)) {
          var o = l.state.data.find(function (n) {
            return n.id == t;
          });

          if (o) {
            if (o.type == module1057.DoorSillType.SmartSill && l.checkMaxCount()) return;
            o.rectSize = n;
            if (o.type == module1057.DoorSillType.SmartSill) o.aiToReal = true;
            o.type = module1057.DoorSillType.RealSill;
            l.setState({
              data: l.state.data,
            });

            l._setChanged(t);
          }
        }
      };

      l.handleUpdateAngle = function (t, n) {
        if (l.state.data && !(l.state.data.length <= 0)) {
          var o = l.state.data.find(function (n) {
            return n.id == t;
          });

          if (o) {
            if (o.type == module1057.DoorSillType.SmartSill && l.checkMaxCount()) return;
            o.slopeAngle = n;
            if (o.type == module1057.DoorSillType.SmartSill) o.aiToReal = true;
            o.type = module1057.DoorSillType.RealSill;
            l.setState({
              data: l.state.data,
            });

            l._setChanged(t);
          }
        }
      };

      l.state = {
        data: t.doorSills || [],
        focusId: l._initDoorSillId(),
      };
      l.changed = false;
      return l;
    }

    module5.default(P, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          if (!t.zonesHasEdited) {
            this.setState({
              data: t.doorSills || [],
            });
            this.changed = false;
          }
        },
      },
      {
        key: 'addDoorSill',
        value: function (t, n, l) {
          var o,
            s = null == (o = this.state.data) ? undefined : o.length,
            u = {
              rectSize: t,
              slopeAngle: n,
              id: s,
              type: module1057.DoorSillType.RealSill,
              newAdded: true,
              heightLock: l,
            };
          this.state.data.push(u);
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
          return (
            this.state.data.filter(function (t) {
              return !t.type || t.type != module1057.DoorSillType.SmartSill;
            }).length >= module1057.DoorConfig.max_count && (globals.showToast(module505.map_edit_door_sill_exceed_limit), true)
          );
        },
      },
      {
        key: '_initDoorSillId',
        value: function () {
          var t, n;
          return undefined !== (null == (t = this.props.initDoorSill) ? undefined : t.id) ? (null == (n = this.props.initDoorSill) ? undefined : n.id) : -9999;
        },
      },
      {
        key: '_removeDoorSill',
        value: function (t) {
          if (this.state.data && 0 != this.state.data.length) {
            var n = this.state.data.findIndex(function (n) {
              return n.id == t;
            });

            if (-1 != n) {
              this.state.data.splice(n, 1);
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
          var t, n;

          if (!this.changed) {
            this.changed = true;
            if (!(null == (t = (n = this.props).mapEditPageDidChange))) t.call(n);
          }
        },
      },
      {
        key: 'getMainView',
        value: function (t) {
          var n = this;
          if (!this.state.data || this.state.data.length <= 0) return null;
          var l = {
              borderColor: '#FFFA0B',
            },
            o = this.props.mapMode == module1265.MAP_MODE_DOORSILL_EDIT;
          return this.state.data.map(function (s, u) {
            var h = s.type && 1 === s.type;
            return React.default.createElement(module1132.RectZone, {
              key: u,
              id: s.id,
              rectSize: s.rectSize,
              slopeAngle: s.slopeAngle,
              mapDeg: n.props.mapDeg,
              isFocus: n.state.focusId == s.id,
              transform: t,
              editable: o,
              viewStyle: l,
              strokeColor: h ? '#FFFFFF' : '#FFFA0B',
              innerText: h ? 'AI' : null,
              fillLine: true,
              heightLock: !!s.heightLock,
              edgeWidth: k,
              handlePanShouldStart: n.handleFBZPanOnShouldStart,
              handlePanOnStart: n.handleFBZPanStart,
              handlePanDelete: n.handleFBZoneRemove,
              handleUpdateRect: n.handleUpdateRect,
              handleUpdateAngle: n.handleUpdateAngle,
              checkAndroidOverflow: n.props.checkAndroidOverflow,
            });
          });
        },
      },
      {
        key: 'render',
        value: function () {
          var t = new v({
            xx: this.props.transform.xx || 1,
            yy: this.props.transform.yy || 1,
          });
          return React.default.createElement(
            module12.View,
            {
              style: F.container,
            },
            this.getMainView(t)
          );
        },
      },
    ]);
    return P;
  })(React.default.Component);

exports.default = A;
A.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1265.MAP_MODE_REGULAR,
  doorSills: null,
  initDoorSill: null,
  zonesHasEdited: false,
  mapEditPageDidChange: function () {},
  checkAndroidOverflow: function () {},
};
var F = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
