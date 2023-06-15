var module22 = require('./22'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1134 = require('./1134'),
  module1057 = require('./1057'),
  module1271 = require('./1271'),
  module1121 = require('./1121'),
  module1328 = require('./1328'),
  module515 = require('./515');

function w(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var p = Object.getOwnPropertySymbols(t);
    if (o)
      p = p.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, p);
  }

  return n;
}

function P(t) {
  for (var o = 1; o < arguments.length; o++) {
    var p = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      w(Object(p), true).forEach(function (o) {
        module50.default(t, o, p[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(p));
    else
      w(Object(p)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(p, o));
      });
  }

  return t;
}

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

var module1261 = require('./1261'),
  E = 2 * module1057.buttonConfig.rectBtn.size.width,
  O = (function (t) {
    module7.default(O, t);

    var module50 = O,
      module1121 = _(),
      w = function () {
        var t,
          o = module11.default(module50);

        if (module1121) {
          var p = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, p);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function O(t) {
      var o;
      module4.default(this, O);

      (o = w.call(this, t)).updateRect = function (t) {
        var n = P(P({}, o.props.rectSize), t);
        if (!((null != o.props.checkAndroidOverflow && o.props.checkAndroidOverflow(n, null, o.props.slopeAngle, true)) || null == o.props.handleUpdateRect))
          o.props.handleUpdateRect(o.props.id, n);
      };

      o.updateAngle = function (t) {
        if (!((null != o.props.checkAndroidOverflow && o.props.checkAndroidOverflow(o.props.rectSize, null, t, true)) || null == o.props.handleUpdateAngle))
          o.props.handleUpdateAngle(o.props.id, t);
      };

      o.getInfo = function () {
        return {
          rectSize: o.props.rectSize,
          slopeAngle: o.props.slopeAngle,
          mapDeg: o.props.mapDeg,
          trans: o.props.transform,
          edgeSize: o.edgeSize,
        };
      };

      o.onShouldStart = function () {
        return null == o.props.handlePanOnShouldStart ? undefined : o.props.handlePanOnShouldStart(o.props.id);
      };

      o.onTouchStart = function (t) {
        if (t == module1134.RectPanType.PanTypeMove) {
          if (!(null == o.props.handlePanStart)) o.props.handlePanStart(o.props.id);
        } else if (t == module1134.RectPanType.PanTypeRotate) o.rotateStart = true;
      };

      o.onTouchEnd = function (t) {
        if (t == module1134.RectPanType.PanTypeRotate) {
          if (o.rotateStart && !o.rotateMove) {
            var n = o.props.slopeAngle;
            if (n < 0) n = 2 * Math.PI + n;
            var p = Math.PI / 4,
              s = n % p,
              u = Math.floor(n / p),
              h = (s > 0 && s <= Math.PI / 18 ? u : u + 1) * p;
            h %= 2 * Math.PI;
            o.updateAngle(h);
          }

          o.rotateStart = false;
          o.rotateMove = false;
        }
      };

      o.onTouchMove = function (t) {
        if (t == module1134.RectPanType.PanTypeRotate) o.rotateMove = true;
      };

      o.onTouchDelete = function () {
        if (!(null == o.props.handleFBZoneRemove)) o.props.handleFBZoneRemove(o.props.id);
      };

      o.edgeSize = module1057.getFurnitureEdge(t.type, t.subType);
      return o;
    }

    module5.default(O, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.panProxy = new module1134.PanResponderProxy(
            module1134.RectPanType.PanTypeMove | module1134.RectPanType.PanTypeScale | module1134.RectPanType.PanTypeRotate | module1134.RectPanType.PanTypeDelete
          );
          this.panProxy.registerPanResponder({
            updateAngle: this.updateAngle,
            updateRect: this.updateRect,
            getInfo: this.getInfo,
            onShouldStart: this.onShouldStart,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
            onTouchMove: this.onTouchMove,
            onTouchDelete: this.onTouchDelete,
          });
        },
      },
      {
        key: 'UNSAFE_componentWillReceiveProps',
        value: function (t) {
          if (t.type != this.props.type) this.edgeSize = module1057.getFurnitureEdge(t.type, t.subType);
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, o) {
          return !module1261.objectShallowEqual(this.props, t, true) || !module1261.objectShallowEqual(this.state, o, true);
        },
      },
      {
        key: '_getFurnitureImage',
        value: function () {
          var t = module1057.FurnitureResource[this.props.type];
          return t
            ? this.props.showCommonIcon
              ? t.iconImage || null
              : t.hasSubtype && 0 != this.props.subType
              ? t[this.props.subType]
                ? t[this.props.subType].image
                : null
              : t.image
            : null;
        },
      },
      {
        key: '_resizeForGeneralIcon',
        value: function (t) {
          var o = module1057.Config.size.objectsRadius,
            n = module1057.Config.size.objectsRadius;
          return {
            x: t.x + t.width / 2 - o / 2,
            y: t.y + t.height / 2 - n / 2,
            width: o,
            height: n,
          };
        },
      },
      {
        key: '_resizeForIrregular',
        value: function (t) {
          var o = t.x + t.width / 2,
            n = t.y + t.height / 2,
            p = [t.width, t.height],
            s = p[0],
            u = p[1];
          if (
            this.props.type != module1057.FurnitureType.FT_SOFA ||
            (this.props.subType != module1057.SofaSubType.SST_SECTIONAL && this.props.subType != module1057.SofaSubType.SST_SECTIONAL_LEFT)
          )
            this.props.type == module1057.FurnitureType.FT_DINNERTABLE
              ? ((s = (255 * t.width) / 195), (u = (192 * t.height) / 132))
              : this.props.type == module1057.FurnitureType.FT_TEATABLE
              ? this.props.subType == module1057.TableSubType.TST_CIRCLE && ((s = (240 * t.width) / 180), (u = (240 * t.height) / 180))
              : this.props.type == module1057.FurnitureType.FT_SHOECABINET && ((s = (246 * t.width) / 186), (u = (141 * t.height) / 81));
          else {
            s = (264 * t.width) / 210;
            u = (171 * t.height) / 117;
          }
          return {
            x: o - s / 2,
            y: n - u / 2,
            width: s,
            height: u,
          };
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props.type;
          if (t == module1057.FurnitureType.FT_NONE) return React.default.createElement(module12.View, null);
          var n = this.props.rectSize;
          if (!n.width || !n.height) return React.default.createElement(module12.View, null);
          var p = this.props.showCommonIcon,
            s = (180 * this.props.slopeAngle) / Math.PI;

          if (p) {
            n = this._resizeForGeneralIcon(n);
            s = -1 * this.props.mapDeg;
          } else n = this._resizeForIrregular(n);

          var u = module1261._convertToPixelRect(n, this.props.transform);

          if (!u || isNaN(u.x) || isNaN(u.y) || isNaN(u.width) || isNaN(u.height)) return null;
          var h = u.width + 2 * E,
            l = u.height + 2 * E,
            y = t == module1057.FurnitureType.FT_TEATABLE && this.props.subType == module1057.TableSubType.TST_CIRCLE,
            b =
              t == module1057.FurnitureType.FT_SOFA &&
              (this.props.subType == module1057.SofaSubType.SST_SECTIONAL || this.props.subType == module1057.SofaSubType.SST_SECTIONAL_LEFT),
            w =
              t == module1057.FurnitureType.FT_BED ||
              t == module1057.FurnitureType.FT_DINNERTABLE ||
              t == module1057.FurnitureType.FT_TOILET ||
              t == module1057.FurnitureType.FT_SHOECABINET,
            P = u.width ** u.height < 8,
            _ = {
              width: u.width,
              height: u.height,
              border: 5,
              radius: 2,
              color: '#000000',
              opacity: 0.1,
              x: 0,
              y: 0,
            },
            O = {
              opacity: p ? 1 : this.props.isFocus ? 1 : 0.92,
              resizeMode: p ? 'cover' : 'stretch',
              resizeMethod: 'scale',
              source: this._getFurnitureImage(),
            },
            A = {
              position: 'absolute',
              left: 0,
              top: 0,
              width: u.width,
              height: u.height,
            },
            I = React.default.createElement(
              module12.Image,
              module22.default(
                {
                  style: [
                    A,
                    {
                      tintColor: 'rgba(0,0,0,0.2)',
                    },
                  ],
                },
                O
              )
            ),
            z = React.default.createElement(
              module12.View,
              {
                style: {
                  width: u.width,
                  height: u.height,
                },
              },
              React.default.createElement(
                module12.Image,
                module22.default(
                  {
                    style: A,
                  },
                  O
                )
              ),
              globals.app.state.theme == module515.Themes.dark ? I : null
            ),
            N = React.default.createElement(
              module1328.BoxShadow,
              {
                setting: _,
              },
              z
            ),
            x = y || b || w || P ? z : N,
            C = module1271.default.zoneDeleteButton('furniture_rect_edit_delete', this.panProxy.panResponderDelete, E),
            M = module1271.default.zoneScaleButton(u, 'furniture_rect_edit_scale', this.panProxy.panResponderScale, E),
            D = module1271.default.zoneRotateButton(u.width, 'furniture_rect_edit_rotate', this.panProxy.panResponderRotate, E),
            j = {
              transform: [
                {
                  rotate: Math.abs(s) > 135 && Math.abs(s) < 225 ? '180deg' : '0deg',
                },
                {
                  translateX: 0,
                },
              ],
            },
            B = module1271.default.zoneAreaView(u.width, this.props.rectSize, false, '', j),
            L = ((module12.I18nManager.isRTL ? -1 : 1) * s).toString() + 'deg',
            k = p || !this.props.editable,
            U = 'furniture_view_' + t + '_' + this.props.subType;
          return React.default.createElement(
            module12.View,
            {
              pointerEvents: k ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: u.x - E,
                top: u.y - E,
                width: h,
                height: l,
                overflow: 'visible',
                transform: [
                  {
                    rotate: L,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.props.isFocus ? 1 : 0,
                elevation: this.props.isFocus ? 1 : 0,
              },
            },
            React.default.createElement(
              module12.View,
              module22.default({}, Utils.getAccessibilityLabel(U), this.panProxy.panResponder.panHandlers, {
                pointerEvents: k ? 'none' : 'auto',
                style: {
                  position: 'absolute',
                  left: E,
                  top: E,
                  width: u.width,
                  height: u.height,
                },
              }),
              x
            ),
            this.props.isFocus && B,
            this.props.isFocus && module1271.default.zoneFocusBorderView(u.width, u.height, E),
            this.props.isFocus && C,
            this.props.isFocus && M,
            this.props.isFocus && D,
            this.props.isFocus && module1271.default.zoneDragButtonView(u.height, this.panProxy.panResponder)
          );
        },
      },
    ]);
    return O;
  })(React.default.Component);

exports.default = O;
O.contextType = module1121.AppConfigContext;
O.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
  mapDeg: 0,
  isFocus: false,
  id: 0,
  percent: 0,
  direction: 0,
  type: module1057.FurnitureType.FT_UNKNOWN,
  subType: module1057.FurnitureType.FT_UNKNOWN,
  rectSize: module1057.RectConfig.initSize,
  slopeAngle: module1057.RectConfig.angle,
  changed: false,
};
