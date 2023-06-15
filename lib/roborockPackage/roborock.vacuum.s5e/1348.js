exports.CleanModeImage = function (t, o) {
  switch (o.cleanMode) {
    case k.SilentClean:
      return require(t ? d[21] : d[22]);

    case k.StandardClean:
      return require(t ? d[23] : d[24]);

    case k.StrongClean:
      return require(t ? d[25] : d[26]);

    case k.MaxClean:
      return require(t ? d[27] : d[28]);

    case k.NoClean:
      return '';

    case k.MaxPlus:
      return require(t ? d[29] : d[30]);

    default:
      return '';
  }
};

exports.WaterModeImage = function (t, o) {
  var n, l, s;
  if (!module390.default.isElectronicWaterBoxSupported() && !module390.default.isShakeMopStrengthSupported()) return '';
  if ((null != (n = null == o ? undefined : null == (l = o.mopMode) ? undefined : l.id) ? n : -1) > 0 || (null != (s = null == o ? undefined : o.mopTemplateId) ? s : -1) > 0)
    return '';

  switch (o.waterMode) {
    case x.NoWater:
      return '';

    case x.LowWater:
      return require(R ? (t ? d[31] : d[32]) : t ? d[33] : d[34]);

    case x.MediumWater:
      return require(R ? (t ? d[35] : d[36]) : t ? d[37] : d[38]);

    case x.HighWater:
      return require(R ? (t ? d[39] : d[40]) : t ? d[41] : d[42]);

    default:
      return '';
  }
};

exports.MopTemplateImage = O;

exports.MopModeImage = function (t, o) {
  var n, l, s;

  if ((null != (n = null == o ? undefined : null == (l = o.mopMode) ? undefined : l.id) ? n : -1) > 0 || (null != (s = null == o ? undefined : o.mopTemplateId) ? s : -1) > 0) {
    var u,
      c = (null == o ? undefined : null == (u = o.mopMode) ? undefined : u.id) || (null == o ? undefined : o.mopTemplateId);
    return O(t, c);
  }

  if (o.waterMode == x.NoWater) return '';
  if (o.cleanMode != k.NoClean) return '';

  switch (o.mopMode) {
    case P.Normal:
      return require(t ? d[45] : d[46]);

    case P.Intensive:
      return require(t ? d[47] : d[48]);

    case P.SlowIntensive:
      return require(t ? d[49] : d[50]);

    default:
      return '';
  }
};

