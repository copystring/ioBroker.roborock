var regeneratorRuntime = require('regenerator-runtime'),
  module21 = require('./21'),
  module4 = require('./4'),
  module5 = require('./5'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module410 = require('./410'),
  module413 = require('./413'),
  module412 = require('./412'),
  module381 = require('./381'),
  module483 = require('./483');

function V() {
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

var module493 = require('./493'),
  x = [module412.Types.Home, module412.Types.KeyEvent, module412.Types.LoopStatus, module412.Types.LoopMap],
  C = (function (t) {
    module7.default(R, t);

    var C = R,
      T = V(),
      D = function () {
        var t,
          n = module11.default(C);

        if (T) {
          var o = module11.default(this).constructor;
          t = Reflect.construct(n, arguments, o);
        } else t = n.apply(this, arguments);

        return module9.default(this, t);
      };

    function R(t) {
      var n;
      module4.default(this, R);
      (n = D.call(this, t)).logId = (t.navigation.state.params && t.navigation.state.params.logId) || 'log_1583983392230';
      n.state = {
        dataSource: new module483.default.DataSource({
          rowHasChanged: function (t, n) {
            return t !== n;
          },
        }),
        loaded: true,
        refreshing: false,
        showDelete: true,
        isNoData: false,
        selectedTypes: module412.Category.map(function (t, n) {
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
          var t,
            o,
            l,
            s = this;
          return regeneratorRuntime.default.async(
            function (u) {
              for (;;)
                switch ((u.prev = u.next)) {
                  case 0:
                    if (!(t = 'current' == this.logId)) {
                      u.next = 5;
                      break;
                    }

                    u.t0 = JSON.parse(JSON.stringify(module410.Log.logs));
                    u.next = 8;
                    break;

                  case 5:
                    u.next = 7;
                    return regeneratorRuntime.default.awrap(module410.Log.getLog(this.logId));

                  case 7:
                    u.t0 = u.sent;

                  case 8:
                    o = u.t0;
                    l = (t ? o : o.logs).filter(function (t) {
                      return (
                        -1 !=
                        s.state.selectedTypes.findIndex(function (n) {
                          return module412.Category[n].type == t.type;
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
                    return u.stop();
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
          var module496 = [
            {
              title: '\u7c7b\u578b',
              image: require('./499'),
              onPress: this.showFilterView.bind(this),
            },
            {
              title: '\u590d\u5236\u5168\u90e8',
              image: require('./500'),
              onPress: this.copyAll.bind(this),
            },
            {
              title: '\u4e0a\u4f20',
              image: require('./496'),
              onPress: this.upload.bind(this),
            },
          ].map(function (t, n) {
            return React.default.createElement(
              module381.LeftImageButton,
              module21.default({}, t, {
                style: E.actionButton,
                imageWidth: 26,
                imageHeight: 26,
                key: n,
              })
            );
          });
          return React.default.createElement(
            module12.View,
            {
              style: E.actionButtonWrap,
            },
            module496
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
            t += n.type + '  ' + module413.default.getTime(n.time) + ' \n ' + n.content + ' \n\n';
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
            function (o) {
              for (;;)
                switch ((o.prev = o.next)) {
                  case 0:
                    t = 'current' == this.logId;
                    if (this.loadingView) this.loadingView.showWithText('log\u4e0a\u4f20\u4e2d...');
                    o.next = 4;
                    return regeneratorRuntime.default.awrap(module410.Log.upload(this.logId, t));

                  case 4:
                    if (this.loadingView) this.loadingView.hide();
                    globals.showToast('\u4e0a\u4f20\u6210\u529f');

                  case 6:
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
              style: E.list,
              dataSource: this.state.dataSource,
              enableEmptySections: true,
              renderRow: this.renderRow.bind(this),
            }),
            this.getActionMenu(),
            React.default.createElement(module381.OptionSheetView, {
              title: '\u8bf7\u9009\u62e9\u8981\u67e5\u770b\u7684log\u7c7b\u578b',
              options: module412.Category.map(function (t) {
                return t.name;
              }),
              multiSelectionEnabled: true,
              selectedIndexs: this.state.selectedTypes,
              selectedItemsDidChange: this.filterDidChange.bind(this),
              ref: function (n) {
                return (t.fiterView = n);
              },
            }),
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
        value: function (t) {
          var n = module412.GetCateroy(t.type) || {};
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
                    module413.default.getTime(t.time),
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
          this.copy(t.type + '  ' + module413.default.getTime(t.time) + ' \n' + t.content);
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
