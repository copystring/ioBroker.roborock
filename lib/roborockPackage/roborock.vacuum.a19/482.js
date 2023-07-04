var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module413 = require('./413'),
  module410 = require('./410'),
  module381 = require('./381'),
  module483 = require('./483');

function S() {
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

require('./491').strings;

var module389 = require('./389'),
  module493 = require('./493'),
  module481 = require('./481'),
  module495 = (function (t) {
    module7.default(R, t);

    var module495 = R,
      E = S(),
      P = function () {
        var t,
          n = module11.default(module495);

        if (E) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = P.call(this, t)).state = {
        data: [1, 2, 3],
        dataSource: new module483.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
        loaded: true,
        refreshing: false,
        showDelete: true,
        isNoData: false,
      };
      return n;
    }

    module5.default(R, [
      {
        key: 'UNSAFE_componentWillMount',
        value: function () {},
      },
      {
        key: 'componentWillUnmount',
        value: function () {},
      },
      {
        key: 'componentDidMount',
        value: function () {
          this.fetchData();
          this.props.navigation.setParams({
            hiddenBottomLine: true,
          });
        },
      },
      {
        key: 'refresh',
        value: function () {
          this.setState({
            refreshing: true,
          });
          this.fetchData();
        },
      },
      {
        key: 'fetchData',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    o.next = 2;
                    return regeneratorRuntime.default.awrap(module410.Log.getLogList());

                  case 2:
                    if (((o.t0 = o.sent), o.t0)) {
                      o.next = 5;
                      break;
                    }

                    o.t0 = [];

                  case 5:
                    (t = o.t0).push(module410.Log.beginTime);
                    console.log('fetchData - ' + t);
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(t.reverse()),
                      refreshing: false,
                    });

                  case 9:
                  case 'end':
                    return o.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'deleteAll',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module410.Log.deleteAll());

                  case 2:
                    this.fetchData();

                  case 3:
                  case 'end':
                    return t.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'uploadAll',
        value: function () {
          var t = this;
          if (this.loadingView) this.loadingView.showWithText('log\u4e0a\u4f20\u4e2d...');
          console.log('upload all begin');
          module410.Log.uploadAll(function () {
            if (t.loadingView) t.loadingView.hide();
            globals.showToast('\u4e0a\u4f20\u6210\u529f');
          });
        },
      },
      {
        key: 'getActionMenu',
        value: function () {
          var module496 = [
            {
              title: '\u5220\u9664\u5168\u90e8',
              image: require('./495'),
              onPress: this.deleteAll.bind(this),
            },
            {
              title: '\u4e0a\u4f20\u5168\u90e8',
              image: require('./496'),
              onPress: this.uploadAll.bind(this),
            },
          ].map(function (t, n) {
            return React.default.createElement(
              module381.LeftImageButton,
              module21.default({}, t, {
                style: D.actionButton,
                imageWidth: 26,
                imageHeight: 26,
                key: n,
              })
            );
          });
          return React.default.createElement(
            module12.View,
            {
              style: D.actionButtonWrap,
            },
            module496
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: D.container,
            },
            React.default.createElement(module493, {
              ref: function (n) {
                t.listView = n;
              },
              renderHiddenRow: null,
              disableLeftSwipe: false,
              disableRightSwipe: false,
              stopLeftSwipe: 3,
              stopRightSwipe: -110,
              leftOpenValue: 75,
              rightOpenValue: -110,
              refreshControl: React.default.createElement(module12.RefreshControl, {
                refreshing: this.state.refreshing,
                onRefresh: function () {
                  return t.refresh();
                },
              }),
              style: D.list,
              dataSource: this.state.dataSource,
              enableEmptySections: true,
              swipeRowStyle: D.itemView,
              renderRow: this.renderRow.bind(this),
            }),
            this.getActionMenu(),
            React.default.createElement(module381.LoadingView, {
              ref: function (n) {
                return (t.loadingView = n);
              },
            })
          );
        },
      },
      {
        key: 'renderRow',
        value: function (t, n, o) {
          var l = 0 == o;
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            {
              onPress: this.onPressRow.bind(this, t, o),
            },
            React.default.createElement(
              module12.View,
              {
                style: D.itemView,
              },
              React.default.createElement(
                module12.View,
                {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                },
                React.default.createElement(module381.PureImageButton, {
                  style: D.icon,
                  image: require('./497'),
                  imageWidth: 26,
                  imageHeight: 26,
                  onPress: this.copyId.bind(this, t),
                }),
                React.default.createElement(
                  module12.View,
                  null,
                  React.default.createElement(
                    module12.Text,
                    {
                      style: {
                        fontSize: 16,
                        color: 0 == o ? 'red' : 'rgba(0,0,0,0.8)',
                      },
                    },
                    t
                  ),
                  React.default.createElement(
                    module12.Text,
                    {
                      style: {
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.5)',
                        marginTop: 10,
                      },
                    },
                    module413.default.getTime(t)
                  )
                )
              ),
              React.default.createElement(
                module12.View,
                {
                  style: {
                    flexDirection: 'row',
                  },
                },
                React.default.createElement(module381.PureImageButton, {
                  image: require('./496'),
                  imageWidth: 26,
                  imageHeight: 26,
                  onPress: this.uploadLog.bind(this, l ? 'current' : t),
                }),
                !l &&
                  React.default.createElement(module381.PureImageButton, {
                    style: {
                      marginLeft: 30,
                    },
                    image: require('./495'),
                    imageWidth: 26,
                    imageHeight: 26,
                    onPress: this.delLog.bind(this, t),
                  })
              ),
              React.default.createElement(module12.View, {
                style: D.line,
              })
            )
          );
        },
      },
      {
        key: 'delLog',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    module410.Log.deleteLog(t);
                    this.fetchData();

                  case 2:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'uploadLog',
        value: function (t) {
          var module21;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module21 = 'current' == t;
                    if (this.loadingView) this.loadingView.showWithText('log\u4e0a\u4f20\u4e2d...');
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module410.Log.upload(t, module21));

                  case 4:
                    if (this.loadingView) this.loadingView.hide();
                    module12.Clipboard.setString(module481((module21 ? module410.Log.beginTime : t) + '_' + module389.userId + '_' + module389.deviceId));
                    globals.showToast('\u4e0a\u4f20\u6210\u529f,id\u5df2\u590d\u5236\uff0c\u8bf7\u7c98\u8d34\u5230bug\u91cc');

                  case 7:
                  case 'end':
                    return l.stop();
                }
            },
            null,
            this,
            null,
            Promise
          );
        },
      },
      {
        key: 'copyId',
        value: function (t) {
          module12.Clipboard.setString(module481(t + '_' + module389.userId + '_' + module389.deviceId));
          globals.showToast('log id\u5df2\u590d\u5236,\u8bf7\u8d34\u5230bug\u91cc');
        },
      },
      {
        key: 'onPressRow',
        value: function (t, n) {
          this.props.navigation.navigate('LogDetailPage', {
            logId: 0 == n ? 'current' : t,
            title: 0 == n ? '\u5b9e\u65f6log,\u4e0b\u62c9\u5237\u65b0\u83b7\u53d6\u6700\u65b0' : module413.default.getTime(t),
          });
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.default = module495;
var D = module12.StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    backgroundColor: 'rgba(239,239,241,1)',
    marginBottom: 0,
  },
  list: {
    flex: 1,
    backgroundColor: 'rgba(239,239,241,1)',
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
  },
  line: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: module12.Dimensions.get('window').width,
    height: 0.4,
  },
  actionButtonWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  actionButton: {
    paddingHorizontal: 15,
    height: 50,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'rgba(0,0,0,0.4)',
  },
});
