var module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module1285 = require('./1285'),
  module1288 = require('./1288'),
  module1289 = require('./1289'),
  module1290 = require('./1290'),
  module386 = require('./386'),
  module1261 = require('./1261'),
  module506 = require('./506'),
  module387 = require('./387'),
  module415 = require('./415');

function C(t) {
  var o = W();
  return function () {
    var n,
      s = module11.default(t);

    if (o) {
      var c = module11.default(this).constructor;
      n = Reflect.construct(s, arguments, c);
    } else n = s.apply(this, arguments);

    return module9.default(this, n);
  };
}

function W() {
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

var D = {
  SilentClean: 101,
  StandardClean: 102,
  StrongClean: 103,
  MaxClean: 104,
  NoClean: 105,
};
exports.CleanSettingMode = D;
var L = {
  NoWater: 200,
  LowWater: 201,
  MediumWater: 202,
  HighWater: 203,
};
exports.WaterSettingMode = L;
var V = {
  Normal: 300,
  Intensive: 301,
};
exports.MopSettingMode = V;
var E = {
  Dry: 3,
  Normal: 1,
  Wet: 2,
};
exports.GarnetMopMode = E;
var k = module386.default.isShakeMopStrengthSupported(),
  x = {
    None: -1,
    Default: 0,
    EditArea: 1,
    EditMode: 2,
    EditOrder: 3,
    Home: 4,
    HomeWithoutMode: 5,
    OnlyShowMode: 6,
  };
exports.RoomInfoBubbleMode = x;

var B = (function (t) {
  module7.default(u, t);
  var l = C(u);

  function u(t) {
    var n;
    module4.default(this, u);
    (n = l.call(this, t)).selectSymbolWidth = 0;
    n.modesWidth = 0;
    n.sequenceIDWidth = 0;
    n.roomNameWidth = 0;
    n.didlayout = false;
    return n;
  }

  module5.default(u, [
    {
      key: 'theme',
      get: function () {
        return this.context.theme.bubble;
      },
    },
    {
      key: 'cleanImage',
      value: function (t, o) {
        if (this.props.mopMode == V.Intensive && !module415.DMM.isGarnet) return '';

        switch (o) {
          case D.SilentClean:
            return require(t ? d[17] : d[18]);

          case D.StandardClean:
            return require(t ? d[19] : d[20]);

          case D.StrongClean:
            return require(t ? d[21] : d[22]);

          case D.MaxClean:
            return require(t ? d[23] : d[24]);

          case D.NoClean:
            return require(t ? d[25] : d[26]);

          default:
            return '';
        }
      },
    },
    {
      key: 'waterModeImage',
      value: function (t, o) {
        if (module415.DMM.isGarnet) return '';

        switch (o) {
          case L.NoWater:
            return require(k ? (t ? d[27] : d[28]) : t ? d[29] : d[30]);

          case L.LowWater:
            return require(k ? (t ? d[31] : d[32]) : t ? d[33] : d[34]);

          case L.MediumWater:
            return require(k ? (t ? d[35] : d[36]) : t ? d[37] : d[38]);

          case L.HighWater:
            return require(k ? (t ? d[39] : d[40]) : t ? d[41] : d[42]);

          default:
            return this.garnetMopModeImage(t, o);
        }
      },
    },
    {
      key: 'mopModeImage',
      value: function (t, o) {
        if (module415.DMM.isGarnet) return this.garnetMopModeImage(t, o);
        if (this.props.waterMode == L.NoWater) return '';

        switch (o) {
          case V.Normal:
            return require(t ? d[43] : d[44]);

          case V.Intensive:
            return require(t ? d[45] : d[46]);

          default:
            return '';
        }
      },
    },
    {
      key: 'garnetMopModeImage',
      value: function (t, o) {
        var n, s;

        switch ((null == o ? undefined : o.id) || (null == (n = this.props) ? undefined : n.mopTemplateId)) {
          case E.Dry:
            return require(t ? d[33] : d[34]);

          case E.Normal:
            return require(t ? d[37] : d[38]);

          case E.Wet:
            return require(t ? d[41] : d[42]);

          default:
            return (null != o && o.id) || (null != (s = this.props) && s.mopTemplateId) ? require(t ? d[47] : d[48]) : '';
        }
      },
    },
    {
      key: 'onLayoutRootView',
      value: function (t) {
        this.didlayout = true;
      },
    },
    {
      key: 'onLayoutSelectSymbolView',
      value: function (t) {
        this.selectSymbolWidth = t.nativeEvent.layout.width;
      },
    },
    {
      key: 'onLayoutModesView',
      value: function (t) {
        this.modesWidth = t.nativeEvent.layout.width;
        this.didlayoutMode = true;
      },
    },
    {
      key: 'onLayoutSequenceIDView',
      value: function (t) {
        this.sequenceIDWidth = t.nativeEvent.layout.width;
        this.didlayoutSequence = true;
      },
    },
    {
      key: 'onLayoutRoomNameView',
      value: function (t) {
        this.roomNameWidth = t.nativeEvent.layout.width;
      },
    },
    {
      key: 'render',
      value: function () {
        var t = this,
          o = this.props.cleanMode > 0 || this.props.waterMode > 0 || this.props.mopMode > 0,
          n = this.props.sequenceID.length > 0 && !this.props.isSelected && module386.default.isOrderCleanSupported(),
          s = this.props.roomName.length > 0 && (!o || this.didlayoutMode) && (!n || this.didlayoutSequence),
          l = this.props.isSelected,
          u = this.props.displayMode;

        switch (u) {
          case x.EditArea:
            o = false;
            n = false;
            break;

          case x.EditMode:
            n = false;
            s = false;
            break;

          case x.EditOrder:
            o = false;
            s = false;
            break;

          case x.HomeWithoutMode:
            o = false;
            break;

          case x.OnlyShowMode:
            n = false;
            s = false;
            break;

          case x.Home:
          default:
            o = o && module386.default.isCustomModeIconSupported();
        }

        if (!o) this.didlayoutMode = true;
        if (!n) this.didlayoutSequence = true;
        var w = u == x.Home || u == x.HomeWithoutMode,
          I = w ? (this.didlayout ? 1 : 0) : 1,
          C = w && !l && this.props.maxWidth ? this.props.maxWidth : module12.Dimensions.get('window').width,
          W = this.modesWidth + this.sequenceIDWidth + 16,
          D = C - W;
        if (((D < 25 && s) || C < W) && w) I = 0;
        var L = l ? 1 : I,
          V = this.props.roomColor ? this.props.roomColor : 'transparent',
          E = !o && !n && !s && l,
          k = n && !s && !l,
          B = k && !o,
          R = this.props.isSelected || s || n,
          N = this.cleanImage(this.props.isSelected, this.props.cleanMode),
          T = this.waterModeImage(this.props.isSelected, this.props.waterMode),
          H = this.mopModeImage(this.props.isSelected, this.props.mopMode);
        if (E)
          return React.default.createElement(module1285.BubbleView, {
            backgroundColor: V,
            sequenceID: this.props.sequenceID,
          });

        var O = function (t) {
          return module387.default.iOSAndroidReturn(t + 1, t);
        };

        if (!(o || s || l || n)) return React.default.createElement(module12.View, null);
        var z = this.props.isSelected ? (B ? 0 : o ? 2 : 0.5) : B ? 0 : o ? 2 : 1.5,
          A = this.props.isSelected ? 2 : o ? 1 : 3;
        return React.default.createElement(
          module1261.Bubble,
          {
            hasBottomDecorator: this.props.isSelected,
            hasShadow: this.props.isSelected,
            style: {
              backgroundColor: this.props.isSelected ? 'white' : this.theme.backgroundColor,
              opacity: L,
            },
          },
          React.default.createElement(
            module12.View,
            {
              style: {
                flexDirection: 'column',
                alignItems: 'center',
              },
              onLayout: this.onLayoutRootView.bind(this),
            },
            React.default.createElement(
              module12.View,
              {
                style: [
                  q.root,
                  {
                    paddingHorizontal: B ? 0 : z,
                    paddingVertical: A,
                  },
                ],
              },
              R &&
                (function () {
                  t.props.isSelected;
                  t.props.isSelected;

                  if ((k || t.props.isSelected, o)) {
                    var u = n ? (t.props.isSelected ? 0 : 1.5) : 2.5;
                    n = t.props.sequenceID.length > 0 && module386.default.isOrderCleanSupported();
                    l = !(s || n);
                    var h = t.props.isSelected ? O(s ? 3 : 1) : O(s && n ? 4 : s ? 3 : 1),
                      f = t.props.isSelected ? O(s ? 3 : 1) : O(s ? -1 : 1);
                    return React.default.createElement(
                      module1261.Bubble,
                      {
                        hasShadow: false,
                        hasBottomDecorator: false,
                        style: {
                          backgroundColor: t.props.isSelected ? V : 'rgba(255,255,255, 0.3)',
                          paddingHorizontal: h,
                          paddingVertical: f,
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
                        l &&
                          React.default.createElement(module1289.SelectSymbolView, {
                            textContent: t.props.sequenceID,
                            backgroundColor: V,
                            onLayout: t.onLayoutSelectSymbolView.bind(t),
                          }),
                        n &&
                          React.default.createElement(module1290.SequenceIDView, {
                            sequenceID: t.props.sequenceID,
                            hasBackgroundBubble: !s,
                            onLayout: t.onLayoutSequenceIDView.bind(t),
                          }),
                        s &&
                          React.default.createElement(
                            module12.Text,
                            {
                              style: [
                                t.props.isSelected ? q.selectedBubbleText : q.text,
                                {
                                  minWidth: 0,
                                  maxWidth: D,
                                  marginLeft: u,
                                },
                              ],
                              numberOfLines: 1,
                              onLayout: t.onLayoutRoomNameView.bind(t),
                            },
                            '' + t.props.roomName
                          )
                      )
                    );
                  }

                  var w = n ? (t.props.isSelected ? 0 : 1.5) : 2.5;
                  return React.default.createElement(
                    module12.View,
                    {
                      style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: t.props.isSelected ? 1 : 3,
                        paddingRight: 3,
                      },
                    },
                    l &&
                      React.default.createElement(module1289.SelectSymbolView, {
                        textContent: t.props.sequenceID,
                        backgroundColor: V,
                        onLayout: t.onLayoutSelectSymbolView.bind(t),
                      }),
                    n &&
                      React.default.createElement(module1290.SequenceIDView, {
                        sequenceID: t.props.sequenceID,
                        hasBackgroundBubble: !s,
                        onLayout: t.onLayoutSequenceIDView.bind(t),
                      }),
                    s &&
                      React.default.createElement(
                        module12.Text,
                        {
                          style: [
                            t.props.isSelected ? q.selectedText : q.text,
                            {
                              minWidth: 0,
                              maxWidth: D,
                              marginLeft: w,
                            },
                          ],
                          numberOfLines: 1,
                          onLayout: t.onLayoutRoomNameView.bind(t),
                        },
                        '' + t.props.roomName
                      )
                  );
                })(),
              o &&
                React.default.createElement(module1288.ModesView, {
                  style: {
                    paddingHorizontal: 2,
                  },
                  tintColor: this.props.isSelected ? 'rgba(155, 155, 155, 1)' : 'white',
                  mopModeSrc: H,
                  cleanModeSrc: N,
                  waterModeSrc: T,
                  onLayout: this.onLayoutModesView.bind(this),
                })
            )
          )
        );
      },
    },
  ]);
  return u;
})(React.default.Component);

exports.RoomInfoBubble = B;
B.contextType = module506.AppConfigContext;

var R = (function (t) {
  module7.default(u, t);
  var l = C(u);

  function u() {
    module4.default(this, u);
    return l.apply(this, arguments);
  }

  module5.default(u, [
    {
      key: 'render',
      value: function () {
        var t = this.cleanImage(false, this.props.cleanMode),
          o = this.waterModeImage(false, this.props.waterMode),
          n = this.mopModeImage(false, this.props.mopMode);
        return React.default.createElement(
          module1261.Bubble,
          {
            hasShadow: false,
            hasBottomDecorator: this.props.hasBottomDecorator,
            style: this.props.style,
          },
          React.default.createElement(module1288.ModesView, {
            width: this.props.iconWidth,
            height: this.props.iconHeight,
            tintColor: this.props.tintColor,
            mopModeSrc: n,
            cleanModeSrc: t,
            waterModeSrc: o,
            onLayout: this.onLayoutModesView.bind(this),
          })
        );
      },
    },
  ]);
  return u;
})(B);

exports.ModeBubble = R;
R.defaultProps = {
  tintColor: '#007AFF',
  cleanMode: '',
  waterMode: '',
  mopMode: '',
  hasBottomDecorator: true,
  iconWidth: 17,
  iconHeight: 17,
};
var q = module12.StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 2.5,
    fontSize: 12,
    color: 'white',
    paddingTop: module387.default.iOSAndroidReturn(2, 1),
    paddingBottom: module387.default.iOSAndroidReturn(2, 3),
    paddingHorizontal: 1,
  },
  selectedText: {
    marginHorizontal: 2.5,
    fontSize: 12,
    color: 'rgba(155, 155, 155, 1)',
    includeFontPadding: false,
  },
  selectedBubbleText: {
    marginHorizontal: 2.5,
    fontSize: 12,
    color: 'white',
    includeFontPadding: false,
  },
  bottomTriangleRoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -1,
  },
  bottomTriangleBorder: {
    left: 6,
    borderLeftColor: 'transparent',
    borderLeftWidth: 6,
    borderTopWidth: 6.5,
    borderTopColor: '#66666688',
    borderRightWidth: 6,
    borderRightColor: 'transparent',
  },
  bottomTriangleContent: {
    right: 5.5,
    borderLeftColor: 'transparent',
    borderLeftWidth: 5.5,
    borderTopWidth: 6,
    borderTopColor: 'white',
    borderRightWidth: 5.5,
    borderRightColor: 'transparent',
  },
});
