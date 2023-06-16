var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1393 = require('./1393'),
  module414 = require('./414'),
  module394 = require('./394');

function F() {
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

var I = module12.ART.Transform,
  module500 = require('./500').strings,
  module1332 = require('./1332'),
  module1153 = require('./1153'),
  module393 = require('./393'),
  S = -9999,
  R = (function (t) {
    module7.default(x, t);

    var R = x,
      w = F(),
      P = function () {
        var t,
          n = module11.default(R);

        if (w) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function x(t) {
      var n;
      module4.default(this, x);

      (n = P.call(this, t)).handleFBZPanOnShouldStart = function (t) {
        var s = n.editItems.findIndex(function (n) {
          return n == t;
        });

        if (module393.isMiApp && -1 == s && n.editItems.length >= module1332.MAX_FURNITURE_EDIT_MIAPP) {
          var u = {
            text: module500.localization_strings_Main_Error_ErrorDetailPage_3,
          };
          globals.Alert.alert(module500.map_edit_furniture_max_tip_miapp, '', [u]);
          return false;
        }

        n._enableEditMap();

        return true;
      };

      n.handleFBZPanStart = function (t) {
        return n.setState({
          focusId: t,
        });
      };

      n.handleFBZoneRemove = function (t) {
        return n.removeFurniture(t);
      };

      n.handleUpdateRect = function (t, s) {
        if (n.state.data && !(n.state.data.length <= 0)) {
          var u = n.state.data.findIndex(function (n) {
            return n.id == t;
          });

          if (-1 != u) {
            n.state.data[u].rectSize = s;
            n.state.data[u].changed = true;
            n.setState({
              data: n.state.data,
            });

            n._setChanged(t);
          }
        }
      };

      n.handleUpdateAngle = function (t, s) {
        if (n.state.data && !(n.state.data.length <= 0)) {
          var u = n.state.data.findIndex(function (n) {
            return n.id == t;
          });

          if (-1 != u) {
            n.state.data[u].slopeAngle = s;
            n.state.data[u].changed = true;
            n.setState({
              data: n.state.data,
            });

            n._setChanged(t);
          }
        }
      };

      n.deletItems = [];
      n.editItems = [];
      n.state = {
        data: t.furnitures || [],
        focusId: S,
      };
      n.changed = false;
      return n;
    }

    module5.default(x, [
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
          var c = l < 0 ? l - 1 : -1,
            h = {
              rectSize: s,
              slopeAngle: u,
              id: c,
              edited: 1,
              type: t,
              subType: n,
              percent: 1e4,
              direction: 1,
              changed: true,
            };
          this.state.data.push(h);
          this.setState({
            data: this.state.data,
            focusId: c,
          });

          this._setChanged(c);
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
            if (n.type != module1332.FurnitureType.FT_TOILET) n.changed ? t.push(n) : n.edited || t.push(n);
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
            focusId: S,
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
          if (t == module1332.FurnitureType.FT_TOILET) return true;
          return !(
            !this.props.showFurnitureIcon ||
            !((t >= module1332.FurnitureType.FT_TVCABINET && t <= module1332.FurnitureType.FT_DINNERTABLE) || t == module1332.FurnitureType.FT_TEATABLE) ||
            n
          );
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
            var c,
              h,
              f = [];
            this.editItems.forEach(function (n) {
              if (n != t) f.push(n < t ? n + 1 : n);
            });
            this.editItems = f;
            if (!(null == (c = (h = this.props).eidtCountChange))) c.call(h, this.editItems.length);
          }
        },
      },
      {
        key: 'getFurnitureView',
        value: function (t) {
          var n = this;
          if (!this.state.data || this.state.data.length <= 0) return null;
          var s = this.props.mapMode == module1153.MAP_MODE_FURNITURE_EDIT;
          return this.state.data.map(function (u, o) {
            if (u.type == module1332.FurnitureType.FT_NONE || (u.type == module1332.FurnitureType.FT_TOILET && (n.props.showFurnitureIcon || !module394.MC.showAllFurnitureModel)))
              return React.default.createElement(module12.View, {
                key: u.id,
              });
            var l = n.showFurnitureIcon(u.type, u.edited);
            return React.default.createElement(module1393.Furniture, {
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
          var t = new I({
            xx: this.props.transform.xx || 1,
            yy: this.props.transform.yy || 1,
          });
          return React.default.createElement(
            module12.View,
            {
              style: k.container,
            },
            this.getFurnitureView(t)
          );
        },
      },
    ]);
    return x;
  })(React.default.Component);

exports.default = R;
R.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1153.MAP_MODE_REGULAR,
  furnitures: null,
  zonesHasEdited: false,
  mapEditPageDidChange: function () {},
  checkAndroidOverflow: function () {},
};
var k = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
