require('./390');

require('./387');

var module22 = require('./22'),
  module50 = require('./50'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module1409 = require('./1409'),
  module385 = require('./385'),
  module391 = require('./391'),
  module1200 = require('./1200'),
  module1344 = require('./1344'),
  module1630 = require('./1630'),
  module381 = require('./381'),
  module1435 = require('./1435');

function C(t, o) {
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

function S(t) {
  for (var o = 1; o < arguments.length; o++) {
    var l = null != arguments[o] ? arguments[o] : {};
    if (o % 2)
      C(Object(l), true).forEach(function (o) {
        module50.default(t, o, l[o]);
      });
    else if (Object.getOwnPropertyDescriptors) Object.defineProperties(t, Object.getOwnPropertyDescriptors(l));
    else
      C(Object(l)).forEach(function (o) {
        Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(l, o));
      });
  }

  return t;
}

function D() {
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

require('./393');

var module510 = require('./510').strings,
  v = (function (t) {
    module9.default(I, t);

    var module50 = I,
      module391 = D(),
      B = function () {
        var t,
          o = module12.default(module50);

        if (module391) {
          var l = module12.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module11.default(this, t);
      };

    function I(t) {
      module6.default(this, I);
      return B.call(this, t);
    }

    module7.default(I, [
      {
        key: 'handlePressNewCollectButton',
        value: function () {
          var t = this;
          console.log('handlePressNewCollectButton');
          var o = this.props.onPressNewCollectButton;
          if (o)
            o(function (o, n) {
              if (o) t.hidePanel();
              else console.log('onPressNewCollectButton error', n);
            });
        },
      },
      {
        key: 'handlePressNewWashButton',
        value: function () {
          var t = this;
          console.log('handlePressNewWashButton');
          var o = this.props.onPressNewWashButton;
          if (o)
            o(function (o, n) {
              if (o) t.hidePanel();
              else console.log('handlePressNewWashButton error', n);
            });
        },
      },
      {
        key: 'handlePressNewDryButton',
        value: function () {
          var t = this;
          console.log('handlePressNewDryButton');
          var o = this.props.onPressNewDryButton;
          if (o)
            o(function (o, n) {
              if (o) t.hidePanel();
              else console.log('handlePressNewDryButton error', n);
            });
        },
      },
      {
        key: 'hidePanel',
        value: function () {
          this.props.parent.hide();
        },
      },
      {
        key: 'render',
        value: function () {
          n.homeBottomControl.controlBorderColor;
          var t = this,
            n = this.theme,
            l = this.props,
            c = l.collectIconMode,
            s = undefined === c ? 'startCollect' : c,
            u = l.washIconMode,
            f = undefined === u ? 'start' : u,
            k = l.dryIconMode,
            B = undefined === k ? 'start' : k,
            I = l.enabled,
            C = [
              S(
                S({}, module1630.getNewCollectButtonConfig(s, n)),
                {},
                {
                  funcId: 'home_new_collect_button',
                  onPress: this.handlePressNewCollectButton.bind(this),
                  enabled: I || module381.RSM.isCleaning(),
                  ref: function (o) {
                    return (t.collectButton = o);
                  },
                }
              ),
              S(
                S({}, module1630.getNewWashButtonConfig(f, n)),
                {},
                {
                  funcId: 'home_new_wash_button',
                  onPress: this.handlePressNewWashButton.bind(this),
                  enabled: I,
                  ref: function (o) {
                    return (t.washButton = o);
                  },
                }
              ),
            ],
            D = S(
              S({}, module1630.getNewDryButtonConfig(B, n)),
              {},
              {
                funcId: 'home_new_dry_button',
                onPress: this.handlePressNewDryButton.bind(this),
                enabled: I,
                ref: function (o) {
                  return (t.dryButton = o);
                },
              }
            );
          if (module381.RSM.isCollectWashDryDock() && module381.RSM.isChargingOnDock()) C.push(D);

          if (module381.RSM.state == module381.RobotState.BACK_TO_DOCK_WASHING_DUSTER || module381.RSM.state == module381.RobotState.WASHING_DUSTER) {
            module381.RSM.cleanResumeFlag;
            module381.CleanResumeFlag.None;
          }

          var v = (module13.Dimensions.get('window').width - module1435.HorizontalMargin * (C.length + 1)) / C.length,
            T = S(
              S({}, module1435.BaseShadow),
              {},
              {
                height: 75,
                radius: 10,
                color: n.shadowColor,
                style: {
                  marginLeft: module1435.HorizontalMargin,
                },
              }
            ),
            W = {
              enabled: I,
              imageWidth: 30,
              imageHeight: 30,
              textLeft: 6,
              textColor: n.homeBottomControl.textColor,
              fontSize: 12,
              textStyle: {
                lineHeight: 17,
              },
              maxTextWidth: module1435.BottomControlBottomButtonWidth - 50,
            },
            N = n.dockPanel,
            O = N.titleColor,
            E = N.exceptionIndicatorColor,
            M = N.normalIndicatorColor,
            j = N.exceptionTextBackground,
            z = N.exceptionTextColor;
          return React.default.createElement(
            module385.GradientView,
            module22.default({}, n.dockPanel.backgroundGradient, {
              style: S(
                S({}, _.container),
                {},
                {
                  borderRadius: 10,
                  overflow: 'hidden',
                }
              ),
            }),
            React.default.createElement(module385.SwipeDownIndicator, null),
            React.default.createElement(
              module13.View,
              {
                style: _.contentWrap,
              },
              React.default.createElement(
                module13.Text,
                {
                  style: S(
                    S({}, _.sectionTitle),
                    {},
                    {
                      color: O,
                    }
                  ),
                },
                module510.dock_panel_info_section_title
              ),
              React.default.createElement(
                module13.View,
                {
                  style: _.dockInfoWrap,
                },
                React.default.createElement(
                  module13.View,
                  {
                    style: _.dockItemsWrap,
                  },
                  this.dockInfoItems.map(function (t, o) {
                    var l = t.exceptionText ? E : M;
                    return React.default.createElement(
                      module13.View,
                      {
                        style: _.dockInfoItem,
                        key: 'dock_info_item_' + o,
                      },
                      React.default.createElement(module13.View, {
                        style: {
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: l,
                        },
                      }),
                      React.default.createElement(
                        module13.View,
                        {
                          style: _.dockInfoItemTextWrap,
                        },
                        React.default.createElement(
                          module13.Text,
                          {
                            style: S(
                              S({}, _.dockInfoItemName),
                              {},
                              {
                                color: n.dockPanel.dockInfoTextColor,
                              }
                            ),
                          },
                          t.name
                        ),
                        !!t.exceptionText &&
                          React.default.createElement(
                            module13.View,
                            {
                              style: S(
                                S({}, _.DockInfoItemException),
                                {},
                                {
                                  backgroundColor: j,
                                }
                              ),
                            },
                            React.default.createElement(
                              module13.Text,
                              {
                                style: {
                                  fontSize: 8.5,
                                  color: z,
                                },
                              },
                              t.exceptionText
                            )
                          )
                      )
                    );
                  })
                ),
                React.default.createElement(module13.Image, {
                  source: this.dockImage,
                  style: _.dockShow,
                })
              ),
              React.default.createElement(
                module13.Text,
                {
                  style: S(
                    S({}, _.sectionTitle),
                    {},
                    {
                      color: n.dockPanel.titleColor,
                    }
                  ),
                },
                module510.dock_panel_function_section_title
              ),
              React.default.createElement(
                module13.View,
                {
                  style: _.buttonsWrap,
                },
                C.map(function (t, l) {
                  return React.default.createElement(
                    module1409.BoxShadow,
                    {
                      setting: S(
                        S({}, T),
                        {},
                        {
                          width: v,
                        }
                      ),
                      key: 'dock_func_button_' + l,
                    },
                    React.default.createElement(
                      module385.GradientView,
                      module22.default({}, n.homeCommonGradient, {
                        style: {
                          borderRadius: 10,
                          overflow: 'hidden',
                        },
                      }),
                      React.default.createElement(
                        module385.TopImageButton,
                        module22.default({}, W, t, {
                          textTop: 8,
                          textStyle: {
                            textAlign: 'center',
                          },
                          maxTextWidth: v - 16,
                          style: [
                            _.bottomButton,
                            {
                              alignItems: 'center',
                              width: v,
                              backgroundColor: 'transparent',
                            },
                          ],
                        })
                      )
                    )
                  );
                })
              )
            )
          );
        },
      },
      {
        key: 'theme',
        get: function () {
          return this.context.theme;
        },
      },
      {
        key: 'dockInfoItems',
        get: function () {
          return module1630.getDockInfoItems(this.context.theme);
        },
      },
      {
        key: 'dockImage',
        get: function () {
          var t = this.context.theme.dockPanel,
            o = t.o4Dock,
            n = t.o4DockWithCleanFluid,
            l = t.o3O3PlusDock,
            c = t.o2Dock,
            s = t.pearlDock;
          if (module381.RSM.isO4Dock()) return module381.RSM.hasCleanFulidModule ? n : o;
          else return module381.RSM.isO3Dock() || module381.RSM.isO3PlusDock() ? l : module381.RSM.isO2Dock() ? c : module381.RSM.isPearlDock() ? s : null;
        },
      },
    ]);
    return I;
  })(React.default.Component);

v.contextType = module1200.AppConfigContext;
v.defaultProps = {};

var _ = module13.StyleSheet.create({
    container: {
      paddingTop: 15,
      paddingBottom: 20 + module1344.AppBarMarginBottom,
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      borderBottomLeftRadius: module1344.AppBorderRadius,
      borderBottomRightRadius: module1344.AppBorderRadius,
      overflow: 'hidden',
    },
    contentWrap: {},
    sectionTitle: {
      marginHorizontal: 25,
      marginTop: 10,
      marginBottom: 15,
      fontSize: 16,
      color: '#4A4A4A',
    },
    dockInfoWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 40,
      justifyContent: 'center',
    },
    dockShow: {
      width: module391.default.ScreenWidth / 2 - 40,
      height: module391.default.ScreenWidth / 2 - 40,
    },
    dockItemsWrap: {
      width: module391.default.ScreenWidth / 2 - 40,
      marginBottom: 15,
    },
    dockInfoItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      marginBottom: 20,
      alignItems: 'center',
    },
    dockInfoItemTextWrap: {
      alignItems: 'flex-start',
    },
    dockInfoItemName: {
      fontSize: 12,
      marginHorizontal: 5,
    },
    DockInfoItemException: {
      fontSize: 8.5,
      marginTop: 5,
      marginLeft: 5,
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 3,
    },
    buttonsWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bottomButton: {
      backgroundColor: 'transparent',
      height: 75,
      borderRadius: 10,
    },
  }),
  T = module385.HocBottomModal(module385.WithSwipeToClose(v), true);

exports.default = T;
