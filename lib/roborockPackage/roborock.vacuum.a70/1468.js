var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1204 = require('./1204'),
  module1193 = require('./1193'),
  module1120 = require('./1120'),
  module1191 = require('./1191'),
  module391 = require('./391');

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

var _ = module13.ART.Transform,
  module1337 = require('./1337'),
  module1333 = require('./1333'),
  x = module1120.Config.size.objectsRadius,
  z = (function (t) {
    module9.default(R, t);

    var module1193 = R,
      module1337 = k(),
      z = function () {
        var t,
          n = module12.default(module1193);

        if (module1337) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var n;
      module6.default(this, R);

      (n = z.call(this, t)).onPanShouldStart = function () {
        return true;
      };

      n.state = {};
      return n;
    }

    module7.default(R, [
      {
        key: 'onPressSmartZone',
        value: function (t, n, o) {
          var l, u;
          if (!(null == (l = (u = this.props).clickSmartZone))) l.call(u, t, n, o);
        },
      },
      {
        key: '_getImgRect',
        value: function (t) {
          return {
            rectSize: {
              x: t.x - x / 2,
              y: t.y - x / 2,
              width: x,
              height: x,
            },
            slopeAngle: 0,
          };
        },
      },
      {
        key: '_getImgStyle',
        value: function (t, n) {
          t = module1333._convertToPixelPoint(t, n);
          var o = x * n.xx;
          return {
            left: t.x - o / 2,
            top: t.y - o / 2,
            height: o,
            width: o,
            transform: [
              {
                rotateZ: -1 * this.props.mapDeg + 'deg',
              },
            ],
          };
        },
      },
      {
        key: 'getStuckZonesView',
        value: function (t) {
          var o,
            l = this;

          if ((null == (o = this.props.stuckPoints) ? undefined : o.length) > 0) {
            var u,
              s = {
                backgroundColor: this.zoneTheme.allFBZColor,
                borderColor: this.zoneTheme.allFBZBorderColor,
                borderStyle: 'dashed',
              };
            return null == (u = this.props.stuckPoints)
              ? undefined
              : u.map(function (o, u) {
                  if (o.nearby) {
                    var c = l._getImgRect(o),
                      h = l._getImgStyle(o, t);

                    return React.default.createElement(
                      module13.TouchableWithoutFeedback,
                      module22.default(
                        {
                          key: u,
                          onPress: l.onPressSmartZone.bind(l, module1120.SmartBubbleType.BT_STUCK, o, c),
                        },
                        module391.default.getAccessibilityLabel('map_nearby_stuck')
                      ),
                      React.default.createElement(module13.Image, {
                        resizeMode: 'contain',
                        style: [I.stuckImage, h],
                        source: l.zoneTheme.stuckPtImg,
                      })
                    );
                  }

                  var v = module1333._pointToStuckRect(o),
                    k = {
                      rectSize: v,
                      slopeAngle: 0,
                    };

                  return React.default.createElement(module1204.RectZone, {
                    key: u,
                    id: u,
                    rectSize: v,
                    slopeAngle: 0,
                    editable: true,
                    mapDeg: l.props.mapDeg,
                    transform: t,
                    viewStyle: s,
                    accessibilityLabelKey: 'rect_zone_stuck',
                    innerImage: module1120.MapAITag,
                    handlePanShouldStart: l.onPanShouldStart,
                    handlePanOnStart: l.onPressSmartZone.bind(l, module1120.SmartBubbleType.BT_STUCK, o, k),
                  });
                });
          }

          return null;
        },
      },
      {
        key: 'getSmartDoorSillView',
        value: function (t) {
          var o,
            l = this;
          if (!module1191.canEditDoorSill()) return null;
          var u =
            null == (o = this.props.doorSills)
              ? undefined
              : o.filter(function (t) {
                  return t.type && 1 === t.type;
                });
          return !u || u.length <= 0
            ? null
            : u.map(function (o, u) {
                var s = {
                    x: o.rectSize.x + o.rectSize.width / 2,
                    y: o.rectSize.y + o.rectSize.height / 2,
                  },
                  c = l._getImgRect(s),
                  y = l._getImgStyle(s, t);

                return React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  module22.default(
                    {
                      key: u,
                      onPress: l.onPressSmartZone.bind(l, module1120.SmartBubbleType.BT_DOORSILL, o, c),
                    },
                    module391.default.getAccessibilityLabel('map_smart_doorsill')
                  ),
                  React.default.createElement(module13.Image, {
                    resizeMode: 'contain',
                    style: [I.doorImage, y],
                    source: l.zoneTheme.smartDsImg,
                  })
                );
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
            module13.View,
            {
              style: I.container,
            },
            this.getStuckZonesView(t),
            this.getSmartDoorSillView(t)
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
    return R;
  })(React.default.Component);

exports.default = z;
z.contextType = module1193.AppConfigContext;
z.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  mapDeg: 0,
  mapMode: module1337.MAP_MODE_REGULAR,
  zonesHasEdited: false,
  stuckPoints: [],
};
var I = module13.StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  stuckImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  doorImage: {
    position: 'absolute',
  },
});
