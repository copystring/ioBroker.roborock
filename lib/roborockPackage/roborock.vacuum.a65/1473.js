var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1211 = require('./1211'),
  module1127 = require('./1127');

function k() {
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

var h = module13.ART.Transform,
  module1127 = require('./1127'),
  p = (function (t) {
    module9.default(b, t);

    var p = b,
      F = k(),
      Z = function () {
        var t,
          n = module12.default(p);

        if (F) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function b(t) {
      var s;
      module6.default(this, b);

      (s = Z.call(this, t)).handleFBZPanStart = function (t, n) {
        return s._setZonesFocus(n);
      };

      s.handleRemoveFBZ = function (t, n) {
        for (var l, u = s._getVisibleZonesCount(), o = 1; o <= module1127.MAX_COUNT_WALL_OR_FBZ; o++) {
          var c, f;
          if ((null == (c = s.markRes[o]) ? undefined : c.state.visible) && s.markRes[o].state.serial > s.markRes[n].state.serial)
            null == (f = s.markRes[o]) ||
              f.setState({
                serial: s.markRes[o].state.serial - 1,
              });
        }

        if (!(null == (l = s.markRes[n])))
          l.setState({
            visible: false,
            newAdded: false,
            isFocus: false,
            serial: u,
          });
      };

      s.markRes = {
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

    module7.default(b, [
      {
        key: 'getNewRectIndex',
        value: function () {
          var t = this._getVisibleZonesCount();

          if (t >= module1127.MAX_COUNT_WALL_OR_FBZ) return -1;

          for (var n = 1; n <= module1127.MAX_COUNT_WALL_OR_FBZ; n++) {
            var s;
            if (0 == (null == (s = this.markRes[n]) ? undefined : s.state.visible) && this.markRes[n].state.serial == t + 1) return n;
          }

          return 0;
        },
      },
      {
        key: 'addMarkZone',
        value: function (t, n, s) {
          var l,
            u = this;
          if (!(null == (l = this.markRes[t])))
            l.addNew(n, s, function () {
              u._setZonesFocus(t);
            });
        },
      },
      {
        key: 'clearMarkZoneFocus',
        value: function () {
          var t = this;
          Object.keys(this.markRes).map(function (n) {
            var s;
            if (!(null == (s = t.markRes[n])))
              s.setState({
                isFocus: false,
              });
          });
        },
      },
      {
        key: '_setZonesFocus',
        value: function (t) {
          var n = this;
          Object.keys(this.markRes).map(function (s) {
            var l,
              u = s == t;
            if (!(null == (l = n.markRes[s])))
              l.setState({
                isFocus: u,
              });
          });
        },
      },
      {
        key: '_getVisibleZonesCount',
        value: function () {
          var t = this,
            n = 0;
          Object.keys(this.markRes).map(function (s) {
            var l;
            if (null == (l = t.markRes[s]) ? undefined : l.isVisible()) n++;
          });
          return n;
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = new h({
              xx: this.props.transform.xx || 1,
              yy: this.props.transform.yy || 1,
            }),
            s = Object.keys(this.markRes).map(function (s, l) {
              return React.default.createElement(module1211.ForbiddenZone, {
                key: l,
                id: s,
                type: module1127.FbzType.RECT_TYPE_FBMARK,
                mapDeg: t.props.mapDeg,
                ref: function (n) {
                  return (t.markRes[s] = n);
                },
                transform: n,
                editable: true,
                handlePanStart: t.handleFBZPanStart,
                handleRemoveFBZ: t.handleRemoveFBZ,
              });
            });
          return React.default.createElement(
            module13.View,
            {
              style: _.container,
            },
            s
          );
        },
      },
    ]);
    return b;
  })(React.default.Component);

exports.default = p;
p.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
};

var _ = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
