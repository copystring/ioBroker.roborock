var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1163 = require('./1163'),
  module1332 = require('./1332'),
  module1395 = require('./1395'),
  module515 = require('./515'),
  module391 = require('./391'),
  module1410 = require('./1410');

function P(t, n) {
  var o = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    if (n)
      s = s.filter(function (n) {
        return Object.getOwnPropertyDescriptor(t, n).enumerable;
      });
    o.push.apply(o, s);
  }

  return o;
}

function R(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      P(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      P(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function A() {
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

var module1402 = require('./1402'),
  k = 2 * module1332.buttonConfig.rectBtn.size.width,
  T = (function (t) {
    module7.default(T, t);

    var module50 = T,
      module515 = A(),
      P = function () {
        var t,
          n = module11.default(module50);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function T(t) {
      var n;
      module4.default(this, T);

      (n = P.call(this, t)).updateRect = function (t) {
        var o = R(R({}, n.state.rectSize), t);

        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(o, null, n.state.slopeAngle))) {
          n._setChanged();

          n.setState({
            rectSize: o,
          });
        }
      };

      n.updateAngle = function (t) {
        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(n.state.rectSize, null, t))) {
          n._setChanged();

          n.setState({
            slopeAngle: t,
          });
        }
      };

      n.getInfo = function () {
        return {
          rectSize: n.state.rectSize,
          slopeAngle: n.state.slopeAngle,
          mapDeg: n.props.mapDeg,
          trans: n.props.transform,
        };
      };

      n.onShouldStart = function () {
        if (!(null == n.props.handlePanOnShouldStart)) n.props.handlePanOnShouldStart();
        return true;
      };

      n.onTouchStart = function (t) {
        if (t == module1395.RectPanType.PanTypeMove) null == n.props.handlePanStart || n.props.handlePanStart(n.state.type, n.state.id);
      };

      n.onTouchEnd = function (t) {
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module6.default(n), t != module1395.RectPanType.PanTypeRotate);
      };

      n.state = {
        type: t.type || module1332.FbzType.FBZ_TYPE_REGULAR,
        id: t.id,
        serial: t.id || 1,
        visible: module1332.RectConfig.visible,
        isFocus: module1332.RectConfig.isFocus,
        rectSize: module1332.RectConfig.initSize,
        slopeAngle: module1332.RectConfig.angle,
        newAdded: module1332.RectConfig.newAdded,
        editable: t.editable || false,
      };
      n.changed = false;
      return n;
    }

    module5.default(T, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponderDelete = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) t._onPressDeleteZone();
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
          this.panResponderSave = module12.PanResponder.create({
            onStartShouldSetPanResponder: function () {
              return true;
            },
            onMoveShouldSetPanResponder: function () {
              return true;
            },
            onPanResponderEnd: function (n, o) {
              if (0 === n.nativeEvent.touches.length) t._onPressSaveCarpetZone();
            },
            onPanResponderTerminationRequest: function (t, n) {
              return false;
            },
          });
        },
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.panProxy = new module1395.PanResponderProxy(module1395.RectPanType.PanTypeMove | module1395.RectPanType.PanTypeScale | module1395.RectPanType.PanTypeRotate);
          this.panProxy.registerPanResponder({
            updateAngle: this.updateAngle,
            updateRect: this.updateRect,
            getInfo: this.getInfo,
            onShouldStart: this.onShouldStart,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
          });
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !module1402.objectShallowEqual(this.props, t, true) || !module1402.objectShallowEqual(this.state, n, true);
        },
      },
      {
        key: 'resetChanged',
        value: function () {
          this.changed = false;
          this.setState({
            newAdded: false,
          });
        },
      },
      {
        key: 'reInitRender',
        value: function (t) {
          var n = this;
          this.setState(
            {
              serial: t,
              id: t,
              visible: module1332.RectConfig.visible,
              newAdded: module1332.RectConfig.newAdded,
              rectSize: module1332.RectConfig.initSize,
            },
            function () {
              n.changed = false;
            }
          );
        },
      },
      {
        key: 'addNew',
        value: function (t, n) {
          var o = this,
            s = arguments.length > 2 && undefined !== arguments[2] ? arguments[2] : null;
          this.setState(
            {
              visible: true,
              newAdded: true,
              rectSize: t,
              slopeAngle: n || 0,
            },
            function () {
              o._setChanged();

              if (s) s();
            }
          );
        },
      },
      {
        key: 'showZone',
        value: function (t, n, o) {
          var s = this;
          this.setState(
            {
              serial: t,
              id: t,
              visible: true,
              newAdded: false,
              slopeAngle: o,
              rectSize: n,
            },
            function () {
              s.changed = false;
            }
          );
        },
      },
      {
        key: 'removeZone',
        value: function (t) {
          var n = this;
          this.setState(
            {
              visible: false,
              newAdded: false,
              isFocus: false,
              serial: t,
            },
            function () {
              n.changed = false;
            }
          );
        },
      },
      {
        key: 'setFocus',
        value: function (t) {
          this.setState({
            isFocus: t,
            editable: t,
          });
        },
      },
      {
        key: 'cleanFocus',
        value: function () {
          this.setState({
            isFocus: false,
            editable: this.props.editable,
          });
        },
      },
      {
        key: 'hasEdit',
        value: function () {
          return 1 == this.changed || 1 == this.state.newAdded;
        },
      },
      {
        key: 'isVisible',
        value: function () {
          return !!(this.state.visible && this.state.rectSize.height > 0);
        },
      },
      {
        key: '_setChanged',
        value: function () {
          var t, n;

          if (!this.changed) {
            this.changed = true;
            if (!(null == (t = (n = this.props).mapEditPageDidChange))) t.call(n, this.state.type);
          }
        },
      },
      {
        key: '_getBackgroudColor',
        value: function () {
          var t = this.theme.allFBZColor;
          if (this.moppingForbidden) t = this.theme.mopFBZColor;
          else if (this.cleanForbidden) t = this.theme.cleanFBZColor;
          else if (this.ignoreCarpet) t = this.state.newAdded ? this.theme.carpetColor : 'transparent';
          else if (this.customCarpet) t = 'transparent';
          else if (this.feedbackMark) t = this.theme.fbMarkColor;
          return t;
        },
      },
      {
        key: '_getborderColor',
        value: function () {
          var t = this.theme.allFBZBorderColor;
          if (this.moppingForbidden) t = this.theme.mopFBZBorderColor;
          else if (this.cleanForbidden) t = this.theme.cleanFBZBorderColor;
          else if (this.ignoreCarpet) t = this.state.newAdded ? this.theme.carpetBorderColor : 'transparent';
          else if (this.customCarpet) t = 'transparent';
          else if (this.feedbackMark) t = this.theme.fbMarkBorderColor;
          return t;
        },
      },
      {
        key: '_getAccessibilityLabelKey',
        value: function () {
          var t = 'time_key_' + new Date().getTime();
          if (this.regularForbidden) t = 'forbidden_zone_regular';
          else if (this.moppingForbidden) t = 'forbidden_zone_mopping';
          else if (this.cleanForbidden) t = 'forbidden_zone_cleaning';
          else if (this.ignoreCarpet) t = this.state.newAdded ? 'forbidden_zone_carpet_ignore' : 'forbidden_zone_carpet_recover';
          else if (this.customCarpet) t = this.state.newAdded ? 'custom_zone_carpet_new' : 'custom_zone_carpet_hasAdded';
          return t;
        },
      },
      {
        key: '_onPressDeleteZone',
        value: function () {
          var t, n;
          if ((this._setChanged(), this.ignoreCarpet || this.customCarpet))
            this.ignoreCarpet ? this._saveCarpetZones(this.state.newAdded, true) : this.customCarpet && !this.state.newAdded && this._saveCarpetZones(false, false);
          else if (!(null == (t = (n = this.props).handleRemoveFBZ))) t.call(n, this.state.type, this.state.id);
        },
      },
      {
        key: '_onPressSaveCarpetZone',
        value: function () {
          if (this.customCarpet) this._saveCarpetZones(true, false);
          else if (this.ignoreCarpet && !this.state.newAdded) this._saveCarpetZones(true, true);
        },
      },
      {
        key: '_saveCarpetZones',
        value: function (t, n) {
          var o, s;
          if (!(null == (o = (s = this.props).mapCarpetSaveEdit))) o.call(s, this.state.id, t, n, this.state.newAdded);
        },
      },
      {
        key: 'getCarpetLines',
        value: function (t) {
          for (
            var n = new Array(),
              o = (2 * this.props.transform.xx) / 2,
              s = Math.sqrt(t.width ** 2 + t.height ** 2),
              h = 1,
              l = this.customCarpet ? this.theme.cusCarpetColor : this.theme.igCarpetColor,
              u = (s - t.width) / -2;
            u <= s;
            u += o
          )
            n.push(
              React.default.createElement(module1163.Line, {
                key: h++,
                x1: u,
                y1: (s - t.height) / -2,
                x2: u,
                y2: s,
                stroke: l,
                strokeWidth: 1,
                transform: 'rotate(45, ' + t.width / 2 + ' ' + t.height / 2 + ')',
              })
            );

          return React.default.createElement(
            module1163.Svg,
            {
              width: t.width,
              height: t.height,
            },
            n
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          if (!this.state.visible) return React.default.createElement(module12.View, null);

          var o = module1402._convertToPixelRect(this.state.rectSize, this.props.transform);

          if (!o || isNaN(o.x) || isNaN(o.y) || isNaN(o.width) || isNaN(o.height)) return null;

          var s = o.width + 2 * k,
            h = o.height + 2 * k,
            l = this.state.type != module1332.FbzType.FBZ_TYPE_CARPET && this.state.type != module1332.FbzType.RECT_TYPE_CARPET,
            u = this.state.isFocus && l,
            c = module1410.default.zoneDeleteButton('forbidden_rect_edit_delete', this.panResponderDelete, k),
            p = module1410.default.zoneScaleButton(o, 'forbidden_rect_edit_scale', this.panProxy.panResponderScale, k),
            v = this.state.isFocus && l && !this.feedbackMark,
            C = module1410.default.zoneRotateButton(o.width, 'forbidden_rect_edit_rotate', this.panProxy.panResponderRotate, k),
            _ = module1410.default.zoneDragButtonView(o.height, this.panProxy.panResponder),
            P = this.state.isFocus && this.carpetCanSave,
            R = module1410.default.carpetZoneSaveButton(o.width, 'forbidden_carpet_edit_save', this.panResponderSave, k),
            A = this.state.isFocus && (this.ignoreCarpet || (this.customCarpet && !this.state.newAdded)),
            T = module1410.default.carpetZoneDelButton('forbidden_carpet_edit_delete', this.panResponderDelete, k),
            E = module1410.default.zoneFocusBorderView(o.width, o.height, k),
            z = this.props.showArea && this.state.isFocus,
            B = module1410.default.zoneAreaView(o.width, this.state.rectSize),
            Z = this.getCarpetLines(o),
            O = (((module12.I18nManager.isRTL ? -1 : 1) * this.state.slopeAngle * 180) / Math.PI).toString() + 'deg',
            x = this._getAccessibilityLabelKey(),
            D = !this.state.editable;

          return React.default.createElement(
            module12.View,
            {
              pointerEvents: D ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: o.x - k,
                top: o.y - k,
                width: s,
                height: h,
                overflow: 'visible',
                transform: [
                  {
                    rotate: O,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.state.isFocus ? 1 : 0,
                elevation: this.state.isFocus ? 1 : 0,
              },
            },
            z && B,
            React.default.createElement(
              module12.View,
              {
                pointerEvents: 'box-none',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: s,
                  height: h,
                  overflow: 'visible',
                },
                ref: function (n) {
                  t.fbzwarpView = n;
                },
              },
              React.default.createElement(
                module12.View,
                module22.default({}, module391.default.getAccessibilityLabel(x), this.panProxy.panResponder.panHandlers, {
                  pointerEvents: D ? 'none' : 'auto',
                  style: {
                    position: 'absolute',
                    left: k,
                    top: k,
                    width: o.width,
                    height: o.height,
                    overflow: 'visible',
                    backgroundColor: this._getBackgroudColor(),
                    borderColor: this._getborderColor(),
                    borderWidth: this.carpetCanSave ? 0 : 2,
                  },
                }),
                this.carpetCanSave && Z
              ),
              this.state.isFocus && E,
              u && c,
              this.state.isFocus && p,
              v && C,
              this.state.isFocus && _,
              P && R,
              A && T
            )
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme.displayZones;
        },
      },
      {
        key: 'regularForbidden',
        get: function () {
          return this.state.type == module1332.FbzType.FBZ_TYPE_REGULAR;
        },
      },
      {
        key: 'moppingForbidden',
        get: function () {
          return this.state.type == module1332.FbzType.FBZ_TYPE_MOPPING;
        },
      },
      {
        key: 'cleanForbidden',
        get: function () {
          return this.state.type == module1332.FbzType.FBZ_TYPE_CLEANING;
        },
      },
      {
        key: 'feedbackMark',
        get: function () {
          return this.state.type == module1332.FbzType.RECT_TYPE_FBMARK;
        },
      },
      {
        key: 'customCarpet',
        get: function () {
          return this.state.type == module1332.FbzType.RECT_TYPE_CARPET;
        },
      },
      {
        key: 'ignoreCarpet',
        get: function () {
          return this.state.type == module1332.FbzType.FBZ_TYPE_CARPET;
        },
      },
      {
        key: 'carpetCanSave',
        get: function () {
          return this.customCarpet || (this.ignoreCarpet && !this.state.newAdded);
        },
      },
    ]);
    return T;
  })(React.default.Component);

exports.default = T;
T.contextType = module515.AppConfigContext;
T.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
  showArea: false,
  mapDeg: 0,
};
