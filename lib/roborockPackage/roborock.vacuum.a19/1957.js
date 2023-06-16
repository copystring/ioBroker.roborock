var module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = (function (t, n) {
    if (!n && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t))
      return {
        default: t,
      };
    var o = P(n);
    if (o && o.has(t)) return o.get(t);
    var s = {},
      l = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var c in t)
      if ('default' !== c && Object.prototype.hasOwnProperty.call(t, c)) {
        var u = l ? Object.getOwnPropertyDescriptor(t, c) : null;
        if (u && (u.get || u.set)) Object.defineProperty(s, c, u);
        else s[c] = t[c];
      }

    s.default = t;
    if (o) o.set(t, s);
    return s;
  })(require('react')),
  module12 = require('./12'),
  module381 = require('./381'),
  module390 = require('./390'),
  module386 = require('./386'),
  module1363 = require('./1363'),
  module387 = require('./387'),
  module506 = require('./506');

function P(t) {
  if ('function' != typeof WeakMap) return null;
  var n = new WeakMap(),
    o = new WeakMap();
  return (P = function (t) {
    return t ? o : n;
  })(t);
}

function j() {
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

module12.Dimensions.get('window').width;

var module491 = require('./491').strings,
  module389 = require('./389'),
  module1958 = require('./1958'),
  module1959 = require('./1959'),
  O = (function (t) {
    module7.default(L, t);

    var module506 = L,
      P = j(),
      O = function () {
        var t,
          n = module11.default(module506);

        if (P) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function L(t) {
      var n;
      module4.default(this, L);

      (n = O.call(this, t)).listHeaderComponent = function () {
        return React.default.createElement(module12.View, {
          style: [
            R.topView,
            {
              backgroundColor: n.context.theme.settingBackgroundColor,
            },
          ],
        });
      };

      n.state = {
        selectedType: -1,
      };
      return n;
    }

    module5.default(L, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.configNavibar();
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'configNavibar',
        value: function () {
          var t = React.default.createElement(module381.PureImageButton, {
            style: R.confirmButton,
            image: this.context.theme.navConfirmIcon,
            onPress: this.onRightButtonPress.bind(this),
            imageWidth: 35,
            imageHeight: 35,
            imageStyle: {
              resizeMode: 'contain',
            },
          });
          this.props.navigation.setParams({
            navBarPosition: 'absolute',
            onPressLeft: this.onLeftButtonPress.bind(this),
            rightItems: [t],
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'onRightButtonPress',
        value: function () {
          if (-1 != this.state.selectedType) this.requestPhoto();
        },
      },
      {
        key: 'requestPhoto',
        value: function () {
          var t = this;
          this.loadingView.showWithText(module491.image_processing);
          this.props.navigation.state.params.currentObj.type;
          var n = this.props.navigation.state.params.currentObj.photoId;
          if (!n || n.length < 1) {
            if (this.loadingView) this.loadingView.hide();
          } else if (module386.default.isFwFilterObstacleSupported() && module1363.default.mapObjectPhotoEnabled && n)
            module390.MC.mapObjectMosaicPhotos['' + n]
              ? (this.loadingView && this.loadingView.hide(), this.jumpToPictureProcessingResultPage())
              : module389.getPhotoBase64Data(n, 2, function (o, s) {
                  if (o) {
                    if (t.loadingView) t.loadingView.hide();
                    s.photoData;
                    module390.MC.mapObjectMosaicPhotos['' + n] = s;
                    t.jumpToPictureProcessingResultPage();
                  } else {
                    if (t.loadingView) t.loadingView.hide();
                    globals.showToast(module491.image_processing_failure);
                  }
                });
        },
      },
      {
        key: 'jumpToPictureProcessingResultPage',
        value: function () {
          var t = this.props.navigation.state.params.currentObj,
            n = this.props.navigation.state.key,
            o = this.state.selectedType;
          this.props.navigation.navigate('PictureProcessingResultPage', {
            title: module491.image_processing_result,
            currentObj: t,
            backKey: n,
            chooseId: o,
          });
        },
      },
      {
        key: 'onLeftButtonPress',
        value: function () {
          this.props.navigation.pop();
        },
      },
      {
        key: 'obstacleTypeButtonPress',
        value: function (t) {
          var n = this;
          this.setState(
            {
              selectedType: t,
            },
            function () {
              n.configNavibar();
            }
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.props.data;
          return React.default.createElement(
            module12.View,
            {
              style: [
                R.container,
                {
                  backgroundColor: this.context.theme.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module12.FlatList, {
              ref: function (n) {
                return (t.listView = n);
              },
              extraData: n,
              data: n,
              ListHeaderComponent: this.listHeaderComponent(),
              renderItem: this._renderItem.bind(this),
              style: R.list,
              keyExtractor: function (t) {
                return t.type;
              },
            }),
            React.default.createElement(module381.CancelableLoadingView, {
              loadingAccessibilityLabelKey: 'obstacle_type_view_loading',
              closeAccessibilityLabelKey: 'obstacle_type_view_loading_close',
              ref: function (n) {
                t.loadingView = n;
              },
              showButton: false,
            })
          );
        },
      },
      {
        key: '_renderItem',
        value: function (t) {
          var o = this,
            s = t.item,
            l = this.context.theme,
            c = this.state.selectedType == s.type,
            u = React.default.createElement(module12.Image, {
              source: c ? module1958 : module1959,
              style: R.image,
            });
          return React.default.createElement(
            module12.TouchableOpacity,
            module21.default({}, module387.default.getAccessibilityLabel('ObstacleTypeSelection_' + s.type), {
              onPress: function () {
                o.obstacleTypeButtonPress(s.type);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  R.itemContainer,
                  {
                    backgroundColor: l.setting.topBackgroundColor,
                  },
                ],
              },
              globals.isRTL && u,
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    R.itemText,
                    {
                      color: l.mainTextColor,
                    },
                  ],
                },
                module387.default.reuduceEnterString(s.title)
              ),
              !globals.isRTL && u,
              React.default.createElement(module12.View, {
                style: [
                  R.line,
                  {
                    backgroundColor: l.navBorderColor,
                  },
                ],
              })
            )
          );
        },
      },
    ]);
    return L;
  })(React.Component);

exports.default = O;
O.contextType = module506.AppConfigContext;
O.defaultProps = {
  data: [
    {
      title: module491.map_object_name_xian,
      type: 0,
    },
    {
      title: module491.map_object_name_baba,
      type: 1,
    },
    {
      title: module491.map_object_name_shoe,
      type: 2,
    },
    {
      title: module491.map_object_name_dizuo,
      type: 3,
    },
    {
      title: module491.map_object_name_chapai,
      type: 5,
    },
    {
      title: module491.map_object_name_tizhongcheng,
      type: 9,
    },
    {
      title: module491.map_object_name_zhiwu,
      type: 10,
    },
    {
      title: module491.map_object_name_poqi,
      type: 25,
    },
    {
      title: module491.map_object_name_others,
      type: 18,
    },
  ],
};
var R = module12.StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    width: module12.Dimensions.get('window').width,
    alignSelf: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemText: {
    alignSelf: 'stretch',
    textAlign: globals.isRTL ? 'right' : 'left',
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    marginLeft: globals.isRTL ? 0 : 18,
    marginRight: globals.isRTL ? 18 : 0,
  },
  line: {
    position: 'absolute',
    width: module12.Dimensions.get('window').width,
    left: 0,
    bottom: 0,
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    alignSelf: 'center',
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginLeft: globals.isRTL ? 20 : 0,
    marginRight: globals.isRTL ? 0 : 20,
  },
  topView: {
    width: module12.Dimensions.get('window').width,
    left: 0,
    bottom: 0,
    height: 15,
    backgroundColor: '#f5f5f5',
  },
});
