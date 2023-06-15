var module4 = require('./4'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1132 = require('./1132'),
  module1121 = require('./1121');

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
  module1261 = require('./1261'),
  R = (function (t) {
    module7.default(T, t);

    var module1121 = T,
      module1265 = y(),
      R = function () {
        var t,
          n = module11.default(module1121);

        if (module1265) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var o;
      module4.default(this, T);
      (o = R.call(this, t)).state = {};
      return o;
    }

    module5.default(T, [
      {
        key: 'getStuckZonesView',
        value: function (t) {
          var n,
            o = this,
            u = {
              backgroundColor: this.zoneTheme.allFBZColor,
              borderColor: this.zoneTheme.allFBZBorderColor,
              borderStyle: 'dashed',
            };
          return (null == (n = this.props.stuckPoints) ? undefined : n.length) > 0
            ? this.props.stuckPoints.map(function (n, l) {
                var s = module1261._pointToStuckRect(n);

                return React.default.createElement(module1132.RectZone, {
                  key: l,
                  id: l,
                  rectSize: s,
                  slopeAngle: 0,
                  mapDeg: o.props.mapDeg,
                  transform: t,
                  viewStyle: u,
                  innerText: 'AI',
                });
              })
            : null;
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
              style: S.container,
            },
            this.getStuckZonesView(t)
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
    return T;
  })(React.default.Component);

exports.default = R;
R.contextType = module1121.AppConfigContext;
R.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1265.MAP_MODE_REGULAR,
  zonesHasEdited: false,
  stuckPoints: null,
};
var S = module12.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});
