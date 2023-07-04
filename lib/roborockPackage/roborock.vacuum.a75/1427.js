exports.CleanModeImage = function (t, o) {
  switch (o.cleanMode) {
    case T.SilentClean:
      return require(t ? d[22] : d[23]);

    case T.StandardClean:
      return require(t ? d[24] : d[25]);

    case T.StrongClean:
      return require(t ? d[26] : d[27]);

    case T.MaxClean:
      return require(t ? d[28] : d[29]);

    case T.NoClean:
      return '';

    case T.MaxPlus:
      return require(t ? d[30] : d[31]);

    default:
      return '';
  }
};

exports.WaterModeImage = function (t, o) {
  var n, l, u;
  if (!module390.default.isElectronicWaterBoxSupported() && !module390.default.isShakeMopStrengthSupported()) return '';
  if ((null != (n = null == o ? undefined : null == (l = o.mopMode) ? undefined : l.id) ? n : -1) > 0 || (null != (u = null == o ? undefined : o.mopTemplateId) ? u : -1) > 0)
    return '';

  switch (o.waterMode) {
    case k.NoWater:
      return '';

    case k.LowWater:
      return require(O ? (t ? d[32] : d[33]) : t ? d[34] : d[35]);

    case k.MediumWater:
      return require(O ? (t ? d[36] : d[37]) : t ? d[38] : d[39]);

    case k.HighWater:
      return require(O ? (t ? d[40] : d[41]) : t ? d[42] : d[43]);

    default:
      return q(t, o.waterMode);
  }
};

exports.MopTemplateImage = q;

exports.MopModeImage = function (t, o) {
  var n, l, u;

  if ((null != (n = null == o ? undefined : null == (l = o.mopMode) ? undefined : l.id) ? n : -1) > 0 || (null != (u = null == o ? undefined : o.mopTemplateId) ? u : -1) > 0) {
    var s,
      c = (null == o ? undefined : null == (s = o.mopMode) ? undefined : s.id) || (null == o ? undefined : o.mopTemplateId);
    return q(t, c);
  }

  if (o.waterMode == k.NoWater) return '';
  if (o.cleanMode != T.NoClean) return '';

  switch (o.mopMode) {
    case P.Normal:
      return require(t ? d[46] : d[47]);

    case P.Intensive:
      return require(t ? d[48] : d[49]);

    case P.SlowIntensive:
      return require(t ? d[50] : d[51]);

    default:
      return '';
  }
};

var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1428 = require('./1428'),
  module1431 = require('./1431'),
  module1432 = require('./1432'),
  module1433 = require('./1433'),
  module390 = require('./390'),
  module1407 = require('./1407'),
  module1199 = require('./1199'),
  module391 = require('./391'),
  module1126 = require('./1126'),
  module1408 = require('./1408'),
  module1434 = require('./1434'),
  module424 = require('./424');

function W(t, o) {
  var n = Object.keys(t);

  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(t);
    if (o)
      l = l.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      });
    n.push.apply(n, l);
  }

  return n;
}

