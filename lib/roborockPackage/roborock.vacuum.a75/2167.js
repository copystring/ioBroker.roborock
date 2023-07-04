var module22 = require('./22'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module385 = require('./385'),
  module1968 = require('./1968'),
  module1199 = require('./1199'),
  module1431 = require('./1431'),
  module1427 = require('./1427'),
  module13 = require('./13'),
  module382 = require('./382');

function S() {
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

var module2169 = (function (t) {
  module9.default(M, t);

  var module1199 = M,
    module2169 = S(),
    T = function () {
      var t,
        n = module12.default(module1199);

      if (module2169) {
        var o = module12.default(this).constructor;
        t = Reflect.construct(n, arguments, o);
      } else t = n.apply(this, arguments);

      return module11.default(this, t);
    };

  function M(t) {
    var n;
    module6.default(this, M);
    (n = T.call(this, t)).fakeIndex = n.props.index;
    n.initPanGestures();
    return n;
  }

  module7.default(M, [
    {
      key: 'setFakeIndex',
      value: function (t) {
        this.fakeIndex = t;
        this.animation = module13.Animated.timing(this.pan, {
          toValue: {
            x: this.pan.x._value,
            y: (t - this.props.index) * this.rowHeight,
          },
          duration: 200,
          easing: module13.Easing.inOut(module13.Easing.linear),
        });
        this.animation.start(function () {});
      },
    },
    {
      key: 'componentDidUpdate',
      value: function () {
        this.fakeIndex = this.props.index;
        this.pan.setValue({
          x: this.pan.x._value,
          y: 0,
        });
      },
    },
    {
      key: 'initPanGestures',
      value: function () {
        var t = this;
        this.zIndex = new module13.Animated.Value(0);
        this.pan = new module13.Animated.ValueXY({
          x: 0,
          y: 0,
        });
        this.offsetIndex = 0;
        this.panResponder = module13.PanResponder.create({
          onStartShouldSetPanResponder: function () {
            return true;
          },
          onStartShouldSetPanResponderCapture: function () {
            return true;
          },
          onMoveShouldSetPanResponderCapture: function () {
            return true;
          },
          onMoveShouldSetPanResponder: function (t, n) {
            return true;
          },
          onPanResponderGrant: function () {
            var n;
            if (!(null == (n = t.animation) || null == n.stop)) n.stop();
            t.startIndex = t.fakeIndex;
            t.zIndex.setValue(1);
            t.pan.setOffset({
              x: t.pan.x._value,
              y: t.pan.y._value,
            });
            t.pan.setValue({
              x: t.pan.x._value,
              y: 0,
            });
            if (!(null == t.props.onPanGranted)) t.props.onPanGranted();
          },
          onPanResponderMove: function (n, o) {
            var s = -t.startIndex * t.rowHeight,
              l = (t.props.totalTasks - 1 - t.startIndex) * t.rowHeight;
            t.pan.setValue({
              x: 0,
              y: (o.dy ** s) ** l,
            });
            t.offsetIndex = Math.ceil(t.pan.y._value / t.rowHeight - 0.5);
            var u = t.fakeIndex;
            t.fakeIndex = (0 ** (t.startIndex + t.offsetIndex)) ** (t.props.totalTasks - 1);
            if (u != t.fakeIndex) t.props.moveItem(u, t.fakeIndex);
          },
          onPanResponderTerminationRequest: function (t, n) {
            return false;
          },
          onPanResponderTerminate: function () {
            t.pan.flattenOffset();
            t.setFakeIndex(t.fakeIndex);
            if (!(null == t.props.onPanEnd)) t.props.onPanEnd();
          },
          onPanResponderEnd: function () {
            t.pan.flattenOffset();
            t.setFakeIndex(t.fakeIndex);
            if (!(null == t.props.onPanEnd)) t.props.onPanEnd();
          },
          onPanResponderRelease: function () {
            t.pan.flattenOffset();
            t.setFakeIndex(t.fakeIndex);
            if (!(null == t.props.onPanRelease)) t.props.onPanRelease();
          },
        });
      },
    },
    {
      key: 'render',
      value: function () {
        var t,
          o,
          s,
          l = this,
          u = module382.isModeCustomized(
            null == (t = this.props.customMode) ? undefined : t.cleanMode,
            null == (o = this.props.customMode) ? undefined : o.waterMode,
            null == (s = this.props.customMode) ? undefined : s.mopMode
          );
        return React.default.createElement(
          module13.TouchableWithoutFeedback,
          {
            onPress: function () {
              return null == l.props.onPress ? undefined : l.props.onPress();
            },
            style: {
              width: module13.Dimensions.get('window').width + (this.props.editing ? 100 : 0) - 50,
            },
          },
          (function () {
            switch (l.props.type) {
              case module1968.TaskListItemType.Location:
                return React.default.createElement(
                  module385.GradientView,
                  {
                    colors: l.context.theme.smartScene.itemGradient,
                    start: {
                      x: 0,
                      y: 0,
                    },
                    end: {
                      x: 1,
                      y: 0,
                    },
                    style: {
                      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 10,
                      height: l.unitHeight,
                      paddingHorizontal: 25,
                      borderRadius: l.unitHeight / 2,
                      flex: 1,
                    },
                  },
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        color: l.context.theme.smartScene.taskItemTextColor,
                        fontSize: l.fontSize,
                      },
                      numberOfLines: 1,
                    },
                    l.props.name
                  ),
                  React.default.createElement(module13.Image, {
                    style: {
                      width: 24,
                      height: 24,
                      tintColor: l.context.theme.smartScene.taskItemTextColor,
                      transform: [
                        {
                          scaleX: globals.isRTL ? -1 : 1,
                        },
                      ],
                    },
                    source: l.context.theme.settingListItem.rightArrowImg,
                  })
                );

              case module1968.TaskListItemType.TaskAdd:
                return React.default.createElement(
                  module13.TouchableWithoutFeedback,
                  {
                    onPress: l.props.onPressAdd,
                  },
                  React.default.createElement(
                    module13.View,
                    {
                      style: {
                        flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                        backgroundColor: l.context.theme.componentBackgroundColor,
                        borderColor: l.context.theme.smartScene.addTaskBorderColor,
                        borderWidth: 2,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 10,
                        height: l.unitHeight,
                        paddingHorizontal: 25,
                        borderRadius: l.unitHeight / 2,
                        flex: 1,
                      },
                    },
                    React.default.createElement(
                      module13.Text,
                      {
                        style: {
                          color: l.context.theme.subTextColor,
                          fontSize: l.fontSize,
                        },
                        numberOfLines: 1,
                      },
                      l.props.name
                    ),
                    React.default.createElement(module13.Image, {
                      style: {
                        width: 24,
                        height: 24,
                      },
                      source: l.context.theme.multiFloor.createMapImg,
                    })
                  )
                );

              case module1968.TaskListItemType.Task:
                return React.default.createElement(
                  module13.Animated.View,
                  {
                    style: {
                      transform: [
                        {
                          translateY: l.pan.y,
                        },
                      ],
                      flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                      zIndex: l.zIndex,
                    },
                  },
                  l.props.editing &&
                    React.default.createElement(
                      module13.View,
                      {
                        style: {
                          top: 0,
                          bottom: 0,
                          width: 100,
                          height: l.rowHeight,
                          flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                        },
                      },
                      React.default.createElement(
                        module13.Image,
                        module22.default(
                          {
                            style: {
                              width: 30,
                              height: 30,
                            },
                            source: require('./2168'),
                          },
                          l.panResponder.panHandlers
                        )
                      ),
                      React.default.createElement(
                        module13.TouchableWithoutFeedback,
                        {
                          onPress: function () {
                            l.props.onPressDelete(l.props.index);
                          },
                        },
                        React.default.createElement(module13.Image, {
                          style: {
                            width: 30,
                            height: 30,
                          },
                          source: require('./2169'),
                        })
                      )
                    ),
                  React.default.createElement(
                    module385.GradientView,
                    {
                      colors: l.context.theme.smartScene.itemGradient,
                      start: {
                        x: 0,
                        y: 0,
                      },
                      end: {
                        x: 1,
                        y: 0,
                      },
                      style: {
                        flexDirection: globals.isRTL ? 'row-reverse' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 10,
                        height: l.unitHeight,
                        paddingHorizontal: 25,
                        borderRadius: l.unitHeight / 2,
                        flex: 1,
                        opacity: l.isInvalid ? 0.3 : 1,
                      },
                    },
                    React.default.createElement(
                      module13.View,
                      {
                        style: {
                          flexDirection: 'row',
                          flexShrink: 1,
                        },
                      },
                      React.default.createElement(
                        module13.Text,
                        {
                          style: {
                            color: l.context.theme.smartScene.taskItemTextColor,
                            fontSize: l.fontSize,
                            flexShrink: 1,
                            minWidth: 30,
                          },
                          numberOfLines: 1,
                        },
                        l.props.name || ''
                      ),
                      l.props.customMode &&
                        u &&
                        React.default.createElement(module1431.ModesView, {
                          style: {
                            paddingHorizontal: 6,
                          },
                          tintColor: l.context.theme.smartScene.taskItemTextColor,
                          width: l.imageSize,
                          height: l.imageSize,
                          cleanModeSrc: l.context.theme.ModeSettingPanel.customModeEditIcon,
                        }),
                      l.props.customMode &&
                        !u &&
                        React.default.createElement(module1431.ModesView, {
                          style: {
                            paddingHorizontal: 6,
                          },
                          tintColor: l.context.theme.smartScene.taskItemTextColor,
                          width: l.imageSize,
                          height: l.imageSize,
                          cleanModeSrc: module1427.CleanModeImage(false, l.props.customMode),
                          waterModeSrc: module1427.WaterModeImage(false, l.props.customMode),
                          mopModeSrc: module1427.MopModeImage(false, l.props.customMode),
                        }),
                      l.props.repeat > 0 &&
                        React.default.createElement(
                          module13.Text,
                          {
                            style: {
                              color: l.context.theme.smartScene.taskItemTextColor,
                            },
                          },
                          ' | ' + l.props.repeat + module1968.LocalizationStrings.dust_collection_life14
                        )
                    ),
                    React.default.createElement(module13.Image, {
                      style: {
                        width: 24,
                        height: 24,
                        tintColor: l.context.theme.smartScene.taskItemTextColor,
                        transform: [
                          {
                            scaleX: globals.isRTL ? -1 : 1,
                          },
                        ],
                      },
                      source: l.context.theme.settingListItem.rightArrowImg,
                    })
                  )
                );
            }
          })()
        );
      },
    },
    {
      key: 'rowHeight',
      get: function () {
        return this.unitHeight + 20;
      },
    },
    {
      key: 'unitHeight',
      get: function () {
        return 66;
      },
    },
    {
      key: 'fontSize',
      get: function () {
        return 16;
      },
    },
    {
      key: 'imageSize',
      get: function () {
        return 20;
      },
    },
    {
      key: 'isInvalid',
      get: function () {
        return this.props.isInvalid;
      },
    },
  ]);
  return M;
})(React.default.Component);

exports.default = module2169;
module2169.contextType = module1199.AppConfigContext;
module2169.defaultProps = {
  name: '',
  type: module1968.TaskListItemType.TaskAdd,
  customMode: {
    cleanMode: null,
    waterMode: null,
    mopMode: null,
  },
  repeat: null,
  editing: false,
};
