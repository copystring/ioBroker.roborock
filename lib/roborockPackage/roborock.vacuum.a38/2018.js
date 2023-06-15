var regeneratorRuntime = require('regenerator-runtime'),
  module7 = require('./7'),
  module9 = require('./9'),
  module11 = require('./11'),
  React = require('react'),
  module12 = require('./12'),
  module515 = require('./515');

function x() {
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

var module1153 = require('./1153'),
  module393 = require('./393'),
  C = (function (t) {
    module7.default(C, t);

    var n = C,
      module515 = x(),
      y = function () {
        var t,
          o = module11.default(n);

        if (module515) {
          var l = module11.default(this).constructor;
          t = Reflect.construct(o, arguments, l);
        } else t = o.apply(this, arguments);

        return module9.default(this, t);
      };

    function C(t) {
      var n;
      module4.default(this, C);
      (n = y.call(this, t)).state = {
        dataSource: [],
      };
      return n;
    }

    module5.default(C, [
      {
        key: 'componentDidMount',
        value: function () {
          this.getConfigTestUrlDatas();
        },
      },
      {
        key: 'render',
        value: function () {
          var t = this,
            n = this.context.theme;
          return React.default.createElement(
            module12.View,
            {
              style: [
                k.containterView,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
            },
            React.default.createElement(module12.FlatList, {
              ref: function (n) {
                return (t.listView = n);
              },
              extraData: this.state,
              data: this.state.dataSource,
              renderItem: this._renderItem.bind(this),
              style: [
                k.containter,
                {
                  backgroundColor: n.settingBackgroundColor,
                },
              ],
              keyExtractor: function (t) {
                return t.id;
              },
            })
          );
        },
      },
      {
        key: '_renderItem',
        value: function (t) {
          var n = t.item,
            o = t.index,
            l = this.context.theme,
            s = '\u7248\u672c' + (o + 1) + ' | ' + n.version + ' | ' + (0 == o ? '\u6b63\u5f0f' : '\u6d4b\u8bd5') + ' ';
          return React.default.createElement(
            module12.View,
            {
              style: [
                k.itemContainer,
                {
                  backgroundColor: l.settingListItem.backgroundColor,
                  width: module12.Dimensions.get('window').width,
                },
              ],
            },
            React.default.createElement(
              module12.Text,
              {
                style: [
                  k.itemText,
                  {
                    color: l.mainTextColor,
                  },
                ],
              },
              s
            ),
            React.default.createElement(
              module12.Text,
              {
                onPress: this.setConfigTestUrl.bind(this, n),
                style: k.buttonText,
              },
              '\u4e0b\u8f7d'
            ),
            React.default.createElement(module12.View, {
              style: [
                k.line,
                {
                  backgroundColor: l.navBorderColor,
                },
              ],
            })
          );
        },
      },
      {
        key: 'getConfigTestUrlDatas',
        value: function () {
          var t, n, l, s;
          return regeneratorRuntime.default.async(
            function (c) {
              for (;;)
                switch ((c.prev = c.next)) {
                  case 0:
                    c.prev = 0;
                    c.next = 3;
                    return regeneratorRuntime.default.awrap(module393.getConfigTestUrlList());

                  case 3:
                    t = c.sent;
                    n = [];
                    l = t.stable;
                    s = t.betaList;
                    n.push(l);
                    n = n.concat(s);
                    this.setState({
                      dataSource: n,
                    });
                    c.next = 16;
                    break;

                  case 12:
                    c.prev = 12;
                    c.t0 = c.catch(0);
                    alert('\u83b7\u53d6\u914d\u7f6e\u5217\u8868\u5931\u8d25');
                    console.log('submitTestID error : ' + JSON.stringify(c.t0));

                  case 16:
                  case 'end':
                    return c.stop();
                }
            },
            null,
            this,
            [[0, 12]],
            Promise
          );
        },
      },
      {
        key: 'setConfigTestUrl',
        value: function (t) {
          return regeneratorRuntime.default.async(
            function (n) {
              for (;;)
                switch ((n.prev = n.next)) {
                  case 0:
                    n.prev = 0;
                    n.next = 3;
                    return regeneratorRuntime.default.awrap(RobotApi.setConfigTestUrl(t.version, t.url, t.signatureUrl));

                  case 3:
                    alert('\u4e0b\u8f7d\u6210\u529f');
                    n.next = 10;
                    break;

                  case 6:
                    n.prev = 6;
                    n.t0 = n.catch(0);
                    alert('\u4e0b\u8f7d\u5931\u8d25');
                    console.log('submitTestID error : ' + JSON.stringify(n.t0));

                  case 10:
                  case 'end':
                    return n.stop();
                }
            },
            null,
            null,
            [[0, 6]],
            Promise
          );
        },
      },
    ]);
    return C;
  })(React.Component);

exports.default = C;
C.contextType = module515.AppConfigContext;
var k = module12.StyleSheet.create({
  containterView: {
    flex: 1,
    marginTop: module1153.NavigationBarHeight,
  },
  containter: {
    flex: 1,
  },
  itemContainer: {
    height: 70,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'left',
    color: 'rgba(0,0,0,0.8)',
    fontSize: 16,
    marginLeft: 20,
  },
  buttonText: {
    textAlign: 'right',
    color: '#3777F7',
    fontSize: 16,
    marginRight: 20,
    textDecorationLine: 'underline',
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 0.8,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
