var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1211 = require('./1211'),
  module394 = require('./394'),
  module1125 = require('./1125');

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

var F = module13.ART.Transform,
  module510 = require('./510').strings,
  module1127 = require('./1127'),
  module1344 = require('./1344'),
  module393 = require('./393'),
  A = -9999,
  S = (function (t) {
    module9.default(k, t);

    var S = k,
      C = y(),
      P = function () {
        var t,
          n = module12.default(S);

        if (C) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function k(t) {
      var s;
      module6.default(this, k);

      (s = P.call(this, t)).handleFBZPanOnShouldStart = function (t) {
        var n = s.editItems.findIndex(function (n) {
          return n == t;
        });

        if (module393.isMiApp && -1 == n && s.editItems.length >= module1127.MAX_FURNITURE_EDIT_MIAPP) {
          var u = {
            text: module510.localization_strings_Main_Error_ErrorDetailPage_3,
          };
          globals.Alert.alert(module510.map_edit_furniture_max_tip_miapp, '', [u]);
          return false;
        }

        module1125.MapEditCommonService.enableEditMap();
        return true;
      };

      s.handleFBZPanStart = function (t) {
        return s.setState({
          focusId: t,
        });
      };

      s.handleFBZoneRemove = function (t) {
        return s.removeFurniture(t);
      };

      s.handleUpdateRect = function (t, n) {
        if (s.state.data && !(s.state.data.length <= 0)) {
          var u = s.state.data.findIndex(function (n) {
            return n.id == t;
          });

          if (-1 != u) {
            s.state.data[u].rectSize = n;
            s.state.data[u].changed = true;
            s.setState({
              data: s.state.data,
            });

            s._setChanged(t);
          }
        }
      };

      s.handleUpdateAngle = function (t, n) {
        if (s.state.data && !(s.state.data.length <= 0)) {
          var u = s.state.data.findIndex(function (n) {
            return n.id == t;
          });

          if (-1 != u) {
            s.state.data[u].slopeAngle = n;
            s.state.data[u].changed = true;
            s.setState({
              data: s.state.data,
            });

            s._setChanged(t);
          }
        }
      };

      s.deletItems = [];
      s.editItems = [];
      s.state = {
        data: t.furnitures || [],
        focusId: A,
      };
      s.changed = false;
      return s;
    }

    module7.default(k, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          var n, s;

          if (!t.zonesHasEdited) {
            this.setState({
              data: t.furnitures || [],
            });
            this.changed = false;
            this.deletItems = [];

            if (this.editItems.length > 0) {
              this.editItems = [];
              if (!(null == (n = (s = this.props).eidtCountChange))) n.call(s, this.editItems.length);
            }
          }
        },
      },
      {
        key: 'addFurniture',
        value: function (t, n, s, u) {
          var o,
            l = 0;
          if ((null == (o = this.state.data) ? undefined : o.length) > 0)
            this.state.data.forEach(function (t) {
              l = t.id ** l;
            });
          var h = l < 0 ? l - 1 : -1,
            c = {
              rectSize: s,
              slopeAngle: u,
              id: h,
              edited: 1,
              type: t,
              subType: n,
              percent: 1e4,
              direction: 1,
              changed: true,
            };
          this.state.data.push(c);
          this.setState({
            data: this.state.data,
            focusId: h,
          });

          this._setChanged(h);
        },
      },
      {
        key: 'removeFurniture',
        value: function (t) {
          if (this.state.data && 0 != this.state.data.length) {
            var n = this.state.data.findIndex(function (n) {
              return n.id == t;
            });

            if (-1 != n) {
              if (t > 0) this.deletItems.push(t);
              else if (t < 0)
                this.state.data.forEach(function (n) {
                  if (n.id < t) n.id++;
                });
              this.state.data.splice(n, 1);
              this.setState({
                data: this.state.data,
              });

              this._setChanged(t, true);
            }
          } else
            this.setState({
              data: [],
            });
        },
      },
      {
        key: 'getEditFurnitures',
        value: function () {
          var t = [];
          this.state.data.forEach(function (n) {
            if (n.type != module1127.FurnitureType.FT_TOILET) n.changed ? t.push(n) : n.edited || t.push(n);
          });
          return t;
        },
      },
      {
        key: 'getDeletedFurnitures',
        value: function () {
          return this.deletItems;
        },
      },
      {
        key: 'clearAllFurnitureFocus',
        value: function () {
          this.setState({
            focusId: A,
          });
        },
      },
      {
        key: 'getAllFurnitures',
        value: function () {
          return this.state.data;
        },
      },
      {
        key: 'showFurnitureIcon',
        value: function (t, n) {
          if (t == module1127.FurnitureType.FT_TOILET) return true;
          return !(
            !this.props.showFurnitureIcon ||
            !((t >= module1127.FurnitureType.FT_TVCABINET && t <= module1127.FurnitureType.FT_DINNERTABLE) || t == module1127.FurnitureType.FT_TEATABLE) ||
            n
          );
        },
      },
      {
        key: '_setChanged',
        value: function (t) {
          var n,
            s,
            u,
            o,
            l = arguments.length > 1 && undefined !== arguments[1] && arguments[1];

          if (!this.changed) {
            this.changed = true;
            if (!(null == (n = (s = this.props).mapEditPageDidChange))) n.call(s);
          }

          if (
            -1 ==
            this.editItems.findIndex(function (n) {
              return n == t;
            })
          ) {
            this.editItems.push(t);
            if (!(null == (u = (o = this.props).eidtCountChange))) u.call(o, this.editItems.length);
          } else if (l && t < 0) {
            var h,
              c,
              f = [];
            this.editItems.forEach(function (n) {
              if (n != t) f.push(n < t ? n + 1 : n);
            });
            this.editItems = f;
            if (!(null == (h = (c = this.props).eidtCountChange))) h.call(c, this.editItems.length);
          }
        },
      },
      {
        key: 'getFurnitureView',
        value: function (t) {
          var n = this;
          if (!this.state.data || this.state.data.length <= 0) return null;
          var s = this.props.mapMode == module1344.MAP_MODE_FURNITURE_EDIT;
          return this.state.data.map(function (u, o) {
            if (u.type == module1127.FurnitureType.FT_NONE || (u.type == module1127.FurnitureType.FT_TOILET && (n.props.showFurnitureIcon || !module394.MC.showAllFurnitureModel)))
              return React.default.createElement(module13.View, {
                key: u.id,
              });
            var l = n.showFurnitureIcon(u.type, u.edited);
            return React.default.createElement(module1211.Furniture, {
              key: u.id,
              id: u.id,
              type: u.type,
              subType: u.subType,
              percent: u.percent,
              direction: u.direction,
              edited: u.edited,
              rectSize: u.rectSize,
              slopeAngle: u.slopeAngle,
              changed: !!u.changed && u.changed,
              mapDeg: n.props.mapDeg,
              isFocus: n.state.focusId == u.id,
              transform: t,
              editable: s,
              showCommonIcon: l,
              handlePanOnShouldStart: n.handleFBZPanOnShouldStart,
              handlePanStart: n.handleFBZPanStart,
              handleFBZoneRemove: n.handleFBZoneRemove,
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
          var t = new F({
            xx: this.props.transform.xx || 1,
            yy: this.props.transform.yy || 1,
          });
          return React.default.createElement(
            module13.View,
            {
              style: R.container,
            },
            this.getFurnitureView(t)
          );
        },
      },
    ]);
    return k;
  })(React.default.Component);

exports.default = S;
S.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1344.MAP_MODE_REGULAR,
  furnitures: null,
  zonesHasEdited: false,
  mapEditPageDidChange: function () {},
  checkAndroidOverflow: function () {},
};
var R = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
