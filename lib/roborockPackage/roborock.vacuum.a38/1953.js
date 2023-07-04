var module22 = require('./22'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module385 = require('./385'),
  module394 = require('./394'),
  module390 = require('./390'),
  module1508 = require('./1508'),
  module391 = require('./391'),
  module515 = require('./515');

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

var module500 = require('./500').strings,
  module393 = require('./393'),
  module1954 = require('./1954'),
  module1955 = require('./1955'),
  B = (function (t) {
    module7.default(R, t);

    var n = R,
      module515 = T(),
      B = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var s = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, s);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = B.call(this, t)).state = {
        selectedType: -1,
      };
      return n;
    }

    module5.default(R, [
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
          var t = React.default.createElement(module385.PureImageButton, {
            funcId: 'obstacle_nav_ConfirmIcon',
            style: V.confirmButton,
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
          this.loadingView.showWithText(module500.image_processing);
          var n = this.props.navigation.state.params.currentObj.photoId;
          if (!n || n.length < 1) {
            if (this.loadingView) this.loadingView.hide();
          } else if (module390.default.isFwFilterObstacleSupported() && module1508.default.mapObjectPhotoEnabled && n)
            module394.MC.mapObjectMosaicPhotos['' + n]
              ? (this.loadingView && this.loadingView.hide(), this.jumpToPictureProcessingResultPage())
              : module393.getPhotoBase64Data(n, 2, function (o, s) {
                  if (o) {
                    if (t.loadingView) t.loadingView.hide();
                    s.photoData;
                    module394.MC.mapObjectMosaicPhotos['' + n] = s;
                    t.jumpToPictureProcessingResultPage();
                  } else {
                    if (t.loadingView) t.loadingView.hide();
                    globals.showToast(module500.image_processing_failure);
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
            title: module500.image_processing_result,
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
                V.container,
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
              renderItem: this._renderItem.bind(this),
              style: V.list,
              keyExtractor: function (t) {
                return t.type;
              },
            }),
            React.default.createElement(module385.CancelableLoadingView, {
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
          var n = this,
            s = t.item,
            l = this.context.theme,
            c = this.state.selectedType == s.type,
            u = React.default.createElement(module12.Image, {
              source: c ? module1954 : module1955,
              style: V.image,
            });
          return React.default.createElement(
            module12.TouchableOpacity,
            module22.default({}, module391.default.getAccessibilityLabel('ObstacleTypeSelection_' + s.type), {
              onPress: function () {
                n.obstacleTypeButtonPress(s.type);
              },
            }),
            React.default.createElement(
              module12.View,
              {
                style: [
                  V.itemContainer,
                  {
                    backgroundColor: l.setting.topBackgroundColor,
                  },
                ],
              },
              React.default.createElement(
                module12.Text,
                {
                  style: [
                    V.itemText,
                    {
                      color: l.mainTextColor,
                    },
                  ],
                },
                module391.default.reuduceEnterString(s.title)
              ),
              u,
              React.default.createElement(module12.View, {
                style: [
                  V.line,
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
    return R;
  })(React.Component);

exports.default = B;
B.contextType = module515.AppConfigContext;
B.defaultProps = {
  data: [
    {
      title: module500.map_object_name_xian,
      type: 0,
    },
    {
      title: module500.map_object_name_baba,
      type: 1,
    },
    {
      title: module500.map_object_name_shoe,
      type: 2,
    },
    {
      title: module500.map_object_name_dizuo,
      type: 3,
    },
    {
      title: module500.map_object_name_chapai,
      type: 5,
    },
    {
      title: module500.map_object_name_tizhongcheng,
      type: 9,
    },
    {
      title: module500.map_object_name_zhiwu,
      type: 10,
    },
    {
      title: module500.map_object_name_poqi,
      type: 25,
    },
    {
      title: module500.map_edit_floor_other,
      type: 18,
    },
  ],
};
var V = module12.StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingTop: 15,
    borderRadius: 10,
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    alignSelf: 'stretch',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: globals.isRTL ? 'row-reverse' : 'row',
  },
  itemText: {
    alignSelf: 'stretch',
    textAlign: globals.isRTL ? 'right' : 'left',
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    alignSelf: 'center',
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  confirmButton: {
    marginHorizontal: 10,
  },
});
