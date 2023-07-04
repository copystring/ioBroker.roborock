var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module8 = require('./8'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1344 = require('./1344'),
  module1120 = require('./1120'),
  module1206 = require('./1206'),
  module1193 = require('./1193'),
  module391 = require('./391'),
  module1343 = require('./1343');

function S(t, n) {
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

function P(t) {
  for (var n = 1; n < arguments.length; n++) {
    var s = null != arguments[n] ? arguments[n] : {};
    if (n % 2)
      S(Object(s), true).forEach(function (n) {
        module50.default(t, n, s[n]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(s));
    else
      S(Object(s)).forEach(function (n) {
        Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(s, n));
      });
  }

  return t;
}

function R() {
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

var module1333 = require('./1333'),
  T = 2 * module1120.buttonConfig.rectBtn.size.width,
  F = (function (t) {
    module9.default(F, t);

    var module50 = F,
      module1193 = R(),
      S = function () {
        var t,
          n = module12.default(module50);

        if (module1193) {
          var s = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, s);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function F(t) {
      var n;
      module6.default(this, F);

      (n = S.call(this, t)).updateRect = function (t) {
        var o = P(P({}, n.state.rectSize), t);

        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(o, null, n.state.slopeAngle))) {
          n._setChanged();

          if (!(null == n.props.handleRectAndAngleChanged)) n.props.handleRectAndAngleChanged(n.state.id);
          n.setState({
            rectSize: o,
            showAITag: false,
          });
        }
      };

      n.updateAngle = function (t) {
        if (!(null != n.props.checkAndroidOverflow && n.props.checkAndroidOverflow(n.state.rectSize, null, t))) {
          n._setChanged();

          if (!(null == n.props.handleRectAndAngleChanged)) n.props.handleRectAndAngleChanged(n.state.id);
          n.setState({
            slopeAngle: t,
            showAITag: false,
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
        if (t == module1206.RectPanType.PanTypeMove) null == n.props.handlePanStart || n.props.handlePanStart(n.state.type, n.state.id);
      };

      n.onTouchEnd = function (t) {
        if (!(null == n.props.handlePanEnd)) n.props.handlePanEnd(module8.default(n), t != module1206.RectPanType.PanTypeRotate);
      };

      n.onTouchDelete = function () {
        n._onPressDeleteZone();
      };

      n.state = {
        type: t.type || module1120.FbzType.FBZ_TYPE_REGULAR,
        id: t.id,
        serial: t.id || 1,
        visible: module1120.RectConfig.visible,
        isFocus: module1120.RectConfig.isFocus,
        rectSize: module1120.RectConfig.initSize,
        slopeAngle: module1120.RectConfig.angle,
        newAdded: module1120.RectConfig.newAdded,
        editable: t.editable || false,
        showAITag: false,
      };
      n.changed = false;
      return n;
    }

    module7.default(F, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {
          var t = this;
          this.panResponderSave = module13.PanResponder.create({
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
          this.panProxy = new module1206.PanResponderProxy(
            module1206.RectPanType.PanTypeMove | module1206.RectPanType.PanTypeScale | module1206.RectPanType.PanTypeRotate | module1206.RectPanType.PanTypeDelete
          );
          this.panProxy.registerPanResponder({
            updateAngle: this.updateAngle,
            updateRect: this.updateRect,
            getInfo: this.getInfo,
            onShouldStart: this.onShouldStart,
            onTouchStart: this.onTouchStart,
            onTouchEnd: this.onTouchEnd,
            onTouchDelete: this.onTouchDelete,
          });
        },
      },
      {
        key: 'shouldComponentUpdate',
        value: function (t, n) {
          return !module1333.objectShallowEqual(this.props, t, true) || !module1333.objectShallowEqual(this.state, n, true);
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
              visible: module1120.RectConfig.visible,
              newAdded: module1120.RectConfig.newAdded,
              rectSize: module1120.RectConfig.initSize,
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
          this.setState({
            visible: false,
            newAdded: false,
            isFocus: false,
            serial: t,
            showAITag: false,
          });
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
        key: 'setAITag',
        value: function (t) {
          this.setState({
            showAITag: t,
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
              c = (s - t.width) / -2;
            c <= s;
            c += o
          )
            n.push(
              React.default.createElement(module1344.Line, {
                key: h++,
                x1: c,
                y1: (s - t.height) / -2,
                x2: c,
                y2: s,
                stroke: l,
                strokeWidth: 1,
                transform: 'rotate(45, ' + t.width / 2 + ' ' + t.height / 2 + ')',
              })
            );

          return React.default.createElement(
            module1344.Svg,
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
          if (!this.state.visible) return React.default.createElement(module13.View, null);

          var t = module1333._convertToPixelRect(this.state.rectSize, this.props.transform);

          if (!t || isNaN(t.x) || isNaN(t.y) || isNaN(t.width) || isNaN(t.height)) return null;

          var o = t.width + 2 * T,
            s = t.height + 2 * T,
            h = !this.ignoreCarpet && !this.customCarpet,
            l = this.state.isFocus && h,
            c = module1343.default.zoneDeleteButton('forbidden_rect_edit_delete', this.panProxy.panResponderDelete, T),
            u = module1343.default.zoneScaleButton(t, 'forbidden_rect_edit_scale', this.panProxy.panResponderScale, T),
            p = this.state.isFocus && h && !this.feedbackMark,
            v = module1343.default.zoneRotateButton(t.width, 'forbidden_rect_edit_rotate', this.panProxy.panResponderRotate, T),
            C = module1343.default.zoneDragButtonView(t.height, this.panProxy.panResponder),
            w = (this.props.mapDeg * Math.PI) / -180,
            S = w + Math.PI == this.state.slopeAngle || w - Math.PI == this.state.slopeAngle,
            P = this.state.isFocus && this.carpetCanSave,
            R = module1343.default.carpetZoneSaveButton(t.width, 'forbidden_carpet_edit_save', this.panResponderSave, T, S),
            F = this.state.isFocus && (this.ignoreCarpet || (this.customCarpet && !this.state.newAdded)),
            z = module1343.default.carpetZoneDelButton('forbidden_carpet_edit_delete', this.panProxy.panResponderDelete, T, S),
            B = module1343.default.zoneFocusBorderView(t.width, t.height, T),
            Z = this.props.showArea && this.state.isFocus,
            x = module1343.default.zoneAreaView(t.width, this.state.rectSize),
            D = this.getCarpetLines(t),
            O = (t.width / 3) ** (t.height / 3),
            M = React.default.createElement(module13.Image, {
              style: [
                E.aiImage,
                {
                  width: O,
                  height: O,
                  transform: [
                    {
                      rotateZ: -1 * this.props.mapDeg + 'deg',
                    },
                  ],
                },
              ],
              resizeMode: 'contain',
              source: module1120.MapAITag,
            }),
            I = ((globals.isRTL ? -1 : 1) * this.state.slopeAngle).toString() + 'rad',
            j = this._getAccessibilityLabelKey(),
            N = !this.state.editable;

          return React.default.createElement(
            module13.View,
            {
              pointerEvents: N ? 'none' : 'box-none',
              style: {
                position: 'absolute',
                left: t.x - T,
                top: t.y - T,
                width: o,
                height: s,
                overflow: 'visible',
                transform: [
                  {
                    rotate: I,
                  },
                  {
                    translateX: 0,
                  },
                ],
                zIndex: this.state.isFocus ? 1 : 0,
                elevation: this.state.isFocus ? 1 : 0,
              },
            },
            Z && x,
            React.default.createElement(
              module13.View,
              {
                pointerEvents: 'box-none',
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: o,
                  height: s,
                  overflow: 'visible',
                },
              },
              React.default.createElement(
                module13.View,
                module22.default({}, module391.default.getAccessibilityLabel(j), this.panProxy.panResponder.panHandlers, {
                  pointerEvents: N ? 'none' : 'auto',
                  style: {
                    position: 'absolute',
                    left: T,
                    top: T,
                    width: t.width,
                    height: t.height,
                    overflow: 'visible',
                    justifyContent: 'center',
                    backgroundColor: this._getBackgroudColor(),
                    borderColor: this._getborderColor(),
                    borderWidth: this.carpetCanSave ? 0 : 2,
                  },
                }),
                this.carpetCanSave && D,
                this.state.showAITag && M
              ),
              this.state.isFocus && B,
              l && c,
              this.state.isFocus && u,
              p && v,
              this.state.isFocus && C,
              P && R,
              F && z
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
          return this.state.type == module1120.FbzType.FBZ_TYPE_REGULAR;
        },
      },
      {
        key: 'moppingForbidden',
        get: function () {
          return this.state.type == module1120.FbzType.FBZ_TYPE_MOPPING;
        },
      },
      {
        key: 'cleanForbidden',
        get: function () {
          return this.state.type == module1120.FbzType.FBZ_TYPE_CLEANING;
        },
      },
      {
        key: 'feedbackMark',
        get: function () {
          return this.state.type == module1120.FbzType.RECT_TYPE_FBMARK;
        },
      },
      {
        key: 'customCarpet',
        get: function () {
          return this.state.type == module1120.FbzType.RECT_TYPE_CARPET;
        },
      },
      {
        key: 'ignoreCarpet',
        get: function () {
          return this.state.type == module1120.FbzType.FBZ_TYPE_CARPET;
        },
      },
      {
        key: 'carpetCanSave',
        get: function () {
          return this.customCarpet || (this.ignoreCarpet && !this.state.newAdded);
        },
      },
    ]);
    return F;
  })(React.default.Component);

exports.default = F;
F.contextType = module1193.AppConfigContext;
F.defaultProps = {
  transform: {
    xx: 1,
    yy: 1,
  },
  editable: false,
  showArea: false,
  mapDeg: 0,
};
var E = module13.StyleSheet.create({
  aiImage: {
    alignSelf: 'center',
  },
});