var module22 = require('./22'),
  module50 = require('./50'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1349 = require('./1349'),
  module1352 = require('./1352'),
  module1353 = require('./1353'),
  module1354 = require('./1354'),
  module390 = require('./390'),
  module1327 = require('./1327'),
  module1121 = require('./1121'),
  module391 = require('./391'),
  module1057 = require('./1057'),
  module1328 = require('./1328'),
  module1355 = require('./1355');

function B(t, o) {
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

function W(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      B(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      B(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function L(t) {
  var o = N();
  return function () {
    var n,
      l = module11.default(t);

    if (o) {
      var s = module11.default(this).constructor;
      n = Reflect.construct(l, arguments, s);
    } else n = l.apply(this, arguments);

    return module9.default(this, n);
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

var k = {
  SilentClean: 101,
  StandardClean: 102,
  StrongClean: 103,
  MaxClean: 104,
  NoClean: 105,
  MaxPlus: 108,
};
exports.CleanSettingMode = k;
var x = {
  NoWater: 200,
  LowWater: 201,
  MediumWater: 202,
  HighWater: 203,
};
exports.WaterSettingMode = x;
var P = {
  Normal: 300,
  Intensive: 301,
  SlowIntensive: 303,
};
exports.MopSettingMode = P;
var T = {
  Dry: 3,
  Normal: 1,
  Wet: 2,
};
exports.GarnetMopMode = T;
var R = module390.default.isShakeMopStrengthSupported();

function O(t, o) {
  var n = null == o ? undefined : o.id;

  switch (n) {
    case T.Dry:
      return require(t ? d[33] : d[34]);

    case T.Normal:
      return require(t ? d[37] : d[38]);

    case T.Wet:
      return require(t ? d[41] : d[42]);

    default:
      return n ? require(t ? d[43] : d[44]) : '';
  }
}

var q = (function (t) {
  module7.default(c, t);
  var n = L(c);

  function c(t) {
    var o;
    module4.default(this, c);

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
    o.scale = new module12.Animated.Value(1);
    o.tagOpacity = new module12.Animated.Value(1);
    o.didlayout = false;
    o.panPressHandler = module12.PanResponder.create({
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
        o.panMove = true;
      },
      onPanResponderTerminationRequest: function (t, o) {
        return true;
      },
      onPanResponderTerminate: function (t, o) {},
    });
    return o;
  }

  module5.default(c, [
    {
      key: 'theme',
      get: function () {
        return this.context.theme.bubble;
      },
    },
  ]);
  module5.default(c, [
    {
      key: 'cleanImage',
      value: function (t, o) {
        switch (o) {
          case k.SilentClean:
            return require(t ? d[21] : d[22]);

          case k.StandardClean:
            return require(t ? d[23] : d[24]);

          case k.StrongClean:
            return require(t ? d[25] : d[26]);

          case k.MaxClean:
            return require(t ? d[27] : d[28]);

          case k.NoClean:
            return '';

          case k.MaxPlus:
            return require(t ? d[29] : d[30]);

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
          case x.NoWater:
            return '';

          case x.LowWater:
            return require(R ? (t ? d[31] : d[32]) : t ? d[33] : d[34]);

          case x.MediumWater:
            return require(R ? (t ? d[35] : d[36]) : t ? d[37] : d[38]);

          case x.HighWater:
            return require(R ? (t ? d[39] : d[40]) : t ? d[41] : d[42]);

          default:
            return this.mopTemplateImage(t, o);
        }
      },
    },
    {
      key: 'mopModeImage',
      value: function (t, o) {
        if (this.hasMopTemplate) return this.mopTemplateImage(t, o);
        if (this.props.waterMode == x.NoWater) return '';
        if (this.props.cleanMode != k.NoClean) return '';

        switch (o) {
          case P.Normal:
            return require(t ? d[45] : d[46]);

          case P.Intensive:
            return require(t ? d[47] : d[48]);

          case P.SlowIntensive:
            return require(t ? d[49] : d[50]);

          default:
            return '';
        }
      },
    },
    {
      key: 'mopTemplateImage',
      value: function (t, o) {
        var n, l;

        switch ((null == o ? undefined : o.id) || (null == (n = this.props) ? undefined : n.mopTemplateId)) {
          case T.Dry:
            return require(t ? d[33] : d[34]);

          case T.Normal:
            return require(t ? d[37] : d[38]);

          case T.Wet:
            return require(t ? d[41] : d[42]);

          default:
            return (null == o ? undefined : o.id) || (null == (l = this.props) ? undefined : l.mopTemplateId) ? require(t ? d[43] : d[44]) : '';
        }
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          n,
          l,
          s,
          u,
          c,
          p = this,
          I = this.props.roomTag > 0 && (null == (t = module1057.RoomTagInfo[this.props.roomTag]) ? undefined : t.bubble_image),
          B = Boolean((this.props.cleanMode > 0 || this.props.waterMode > 0 || this.props.mopMode > 0) && this.hasMode),
          L = Boolean(this.props.sequenceID.length > 0 && !this.isSelected && module390.default.isOrderCleanSupported() && this.hasSequence),
          N = Boolean(this.props.roomName.length > 0 && (!B || this.didlayoutMode) && (!L || this.didlayoutSequence) && this.hasName),
          k = Boolean(this.props.roomTag > 0 && undefined != this.props.roomTag && null != this.props.roomTag && I && this.hasName),
          x = this.isSelected;
        this.lastRoomName = this.props.roomName;
        if (!B) this.didlayoutMode = true;
        if (!L) this.didlayoutSequence = true;

        var P = this.didlayout ? 1 : 0,
          T = x ? 1 : P,
          R = this.props.roomColor ? this.props.roomColor : 'transparent',
          O = !B && !L && x,
          q = L && !x,
          A = q && !B,
          j = Boolean(this.isSelected || L),
          z = this.cleanImage(this.isSelected, this.props.cleanMode),
          _ = this.waterModeImage(this.isSelected, this.props.waterMode),
          F = this.mopModeImage(this.isSelected, this.props.mopMode),
          G = function (t) {
            return module391.default.iOSAndroidReturn(t + 1, t);
          };

        if (!(B || x || L || N || k)) return React.default.createElement(module12.View, null);
        var Q = this.isSelected ? (A ? 0 : B ? 2 : 0.5) : A ? 0 : B ? 2 : 1.5,
          U = this.isSelected ? 2 : B ? 1 : 3,
          Y = ((null != (n = this.props.colorIndex) ? n : 0) - 1) ** 0,
          J = null != (l = this.theme.tagTintColors[Y]) ? l : '#EEEEEE',
          K = null != (s = this.theme.tagBackgroundColors[Y]) ? s : '#AAAAAA',
          X = null != (u = null == (c = this.state) ? undefined : c.tagViewWidth) ? u : 20,
          Z = 18,
          $ = W(
            W({}, module1355.BaseShadow),
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
          ee = k || N;
        module12.Animated.parallel([
          module12.Animated.timing(this.scale, {
            toValue: (this.props.transform.xx / 2.2) ** 1.5,
            duration: 0,
          }),
          module12.Animated.timing(this.tagOpacity, {
            toValue: this.scale.interpolate({
              inputRange: [0.4, 1.5],
              outputRange: [1, 0.8],
            }),
            duration: 0,
          }),
        ]).start();
        var te = React.default.createElement(
            module12.View,
            module22.default(
              {
                style: H.tagMain,
              },
              this.panPressHandler.panHandlers
            ),
            React.default.createElement(
              module12.View,
              {
                style: H.tagShadow,
              },
              React.default.createElement(module1328.BoxShadow, {
                setting: $,
              })
            ),
            React.default.createElement(
              module12.Animated.View,
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
              k &&
                React.default.createElement(module12.Image, {
                  style: {
                    width: 12,
                    height: 12,
                    tintColor: J,
                  },
                  source: I,
                }),
              N &&
                React.default.createElement(
                  module12.Text,
                  {
                    style: {
                      paddingHorizontal: 2,
                      fontSize: 8,
                      color: J,
                      flexWrap: 'nowrap',
                    },
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
            : {};
        return O
          ? React.default.createElement(
              module12.Animated.View,
              {
                style: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [
                    {
                      scale: this.scale,
                    },
                  ],
                },
              },
              React.default.createElement(module1349.BubbleView, {
                style: oe,
                backgroundColor: R,
                sequenceID: this.props.sequenceID,
                panHandlers: this.panPressHandler.panHandlers,
              }),
              ee && te
            )
          : React.default.createElement(
              module12.Animated.View,
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
              React.default.createElement(
                module12.View,
                {
                  style: oe,
                  pointerEvents: 'none',
                },
                React.default.createElement(
                  module1327.Bubble,
                  {
                    hasBottomDecorator: this.isSelected,
                    hasShadow: this.isSelected,
                    style: {
                      backgroundColor: this.isSelected ? 'white' : this.theme.backgroundColor,
                      opacity: T,
                    },
                  },
                  React.default.createElement(
                    module12.View,
                    {
                      style: H.bubbleView,
                      onLayout: this.onLayoutRootView,
                    },
                    (j || B) &&
                      React.default.createElement(
                        module12.View,
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
                              L = p.props.sequenceID.length > 0 && module390.default.isOrderCleanSupported();
                              x = !L;
                              var t = G(1),
                                o = G(1);
                              return React.default.createElement(
                                module1327.Bubble,
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
                                  module12.View,
                                  {
                                    style: {
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    },
                                  },
                                  x &&
                                    React.default.createElement(module1353.SelectSymbolView, {
                                      textContent: p.props.sequenceID,
                                      backgroundColor: R,
                                      onLayout: p.onLayoutSelectSymbolView,
                                    }),
                                  L &&
                                    React.default.createElement(module1354.SequenceIDView, {
                                      sequenceID: p.props.sequenceID,
                                      hasBackgroundBubble: true,
                                      onLayout: p.onLayoutSequenceIDView,
                                    })
                                )
                              );
                            }

                            return React.default.createElement(
                              module12.View,
                              {
                                style: {
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingLeft: p.isSelected ? 1 : 3,
                                  paddingRight: 3,
                                },
                              },
                              x &&
                                React.default.createElement(module1353.SelectSymbolView, {
                                  textContent: p.props.sequenceID,
                                  backgroundColor: R,
                                  onLayout: p.onLayoutSelectSymbolView,
                                }),
                              L &&
                                React.default.createElement(module1354.SequenceIDView, {
                                  sequenceID: p.props.sequenceID,
                                  hasBackgroundBubble: true,
                                  onLayout: p.onLayoutSequenceIDView,
                                })
                            );
                          })(),
                        B &&
                          React.default.createElement(module1352.ModesView, {
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
              ),
              ee && te
            );
      },
    },
    {
      key: 'hasMopTemplate',
      get: function () {
        var t, o, n, l, s;
        return (
          (null != (t = null == (o = this.props) ? undefined : null == (n = o.mopMode) ? undefined : n.id) ? t : -1) > 0 ||
          (null != (l = null == (s = this.props) ? undefined : s.mopTemplateId) ? l : -1) > 0
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
        return Boolean(this.props.displayMode & module1057.BlockBubbleShowInfo.CLEANMODE);
      },
    },
    {
      key: 'hasSequence',
      get: function () {
        return Boolean(this.props.displayMode & module1057.BlockBubbleShowInfo.CLEANSEQUENCE);
      },
    },
    {
      key: 'hasName',
      get: function () {
        return Boolean(this.props.displayMode & module1057.BlockBubbleShowInfo.DISPLAYNAME);
      },
    },
  ]);
  return c;
})(React.default.Component);

exports.RoomInfoBubble = q;
q.contextType = module1121.AppConfigContext;
q.defaultProps = {
  hideShadow: false,
};

var A = (function (t) {
  module7.default(n, t);
  var o = L(n);

  function n() {
    module4.default(this, n);
    return o.apply(this, arguments);
  }

  module5.default(n, [
    {
      key: 'render',
      value: function () {
        var t = this.cleanImage(false, this.props.cleanMode),
          o = this.waterModeImage(false, this.props.waterMode),
          n = this.mopModeImage(false, this.props.mopMode);
        return React.default.createElement(
          module1327.Bubble,
          {
            hasShadow: false,
            hasBottomDecorator: this.props.hasBottomDecorator,
            style: this.props.style,
          },
          React.default.createElement(module1352.ModesView, {
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
})(q);

exports.ModeBubble = A;
A.defaultProps = {
  tintColor: '#007AFF',
  cleanMode: '',
  waterMode: '',
  mopMode: '',
  hasBottomDecorator: true,
  iconWidth: 17,
  iconHeight: 17,
};
var H = module12.StyleSheet.create({
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
});
