var module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module1200 = require('./1200'),
  module1969 = require('./1969'),
  module1432 = require('./1432'),
  module13 = require('./13'),
  module1428 = require('./1428'),
  module382 = require('./382');

function T() {
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

var module2156 = (function (t) {
  module9.default(E, t);

  var module1200 = E,
    module2156 = T(),
    v = function () {
      var t,
        o = module12.default(module1200);

      if (module2156) {
        var n = module12.default(this).constructor;
        t = Reflect.construct(o, arguments, n);
      } else t = o.apply(this, arguments);

      return module11.default(this, t);
    };

  function E(t) {
    var n;
    module6.default(this, E);
    (n = v.call(this, t)).state = {
      timer: null,
    };
    n.state.timer = n.timer;
    return n;
  }

  module7.default(
    E,
    [
      {
        key: 'render',
        value: function () {
          var t,
            o,
            n = this;
          return React.default.createElement(
            module13.View,
            {
              style: {
                backgroundColor: this.context.theme.componentBackgroundColor,
                borderRadius: 14,
                minHeight: 96,
                marginVertical: 8,
                justifyContent: 'center',
              },
            },
            n.props.data.type == module1969.CommandCardType.Add
              ? React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  {
                    onPress: n.props.onPressCustomCommandAdd,
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        paddingHorizontal: 30,
                        paddingVertical: 8,
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    },
                    React.default.createElement(module13.Image, {
                      style: {
                        width: 24,
                        height: 24,
                        marginRight: 5,
                      },
                      source: require('./2158'),
                    }),
                    React.default.createElement(
                      module13.Text,
                      {
                        style: {
                          color: '#007AFF',
                          fontSize: 16,
                          marginLeft: 5,
                        },
                      },
                      module1969.LocalizationStrings.smart_scene_add_command_button_title
                    )
                  )
                )
              : React.default.createElement(
                  module13.View,
                  null,
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        paddingHorizontal: 25,
                        paddingVertical: 8,
                        justifyContent: 'center',
                        alignItems: globals.isRTL ? 'flex-end' : 'flex-start',
                      },
                    },
                    React.default.createElement(
                      module13.View,
                      {
                        style: {
                          flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                          alignItems: 'center',
                          opacity: n.props.data.isInvalid ? 0.3 : 1,
                          alignSelf: 'stretch',
                        },
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: {
                            color: n.context.theme.mainTextColor,
                            fontSize: 16,
                            flexShrink: 1,
                            fontWeight: 'bold',
                          },
                          numberOfLines: 1,
                        },
                        n.props.data.name
                      ),
                      React.default.createElement(
                        module13.View,
                        {
                          style: {
                            flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                            alignItems: 'center',
                          },
                        },
                        n.state.timer &&
                          n.state.timer.enabled &&
                          React.default.createElement(
                            module13.Text,
                            {
                              style: {
                                color: n.context.theme.mainTextColor,
                                paddingHorizontal: 8,
                                fontSize: 12,
                              },
                              numberOfLines: 1,
                            },
                            '' + (null == (t = n.state.timer) ? undefined : t.timeDescription)
                          ),
                        n.state.timer &&
                          n.state.timer.enabled &&
                          React.default.createElement(
                            module13.Text,
                            {
                              style: {
                                color: n.context.theme.mainTextColor,
                                fontSize: 12,
                              },
                            },
                            '|'
                          ),
                        n.state.timer &&
                          n.state.timer.enabled &&
                          React.default.createElement(
                            module13.Text,
                            {
                              style: {
                                color: n.context.theme.mainTextColor,
                                paddingHorizontal: 8,
                                fontSize: 12,
                                flexShrink: 1,
                              },
                              numberOfLines: 1,
                            },
                            '' + (null == (o = n.state.timer) ? undefined : o.repeatModeDescription)
                          )
                      )
                    ),
                    React.default.createElement(
                      module13.ScrollView,
                      {
                        ref: function (t) {
                          n.scrollView = t;
                        },
                        onContentSizeChange: function () {
                          var t;
                          return globals.isRTL
                            ? null == (t = n.scrollView)
                              ? undefined
                              : null == t.scrollToEnd
                              ? undefined
                              : t.scrollToEnd({
                                  animated: false,
                                })
                            : {};
                        },
                        horizontal: true,
                        showsHorizontalScrollIndicator: false,
                        style: {},
                        contentContainerStyle: {
                          flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                          justifyContent: globals.isRTL ? 'flex-start' : 'flex-end',
                        },
                      },
                      React.default.createElement(
                        module13.View,
                        {
                          style: {
                            flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                            opacity: n.props.data.isInvalid ? 0.3 : 1,
                          },
                        },
                        n.props.data.tasks.map(function (t, o) {
                          return React.default.createElement(
                            module13.View,
                            {
                              style: {
                                flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                                marginTop: 8,
                              },
                              key: o,
                            },
                            React.default.createElement(
                              module13.Text,
                              {
                                style: {
                                  color: n.context.theme.mainTextColor,
                                  fontSize: 12,
                                },
                              },
                              t.name
                            ),
                            ((l = t.cleanMode),
                            (s = t.waterMode),
                            (c = t.mopMode),
                            (f = {
                              cleanMode: l,
                              waterMode: s,
                              mopMode: c,
                            }),
                            (p = module382.isModeCustomized(l, s, c)),
                            React.default.createElement(
                              module13.View,
                              {
                                style: {
                                  justifyContent: 'center',
                                },
                              },
                              p &&
                                React.default.createElement(module1432.ModesView, {
                                  tintColor: n.context.theme.mainTextColor,
                                  width: 17,
                                  height: 17,
                                  cleanModeSrc: n.context.theme.ModeSettingPanel.customModeEditIcon,
                                }),
                              !p &&
                                React.default.createElement(module1432.ModesView, {
                                  tintColor: n.context.theme.mainTextColor,
                                  width: 17,
                                  height: 17,
                                  cleanModeSrc: module1428.CleanModeImage(false, f),
                                  waterModeSrc: module1428.WaterModeImage(false, f),
                                  mopModeSrc: module1428.MopModeImage(false, f),
                                })
                            )),
                            o < n.props.data.tasks.length - 1 &&
                              React.default.createElement(
                                module13.Text,
                                {
                                  style: {
                                    color: n.context.theme.mainTextColor,
                                  },
                                },
                                ' \u2014 '
                              )
                          );
                          var l, s, c, f, p;
                        })
                      )
                    )
                  )
                ),
            n.props.isSorting
              ? React.default.createElement(module13.Image, {
                  style: {
                    position: 'absolute',
                    right: globals.isRTL ? null : 25,
                    left: globals.isRTL ? 25 : null,
                    tintColor: n.context.theme.mainTextColor,
                    width: 36,
                    height: 30,
                  },
                  source: require('./2157'),
                })
              : n.props.data.type == module1969.CommandCardType.Custom
              ? React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  {
                    onPress: function () {
                      n.viewRef.measure(function (t, o, l, s, c, u) {
                        if (!(null == n.props.onPressCustomCommandMore))
                          n.props.onPressCustomCommandMore({
                            x: c + 26,
                            y: u + 26 + 4,
                          });
                      });
                    },
                  },
                  React.default.createElement(module13.Image, {
                    ref: function (t) {
                      return (n.viewRef = t);
                    },
                    style: {
                      position: 'absolute',
                      right: globals.isRTL ? null : 25,
                      left: globals.isRTL ? 25 : null,
                      tintColor: n.context.theme.mainTextColor,
                      width: 26,
                      height: 26,
                      tintColor: n.context.theme.mainTextColor,
                    },
                    source: require('./2156'),
                  })
                )
              : n.props.data.type == module1969.CommandCardType.Recommend
              ? React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  {
                    onPress: n.props.onPressRecommendCommandAdd,
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        color: '#007AFF',
                        position: 'absolute',
                        right: globals.isRTL ? null : 25,
                        left: globals.isRTL ? 25 : null,
                        opacity: 1,
                      },
                    },
                    module1969.LocalizationStrings.accessibility_add
                  )
                )
              : React.default.createElement(React.default.Fragment, null)
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function (t, o) {
          var n,
            l,
            s,
            c,
            u = function (t) {
              var o, n, l;
              return (null != (o = null == (n = t.data) ? undefined : null == (l = n.timer) ? undefined : l.length) ? o : 0) > 0 ? t.data.timer[0] : null;
            };

          return (null == (n = u(t)) ? undefined : n.timeDescription) + ' | ' + (null == (l = u(t)) ? undefined : l.repeatModeDescription) + ' ' !==
            (null == (s = o.timer) ? undefined : s.timeDescription) + ' | ' + (null == (c = o.timer) ? undefined : c.repeatModeDescription) + ' '
            ? {
                timer: u(t),
              }
            : null;
        },
      },
    ]
  );
  return E;
})(React.default.Component);

exports.default = module2156;
module2156.contextType = module1200.AppConfigContext;
module2156.defaultProps = {
  data: new module1969.CommandCardData('', module1969.CommandCardType.Custom, []),
};
