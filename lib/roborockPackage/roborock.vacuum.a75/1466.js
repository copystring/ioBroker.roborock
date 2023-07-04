var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1350 = require('./1350'),
  module391 = require('./391'),
  module1212 = require('./1212'),
  module1126 = require('./1126'),
  module1349 = require('./1349'),
  module1199 = require('./1199');

function R(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (o)
      s = s.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, s);
  }

  return n;
}

function T(t) {
  for (var o = 1; o < arguments.length; o++) {
    var s = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      R(Object(s), true).forEach(function (o) {
        module50.default(t, o, s[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      R(Object(s)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(s, o));
      });
  }

  return t;
}

function x() {
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

var module1339 = require('./1339'),
  k = 2 * module1126.buttonConfig.rectBtn.size.width,
  z = (function (t) {
    module9.default(z, t);

    var module50 = z,
      module1199 = x(),
      R = function () {
        var t,
          o = module12.default(module50);

        if (module1199) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function z(t) {
      var o;
      module6.default(this, z);

      (o = R.call(this, t)).updateRect = function (t) {
        if (o.props.heightLock) t.height = o.props.rectSize.height;
        var n = T(T({}, o.props.rectSize), t);
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
          edgeSize: o.props.edgeWidth || null,
        };
      };

      o.onShouldStart = function () {
        return null == o.props.handlePanShouldStart ? undefined : o.props.handlePanShouldStart(o.props.id);
      };

      o.onTouchStart = function (t) {
        if (t == module1212.RectPanType.PanTypeMove) {
          if (!(null == o.props.handlePanOnStart)) o.props.handlePanOnStart(o.props.id);
        } else if (t == module1212.RectPanType.PanTypeRotate) o.rotateStart = true;
      };

      o.onTouchEnd = function (t) {
        if (t == module1212.RectPanType.PanTypeRotate) {
          if (o.rotateStart && !o.rotateMove) {
            var n = o.props.slopeAngle;
            if (n < 0) n = 2 * Math.PI + n;
            var s = Math.PI / 4,
              p = n % s,
              l = Math.floor(n / s),
              h = (p > 0 && p <= Math.PI / 18 ? l : l + 1) * s;
            h %= 2 * Math.PI;
            o.updateAngle(h);
          }

          o.rotateStart = false;
          o.rotateMove = false;
        }
      };

      o.onTouchMove = function (t) {
        if (t == module1212.RectPanType.PanTypeRotate) o.rotateMove = true;
      };

      o.onTouchDelete = function () {
        if (!(null == o.props.handlePanDelete)) o.props.handlePanDelete(o.props.id);
      };

      return o;
    }

    module7.default(z, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          this.panProxy = new module1212.PanResponderProxy(
            module1212.RectPanType.PanTypeMove | module1212.RectPanType.PanTypeScale | module1212.RectPanType.PanTypeRotate | module1212.RectPanType.PanTypeDelete
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
        key: 'shouldComponentUpdate',
        value: function (t, o) {
          return !module1339.objectShallowEqual(this.props, t, true) || !module1339.objectShallowEqual(this.state, o, true);
        },
      },
      {
        key: 'getFillLines',
        value: function (t) {
          for (
            var o = new Array(), n = (2 * this.props.transform.xx) / 2, s = Math.sqrt(t.width ** 2 + t.height ** 2), p = 1, l = this.props.strokeColor, h = (s - t.width) / -2;
            h <= s;
            h += n
          )
            o.push(
              React.default.createElement(module1350.Line, {
                key: p++,
                x1: h,
                y1: (s - t.height) / -2,
                x2: h,
                y2: s,
                stroke: l,
                strokeWidth: 1,
                transform: 'rotate(45, ' + t.width / 2 + ' ' + t.height / 2 + ')',
              })
            );

          return React.default.createElement(
            module1350.Svg,
            {
              width: t.width,
              height: t.height,
            },
            o
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this.props,
            n = t.rectSize,
            s = t.transform,
            p = t.innerImage,
            l = undefined === p ? null : p,
            h = module1339._convertToPixelRect(n, s);

          if (!h || isNaN(h.x) || isNaN(h.y) || isNaN(h.width) || isNaN(h.height)) return null;

          var c = h.width + 2 * k,
            y = h.height + 2 * k,
            v = n.width < module1126.RectConfig.minLength || n.height < module1126.RectConfig.minLength,
            b = module1349.default.zoneDeleteButton('forbidden_rect_edit_delete', this.panProxy.panResponderDelete, k),
            R = module1349.default.zoneScaleButton(h, 'forbidden_rect_edit_scale', this.panProxy.panResponderScale, k),
            T = module1349.default.zoneRotateButton(h.width, 'forbidden_rect_edit_rotate', this.panProxy.panResponderRotate, k),
            x = module1349.default.zoneDragButtonView(h.height, this.panProxy.panResponder),
            z = v
              ? module1349.default.zoneFocusBorderViewWithPan(h, k, this.panProxy.panResponder, this.props.isFocus)
              : module1349.default.zoneFocusBorderView(h.width, h.height, k),
            M = (h.width / 3) ** (h.height / 3),
            D = {
              width: M,
              height: M,
              transform: [
                {
                  rotateZ: -1 * this.props.mapDeg + 'deg',
                },
              ],
            },
            F =
              !!l &&
              React.default.createElement(module13.Image, {
                style: [A.innerImage, D],
                resizeMethod: 'scale',
                resizeMode: 'contain',
                source: l,
              }),
            _ = this.props.showArea && this.isFocus,
            j = module1349.default.zoneAreaView(h.width, n, this.props.areaScale, '', {}, this.props.areaFix),
            E = (((module13.I18nManager.isRTL ? -1 : 1) * this.props.slopeAngle * 180) / Math.PI).toString() + 'deg',
            L = !this.props.editable;

          return React.default.createElement(
            module13.View,
            {
              pointerEvents: L ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: h.x - k,
                top: h.y - k,
                width: c,
                height: y,
                overflow: 'visible',
                transform: [
                  {
                    rotate: E,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.isFocus ? 1 : 0,
                elevation: this.isFocus ? 1 : 0,
              },
            },
            _ && j,
            React.default.createElement(
              module13.View,
              module22.default({}, module391.default.getAccessibilityLabel(this.accessibilityLabelKey), this.panProxy.panResponder.panHandlers, {
                pointerEvents: v ? 'none' : 'auto',
                style: [
                  A.zoneView,
                  {
                    left: k,
                    top: k,
                    width: h.width,
                    height: h.height,
                  },
                  this.viewStyle,
                ],
              }),
              this.props.fillLine && this.getFillLines(h),
              F
            ),
            (this.isFocus || v) && z,
            this.isFocus && b,
            this.isFocus && R,
            this.isFocus && T,
            this.isFocus && x
          );
        },
      },
      {
        key: 'isFocus',
        get: function () {
          return this.props.isFocus;
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
      {
        key: 'zoneTheme',
        get: function () {
          return this.context.theme.displayZones;
        },
      },
      {
        key: 'viewStyle',
        get: function () {
          return this.props.viewStyle;
        },
      },
      {
        key: 'accessibilityLabelKey',
        get: function () {
          return this.props.accessibilityLabelKey;
        },
      },
    ]);
    return z;
  })(React.default.Component);

exports.default = z;
z.contextType = module1199.AppConfigContext;
z.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
  showArea: false,
  areaScale: true,
  areaFix: 1,
  mapDeg: 0,
  isFocus: false,
  id: 0,
  rectSize: module1126.RectConfig.initSize,
  slopeAngle: module1126.RectConfig.angle,
  strokeColor: 'transparent',
  viewStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  fillLine: false,
  heightLock: false,
  accessibilityLabelKey: 'time_key_' + new Date().getTime(),
};
var A = module13.StyleSheet.create({
  zoneView: {
    position: 'absolute',
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 'android' === module13.Platform.OS ? 5 : 0,
  },
  innerImage: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