function L(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      W(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      W(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function x(t) {
  var o = N();
  return function () {
    var n,
      l = module12.default(t);

    if (o) {
      var u = module12.default(this).constructor;
      n = Reflect.construct(l, arguments, u);
    } else n = l.apply(this, arguments);

    return module11.default(this, n);
  };
}

function N() {
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

var T = {
  SilentClean: 101,
  StandardClean: 102,
  StrongClean: 103,
  MaxClean: 104,
  NoClean: 105,
  MaxPlus: 108,
};
exports.CleanSettingMode = T;
var k = {
  NoWater: 200,
  LowWater: 201,
  MediumWater: 202,
  HighWater: 203,
  Custom: 207,
};
exports.WaterSettingMode = k;
var P = {
  Normal: 300,
  Intensive: 301,
  SlowIntensive: 303,
  Fast: 304,
};
exports.MopSettingMode = P;
var R = {
  Dry: 3,
  Normal: 1,
  Wet: 2,
};
exports.GarnetMopMode = R;
var O = module390.default.isShakeMopStrengthSupported() && !module424.DMM.isPearl;

function q(t, o) {
  if (o == k.Custom) return require(t ? d[44] : d[45]);
  var n = null == o ? undefined : o.id;

  switch (n) {
    case R.Dry:
      return require(t ? d[34] : d[35]);

    case R.Normal:
      return require(t ? d[38] : d[39]);

    case R.Wet:
      return require(t ? d[42] : d[43]);

    default:
      return n ? require(t ? d[44] : d[45]) : '';
  }
}

var A = (function (t) {
  module9.default(c, t);
  var n = x(c);

  function c(t) {
    var o;
    module6.default(this, c);

    (o = n.call(this, t)).onLayoutRootView = function (t) {
      o.didlayout = true;
    };

    o.onLayoutSelectSymbolView = function (t) {
      o.selectSymbolWidth = t.nativeEvent.layout.width;
    };

    o.onLayoutModesView = function (t) {
      o.modesWidth = t.nativeEvent.layout.width;
      o.didlayoutMode = true;
    };

    o.onLayoutSequenceIDView = function (t) {
      o.sequenceIDWidth = t.nativeEvent.layout.width;
      o.didlayoutSequence = true;
    };

    o.onLayoutRoomNameView = function (t) {
      o.roomNameWidth = t.nativeEvent.layout.width;
    };

    o.onLayoutTagView = function (t) {
      o.setState({
        tagViewWidth: t.nativeEvent.layout.width,
      });
    };

    o.selectSymbolWidth = 0;
    o.modesWidth = 0;
    o.sequenceIDWidth = 0;
    o.roomNameWidth = 0;
    o.scale = new module13.Animated.Value(1);
    o.tagOpacity = new module13.Animated.Value(1);
    o.didlayout = false;
    o.panPressHandler = module13.PanResponder.create({
      onStartShouldSetPanResponder: function () {
        return true;
      },
      onMoveShouldSetPanResponder: function () {
        return false;
      },
      onPanResponderStart: function (t, o) {},
      onPanResponderEnd: function (t, n) {
        if (!o.panMove) null == o.props.onPressTag || o.props.onPressTag();
        o.panMove = false;
      },
      onPanResponderMove: function (t, n) {
        if (n.dx >= 2 || n.dy >= 2) o.panMove = true;
      },
      onPanResponderTerminationRequest: function (t, o) {
        return true;
      },
      onPanResponderTerminate: function (t, o) {},
    });
    return o;
  }

  module7.default(c, [
    {
      key: 'theme',
      get: function () {
        return this.context.theme.bubble;
      },
    },
  ]);
  module7.default(c, [
    {
      key: 'cleanImage',
      value: function (t, o) {
        switch (o) {
          case T.SilentClean:
            return require(t ? d[22] : d[23]);

          case T.StandardClean:
            return require(t ? d[24] : d[25]);

          case T.StrongClean:
            return require(t ? d[26] : d[27]);

          case T.MaxClean:
            return require(t ? d[28] : d[29]);

          case T.NoClean:
            return '';

          case T.MaxPlus:
            return require(t ? d[30] : d[31]);

          default:
            return '';
        }
      },
    },
    {
      key: 'waterModeImage',
      value: function (t, o) {
        if (!module390.default.isElectronicWaterBoxSupported() && !module390.default.isShakeMopStrengthSupported()) return '';
        if (this.hasMopTemplate) return '';

        switch (o) {
          case k.NoWater:
            return '';

          case k.LowWater:
            return require(O ? (t ? d[32] : d[33]) : t ? d[34] : d[35]);

          case k.MediumWater:
            return require(O ? (t ? d[36] : d[37]) : t ? d[38] : d[39]);

          case k.HighWater:
            return require(O ? (t ? d[40] : d[41]) : t ? d[42] : d[43]);

          default:
            return this.mopTemplateImage(t, o);
        }
      },
    },
    {
      key: 'mopModeImage',
      value: function (t, o) {
        if (this.hasMopTemplate) return this.mopTemplateImage(t, o);
        if (this.props.waterMode == k.NoWater) return '';
        if (this.props.cleanMode != T.NoClean) return '';

        switch (o) {
          case P.Normal:
            return require(t ? d[46] : d[47]);

          case P.Intensive:
            return require(t ? d[48] : d[49]);

          case P.SlowIntensive:
            return require(t ? d[50] : d[51]);

          default:
            return '';
        }
      },
    },
    {
      key: 'mopTemplateImage',
      value: function (t, o) {
        var n, l;
        if (o == k.Custom) return require(t ? d[44] : d[45]);

        switch ((null == o ? undefined : o.id) || (null == (n = this.props) ? undefined : n.mopTemplateId)) {
          case R.Dry:
            return require(t ? d[34] : d[35]);

          case R.Normal:
            return require(t ? d[38] : d[39]);

          case R.Wet:
            return require(t ? d[42] : d[43]);

          default:
            return (null == o ? undefined : o.id) || (null == (l = this.props) ? undefined : l.mopTemplateId) ? require(t ? d[44] : d[45]) : '';
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          n,
          l,
          u,
          s,
          c,
          p = this,
          I = this.props.roomTag > 0 && (null == (t = module1126.RoomTagInfo[this.props.roomTag]) ? undefined : t.bubble_image),
          B = Boolean((this.props.cleanMode > 0 || this.props.waterMode > 0 || this.props.mopMode > 0) && this.hasMode),
          W = Boolean(this.props.sequenceID.length > 0 && !this.isSelected && module390.default.isOrderCleanSupported() && this.hasSequence),
          x = Boolean(this.props.roomName.length > 0 && (!B || this.didlayoutMode) && (!W || this.didlayoutSequence) && this.hasName),
          N = Boolean(this.props.roomTag > 0 && undefined != this.props.roomTag && null != this.props.roomTag && I && this.hasName),
          T = this.isSelected;
        this.lastRoomName = this.props.roomName;
        if (!B) this.didlayoutMode = true;
        if (!W) this.didlayoutSequence = true;

        var k = this.didlayout ? 1 : 0,
          P = T ? 1 : k,
          R = this.props.roomColor ? this.props.roomColor : 'transparent',
          O = !B && !W && T,
          q = W && !T,
          A = q && !B,
          j = Boolean(this.isSelected || W),
          z = this.cleanImage(this.isSelected, this.props.cleanMode),
          _ = this.waterModeImage(this.isSelected, this.props.waterMode),
          F = this.mopModeImage(this.isSelected, this.props.mopMode),
          G = function (t) {
            return module391.default.iOSAndroidReturn(t + 1, t);
          };

        if (!(B || T || W || x || N)) return React.default.createElement(module13.View, null);
        var Q = this.isSelected ? (A ? 0 : B ? 2 : 0.5) : A ? 0 : B ? 2 : 1.5,
          U = this.isSelected ? 2 : B ? 1 : 3,
          Y = ((null != (n = this.props.colorIndex) ? n : 0) - 1) ** 0,
          J = null != (l = this.theme.tagTintColors[Y]) ? l : '#EEEEEE',
          K = null != (u = this.theme.tagBackgroundColors[Y]) ? u : '#AAAAAA',
          X = null != (s = null == (c = this.state) ? undefined : c.tagViewWidth) ? s : 20,
          Z = 18,
          $ = L(
            L({}, module1434.BaseShadow),
            {},
            {
              width: X - 2,
              height: Z - 3,
              radius: 2,
              color: '#000000',
              opacity: 0.2,
              x: 3,
              y: 5,
            }
          ),
          ee = N || x;
        module13.Animated.parallel([
          module13.Animated.timing(this.scale, {
            toValue: (this.props.transform.xx / 2.2) ** 1.5,
            duration: 0,
          }),
          module13.Animated.timing(this.tagOpacity, {
            toValue: this.scale.interpolate({
              inputRange: [0.4, 1.5],
              outputRange: [1, 0.8],
            }),
            duration: 0,
          }),
        ]).start();
        var te = React.default.createElement(
            module13.View,
            {
              style: H.tagMain,
            },
            React.default.createElement(
              module13.View,
              {
                style: H.tagShadow,
              },
              React.default.createElement(module1408.BoxShadow, {
                setting: $,
              })
            ),
            React.default.createElement(
              module13.Animated.View,
              {
                style: [
                  H.tagView,
                  {
                    backgroundColor: K,
                  },
                ],
                onLayout: this.onLayoutTagView,
                opacity: this.tagOpacity,
              },
              N &&
                React.default.createElement(module13.Image, {
                  style: [
                    H.tagImg,
                    {
                      tintColor: J,
                    },
                  ],
                  source: I,
                }),
              x &&
                React.default.createElement(
                  module13.Text,
                  {
                    style: [
                      H.tagText,
                      {
                        color: J,
                      },
                    ],
                    numberOfLines: 1,
                    onLayout: this.onLayoutRoomNameView,
                  },
                  this.props.roomName
                )
            )
          ),
          oe = ee
            ? {
                position: 'absolute',
                bottom: Z + 4,
              }
            : {},
          ne = O
            ? React.default.createElement(module1428.BubbleView, {
                style: oe,
                backgroundColor: R,
                sequenceID: this.props.sequenceID,
              })
            : React.default.createElement(
                module13.View,
                {
                  style: oe,
                },
                React.default.createElement(
                  module1407.Bubble,
                  {
                    hasBottomDecorator: this.isSelected,
                    hasShadow: this.isSelected,
                    style: {
                      backgroundColor: this.isSelected ? 'white' : this.theme.backgroundColor,
                      opacity: P,
                    },
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: H.bubbleView,
                      onLayout: this.onLayoutRootView,
                    },
                    (j || B) &&
                      React.default.createElement(
                        module13.View,
                        {
                          style: [
                            H.root,
                            {
                              paddingHorizontal: A ? 0 : Q,
                              paddingVertical: U,
                            },
                          ],
                        },
                        Boolean(j) &&
                          (function () {
                            if ((q && ((paddingLeft = 0), (paddingRight = 0)), B)) {
                              W = p.props.sequenceID.length > 0 && module390.default.isOrderCleanSupported();
                              T = !W;
                              var t = G(1),
                                o = G(1);
                              return React.default.createElement(
                                module1407.Bubble,
                                {
                                  hasShadow: false,
                                  hasBottomDecorator: false,
                                  style: {
                                    backgroundColor: p.isSelected ? R : 'rgba(255,255,255, 0.3)',
                                    paddingHorizontal: t,
                                    paddingVertical: o,
                                  },
                                },
                                React.default.createElement(
                                  module13.View,
                                  {
                                    style: {
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    },
                                  },
                                  T &&
                                    React.default.createElement(module1432.SelectSymbolView, {
                                      textContent: p.props.sequenceID,
                                      backgroundColor: R,
                                      onLayout: p.onLayoutSelectSymbolView,
                                    }),
                                  W &&
                                    React.default.createElement(module1433.SequenceIDView, {
                                      sequenceID: p.props.sequenceID,
                                      hasBackgroundBubble: true,
                                      onLayout: p.onLayoutSequenceIDView,
                                    })
                                )
                              );
                            }

                            return React.default.createElement(
                              module13.View,
                              {
                                style: {
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingLeft: p.isSelected ? 1 : 3,
                                  paddingRight: 3,
                                },
                              },
                              T &&
                                React.default.createElement(module1432.SelectSymbolView, {
                                  textContent: p.props.sequenceID,
                                  backgroundColor: R,
                                  onLayout: p.onLayoutSelectSymbolView,
                                }),
                              W &&
                                React.default.createElement(module1433.SequenceIDView, {
                                  sequenceID: p.props.sequenceID,
                                  hasBackgroundBubble: true,
                                  onLayout: p.onLayoutSequenceIDView,
                                })
                            );
                          })(),
                        B &&
                          React.default.createElement(module1431.ModesView, {
                            style: H.modesView,
                            width: 15,
                            height: 15,
                            tintColor: this.isSelected ? 'rgba(155, 155, 155, 1)' : 'white',
                            mopModeSrc: F,
                            cleanModeSrc: z,
                            waterModeSrc: _,
                            onLayout: this.onLayoutModesView,
                          })
                      )
                  )
                )
              );
        return React.default.createElement(
          module13.Animated.View,
          module22.default(
            {
              style: {
                transform: [
                  {
                    scale: this.scale,
                  },
                ],
                alignItems: 'center',
              },
            },
            this.panPressHandler.panHandlers
          ),
          ne,
          ee && te
        );
      },
    },
    {
      key: 'hasMopTemplate',
      get: function () {
        var t, o, n, l, u;
        return (
          (null != (t = null == (o = this.props) ? undefined : null == (n = o.mopMode) ? undefined : n.id) ? t : -1) > 0 ||
          (null != (l = null == (u = this.props) ? undefined : u.mopTemplateId) ? l : -1) > 0
        );
      },
    },
    {
      key: 'isSelected',
      get: function () {
        return this.props.isSelected;
      },
    },
    {
      key: 'hasMode',
      get: function () {
        return Boolean(this.props.displayMode & module1126.BlockBubbleShowInfo.CLEANMODE);
      },
    },
    {
      key: 'hasSequence',
      get: function () {
        return Boolean(this.props.displayMode & module1126.BlockBubbleShowInfo.CLEANSEQUENCE);
      },
    },
    {
      key: 'hasName',
      get: function () {
        return Boolean(this.props.displayMode & module1126.BlockBubbleShowInfo.DISPLAYNAME);
      },
    },
  ]);
  return c;
})(React.default.Component);

exports.RoomInfoBubble = A;
A.contextType = module1199.AppConfigContext;
A.defaultProps = {
  hideShadow: false,
};

var j = (function (t) {
  module9.default(n, t);
  var o = x(n);

  function n() {
    module6.default(this, n);
    return o.apply(this, arguments);
  }

  module7.default(n, [
    {
      key: 'render',
      value: function () {
        var t = this.cleanImage(false, this.props.cleanMode),
          o = this.waterModeImage(false, this.props.waterMode),
          n = this.mopModeImage(false, this.props.mopMode);
        return React.default.createElement(
          module1407.Bubble,
          {
            hasShadow: false,
            hasBottomDecorator: this.props.hasBottomDecorator,
            style: this.props.style,
          },
          React.default.createElement(module1431.ModesView, {
            width: this.props.iconWidth,
            height: this.props.iconHeight,
            tintColor: this.props.tintColor,
            mopModeSrc: n,
            cleanModeSrc: t,
            waterModeSrc: o,
            onLayout: this.onLayoutModesView,
          })
        );
      },
    },
  ]);
  return n;
})(A);

exports.ModeBubble = j;
j.defaultProps = {
  tintColor: '#007AFF',
  cleanMode: '',
  waterMode: '',
  mopMode: '',
  hasBottomDecorator: true,
  iconWidth: 17,
  iconHeight: 17,
};
var H = module13.StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  modesView: {
    paddingHorizontal: 2,
  },
  tagMain: {
    alignSelf: 'center',
  },
  tagShadow: {
    position: 'absolute',
    flex: 1,
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 2,
    height: 18,
    borderRadius: 2,
    marginTop: 2,
  },
  tagImg: {
    width: 12,
    height: 12,
  },
  tagText: {
    paddingHorizontal: 2,
    fontSize: 8,
    flexWrap: 'nowrap',
  },
});
