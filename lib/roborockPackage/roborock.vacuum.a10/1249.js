var regeneratorRuntime = require('regenerator-runtime'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1239 = require('./1239'),
  module407 = require('./407');

function y() {
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

var _ = module12.ART.Transform,
  module491 = require('./491').strings,
  module1233 = require('./1233'),
  module934 = require('./934'),
  module389 = require('./389'),
  F = (function (t) {
    module7.default(k, t);

    var F = k,
      P = y(),
      x = function () {
        var t,
          n = module11.default(F);

        if (P) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function k(t) {
      var n;
      module4.default(this, k);

      (n = x.call(this, t)).handleFBZPanOnShouldStart = function (t) {
        var s = n.editItems.findIndex(function (n) {
          return n == t;
        });

        if (module389.isMiApp && -1 == s && n.editItems.length >= module1233.MAX_FURNITURE_EDIT_MIAPP) {
          var u = {
            text: module491.localization_strings_Main_Error_ErrorDetailPage_3,
          };
          globals.Alert.alert(module491.map_edit_furniture_max_tip_miapp, '', [u]);
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
        focusId: 0,
      };
      n.changed = false;
      return n;
    }

    module5.default(k, [
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          var n, s;

          if (!t.zonesHasEdited) {
            this.setState({
              data: t.furnitures || [],
              focusId: 0,
            });
            this.changed = false;
            this.deletItems = [];
            this.editItems = [];
            if (module389.isMiApp) null == (n = (s = this.props).eidtCountChange) || n.call(s, this.editItems.length);
          }
        },
      },
      {
        key: 'addFurniture',
        value: function (t, n, s, u) {
          var l, o;
          if ((null == (l = this.state.data) ? undefined : l.length) > 0)
            this.state.data.sort(function (t, n) {
              return t.id - n.id;
            });
          var c = (null == (o = this.state.data[0]) ? undefined : o.id) < 0 ? this.state.data[0].id - 1 : -1,
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

              this._setChanged(t);
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
            if (n.changed) t.push(n);
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
            focusId: 0,
          });
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
        key: '_setChanged',
        value: function (t) {
          var n, s, u, l;

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
            if (module389.isMiApp) null == (u = (l = this.props).eidtCountChange) || u.call(l, this.editItems.length);
          }
        },
      },
      {
        key: 'getFurnitureView',
        value: function (t) {
          var n = this;
          if (!this.state.data || this.state.data.length <= 0) return null;
          var s = this.props.mapMode == module934.MAP_MODE_FURNITURE_EDIT;
          return this.state.data.map(function (u, l) {
            return React.default.createElement(module1239.Furniture, {
              key: u.id,
              id: u.id,
              type: u.type,
              subtype: u.subtype,
              percent: u.percent,
              direction: u.direction,
              rectSize: u.rectSize,
              slopeAngle: u.slopeAngle,
              changed: !!u.changed && u.changed,
              mapDeg: n.props.mapDeg,
              isFocus: n.state.focusId == u.id,
              transform: t,
              editable: s,
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
          var t = new _({
            xx: this.props.transform.xx || 1,
            yy: this.props.transform.yy || 1,
          });
          return React.default.createElement(
            module12.View,
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

exports.default = F;
F.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module934.MAP_MODE_REGULAR,
  furnitures: null,
  zonesHasEdited: false,
  mapEditPageDidChange: function () {},
  checkAndroidOverflow: function () {},
};
var R = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
