var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module6 = require('./6'),
  module9 = require('./9'),
  module11 = require('./11'),
  module12 = require('./12'),
  React = require('react'),
  module13 = require('./13'),
  module422 = require('./422'),
  module419 = require('./419'),
  module385 = require('./385'),
  module501 = require('./501');

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

require('./510').strings;

var module393 = require('./393'),
  module512 = require('./512'),
  module499 = require('./499'),
  module514 = (function (t) {
    module9.default(R, t);

    var module514 = R,
      E = S(),
      P = function () {
        var t,
          n = module12.default(module514);

        if (E) {
          var o = module12.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module11.default(this, t);
      };

    function R(t) {
      var n;
      module6.default(this, R);
      (n = P.call(this, t)).state = {
        data: [1, 2, 3],
        dataSource: new module501.default.DataSource({
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

    module7.default(R, [
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
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.next = 2;
                    return regeneratorRuntime.default.awrap(module419.Log.getLogList());

                  case 2:
                    if (((n.t0 = n.sent), n.t0)) {
                      n.next = 5;
                      break;
                    }

                    n.t0 = [];

                  case 5:
                    (t = n.t0).push(module419.Log.beginTime);
                    console.log('fetchData - ' + t);
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(t.reverse()),
                      refreshing: false,
                    });

                  case 9:
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
        key: 'deleteAll',
        value: function () {
          return regeneratorRuntime.default.async(
            function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    t.next = 2;
                    return regeneratorRuntime.default.awrap(module419.Log.deleteAll());

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
          module419.Log.uploadAll(function () {
            if (t.loadingView) t.loadingView.hide();
            globals.showToast('\u4e0a\u4f20\u6210\u529f');
          });
        },
      },
      {
        key: 'getActionMenu',
        value: function () {
          var module515 = [
            {
              title: '\u5220\u9664\u5168\u90e8',
              image: require('./514'),
              onPress: this.deleteAll.bind(this),
            },
            {
              title: '\u4e0a\u4f20\u5168\u90e8',
              image: require('./515'),
              onPress: this.uploadAll.bind(this),
            },
          ].map(function (t, o) {
            return React.default.createElement(
              module385.LeftImageButton,
              module22.default({}, t, {
                style: L.actionButton,
                imageWidth: 26,
                imageHeight: 26,
                key: o,
              })
            );
          });
          return React.default.createElement(
            module13.View,
            {
              style: L.actionButtonWrap,
            },
            module515
          );
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module13.View,
            {
              style: L.container,
            },
            React.default.createElement(module512, {
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
              refreshControl: React.default.createElement(module13.RefreshControl, {
                refreshing: this.state.refreshing,
                onRefresh: function () {
                  return t.refresh();
                },
              }),
              style: L.list,
              dataSource: this.state.dataSource,
              enableEmptySections: true,
              swipeRowStyle: L.itemView,
              renderRow: this.renderRow.bind(this),
            }),
            this.getActionMenu(),
            React.default.createElement(module385.LoadingView, {
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
            module13.TouchableWithoutFeedback,
            {
              onPress: this.onPressRow.bind(this, t, o),
            },
            React.default.createElement(
              module13.View,
              {
                style: L.itemView,
              },
              React.default.createElement(
                module13.View,
                {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                },
                React.default.createElement(module385.PureImageButton, {
                  style: L.icon,
                  image: require('./516'),
                  imageWidth: 26,
                  imageHeight: 26,
                  onPress: this.copyId.bind(this, t),
                }),
                React.default.createElement(
                  module13.View,
                  null,
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        fontSize: 16,
                        color: 0 == o ? 'red' : 'rgba(0,0,0,0.8)',
                      },
                    },
                    t
                  ),
                  React.default.createElement(
                    module13.Text,
                    {
                      style: {
                        fontSize: 14,
                        color: 'rgba(0,0,0,0.5)',
                        marginTop: 10,
                      },
                    },
                    module422.default.getTime(t)
                  )
                )
              ),
              React.default.createElement(
                module13.View,
                {
                  style: {
                    flexDirection: 'row',
                  },
                },
                React.default.createElement(module385.PureImageButton, {
                  image: require('./515'),
                  imageWidth: 26,
                  imageHeight: 26,
                  onPress: this.uploadLog.bind(this, l ? 'current' : t),
                }),
                !l &&
                  React.default.createElement(module385.PureImageButton, {
                    style: {
                      marginLeft: 30,
                    },
                    image: require('./514'),
                    imageWidth: 26,
                    imageHeight: 26,
                    onPress: this.delLog.bind(this, t),
                  })
              ),
              React.default.createElement(module13.View, {
                style: L.line,
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
                    module419.Log.deleteLog(t);
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
          var module22;
          return regeneratorRuntime.default.async(
            function (l) {
              for (;;)
                switch ((l.prev = l.next)) {
                  case 0:
                    module22 = 'current' == t;
                    if (this.loadingView) this.loadingView.showWithText('log\u4e0a\u4f20\u4e2d...');
                    l.next = 4;
                    return regeneratorRuntime.default.awrap(module419.Log.upload(t, module22));

                  case 4:
                    if (this.loadingView) this.loadingView.hide();
                    module13.Clipboard.setString(module499((module22 ? module419.Log.beginTime : t) + '_' + module393.userId + '_' + module393.deviceId));
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
          module13.Clipboard.setString(module499(t + '_' + module393.userId + '_' + module393.deviceId));
          globals.showToast('log id\u5df2\u590d\u5236,\u8bf7\u8d34\u5230bug\u91cc');
        },
      },
      {
        key: 'onPressRow',
        value: function (t, n) {
          this.props.navigation.navigate('LogDetailPage', {
            logId: 0 == n ? 'current' : t,
            title: 0 == n ? '\u5b9e\u65f6log,\u4e0b\u62c9\u5237\u65b0\u83b7\u53d6\u6700\u65b0' : module422.default.getTime(t),
          });
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.default = module514;
var L = module13.StyleSheet.create({
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
    left: 0,
    right: 0,
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
