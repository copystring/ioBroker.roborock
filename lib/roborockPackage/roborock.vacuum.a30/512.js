var module22 = require('./22'),
  regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module418 = require('./418'),
  module421 = require('./421'),
  module420 = require('./420'),
  module385 = require('./385'),
  module496 = require('./496');

function V() {
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

var module507 = require('./507'),
  x = [module420.Types.Home, module420.Types.KeyEvent, module420.Types.LoopStatus, module420.Types.LoopMap],
  C = (function (t) {
    module7.default(R, t);

    var C = R,
      D = V(),
      T = function () {
        var t,
          n = module11.default(C);

        if (D) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = T.call(this, t)).logId = (t.navigation.state.params && t.navigation.state.params.logId) || 'log_1583983392230';
      n.state = {
        dataSource: new module496.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
        loaded: true,
        refreshing: false,
        showDelete: true,
        isNoData: false,
        selectedTypes: module420.Category.map(function (t, n) {
          return -1 !=
            x.findIndex(function (n) {
              return n == t.type;
            })
            ? n
            : -1;
        }).filter(function (t) {
          return -1 != t;
        }),
      };
      n.logs = [];
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
          var t = this;
          this.fetchData();
          this.props.navigation.setParams({
            hiddenBottomLine: true,
          });
          this.dimListener = module12.DeviceEventEmitter.addListener('ScreenHeightUpdate', function () {
            t.forceUpdate();
          });
        },
      },
      {
        key: 'componentWillUnmount',
        value: function () {
          var t;
          if (!(null == (t = this.dimListener))) t.remove();
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
          var t,
            n,
            l,
            s = this;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    if (!(t = 'current' == this.logId)) {
                      c.next = 5;
                      break;
                    }

                    c.t0 = JSON.parse(JSON.stringify(module418.Log.logs));
                    c.next = 8;
                    break;

                  case 5:
                    c.next = 7;
                    return regeneratorRuntime.default.awrap(module418.Log.getLog(this.logId));

                  case 7:
                    c.t0 = c.sent;

                  case 8:
                    n = c.t0;
                    l = (t ? n : n.logs).filter(function (t) {
                      return (
                        -1 !=
                        s.state.selectedTypes.findIndex(function (n) {
                          return module420.Category[n].type == t.type;
                        })
                      );
                    });
                    this.logs = l;
                    this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(l),
                      refreshing: false,
                    });

                  case 12:
                  case 'end':
                    return c.stop();
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
        key: 'getActionMenu',
        value: function () {
          var module510 = [
            {
              title: '\u7c7b\u578b',
              image: require('./513'),
              onPress: this.showFilterView.bind(this),
            },
            {
              title: '\u590d\u5236\u5168\u90e8',
              image: require('./514'),
              onPress: this.copyAll.bind(this),
            },
            {
              title: '\u4e0a\u4f20',
              image: require('./510'),
              onPress: this.upload.bind(this),
            },
          ].map(function (t, o) {
            return React.default.createElement(
              module385.LeftImageButton,
              module22.default({}, t, {
                style: E.actionButton,
                imageWidth: 26,
                imageHeight: 26,
                key: o,
              })
            );
          });
          return React.default.createElement(
            module12.View,
            {
              style: E.actionButtonWrap,
            },
            module510
          );
        },
      },
      {
        key: 'showFilterView',
        value: function () {
          console.log('showFilterView');
          if (this.fiterView) this.fiterView.show();
        },
      },
      {
        key: 'copyAll',
        value: function () {
          var t = '';
          this.logs.forEach(function (n) {
            t += n.type + '  ' + module421.default.getTime(n.time) + ' \n ' + n.content + ' \n\n';
          });
          this.copy(t);
        },
      },
      {
        key: 'copy',
        value: function (t) {
          module12.Clipboard.setString(t);
          globals.showToast('\u590d\u5236\u6210\u529f');
        },
      },
      {
        key: 'upload',
        value: function () {
          var t;
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    t = 'current' == this.logId;
                    if (this.loadingView) this.loadingView.showWithText('log\u4e0a\u4f20\u4e2d...');
                    n.next = 4;
                    return regeneratorRuntime.default.awrap(module418.Log.upload(this.logId, t));

                  case 4:
                    if (this.loadingView) this.loadingView.hide();
                    globals.showToast('\u4e0a\u4f20\u6210\u529f');

                  case 6:
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
        key: 'filterDidChange',
        value: function (t) {
          var n = this;
          this.setState(
            {
              selectedTypes: t,
            },
            function () {
              n.fetchData();
            }
          );
          console.log('filterDidChange - ' + JSON.stringify(t));
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this;
          return React.default.createElement(
            module12.View,
            {
              style: E.container,
            },
            React.default.createElement(module507, {
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
              style: E.list,
              dataSource: this.state.dataSource,
              enableEmptySections: true,
              renderRow: this.renderRow.bind(this),
            }),
            this.getActionMenu(),
            React.default.createElement(module385.OptionSheetView, {
              title: '\u8bf7\u9009\u62e9\u8981\u67e5\u770b\u7684log\u7c7b\u578b',
              options: module420.Category.map(function (t) {
                return t.name;
              }),
              multiSelectionEnabled: true,
              selectedIndexs: this.state.selectedTypes,
              selectedItemsDidChange: this.filterDidChange.bind(this),
              ref: function (n) {
                return (t.fiterView = n);
              },
            }),
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
        value: function (t) {
          var n = module420.GetCateroy(t.type) || {};
          return React.default.createElement(
            module12.TouchableWithoutFeedback,
            {
              onPress: this.onPressRow.bind(this, t),
            },
            React.default.createElement(
              module12.View,
              {
                style: E.itemView,
              },
              React.default.createElement(
                module12.View,
                {
                  style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                },
                React.default.createElement(module12.View, {
                  style: [
                    E.colorBall,
                    {
                      backgroundColor: t.infoColor || 'transparent',
                    },
                  ],
                }),
                React.default.createElement(
                  module12.Text,
                  {
                    style: [
                      E.category,
                      {
                        color: 'rgba(0,0,0,0.8)',
                      },
                    ],
                  },
                  '  @',
                  n.type,
                  '  ',
                  React.default.createElement(
                    module12.Text,
                    {
                      style: E.time,
                    },
                    module421.default.getTime(t.time),
                    ' '
                  )
                )
              ),
              React.default.createElement(
                module12.Text,
                {
                  style: E.desc,
                  ellipsizeMode: 'tail',
                },
                t.content,
                ' '
              ),
              React.default.createElement(module12.View, {
                style: E.line,
              })
            )
          );
        },
      },
      {
        key: 'onPressRow',
        value: function (t) {
          this.copy(t.type + '  ' + module421.default.getTime(t.time) + ' \n' + t.content);
        },
      },
    ]);
    return R;
  })(React.default.Component);

exports.default = C;
var E = module12.StyleSheet.create({
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
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  colorBall: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  time: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'normal',
  },
  category: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  desc: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 21,
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
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  actionButton: {
    paddingHorizontal: 10,
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
